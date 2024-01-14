export const dataCourse = [
    {
        id: 5000,
        name: 'Angular',
        durations: 3,
        typeDuration: 'weeks',
        description: 'Aprenderás a crear y mantener aplicaciones web en una sola página con Angular',
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
        name: 'Next.js',
        durations: 5,
        typeDuration: 'weeks',
        description: 'En este curso aprenderás los fundamentos del Server Side Rendering. Crearás una aplicación web autoadministrable con NextJS',
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
        name: 'React Js',
        durations: 4,
        typeDuration: 'weeks',
        description: 'En este curso, que es el tercer nivel de la carrera de programación, aprenderás a programar por componentes, mediante Javascript, JS, ES6, y también conocerás las ventajas de la utilización del flujos de datos',
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
        name: 'Diseño UX/UI',
        durations: 4,
        typeDuration: 'weeks',
        description: 'En este curso aprenderás a hacer un research, e investigar acerca de un problema que convertirás o en una idea de app o web',
        price: 45000,
        modality: 'online',
        idCareer: [1002, 1003],
        status: 1,
        schedule:{
            start: '2024-02-01T00:00:00',
            end: '',
        }
    },
    {
        id: 5004,
        name: 'Prototipado',
        durations: 5,
        typeDuration: 'weeks',
        description: 'Conocerás todo sobre el mundo del prototipado para modelar y testear tu propia web o app. Aprenderás a generar una solución rápida que te permita evaluar tu producto',
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
        name: 'UX Writing',
        durations: 5,
        typeDuration: 'weeks',
        description: 'En este curso aprenderás las nociones principales sobre UX Writing, y por qué es tan importante pensar en el contenido a la hora de diseñar una interfaz',
        price: 25000,
        modality: 'online',
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
        name: 'Programación',
        status: 1
    },
    {
        id: 1002,
        name: 'Diseño UX|UI',
        status: 1
    },
    {
        id: 1001,
        name: 'Product Design',
        status: 1
    },
]