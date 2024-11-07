import express, {Request, Response} from 'express';
import connection from './config/connection.js';
import User from './models/User.js';
// import Thought from './models/Thought.js';


const app = express();
const PORT = process.env.PORT || 3333;


//Middleware
// Allows json tot he attaached to req.body in our routes.
app.use(express.json())

//Thi is the API Route to GET all users
app.get('/api/users', async (_, res: Response) => {
    const users = await User.find();

    res.json({
        users: users
    })
});

// This is the API Route to get a SINGLE user by its _id and populated thought and friend data
app.get('/api/user/:user_id', async (req: Request, res: Response) =>{
    const user_id = req.params.user_id;
   
    const user = await User.findById(user_id).populate('thoughts').populate('friends') ;
 
    res.json({
       user: user
    })
});

//This is the API Route to POST a new user
// app.post('/api/user', async (req:Request, res: Response)=> {
//     const {username, email} = req.body;

//     const newUser = 
// })


// app.post('/api/users', async (req: Request, res: Response) => {
// try {
// // If req.body is the users infor (email, password), how do i use the model to create the user with req.body?
// const user = await User.create(req.body)


// res.json({
//     user: user
// });

// } catch (error: any) {
//     const errors: String[] = [];
//         console.log(error)
//     if (error.code === 11000) {
//         errors.push('That email adddress is already in use');
//     } else {
//         for (const prop in error.errors) {
//             errors.push(error.errors[prop].message);
    
//     }
//     }
//         res.status(403).json({
//             errors: errors
//         })
//     }
// });

// //Create a POST route that adds a note for a user
// app.post('/api/note', async (req: Request, res: Response) => {
//     //req.body should have a user_id and test which is the text of the note

//     //Find the user from the DB, using the User model
// const user = await User.findById(req.body.user_id);
//     //Push a new note object/doc to the users notes array property
//     user?.notes.push({
//         text: req.body.text
//     })

// await user?.save();


//     res.json({
//         user: user
//     })
// });

// // Get a single user and their notes
// app.get('/api/user/:user_id', async (req: Request, res: Response) =>{
//  const user_id = req.params.user_id;

//  //Creater a variable that stores the user we find by id
//  const user = await User.findById(user_id);

//  //SEnd a json response back to the client with the user attached
//  res.json({
//     user: user
//  })


// })


connection.once('open', ()=> {
    app.listen(PORT, () => {
        console.log('Express server started on', PORT);
    });
});