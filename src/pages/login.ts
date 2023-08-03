import Helper from '../utils/action.js';
import assert from 'node:assert';

import loginscreen from '../screens/native/Android/login.screen.js';

const Loginscreen = new loginscreen();

export default class Loginpage {

async verifyHomePageisDisplayed() {
    await Helper.pause(5000);
   assert.strictEqual(await Helper.isVisible(Loginscreen.homePage),true);
}

async installApp(appPath: string, appActivity: string ) {
    await Helper.installApp(appPath);
    await Helper.activateApp(appActivity);
    await Helper.switchToNativeContext();
}
   
}


