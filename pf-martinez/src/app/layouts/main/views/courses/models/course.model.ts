export interface CourseModel {
    id: number;
    name: string;
    durations: number;
    typeDuration: string;
    description: string;
    price: number;
    modality: Array<number>;
    career: Array<number>;
    status: number;
    schedule:{
        start: string;
        end?: string;
    },
    type?: string;
}

export interface CareerModel {
    id: number;
    name: string;
    status: number;
    price: number;
    durations: number;
    description: string;
    type?: string;
}


export interface ModalityModel {
    id: number;
    name: string;
}