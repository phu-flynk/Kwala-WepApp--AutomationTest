import { chromium, expect, test } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import loginPage from "../pages/loginPage"

const username = "flynksysadmin@flynk.dev";
const password = "12345678aA@";
test("Login with correct user name&password", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username);
    await login.enterPassword(password);
    await Promise.all([
        page.waitForNavigation({waitUntil: "networkidle"}),
        login.clickLogin()
    ])
    await login.checkIfLoginSuccess();
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
    const myDiv = await page.locator('//div[@class="ant-modal-confirm-content"]')
    const content = await myDiv.textContent();
    expect(content).toMatch('Incorrect username or password.');
    page.waitForTimeout(2000)
})

const username2 = '453453894759834';
test("Login with invalid format username", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username2);
    await login.enterPassword(password);
    const error = await page.locator('//div[@class="ant-form-item-explain-error"]')
    const content = await error.textContent();
    expect(content).toMatch('Email is invalid format');
    page.waitForTimeout(2000)
})

const wrong_password = 'wefwe';
test("Login with invalid format password", async ({page, baseURL}) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}`);
    await login.enterUsername(username);
    await login.enterPassword(wrong_password);
    const error = await page.locator('//div[contains(text(),"Password must be at least 8 characters")]')
    const content = await error.textContent();
    expect(content).toMatch('Password must be at least 8 characters');
    page.waitForTimeout(2000)
})

test("Login test demo", async ({}) => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://int-app.kwa.la/login');
    await page.getByPlaceholder('Email').click();
    await page.getByPlaceholder('Email').fill('flynksysadmin@flynk.dev');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('12345678aA@');
    await page.getByRole('button', { name: 'Log in' }).click();
})

