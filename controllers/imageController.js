const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const getAllImagesFromProduct = async (id) => {
    try {
        const images = await prisma.image.findMany({
            where: {
                productId: id,
            }
        })
    }  catch (err) {
        return []
    }
}

export const addImage = async (imgInfo) => {
    try {
        const img = await prisma.image.create({
            data: {
                productId: imgInfo.productId,
                url: imgInfo.url
            }
        })
    } catch (error) {
        return 'Image not uploaded'
    }
}

export const addImages = async (images) => {
    try {
        const img = await prisma.image.createMany({
            data: images
        })
    } catch (error) {
        console.log(error)
        return 'Images not uploaded'
    }
}

export const updateImages = async (images) => {
    try {
        const previousImages = await prisma.image.deleteMany({
            where: {
                productId: images[0].productId,
            }
        })
        const img = await prisma.image.createMany({
            data: images
        })
    } catch (error) {
        console.log(error)
        return 'Images not uploaded'
    }
}