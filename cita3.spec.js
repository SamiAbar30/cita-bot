const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('cita 3', function () {
  this.timeout(30000);
  let driver;
  let vars;

  beforeEach(async function () {
    const options = new chrome.Options();
    options.addArguments('incognito'); // Start in incognito mode to avoid using cached data
    options.addArguments('disable-cache'); // Disable cache

    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    vars = {};
    await driver.manage().deleteAllCookies();
  });

  afterEach(async function () {
    if (driver) {
      await driver.manage().deleteAllCookies();
      await driver.quit();
    }
  });

  it('cita 3', async function () {
    await driver.get("https://icp.administracionelectronica.gob.es/icpplus/index.html");
    await driver.manage().window().setRect({ width: 1550, height: 878 });

    // Wait and handle cookie consent or other overlays
    try {
      const cookieBanner = await driver.wait(until.elementLocated(By.css('.cli-plugin-main-button')), 5000);
      await cookieBanner.click();
    } catch (error) {
      console.log('No cookie banner found or already handled.');
    }

    await driver.wait(until.elementLocated(By.id("form")), 10000);
    await driver.findElement(By.id("form")).click();

    const dropdown = await driver.findElement(By.id("form"));
    await dropdown.findElement(By.xpath("//option[. = 'Barcelona']")).click();

    const acceptButton = await driver.findElement(By.id("btnAceptar"));
    await driver.executeScript("arguments[0].click();", acceptButton);

    // Wait for the tramite dropdown to be available
    await driver.wait(until.elementLocated(By.xpath("//select[contains(@id, 'tramiteGrupo')]")), 10000);
    const tramiteDropdown = await driver.findElement(By.xpath("//select[contains(@id, 'tramiteGrupo')]"));
    await tramiteDropdown.click();
    await tramiteDropdown.findElement(By.xpath("//option[. = 'POLICIA-TOMA DE HUELLA (EXPEDICIÓN DE TARJETA), RENOVACIÓN DE TARJETA DE LARGA DURACIÓN Y DUPLICADO']")).click();

    await driver.findElement(By.id("btnAceptar")).click();
    await driver.findElement(By.id("btnEntrar")).click();
    await driver.findElement(By.id("txtIdCitado")).sendKeys("Z2143113R");
    await driver.findElement(By.id("txtDesCitado")).sendKeys("SAMI ABAR");

    const dropdown2 = await driver.findElement(By.id("txtPaisNac"));
    await dropdown2.findElement(By.xpath("//option[. = 'MARRUECOS']")).click();

    await driver.findElement(By.id("btnEnviar")).click();
    await driver.findElement(By.id("btnSiguiente")).click();
    await driver.findElement(By.id("txtTelefonoCitado")).click();
    await driver.findElement(By.id("emailUNO")).sendKeys("samiabar30@gmail.com");
    await driver.findElement(By.id("emailDOS")).sendKeys("samiabar30@gmail.com");
    await driver.findElement(By.id("txtTelefonoCitado")).sendKeys("663094035");
    await driver.findElement(By.id("btnSiguiente")).click();
    await driver.findElement(By.linkText("23")).click();
    await driver.findElement(By.id("captcha")).click();
    await driver.findElement(By.id("HUECO78749735")).click();
    await driver.findElement(By.id("captcha")).sendKeys("wcg57");
    await driver.findElement(By.id("HUECO80459061")).click();
    await driver.findElement(By.id("chkTotal")).click();
    await driver.findElement(By.id("enviarCorreo")).click();
    await driver.findElement(By.id("btnConfirmar")).click();

    assert.strictEqual(await driver.switchTo().alert().getText(), "AVISO CITA PREVIA\n\nNo olvides introducir el dato: '\"Código\"'. ");
  });
});