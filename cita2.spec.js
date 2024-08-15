const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('cita 2', function() {
  this.timeout(30000);
  let driver;
  let vars;
  
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    vars = {};
  });
  
  // Remove the afterEach block to prevent automatic browser closure
  // afterEach(async function() {
  //   await driver.quit();
  // });
  
  it('cita 2', async function() {
    await driver.get("https://icp.administracionelectronica.gob.es/icpplus/index.html");
    await driver.manage().window().setRect({ width: 1550, height: 878 });

    // Wait for the form element to be located
    await driver.wait(until.elementLocated(By.id("form")), 10000);
    await driver.findElement(By.id("form")).click();

    const dropdown = await driver.findElement(By.id("form"));
    await dropdown.findElement(By.xpath("//option[. = 'Barcelona']")).click();

    await driver.findElement(By.id("btnAceptar")).click();
    
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
  });
});