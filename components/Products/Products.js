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
    stickerFilter - filter for special category like bestsellers
    title
    */
    render(target, catalog, stickerFilter, title, swiperId)
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

            if( sticker.includes(stickerFilter) || stickerFilter == 'all')
            {
                htmlCatalog += `
                <div class='product swiper-slide' data-product-id='${id}'>
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
                <div class="swiper ${swiperId}_swiper">
                    <div class="swiper-wrapper">
                        ${htmlCatalog}
                    </div>
                    <div class="swiper-button-next ${swiperId}_swiper-button-next"></div>
                    <div class="swiper-button-prev ${swiperId}_swiper-button-prev"></div>
                    <div class="swiper-pagination ${swiperId}_swiper-pagination"></div>
                </div>
            </div>
        `;

        target.innerHTML = html
    }
}

const productsPage = new Products()

window.addEventListener('load', function() 
{
    // BESTSELLERS 
    var bestsellersSwiper = new Swiper(".bestsellers_swiper", {
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: ".bestsellers_swiper-button-next",
            prevEl: ".bestsellers_swiper-button-prev",
        },
        pagination: {
            el: ".bestsellers_swiper-pagination",
            clickable: true,
        },
        breakpoints: 
        {
            1036:
            {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            760:
            {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            440:
            {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    // NEW COLLECTIONS 
    var new_collectionsSwiper = new Swiper(".new_collections_swiper", {
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: ".new_collections_swiper-button-next",
            prevEl: ".new_collections_swiper-button-prev",
        },
        pagination: {
            el: ".new_collections_swiper-pagination",
            clickable: true,
        },
        breakpoints: 
        {
            1036:
            {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            760:
            {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            440:
            {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    // T-SHIRTS 
    var tShirtsSwiper = new Swiper(".t-shirts_swiper", {
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: ".t-shirts_swiper-button-next",
            prevEl: ".t-shirts_swiper-button-prev",
        },
        pagination: {
            el: ".t-shirts_swiper-pagination",
            clickable: true,
        },
        breakpoints: 
        {
            1036:
            {
                slidesPerView: 4,
                spaceBetween: 20,
            },
            760:
            {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            440:
            {
                slidesPerView: 2,
                spaceBetween: 10,
            },
        },
    });

});