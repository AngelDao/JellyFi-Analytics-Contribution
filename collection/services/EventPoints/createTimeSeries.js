const timeSeries = async (events) => {
  let tvl = 0;
  const accounts = {};
  const response = [
    { target: "TVL", data: [] },
    { target: "Unique Adresses", data: [] },
  ];
  events.forEach((e) => {
    // console.log(response);
    const event = e.type;
    const timestamp = e.timestamp * 1000;
    const num = e.value;
    const user = e.user;
    console.log(typeof num);
    console.log(num);

    if (!accounts[user]) {
      //   console.log("not present", user);
      accounts[user] = {
        acc: { debt: 0, coll: 0 },
      };
    }
    // console.log(event);
    if (event === "Deposit") {
      tvl += num;
      response[0].data.push([tvl, timestamp]);
      accounts[user].acc.debt += num;
    } else if (event === "Withdraw") {
      tvl += num;
      response[0].data.push([tvl, timestamp]);
      accounts[user].acc.debt += num;
    }
    const activeUserCount = Object.entries(accounts).length;

    console.log("usercount", activeUserCount);
    console.log("tvl", tvl);
    response[1].data.push([activeUserCount, timestamp]);
  });

  return response;
};

module.exports = { timeSeries };
