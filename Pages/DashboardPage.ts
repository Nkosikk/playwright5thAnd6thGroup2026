import { BasePage } from '../Utils/BasePage';
export class DashboardPage extends BasePage { 

      async openNdosiPage() {
        await this.GoToUrl('/')
    }
    async ClickMenu() {
        await this.ClickElement(this.page.getByRole('button', { name: 'Menu' }));

    }
    async ClickMyProfile() {
        await this.ClickElement(this.page.locator('xpath=//span[contains(.,"My Profile")]'));
    }
}