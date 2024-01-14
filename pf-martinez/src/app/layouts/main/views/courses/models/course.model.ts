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
        start: Date;
        end?: Date;
    }
}

export interface CareerModel {
    id: number;
    name: string;
}
