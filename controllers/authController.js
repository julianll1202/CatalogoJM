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
    console.log(user)
    if (userDB !== 'User not found') {
        const result = bcrypt.compare(user.password, userDB.password);
        console.log(result);
        if (result) {
            const jti = randomUUID()
            const { accessToken, refreshToken } = generateTokens(user, jti)
            await addRefreshTokenToWhitelist({ jti, refreshToken: hashToken(refreshToken), userId: userDB.id })
            return { response: 'Authorized entry', user: userDB, accessToken: accessToken, refreshToken: refreshToken }
        } else {
            return { response: 'Invalid password'}
        }
    } else {
        return { response: 'Invalid password'}
    }
}

export const logout = async (req, res) => {
    const { userId } = req.body
    try {
        await revokeTokens(userId)
        return { response: 'Logged out successfully' }
    } catch (err) {
        res.status(401)
        throw new Error({ response: 'Unauthorized' })
    }
}