// SPDX-License-Identifier: MIT
pragma solidity ^0.4.0;

contract lottery{
    //variable for storing address of manager
     address public manager;
     //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4

    //array for storing address of participants
    address [] public participants;

    constructor () {
        manager = msg.sender;
    }

    //function to enter into lottery. In this each user paying a small amount forentering into lottery
    function enterLottery() public payable{
        //require used for validate the condition
        require(msg.value > 1 ether);
        participants.push(msg.sender);
    }

    function pickWinner() public payable{

        // check only that the manager can call the pick winner function
        require(msg.sender == manager);

        // select a random participant
        uint index = random() % participants.length;

        // transfer the contract balance to the participants
        participants[index].transfer(address(this).balance);
        // empty the address array
        participants = new address[](0);
    }

    function random() private view returns(uint256){
        return uint(keccak256(abi.encodePacked(block.difficulty, now, participants)));
    }

}
