const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
const { performance } = require("perf_hooks");
const { skippedResources, blockedResourceTypes } = require('./utils/resource')
// const cheerio = require('cheerio')
const {
  scrapJumia,
  scrapKonga,
  scrapAli,
  scrapKara,
  scrapSlot,
  scrapEbay,
} = require("./scrapStore");

const userRequest = {
  item: "infinix hot 8",
  urls: ["Konga", "Jumia", "AliExpress", "Kara", "Ebay", "Slot"],
};



let queryString = userRequest.item.replace(/\s/g, "+");
const urls = userRequest.urls
  .filter((url) => url !== "Konga" && url !== "AliExpress")
  .map((url) => {
    let storeUrl = "";
    switch (url) {
      case "Jumia":
        storeUrl = `https://www.jumia.com.ng/catalog/?q=${queryString}`;
        break;
      case "Kara":
        storeUrl = `https://www.kara.com.ng/catalogsearch/result/?q=${queryString}`;
        break;
      case "Slot":
        storeUrl = `https://slot.ng/?s=${queryString}&post_type=product`;
        break;
      case "Ebay":
        storeUrl = `https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l1313&_nkw=${queryString}&_sacat=0`;
        break;
    }

    return storeUrl;
  });

const SPA_Store_Urls = userRequest.urls
  .filter(
    (url) =>
      url !== "Jumia" && url !== "Kara" && url !== "Ebay" && url !== "Slot"
  )
  .map((url) => {
    let SPAStoreUrl = "";
    switch (url) {
      case "AliExpress":
        queryString = userRequest.item.replace(/\s/g, "+");
        SPAStoreUrl = `https://www.aliexpress.com/wholesale?SearchText=${queryString}`;
        break;
      case "Konga":
        queryString = userRequest.item.replace(/\s/g, "%20");
        SPAStoreUrl = `https://www.konga.com/search?search=${queryString}`;
        break;
    }
    return SPAStoreUrl;
  });

function fetchData(URL) {
  return axios
    .get(URL)
    .then(function (response) {
      let uri = URL.split(".")[1].includes("ng/?s=")
        ? "slot"
        : URL.split(".")[1];
      switch (uri) {
        case "jumia":
          return scrapJumia(response.data);
        case "ebay":
          return scrapEbay(response.data);
        case "slot":
          return scrapSlot(response.data);
        case "kara":
          return scrapKara(response.data);
      }
    })
    .catch(function (error) {
      return error.message;
    });
}



getSPAStores = async (SPA_Store_Urls) => {
  console.log(`SPA_Store_Urls : ${SPA_Store_Urls}`);
  const t0 = performance.now();
  console.log(
    `started SPA store in ${Math.ceil((performance.now() - t0) / 1000)} seconds`
  );
  const browser = await puppeteer.launch({
    args: [
      // "--proxy-server=" + proxy,
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920x1080",
    ],
  });

  console.log(
    `launched puppeteer in ${Math.ceil(
      (performance.now() - t0) / 1000
    )} seconds`
  );
  let results = await Promise.all(
    SPA_Store_Urls.map(async (url) => {
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      // await page.setUserAgent(userAgent);

      // PAGE SETTINGS ***************************************

      page.on("request", (request) => {
        const requestUrl = request._url.split("?")[0].split("#")[0];
        if (
          blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
          skippedResources.some(
            (resource) => requestUrl.indexOf(resource) !== -1
          )
        ) {
          request.abort();
          // console.log(`blocked ----- ${requestUrl}`)
        } else {
          console.log(requestUrl);
          request.continue();
        }
      });
      console.log(
        `navigating urls in ${Math.ceil(
          (performance.now() - t0) / 1000
        )} seconds`
      );

      try {
        // NAVIGATE TO THE PAGE VIA PUPPETEEER
        await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        let html = await page.content();

        fs.writeFileSync(`${url.split(".")[1]}.html`, html);

        console.log(url.split(".")[1]);

        switch (url.split(".")[1]) {
          case "konga":
            console.log(`captured konga url: ${url}`);
            return { konga: scrapKonga(html) };
          case "aliexpress":
            return await page.evaluate(() => {
              const products = window.runParams.items;
              const ScrapedData = products.map((product) => {
                return {
                  websiteName: "ali express",
                  productName: product.title,
                  productLink: `https:${
                    product.productDetailUrl.split("?")[0]
                  }`,

                  newPrice: product.price,
                  pickUp: product.logisticsDesc,
                  productAvailability: product.tradeDesc,
                  productImage: `https:${product.imageUrl}`,
                };
              });
              return ScrapedData;
            });
        }
      } catch (error) {
        console.log(error.message);
      }
    })
  ).then((res) => {
    return res;
  });

  await browser.close();

  console.log(
    `finished in ${Math.ceil((performance.now() - t0) / 1000)} seconds`
  );
  return results;
};

function getAllData(URLs, SPAUrls) {
  return Promise.all([...URLs.map(fetchData), getSPAStores(SPAUrls)]);
}

// EXECUTE CODE FUNCTION HERE!!!*************************************************
getAllData(urls, SPA_Store_Urls)
  .then((resp) => {
    const fetched_result = [];
    resp.forEach((array) => {
      fetched_result.push(...array);
    });
    last_item = fetched_result.pop()

    fetched_result.push(...last_item)

    fs.writeFile(
      "storeResults.json",
      JSON.stringify(fetched_result, null, 3),
      () => {
        console.log(`scraped ${fetched_result.length} results >>>>>>>>`);
        console.log("yay! successfully completed");
      }
    );
    // console.log(JSON.stringify(resp, null, 2));
  })
  .catch((e) => {
    console.log(e);
  });
