# Agro-Watch Smart

A comprehensive agriculture monitoring system with real-time IoT sensor data, crop price analytics, and farm management. Built with **React + Vite** (frontend) and **Spring Boot 4.0** (backend).

---

## 📁 Project Structure

```
agro-watch-smart3/
├── frontend/                    # React + TypeScript application
│   ├── src/                     # Source code
│   ├── package.json
│   ├── vite.config.ts
│   ├── Dockerfile
│   └── README.md
│
├── backend/                     # Spring Boot API server
│   ├── src/
│   │   ├── main/java/          # Java source code
│   │   └── main/resources/     # Configuration & SQL scripts
│   ├── pom.xml
│   ├── Dockerfile
│   └── mvnw
│
├── docker-compose.yml           # Multi-container orchestration
├── package.json                 # Root workspace configuration
└── README.md                    # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 20.0.0 & npm >= 10.0.0
- **Java** 21 (for backend development)
- **Maven** 3.9.4+ (or use `mvnw`)
- **Docker** & **Docker Compose** (optional, for containerized setup)
- **PostgreSQL** 15 (can run via Docker)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend API runs at: `http://localhost:8080`

### Using Docker Compose (All Services)

```bash
docker-compose up
```

This starts:
- **PostgreSQL** on port 5432
- **Backend API** on port 8080
- **Frontend** on port 5173

---

## 📦 Available Scripts

### Root Level
```bash
npm run install:all       # Install all dependencies (frontend + backend)
npm run dev              # Start frontend dev server
npm run build            # Build frontend for production
npm run lint             # Run ESLint on frontend
npm run backend:build    # Build backend with Maven
npm run backend:test     # Run backend tests
npm run docker:build     # Build Docker images
npm run docker:up        # Start all containers
npm run docker:down      # Stop all containers
npm run docker:logs      # View container logs
```

### Frontend (`cd frontend`)
```bash
npm run dev              # Vite dev server with hot reload
npm run build            # Production build (outputs to dist/)
npm run preview          # Preview production build locally
npm run lint             # ESLint checks
```

### Backend (`cd backend`)
```bash
mvn clean install        # Clean build with dependencies
mvn spring-boot:run      # Run application
mvn test                 # Run unit tests
mvn package              # Build JAR file
```

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.3
- **TypeScript** 5.8
- **Vite** 7.2
- **Tailwind CSS** 3.4
- **shadcn/ui** - Component library
- **React Router** 6.30 - Navigation
- **React Query** (@tanstack/react-query) - Server state management
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Spring Boot** 4.0.0
- **Spring Data JPA** - ORM
- **Spring Security** - Authentication & authorization
- **PostgreSQL** 15 - Database
- **Maven** - Build tool
- **Java** 21

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Vite** - Frontend bundler
- **ESLint** - Code quality

---

## 📋 Environment Variables

### Backend (`backend/src/main/resources/application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/agrosmartdb
spring.datasource.username=agrosmart
spring.datasource.password=agrosmartpass
spring.jpa.hibernate.ddl-auto=update
server.port=8080
```

### Docker Compose Variables
Set in `docker-compose.yml`:
- `POSTGRES_USER`: agrosmart
- `POSTGRES_PASSWORD`: agrosmartpass
- `POSTGRES_DB`: agrosmartdb

---

## 🔌 API Integration

Frontend connects to backend at: `http://localhost:8080`

Key endpoints:
- `GET /api/farms` - List all farms
- `GET /api/analytics` - Analytics data
- `GET /api/sensors` - Sensor readings
- `GET /api/crop-prices` - Crop price data
- `GET /api/irrigation` - Irrigation status

---

## 📊 Key Features

✅ **Dashboard** - Real-time farm metrics  
✅ **Analytics** - Data visualization & insights  
✅ **Crop Prices** - Market price tracking  
✅ **Irrigation Management** - Water usage monitoring  
✅ **Sensor Data** - IoT device integration  
✅ **Farm Management** - Multi-farm support  
✅ **Authentication** - Spring Security integration  

---

## 🔄 Development Workflow

1. **Frontend Development**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Development**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Database Setup** (auto-initialized via `data.sql`)
   - PostgreSQL must be running
   - Schema auto-created via Spring JPA

4. **Code Quality**
   - Frontend: `cd frontend && npm run lint`
   - Backend: `mvn clean verify` (includes tests)

---

## 🐳 Docker Usage

### Build & Run All Services
```bash
docker-compose up --build
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f backend    # Backend logs
docker-compose logs -f frontend   # Frontend logs
docker-compose logs -f db         # Database logs
```

### Rebuild Specific Service
```bash
docker-compose build backend
docker-compose up backend
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test                           # Run tests (if configured)
npm run lint                       # Lint checks
```

### Backend Tests
```bash
cd backend
mvn test
```

---

## 📝 Configuration Files

| File | Purpose |
|------|---------|
| `frontend/vite.config.ts` | Vite bundler configuration |
| `frontend/tailwind.config.ts` | Tailwind CSS customization |
| `frontend/tsconfig.json` | TypeScript compiler settings |
| `frontend/eslint.config.js` | ESLint rules |
| `docker-compose.yml` | Container orchestration |
| `backend/pom.xml` | Maven dependencies & build config |
| `backend/src/main/resources/application.properties` | Spring Boot settings |

---

## 🐛 Troubleshooting

### Frontend Issues
- **Port 5173 in use?** → Change in `frontend/vite.config.ts`
- **Module not found?** → Check `@` alias paths in `frontend/vite.config.ts`
- **Styles not loading?** → Ensure Tailwind configured properly in `frontend/tailwind.config.ts`

### Backend Issues
- **Database connection failed?** → Check PostgreSQL is running, credentials in `backend/src/main/resources/application.properties`
- **Port 8080 in use?** → Change `server.port` in `application.properties`
- **Build errors?** → Run `mvn clean install -U` to update dependencies

### Docker Issues
- **Container won't start?** → Check logs: `docker-compose logs service-name`
- **Port conflicts?** → Modify port mappings in `docker-compose.yml`

---

## 📞 Support

For issues, questions, or suggestions, please create an issue or contact the development team.

---

**Last Updated**: November 29, 2025  
**Version**: 0.0.1
