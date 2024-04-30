import { deleteProductImages } from './imageController'

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
                        class: true
                    }
                },
                images: {
                    select: {
                        url: true
                    }
                }
            }
        })
        return products
    } catch (err) {
        return []
    }
}

export const getLatestProducts = async () => {
    try {
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                category: {
                    select: {
                        name: true,
                        class: true
                    }
                },
                images: {
                    select: {
                        url: true
                    }
                }
            },
            take: 5,
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
            },
            select: {
                id: true,
                name: true,
                price: true,
                description: true,
                category: {
                    select: {
                        name: true,
                    }
                },
                images: {
                    select: {
                        url: true
                    }
                }
            }
        })
        return product
    } catch (err) {
        return {}
    }
}

// ************** categories *************
export const getProductsOfCategory = async (categoryName) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    id: categoryName
                }
            },
            select: {
                id: true,
                name: true,
                price: true,
                category: {
                    select: {
                        name: true,
                    }
                },
                images: {
                    select: {
                        url: true
                    }
                }
            }
        })
        return products
    } catch (err) {
        return []
    }
}

// ************** classes *************
export const getProductsOfClass = async (classNum) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    class: classNum
                }
            }
        })
    } catch (err) {
        return []
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
                id: Number(prodInfo.id)
            },
            data: {
                name: prodInfo.name,
                description: prodInfo.description,
                price: Number(prodInfo.price),
                categoryId: Number(prodInfo.categoryId)
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
        // await deleteProductImages(id)
        console.log(product)
        return product
    } catch (err) {
        console.log(err)
        return 'Product not deleted'
    }
}

