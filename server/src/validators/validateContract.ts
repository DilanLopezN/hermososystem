import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

let errors: { message: string; }[] = []

function ValidationContract()  {
    errors = []
}

ValidationContract.prototype.userAlreadyExists =    async  (value: string, message: string) => {
        if(!value) {
            await prisma.user.findUnique({
                where: {
                    email: value
                }
            })
        }
        errors.push({message: message})
}

ValidationContract.prototype.errors = () => { 
    return errors; 
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

export { ValidationContract}