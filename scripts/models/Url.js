/**
 * @Class : Url
 * @Desc : Entity of a url on the website
 * @Author : Nadine Perchtold
 * 
 */

class Url {

    /**
     * @func: Constructor
     * @param {*} title - Title of the Url
     * @param {*} path - Path for href prop
     * @param {*} target - Target for target prop
     */

    constructor(title, path, target) {
        
        this.title = title;
        this.path = path;
        this.target = target;
    }

    /**
     * @Section: Setters and Getters
     */

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getPath() {
        return this.path;
    }

    setPath(path) {
        this.path = path;
    }

    getTarget() {
        return this.target;
    }

    setTarget(target) {
        this.target = target;
    }
}


export default Url;