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
    const searchButton = document.getElementById("searchButton");
    const category = document.getElementById("category");
    const sort_by_price_value = document.getElementById("sort_by_price_value");


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
             new Product(1, "Diamond Jewelry Set", 50000, "/assets/diamondjewelryset.png", "NEW", "SET"),
             new Product(2, "Skeleton Watch", 15000, "/assets/skeletonwatch.jpg", "NEW", "WATCH"),
             new Product(3, "Side Stone Ring", 70000, "/assets/sidestonering.png", "NEW", "RING"),
             new Product(4, "GMT Master Rolex Watch", 90000, "/assets/GMTmaster.jpg", "NEW", "WATCH"),
             new Product(5, "Leather Strap", 1750000, "/assets/leatherstrap.jpg", "NEW", "WATCH"),
             new Product(6, "Tear Drop Ring", 4350000, "/assets/teardropring.jpg", "NEW", "RING"),
             new Product(7, "Halo Ring", 1250000, "/assets/haloring.png", "NEW", "RING"),
             new Product(8, "Diamond Set", 2250000, "/assets/diamondset.jpg", "NEW", "SET"),
         ]
     );

     
     renderProducts(store.getProducts());

     if (cartTotalElem) {
        cartTotalElem.innerText = store?.getCart()?.length;
     }

      /**
     * Team Members
     */

    const teamMembers = [
        {
            image: "./assets/team/nadine.jpg",
            name: "Nadine Perchtold",
            occupation: "Managing Director"
        },
        {
            image: "./assets/team/jane.jpg",
            name: "Jane Doe",
            occupation: "Diamond Tester"
        },
        {
            image: "./assets/team/john.jpg",
            name: "John Doe",
            occupation: "Diamond Forger"
        }
    ];

    if (teamMembersElem) {

        let teamMembersOutput = '';

        teamMembers.forEach(teamMember => {
            teamMembersOutput += `
            <div class="team__member">
                <img src="${teamMember.image}" alt="" class="team__member_img">
                <h1 class="team__member_name">${teamMember.name}</h1>
                <p class="team__member_occupation">${teamMember.occupation}</p>
            </div>
            `;
        });
    
        teamMembersElem.innerHTML = teamMembersOutput;
    }

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

      if (searchButton) {
        searchButton.addEventListener("click", (e) => {

            e.preventDefault();

            const searchTerm = document.getElementById("searchTerm")?.value;

            if (searchTerm) {
                const searchedProducts = store.getProducts().filter(item => item.name.toLowerCase().includes(searchTerm));

                renderProducts(searchedProducts);
            }
        });
      }

      if (category) {
        category.addEventListener("change", (e) => {

            e.preventDefault();

            const categoryTerm = e?.target?.value;

            if (categoryTerm) {
                const searchedProducts = store.getProducts().filter(item => {
                    console.log(item);
                    return item.type.toUpperCase().includes(categoryTerm);
                });

                renderProducts(searchedProducts);
            } else {
                renderProducts(store.getProducts());
            }
        });
      }

      if (sort_by_price_value) {
        sort_by_price_value.addEventListener("change", (e) => {

            e.preventDefault();

            const sortTerm = e?.target?.value;
            let searchedProducts = [];

            if (sortTerm) {
                switch(sortTerm) {
                    case "1":
                        searchedProducts = store.getProducts().sort((a, b) => a.price - b.price);
                        break;
                    case "2":
                        searchedProducts = store.getProducts().sort((a, b) => b.price - a.price);
                    default:
                        searchedProducts = store.getProducts();
                }

                renderProducts(searchedProducts);
            } else {
                renderProducts(store.getProducts());
            }
        });
      }

      function renderProducts(products) {
        let productsOutput = '';
 
     if (newProductItemsElem) {
        products.forEach(product => {
            productsOutput += `
            <div class="row" data-id="${product.id}">
                <img src="${product.image}">
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
