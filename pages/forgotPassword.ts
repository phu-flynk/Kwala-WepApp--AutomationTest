import { Page } from "@playwright/test";

export default class forgotPassword {
    constructor(public page: Page) {

    }

    public password_link = this.page.getByRole('link', { name: 'password' })
    public mail_placeholder = this.page.getByPlaceholder('Email')
    public sendRequest_button = this.page.getByRole('button', { name: 'Send Request' })
    public first_email = this.page.locator('(//td[@class="ng-binding"][normalize-space()="int-kwala@kwalainvest.info"])[1]')

    async click_forgotPassword(username: string) {
        await this.password_link.click()
        await this.mail_placeholder.fill(username)
        await this.sendRequest_button.click()
    }

    async checkIfSucess() {
        await this.page.waitForSelector("h1[class='ant-typography']")

        const assert = require('assert');
        const expectedTitle = 'Forgot Password Sent';
        const pageTitle = await this.page.title();
        assert.ok(pageTitle.includes(expectedTitle), `Page title "${pageTitle}" does not contain "${expectedTitle}"`);
    }   

    async checkEmailWasSent() {
        await this.page.waitForSelector("//tr[td[@class='ng-binding'][normalize-space()='int-kwala@kwalainvest.info'] and td[@class='ng-binding'][normalize-space()='just now']]");
    }

    async ClickFirstEmail() {
        //await this.page.locator('(//td[@class="ng-binding"][normalize-space()="int-kwala@kwalainvest.info"])[1]').click();
        await this.first_email.click();
    }
}