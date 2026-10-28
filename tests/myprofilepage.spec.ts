import { test } from '../Fixture/CustomFixtures';
import { DashboardPage } from '../Pages/DashboardPage';
import { validUser } from '../TestData/TestData';
import { userProfile } from '../TestData/TestData';
import { MyProfilePage } from '../Pages/MyProfilePage';


test.describe('My Profile', () => {
    test('Update my git username', async ({ loginPage, homePage, dashboardPage, myProfilePage,page }) => {
     await loginPage.openNdosiPage();
     
     await page.waitForTimeout(5000);

     await dashboardPage.ClickMenu();
     await dashboardPage.ClickMyProfile();
     await page.waitForTimeout(5000);
     await myProfilePage.updateMyProfile(userProfile.gitUsername);
    });
    
});