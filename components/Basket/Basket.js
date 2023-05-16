class Basket {

    handleClear()
    {
        ROOT_BASKET.innerHTML = '';
    }

    deleteLocationStorage(element, id)
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
        let htmlCatalog = '';
        const productsStore = localStorageUtil.getProducts();// Класс для работы с local storage
        let sumCatalog = 0;
        let taxProcent = 10;
        let taxSum = 0;
        let totalSum = 0;

        CATALOG.forEach(({ id, name, img, price }) => {
            if ( productsStore.indexOf(id) !== -1 ) 
            {
                htmlCatalog += `
                    <tr>
                        <td>
                            <div class="basket_item_info">
                                <a class="basket_item_img">
                                    <img src="${img}" alt="">
                                </a>
                                <div class="basket_item_info_block">
                                    <a href="#" class="basket_item_name"><p>${name}</p></a>
                                    <small class="basket_item_price">Price: $${price.toLocaleString()}</small>
                                    <br>
                                    <a href="" class="basket_item_remove remove" onclick="basketPage.deleteLocationStorage(this, '${id}')";>Remove</a>
                                </div>
                            </div>
                        </td>
                        <td><input type="number" value='1'></td>
                        <td>$${price.toLocaleString()}</td>
                    </tr>
                `;
                sumCatalog += price;
            }
        });

        taxSum = sumCatalog / 100 * taxProcent;
        totalSum = sumCatalog + taxSum;

        let html = `
        <h2>Cart</h2>
        <div class="container">
            <table>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                ${htmlCatalog}
            </table>
        
            <div class="total_price">
                <table>
                    <tr>
                        <td>Subtotal</td>
                        <td>$${sumCatalog.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Tax (10%)</td>
                        <td>$${taxSum.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>$${totalSum.toLocaleString()}</td>
                    </tr>
                </table>
            </div>
        </div>
        `;

        if ( productsStore.length == 0 )
        {
            html = `<div class="container"><div class="basket_empty">You don't have any items in your cart<br><a href="products.html">Start Shopping</a></div></div>`;
        }

        ROOT_BASKET.innerHTML = html;
    }
}

const basketPage = new Basket();
basketPage.render();