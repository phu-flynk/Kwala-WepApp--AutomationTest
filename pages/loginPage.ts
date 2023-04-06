import { Page } from "@playwright/test";
import DashboardPage from '../pages/dashboardPage';

export default class LoginPage {
    constructor(public page: Page) {

    }

    public username = this.page.getByPlaceholder('Email')
    public password = this.page.getByPlaceholder('Password')
    public login_button = this.page.getByRole('button', { name: 'Log in' })

    async enterUsername(username: string) {
        await this.username.fill(username)
    }

    async enterPassword(password: string) {
        await this.password.fill(password)

    }

    async clickLogin() {
        await Promise.all([
            this.login_button.click(),
        ])
    }

    async login(username: string, password: string) {
        await this.username.fill(username)
        await this.password.fill(password)
        await this.login_button.click()
    }

    async checkIfLoginSuccess() {
        const assert = require('assert');
        const expectedTitle = 'Dashboard';
        const pageTitle = await this.page.title();

        assert.ok(pageTitle.includes(expectedTitle), `Page title "${pageTitle}" does not contain "${expectedTitle}"`);
    }
}