import { User } from "../../../../modules/users/model/User";

describe("User", () => {

    it("Should be able to create an user with all props", async () => {
        const createdAt = new Date();
        const updatedAt = new Date();
        const user = new User("fakeid", "fulano", false, "fulano@mail.com", createdAt, updatedAt);
        console.log(user);
        expect(user).toMatchObject({
            id: "fakeid",
            name: "fulano",
            admin: false,
            email: "fulano@mail.com",
            createdAt,
            updatedAt
        });
    });
});