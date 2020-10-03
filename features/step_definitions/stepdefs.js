const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const { Builder, By, Capabilities, Key, Browser, until } = require('selenium-webdriver');
const { expect, assert } = require('chai');
// var assert = require('assert');
// var expect = require('chai');
var should = require('chai').should();
var webdriver = require('selenium-webdriver');
require("chromedriver");
// var sleep = require('sleep');

// driver setup
const capabilities = Capabilities.chrome();
capabilities.set('chromeOptions', { "w3c": false });
const driver = new Builder().withCapabilities(capabilities).build();

var { setDefaultTimeout } = require('@cucumber/cucumber');
const { elementIsDisabled, elementIsVisible } = require('selenium-webdriver/lib/until');
const { Driver } = require('selenium-webdriver/chrome');
setDefaultTimeout(60 * 1000);

var locators = {
    loginSelector: "//span[contains(text(),'Log in')]",
    authPage: 'h1.page-title',
    footerSelector: 'footer.ssls-footer',
    enteredPassword: "//input[@name='password' and @type='text']",
    loginButton: "//button[contains(text(),'Login')]",
    eyeIcon: 'span.icon-eye',
    errorMessage: "//div[contains(text(),'Uh oh! Email or password is incorrect')]",
    errorMessage2: "//div[contains(text(),'Uh odfdh! Email or password is incorrect')]",
    loggedInUserIcon: "span.ssls-toolbar__btn-text",
    wrongSelector: 'span.anton'
}

Given('I am not registered user', async function () {
    this.email = 'random_email@gmail.com';
    this.password = '123456';
});

Given('I am registered user', async function () {
    this.email = 'ssls.automation+666@gmail.com';
    this.password = '123456';
});


When('I open Home page', async function () {
    await driver.get('https://www.sbzend.ssls.com');
});

Then('I should see Home page', async function () {
    let res = await driver.findElement(By.css(locators.footerSelector)).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Page footer is not displayed");
    const pageTitle = await driver.getTitle();
    const isTitleStartWithCheap = pageTitle.toLowerCase().lastIndexOf('cheap', 0) === 0;
    // assert.equal(isTitleStartWithCheap, true, 'Page title does not start with word cheap');
});

Then('I should see button with LOG IN text', async function () {
    let res = await driver.findElement(By.xpath(locators.loginSelector)).getAttribute("class");
    assert(res == "ssls-toolbar__btn-text", "Log in element is not a button");
    res = await driver.findElement(By.xpath(locators.loginSelector)).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Log In text is not displayed");
});

When('I click LOG IN text', async function () {
    await driver.findElement(By.xpath(locators.loginSelector)).click();
});

Then('I should see Authorization page', async function () {
    let authPageLoaded = await driver.wait(until.elementLocated(By.css(locators.authPage), 10000));
    res = await driver.findElement(By.css(locators.authPage)).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Authorization page is not displayed");
});

Then('I should see credentials inputs', async function () {
    let emailFieldLocated = await driver.wait(until.elementLocated(By.name('email'), 10000));
    res = await driver.findElement(By.name('email')).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Email field is not displayed");
    res = await driver.findElement(By.name('password')).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Password field is not displayed");
});

When('I enter credentials and click on eye icon', async function () {
    await driver.findElement(By.name('email')).sendKeys(this.email);
    await driver.findElement(By.name('password')).sendKeys(this.password);
    await driver.findElement(By.css(locators.eyeIcon)).click();
});

Then('I should see entered password', async function () {
    res = await driver.findElement(By.xpath(locators.enteredPassword)).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Entered password is not displayed");
    let enteredPassword = await driver.findElement(By.name('password')).getAttribute("value");
    assert.equal(enteredPassword, this.password, "Showed password doesn't match entered");
});

When('I click on Login button', async function () {
    await driver.findElement(By.xpath(locators.loginButton)).click();
});

Then('I should see error message', async function () {
    await driver.wait(until.elementLocated(By.xpath(locators.errorMessage), 10000));
    res = await driver.findElement(By.xpath(locators.errorMessage)).isDisplayed().then(value => { return true }, reason => { return false });
    assert.equal(res, true, "Error message is not displayed");
});

Then('I should see {string} button', async function (string) {
    await driver.wait(until.elementLocated(By.css(locators.loggedInUserIcon), 10000)); 
    let res = await driver.findElement(By.css(locators.loggedInUserIcon)).getAttribute("value");
    assert.equal(res, this.email, "Logged in user icon is not found");
});

AfterAll(function () {
    driver.quit();
    return Promise.resolve()
});



// driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

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