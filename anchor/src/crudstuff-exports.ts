// Here we export some useful types and functions for interacting with the Anchor program.
import { address } from 'gill'
import { SolanaClusterId } from '@wallet-ui/react'
import { CRUDSTUFF_PROGRAM_ADDRESS } from './client/js'
import CrudstuffIDL from '../target/idl/crudstuff.json'

// Re-export the generated IDL and type
export { CrudstuffIDL }

// This is a helper function to get the program ID for the Crudstuff program depending on the cluster.
export function getCrudstuffProgramId(cluster: SolanaClusterId) {
  switch (cluster) {
    case 'solana:devnet':
    case 'solana:testnet':
      // This is the program ID for the Crudstuff program on devnet and testnet.
      return address('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'solana:mainnet':
    default:
      return CRUDSTUFF_PROGRAM_ADDRESS
  }
}

export * from './client/js'
