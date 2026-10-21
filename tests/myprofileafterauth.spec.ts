
import { test } from '../Fixture/CustomFixtures';
import { userProfile } from '../TestData/TestData';

test.describe('My Profile', () => {
    test('Update my git username', async ({ page, dashboardPage, myProfilePage }) => {
    
    await page.goto('/');
     await dashboardPage.ClickMenu();
     await dashboardPage.ClickMyProfile();
     await myProfilePage.updateMyProfile(userProfile.gitUsername);
    });
    
});