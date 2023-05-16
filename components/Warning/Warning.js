class Warning
{
    constructor() 
    {
        this.warning_message = 'The site is not for sales. All content from <a href="https://cyberpunkmerch.store/" target="_blank">https://cyberpunkmerch.store/</a>';
    }

    render(count)
    {
        const html = `
            <div class="container">
                ${this.warning_message}
            </div>
        `;

        ROOT_WARNING.innerHTML = html;
    }
}

const warningPage = new Warning();

warningPage.render();