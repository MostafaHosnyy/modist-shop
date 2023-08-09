const bar = document.getElementById("bar");
const close = document.getElementById("close");
const navbar = document.getElementById("navbar");
const shopContainer = document.getElementById('shop-container');
const categoryContainer = document.getElementById('category-list');

bar.onclick = ()=>{
  navbar.classList.add("active");}

close.onclick = ()=>{
  navbar.classList.remove("active");}

const loadAllProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  const allProducts = await response.json();
  return allProducts;
}
const displaySingleProduct = (allProducts) => {
  shopContainer.textContent = '';
  allProducts.forEach(product => 
    {
    const {category, title, image, price } = product;
    const singleProductDiv = document.createElement('div');
    singleProductDiv.innerHTML = `
    <div class="pro">
      <img src=
      ${image} />
      <div class="des">
        <span>${category} </span>
        <h5> ${title.length > 15 ? title.slice(0, 15) : title}</h5>
        <h4>$ ${price}</h4>
      </div>
      <i class="fa fa-shopping-cart cart"></i>
    </div>
    `;
      shopContainer.appendChild(singleProductDiv);
  })

}
categoryContainer.addEventListener('click', async (event) => {
  const categoryValue = event.target.innerText;
  const allProducts = await loadAllProducts();
  const matchedProducts = allProducts.filter(product =>
     product.category.includes(categoryValue)
     );
  displaySingleProduct(matchedProducts);
});

const displayCategories = async () => {
  const categoryContainer = document.getElementById('category-list');
  const products = await loadAllProducts();
  const uniqueCategory = [];
  products.forEach(product => 
    {
      if (uniqueCategory.indexOf(product.category) === -1)
       {
          uniqueCategory.push(product.category);
      }
  });

  uniqueCategory.forEach(category => {
      const li = document.createElement('li');
      li.innerText = category;
      categoryContainer.appendChild(li);
  })
}

const displayInitialProduct = async () => {
  const allProducts = await loadAllProducts();
  displaySingleProduct(allProducts);
}

displayInitialProduct();
displayCategories();