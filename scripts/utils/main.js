import Navigator from './models/Navigator.js.js';
import Url from './models/Url.js.js';
import Store from './models/Store.js.js';
import Product from './models/Product.js.js';
import CartItem from './models/CartItem.js.js';

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
             new Product(1, "Nadine's Ring", 50000, "test.png", "NEW"),
             new Product(2, "Test's Ring", 150000, "test.png", "NEW"),
             new Product(3, "Jane's Ring", 70000, "test.png", "NEW"),
             new Product(4, "Theressa's Ring", 90000, "test.png", "NEW"),
             new Product(5, "Jenny's Ring", 1750000, "test.png", "NEW"),
             new Product(6, "Nadine's Ring", 4350000, "test.png", "NEW"),
             new Product(7, "Nadine's Ring", 1250000, "test.png", "NEW"),
             new Product(8, "Nadine's Ring", 2250000, "test.png", "NEW"),
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
