import { Given, When, Then } from '@cucumber/cucumber';
import { World, setWorldConstructor } from '@cucumber/cucumber';
import LocalAccount from '../resources/data/dataSource.js'

import LoginPage from '../pages/login.js';

const loginPage = new LoginPage();

class CustomWorld extends World{
    protected localAccount: any;
constructor(options) {
    super(options);
    this.localAccount = new LocalAccount();
}
}

setWorldConstructor(CustomWorld);


Given('I launch the app', async () => await loginPage.installApp('/Users/mjayara/Documents/BP/bp.apk','com.bp.fastscanapk'));

Then('I should be on home page', async () =>  await loginPage.verifyHomePageisDisplayed());

Then('I should get the data from csv file', async function() {
const { userId } = await this.localAccount.getaccount('800')
})  





