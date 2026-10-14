import { test } from '../Fixture/CustomFixtures';
import { DashboardPage } from '../Pages/DashboardPage';
import { validUser } from '../TestData/TestData';


test.describe('Login Page Tests', () => {
    test('should navigate to the dashboard after login', async ({ loginPage, homePage, dashboardPage }) => {
     await loginPage.openNdosiPage();
     await homePage.navigateToLoginPage();
     await loginPage.userLogin(validUser.student.username, validUser.student.password);
     await loginPage.verifyDashboardUrl();
     await dashboardPage.ClickMenu();
    });
    
});