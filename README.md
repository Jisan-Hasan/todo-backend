## TODO Backend

### Developer: Jisan Hasan

This is the Documentation for the TODO Backend API. This API is built using Node.js, Express.js, MongoDB, Mongoose, and JWT.

### API Endpoints
### Base URL: `https://todo-backend-tan.vercel.app/api/v1`
#### Auth
- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login an existing user

#### Task
- `GET /task` - Get all tasks
- `GET /task?searchTerm=&page=1&limit=10&sortBy=createdAt&sortOrder=asc&status=pending` - Get all tasks with query params
- `GET /task/:id` - Get a task by id
- `POST /task` - Create a new task
- `PATCH /task/:id` - Update a task by id
- `DELETE /task/:id` - Delete a task by id


### API Postman Documentation
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19592116-7300289b-8d33-442b-acaf-fbbca28e7831?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D19592116-7300289b-8d33-442b-acaf-fbbca28e7831%26entityType%3Dcollection%26workspaceId%3D9d49722c-4462-48f2-96c4-12bff3a0e61c)

### Application Setup Instructions
- Clone the repository
```
git clone https://github.com/Jisan-Hasan/todo-backend
```
- Run `yarn install` to install all dependencies
```
yarn install
or
npm install
```
- Create a `.env` file in the root directory of the project
- Copy the contents of `.env.example` into `.env` and fill in the required environment variables
- Run `yarn dev` to start the application in development mode





