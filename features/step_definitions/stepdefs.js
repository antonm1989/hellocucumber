const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key } = require('selenium-webdriver');
const { expect } = require('chai');

require("chromedriver");

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

var {setDefaultTimeout} = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

// function isItFriday(today) {

//     if (today === "Friday") {
//         return "TGIF";
//     } else {
//         return "Nope";
//     }
// }

// Given('today is {string}', function (givenDay) {
//     this.today = givenDay;
// });

// When('I ask whether it\'s Friday yet', function () {
//     this.actualAnswer = isItFriday(this.today);
// });

// Then('I should be told {string}', function (expectedAnswer) {
//     assert.strictEqual(this.actualAnswer, expectedAnswer);
// });


// Given('I am on the Google search page', async function () {
//     await driver.get('http://www.google.com');
// });

// When('I search for {string}', async function (searchTerm) {
//     const element = await driver.findElement(By.name('q'));
//     element.sendKeys(searchTerm, Key.RETURN);
//     element.submit();
// });

// Then('the page title should start with {string}', { timeout: 60 * 1000 }, async function (searchTerm) {
//     const title = await driver.getTitle();
//     const isTitleStartWithCheese = title.toLowerCase().lastIndexOf(`${searchTerm}`, 0) === 0;
//     expect(isTitleStartWithCheese).to.equal(true);
// });


// ########################################################
// ########################################################
// ########################################################

Given('I am not registered user', async function () {
    this.email = 'ssls.automation+666@gmail.com';
    this.password = '123456';
});

When('I open Home page', async function () {
    // await driver.manage().setTimeouts( { implicit: 5000 } );
    await driver.get('https://www.sbzend.ssls.com');
});

Then('I should see Home page', async function () {
    const pageTitle = await driver.getTitle();
    const isTitleStartWithCheap = pageTitle.toLowerCase().lastIndexOf(`cheap`, 0) === 0;
    expect(isTitleStartWithCheap).to.equal(true);
});

When('I click {string} text', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    let logInText = driver.findElement(By.css('span.ssls-toolbar__btn-text'));
    // let logInText = await driver.findElement(By.css('span:contains(`${string}`)'));
    // const expectedText = string.toLowerCase();
    // const string2 = string3.toLowerCase
    await logInText.click();
});

Then('I should see Authorization page', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I enter credentials and click {string} icon', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I should see entered password', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('I click on {string} button', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('I should see error message', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

AfterAll(function () {
    driver.quit();
    return Promise.resolve()
});