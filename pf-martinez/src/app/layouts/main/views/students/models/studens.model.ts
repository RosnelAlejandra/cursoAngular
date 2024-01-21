export interface StudentModel{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateIncription: Date;
    course: Array<elementCourse>;
    career: Array<elementCourse>;
    statusPay: number; /* Pendiente de Pago | Pagado */
    numberPay?: string; /* numero de pago/deposito/trasferencia */
}

export interface elementCourse {
    id: number; 
    name: string;
}
