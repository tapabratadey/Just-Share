// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves; // total number of waves
    uint256 private seed; // seed for random number generation

    // event emitted when a new wave is created
    event NewWave(address indexed from, uint256 timestamp, string message);

    // This is an address => uint256 mapping, meaning an address can be associated with a number
    // In this case, the address w/ the last time the user waved at us.
    mapping(address => uint256) lastWavedAt;

    // Wave Struct, used to store information about a wave
    struct Wave {
        address waver; // address of the the user who waved.
        string message; // the message the user sent
        uint256 timestamp; // the timestamp when the wave was created
    }

    Wave[] waves; // array of waves

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
    }

    // function to increase the total number of waves
    function wave(string memory _message) public {
        // We need to make sure the current timestamp is at least
        // 15-minute bigger than the last timestamp we stored.
        require(
            lastWavedAt[msg.sender] + 30 seconds <= block.timestamp,
            "You can only wave once every 30 seconds"
        );

        // Update the current timestamp we have for the user.
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved w/ message %s", msg.sender, _message);

        // function to create a new wave
        waves.push(Wave(msg.sender, _message, block.timestamp));

        // Generate a random number
        uint256 randomNumber = (block.difficulty + block.timestamp + seed) %
            100;
        console.log("Random number: %d", randomNumber);

        seed = randomNumber;

        if (randomNumber < 50) {
            console.log("%s has won the wave", msg.sender);

            uint256 prizeAmount = 0.000001 ether;

            require(
                prizeAmount <= address(this).balance,
                "Not enough ether to pay for prize"
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract");
        }

        // emit the new wave event
        emit NewWave(msg.sender, block.timestamp, _message);
    }

    // return the total number of waves
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    // function to get the total number of waves
    function getTotalWaves() public view returns (uint256) {
        console.log("We have waved %d times", totalWaves);
        return totalWaves;
    }
}
