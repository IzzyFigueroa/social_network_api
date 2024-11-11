import { Request, Response } from 'express';
import User from '../models/User.js';
import Thought from '../models/Thought.js';





export async function createUser(req: Request, res: Response){
    try {
        const user = await User.create(req.body)
    res.json({
        user: user
    })
    } catch (error: any) {
        const errors: String[] = [];
        console.log(error)
        if (error.code === 11000) {
            errors.push('That email adddress is already in use');
        } else {
            for (const prop in error.errors) {
                errors.push(error.errors[prop].message);

            }
        }
        res.status(403).json({
            errors: errors
        })
    }
}

export async function getAllUsers(_: Request, res: Response) {
    const users = await User.find().populate('friends');

    res.json(users)
};

export async function getUserWithFriendAndThought(req: Request, res: Response)  {
    
        const userId = req.params.id;
        const user = await User.findById(userId)
            // .populate('thought')
            // .populate('friends');

         res.json(user);
}

export async function updateUserById(req: Request, res: Response) {
    
        const userId = req.params.id;
        const updateData = req.body;

         await User.findByIdAndUpdate(userId, updateData)

     
        res.json({
            message: 'Update successful!'
        });
   
}

export async function deleteUserById(req: Request, res: Response) {
        const userId = req.params.id;
        const deleteData = req.body

         await User.findByIdAndDelete(userId, deleteData);

res.json({ 
    message: 'User deleted successfully' 
});
    
}
   


export async function addFriend(req: Request, res: Response) {
    const userId = await User.findById(req.params.id);
    const friendId = req.body.friendId

    const user = await User.findById(userId);

    user?.friends.push(friendId);
    await user?.save();

    res.json({ message: 'Friend added successfully', user })

}

export async function deleteFriendFromUser(req: Request, res: Response) {
    const userId = req.params.id;
    const friendId = req.body.friendId


     await User.findByIdAndUpdate(userId, {
        $pull: {
            friends: friendId
        }
    });

res.json({ 
message: 'Friend deleted successfully' 
});

}

export async function getAllThoughts(_: Request, res: Response) {
    try {
        const allThoughts = await Thought.find().populate({
            path: 'user',
            select: 'username'
        });

        res.json(allThoughts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving thoughts', error });
    }
}
   


export async function getSingleThought(req: Request, res: Response) {

        const thoughtId = req.params.id;
        const thought = await Thought.findById(thoughtId).populate('user');
 

        res.json(thought);
   
}

export async function createThoughtForUser(req: Request, res: Response) {
    const user = await User.findById(req.body.id);
    console.log(user)
    const thought = await Thought.create({
        text: req.body.text,
        username: user?.username
    })
    user?.thoughts.push(thought._id)

    await user?.save();

    res.json({
        user: user
    })
}



export async function updateThoughtById(req: Request, res: Response) {

        const thoughtId = req.params.id;
        const updatedData = req.body;

        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, updatedData, { new: true });

        res.json(updatedThought);
}

export async function deleteThoughtById(req: Request, res: Response) {
    const userId = req.params.id;
    const thoughtId = req.body.thoughtId


     await User.findByIdAndUpdate(userId, {
        $pull: {
            thoughts: thoughtId
        }
    });

res.json({ 
message: 'Thought deleted successfully' 
});

}

export async function addReactionToThought(req: Request, res: Response) {
    
        const thoughtId = req.params.thoughtId;
        const { userId, reactionBody } = req.body;

       

        const user = await User.findById(userId);

        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $push: {
                    reactions: {
                        reactionBody: reactionBody,
                        username: user?.username
                    }
                }
            },
            { new: true }
        );

       

        res.json({
            message: 'Reaction added successfully',
            thought: updatedThought
        });
   
}


export async function deleteReactionById(req: Request, res: Response) {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.body.reactionId


     await Thought.findByIdAndUpdate(thoughtId, {
        $pull: {
            reactionBody: reactionId
        }
    });

res.json({ 
message: 'Reaction deleted successfully' 
});

}
