import request from "supertest";
import { app } from "../..";
import { UserRepositoryMemory } from "../../modules/users/repositories/implementations/UserRepositoryMemory";
import { createUser } from "../modules/users/builders/UserBuilder";

describe("user.routes", () => {
    
    describe("[POST] /users", () => {

        it("Should be able to create new users", async () => {
            const randomUser = createUser();
            const response = await request(app).post("/users")
                .send({
                    name: randomUser.name,
                    email: randomUser.email
                })
                .expect(201);
            
            expect(response.body).toMatchObject({
                name: randomUser.name,
                email: randomUser.email,
                admin: false
            });
            expect(await UserRepositoryMemory.getInstance().findById(response.body.id)).toMatchObject({
                name: randomUser.name,
                email: randomUser.email,
                admin: false
            });
        });
    });
});