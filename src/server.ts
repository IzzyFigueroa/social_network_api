import express from 'express';
import connection from './config/connection.js';
import api_routes from './routes/api_routes.js'

// import Thought from './models/Thought.js';



const app = express();
const PORT = process.env.PORT || 3333;


//Middleware
// Allows json tot he attaached to req.body in our routes.
app.use(express.json())

app.use('/api', api_routes)



connection.once('open', ()=> {
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});