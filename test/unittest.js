const { ethers, network, getNamedAccounts, deployments } = require("hardhat");
const { expect, assert } = require("chai");

let deployer, f4;
describe("cryptocurreency", function () {
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    f4 = await ethers.getContract("cryptoCurrency", deployer);
  });
  describe("constructor", function () {
    it("it should say that deployer is owner", async function () {
      const _owner = await f4.getOwner();
      assert.equal(_owner, deployer);
    });
    it("it should have max total supply in initiation", async function () {
      const expectedsupply = "18000000000000";
      const _totalsupply = await f4.balanceOf(deployer);
      assert.equal(expectedsupply, _totalsupply.toString());
    });
  });
  describe("transfer", function () {
    it("emit events when calling transfer", async function () {
      const accounts = await ethers.getSigners();
      //const accountConnect = await f4.connect(accounts[0]);
      await expect(f4.transfer(accounts[1].address, 1000000000000)).to.emit(
        f4,
        "Transfer"
      );
    });
    it("send money to signer and they got some token and deployer token get deceased by that amount", async function () {
      const accounts = await ethers.getSigners();
      // const connecttocontract = await f4.connect(accounts[0]);
      const response = await f4.transfer(accounts[1].address, "1000000000000");
      await response.wait(1);
      //console.log(response);
      //accounts[0] .address is same as owner address
      const owner = await f4.getOwner();
      const response1 = await f4.balanceOf(accounts[1].address);
      const response2 = await f4.balanceOf(owner);
      assert.equal(response2.toString(), "17000000000000");
      assert.equal(response1.toString(), "1000000000000");
    });
  });
  describe("transferFrom", function () {
    let accounts;
    beforeEach(async function () {
      accounts = await ethers.getSigners();
      const response3 = await f4.approve(accounts[1].address, "4000000000000");
      //const connecttocontract = await f4.connect(accounts[1]);
      const response = await f4.transfer(accounts[1].address, "2000000000000");
      await response.wait(1);
    });
    it("it will equate and confirm allowance and spending and tracking of accounts", async function () {
      const response1 = await f4.transferFrom(
        accounts[1].address,
        accounts[2].address,
        "1000000000000"
      );
      const owner = await f4.getOwner();
      const expectedResponse = await f4.allowance(owner, accounts[1].address);
      const expectedResponse1 = await f4.balanceOf(accounts[1].address);
      const expectedResponse2 = await f4.balanceOf(accounts[2].address);
      assert.equal(expectedResponse1.toString(), "1000000000000");
      assert.equal(expectedResponse2.toString(), "1000000000000");
      assert.equal(expectedResponse.toString(), "3000000000000");
    });
    it("it will emit event when we call transferFrom", async function () {
      await expect(
        f4.transferFrom(
          accounts[1].address,
          accounts[2].address,
          "1000000000000"
        )
      ).to.emit(f4, "Transfer");
    });
  });
  describe("Approve", function () {
    it("trigger approval event when approve is going on", async function () {
      const accounts = await ethers.getSigners();
      const owner = await f4.getOwner();
      await expect(f4.approve(owner, accounts[1].address)).to.emit(
        f4,
        "Approval"
      );
    });
  });
});
