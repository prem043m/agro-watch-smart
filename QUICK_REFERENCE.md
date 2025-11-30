# 🎯 Quick Reference Guide

## Project Organization - At a Glance

```
┌─────────────────────────────────────────────────────────────┐
│           AGRO-WATCH SMART (Root Directory)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  📁 frontend/          React App (Vite + TypeScript)        │
│  📁 backend/           Spring Boot API (Java 21)            │
│  📁 .github/           GitHub configuration                 │
│                                                              │
│  🐳 docker-compose.yml Database + Backend + Frontend        │
│  📄 package.json       Root workspace scripts               │
│  📄 README.md          Complete documentation              │
│  📄 tsconfig.json      TypeScript configuration             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Commands

### Frontend Development
```bash
cd frontend
npm install
npm run dev                    # Start at localhost:5173
```

### Backend Development
```bash
cd backend
mvn spring-boot:run            # Start at localhost:8080
```

### Full Stack with Docker
```bash
docker-compose up              # All 3 services (DB, Backend, Frontend)
```

---

## 📍 Where to Find Things

| What | Where |
|------|-------|
| React components | `frontend/src/components/` |
| React pages | `frontend/src/pages/` |
| Frontend styles | `frontend/src/index.css` |
| Java controllers | `backend/src/main/java/com/Agri/Agriculture/controller/` |
| Database models | `backend/src/main/java/com/Agri/Agriculture/model/` |
| Spring config | `backend/src/main/resources/application.properties` |
| UI components | `frontend/src/components/ui/` |
| API utilities | `frontend/src/lib/` |

---

## 🔧 Troubleshooting Quick Links

| Issue | Check |
|-------|-------|
| Frontend not starting | `frontend/vite.config.ts` port |
| Can't find modules | `frontend/vite.config.ts` path alias |
| Backend DB error | `backend/src/main/resources/application.properties` |
| Docker won't start | `docker-compose.yml` service names |
| Styles not loading | `frontend/tailwind.config.ts` content paths |

---

## 📚 Key Files to Know

### Frontend
- `frontend/package.json` - Dependencies & scripts
- `frontend/vite.config.ts` - Build configuration
- `frontend/tsconfig.app.json` - TypeScript settings
- `frontend/Dockerfile` - Container build

### Backend
- `backend/pom.xml` - Dependencies & build config
- `backend/src/main/resources/application.properties` - Spring config
- `backend/Dockerfile` - Container build

### Root
- `docker-compose.yml` - Multi-service orchestration
- `package.json` - Workspace scripts
- `README.md` - Full documentation
- `tsconfig.json` - Root TypeScript config

---

## ✅ No More Path Conflicts

**Before Reorganization:**
```
❌ src/ (frontend)
❌ Agriculture/src/ (backend)
   → Built tools confused about which src/ to use
```

**After Reorganization:**
```
✅ frontend/src/ (React)
✅ backend/src/ (Java)
   → Clear separation, no conflicts!
```

---

## 🎓 Development Workflow

### 1. Start with Frontend
```bash
cd frontend && npm run dev
```

### 2. In another terminal, start Backend
```bash
cd backend && mvn spring-boot:run
```

### 3. Open browser
```
http://localhost:5173    # Frontend
http://localhost:8080    # Backend API
```

### 4. Or use Docker for everything
```bash
docker-compose up
```

---

## 📊 Project Stats

- **Frontend**: React + 30+ UI components
- **Backend**: Spring Boot with 5+ REST controllers
- **Database**: PostgreSQL with auto-initialization
- **Deployment**: Docker + Docker Compose ready
- **Documentation**: 3 comprehensive READMEs

---

**Last Updated**: November 29, 2025  
**Reorganization**: ✅ Complete
