/**
 * @Class : Navigator
 * @Desc : Entity for handling navigation on the website
 * @Author : Nadine Perchtold
 * 
 */

 class Navigator {

    constructor() {
        
        this.navUrls = [];
    }

    /**
     * @Section: Setters and Getters
     */

    getNavUrls() {
        return this.navUrls;
    }

    setNavUrls(navUrls) {
        this.navUrls = navUrls;
    }

    createNav(navId) {

        let output = '';

        this.navUrls.forEach(
            navUrl => output += `<li><a href="${navUrl.path}" target="${navUrl.target}">${navUrl.title}</a></li>`
        );

        document.getElementById(navId).innerHTML = output;
    }
}

export default Navigator;