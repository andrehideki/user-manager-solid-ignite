import request from "supertest";
import { app } from "../..";
import { UserRepositoryMemory } from "../../modules/users/repositories/implementations/UserRepositoryMemory";
import { createUser, createUserAdmin } from "../modules/users/builders/UserBuilder";

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

    describe("[PATCH] /users/:user_id/admin", () => {
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

        it("Should not be able to turn a non existing user as admin", async () => {
            const notExistingId = "not_existing_id";
            const response = await request(app).patch(`/users/${notExistingId}/admin`)
                .expect(404);
            expect(response.body).toMatchObject({
                error: "User not found"
            });
        });
        
    });

    describe("[GET] /users/:user_id", () => {
        it("Should be able to get user profile by ID", async () => {
            const randomUser = createUser();
            const { body: createdUser } = await request(app).post("/users")
                .send({ name: randomUser.name, email: randomUser.email });
            const { body: findedUser } = await request(app).get(`/users/${createdUser.id}`)
                .expect(200);
            expect(findedUser).toMatchObject(createdUser);
        });

        it("Should not be able to show profile of a non existing user", async () => {
            const notExistingId = "not_existing_id";
            const response = await request(app).get(`/users/${notExistingId}`)
                .expect(404);
            expect(response.body).toMatchObject({
                error: "User not found"
            });
        });
        
    });
    
    describe("[GET] /users", () => {
        it("Should be able to list all users", async () => {
            const randomUsers = [ createUser(), createUser(), createUser(), createUserAdmin() ];
            const createdUsers = [];
            for (const user of randomUsers) {
                const { body: createdUser } = await request(app)
                    .post("/users")
                    .send({ name: user.name, email: user.email, admin: user.admin });
                createdUsers.push(createdUser);
            }
            const { body: findedUsers } = await request(app)
                .get("/users")
                .set("user_id", createdUsers.find(u => u.admin).id)
                .expect(200);
            for (const user of createdUsers) {
                expect(findedUsers.find((u: { id: any; }) => user.id == u.id)).toMatchObject(user);
            }
        });

        it("Should not be able to a non admin user get list of all users", async () => {
            const randomUser = createUser();
            const { body: createdUser } = await request(app)
                .post("/users")
                .send({ name: randomUser.name, email: randomUser.email });
            const response = await request(app)
                .get("/users")
                .set("user_id", createdUser.id)
                .expect(400);
            expect(response.body).toMatchObject({
                error: "Not allowed"
            });
        });
        
        it("Should not be able to a non existing user get list of all users", async () => {
            const notExistingId = "not_existing_id";
            const response = await request(app)
                .get("/users")
                .set("user_id", notExistingId)
                .expect(400);
            expect(response.body).toMatchObject({
                error: "User not found"
            });
        });
        
    });

});