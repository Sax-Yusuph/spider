const axios = require("axios")
const {
  scrapJumia,
  scrapKara,
  scrapSlot,
  scrapEbay,
} = require("../scrapStore");

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


module.exports= fetchData