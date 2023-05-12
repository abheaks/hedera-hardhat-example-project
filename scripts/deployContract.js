/*-
 *
 * Hedera Hardhat Example Project
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const { ethers } = require("hardhat");
const path = require("path");

module.exports = async () => {
  //Assign the first signer, which comes from the first privateKey from our configuration in hardhat.config.js, to a wallet variable.
  let wallet = (await ethers.getSigners())[0];

  //Initialize a contract factory object
  //name of contract as first parameter
  //wallet/signer used for signing the contract calls/transactions with this contract
  const Greeter = await ethers.getContractFactory("Greeter", wallet);
  const HelloHedera = await ethers.getContractFactory("HelloHedera", wallet);
  //Using already intilized contract facotry object with our contract, we can invoke deploy function to deploy the contract.
  //Accepts constructor parameters from our contract
  const greeter = await Greeter.deploy("initial_msg");
  const helloHedera = await HelloHedera.deploy("Hello from Hedera!");
  //We use wait to recieve the transaction (deployment) receipt, which contrains contractAddress
  // const contractAddress = (await greeter.deployTransaction.wait())
  //   .contractAddress;
  const contractAddress = (await helloHedera.deployTransaction.wait())
    .contractAddress;

  // console.log(`Greeter deployed to: ${contractAddress}`);
  console.log(`HelloHedera deployed to: ${contractAddress}`);
  saveFrontendFiles(contractAddress, "HelloHedera");
  return contractAddress;
};

function saveFrontendFiles(token, contractName) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,

    "..",
    "deployed-contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}-contract-address.json`),
    JSON.stringify({ Address: token }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync(contractName);

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(TokenArtifact, null, 2)
  );
}
