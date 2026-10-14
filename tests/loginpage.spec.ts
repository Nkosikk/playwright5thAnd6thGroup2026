import { test } from '../Fixture/CustomFixtures';
import { validUser } from '../TestData/TestData';


test.describe('Login Page Tests', () => {
    test('should navigate to the dashboard after login', async ({ loginPage, homePage }) => {
     await loginPage.openNdosiPage();
     await homePage.navigateToLoginPage();
     await loginPage.userLogin(validUser.student.username, validUser.student.password);
     await loginPage.verifyDashboardUrl();
    });
    
});