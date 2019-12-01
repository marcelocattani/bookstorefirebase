

export interface Roles{
    role_text: string;
    editor?: boolean;
    admin?: boolean;
    client?:boolean;
    collaborator?: boolean;
}


export interface UserInterface {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles?: Roles;
}