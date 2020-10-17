const cheerio = require("cheerio");
const fs = require("fs");

const scrapJumia = (html) => {
  const $ = cheerio.load(html);
  const products = $("a[class=core]") || "unable to get";
  const jumiaProducts = [];

  // console.log(products.contents().length)

  // fs.writeFileSync('jumia.html', $.html())

  products.each(function () {
    const productName = $(this).find(".info > .name").text();
    const productLink = $(this).attr("href");
    const productStore =
      $(this).find(".shop-logo > span").text() || "not provided";

    const oldPrice = $(this).find(".info > .s-prc-w > .old").text();
    const newPrice = $(this).find(".info > .prc").text();

    const official =
      $(this).find(".top-badge > img").attr("src") || "not provided";
    const info = $(this).find(".info > .tag").text();
    const productImage = $(this).find(".img-c > img").attr("data-src");

    jumiaProducts.push({
      websiteName: "jumia",
      productName,
      productLink: `https://www.jumia.com.ng/${productLink}`,
      productImage,
      productStore,
      productAvailability: info,
      officialBadge: official,
      oldPrice,
      newPrice,
    });
  });

  // console.log(jumiaProducts)
  return jumiaProducts;
};

const scrapKonga = (html) => {
  const $ = cheerio.load(html);
  const products = $(".a2cf5_2S5q5.cf5dc_3HhOq");
  const kongaProducts = [];

  products.each(function () {
    const productName = $(this)
      .find("._4941f_1HCZm > a > .af885_1iPzH > h3")
      .text();
    const productLink = $(this).find("._4941f_1HCZm > a ").attr("href");
    const productStore =
      $(this).find("._4941f_1HCZm > form > ._7cc7b_23GsY").text() ||
      "not provided";

    const oldPrice = $(this).find("._4e81a_39Ehs > .f6eb3_1MyTu").text();

    // DO THIS LATER
    const newPrice = $(this).find("._4e81a_39Ehs > .d7c0f_sJAqi").text();

    const official =
      $(this).find(".top-badge > img").attr("src") || "not provided";
    const info = $(this).find("._4941f_1HCZm > form > ._09e22_1ojNd").text();
    const infoAlt = $(this).find("._4941f_1HCZm > form > ._7c514_GMwE8").text();
    const productImage = $(this)
      .find("._7e903_3FsI6 > a > picture")
      .children()
      .first()
      .attr("data-srcset");

    kongaProducts.push({
      websiteName: "konga",
      productName,
      productLink: `https://www.konga.com${productLink}`,
      productImage,
      productStore,
      productAvailability: info,
      pickUp: infoAlt,
      officialBadge: official,
      oldPrice,
      newPrice,
    });
  });

  // console.log(kongaProducts)
  return kongaProducts;
};

/*****************************
 SLOT NG
 **********************************************/
const scrapSlot = (html) => {
  const $ = cheerio.load(html);
  const products = $(".product-inner");
  const slotProducts = [];

  products.each(function () {
    const productName = $(this).find(".mf-product-content > h2").text();
    const productLink = $(this).find(".mf-product-thumbnail > a ").attr("href");

    const newPrice = $(this)
      .find(".mf-product-price-box> .price > .woocommerce-Price-amount.amount")
      .text();
    const productImage = $(this)
      .find(".mf-product-thumbnail > a > img")
      .attr("src");

    slotProducts.push({
      websiteName: "slot",
      productName,
      productLink,
      productImage,
      newPrice,
    });
  });

  // console.log(slotProducts)
  return slotProducts;
};


/*****************************
 FEMTECH IT  ************** not done yet !!!!!!!!
 **********************************************/
const scrapFemtech = (html) => {
  const $ = cheerio.load(html);
  const products = $(".product-inner");
  const femtechProducts = [];

  products.each(function () {
    const productName = $(this).find(".mf-product-content > h2").text();
    const productLink = $(this).find(".mf-product-thumbnail > a ").attr("href");

    const newPrice = $(this)
      .find(".mf-product-price-box> .price > .woocommerce-Price-amount.amount")
      .text();
    const productImage = $(this)
      .find(".mf-product-thumbnail > a > img")
      .attr("src");

    femtechProducts.push({
      websiteName: "femtech",
      productName,
      productLink,
      productImage,
      newPrice,
    });
  });

  // console.log(slotProducts)
  return femtechProducts;
};

/*****************************
 KARA NG
 **********************************************/
const scrapKara = (html) => {
  const $ = cheerio.load(html);
  const products = $(".product-item-info");
  const karaProducts = [];

  products.each(function () {
    const productName = $(this).find(".product-item-name > a").text();
    const productLink = $(this).find(".product-item-name > a").attr("href");

    const newPrice = $(this).find(".price").text();
    const productImage = $(this).find("img.product-image-photo ").attr("src");

    karaProducts.push({
      websiteName: "kara",
      productName,
      productLink,
      productImage,
      newPrice,
    });
  });

  // console.log(karaProducts)
  return karaProducts;
};

/*****************************
 EBAY STORE
 **********************************************/
const scrapEbay = (html) => {
  const $ = cheerio.load(html);
  const products = $(".s-item__wrapper");
  const EbayProducts = [];

  products.each(function () {
    const productName = $(this).find(".s-item__title").text();
    const productLink = $(this).find(".s-item__info > a ").attr("href");

    // DO THIS LATER
    const newPrice = $(this)
      .find(".s-item__detail--primary > .s-item__price ")
      .text();

    const info = $(this).find(".s-item__subtitle > .SECONDARY_INFO").text();
    const shipping = $(this)
      .find(".s-item__detail--primary > .s-item__logisticsCost")
      .text();
    const infoAlt = $(this).find(".s-item__detail--secondary > span ").text();
    const productImage = $(this)
      .find(".s-item__image-wrapper > img")
      .attr("src");

    EbayProducts.push({
      websiteName: "ebay",
      productName,
      productLink,
      productImage,
      productAvailability: info,
      pickUp: `${shipping} || ${infoAlt}`,
      newPrice,
      nairaPrice: `₦${parseFloat(newPrice.replace("$", "")) * 360}`,
    });
  });

  // console.log(EbayProducts)
  return EbayProducts;
};

module.exports = {
  scrapJumia,
  scrapKonga,
  scrapEbay,
  scrapSlot,
  scrapKara
};
