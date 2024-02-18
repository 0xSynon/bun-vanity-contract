declare var self: Worker;

import crypto from 'crypto';
import { getContractAddress } from '@ethersproject/address';
import { Wallet } from 'ethers';

while (true) {
  const pk = crypto.randomBytes(32).toString('hex');
  const wallet = new Wallet(pk);
  const contractAddress = getContractAddress({
    from: wallet.address,
    nonce: 0
  });
  const score = contractAddress.match(/.{2}/g).filter(b => b === '00').length;
  if (score > 0) {
    postMessage({
      score,
      pk,
      deployer: wallet.address,
      contract: contractAddress
    });
  }
}
