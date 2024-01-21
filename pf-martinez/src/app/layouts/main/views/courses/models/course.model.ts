export interface CourseModel {
    id: number;
    name: string;
    durations: number;
    typeDuration: string;
    description: string;
    price: number;
    modality: string;
    idCareer: Array<number>;
    status: number;
    schedule:{
        start: string;
        end?: string;
    }
}

export interface CareerModel {
    id: number;
    name: string;
    status: number;
    price: number;
}
