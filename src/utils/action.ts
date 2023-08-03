import { Selector } from "webdriverio";

export default class Action {
    

    static async launchBrowserUrl(urlToLaunch) {
        await browser.url(urlToLaunch)
    }

    static async getTitle() {
        return await browser.getTitle();
    }

    static async launchApp() {
        await driver.launchApp();
    }

    static async activateApp(appActivity) {
        await driver.activateApp(appActivity);
    }

    static async switchToNativeContext() {
        await browser.switchContext('NATIVE_APP');
    }

    static async pause(seconds) {
        await browser.pause(seconds);
    }

    static async isVisible(locator) {
        return await $(locator).isDisplayed() ? true : false;
    }


    static async click(locator) {
        await $(locator).click();
    }

    static async waitForElement(locator: Selector, waitTimeInSeconds: number) {
    //    await  $(locator).waitForDisplayed(waitTimeInSeconds);
    }

    static async clearText(locator) {
        await $(locator).clearValue();
    }

    static async sendText(locator, inputText) {
        await $(locator).addValue(inputText);
    }

    static async getText(locator) {
        return await $(locator).getText();
    }

static async installApp(appPath) {
        await browser.installApp(appPath) 
   }


}

