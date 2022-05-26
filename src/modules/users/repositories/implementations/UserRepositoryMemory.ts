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