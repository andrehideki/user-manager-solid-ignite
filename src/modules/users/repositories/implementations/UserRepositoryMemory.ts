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

    async findById(id: string): Promise<User|undefined> {
        const user = this.users.find(u => u.id === id);
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.users.find(u => u.email === email);
        return user;
    }

    async create(params: IUserRepositoryCreate): Promise<User> {
        const user = new User("", params.name, !!params.admin, params.email, new Date(), new Date());
        this.users.push(user);
        return user;
    }
    
    async list(): Promise<User[]> {
        return new Promise((resolve) => resolve(this.users));
    }

    async turnAdmin(user: User): Promise<User | undefined> {
        const savedUser = this.users.find(u => u.id === user.id);
        if (savedUser) {
            savedUser.admin = true;
            savedUser.updatedAt = new Date();
        }
        return savedUser;
    }   
}

export { UserRepositoryMemory };