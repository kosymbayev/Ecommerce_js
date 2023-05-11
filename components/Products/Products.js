class Products 
{
    constructor()
    {
        this.classNameActve = 'active';
        this.labelAdd = 'Add to Cart';
        this.labelRemove = 'Remove from Cart';
    }

    handleSetLocationStorage(element, id) {
        const { pushProduct, products } = localStorageUtil.putProducts(id);
    
        if (pushProduct) {
            element.classList.add(this.classNameActve);
            element.innerHTML = this.labelRemove;
        } else {
            element.classList.remove(this.classNameActve);
            element.innerHTML = this.labelAdd;
        }
    
        // Находим все элементы продукта с соответствующим идентификатором
        const productElements = document.querySelectorAll(`[data-product-id="${id}"]`);
    
        // Изменяем состояние всех найденных элементов продукта
        productElements.forEach((productElement) => {
            const buttonElement = productElement.querySelector('.product_btn');
    
            if (pushProduct) {
                buttonElement.classList.add(this.classNameActve);
                buttonElement.innerHTML = this.labelRemove;
            } else {
                buttonElement.classList.remove(this.classNameActve);
                buttonElement.innerHTML = this.labelAdd;
            }
        });
    
        headerPage.render(products.length);
    }

    /*
    target - the block where everything will fall (from const/root.js)
    catalog - products from array (from const/catalog.js)
    sticker_filter - filter for special category like bestsellers
    title
    */
    render(target, catalog, sticker_filter, title)
    {
        const productsStore = localStorageUtil.getProducts();// Класс для работы с local storage
        let htmlCatalog = '';

        catalog.forEach(({ id, name, price, img, sticker }) => {
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

            if( sticker.includes(sticker_filter) || sticker_filter == 'all')
            {
                htmlCatalog += `
                <div class='product' data-product-id='${id}'>
                    <span class='product_name'>${name}</span>
                    <img class='product_img' src='${img}'>
                    <span class='product_price'>
                        ${price.toLocaleString()} USD
                    </span>
                    <button class='product_btn ${activeClass}' onclick='productsPage.handleSetLocationStorage(this, "${id}");'>${activeText}</button>
                </div>
                `
            }
        })

        const html = `
            <h2>${title}</h2>
            <div class='container'>
                ${htmlCatalog}
            </div>
        `;

        target.innerHTML = html
    }
}

const productsPage = new Products()
