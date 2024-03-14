import { ethers, network } from 'hardhat'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { solidity } from 'ethereum-waffle'

import { LightLink, LightLink__factory } from '../typechain-types'

import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import moment from 'moment'

chai.use(solidity)
chai.use(chaiAsPromised)
const { expect } = chai

const permitType = {
  Permit: [
    {
      name: 'owner',
      type: 'address',
    },
    {
      name: 'spender',
      type: 'address',
    },
    {
      name: 'value',
      type: 'uint256',
    },
    {
      name: 'nonce',
      type: 'uint256',
    },
    {
      name: 'deadline',
      type: 'uint256',
    },
  ],
}

describe('Lightlink Token', () => {
  let accounts: SignerWithAddress[]
  let owner: SignerWithAddress, bob: SignerWithAddress, alice: SignerWithAddress, john: SignerWithAddress
  let contract: LightLink

  beforeEach(async () => {
    accounts = await ethers.getSigners()
    owner = accounts[0]
    bob = accounts[1]
    alice = accounts[2]

    console.log('owner:', owner.address)

    const factory = (await ethers.getContractFactory('LightLink', owner)) as LightLink__factory
    contract = await factory.deploy()
    await contract.deployed()

    await network.provider.request({ method: 'evm_mine', params: [] })
  })

  // context('Test case for constructor', () => {
  //   it('constructor should be success', async () => {
  //     const balance = await contract.balanceOf(owner.address)

  //     expect(balance).equal(ethers.BigNumber.from('1000000000').mul(ethers.BigNumber.from('10').pow(18)))

  //     const totalPast = await contract.getPastTotalSupply(1)

  //     expect(totalPast).equal(ethers.BigNumber.from('1000000000').mul(ethers.BigNumber.from('10').pow(18)))
  //   })
  // })

  // // test erc20 permit
  // context('Test case for permit', () => {
  //   it('permit should be success', async () => {
  //     const nonce = await contract.nonces(owner.address)

  //     const deadline = moment.utc().add(1, 'days').unix()

  //     const domain = {
  //       name: await contract.name(),
  //       version: '1',
  //       chainId: 1337,
  //       verifyingContract: contract.address,
  //     }

  //     const message = {
  //       owner: owner.address,
  //       spender: bob.address,
  //       value: 100,
  //       nonce: nonce,
  //       deadline: deadline,
  //     }

  //     const signature = await owner._signTypedData(domain, permitType, message)

  //     const decodedSignature = ethers.utils.splitSignature(signature)

  //     const recovered = ethers.utils.verifyTypedData(domain, permitType, message, decodedSignature)

  //     expect(recovered).equal(owner.address)

  //     await contract.connect(alice).permit(owner.address, bob.address, 100, deadline, decodedSignature.v, decodedSignature.r, decodedSignature.s)

  //     const allowance = await contract.allowance(owner.address, bob.address)

  //     expect(allowance).equal(100)
  //   })
  // })
})
