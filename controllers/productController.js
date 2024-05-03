import { deleteProductImages } from './imageController'

const { PrismaClient, Class } = require('@prisma/client')

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
            take: 3,
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
export const getProductsOfCategory = async (categoryId) => {
    try {
        console.log(categoryId)
        const products = await prisma.product.findMany({
            where: {
                categoryId: categoryId
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
        console.log(products)
        return products
    } catch (err) {
        console.error(err)
        return []
    }
}

// ************** classes *************
export const getProductsOfClass = async (vClass) => {
    try {
        let products = []
        switch (vClass) {
            case 'CAMION':
                products = await prisma.product.findMany({
                    where: {
                        category: {
                            class: Class.CAMION
                        }
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
                break
            case 'MAQUINARIA_PESADA':
                products = await prisma.product.findMany({
                    where: {
                        category: {
                            class: Class.MAQUINARIA_PESADA
                        }
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
                break
            case 'REMOLQUE':
                products = await prisma.category.findMany({
                    where: {
                        category: {
                            class: Class.REMOLQUE
                        }
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
                break
            case 'GRUA':
                products = await prisma.category.findMany({
                    where: {
                        category: {
                            class: Class.GRUA
                        }
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
                break
        }
        return products
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

