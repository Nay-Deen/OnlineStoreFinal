import Navigator from "./models/Navigator.js";
import Url from './models/Url.js';
import Store from './models/Store.js';
import Product from './models/Product.js';
import CartItem from './models/CartItem.js';

document.addEventListener("DOMContentLoaded", (evt) =>{

    /**
     * DOM Elements References
     */

    let menu = document.querySelector("#menu-icon");
    let navbar = document.querySelector(".navbar");
    let newProductItemsElem = document.querySelector("#new-products");
    let popularProductItemsElem = document.querySelector("#popular-items");
    const cartTotalElem = document.getElementById("cart__total");
    const cartItemsElem = document.getElementById("cart-items");


    /**
     * NAVIGATOR
     */

    const navigator = new Navigator();

    navigator.setNavUrls(
        [
            new Url("Home", "index.html", ""),
            new Url("About", "about.html", ""),
            new Url("Products", "product.html", ""),
            new Url("LookBook", "lookbook.html", ""),
            new Url("Contact", "contact.html", "")
        ]
    );

    navigator.createNav("navbar");

    /**
     * STORE
     */

     const store = new Store();

     store.setProducts(
         [
             new Product(1, "Diamond Jewelry Set", 50000, "/assets/diamondjewelryset.png", "NEW"),
             new Product(2, "Skeleton Watch", 15000, "/assets/skeletonwatch.jpg", "NEW"),
             new Product(3, "Side Stone Ring", 70000, "assets/sidestonering.png", "NEW"),
             new Product(4, "GMT Master Rolex Watch", 90000, "GMTmaster.jpg", "NEW"),
             new Product(5, "Leather Strap", 1750000, "leatherstrap.jpg", "NEW"),
             new Product(6, "Tear Drop Ring", 4350000, "teardropring.jpg", "NEW"),
             new Product(7, "Halo Ring", 1250000, "haloring.png", "NEW"),
             new Product(8, "Diamond Set", 2250000, "diamondset.jpg", "NEW"),
         ]
     );

     let productsOutput = '';
 
     if (newProductItemsElem) {
        store.getProducts().forEach(product => {
            productsOutput += `
            <div class="row" data-id="${product.id}">
                <img src="./assets/popitem2.png">
                <h4>${product.name}</h4>
                <h5>R ${product.price}</h5>
                <div class="top ${product.tag === "popular" && 'popular'}">
                <p>${product.tag}</p>
                </div>
                <div class="bbtn" >
                    <a data-id="${product.id}" class="add__to__cart__btn">Add to cart</a>
                </div>
            </div>
            `;
         });
    
         newProductItemsElem.innerHTML = productsOutput;
         if (popularProductItemsElem) {
            popularProductItemsElem.innerHTML = productsOutput;
         }
     }

     Array.from(document.querySelectorAll(".add__to__cart__btn")).forEach(btn => {

        btn.addEventListener("click", (event) => {

            event.preventDefault();

            const product = store.getProductById(event.target.dataset.id);

            const cartItemIndex = store.getCartItemIndexById(product.id);

            if (cartItemIndex === -1) {
                store.addProductToCart(new CartItem(product));
            }

            cartTotalElem.innerText = store.getCart().length;


        });
     });


     cartTotalElem.innerText = store?.getCart()?.length;

     /**
      * CART
      */
      let cartOutput = '';
 
      if (cartItemsElem) {
        store.getCart().forEach(cartItem => {
            cartOutput += `
             <div class="cart-item" id="cart-item-${cartItem.id}">
            <div class="cart-item-top">
                <div class="image-container">
                    <img src="">
                    <h2 class="cart-item-name">${cartItem.name}</h2>
                </div>
                <h2 class="cart-item-price">Qty ${cartItem.quantity}</h2>
                <h2 class="cart-item-price">R ${cartItem.price}</h2>
            </div>
            <div class="cart-item-bottom">
                <a href="#" class="cart-item-remove-from-cart-btn" data-id="${cartItem.id}">Remove from Cart</a>
            </div>
        </div>
             `;
          });
     
          cartItemsElem.innerHTML = cartOutput || "<h2>No Cart Items. Go to Products</h2>";

          Array.from(document.querySelectorAll(".cart-item-remove-from-cart-btn")).forEach(btn => {

            btn.addEventListener("click", (event) => {
    
                event.preventDefault();
    
                const cartItemIndex = store.getCartItemIndexById(event.target.dataset.id);
    
                if (cartItemIndex === -1) {
                    store.removeProductToCart(cartItemIndex);
                    document.getElementById("cart-item-"+event.target.dataset.id)?.remove();
                }
    
                cartTotalElem.innerText = store.getCart().length;

                if (cartTotalElem.innerText == 0) {
                    cartItemsElem.innerHTML = "<h2>No Cart Items. Go to Products</h2>";
                }
    
            });
         });

      }


    /**
     * HAMBURGER MENU FUNCTIONALITY
     */

    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        navbar.classList.toggle("active");
    };

    window.onscroll = () => {
        menu.classList.remove("bx-x");
        navbar.classList.remove("active");
    };
});
