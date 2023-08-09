const bar = document.getElementById("bar");
const close = document.getElementById("close");
const navbar = document.getElementById("navbar");

bar.onclick = ()=>{
  navbar.classList.add("active");
}

close.onclick = ()=>{
  navbar.classList.remove("active");
}
const loadAllProducts = async () => {
  const response = await fetch('https://fakestoreapi.com/products?limit=8');
  const allProducts = await response.json();
  return allProducts;
}

const productContainer = document.getElementById('product-container');
const displaySingleProduct = (allProducts) => {
  
  productContainer.textContent = '';
  allProducts.forEach(product => {
      const {category, title, image, price } = product;
      const singleProductDiv = document.createElement('div');
      singleProductDiv.innerHTML = ` <div class="pro">
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
      productContainer.appendChild(singleProductDiv);
  })

}

const displayInitialProduct = async () => {
  const allProducts = await loadAllProducts();
  displaySingleProduct(allProducts);
}

displayInitialProduct();