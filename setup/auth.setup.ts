import { test as setup } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { validUser } from '../TestData/TestData';
import { LoginPage } from '../Pages/LoginPage';

const authFile = 'playright/.auth/user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    await loginPage.openNdosiPage();
    await homePage.navigateToLoginPage();
    await loginPage.userLogin(validUser.student.username, validUser.student.password);
    await loginPage.verifyDashboardUrl();

    await page.context().storageState({ 
        path: authFile 
    });
})