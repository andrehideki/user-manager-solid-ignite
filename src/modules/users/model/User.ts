import { v4 as uuidV4 } from "uuid";

class User {
    
   constructor(id="", name: string, admin = false, email: string, createdAt: Date, updatedAt: Date) {
        id = id? id : uuidV4();
        Object.assign(this, { id, name, admin, email, createdAt, updatedAt });
    }
}

export { User };