const { expect } = require("chai");


describe("WavePortal contract", function () {
    let wavePortalFactory;
    let owner;
    let address1;
    let address2;
    let wavePortal;

    this.beforeEach(async function(){
        wavePortalFactory = await ethers.getContractFactory("WavePortal");    
        [owner, address1, address2] = await ethers.getSigners();
        wavePortal = await wavePortalFactory.deploy({
            value:ethers.utils.parseEther("100"), // need to fund all the tests
        })
    })

    describe("At Deployment", async function(){
        
        it("the wave list should be empty", async function () {
            const allWaves = await wavePortal.getAllWaves();
            expect(allWaves.length).to.equal(0);
        });

        it("the wave count should be zero", async function () {
            const waveCount = await wavePortal.getTotalWaves();
            expect(waveCount).to.equal(0);
        });
        
    })

    describe("Waving", async function(){
        it("a wave should increase the count",async function(){
            wavePortal.connect(address1).wave("hello");
            expect(await wavePortal.getTotalWaves()).to.equal(1);
        })
        it("a wave should be stored in waves array",async function(){
            wavePortal.connect(address1).wave("hello1");
            wavePortal.connect(address2).wave("hello2");
            let waves =  await wavePortal.getAllWaves();
            expect(waves.length).to.equal(2);
        })
        it("a wave should have a messsage",async function(){
            let message = "helloWorld";
            wavePortal.connect(address1).wave(message);
            let waves =  await wavePortal.getAllWaves();
            expect(waves[0].message).to.equal(message);
        })
        it("subtract the specified amount of ether from the fund", async function(){
            let localWavePortal = await wavePortalFactory.deploy({
                value: ethers.utils.parseEther("0.0001"),
            })
            
            let amount = ethers.utils.parseEther("0.0001")
            console.log("amount to be set to:",amount)
            await localWavePortal.setRewardAmountPerWave(amount)

            let txn = await localWavePortal.connect(address1).wave("hello");
            let contractFundBalance = await ethers.provider.getBalance(localWavePortal.address);
            expect(ethers.utils.formatEther(contractFundBalance)).to.equal('0.0');
        })
        // it("sends specified amount of ether to the waver", async function(){
        //     let localWavePortal = await wavePortalFactory.deploy({
        //         value: ethers.utils.parseEther("0.0001"),
        //     })
        //     let beforeBalanceOfAddress1 = await ethers.provider.getBalance(address1.address);
        //     let txn = await localWavePortal.connect(address1).wave("hello");
        //     let afterBalanceOfAddress1 = await ethers.provider.getBalance(address1.address);
        //     console.log("before:",ethers.utils.formatEther(beforeBalanceOfAddress1));
        //     console.log("after:",ethers.utils.formatEther(afterBalanceOfAddress1));
        //     expect(ethers.utils.formatEther(afterBalanceOfAddress1)).to.equal('0.0');
        // })
        it("owner should be able to change the reward amount", async function(){
            let localWavePortal = await wavePortalFactory.deploy({
                value: ethers.utils.parseEther("100"),
            })
            let amount = ethers.utils.parseEther("1")
            console.log("amount to be set to:",amount)
            await localWavePortal.setRewardAmountPerWave(amount)

            let txn = await localWavePortal.connect(address1).wave("hello");
            let balance = await ethers.provider.getBalance(localWavePortal.address);
            expect(ethers.utils.formatEther(balance)).to.equal('99.0')
            
        })
    })

  
});
