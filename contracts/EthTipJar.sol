pragma solidity ^0.4.18;

contract EthTipJar {
    address public myAddress = this;
    address public owner;
    address constant public web3devs = 0xe8bF424E047372d249d0826c5567655ba3B72f18;

    function EthTipJar() public payable {
        owner = msg.sender;
    }

    function () payable public {
        uint amount = msg.value;
        uint royalty = amount / 200;
        web3devs.transfer(royalty);
        owner.transfer(this.balance);
    }

    function tip () payable public returns (bool){
        uint amount = msg.value;
        uint royalty = amount / 200;
        web3devs.transfer(royalty);
        owner.transfer(this.balance);
        return true;
    }
}
