class Products 
{
    constructor() 
    {
        this.classNameActive = 'active';
        this.labelAdd = 'Add to Cart';
        this.labelRemove = 'Remove from Cart';
        this.currentPage = 1; // Текущая страница
        this.itemsPerPage = 8; // Количество элементов на странице
    }
    

    handleSetLocationStorage(element, id) 
    {
        const { pushProduct, products } = localStorageUtil.putProducts(id);
    
        if (pushProduct) 
        {
            element.classList.add(this.classNameActve);
            element.innerHTML = this.labelRemove;
        } 
        else 
        {
            element.classList.remove(this.classNameActve);
            element.innerHTML = this.labelAdd;
        }
    
        // Находим все элементы продукта с соответствующим идентификатором
        const productElements = document.querySelectorAll(`[data-product-id="${id}"]`);
    
        // Изменяем состояние всех найденных элементов продукта
        productElements.forEach((productElement) => {
            const buttonElement = productElement.querySelector('.product_btn');
    
            if (pushProduct) 
            {
                buttonElement.classList.add(this.classNameActve);
                buttonElement.innerHTML = this.labelRemove;
            } 
            else 
            {
                buttonElement.classList.remove(this.classNameActve);
                buttonElement.innerHTML = this.labelAdd;
            }
        });
    
        headerPage.render(products.length);
    }

    /*
    en
    target - the block where everything will fall (from const/root.js)
    catalog - products from array (from const/catalog.js)
    sticker_filter - filter for special category like bestsellers
    title

    ru
    target - блок, куда попадет весь контент (с const/root.js)
    catalog - продукты из массива (с const/catalog.js)
    sticker_filter - фильтр для специальных категорий, например, хиты продаж
    title
    */
    render(target, catalog, stickerFilter, title) 
    {
        const productsStore = localStorageUtil.getProducts();
        const startIndex = (this.currentPage - 1) * this.itemsPerPage; // Индекс начального элемента текущей страницы
        const endIndex = startIndex + this.itemsPerPage; // Индекс конечного элемента текущей страницы
    
        let htmlCatalog = '';
    
        catalog.forEach(({ id, name, price, img, sticker }, index) => {
            if (index >= startIndex && index < endIndex) { // Проверяем, попадает ли элемент на текущую страницу
                let activeClass = '';
                let activeText = '';
    
                if (productsStore.indexOf(id) === -1) 
                {
                    activeText = this.labelAdd;
                } 
                else 
                {
                    activeClass = this.classNameActive;
                    activeText = this.labelRemove;
                }
    
                if (sticker.includes(stickerFilter) || stickerFilter == 'all') 
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
                    `;
                }
            }
        });
    
        const html = `
            <h2>${title}</h2>
            <div class='container'>
                ${htmlCatalog}
            </div>
            <div class='pagination'>
                ${this.renderPagination(catalog.length)}
            </div>
        `;
    
        target.innerHTML = html;
    }
    
    renderPagination(totalItems) 
    {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage); // Общее количество страниц
        let paginationHtml = '';
    
        for (let i = 1; i <= totalPages; i++) {
            const activeClass = i === this.currentPage ? 'active' : '';
            paginationHtml += `<span class='page ${activeClass}' onclick='productsPage.changePage(${i})'>${i}</span>`;
        }
    
        return paginationHtml;
    }
    
    changePage(page) {
        this.currentPage = page;
        this.render(ROOT_PRODUCTS, CATALOG, 'all', 'All products');
    }
    
}

const allProductsPage = new Products()
