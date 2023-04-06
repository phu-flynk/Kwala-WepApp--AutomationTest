import { expect, Page } from "@playwright/test";

export default class profilePage {

    constructor(public page: Page) {

    }

    public email = this.page.locator("#email");
    public saveChange_button = this.page.getByRole('button', { name: 'Save Changes' });
    
    public firstname = this.page.getByPlaceholder('First Name');
    public midname = this.page.getByPlaceholder('Middle Name');
    public lastname = this.page.getByPlaceholder('Last Name');
    public mr_title = this.page.getByTitle('Mr', { exact: true }).getByText('Mr');
    
    public dateTimePicker = this.page.getByPlaceholder('Select date');
    public dateTimePicker_right = this.page.locator('.ant-picker-header-super-next-btn');
    public dateTimePicker_left = this.page.locator('.ant-picker-header-super-prev-btn');
    public ok_button = this.page.getByRole('button', { name: 'OK' });

    public currentPassword_textbox = this.page.getByPlaceholder('Current Password');
    public newPassword_textbox = this.page.getByPlaceholder('New Password', { exact: true });
    public confirmPassword_textbox = this.page.getByPlaceholder('Confirm New Password');
    public change_button = this.page.getByRole('button', { name: 'Change', exact: true });

    async checkEmailDisplayed(expected_email: string) {
        const emailValue = await this.email.getAttribute('value');
        expect(expected_email).toEqual(emailValue);
    }

    async editEmail(expected_email: string) {
        //const emailValue = await this.email.getAttribute('value');
        await this.email.fill("test2@mailinator.com");
        await this.saveChange_button.click();
    }

    async editNames(Fname: string, Mname: string, Lname: string) {
        await this.firstname.fill("phu");
        await this.midname.fill("phu");
        await this.lastname.fill("phu");
        await this.saveChange_button.click();
    }

    async editTttle(title: string) {
        async function firstOrNull(locator: string, page: Page) {
            try {
              await page.waitForSelector(locator, {timeout: 2000})
            } catch (e) {
              return false;
            }
        }

        const textToSearch = ['Mr', 'Miss', 'Mrs', 'Ms'];
        let isElementFound = false;

        for (const text of textToSearch) {
            try {                
                if (await firstOrNull(`//span[@title= '${text}']`, this.page) != false) {
                    await this.page.locator(`//span[@title= '${text}']`).click();
                    await this.page.waitForSelector("//div[@class='ant-select-item-option-content'][normalize-space()='Mr']");
                    break;
                  }
            } catch (e) { 
                console.log("Not found the element");
                
            }
        }

        await this.page.getByTitle(`${title}`, { exact: true }).getByText(`${title}`).click();
        await this.saveChange_button.click();
    }

    async chooseTheTime(dateTime: string) {
        await this.dateTimePicker.scrollIntoViewIfNeeded();
        await this.dateTimePicker.click();
        await this.page.getByPlaceholder('Select date').fill(dateTime);
        await this.dateTimePicker.press('Enter');
        await this.saveChange_button.click();
        await this.ok_button.click();
    }

    async clickTheTime() {
        await this.dateTimePicker.scrollIntoViewIfNeeded();
        await this.dateTimePicker.click();
        await this.dateTimePicker_right.click();
        await this.dateTimePicker.press('Enter');
        await this.saveChange_button.click();
        await this.ok_button.click();
    }

    async resetPassword(oldPassword: string, newPassword: string) {
        await this.change_button.scrollIntoViewIfNeeded();
        await this.currentPassword_textbox.fill(oldPassword);
        await this.newPassword_textbox.fill(newPassword);
        await this.confirmPassword_textbox.fill(newPassword);
    }
}