import { JWT_SECRET_KEY } from '../config'
const jwt = require('jsonwebtoken')

export function generateAccessToken (user) {
    return jwt.sign({ userId: user.id }, JWT_SECRET_KEY, {
        expiresIn: 150
    })
}

export const generateRefreshToken = (user, jti) => {
    return jwt.sign({ userId: user.id, jti }, JWT_SECRET_KEY, {
        expiresIn: '8h'
    })
}

export const generateTokens = (user, jti) => {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user, jti)

    return {
        accessToken,
        refreshToken
    }
}
