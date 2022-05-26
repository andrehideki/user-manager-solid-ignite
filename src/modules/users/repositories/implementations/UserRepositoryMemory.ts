import { User } from "../../models/User";
import { IUserRepository, IUserRepositoryCreate } from "../IUserRepository";

class UserRepositoryMemory implements IUserRepository {

    private static INSTANCE: IUserRepository;
    users: User[];

    private constructor() {
        this.users = [];
    }
    
   
    public static getInstance(): IUserRepository {
        if (!UserRepositoryMemory.INSTANCE) {
            UserRepositoryMemory.INSTANCE = new UserRepositoryMemory();
        }
        return UserRepositoryMemory.INSTANCE;
    }

    findById(id: string): Promise<User|undefined> {
        return new Promise((resolve) => {
            const user = this.users.find(u => u.id === id);
            resolve(user);
        });
    }

    findByEmail(email: string): Promise<User | undefined> {
        return new Promise((resolve) => {
            const user = this.users.find(u => u.email === email);
            resolve(user);
        });
    }

    create(params: IUserRepositoryCreate): Promise<User> {
        return new Promise((resolve) => {
            const user = new User("", params.name, !!params.admin, params.email, new Date(), new Date());
            this.users.push(user);
            return resolve(user);
        });
    }

    list(): Promise<User[]> {
        return new Promise((resolve) => resolve(this.users));
    }
}

export { UserRepositoryMemory };