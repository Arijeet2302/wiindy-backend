const os = require('os');

const MAX_HEAP_MB = 100;

const loggerMiddleware = async (req, res, next) => {
  const { ip, method, originalUrl } = req;
  const userAgent = req.get('user-agent') || '';
  const referer = req.get('referer') || '';
  const hostname = os.hostname();

  let payload = {};
  const authHeader = req.headers.authorization;

  if (authHeader) {
    try {
      const token = authHeader.replace(/^Bearer\s*/, '');
      const decoded = JSON.parse(
        Buffer.from(token.split('.')[1], 'base64').toString()
      );
      payload = decoded;
    } catch (error) {
      console.warn(`Failed to decode token: ${error.message}`);
    }
  } else {
    console.warn('Authorization header is missing');
  }

  const userId = payload?.uid || 'Anonymous';
  const username = payload?.username || 'Anonymous';
  const requestTime = Date.now();

  res.on('finish', () => {
    const statusCode = res.statusCode;
    const contentLength = res.get('content-length') || 'N/A';
    const responseTime = Date.now();
    const durationMs = responseTime - requestTime;

    const memoryUsage = process.memoryUsage();
    const rss = (memoryUsage.rss / 1024 / 1024).toFixed(2);
    const heapTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(2);
    const heapUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(2);
    const external = (memoryUsage.external / 1024 / 1024).toFixed(2);

    const memoryWarning = heapUsed > MAX_HEAP_MB
      ? `Potential memory leak: heapUsed is ${heapUsed} MB`
      : null;

    const logMsg = `
[HTTP LOG]
-------------------------------
Method       : ${method}
URL          : ${originalUrl}
Status Code  : ${statusCode}
User-Agent   : ${userAgent}
Referer      : ${referer}
Host         : ${hostname}
IP           : ${ip}
User ID      : ${userId}
Username     : ${username}
Request Time : ${new Date(requestTime).toISOString()}
Response Time: ${new Date(responseTime).toISOString()}
Duration     : ${durationMs} ms
Memory Usage :
  - RSS        : ${rss} MB
  - Heap Total : ${heapTotal} MB
  - Heap Used  : ${heapUsed} MB
  - External   : ${external} MB
${memoryWarning ? memoryWarning : ''}
-------------------------------
`;

    console.log(logMsg);
  });

  next();
};

module.exports = loggerMiddleware;
