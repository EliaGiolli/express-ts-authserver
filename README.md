# JWT Authentication & Task Management API

A robust REST API built with Node.js, Express, TypeScript, and MongoDB that provides JWT-based authentication and comprehensive task management functionality.

## 🚀 Features

- **JWT Authentication**: Secure user registration and login with JSON Web Tokens
- **Task Management**: Full CRUD operations for tasks with validation
- **TypeScript**: Fully typed codebase for better development experience
- **MongoDB**: NoSQL database with Mongoose ODM
- **Input Validation**: Zod schemas for request validation
- **Security**: Helmet middleware for enhanced security headers
- **Password Hashing**: bcrypt for secure password storage

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **TypeScript** knowledge (basic understanding)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd esercizio-jwt
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your-super-secret-jwt-key-here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` (or your configured PORT)

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Task Management Endpoints

**⚠️ All task endpoints require authentication. Include the JWT token in the Authorization header:**
```
Authorization: Bearer <your-jwt-token>
```

#### Get All Tasks
```http
GET /tasks
Authorization: Bearer <jwt-token>
```

**Response:**
```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nameTask": "Complete project",
    "description": "Finish the JWT authentication project",
    "tag": "work",
    "completed": false,
    "dueDate": "2024-01-15T00:00:00.000Z",
    "createdAt": "2024-01-10T10:30:00.000Z",
    "updatedAt": "2024-01-10T10:30:00.000Z"
  }
]
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <jwt-token>
```

#### Create New Task
```http
POST /tasks
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "nameTask": "Learn TypeScript",
  "description": "Study TypeScript fundamentals",
  "tag": "learning",
  "completed": false,
  "dueDate": "2024-01-20T00:00:00.000Z"
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "nameTask": "Learn TypeScript Advanced",
  "completed": true
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <jwt-token>
```

### Protected Route Example
```http
GET /protected
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "message": "Access granted!",
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com"
  }
}
```

## 🏗️ Project Structure

```
src/
├── controllers/          # Request handlers
│   ├── authController.ts # Authentication logic
│   └── taskController.ts # Task management logic
├── middlewares/          # Custom middleware
│   └── auth.ts          # JWT authentication middleware
├── models/              # MongoDB schemas
│   ├── taskModel.ts     # Task data model
│   └── userModel.ts     # User data model
├── routes/              # API route definitions
│   ├── authRoute.ts     # Authentication routes
│   └── taskRoute.ts     # Task management routes
├── schemas/             # Zod validation schemas
│   ├── authControllerSchema.ts
│   └── taskControllerSchema.ts
├── services/            # Business logic layer
│   ├── taskService.ts   # Task operations
│   └── userService.ts   # User operations
├── types/               # TypeScript type definitions
│   └── jwtTypes.ts      # JWT-related types
├── index.ts             # Application entry point
└── server.ts            # Server configuration
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |

### Database Schema

#### User Model
- `email` (String, required, unique): User's email address
- `passwordHash` (String, required): Hashed password using bcrypt

#### Task Model
- `nameTask` (String, required): Task name
- `description` (String, optional): Task description
- `tag` (String, optional): Task category/tag
- `completed` (Boolean, required): Task completion status
- `dueDate` (Date, required): Task due date
- `createdAt` (Date, auto-generated): Creation timestamp
- `updatedAt` (Date, auto-generated): Last update timestamp

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Zod schemas prevent invalid data
- **Security Headers**: Helmet middleware for HTTP security
- **Error Handling**: Comprehensive error responses

## 🧪 Testing the API

### Using cURL

1. **Register a new user:**
   ```bash
   curl -X POST http://localhost:3000/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **Login and get token:**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Create a task (replace TOKEN with your JWT):**
   ```bash
   curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer TOKEN" \
     -d '{"nameTask":"Test Task","description":"Test Description","tag":"test","completed":false,"dueDate":"2024-01-20T00:00:00.000Z"}'
   ```

### Using Postman

1. Import the following collection structure:
   - **Auth Collection**
     - POST `/auth/signup`
     - POST `/auth/login`
   - **Tasks Collection**
     - GET `/tasks`
     - GET `/tasks/:id`
     - POST `/tasks`
     - PUT `/tasks/:id`
     - DELETE `/tasks/:id`

2. Set the Authorization header to `Bearer <your-jwt-token>` for task endpoints

## 🚨 Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials/token)
- `404` - Not Found
- `500` - Internal Server Error

## 🔄 Development

### Available Scripts

- `npm start` - Start development server with nodemon
- `npm test` - Run tests (not configured yet)

### Adding New Features

1. adding a fronted either with ejs or with a Javascrpt framework such as React or Vue

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the error logs in your console
2. Verify your MongoDB connection
3. Ensure all environment variables are set correctly
4. Check that your JWT token is valid and not expired

---

**Happy coding! 🎉**
