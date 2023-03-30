import { Page } from "@playwright/test";

export default class LoginPage {
    constructor(public page: Page) {

    }

    async enterUsername(username: string) {
        await this.page.getByPlaceholder('Email')
            .fill(username);
    }

    async enterPassword(password: string) {
        await this.page.getByPlaceholder('Password')
            .fill(password);
    }

    async clickLogin() {
        this.page.getByRole('button', { name: 'Log in' })
            .click()
    }

    async login(username: string, password: string) {
        await this.page.getByPlaceholder('Email')
            .fill(username);

        await this.page.getByPlaceholder('Password')
            .fill(password); 

        await this.page.getByRole('button', { name: 'Log in' })
            .click()
    }

    async checkIfLoginSuccess() {
        const assert = require('assert');
        const expectedTitle = 'Dashboard';
        const pageTitle = await this.page.title();

        assert.ok(pageTitle.includes(expectedTitle), `Page title "${pageTitle}" does not contain "${expectedTitle}"`);
    }
}