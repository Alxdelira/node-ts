
const db = [
    {
        name: "Alexandre",
        email: "alx.delira@dev.com"
    }
];
export class UserService {
    deleteUser(email: string) {
        throw new Error('Method not implemented.');
    }
  
    creatUser = (name: string, email: string) =>{
        const user ={
            name, 
            email
        }

        db.push(user)
        console.log("DB Atualizado", db)
    }

    getAllUsers = () => {
        return db
    }
}