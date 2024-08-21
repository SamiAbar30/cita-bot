const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');
const nodemailer = require('nodemailer');

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
    await driver.findElement(By.id("txtIdCitado")).sendKeys("Z0215713R");
    await driver.findElement(By.id("txtDesCitado")).sendKeys("ROBILA BOOJI");

    const dropdown2 = await driver.findElement(By.id("txtPaisNac"));
    await dropdown2.findElement(By.xpath("//option[. = 'MARRUECOS']")).click();

    await driver.findElement(By.id("btnEnviar")).click();

    
    await driver.findElement(By.id("btnSiguiente")).click();
    await driver.findElement(By.id("txtTelefonoCitado")).click();
    // Send notification after passing this step
    await sendNotification('Step passed: btnEnviar clicked');
    await driver.findElement(By.id("emailUNO")).sendKeys("samiabar30@gmail.com");
    await driver.findElement(By.id("emailDOS")).sendKeys("bila30@gmail.com");
    await driver.findElement(By.id("txtTelefonoCitado")).sendKeys("667788996");
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

// Function to send email notifications
async function sendNotification(message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alibad03697@gmail.com',
      pass: 'oqqjhwzwvdvjrnio'
    }
  });

  const mailOptions = {
    from: 'alibad03697@gmail.com',
    to: 'samiabar30@gmail.com',
    subject: 'd5ol t9awed bzerba a si sami',
    text: message
  };
  const mailOptions2 = {
    from: 'alibad03697@gmail.com',
    to: 'Leftahmohamedamine@gmail.com',
    subject: 'd5ol t9awed bzerba a si amin',
    text: message
  };
  try {
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}