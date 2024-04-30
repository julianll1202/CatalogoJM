import { generateTokens } from '../services/tokenService';
import { findUserByName } from './userController';
import { hashToken } from './../services/hashToken';
import { addRefreshTokenToWhitelist, revokeTokens } from '../services/authServices';
import { randomUUID } from 'crypto';

const { PrismaClient, Class } = require('@prisma/client')

const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const login = async (user) => {
    const userDB = await findUserByName(user.userName);
    console.log(userDB)
    if (userDB !== 'User not found') {
        const result = bcrypt.compare(user.password, userDB.password);
        if (result) {
            const jti = randomUUID()
            const { accessToken, refreshToken } =  generateTokens(userDB, jti)
            await addRefreshTokenToWhitelist({ jti, refreshToken: hashToken(refreshToken), userId: userDB.id })
            return { response: 'Authorized entry', user: userDB, accessToken: accessToken, refreshToken: refreshToken }
        } else {
            return { response: 'Invalid password'}
        }
    } else {
        return { response: 'Invalid password'}
    }
}

export const logout = async (id) => {
    try {
        await revokeTokens(id)
        return { response: 'Logged out successfully' }
    } catch (err) {
        return { response: 'Unauthorized' }
    }
}