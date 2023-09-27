export class Base{
    constructor(token){
        this.token = token;
        this.metodos = {
            get:"GET",
            post:"POST"
        }
        this.header = new Headers ({
            'Authorization': `Bearer ${this.token}`,
        })
    }

}