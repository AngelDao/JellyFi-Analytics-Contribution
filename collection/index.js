require("dotenv").config();
const { ethers } = require("ethers");
const { getEvents } = require("./utils/getEvents");
const { timeSeries } = require("./services/EventPoints");

const main = async (fromLast) => {
  let provider;

  if (process.env.PROJECT_ID) {
    provider = new ethers.providers.InfuraProvider(
      "kovan",
      process.env.PROJECT_ID
    );
  }

  let stats;
  if (provider) {
    try {
      console.log("scraper started");
      stats = await getEvents(provider, fromLast);
      // here is the time series data
      const data = timeSeries(stats);

      // TVL time series
      // console.log(data[0].data);

      // Unique Adresses time series
      // console.log(data[1].data);

      console.log("scraper ended");
    } catch (err) {
      console.log("scraper crash:");
      console.log(err);
    }
  } else {
    console.log("no provider");
  }
  return stats;
};

main();

// module.exports = {
//   scraper: main,
// };
