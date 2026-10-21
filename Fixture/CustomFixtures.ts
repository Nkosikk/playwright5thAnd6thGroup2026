import { HomePage } from '../Pages/HomePage';
import { test as base } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { DashboardPage } from '../Pages/DashboardPage';


type CustomFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
}

export const test = base.extend<CustomFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    }

    
});

