import { Base } from "./base.js";

export class Customer extends Base{
    #email;
    #phoneNumber;

    constructor(id,name,email,phoneNumber){
        super(id,name);
        this.#email = email;
        this.#phoneNumber = phoneNumber;
    }

    getEmail(){
        return this.#email;
    }

    setEmail(email){
        this.#email = email;
    }

    getPhoneNumber(){
        return this.#phoneNumber;
    }

    setPhoneNumber(phoneNumber){
        this.#phoneNumber = phoneNumber;
    }

    toString(){
        return `Khách hàng: ${this.getName()}, email: ${this.#email}, SĐT: ${this.#phoneNumber}`;
    }
}