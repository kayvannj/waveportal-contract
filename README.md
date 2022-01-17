* contracts contain .sol files
* scripts would be js scripts
* hre is a global object that hardhat is initiating for us
* use the given run.js to compile and deploy and run the contract to local block chain
```npx hardhat run scripts/run.js```

to deploy to the localhost use the following command
```npx hardhat run scripts/deploy.js --network localhost```

--
use alchemyapi.io for deployment of the contract
use rinkeby for testnet
update the hardhat config to link with the wallet and alchemyapi

to deploy 
```npx hardhat run scripts/deploy.js --network rinkeby```

```
➜  my-wave-portal npx hardhat run scripts/deploy.js --network rinkeby
Compiling 1 file with 0.8.4
Compilation finished successfully
Deploying contracts with account:  0x29Ad7b4c347216dBC07f9B7Cff1Bcb08167B8474
Account balance:  3000000000000000000
WavePortal address:  0x93FD63D72B225C74eB26b1bf9c5383097EE06E17
```

use the ABI object in the compiled json format of the contract and the contract address to get it connected using 
```const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);```
and then you can call your apis on the contract

updated contract address: ```0xE9E141f8fbA03693A63D75e1114B67b02B9f4840```


```➜  my-wave-portal npx hardhat run scripts/deploy.js --network rinkeby
Deploying contracts with account:  0x29Ad7b4c347216dBC07f9B7Cff1Bcb08167B8474
Account balance:  2997072630179254244
WavePortal address:  0xB638c44b186EDe4DB362E81d59Cc61d7a76Bf3c4```

# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
