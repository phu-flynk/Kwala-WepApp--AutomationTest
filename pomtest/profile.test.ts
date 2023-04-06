import { chromium, expect, test } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import ProfilePage from '../pages/profilePage'
import DashboardPage from '../pages/dashboardPage'
import * as Actions from "../base/actions";

const username = "test1@mailinator.com";
const password = "12345678aA@";

async function goto_profile(page, baseURL, username, password) {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const profile = new ProfilePage(page);

    await page.goto(`${baseURL}`);
    await login.enterUsername(username);
    await login.enterPassword(password);

    await Promise.all([
        login.clickLogin(),
        page.waitForNavigation(),
    ]);

    await dashboard.gotoProfile();

    return profile;
}

test("Change the title", async ({ page, baseURL }) => {
    const profile = await goto_profile(page, baseURL, username, password);
    await profile.editTttle("Mr");
    await Actions.checkContentOfElement(page, "//span[@class='ant-modal-confirm-title']", "The profile has been updated successfully")
});

test("Check if the email field are displayed properly", async ({ page, baseURL }) => {
    const profile = await goto_profile(page, baseURL, username, password);
    await profile.checkEmailDisplayed("test1@mailinator.com");
});


test("Edit the email", async ({ page, baseURL }) => {
    const profile = await goto_profile(page, baseURL, username, password);
    await profile.editEmail("test2@mailinator.com");
    await Actions.checkContentOfElement(page, "//span[@class='ant-modal-confirm-title']", "The profile has been updated successfully")
});

test("Edit FirstName/MiddleName/LastName", async ({ page, baseURL }) => {
    const profile = await goto_profile(page, baseURL, username, password);
    await profile.editNames("phu", "phu", "phu");
    await Actions.checkContentOfElement(page, "//span[@class='ant-modal-confirm-title']", "")
});

test("Validate TimePicker", async ({ page, baseURL }) => {
    const profile = await goto_profile(page, baseURL, username, password);

    await profile.chooseTheTime("20000-01-09")
    await profile.chooseTheTime("20001-01-09")
    await profile.chooseTheTime("2000-013-09")
    await profile.chooseTheTime("2000-01-09")

    await profile.clickTheTime();
    await Actions.checkContentOfElement(page, "//span[@class='ant-modal-confirm-title']", "")
});

test("Change Password", async ({ page, baseURL }) => {
    const profile = await goto_profile(page, baseURL, username, password);

    // Check new password must be different from old password
    await profile.resetPassword("12345678aA@", "12345678aA@");
    const element1 = await page.locator("//div[contains(text(),'New password must be different from old password')]").textContent();
    expect(element1).toEqual('New password must be different from old password');

    // Check happy case 
    await profile.resetPassword("12345678aA@", "12345678aaA@");
    

    await profile.resetPassword("12345678aA@", "12345678aaA@");

}); 















