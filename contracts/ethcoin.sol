//SPDX-License-Identifier:MIT
pragma solidity ^0.5.7;

import "./librarysafeMath.sol";
import "./erc20.sol";

contract cryptoCurrency is ERC20 {
  using safeMath for uint;
  address payable public owner;
  mapping(address => uint) _balanceOf;
  mapping(address => mapping(address => uint)) allowd;
  string public name = "disgust";
  string public symbol = "DGT";
  uint public decimals = 10;
  uint public _totalSupply = 18000000000000;

  constructor() public {
    owner = msg.sender;
    _balanceOf[owner] = _totalSupply;
  }

  modifier onlyOwner() {
    if (msg.sender != owner) {
      revert();
    }
    _;
  }

  function getOwner() public view returns (address) {
    return owner;
  }

  function totalSupply() public view returns (uint totalSupply1) {
    return _totalSupply.sub(_balanceOf[address(0)]);
  }

  function balanceOf(address _owner) public view returns (uint balance) {
    return _balanceOf[_owner];
  }

  function transfer(address _to, uint _value) public returns (bool success) {
    _balanceOf[_to] = _balanceOf[_to].add(_value);
    _balanceOf[msg.sender] = _balanceOf[msg.sender].sub(_value);
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function transferFrom(
    address _from,
    address _to,
    uint _value
  ) public returns (bool success) {
    _balanceOf[_from] = _balanceOf[_from].sub(_value);
    _balanceOf[_to] = _balanceOf[_to].add(_value);
    allowd[msg.sender][_from] = allowd[owner][_from].sub(_value);
    emit Transfer(_from, _to, _value);
    return true;
  }

  function approve(
    address _spender,
    uint _value
  ) public onlyOwner returns (bool success) {
    allowd[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function allowance(
    address _owner,
    address _spender
  ) public view returns (uint remaining) {
    return allowd[_owner][_spender];
  }

  function extraPay() external payable {
    revert();
  }

  function specialOwner(
    address tokenAddress,
    uint _value
  ) public onlyOwner returns (bool success) {
    return ERC20(tokenAddress).transfer(owner, _value);
  }
}
