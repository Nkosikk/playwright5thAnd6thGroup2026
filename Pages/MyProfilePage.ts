  
  import { BasePage } from '../Utils/BasePage';
  export class MyProfilePage extends BasePage {


  async openNdosiPage() {
        await this.GoToUrl('/')
    }

    async updateMyProfile(gitUsername: string) {
        await this.ClickElement(this.page.locator('css=button:has-text("✏️ Edit Profile")'));
        await this.EnterText(this.page.getByPlaceholder('e.g., octocat'), gitUsername);
        await this.ClickElement(this.page.locator('css=button:has-text("Save Changes")'));
    }
  }