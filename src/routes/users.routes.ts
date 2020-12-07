import { Router, request } from 'express';
import UserMap from "../mappers/UserMap";
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAutheticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const CreateUser = new CreateUserService();

        const user = await CreateUser.execute({
            name,
            email,
            password,
        }); 

        const mappedUser = UserMap.toDTO(user)
        
        return response.json(mappedUser);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch('/avatar',
    ensureAuthenticated,
    upload.single('avatar'), 
    async (request, response) => {
            const updateUserAvatar = new UpdateUserAvatarService()

            const user = await updateUserAvatar.execute({
                user_id: request.user.id,
                avatarFilename: request.file.filename,
            });

            return response.json(user);
    }
);

export default usersRouter;
