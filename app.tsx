import { AppProviders } from '@/components/app-providers.tsx'
import { AppLayout } from '@/components/app-layout.tsx'
import { AppRoutes } from '@/app-routes.tsx'

const links: { label: string; path: string }[] = [
  //
  { label: 'Home', path: '/' },
  { label: 'Account', path: '/account' },
  { label: 'Program', path: '/crudstuff' },
    {label: 'Mint NFT', path :'/mint'},
    {label: 'upload', path: '/upload'},

  {label: 'Gallery', path :'/gallery'},
  {label :'About', path: '/about'}
]

export function App() {
  return (
    <AppProviders>
      <AppLayout links={links}>
        <AppRoutes />
      </AppLayout>
    </AppProviders>
  )
}
