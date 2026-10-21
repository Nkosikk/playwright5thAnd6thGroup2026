import { test } from '../Fixture/CustomFixtures';
import { DashboardPage } from '../Pages/DashboardPage';
import { validUser } from '../TestData/TestData';
import { userProfile } from '../TestData/TestData';
import { MyProfilePage } from '../Pages/MyProfilePage';


test.describe('My Profile', () => {
    test('Update my git username', async ({ loginPage, homePage, dashboardPage, myProfilePage }) => {
     await loginPage.openNdosiPage();
     await homePage.navigateToLoginPage();
     await loginPage.userLogin(validUser.student.username, validUser.student.password);
     await loginPage.verifyDashboardUrl();
     await dashboardPage.ClickMenu();
     await dashboardPage.ClickMyProfile();
     await myProfilePage.updateMyProfile(userProfile.gitUsername);
    });
    
});