export interface StudentModel{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string; /* Estudiente | Profesor | ADMIN */
    dateIncription: Date;
    course: Array<number>;
    career: Array<number>;
    statusPay: number; /* Pendiente de Pago | Pagado */
    numberPay?: string; /* numero de pago/deposito/trasferencia */
}
