import express from 'express';

const app = express();


app.use(express.json());



const PORT = 8000;


// starting the server 
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})
