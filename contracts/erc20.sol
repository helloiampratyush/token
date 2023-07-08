//SPDX-License-Identifier:MIT
pragma solidity ^0.5.7;

import "./librarysafeMath.sol";

contract ERC20 {
  function totalSupply() public view returns (uint _totalSupply);

  function balanceOf(address _owner) public view returns (uint balance);

  function transfer(address _to, uint _value) public returns (bool success);

  function transferFrom(
    address _from,
    address _to,
    uint _value
  ) public returns (bool success);

  function approve(address _spender, uint _value) public returns (bool success);

  function allowance(
    address _owner,
    address _spender
  ) public view returns (uint remaining);

  // Transfer Event triggered , when tokens are transferred
  event Transfer(address indexed _from, address indexed _to, uint _value);
  // Triggered on any successful call to approve
  event Approval(
    address indexed _owner,
    address indexed _spender,
    uint256 _value
  );
}
