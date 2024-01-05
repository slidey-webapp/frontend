export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other',
}

export interface ExampleGridDto {
    id: string;
    name: string;
    code: string;
    age: number;
    gender: Gender;
}
