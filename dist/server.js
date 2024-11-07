import express from 'express';
import connection from './config/connection.js';
import User from './models/User.js';
const app = express();
const PORT = process.env.PORT || 3333;
//Middleware
// Allows json tot he attaached to req.body in our routes.
app.use(express.json());
app.post('/api/users', async (req, res) => {
    try {
        // If req.body is the users infor (email, password), how do i use the model to create the user with req.body?
        const user = await User.create(req.body);
        res.json({
            user: user
        });
    }
    catch (error) {
        const errors = [];
        console.log(error);
        if (error.code === 11000) {
            errors.push('That email adddress is already in use');
        }
        else {
            for (const prop in error.errors) {
                errors.push(error.errors[prop].message);
            }
        }
        res.status(403).json({
            errors: errors
        });
    }
});
//Create a POST route that adds a note for a user
app.post('/api/note', async (req, res) => {
    //req.body should have a user_id and test which is the text of the note
    //Find the user from the DB, using the User model
    const user = await User.findById(req.body.user_id);
    //Push a new note object/doc to the users notes array property
    user?.notes.push({
        text: req.body.text
    });
    await user?.save();
    res.json({
        user: user
    });
});
// Get a single user and their notes
app.get('/api/user/:user_id', async (req, res) => {
    const user_id = req.params.user_id;
    //Creater a variable that stores the user we find by id
    const user = await User.findById(user_id);
    //SEnd a json response back to the client with the user attached
    res.json({
        user: user
    });
});
connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});
