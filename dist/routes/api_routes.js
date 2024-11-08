import { Router } from "express";
import { addFriend, createUser, deleteFriendFromUser, deleteUserById, getAllUsers, getUserWithFriendAndThought, updateUserById } from "../controllers/api_controllers.js";
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
export default router;
