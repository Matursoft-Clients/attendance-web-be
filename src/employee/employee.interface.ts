export interface EmployeeDTO {
    uuid: string;
    name: string;
    email: string;
    photo: string;
    created_at?: Date;
    updated_at?: Date;
}