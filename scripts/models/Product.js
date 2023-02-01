/**
 * @Class : Product
 * @Desc : Entity of a product on the website
 * @Author : Nadine Perchtold
 * 
 */

 class Product {

    /**
     * @func Constructor
     * @param {*} id 
     * @param {*} name 
     * @param {*} price 
     * @param {*} image 
     * @param {*} tag 
     */

    constructor(id, name, price, image, tag) {
        
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.tag = tag;
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
    
}


export default Product;