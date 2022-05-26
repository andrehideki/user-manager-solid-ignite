import { v4 as uuidV4 } from "uuid";

class User {

    id: string;
    name: string;
    admin: boolean;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    
   constructor(id="", name: string, admin = false, email: string, createdAt: Date, updatedAt: Date) {
        this.id = id? id : uuidV4();
        this.name = name;
        this.admin = admin;
        this.email = email;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export { User };