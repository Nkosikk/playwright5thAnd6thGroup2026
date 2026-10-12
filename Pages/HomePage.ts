import { BasePage } from '../Utils/BasePage';

export class HomePage extends BasePage {

    async openNdosiPage() {
        await this.GoToUrl('/')
    }

    async navigateToLoginPage() {
        await this.ClickElement(this.page.getByRole('button', { name: 'Login' }));    
    }
}