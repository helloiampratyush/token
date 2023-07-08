//SPDX-License-Identifier:MIT
pragma solidity ^0.5.7;

library safeMath {
  function add(uint a, uint b) internal pure returns (uint) {
    uint c = a + b;
    require(c > a);
    return c;
  }

  function sub(uint a, uint b) internal pure returns (uint) {
    require(b <= a);
    uint c = a - b;
    return c;
  }

  function mul(uint a, uint b) internal pure returns (uint) {
    if (a == 0) {
      return 0;
    }
    uint c = a * b;
    require(c / a == b);
    return c;
  }

  function div(uint a, uint b) internal pure returns (uint) {
    require(b > 0);
    uint c = a / b;
    return c;
  }
}
