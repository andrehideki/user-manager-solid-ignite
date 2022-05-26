import { validate } from "uuid";
import { User } from "../../../../modules/users/models/User";

describe("User", () => {

    it("Should be able to create an user with all props", async () => {
        const createdAt = new Date();
        const updatedAt = new Date();
        const user = new User("", "fulano", false, "fulano@mail.com", createdAt, updatedAt);
        expect(user).toMatchObject({
            id: user.id,
            name: "fulano",
            admin: false,
            email: "fulano@mail.com",
            createdAt,
            updatedAt
        });
        expect(validate(user.id)).toBeTruthy();
    });
});