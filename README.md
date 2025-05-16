# Express TypeScript API Template

A modular, well-structured Express.js API template built with TypeScript, featuring a clean architecture for building scalable backend applications.

## Project Structure

```
express-typescript-template/
├── src/
│   ├── config/                  # Application configuration
│   │   └── index.ts             # Configuration variables
│   ├── middlewares/             # Express middlewares
│   │   ├── auth.middleware.ts   # Authentication middleware
│   │   ├── error-handler.middleware.ts  # Global error handler
│   │   └── health.middleware.ts # Health check endpoints
│   ├── modules/                 # Feature modules
│   │   └── tasks/               # Tasks module
│   │       ├── controllers/     # Request handlers
│   │       │   └── task.controller.ts
│   │       ├── schemas/         # Validation schemas
│   │       │   └── task.schema.ts
│   │       ├── services/        # Business logic
│   │       │   └── task.service.ts
│   │       └── routes.ts        # Module routes with Swagger docs
│   ├── utils/                   # Utility functions
│   │   ├── errors.ts           # Custom error classes
│   │   └── logger.ts           # Logging utility
│   ├── app.ts                   # Express app setup
│   └── server.ts                # Server entry point
├── .env.example                 # Example environment variables
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## Architecture Overview

This template follows a modular architecture where:

1. **Modules**: Each feature is organized into a separate module (e.g., tasks, users, auth)
   - **Controllers**: Handle HTTP requests and responses
   - **Services**: Contain business logic and data operations
   - **Schemas**: Define validation rules for input data
   - **Routes**: Define API endpoints with Swagger documentation

2. **Middlewares**: Common request processing logic
   - Authentication
   - Error handling
   - Health checks

3. **Utils**: Shared utility functions
   - Custom error classes
   - Logging

4. **Config**: Application configuration

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

- **TypeScript**: Type-safe code
- **Modular Architecture**: Organized by feature
- **Input Validation**: Using Zod schemas
- **Error Handling**: Centralized error handling
- **Logging**: Structured logging with Winston
- **API Documentation**: Auto-generated with Swagger
- **Health Checks**: Server health monitoring
- **Authentication**: JWT-based authentication
- **Environment Configuration**: Using dotenv

## Adding a New Module

To add a new feature module:

1. Create a new directory in `src/modules/`
2. Add controllers, services, schemas, and routes
3. Register the module's routes in `src/app.ts`

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

MIT
