import { User } from "../models/User";

interface IUserRepositoryCreate {
    name: string;
    email: string;
    admin?: boolean;
}

interface IUserRepository {
    create(user: IUserRepositoryCreate): Promise<User>;
    list(): Promise<User[]>;
}

export { 
    IUserRepository, 
    IUserRepositoryCreate 
};