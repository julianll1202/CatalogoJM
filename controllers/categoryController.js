const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany()
        return categories
    } catch (err) {
        return []
    }
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
        const category = await prisma.category.create({
            data: {
                name: catInfo.name,
            }
        })
        return category
    } catch (err) {
        return 'Category not created'
    }
}

export const updateCategory = async (catInfo) => {
    try {
        const category = await prisma.category.update({
            where: {
                id: catInfo.id
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