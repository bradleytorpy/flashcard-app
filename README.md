# Flashcard App

A modern flashcard application with Node.js backend, PostgreSQL database, and Prisma ORM.

## Quick Start

### Development

```bash
# Start all services (development mode)
docker compose up

# Or start in detached mode
docker compose up -d
```

### Production

```bash
# Start production services
docker compose -f docker-compose.prod.yml up -d
```

## Services

- **Backend**: Node.js Express API (port 5000)
- **Database**: PostgreSQL 17 (port 5432)
- **Prisma Studio**: Database GUI (port 5555) - development only

## Database Management

The application uses Prisma for database management. Migrations are automatically applied when the containers start.

### Manual Database Commands

```bash
# Access the backend container
docker exec -it flashcard-backend sh

# Run database commands
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Apply migrations
npm run db:studio      # Open Prisma Studio
npm run db:reset       # Reset database
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgres://flashcard_user:flashcard_pass@db:5432/flashcard_db
BACKEND_PORT=5000
```

## API Endpoints

- `GET /api/test` - Health check
- `GET /api/flashcards` - Get all flashcards

## Architecture

- **Multi-stage Docker builds** for optimized production images
- **Health checks** for database readiness
- **Volume mounts** for development hot-reloading
- **Alpine Linux** base images for smaller footprint