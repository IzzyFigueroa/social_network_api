import { Router } from "express";
import { addFriend, addReactionToThought, createThoughtForUser, createUser, deleteFriendFromUser, deleteReactionById, deleteThoughtById, deleteUserById, getAllThoughts, getAllUsers, getSingleThought, getUserWithFriendAndThought, updateThoughtById, updateUserById } from "../controllers/api_controllers.js";



const router = Router();
// /api/users routes
router.post('/users', createUser)

router.get('/users', getAllUsers)

router.get('/users/:id', getUserWithFriendAndThought)

router.put('/users/:id', updateUserById)

router.delete('/users/:id', deleteUserById)


// /api/users/:id/friends/friendId
router.post('/users/:id/friends/:friendId', addFriend);

router.delete('/users/:id/friends/:friendId', deleteFriendFromUser);

// /api/thoughts
router.get('/thoughts', getAllThoughts)

router.get('/thoughts/:id', getSingleThought) //ThoughtId

router.post('/thought', createThoughtForUser)

router.put('/thoughts/:id', updateThoughtById); //ThoughtId

router.delete('/thoughts/:id', deleteThoughtById)


// /api/thoughts/:thoughtId/reactions
router.post('/thoughts/:thoughtId/reactions', addReactionToThought)

router.delete('/thoughts/:thoughtId/reactions', deleteReactionById)


export default router;