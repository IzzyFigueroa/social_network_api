import { Router } from "express";
import { addFriend, createThoughtForUser, createUser, deleteFriendFromUser, deleteUserById, getAllThoughts, getAllUsers, getSingleThought, getUserWithFriendAndThought, updateUserById } from "../controllers/api_controllers.js";
const router = Router();
// /api/users routes
router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserWithFriendAndThought);
router.put('/users/:id', updateUserById);
router.delete('/users/:id', deleteUserById);
// /api/users/:id/friends/friendId
router.post('/users/:id/friends/:friendId', addFriend);
router.delete('/users/:id/friends/:friendId', deleteFriendFromUser);
// /api/thoughts
router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:id', getSingleThought);
router.post('/thought', createThoughtForUser);
export default router;
