import Web3 from 'web3';
let web3 = window.web3;

let fs = require('fs');

// stolen code zone vvv

if (typeof web3 !== 'undefined') {
  // Use Mist/MetaMask's provider
  web3 = new Web3(window.web3.currentProvider);
  console.log("first case");
} else {
  console.log('No web3? You should consider trying MetaMask!')
  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
}

let ETJAbi = require('../../abis/EthTipJarAbi.js');
let ETJByteCode = "0x6060604052306000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506103e5806100946000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806326b85ee1146101485780632755cd2d1461019d57806364552200146101bf5780638da5cb5b14610214575b60008034915060c88281151561007457fe5b04905073b5b4c4f6a656e6a9c1fc301b206b99af9521524573ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156100cb57600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050151561014457600080fd5b5050005b341561015357600080fd5b61015b610269565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101a561028e565b604051808215151515815260200191505060405180910390f35b34156101ca57600080fd5b6101d261037b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561021f57600080fd5b610227610393565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600034915060c8828115156102a257fe5b04905073b5b4c4f6a656e6a9c1fc301b206b99af9521524573ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015156102f957600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050151561037257600080fd5b60019250505090565b73b5b4c4f6a656e6a9c1fc301b206b99af9521524581565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16815600a165627a7a72305820072eacce81e045a8fa3cd6c097dbec39023902110785c32de1ef76e4fd71258b0029";


function deployContract() {
  // alert("deployContract fired");

  // Attempt to deploy through metamask
  var contract = web3.eth.contract(ETJAbi);
  contract.new(
   {
     from: web3.eth.accounts[0],
     data: ETJByteCode,
     gas: '4700000'
   }, function (e, contract){
      console.log(e, contract);
      if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
         console.log(fs);
         fs.writeFileSync('contractAddress.js','const ETJAddress = '+contract.address+';module.exports = ETJAddress;','utf8', function(err,res){
           if (err){
             console.log(err);
           } else {
             console.log(res);
           }
         });
       }
     }
  );
}

module.exports = deployContract
