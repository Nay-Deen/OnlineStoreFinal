/**
 * @Class : Store
 * @Desc : Entity of a Store on the website
 * @Author : Nadine Perchtold
 * 
 */

import CartItem from "./CartItem.js";

 class Store {

    constructor() {
        
        this.products = [];
        this.cart = [];
    }

    /**
     * @Section: Setters and Getters
     */

    getProducts() {
        return this.products;
    }

    setProducts(products) {
        this.products = products;
    }

    getCart() {
        let cart = localStorage.getItem("cart");
        cart = JSON.parse(cart);

        this.cart = cart || [];

        // const cartItems = [];

        // this.cart.forEach(item => {
        //     cartItems.push(new CartItem(item));
        // });

        // this.cart = cartItems;

        return this.cart;
    }

    setCart(cart) {
        this.cart = cart;
    }

    addProductToCart(product) {
        this.cart.push(product);
        this.updateCartStorage();
    }

    removeProductToCart(index) {
        this.cart.splice(index, 1);
        this.updateCartStorage();
    }

    updateCartStorage() {
        localStorage.setItem("cart", JSON.stringify(this.cart));
    }

    addProduct(product) {
        this.products.push(product);
    }

    getProductById(id) {
        return this.products.find(product => product.id == id);
    }

    getCartItemIndexById(id) {
        return this.cart.findIndex(item => item.id === id);
    }

    getCartItemById(id) {
        return this.cart.find(item => item.id === id);
    }

    isInCart(id) {
        return this.getCartItemById(id);
    }
}


export default Store;