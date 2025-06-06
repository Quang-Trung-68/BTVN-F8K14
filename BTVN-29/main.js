const getProducts = async () => {
  const responds = await fetch("https://fakestoreapi.com/products/");
  const products = await responds.json();
  return products;
};

getProducts().then((products) => {
  const list = document.querySelector(".card-list");
  const goToDetails = (id) => {
    window.location.href = `./detail-product-${id}`;
  };

  products.forEach((product) => {
    // create item
    const item = document.createElement("div");
    item.setAttribute("class", "card-item");
    // create thumb
    const thumb = document.createElement("img");
    thumb.setAttribute("class", "card-thumb");
    thumb.setAttribute("src", `${product.image}`);
    thumb.addEventListener("click", () => {
      goToDetails(product.id);
    });
    // create title
    const title = document.createElement("p");
    title.setAttribute("class", "card-title");
    title.innerText = product.title;
    title.addEventListener("click", () => {
      goToDetails(product.id);
    });
    // create price
    const price = document.createElement("p");
    price.setAttribute("class", "card-price");
    price.innerText = "$" + product.price;
    // create description
    const description = document.createElement("p");
    description.setAttribute("class", "card-description");
    description.innerText = product.description;
    // create category
    const category = document.createElement("p");
    category.setAttribute("class", "card-category");
    category.innerText = "Category: " + product.category;
    // create rating
    const rating = document.createElement("div");
    rating.setAttribute("class", "card-rating");
    rating.innerText = `Rating: ⭐ ${product.rating["rate"]} (${product.rating["count"]} reviews)`;
    // add all to item
    item.append(thumb, title, price, description, category, rating);
    // add item to list
    list.append(item);
  });
});
