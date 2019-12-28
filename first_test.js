var webdriver = require('selenium-webdriver');
var assert = require('chai').assert;

var By = webdriver.By;
var Key = webdriver.Key;
var until = webdriver.until;
var driver = new webdriver.Builder().forBrowser('firefox').build();
driver.manage().setTimeouts({ implicit: 10});

describe('ITMokykla', function() {
	this.timeout(5000);

	this.beforeEach(async function() {
		driver.get('https://itmokykla.lt/testing/one.html');
	});

	describe('Registration form', function() {
		it('should fill in the form and read username error message', async function() {
			const nameInput = driver.wait(until.elementLocated(By.css('#name')));
			nameInput.sendKeys('Agne', Key.RETURN);

			await driver.findElements(By.name('gender')).then(function(el) {
				return el[1].click();
			});

			await driver.findElement(By.css('.btn-success.btn-lg')).click();
			const result = await driver.findElement(By.css('.alert-danger')).getText();

			assert.equal(result, 'Username must be longer!');
		});

		it('should fill in the form successfully', async function() {
			const nameInput = driver.wait(until.elementLocated(By.css('#name')));
			nameInput.sendKeys('Agnes imone', Key.RETURN);

			await driver.findElements(By.name('gender')).then(function(el) {
				return el[1].click();
			});
			await driver.findElement(By.css('.btn-success.btn-lg')).click();
			const result = await driver.findElement(By.css('.alert.alert-success')).getText();

			assert.equal(result, 'Registration successfull');
		});
	});
});
