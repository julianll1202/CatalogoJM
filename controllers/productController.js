const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const getProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                category: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        return products
    } catch (err) {
        return []
    }
}

export const getProductById = async (id) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })
        return product
    } catch (err) {
        return {}
    }
}

export const addProduct = async (prodInfo) => {
    try {
        console.log(prodInfo)
        const product = await prisma.product.create({
            data: {
                name: prodInfo.name,
                description: prodInfo.description,
                price: Number(prodInfo.price),
                categoryId: Number(prodInfo.categoryId)
            }
        })
        return product
    } catch (err) {
        console.log(err)
        return 'Product not added'
    }
}

export const updateProduct = async (prodInfo) => {
    try {
        const product = await prisma.product.update({
            where: {
                id: prodInfo.id
            },
            data: {
                name: prodInfo.name,
                description: prodInfo.description,
                price: prodInfo.price,
                categoryId: prodInfo.category
            }
        })
        return product
    } catch (err) {
        return 'Product not updated'
    }
}

export const deleteProduct = async (id) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: id
            }
        })
        return product
    } catch (err) {
        return 'Product not deleted'
    }
}