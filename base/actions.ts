import { test , Page, ElementHandle, Locator, expect} from '@playwright/test';

export async function click(page: Page, selector: string) {
    await page.click(selector);
}

export async function checkTitleSuccess(page: Page, expectedTitle: string, locator? : string) {
    if(typeof locator !== 'undefined') {
        await page.waitForSelector(locator)
    }

    const assert = require('assert');
    const pageTitle = await page.title();
    console.log(pageTitle);
    
    assert.ok(pageTitle.includes(expectedTitle), `Page title "${pageTitle}" does not contain "${expectedTitle}"`);
}

export async function checkContentOfElement(page: Page, locator: string, expected_text: string) {
    const myDiv = await page.locator(locator);
    page.waitForSelector(locator);
    const content = await myDiv.textContent();
    expect(content).toMatch(expected_text);
}

