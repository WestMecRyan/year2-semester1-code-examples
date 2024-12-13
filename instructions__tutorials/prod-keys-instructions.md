# Client Repository (Vite/React)

## .env setup

```env
# .env.development
VITE_API_BASE_URL=${CODESPACE_API_URL}

# .env.production
VITE_API_BASE_URL=https://your-production-server.com
```

## Axios Configuration

```javascript
// src/config/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
```

# Server Repository (Express/Mongoose)

## .env setup

```env
# .env.development
FRONTEND_DB_URI=${MONGO_PROD_CLIENT_URI}
BACKEND_DB_URI=${MONGO_PROD_SERVER_URI}
PORT=3000

# .env.production
FRONTEND_DB_URI=mongodb+srv://user:pass@cluster.mongodb.net/frontend
BACKEND_DB_URI=mongodb+srv://user:pass@cluster.mongodb.net/backend
PORT=3000
```

## Database Configuration

```javascript
// src/config/database.js
import mongoose from "mongoose";

export const connectFrontendDB = async () => {
  try {
    const frontendConnection = await mongoose.createConnection(
      process.env.FRONTEND_DB_URI
    );
    console.log("Frontend database connected successfully");
    return frontendConnection;
  } catch (error) {
    console.error("Frontend database connection error:", error);
    process.exit(1);
  }
};

export const connectBackendDB = async () => {
  try {
    const backendConnection = await mongoose.createConnection(
      process.env.BACKEND_DB_URI
    );
    console.log("Backend database connected successfully");
    return backendConnection;
  } catch (error) {
    console.error("Backend database connection error:", error);
    process.exit(1);
  }
};
```
