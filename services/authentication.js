import { randomUUID } from 'crypto';
import { JWT_SECRET_KEY } from '../config';
import { addRefreshTokenToWhitelist, deleteRefreshToken, findRefreshTokenById } from './authServices';
import { hashToken } from './hashToken';
import { getUserById } from '../controllers/userController';
import { generateTokens } from './tokenService';

const jwt = require('jsonwebtoken');

export async function authenticateToken(req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(400).send()
    }
    try {
        const token = authorization.split(' ')[1]
        console.log(token)
        const payload = jwt.verify(token, JWT_SECRET_KEY)
        console.log(payload)
        req.payload = payload
    } catch (err) {
        console.error(err)
        const refreshToken = req.cookies['refreshToken']
        if (!refreshToken){
            console.log('No refresh token')
            return res.status(400).send()
        }
        try {
            const payload = jwt.verify(refreshToken, JWT_SECRET_KEY)
            const savedRefreshToken = await findRefreshTokenById(payload.jti)

            console.log(savedRefreshToken)
            if (!savedRefreshToken || savedRefreshToken.revoked) {
                return res.status(400).send()
            }

            const hashedToken = hashToken(refreshToken)
            if (hashedToken !== savedRefreshToken.hashedToken) {
                return res.status(400).send()
            }
            console.log(payload.userId)
            const user = await getUserById(savedRefreshToken.userId)
            if (!user) {
                return res.status(400).send()
            }
            console.log(user)
            const jti = randomUUID()
            const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti)
            console.log(accessToken)
            await addRefreshTokenToWhitelist({ jti, refreshToken: hashToken(newRefreshToken), userId: user.id })
            await deleteRefreshToken(savedRefreshToken.id)
            const newPayload = jwt.verify(accessToken, JWT_SECRET_KEY)
            res.cookie("accessToken", accessToken, { maxAge: 3600000, httpOnly: false })
            res.cookie("refreshToken", newRefreshToken, { maxAge: 3600000, httpOnly: false })
            req.payload = newPayload
        } catch (err) {
            console.error(err)
            return res.status(400).send()
        }
    }

    return next()
  }
