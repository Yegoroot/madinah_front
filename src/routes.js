import React, {
  Suspense,
  Fragment,
  lazy
} from 'react'
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom'
import DashboardLayout from 'src/layouts/DashboardLayout'
import ProgramLayout from 'src/layouts/ProgramLayout'
import ProgramListLayout from 'src/layouts/ProgramListLayout'
import MainLayout from 'src/layouts/MainLayout'
import HomeView from 'src/views/home/HomeView'
import LoadingScreen from 'src/components/LoadingScreen'
import AuthGuard from 'src/components/AuthGuard'
import GuestGuard from 'src/components/GuestGuard'
import UserGuard from 'src/components/UserGuard'
import ProgramGuard from 'src/components/ProgramGuard'
import { PUBLIC_PROGRAMS_URL } from 'src/constants'

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment
        const Layout = route.layout || Fragment
        const Component = route.component

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        )
      })}
    </Switch>
  </Suspense>
)

const routes = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/errors/NotFoundView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  /**
   * PRIVATE ROUTES
   */
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      /**
       * MAIN
       */

      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/programs" />
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      /**
       *USER
       */
      {
        exact: true,
        guard: UserGuard,
        path: '/app/users',
        component: lazy(() => import('src/views/users/List'))
      },
      {
        exact: true,
        guard: UserGuard,
        path: '/app/users/create',
        component: lazy(() => import('src/views/users/Create'))
      },
      {
        exact: true,
        guard: UserGuard,
        path: '/app/users/:userId',
        component: lazy(() => import('src/views/users/Item'))
      },
      {
        exact: true,
        guard: UserGuard,
        path: '/app/users/:userId/edit',
        component: lazy(() => import('src/views/users/Create'))
      },
      /**
       * List Topics
     * Create Topic
     * Edit Topic
     */
      {
        exact: true,
        guard: ProgramGuard,
        path: '/app/topics',
        component: lazy(() => import('src/views/topics/List'))
      },
      {
        exact: true,
        guard: ProgramGuard,
        path: '/app/topics/create',
        component: lazy(() => import('src/views/topics/Create'))
      },
      {
        exact: true,
        guard: ProgramGuard,
        path: '/app/topics/:topicId/edit',
        component: lazy(() => import('src/views/topics/Create'))
      },

      /**
       * My Programs
       * Create Program
       * Edit Program
       */

      {
        exact: true,
        guard: ProgramGuard,
        path: '/app/programs',
        component: lazy(() => import('src/views/programs/List'))
      },
      {
        exact: true,
        guard: ProgramGuard,
        path: '/app/programs/create',
        component: lazy(() => import('src/views/programs/Create'))
      },
      {
        exact: true,
        guard: ProgramGuard,
        path: '/app/programs/:programId/edit',
        component: lazy(() => import('src/views/programs/Create'))
      },

      {
        component: () => <Redirect to="/404" />
      },
    ]
  },
  /**
   * PUBLIC ROUTES
   *
   * Program List
   * Program Item
   * Topic Item
   */
  {
    path: `${PUBLIC_PROGRAMS_URL}`,
    layout: ProgramListLayout,
    routes: [
      {
        exact: true,
        path: `${PUBLIC_PROGRAMS_URL}`,
        component: lazy(() => import('src/views/programs/PublicList'))
      },
      {
        layout: ProgramLayout,
        routes: [
          {
            exact: true,
            path: `${PUBLIC_PROGRAMS_URL}/:programId`,
            component: lazy(() => import('src/views/programs/PublicItem'))
          },
          {
            exact: true,
            path: `${PUBLIC_PROGRAMS_URL}/:programId/topics/:topicId`,
            component: lazy(() => import('src/views/topics/PublicItem'))
          },
          {
            component: () => <Redirect to="/404" />
          }
        ]
      },

      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
]

export default routes
