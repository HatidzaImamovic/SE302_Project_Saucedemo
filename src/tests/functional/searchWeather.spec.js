const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/HomePage');
const { WeatherPage } = require('../../pages/WeatherPage');

test.describe('Search Weather Tests (Functional Tests)', () => {

  test.setTimeout(60000);

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => {
    const blocked = ['image', 'font', 'media'];
    if (blocked.includes(route.request().resourceType())) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto('https://openweathermap.org/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
});




  test('Search weather of a valid city', async ({ page }) => {
    const home = new HomePage(page);
    await home.searchCity('Sarajevo');
    const city = await home.getCityName();
    expect(city).toContain('Sarajevo, BA');
  });

  test('Search weather of a different valid city', async ({ page }) => {
    const home = new HomePage(page);
    await home.searchCity('Zenica');
    const city = await home.getCityName();
    expect(city).toContain('Zenica, BA');
  });

  test('Search Weather for an invalid city', async ({ page }) => {
    const home = new HomePage(page);
    await home.searchCity('Wano City');

    await expect(home.errorMsg).toBeVisible({ timeout: 7000 });
    const errorMsg = await home.getErrorMsg();
    expect(errorMsg).toContain('Not found');
  });

  test('Temperature change from Celsius to Fahrenheit', async ({ page }) => {
    const home = new HomePage(page);
    const weather = new WeatherPage(page);

    // select a valid city first
    await home.searchCity('Sarajevo');

    await weather.temperatureC.waitFor({ state: 'visible', timeout: 10000 });
    await weather.FahrenheitToCelsius();
    const tempC = await weather.getTemperature();
    expect(tempC).toContain('°C');

    await weather.temperatureF.waitFor({ state: 'visible', timeout: 10000 });
    await weather.CelsiusToFahrenheit();
    const tempF = await weather.getTemperature();
    expect(tempF).toContain('°F');

    expect(tempF).not.toBe(tempC);
  });

});
