import { config } from 'dotenv'

import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import { existsSync, readFileSync, writeFileSync } from 'fs'

config()

let accounts: any[] = []

// check if accounts.json exists
if (existsSync('./test-accounts.json')) {
  accounts = require('./test-accounts.json')
}

const initAccounts = (ethers: any) => {
  const total = 50
  const _accounts = [...accounts]
  for (let i = _accounts.length; i < total; i++) {
    const wallet = ethers.Wallet.createRandom()
    accounts.push({
      privateKey: wallet.privateKey,
      balance: ethers.utils.parseEther('10').toString(),
    })
  }

  writeFileSync('./test-accounts.json', JSON.stringify(accounts, null, 2))

  accounts = JSON.parse(readFileSync('./test-accounts.json').toString())

  console.log('Accounts created, ready to rock 🚀')
}

task('accounts', 'Prints the list of accounts', async (_: any, payload: any) => {
  const signers = await payload.ethers.getSigners()
  const addresses = []
  for (const signer of signers) {
    addresses.push(await signer.getAddress())
  }
  console.log(addresses)
})

task('up', 'Init project', async (_: any, payload: any) => {
  initAccounts(payload.ethers)
})

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
        },
      },
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
        },
      },
      {
        version: '0.8.15',
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
        },
      },
      {
        version: '0.8.13',
        settings: {
          optimizer: {
            enabled: true,
            runs: 9999,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
      initialBaseFeePerGas: 0,
      gasPrice: 1,
      blockGasLimit: 999999999999999,
      accounts: accounts ?? []
    },
    sepolia: {
      url: process.env.SEPOLIA_PROVIDER_URL,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.MAINNET_PROVIDER_URL,
      accounts: [process.env.MAINNET_PRIVATE_KEY],
    },
    // pegasus: {
    //   url: process.env.PEGASUS_PROVIDER_URL,
    //   accounts: [process.env.PEGASUS_PRIVATE_KEY],
    // },
    // phoenix: {
    //   url: process.env.PHOENIX_PROVIDER_URL,
    //   accounts: [process.env.PHOENIX_PRIVATE_KEY],
    // },
  },
  mocha: {
    timeout: 200000,
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      pegasus: process.env.LIGHTLINK_API_KEY,
      phoenix: process.env.LIGHTLINK_API_KEY,
      mainnet: process.env.ETHEREUM_API_KEY,
      sepolia: process.env.ETHEREUM_API_KEY,
      polygonMumbai: process.env.POLY_SCAN_API_KEY,
      bsc: process.env.BSC_SCAN_API_KEY,
      bscTestnet: process.env.BSC_SCAN_API_KEY,
    },
    customChains: [
      {
        network: 'pegasus',
        chainId: 1891,
        urls: {
          apiURL: 'https://pegasus.lightlink.io/api',
          browserURL: 'https://pegasus.lightlink.io',
        },
      },
      {
        network: 'phoenix',
        chainId: 1890,
        urls: {
          apiURL: 'https://phoenix.lightlink.io/api',
          browserURL: 'https://phoenix.lightlink.io',
        },
      },
      {
        network: 'devnet',
        chainId: 88,
        urls: {
          apiURL: 'https://devnet.lightlink.io/api',
          browserURL: 'https://devnet.lightlink.io',
        },
      },
    ],
  },
}

