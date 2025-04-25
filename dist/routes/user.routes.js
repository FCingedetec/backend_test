import express from 'express';
import { fetchAllUsers } from '../controllers/user.controller';
const router = express.Router();
router.get('/users', fetchAllUsers);
export default router;
//# sourceMappingURL=user.routes.js.map