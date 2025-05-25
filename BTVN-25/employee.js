import {Base} from "./base.js";

export class Employee extends Base{
  #address

  constructor(id, name, address) {
    super(id, name)
    this.#address = address
  }

  getAddress() {
    return this.#address
  }

  setAddress(address) {
    this.#address = address
  }

  toString() {
    return `Employee(id = ${this.getId()}, name = ${this.getName()}, address = ${this.#address})`
  }
}