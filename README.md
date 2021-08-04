# JellyFi Kovan Analytics Generator

This application utilizes Node.js and ethers.js to pull event data from the Ethereum block chain to form time series data on JellFi Kovan contract deployments. Time series data is produced for app TVL and Unique Address from contract deploy block to now.

## Flow

The following is a pseudo flow of the app

1. add infura project id like `PROJECT_ID=your id` to `.env` and place the file in `./collection`

2. run `node index.js`

3. time series data for **TVL** and **Unique Adresses** from the `borrow-pool.sol` deployed on Kovan at `0x22f02241A4BC37361a45a67DC57703C4dff4dBc8` will be returned in `./collection/index.js` and from `timeSeries()`. This data is from the deploy block of `0x22f02241A4BC37361a45a67DC57703C4dff4dBc8` to now.

## Additional

The shape of time series data returned is:

```
[
    { target: "TVL", data:[ [value:Number, timestamp:UNIX Timestamp] ]}

    { target: "Unique Addresses", data:[ [count:Number, timestamp:UNIX Timestamp] ]}
]
```
