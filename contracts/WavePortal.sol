// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal{
    uint256 totalWaves;
    uint rewardAmountPerWave;
    address owner;
    /*
     * A little magic, Google what events are in Solidity!
     */
    event NewWave(address indexed from, uint256 timestamp, string message);

    /*
     * I created a struct here named Wave.
     * A struct is basically a custom datatype where we can customize what we want to hold inside it.
     */
    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    /*
     * I declare a variable waves that lets me store an array of structs.
     * This is what lets me hold all the waves anyone ever sends to me!
     */
    Wave[] waves;

    constructor() payable {
        // console.log("--WavePortal Contract by Kayvan--");
        owner = msg.sender;
    }

    function setRewardAmountPerWave(uint amount) public {
        if(msg.sender == owner){
            console.log("reward amount used to be: ", rewardAmountPerWave," wei");
            rewardAmountPerWave = amount;
            console.log("Updated the reward amount to: ", amount," wei");
        }else{
            console.log("You are not the owner", amount);
        }
    }

    function wave(string memory _message) public {
        totalWaves += 1;
        // console.log("%s waved w/ message %s", msg.sender, _message);

        /*
         * This is where I actually store the wave data in the array.
         */
        waves.push(Wave(msg.sender, _message, block.timestamp));

        /*
         * I added some fanciness here, Google it and try to figure out what it is!
         * Let me know what you learn in #general-chill-chat
         */
        emit NewWave(msg.sender, block.timestamp, _message);

        uint256 prizeAmount = rewardAmountPerWave;
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from contract.");
    }

    /*
     * I added a function getAllWaves which will return the struct array, waves, to us.
     * This will make it easy to retrieve the waves from our website!
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        // console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}

