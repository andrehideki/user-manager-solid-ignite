import { User } from "../../models/User";
import { IUserRepository } from "../IUserRepository";

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

    create(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            this.users.push(user);
            return resolve(user);
        });
    }

}

export { UserRepositoryMemory };