# guide to add a dev secret for read access to production database

## MAKE SURE YOU ADD .env* to your .gitignore file!!!!
.env*
### assume you are team f

#### CLIENT SIDE SECRETS
1. team f leader opens
`teamf-mecazon-client-dev` github repo

2. in your `.env.development` file in your react client project folder
- add all below as one line (no spaces)
```bash
VITE_API_URI_DEV=
${codespace_name:+https://${codespace_name}-3000.app.github.dev}
${codespace_name:-http://localhost:3000}
```
3. when making axios calls use
```js
// usage in components:
const api = axios.create({
  baseurl: import.meta.env.VITE_API_URI_DEV
})
const getdata = async () => {
  const response = await api.get('/api-endpoint')
  // ...
}
```

#### server side secret
1. team f leader opens
`teamf-mecazon-server-dev` github repo

2. open settings for the repo

3. go to `secrets and variables`

4. click on `codespaces`

5. click green `new repository secret` button

6. type `MONGO_DEV_SERVER_URI`

7. paste the secret uri morales sends to the team leads in the `secret` box.

8. click green `add secret` button

9. make a new codespace secret

10. type `MONGO_DEV_CLIENT_URI`

11. paste the secret morales sends you

12. click green `add secret button`

13. in your `.env.development` file in your server project folder, add:
```bash
MONGO_SERVER_URI=${MONGO_DEV_SERVER_URI}
MONGO_CLIENT_URI=${MONGO_DEV_CLIENT_URI}
PORT=3000
```
14.
```js
import mongoose from 'mongoose';

export const connectServerDB = async () => {
  try {
    const serverDB = await mongoose.createConnection(process.env.MONGO_SERVER_URI);
    console.log('Server database connected');
    return serverDB;
  } catch (error) {
    console.error('Server database connection error:', error);
    process.exit(1);
  }
};

export const connectClientDB = async () => {
  try {
    const clientDB = await mongoose.createConnection(process.env.MONGO_CLIENT_URI);
    console.log('Client database connected');
    return clientDB;
  } catch (error) {
    console.error('Client database connection error:', error);
    process.exit(1);
  }
};

// Initialize both database connections
const serverDB = await connectServerDB();
const clientDB = await connectClientDB();

// Create your models using the appropriate connection
const Users = serverDB.model('User', userSchema);
const Products = clientDB.model('Product', productSchema);
```
