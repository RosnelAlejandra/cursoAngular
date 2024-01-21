export const dataCourse = [
    {
        id: 5000,
        name: 'Pintura',
        durations: 3,
        typeDuration: 'weeks',
        description: '',
        price: 30000,
        modality: 'online',
        idCareer: [1001],
        status: 1,  /* el curso esta activo para seleccionar */
        schedule:{
            start: '2024-02-01T00:00:00',
            end: '',
        }
    },
    {
        id: 5001,
        name: 'Dibujo',
        durations: 5,
        typeDuration: 'weeks',
        description: '',
        price: 50000,
        modality: 'online',
        idCareer: [1001],
        status: 1,
        schedule:{
            start: '2024-02-01T00:00:00',
            end: '',
        } 
    },
    {
        id: 5002,
        name: 'Imprenta',
        durations: 4,
        typeDuration: 'weeks',
        description: '',
        price: 45000,
        modality: 'online',
        idCareer: [1001],
        status: 1,
        schedule:{
            start: '2024-03-01T00:00:00',
            end: '',
        }
    },
    {
        id: 5003,
        name: 'Escultura',
        durations: 4,
        typeDuration: 'weeks',
        description: '',
        price: 45000,
        modality: 'online',
        idCareer: [1001],
        status: 1,
        schedule:{
            start: '2024-02-01T00:00:00',
            end: '',
        }
    },
    {
        id: 5004,
        name: 'Historia de la Moda',
        durations: 5,
        typeDuration: 'weeks',
        description: '',
        price: 35000,
        modality: 'online',
        idCareer: [1002],
        status: 1,
        schedule:{
            start: '2024-05-01T00:00:00',
            end: '',
        }
    },
    {
        id: 5005,
        name: 'Piano nivel 1',
        durations: 5,
        typeDuration: 'weeks',
        description: '',
        price: 25000,
        modality: 'presencial',
        idCareer: [1003],
        status: 1,
        schedule:{
            start: '2024-04-01T00:00:00',
            end: '',
        }
    },

];

export const dataCareers = [
    {
        id: 1001,
        name: 'Arte Contemporaneo',
        status: 1,
        price: 180000
    },
    {
        id: 1002,
        name: 'Diseño & Moda',
        status: 1,
        price: 86000
    },
    {
        id: 1003,
        name: 'Musica',
        status: 1,
        price: 80000
    },
]