import { chromium, expect, test } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import * as Actions from "../base/actions";

const username = "flynksysadmin@flynk.dev";
const password = "12345678aA@";
test("Login with correct user name&password", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username);
    await login.enterPassword(password);
    await Promise.all([
        login.clickLogin(),
        page.waitForNavigation(),

    ])
    await Actions.checkTitleSuccess(page, 'Dashboard')
    console.log("Ok")
    page.waitForTimeout(2000)
}) 

const username1 = "flynksysadmin@flynk.devv";
test("Login with incorrect username", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username1);
    await login.enterPassword(password);
    await login.clickLogin();
    await Actions.checkContentOfElement(page, '//div[@class="ant-modal-confirm-content"]', 'Incorrect username or password.')
    page.waitForTimeout(2000)
})

const username2 = '453453894759834';
test("Login with invalid format username", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username2);
    await login.enterPassword(password);
    await Actions.checkContentOfElement(page, '//div[@class="ant-form-item-explain-error"]', 'Email is invalid format');
    page.waitForTimeout(2000)
})

const wrong_password = 'wefwe';
test("Login with invalid format password", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username);
    await login.enterPassword(wrong_password);
    await Actions.checkContentOfElement(page, '//div[contains(text(),"Password must be at least 8 characters")]', 'Password must be at least 8 characters')
    page.waitForTimeout(2000)
})

