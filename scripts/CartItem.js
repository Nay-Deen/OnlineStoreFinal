/**
 * @Class : CartItem
 * @Desc : Entity of a product on the website
 * @Author : Nadine Perchtold
 * 
 */

 class CartItem {

    /**
     * @func Constructor
     * @param {*} id 
     * @param {*} name 
     * @param {*} price 
     * @param {*} image 
     * @param {*} tag 
     */

    constructor(product) {
        
        this.id = product?.id;
        this.name = product?.name;
        this.price = product?.price;
        this.image = product?.image;
        this.tag = product?.tag;
        this.quantity = 1;
    }

    /**
     * @Section: Setters and Getters
     */

     getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getImage() {
        return this.image;
    }

    setImage(image) {
        this.image = image;
    }

    getTag() {
        return this.tag;
    }

    setTag(tag) {
        this.tag = tag;
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }
    
}


export default CartItem;