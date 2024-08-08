import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes
app.use('/api', routes); // Assuming your routes are for API, otherwise use '/' or the desired path

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

