import { User } from "../models/User";

interface IUserRepository {
    create(user: User): Promise<User>;
}

export { IUserRepository };