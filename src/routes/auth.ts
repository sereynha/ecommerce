import {Router} from 'express'
import {loggedInUser, login, signup} from "../controllers/auth";
import {LoginSchema, SignUpSchema} from "../schema/users";

import authMiddleware from "../middlewares/auth";
import { errorHandler } from '../middlewares/error-handler';

const auths: Router = Router();

auths.post('/login', errorHandler({method: login, schema: LoginSchema}));
auths.post('/signup',errorHandler({method: signup, schema: SignUpSchema}));
auths.post('/loggedIn', [authMiddleware],errorHandler({method: loggedInUser}));

export default auths