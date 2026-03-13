export interface UserType {
    id?: string;
    nome: string;
    email: string;
    password: string;
    administrador?: string;
    description?: string;
}