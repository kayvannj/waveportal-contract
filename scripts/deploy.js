const main = async () => {
    const [deployer] = await ethers.getSigners();
    const accountBalance = await deployer.getBalance();
  
    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());
  
    const wavePortalFactory = await ethers.getContractFactory("WavePortal");
    const WavePortal = await wavePortalFactory.deploy({
      value: ethers.utils.parseEther("0.001")
    });
    await WavePortal.deployed();
  
    console.log("WavePortal address: ", WavePortal.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();