import { useNavigate, useRoutes } from 'react-router'
import { lazy } from 'react'
import { NftBuildersClient } from '@metaplex-foundation/js'
// import {About} from './components/About'

const AccountDetailFeature = lazy(() => import('@/components/account/account-feature-detail.tsx'))
const AccountIndexFeature = lazy(() => import('@/components/account/account-feature-index.tsx'))
const CrudstuffFeature = lazy(() => import('@/components/crudstuff/crudstuff-feature'))
const DashboardFeature = lazy(() => import('@/components/dashboard/dashboard-feature'))
// const Page =lazy(()=> import('@components/crudstuff/page' ))
// const Page = lazy(() => import('@/components/crudstuff/page'))
const Gallery = lazy(()=> import('./components/functions/gallery'))
// const Uploader = lazy(() => import('@/components/functions/Uploader'))
const Udog = lazy(() => import('@/components/functions/Udog'))
const NFTMinter= lazy(() => import('@/components/functions/Dash'))
// const Udog2 = lazy(() => import('@/components/functions/Udog2'))
const About = lazy(()=> import('@/components/About'))
export function AppRoutes() {
  const navigate = useNavigate()
  return useRoutes([
    { index: true, element: <DashboardFeature /> },
    
    {
      path: 'account',
      children: [
        {
          index: true,
          element: (
            <AccountIndexFeature
              redirect={(path: string) => {
                navigate(path)
                return null
              }}
            />
          ),
        },
        { path: ':address', element: <AccountDetailFeature /> },
      ],
    },
    {
      path: 'crudstuff',
      element: <CrudstuffFeature />,
    },
    {
      path: 'mint',
      element: <NFTMinter/>
    },
    {path:'gallery',
      element:<Gallery/>
    },
     {
      path: 'about',
      element: <About/>
    },
    {path: 'upload',
      element: <Udog/>
    }
  ])
}
