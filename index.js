let ShopArr = JSON.parse(localStorage.getItem("Shopitems")) || [];

let headers = document.querySelector("header");
window.addEventListener("scroll", function (e) {
  headers.classList.toggle("sticky", this.window.scrollY > 0);
});

let menu = document.querySelector(".menu");
let navlist = document.querySelector(".nav-list");

menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

const getdata = async () => {
  try {
    let res = await axios.get("https://fakestoreapi.com/products");
    // console.log(res.data);
    showdata(res.data);
    ShopArr = res.data;
    localStorage.setItem("Shopdata", JSON.stringify(ShopArr));
  } catch (error) {
    console.log("something unexpected", error);
  }
};
getdata();

let products = document.querySelector(".products");
function showdata(data) {
  // let row = document.querySelector('.row')

  data.map((item, i) => {
    products.innerHTML +=
    
    ` <div id="${i}" class="row" data-aos="fade-in" onclick="saves(${i})">      
            <img src="${item.image}" alt="">
            <div class="detail">
                <h4>SALE</h4>
            </div>
            <div class="heart">
                <i class="fa-regular fa-heart"></i>
            </div>
            <div class="rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-regular fa-star-half-stroke"></i>
            </div>
            <div class="price">
                <h4>${item.description.slice(0, 15)}</h4>
                <h4></h4>
                <p> &#8377;${item.price} </p>
            </div>  `;
            
  });
};

function saves(index) {
  const clickedItem = ShopArr[index];
  localStorage.setItem("Shopitems", JSON.stringify(clickedItem));
  window.location.href = "./product-page.html";
}

function updatcart(){
  let cartval = document.querySelector('.nav-icon h5');

  let cartarr = JSON.parse(localStorage.getItem('cartitems')) || [];
  // cartarr.push(ShopArr)
  cartval.innerText = cartarr.length;
  // localStorage.setItem("cartitems", JSON.stringify(cartarr));


}
updatcart()

window.onload = function () {
  updatcart()
  showdata();


}
