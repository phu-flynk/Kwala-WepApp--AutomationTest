import { Page } from "@playwright/test";

export default class confirmPasswordPage {
    constructor(public page: Page) {

    }

    public newpasswordTextBox = this.page.getByPlaceholder('New Password', { exact: true })  
    public confirm_newpasswordTextBox = this.page.getByPlaceholder('New Password Confirm')
    public resetPassword_Button = this.page.getByRole('button', { name: 'Reset Password' })

    async confirmNewPassword() {
        await this.newpasswordTextBox.fill('12345678aA@')
        await this.confirm_newpasswordTextBox.fill('12345678aA@')
        await this.resetPassword_Button.click()
    } 
}