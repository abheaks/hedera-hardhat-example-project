const { ethers } = require("hardhat");
const data = require("../deployed-contracts/HelloHedera-contract-address.json");

module.exports = async () => {
  const wallet = (await ethers.getSigners())[0];
  const helloHedera = await ethers.getContractAt(
    "HelloHedera",
    data.Address,
    wallet
  );
  console.log(" data.Address,", data.Address);
  console.log(`Before update call result: ${await helloHedera.get_message()}`);
  //using the greeter object(which is our contract) we can call functions from the contract. In this case we call setGreeting with our new msg
  //   const updateTx = await helloHedera.set_message("Upadated Message");

  const update = await helloHedera.get_message();

  console.log(`Updated call result: ${update}`);
};
