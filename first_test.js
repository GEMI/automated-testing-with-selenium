var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var until = webdriver.until;
var driver_fx = new webdriver.Builder()
	.forBrowser('firefox')
	.build();

driver_fx.manage().setTimeouts({ implicit: 10 });

async function searchTest(driver) {
	driver.get('https://www.google.com');

	var searchField = driver.wait(until.elementLocated(By.name('q')));
	searchField.sendKeys('webdriver\n');

	await driver.findElements(By.name('btnK')).then(function(el) {
		return el[1].click();
	});

	driver.sleep(2000).then(function () {
		driver.getTitle().then(function (title) {
			console.log(title);
			if (title.includes('webdriver')) {
				console.log('Test passed');
			} else {
				console.log('Test failed');
			}
			driver.quit();
		});
	});
}

searchTest(driver_fx);
