import {Router} from 'express'
import {loggedInUser, login, signup} from "../controllers/auth";
import {validate} from "../middlewares/validate";
import {LoginSchema, SignUpSchema} from "../schema/users";
import {errorHandler} from "../error-handler";
import authMiddleware from "../middlewares/auth";

const auths: Router = Router();

auths.post('/login', validate(LoginSchema), errorHandler(login));
auths.post('/signup', validate(SignUpSchema),errorHandler(signup));
auths.post('/loggedIn', [authMiddleware],errorHandler(loggedInUser));

export default auths