require("dotenv").config();
const { BorrowPool, CreateTXBorrowPool } = require("./addresses");
const { ethers } = require("ethers");
const BorrowPoolABI = require("../abis/BorrowPool.json");

const contractDeployBlock = async (provider) => {
  const borrowPoolStartBlock = (
    await provider.getTransaction(CreateTXBorrowPool)
  ).blockNumber;

  const blockTimeStamp = (await provider.getBlock(borrowPoolStartBlock))
    .timestamp;

  const borrowPoolInfo = {
    startBlock: borrowPoolStartBlock,
    timestamp: blockTimeStamp,
  };

  const currentBlock = await provider.getBlockNumber();

  return [borrowPoolInfo, currentBlock];
};

const queryEvents = async (provider, fromLast) => {
  const [borrowPoolDeployData, currentBlock] = await contractDeployBlock(
    provider
  );
  const borrowPool = new ethers.Contract(BorrowPool, BorrowPoolABI, provider);

  const evtDeposits = await borrowPool.filters.Deposit();

  const evtWithrawals = await borrowPool.filters.Withdraw();

  const sb = fromLast ? fromLast : borrowPoolDeployData.startBlock;

  const bpDepositEvents = await borrowPool.queryFilter(evtDeposits, sb);

  const bpWithrdawEvents = await borrowPool.queryFilter(evtWithrawals, sb);

  return [...bpDepositEvents, ...bpWithrdawEvents].sort(
    (a, b) => a.blockNumber - b.blockNumber
  );
};

module.exports = {
  queryEvents,
  contractDeployBlock,
};
