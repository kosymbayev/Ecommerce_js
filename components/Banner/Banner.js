class Banner
{
    render()
    {

        let htmlBanner = '';

        BANNER.forEach(({ name, url, img }) => {
            htmlBanner += `
            <div class="swiper-slide">
                <div href="${url}">
                    <img src="${img}" alt="${name}">
                </div>
            </div>
            `
        })

        const html = `
            <div class="container">
                <div class="swiper banner_swiper">
                    <div class="swiper-wrapper">
                        ${htmlBanner}
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        `;

        ROOT_BANNER.innerHTML = html;
    }
}

const bannerPage = new Banner();

bannerPage.render();

var swiper = new Swiper(".banner_swiper", {
    cssMode: true,
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    keyboard: true,
});