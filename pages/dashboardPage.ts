import { Page } from "@playwright/test";
import ProfilePage from '../pages/profilePage'

export default class dashboardPage {

    constructor(public page: Page) {

    }

    //public profile_button = this.page.getByRole('button', { name: 'testmot' });
    public profile_button = this.page.locator("//div[@class='ant-space ant-space-horizontal ant-space-align-center']");
    public profile_link = this.page.getByRole('link', { name: 'Profile' });

    async gotoProfile() {
        await this.profile_button.click();
        await this.profile_link.click();
    }
}