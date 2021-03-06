import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/App.Error';
import User from '../models/User';

interface Request {
    user_id: number;
    avatarFilename: string; 
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if(!user) {
            throw new AppError('Não tem permissão para alterar avatar', 401);
        }

        if(user.avatar) {
            const userAvatarFilePath = path.resolve(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

            user.avatar = avatarFilename;

            await usersRepository.save(user);

            return user;
    }
}

export default UpdateUserAvatarService;