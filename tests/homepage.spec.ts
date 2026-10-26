import { test } from '../Fixture/CustomFixtures';

test.describe('Home Page Tests', () => {
    
    test('Navigate to Login Page', async ({ homePage, page }) => {
        await homePage.openNdosiPage();
        await page.waitForTimeout(5000);
        await homePage.navigateToLoginPage();
        await homePage.verifyLoginButtonIsVisible();
        await homePage.getLoginHeadingText();
        await homePage.page.evaluate((text) => console.log(text), await homePage.getLoginHeadingText());
    });

});