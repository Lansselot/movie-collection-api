# Movie Collection App

## About

Movie Collection App is a RESTful API service that allows users to save information about films

## Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Sequelize**
- **SQLite**
- **Docker**

## Run the application using Docker:

```
docker run --name movies -p 8000:8050 -e APP_PORT=8050 lanssel/movie-collection-app:latest
```

`APP_PORT` - The port the app will listen on inside the container (default: 3000).

API will be accessible at:

```
http://localhost:8000
```

## API

You can explore and test the API via Postman: [Postman Collection](https://www.postman.com/joint-operations-administrator-77381127/workspace/movie-collection-api/collection/25538502-14df02df-196f-4917-8ae0-6701f0f42442?action=share&creator=25538502&active-environment=25538502-29918f8e-85d4-4368-be11-39019580db23)

## Architecture

`src/`  
--- `controllers/` -- Handle incoming HTTP requests and responses  
--- `db/` -- Sequelize initialization, migrations, and seeders  
--- `middlewares/` -- Auth middleware, error handling, validate etc.  
--- `routes/` -- Define API endpoints and route them to controllers  
--- `services/` -- Business logic, called by controllers  
--- `types/` -- Types definitions and interfaces  
--- `validators/` -- Data validation schemas  
--- `views/` -- HTML files for response  
--- `app.ts` -- Application setup and middleware registration  
--- `server.ts` -- Server start and listening logic
