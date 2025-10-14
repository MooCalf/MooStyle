# MooStyle Development Startup Guide

## Daily Startup Routine ✅

### 1. Start Backend Server
```bash
cd "E:\Website Making\Modding Website\backend"
npm run dev
```
**Expected Output:**
```
[nodemon] starting `node server.cjs`
🔗 Connected to MongoDB
🚀 Server running on port 5000
```

### 2. Start Frontend Server
```bash
cd "E:\Website Making\Modding Website"
npm run dev
```
**Expected Output:**
```
  VITE v7.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 3. Run Migrations (Only When Needed)
```bash
cd "E:\Website Making\Modding Website\backend"
npm run migrate
```
**When to run migrations:**
- ✅ After updating database schema
- ✅ After adding new user fields
- ✅ After modifying existing models
- ❌ **NOT needed** for regular daily startup

## Complete Startup Checklist

### Before Starting:
- [ ] Check if MongoDB Atlas is accessible
- [ ] Ensure no other processes are using ports 3000/5000
- [ ] Verify environment variables are set

### Startup Order:
1. **Backend First** (Port 5000)
   ```bash
   cd "E:\Website Making\Modding Website\backend"
   npm run dev
   ```

2. **Frontend Second** (Port 3000)
   ```bash
   cd "E:\Website Making\Modding Website"
   npm run dev
   ```

3. **Migrations Last** (Only if needed)
   ```bash
   cd "E:\Website Making\Modding Website\backend"
   npm run migrate
   ```

## Verification Steps

### 1. Backend Health Check
Visit: `http://localhost:5000/api/health`
**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

### 2. Frontend Access
Visit: `http://localhost:3000`
**Expected:** MooStyle homepage loads

### 3. Database Connection
Check console logs for:
```
🔗 Connected to MongoDB
```

## Troubleshooting Common Issues

### Port Already in Use
```bash
# Kill processes on ports 3000/5000
netstat -ano | findstr :3000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### MongoDB Connection Issues
```bash
# Check if MongoDB Atlas is accessible
ping moostyles.ilo9smk.mongodb.net
```

### Missing Dependencies
```bash
# Reinstall dependencies
cd "E:\Website Making\Modding Website\backend"
npm install

cd "E:\Website Making\Modding Website"
npm install
```

## Development Workflow

### Daily Development:
1. **Start Backend**: `cd backend && npm run dev`
2. **Start Frontend**: `cd .. && npm run dev`
3. **Develop**: Make changes, test features
4. **Shutdown**: Ctrl+C to stop both servers

### After Database Changes:
1. **Start Backend**: `cd backend && npm run dev`
2. **Run Migrations**: `npm run migrate`
3. **Start Frontend**: `cd .. && npm run dev`
4. **Test**: Verify changes work correctly

## Quick Commands Reference

### Backend Commands:
```bash
cd "E:\Website Making\Modding Website\backend"

# Start development server
npm run dev

# Run migrations
npm run migrate

# Create admin user
npm run create-admin

# Start production server
npm start
```

### Frontend Commands:
```bash
cd "E:\Website Making\Modding Website"

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Environment Setup

### Required Environment Variables:
```bash
# Backend (.env file)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/moostyle?retryWrites=true&w=majority
JWT_SECRET=moostyle-super-secret-jwt-key-2024-change-in-production
PORT=5000
NODE_ENV=development
```

### Port Configuration:
- **Backend**: Port 5000
- **Frontend**: Port 3000
- **Database**: MongoDB Atlas (cloud)

## Production vs Development

### Development Mode:
- **Backend**: `npm run dev` (with nodemon for auto-restart)
- **Frontend**: `npm run dev` (with Vite hot reload)
- **Database**: MongoDB Atlas (same as production)

### Production Mode:
- **Backend**: `npm start` (without nodemon)
- **Frontend**: `npm run build` (static files)
- **Database**: MongoDB Atlas (same as development)

## Security Notes

### Development:
- ✅ MongoDB Atlas IP whitelisting configured
- ✅ JWT secrets set
- ✅ CORS configured for localhost

### Production Checklist:
- [ ] Change JWT_SECRET
- [ ] Update CORS origins
- [ ] Set NODE_ENV=production
- [ ] Configure proper domain names

## Summary

**Your startup routine is perfect!** 🎉

**Daily Startup:**
1. `cd backend && npm run dev`
2. `cd .. && npm run dev`

**After Database Changes:**
3. `cd backend && npm run migrate`

**That's it!** Your existing accounts (MooCalf and MekMek) will work seamlessly with all features.
