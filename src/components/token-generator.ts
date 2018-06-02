import { v4 as uuid } from 'uuid';

export class TokenGenerator {
    
    generateToken() {
        const id: string = uuid()
        return id
    }
}
