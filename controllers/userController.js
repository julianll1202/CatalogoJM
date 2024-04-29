const { PrismaClient, Class } = require('@prisma/client')

const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const saltRounds = 10;

export const findUserByName = async (userName) => {
    try {
        console.log(userName)
        const user = await prisma.user.findFirst({
            where: {
                userName: userName
            }
        })
        return user
    } catch (err) {
        console.log(err)
        return 'User not found'
    }
}

export const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                userName: true,
                role: {
                    select: {
                        roleName: true,
                    }
                }
            }
        })
        return users
    } catch (err) {
        return []
    }
}

export const getUserById = async (id) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
        return user
    } catch (err) {
        return 'User not found'
    }
}

export const addUser = async (userInfo) => {
    try {
        let user = {}
        bcrypt.hash(userInfo.password, saltRounds, async function(err, hash) {
            user = await prisma.user.create({
                data: {
                    userName: userInfo.name,
                    password: hash,
                    roleId: userInfo.role
                }
            })
        });
        return user
    } catch (err) {
        console.log(err)
        return 'User not created'
    }
}

export const updateUser = async (userInfo) => {
    try {
        let user = {}
        bcrypt.hash(userInfo.password, saltRounds, async function(err, hash) {
            user = await prisma.user.update({
                where: {
                    id: userInfo.id
                },
                data: {
                    userName: userInfo.name,
                    password: hash,
                    roleId: userInfo.role
                }
            })
        });
        return user
    } catch (err) {
        console.log(err)
        return 'User not updated'
    }
}

export const deleteUser = async (id) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: id
            }
        })
        return user
    } catch (err) {
        return 'User not deleted'
    }
}