import { chromium, expect, test } from '@playwright/test';
import forgotPassword from '../pages/forgotPassword';
import mailinatorPage from '../pages/mailinatorPage'
import LoginPage from '../pages/loginPage';
import confirmPasswordPage from '../pages/confirmPasswordPage'
import * as Actions from "../base/actions";

test("Forgot Password", async ({page, baseURL, context}) => {
    const forgotpassword_Page = new forgotPassword(page);
    await page.goto(`${baseURL}`);
    await forgotpassword_Page.click_forgotPassword('test1@mailinator.com');
    //await forgot.checkIfSucess();
    await Actions.checkTitleSuccess(page, 'Forgot Password Sent', 'h1[class="ant-typography"]')
    
    const page2 = await context.newPage();
    await page2.goto("https://www.mailinator.com/v4/public/inboxes.jsp?msgid=test1-1680087155-123573257&to=test1");
    await page2.waitForLoadState();
    const mailinator_Page = new mailinatorPage(page2);
    await mailinator_Page.checkEmailWasSent();
    await mailinator_Page.ClickFirstEmail();
    await mailinator_Page.ClickResetPassword();
    
    const pagePromise = context.waitForEvent('page');
    const page3 = await pagePromise;
    await page3.waitForLoadState();
    const confirmPassword_Page = new confirmPasswordPage(page3);
    await confirmPassword_Page.confirmNewPassword();

    const pages = await context.pages();
    pages[0].locator("//a[normalize-space()='Login']").click();

    const login = new LoginPage(pages[0]);
    await login.enterUsername("test1@mailinator.com");
    await login.enterPassword("12345678aA@");
    await login.clickLogin();
    await Actions.checkTitleSuccess(pages[0], 'Dashboard', '//h3[normalize-space()="Dashboard"]')

    page.waitForTimeout(2000);
})