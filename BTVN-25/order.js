
export class Order {
  #id;
  #customer; //tham chiếu đến đối tượng Customer
  #products=[]; // mảng các đối tượng Product
  #orderDate;

  constructor(id, customer, orderDate) {
    this.#id = id;
    this.#customer = customer;
    this.#orderDate = orderDate;
  }

  getCustomer(){
    return this.#customer;
  }

  addProduct(product){
    this.#products.push(product);
  }

  deleteProduct(product){
    this.#products = this.#products.filter(prod => prod != product)
  }

  getProducts(){
    return this.#products;
  }

  toString(){
    return `Đơn hàng #${this.#id}, khách hàng: ${this.#customer.getName()}, ngày đặt: ${this.#orderDate.toLocaleDateString('vi-VN')}`;
  }

  calculateTotal (){
    let sumValue = 0;
    this.#products.forEach(product => {
        sumValue += product.getPrice()
    });
    return sumValue;
  }
}
