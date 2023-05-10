class LocalStorageUtil 
{
    constructor() //Свойства
    {
        this.keyName = 'basket';
    }

    // Получение массива продуктов
    getProducts()
    {
        const productsLocalStorage = localStorage.getItem(this.keyName)

        if ( productsLocalStorage !== null )
        {
            return JSON.parse(productsLocalStorage)//из строки в массив
        }
        else
        {
            return [];
        }
        
    }
    
    // Добавление/удаление из массива продуктов
    putProducts(id)
    {
        let products = this.getProducts();
        let pushProduct = false;
        const index = products.indexOf(id);

        if( index === -1 )
        {
            products.push(id)
            pushProduct = true
        }
        else
        {
            products.splice(index, 1)
        }

        localStorage.setItem(this.keyName, JSON.stringify(products));// из массива в строку

        return{ pushProduct, products }
    }
}

const localStorageUtil = new LocalStorageUtil();
