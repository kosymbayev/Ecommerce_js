class Header
{
    handleOpenShoppingPage()
    {
        BasketPage.render();
    }

    render(count)
    {
        const html = `
            <div class="container">
                <div class="logo">
                    <a href="index.html">
                        <!--
                        <img src="img/logo.png" alt="logo" width="125px">
                        -->
                        JS Ecommerce
                    </a>
                </div>
                <nav class='navbar'>
                    <ul id='menuItems'>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="products.html">Products</a></li>
                    </ul>
                </nav>
                <a href="basket.html" class="menu_basket">
                    <img src="img/cart.png" alt="basket" width='30px' height='30px'>
                    <span class="menu_basket_count">${count}</span>
                </a>
                <img src="img/menu.png" alt="menu" class="menu_icon" onclick="menuToggle()">
            </div>
        `;

        ROOT_HEADER.innerHTML = html;
    }
}

const headerPage = new Header();

const productsStore = localStorageUtil.getProducts()

headerPage.render(productsStore.length);


var menuItems = document.getElementById('menuItems');

menuItems.style.maxHeight = '0px';

function menuToggle()
{
    if( menuItems.style.maxHeight == '0px' )
    {
        menuItems.style.maxHeight = '200px';
    }
    else
    {
        menuItems.style.maxHeight = '0px';
    }
}