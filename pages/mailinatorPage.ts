import { Page } from "@playwright/test";

export default class mailinatorPage {
    constructor(public page: Page) {

    }

    public first_email = this.page.locator('(//td[@class="ng-binding"][normalize-space()="int-kwala@kwalainvest.info"])[1]')  
    public resetPassword_button = this.page.frameLocator('iframe[name="html_msg_body"]').getByRole('link', { name: 'RESET PASSWORD' })

    async checkEmailWasSent() {
        await this.page.waitForSelector("//tr[td[@class='ng-binding'][normalize-space()='int-kwala@kwalainvest.info'] and td[@class='ng-binding'][normalize-space()='just now']]");
    }

    async ClickFirstEmail() {
        //await this.page.locator('(//td[@class="ng-binding"][normalize-space()="int-kwala@kwalainvest.info"])[1]').click();
        await this.first_email.click();
    }

    async ClickResetPassword() {
        //await this.page.locator('(//td[@class="ng-binding"][normalize-space()="int-kwala@kwalainvest.info"])[1]').click();
        await this.resetPassword_button.click();
    }
}