import express from 'express';
import { fetchAllUsers } from '../controllers/user.controller';
import { checkJWT } from '../middlewares/jwt';

const router = express.Router();
router.get('/users', [checkJWT], fetchAllUsers);

export default router;
