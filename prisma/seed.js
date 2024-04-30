const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const categs = [
    //Camiones
    { name: 'Tractor Camion', class: 'CAMION' },
    { name: 'Cama baja', class: 'CAMION' },
    { name: 'Autobus', class: 'CAMION' },
    { name: 'Plataforma', class: 'CAMION' },
    { name: 'Pipa de Agua', class: 'CAMION' },
    { name: 'Volteos', class: 'CAMION' },
    { name: 'Roll Off', class: 'CAMION' },
    //Maquinaria pesada
    { name: 'Cargador', class: 'MAQUINARIA_PESADA' },
    { name: 'Compactadora', class: 'MAQUINARIA_PESADA' },
    { name: 'Excavadora', class: 'MAQUINARIA_PESADA' },
    { name: 'Retroexcavadora ', class: 'MAQUINARIA_PESADA' },
    { name: 'Topador', class: 'MAQUINARIA_PESADA' },
    { name: 'Motoconformadora', class: 'MAQUINARIA_PESADA' },
    { name: 'Mini cargador', class: 'MAQUINARIA_PESADA' },
    { name: 'Mini excavadora', class: 'MAQUINARIA_PESADA' },
    //Remolques
    { name: 'Caja seca', class: 'REMOLQUE' },
    { name: 'Caja refrigerada', class: 'REMOLQUE' },
    { name: 'Cama baja', class: 'REMOLQUE' },
    { name: 'Plataforma', class: 'REMOLQUE' },
    { name: 'Pipa', class: 'REMOLQUE' },
    //Gruas
    { name: 'Arrastre', class: 'GRUA' },
    { name: 'Articulada', class: 'GRUA' },
    { name: 'Broca', class: 'GRUA' },
    { name: 'Canastilla ', class: 'GRUA' }
]

const roles = [
    { roleName: 'Administrador'}, //Ver y editar todo
]

async function main() {
    const categories = await prisma.category.createMany({
        data: categs
    })
    await prisma.role.createMany({
        data: roles
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })