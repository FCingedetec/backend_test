import express from 'express';
import { login} from '../controllers/auth.controller';
import { checkJWT } from '../middlewares/jwt';


//estableceme las rutas
const router = express.Router();

//login
router.post('/login',login);


export default router;
