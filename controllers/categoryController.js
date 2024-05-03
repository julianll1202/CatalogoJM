const { PrismaClient, Class } = require('@prisma/client')

const prisma = new PrismaClient()

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                class: true,
                _count: {
                    select: {
                        products: true,

                    }
                }
            }
        })
        return categories
    } catch (err) {
        return []
    }
}
export const getCategoriesOfClass = async (vClass) => {
    try {
        let categories = []
        switch (vClass) {
            case 'CAMION':
                categories = await prisma.category.findMany({
                    where: {
                        class: Class.CAMION
                    },
                    select: {
                        id: true,
                        name: true
                    }
                })
                break
            case 'MAQUINARIA_PESADA':
                categories = await prisma.category.findMany({
                    where: {
                        class: Class.MAQUINARIA_PESADA
                    },
                    select: {
                        id: true,
                        name: true
                    }
                })
                break
            case 'REMOLQUE':
                categories = await prisma.category.findMany({
                    where: {
                        class: Class.REMOLQUE
                    },
                    select: {
                        id: true,
                        name: true
                    }
                })
                break
            case 'GRUA':
                categories = await prisma.category.findMany({
                    where: {
                        class: Class.GRUA
                    },
                    select: {
                        id: true,
                        name: true
                    }
                })
                break
        }
        return categories
    } catch (err) {
        console.error(err)
        return []
    }
}
export const getClasses = async () => {
    return await Class;
}
export const getCategoryById = async (id) => {
    try {
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        })
        return category
    } catch (err) {
        return {}
    }
}

export const addCategory = async (catInfo) => {
    try {
        let category = {}
        switch (Number(catInfo.class)) {
            case 1:
                category = await prisma.category.create({
                    data: {
                        name: catInfo.name,
                        class: Class.CAMION
                    }
                })
                break
            case 2:
                category = await prisma.category.create({
                    data: {
                        name: catInfo.name,
                        class: Class.MAQUINARIA_PESADA
                    }
                })
                break
            case 3:
                category = await prisma.category.create({
                    data: {
                        name: catInfo.name,
                        class: Class.REMOLQUE
                    }
                })
                break
            case 4:
                category = await prisma.category.create({
                    data: {
                        name: catInfo.name,
                        class: Class.GRUA
                    }
                })
                break
        }
        console.log(category)
        return category
    } catch (err) {
        console.log(err)
        return 'Category not created'
    }
}

export const updateCategory = async (catInfo) => {
    try {
        const category = await prisma.category.update({
            where: {
                id: Number(catInfo.id)
            },
            data: {
                name: catInfo.name,
            }
        })
        return category
    } catch (err) {
        return 'Category not updated'
    }
}

export const deleteCategory = async (id) => {
    try {
        const category = await prisma.category.delete({
            where: {
                id: id
            }
        })
        return category
    } catch (err) {
        return 'Category not deleted'
    }
}