// const userRequest = {
//   item: "infinix hot 8",
//   urls: ["Konga", "Jumia", "AliExpress", "Kara", "Ebay", "Slot"],
// };

const format_res = (userRequest) => {
  // const userRequest = JSON.parse(userReq)
  const urls = userRequest.urls
    .filter((url) => url !== "Konga" && url !== "AliExpress")
    .map((url) => {
      let queryString = userRequest.item.replace(/\s/g, "+");
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
      let queryString = userRequest.item.replace(/\s/g, "+");
      switch (url) {
        case "AliExpress":
          SPAStoreUrl = `https://www.aliexpress.com/wholesale?SearchText=${queryString}`;
          break;
        case "Konga":
          queryString = userRequest.item.replace(/\s/g, "%20");
          SPAStoreUrl = `https://www.konga.com/search?search=${queryString}`;
          break;
      }
      return SPAStoreUrl;
    });

   return {
        urls,
        SPA_Store_Urls
    }
};

module.exports= format_res