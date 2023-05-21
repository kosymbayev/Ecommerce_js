class Seo
{
    constructor() 
    {
        this.seo = 'The site is not for sales. All content from <a href="https://cyberpunkmerch.store/" target="_blank">https://cyberpunkmerch.store/</a>. <br>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci nesciunt est ad autem hic dignissimos eos iste distinctio vel sequi quam voluptatem, odio inventore! Iusto maxime enim voluptates temporibus tempora. Sequi inventore expedita necessitatibus impedit dicta quaerat iure maiores? Illum sed quod eligendi inventore consequuntur facere nemo necessitatibus sint! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci nesciunt est ad autem hic dignissimos eos iste distinctio vel sequi quam voluptatem, odio inventore! Iusto maxime enim voluptates temporibus tempora. Sequi inventore expedita necessitatibus impedit dicta quaerat iure maiores? Illum sed quod eligendi inventore consequuntur facere nemo necessitatibus sint!';
    }

    render(count)
    {
        const html = `
            <h2>JS Ecommerce</h2>
            <div class="container">
                <div class="seo_block">
                    ${this.seo}
                </div>
                <div class="seo_btn js_seo_btn"><span>More ›</span></div>
            </div>
        `;

        ROOT_SEO.innerHTML = html;
    }
}

const seoPage = new Seo();

seoPage.render();

window.addEventListener('load', function() 
{

    let seoBtn = document.querySelector('.js_seo_btn');
    let seoBtnText = document.querySelector('.js_seo_btn span');
    let seoBlock = document.querySelector('.seo_block');

    seoBtn.addEventListener('click', function()
    {
        
        if( seoBlock.classList.contains('open') )
        {
            seoBtnText.textContent = 'More ›';
            seoBlock.classList.remove('open');
        }
        else
        {
            seoBtnText.textContent = 'Remove ›';
            seoBlock.classList.add('open');
        }
    })

})
