import { WalletButton } from '../solana/solana-provider'
import { CrudstuffCreate, CrudstuffProgram, CrudstuffProgramExplorerLink } from './crudstuff-ui'
import { AppHero } from '../app-hero'
import { useWalletUi } from '@wallet-ui/react'

export default function CrudstuffFeature() {
  const { account } = useWalletUi()

  if (!account) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="hero py-[64px]">
          <div className="hero-content text-center">
            <WalletButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AppHero title="Crudstuff" subtitle={'Run the program by clicking the "Run program" button.'}>
        <p className="mb-6">
          <CrudstuffProgramExplorerLink />
        </p>
        <CrudstuffCreate />
      </AppHero>
      <CrudstuffProgram />
    </div>
  )
}
