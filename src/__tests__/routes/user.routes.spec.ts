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

        it("Should be able to create new users", async () => {
            const randomUser = createUser();
            await request(app).post("/users")
                .send({
                    name: randomUser.name,
                    email: randomUser.email
                });
            const response = await request(app).post("/users")
                .send({
                    name: randomUser.name,
                    email: randomUser.email
                })
                .expect(400);
            expect(response.body.error).toBe("Email is already taken");
        });
    });

    describe("[PATCH] /:user_id/admin", () => {
        it("Should be able to turn an user as admin", async () => {
            const randomUser = createUser();
            const { body: createdUser } = await request(app).post("/users")
                .send({
                    name: randomUser.name,
                    email: randomUser.email
                });
            const { body: updatedUserAsAdmin } = await request(app).patch(`/users/${createdUser.id}/admin`)
                .expect(200);
            expect(updatedUserAsAdmin).toMatchObject({
                name: randomUser.name,
                email: randomUser.email,
                admin: true
            });
        });
        
    });

});