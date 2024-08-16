const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runBot() {
  const options = new chrome.Options();
  options.addArguments('headless'); // Run in headless mode
  options.addArguments('no-sandbox'); // Required for some server environments
  options.addArguments('disable-dev-shm-usage'); // Overcome limited resource problems

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get('https://icp.administracionelectronica.gob.es/icpplus/index.html');
    await driver.manage().window().setRect({ width: 1550, height: 878 });
    await driver.findElement(By.id('form')).click();
    const dropdown = await driver.findElement(By.id('form'));
    await dropdown.findElement(By.xpath("//option[. = 'Barcelona']")).click();
    await driver.findElement(By.id('btnAceptar')).click();
    await driver.findElement(By.id("tramiteGrupo[0]")).click()
    {
      const dropdown = await driver.findElement(By.id("tramiteGrupo[0]"))
      await dropdown.findElement(By.xpath("//option[. = 'POLICIA-TOMA DE HUELLA (EXPEDICIÓN DE TARJETA), RENOVACIÓN DE TARJETA DE LARGA DURACIÓN Y DUPLICADO']")).click()
    }
    await driver.findElement(By.id("btnAceptar")).click()
    await driver.findElement(By.id("btnEntrar")).click()
    await driver.findElement(By.id("txtIdCitado")).sendKeys("Z2143113R")
    await driver.findElement(By.id("txtDesCitado")).sendKeys("SAMI ABAR")
    {
      const dropdown = await driver.findElement(By.id("txtPaisNac"))
      await dropdown.findElement(By.xpath("//option[. = 'MARRUECOS']")).click()
    }
    await driver.findElement(By.id("btnEnviar")).click()
    await driver.findElement(By.id("btnSiguiente")).click()
    await driver.findElement(By.id("txtTelefonoCitado")).click()
    await driver.findElement(By.id("emailUNO")).sendKeys("samiabar30@gmail.com")
    await driver.findElement(By.id("emailDOS")).sendKeys("samiabar30@gmail.com")
    await driver.findElement(By.id("txtTelefonoCitado")).sendKeys("663094035")
    await driver.findElement(By.id("btnSiguiente")).click()
    await driver.findElement(By.linkText("23")).click()
    await driver.findElement(By.id("captcha")).click()
    await driver.findElement(By.id("HUECO78749735")).click()
    await driver.findElement(By.id("captcha")).sendKeys("wcg57")
    await driver.findElement(By.id("HUECO80459061")).click()
    await driver.findElement(By.id("chkTotal")).click()
    await driver.findElement(By.id("enviarCorreo")).click()
    await driver.findElement(By.id("btnConfirmar")).click()

    assert.strictEqual(await driver.switchTo().alert().getText(), "AVISO CITA PREVIA\n\nNo olvides introducir el dato: '\"Código\"'. ");
  } finally {
    await driver.quit();
  }
}
module.exports = { runBot };