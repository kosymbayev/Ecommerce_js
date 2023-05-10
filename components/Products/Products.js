class Products 
{
    constructor()
    {
        this.classNameActve = 'active';
        this.labelAdd = 'Add to Cart';
        this.labelRemove = 'Remove from Cart';
    }

    handleSetLocationStorage(element, id)
    {
        const { pushProduct, products } = localStorageUtil.putProducts(id)

        if( pushProduct )
        {
            element.classList.add(this.classNameActve);
            element.innerHTML = this.labelRemove;
        }
        else
        {
            element.classList.remove(this.classNameActve);
            element.innerHTML = this.labelAdd;
        }

        headerPage.render(products.length)
    }

    render()
    {
        const productsStore = localStorageUtil.getProducts();// Класс для работы с local storage
        let htmlCatalog = '';

        CATALOG.forEach(({ id, name, price, img }) => {
            let activeClass = '';
            let activeText = '';

            if( productsStore.indexOf(id) === -1 )
            {
                activeText = this.labelAdd;
            }
            else
            {
                activeClass = this.classNameActve;
                activeText = this.labelRemove;
            }

            htmlCatalog += `
                <div class='product'>
                    <span class='product_name'>${name}</span>
                    <img class='product_img' src='${img}'>
                    <span class='product_price'>
                        ${price.toLocaleString()} USD
                    </span>
                    <button class='product_btn ${activeClass}' onclick='productsPage.handleSetLocationStorage(this, "${id}");'>${activeText}</button>
                </div>
            `
        })

        const html = `
            <h2>All Products</h2>
            <div class='container'>
                ${htmlCatalog}
            </div>
        `;

        ROOT_PRODUCTS.innerHTML = html
    }
}

const productsPage = new Products()
productsPage.render();