class Categories
{
    render(count)
    {
        let htmlCategories = '';

        CATALOG_CATEGORIES.forEach(({ title, description, img }) => {
            htmlCategories += `
                <a href="#" onclick="return false;" class="categories_item" data-title="${title}" data-desc="${description}">
                    <img src="${img}" alt="${description}">
                </a>
            `
        })

        const html = `
            <h2>Categories</h2>
            <div class="container">
                ${htmlCategories}
                <a href="#" onclick="return false;" class="categories_item_link">
                    <div>All products ›</div>
                </a>
            </div>
        `;

        ROOT_CATEGORIES.innerHTML = html;
    }
}

const categoriesPage = new Categories();

categoriesPage.render();