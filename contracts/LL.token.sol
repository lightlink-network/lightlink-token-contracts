// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit, Nonces } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import { ERC20Votes } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

// LightLink 2024

/// @title LightLink ERC20 Token
/// @notice LightLink is an ERC20 token with voting capabilities and permit functionality.
/// @dev This contract inherits from ERC20Votes and ERC20Permit from OpenZeppelin, providing functionalities for token voting and gasless transactions.
contract LightLink is ERC20Votes, ERC20Permit {
  /// @notice Initializes the contract with the name and symbol for the ERC20 token and mints initial supply.
  /// @dev Mints 1 billion tokens to a specific address.
  constructor() ERC20("LightLink", "LL") ERC20Permit("LightLink") {
    _mint(0xdE2552948aacb82dCa7a04AffbcB1B8e3C97D590, 1000000000 * (10 ** decimals()));
  }

  /// @notice Gets the current nonce for the owner's account.
  /// @dev Overrides the nonces function from ERC20Permit to return the current nonce.
  /// @param owner The address of the account.
  /// @return The current nonce for the owner's account.
  function nonces(address owner) public view virtual override(ERC20Permit, Nonces) returns (uint256) {
    return super.nonces(owner);
  }

  /// @notice Updates vote delegation whenever tokens are transferred.
  /// @dev Overrides the _update function from ERC20Votes to update vote delegation.
  /// @param from The address tokens are transferred from.
  /// @param to The address tokens are transferred to.
  /// @param value The amount of tokens transferred.
  function _update(address from, address to, uint256 value) internal virtual override(ERC20, ERC20Votes) {
    ERC20Votes._update(from, to, value);
  }
}
