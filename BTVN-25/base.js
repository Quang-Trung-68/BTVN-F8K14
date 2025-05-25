export class Base {
  #id
  #name

  constructor(id, name) {
    this.#id = id
    this.#name = name
  }

  getId() {
    return this.#id
  }

  getName() {
    return this.#name
  }

  setName(name) {
    this.#name = name
  }

  toString() {
    return `Product(id = ${this.#id}, name = ${this.#name})`
  }
}