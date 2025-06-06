// function to fetch data from API
const getProducts = async () => {
  try {
    const responds = await fetch("https://fakestoreapi.com/products/");
    if (!responds.ok) {
      throw new Error(`HTTP error! status: ${responds.status}`);
    }
    const products = await responds.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
// array to save products
let arrays;
// function to init
const init = async () => {
  // waiting for data is fetched
  arrays = await getProducts();
  console.log(arrays);
  // render data to UI
  renderCards(arrays);
};

const renderCards = (products) => {
  // select card-list element
  const list = document.querySelector(".card-list");
  // function to go to detail product
  const goToDetails = (id) => {
    window.location.href = `./detail-product-${id}`;
  };
  // render product of products
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
};

init();
