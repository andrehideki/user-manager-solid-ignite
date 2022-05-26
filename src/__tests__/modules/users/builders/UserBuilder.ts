import { User } from "../../../../modules/users/models/User";

function createUser(): User {
    const randomNumber = Math.random() * 10000;
    return new User("", `User_${randomNumber}`, false, `user.${randomNumber}@mail.com`, new Date(), new Date());
}

export { createUser };