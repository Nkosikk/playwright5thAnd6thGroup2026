
import { test } from '../Fixture/CustomFixtures';
import { DashboardPage } from '../Pages/DashboardPage';
import { validUser } from '../TestData/TestData';


test.describe('My Dashboard Tests', () => {
    test('Should navigate to My Profile from Dashboard', async ({ loginPage, homePage, dashboardPage, page }) => {
     await loginPage.openNdosiPage();
     await page.waitForTimeout(5000);
     await homePage.navigateToLoginPage();
     await loginPage.userLogin(validUser.student.username, validUser.student.password);
     await loginPage.verifyDashboardUrl();
     await dashboardPage.ClickMenu();
     await dashboardPage.ClickMyProfile();
    });
    
});