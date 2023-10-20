const hre = require("hardhat");

async function main() {
  const token = await ethers.getContractFactory("ShareToken"); //instances contract

  const hardhatTokent = await token.deploy();

  const ContractAdd = await hardhatTokent.getAddress();

  console.log("Deployed at address: " + ContractAdd);
}

main()
  .then(() => {
    console.log("Deployed Successfully");
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

/*
Deployed at address: 0xE34136F2AC245E4De687a1FeAbc1D62460d0B811
Deployed Successfully
*/
