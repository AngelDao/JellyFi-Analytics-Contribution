require("dotenv").config();
const { ethers } = require("ethers");
const { queryEvents } = require("./helpers");

const chooseValue = (event, value) => {
  const neg = ["Payback", "Withdraw"];
  const pos = ["Deposit", "Borrow"];
  // console.log(event);
  if (neg.includes(event)) {
    // console.log(value);
    const test = Math.abs(value) * -1;
    // console.log(test);
    return test;
  }

  if (pos.includes(event)) {
    return value;
  }
};

const getEvents = async (provider, fromLast) => {
  const allEvents = await queryEvents(provider, fromLast);
  const eventsData = [];

  let tx = null;
  let currentType = null;
  let val = 0;
  for (let i = 0; i <= allEvents.length - 1; i++) {
    // console.log(i);
    const e = allEvents[i];
    const event = e.event;
    // console.log(
    //   ethers.utils.formatUnits(allEvents[i].args.amount.toString(), 18)
    // );
    const user = e.args.lender;

    tx = allEvents[i].transactionHash;
    const num = parseFloat(
      ethers.utils.formatUnits(allEvents[i].args.amount.toString(), 18)
    );
    val = num;
    if (event === "Deposit") {
      currentType = "DS";
    } else if (event === "Withdraw") {
      currentType = "DS";
    }

    const timestamp = (await provider.getBlock(allEvents[i].blockNumber))
      .timestamp;
    const blocknumber = allEvents[i].blockNumber;

    const eventPoint = {
      user,
      type: event,
      value: chooseValue(event, val),
      blocknumber,
      timestamp,
    };

    eventsData.push(eventPoint);
  }
  return eventsData;
};

module.exports = {
  getEvents,
};
