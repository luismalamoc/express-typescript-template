# Express TypeScript API Template

A well-structured Express.js API template built with TypeScript, featuring a clean architecture for building scalable backend applications with proper separation of concerns.

## Project Structure

```
express-typescript-template/
├── src/
│   ├── client/                  # External API clients
│   │   ├── jsonplaceholder.client.ts  # JSONPlaceholder API client
│   │   └── jsonplaceholder.example.ts # Example usage of the client
│   ├── config/                  # Application configuration
│   │   ├── index.ts             # Configuration exports
│   │   ├── typeorm.config.ts    # TypeORM database configuration
│   │   └── logger.ts            # Logging configuration
│   ├── controllers/             # Request handlers
│   │   └── task.controller.ts   # Task controller with input validation
│   ├── entities/                # TypeORM entities
│   │   └── Task.ts              # Task entity definition
│   ├── middlewares/             # Express middlewares
│   │   ├── auth.middleware.ts   # Authentication middleware
│   │   └── error-handler.middleware.ts  # Global error handler
│   ├── routes/                  # API routes
│   │   └── task.routes.ts       # Task routes with Swagger docs
│   ├── schemas/                 # Validation schemas
│   │   ├── task.schema.ts       # Zod validation schemas for tasks
│   │   └── jsonplaceholder.schema.ts  # Zod schemas for JSONPlaceholder API
│   ├── services/                # Business logic
│   │   └── task.service.ts      # Task service with DTOs for API contracts
│   ├── types/                   # Type definitions
│   │   ├── task.types.ts        # Task-related type definitions and DTOs
│   │   └── jsonplaceholder.types.ts  # JSONPlaceholder API type definitions
│   ├── utils/                   # Utility functions
│   │   └── errors.ts            # Custom error classes
│   └── migrations/              # Database migrations
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore configuration
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Architecture Overview

This template follows a traditional layered architecture where:

1. **Controllers**: Handle HTTP requests and responses
   - Input validation using Zod schemas
   - Proper error handling
   - Calling appropriate services

2. **Services**: Contain business logic and data operations
   - Use DTOs for input/output to hide entity details
   - Handle database operations through repositories
   - Implement business rules

3. **Entities**: Define database models
   - TypeORM entity definitions
   - Field validations and relationships

4. **Schemas**: Define validation rules for input data
   - Zod schemas for request validation
   - Type inference for TypeScript safety

5. **Middlewares**: Common request processing logic
   - Authentication
   - Error handling
   - Request validation

6. **Routes**: Define API endpoints with Swagger documentation

7. **Types**: Type definitions and DTOs
   - Input/output data transfer objects
   - Type safety throughout the application

8. **Utils**: Shared utility functions
   - Custom error classes
   - Logging utilities

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd express-typescript-template
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Start development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

The server will be running at http://localhost:3000 with API documentation available at http://localhost:3000/api-docs.

## Features

- **TypeScript**: Type-safe code with proper interfaces and types
- **Traditional Layered Architecture**: Clear separation of concerns
- **Input Validation**: Using Zod schemas for request validation
- **Data Transfer Objects**: Proper separation between API contracts and database entities
- **TypeORM**: Database ORM with SQLite support
- **Error Handling**: Centralized error handling
- **Logging**: Structured logging
- **API Documentation**: Auto-generated with Swagger
- **Authentication**: JWT-based authentication (template ready)
- **Environment Configuration**: Using dotenv
- **External API Client**: JSONPlaceholder API client implementation

## Adding a New Feature

To add a new feature:

1. Create a new entity in `src/entities/`
2. Create validation schemas in `src/schemas/`
3. Define types and DTOs in `src/types/`
4. Implement the service in `src/services/`
5. Create a controller in `src/controllers/`
6. Define routes in `src/routes/`
7. Register the routes in the main application

## Using the JSONPlaceholder API Client

The template includes a client for the JSONPlaceholder API (https://jsonplaceholder.typicode.com/):

1. Import the client in your service or controller:
   ```typescript
   import { JsonPlaceholderClient } from '../client/jsonplaceholder.client';
   ```

2. Create an instance and use the methods:
   ```typescript
   const client = new JsonPlaceholderClient();
   const posts = await client.getPosts();
   const user = await client.getUserById(1);
   ```

3. Available methods include:
   - `getPosts()` - Get all posts
   - `getPostById(id)` - Get a post by ID
   - `createPost(post)` - Create a new post
   - `updatePost(id, post)` - Update a post
   - `deletePost(id)` - Delete a post
   - `getCommentsByPostId(postId)` - Get comments for a post
   - `getUsers()` - Get all users
   - `getUserById(id)` - Get a user by ID
   - `getTodosByUserId(userId)` - Get todos for a user
   - `getAlbumsByUserId(userId)` - Get albums for a user
   - `getPhotosByAlbumId(albumId)` - Get photos for an album

4. See `src/client/jsonplaceholder.example.ts` for usage examples

## API Documentation

API documentation is automatically generated using Swagger. Access it at `/api-docs` when the server is running.

## Error Handling

The application uses a centralized error handling approach:

- Custom error classes in `src/utils/errors.ts`
- Global error handler middleware in `src/middlewares/error-handler.middleware.ts`

## Authentication

The template includes JWT-based authentication:

- Middleware in `src/middlewares/auth.middleware.ts`
- Apply to routes using the `authenticate` middleware

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
