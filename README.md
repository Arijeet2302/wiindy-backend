# Backend API Wiindy- Weather Forecast App

## Overview

Wiindy Backend is the server-side component of the Wiindy Weather Forecast App. It is built using Express for the web server and MongoDB as the database. This repository focuses on managing user data, and keeping the track of user saved 
data such as favorite cities.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Deployment](#deployment)

## Features

1. **User Authentication**: Secure user authentication using Firebase.
2. **Favorite Cities**: Store and manage users' favorite cities.
3. **Weather Data API**: Interface with OpenWeatherMap API to fetch weather data.
4. **MongoDB Integration**: Store user data and preferences in a MongoDB database.

## Technologies Used

- **Backend Framework**: Express
- **Database**: MongoDB
- **Authentication**: Firebase
- **Weather Data**: OpenWeatherMap API

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/wiindy-backend.git

2. Navigate to Project:

   ```bash
   cd wiindy-backend

3. Install Dependencies:

   ```bash
   npm install

## Configuration 

1. Create a Firebase project and set up authentication.
2. Obtain an API key from OpenWeatherMap for accessing weather data.
3. Configure the app by creating a .env file in the root of the project:

    MONGO_URL = Your-mongodb-url


## API Endpoints 

- **POST /api/user/add** : Add city to user favorites.
- **DELETE /api/user/delete** : Delete city from current user favorites.
- **POST /api/user/favorites** : Show favorite cities of current user.


## Database

Wiindy Backend uses MongoDB to store user data and favorite cities. Make sure to configure the MONGODB_URI in the .env file to point to your MongoDB instance.


## Deployment

Deplyed at Vercel app : https://wiindy-ui.vercel.app.


## Main Repository

https://github.com/Arijeet2302/wiindyUi.git
