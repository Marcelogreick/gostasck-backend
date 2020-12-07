import { Router } from 'express';
import SessionMap from "../mappers/SessionMap";

import AutheticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
        const { email, password } = request.body;

        const authenticateUser = new AutheticateUserService();

        const { user, token } = await authenticateUser.execute({
            email,
            password
        })

        const mappedSession = SessionMap.toDTO(user)

        return response.json({ mappedSession, token });
});

export default sessionsRouter;