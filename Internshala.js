require("dotenv").config();
const puppeteer = require("puppeteer");
const loginLink = "https://internshala.com/login/student";
const path = require("path");

let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
  executablePath: "C:\\Users\\HP\\.cache\\puppeteer\\chrome\\win64-132.0.6834.110\\chrome-win64\\chrome.exe",
});


let page;

browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage(); // Open a new page
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let internShalaOpenPromise = newTab.goto(loginLink, { timeout: 60000 }); // Go to login page with increased timeout
    return internShalaOpenPromise;
  })
  .then(function () {
    return page.type("input[id='email']", process.env.EMAIL, { delay: 50 }); // Type email
  })
  .then(function () {
    return page.type("input[id='password']", process.env.PASSWORD, {
      delay: 50,
    }); // Type password
  })
  .then(function () {
    return page.click('button[id="login_submit"]', { delay: 40 }); // Click login button
  })
  .then(function () {
    return page.waitForNavigation().then(() => {
        console.log("Current URL after login:", page.url()); // Log current URL
    }); // Wait for navigation after login

  })
  .then(function () {
    return waitAndClick('a[id="internships_new_superscript"]', page, {
      delay: 1000,
    }); // Click on internships link
  })
  .then(function () {
    return waitAndClick('input[id="matching_preference"]', page, {
      delay: 1000,
    }); // Click on matching preference
  })
  .then(function () {
    let allInternshipsPromise = page.$$(".easy_apply", { delay: 50 });
    return allInternshipsPromise;
  })
  .then(async function (internshipsArray) {
    console.log("Number of internships: ", internshipsArray.length);
    await internshipApply(internshipsArray[0]);
  })
  .catch(function (err) {
    console.error("Error: ", err);
  });

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    cPage
      .waitForSelector(selector, { timeout: 60000 })

      .then(function () {
        return cPage.click(selector);
      })
      .then(function () {
        resolve();
      })
      .catch(function (error) {
        reject(error);
      });
  });
}

async function internshipApply(selector) {
  try {
    await page.evaluate((sel) => sel.click(), selector);
    const internshipTitle = await page.evaluate(() => {
        const titleElement = document.querySelector('h1.internship-title, .internship-title');

        return titleElement ? titleElement.innerText : 'Title not found'; // Adjust selector as needed
    });

    console.log(`Applying for internship: ${internshipTitle}`); // Log internship title
    console.log("Current URL before clicking cover letter link:", page.url()); // Log current URL


    await waitAndClick('button[id="continue_button"]', page);

    await waitAndClick('a[class="copyCoverLetterTitle"]', page);

    await page.waitForSelector('input[type="file"]');
    const inputUploadHandle = await page.$('input[type="file"]');
    const filePath = path.relative(process.cwd(), "./Resume.pdf");
    await inputUploadHandle.uploadFile(filePath);

    const questionsAndTextAreas = await page.evaluate(() => {
      const questions = Array.from(
        document.querySelectorAll(".assessment_question label")
      );
      const textAreas = Array.from(
        document.querySelectorAll('textarea[placeholder="Enter text ..."]')
      );

      return questions.map((question, index) => ({
        questionText: question.textContent.trim(),
        textAreaName: textAreas[index]
          ? textAreas[index].getAttribute("name")
          : null,
      }));
    });

    for (const { questionText, textAreaName } of questionsAndTextAreas) {
      if (!textAreaName) {
        console.error(`No text area found for question: ${questionText}`);
        continue;
      }

      console.log(`Assessment Question: ${questionText}`);
      const text = await new Promise((resolve) => {
        const readline = require('readline').createInterface({
          input: process.stdin,
          output: process.stdout
        });
        readline.question(`Enter your response for "${questionText}": `, (answer) => {
          readline.close();
          resolve(answer.toString()); // Ensure text is a string
        });
      });

      // Ensure text is a string and properly handled
      if (typeof text === 'string') {
        await page.type(`textarea[name="${textAreaName}"]`, text, {
          delay: 50,
        });
      } else {
        console.error(`Invalid input type: ${typeof text}`);
      }
    }

    await waitAndClick('input[id="submit"]', page, { delay: 1000 });
    await page.goto(
      "https://internshala.com/internships/matching-preferences/"
    );
  } catch (error) {
    console.error("Error in internshipApply:", error);
  }
}
