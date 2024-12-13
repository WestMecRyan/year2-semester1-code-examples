# Server/Client Axios Mongoose MongoDB connectio instructions
- MAKE SURE TO ADD .env* to your .gitignore files and always check the github repo after pushes to check that .env files have NOT been exposed

## Client Repository (Vite/React)

### .env setup
```env
# .env.development
VITE_API_URI_DEV=${CODESPACE_NAME:+https://${CODESPACE_NAME}-3000.app.github.dev}${CODESPACE_NAME:-http://localhost:3000}
```

## Axios Configuration
```javascript
// src/config/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
```

# Server Repository (Express/Mongoose)

## .env setup
```env
# .env.production
MONGO_CLIENT_URI=${MONGO_PROD_CLIENT_URI}
MONGO_SERVER_URI=${MONGO_PROD_SERVER_URI}
PORT=3000
```

## Database Configuration
```javascript
// src/config/database.js
import mongoose from 'mongoose';

export const connectFrontendDB = async () => {
  try {
    const frontendConnection = await mongoose.createConnection(process.env.MONGO_CLIENT_URI);
    console.log('Frontend database connected successfully');
    return frontendConnection;
  } catch (error) {
    console.error('Frontend database connection error:', error);
    process.exit(1);
  }
};

export const connectBackendDB = async () => {
  try {
    const backendConnection = await mongoose.createConnection(process.env.MONGO_SERVER_URI);
    console.log('Backend database connected successfully');
    return backendConnection;
  } catch (error) {
    console.error('Backend database connection error:', error);
    process.exit(1);
  }
};
```
