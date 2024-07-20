import express from 'express';
import connectToMongoDb from './connectToMongoDb.js';
import dotenv from 'dotenv'


const app = express();

app.use(express.json());

dotenv.config();

const PORT = 8000;


// starting the server 
app.listen(PORT, () => {
  connectToMongoDb();
    console.log(`Server running on ${PORT}`);
})
