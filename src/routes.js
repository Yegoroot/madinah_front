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
import DocsLayout from 'src/layouts/DocsLayout'
import MainLayout from 'src/layouts/MainLayout'
import HomeView from 'src/views/home/HomeView'
import LoadingScreen from 'src/components/LoadingScreen'
import AuthGuard from 'src/components/AuthGuard'
import GuestGuard from 'src/components/GuestGuard'
import { PROGRAMS_URL } from 'src/constants'

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
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to={`${PROGRAMS_URL}`} />
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/account/AccountView'))
      },
      /**
       * users
       */
      {
        exact: true,
        path: '/app/management/users',
        component: lazy(() => import('src/views/users/UserListView'))
      },
      {
        exact: true,
        path: '/app/management/users/:id',
        component: lazy(() => import('src/views/users/UserDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/users/:id/edit',
        component: lazy(() => import('src/views/users/UserEditView'))
      },
      /**
       * programs
       */
      {
        exact: true,
        path: `${PROGRAMS_URL}`,
        component: lazy(() => import('src/views/programs/ProgramBrowseView'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/create`,
        component: lazy(() => import('src/views/programs/ProgramCreateView'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:id`,
        component: lazy(() => import('src/views/programs/OverviewView'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:id/edit`,
        component: lazy(() => import('src/views/programs/ProgramCreateView'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:id/topics/:topicId`,
        component: lazy(() => import('src/views/topics/TopicDetailsView'))
      },

      /**
       * topics
       */
      {
        exact: true,
        path: '/app/management/topics',
        component: lazy(() => import('src/views/topics/TopicListView'))
      },
      {
        exact: true,
        path: '/app/management/topics/create',
        component: lazy(() => import('src/views/topics/TopicCreateView'))
      },
      {
        exact: true,
        path: '/app/management/topics/:topicId',
        component: lazy(() => import('src/views/topics/TopicDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/topics/:topicId/edit',
        component: lazy(() => import('src/views/topics/TopicCreateView'))
      },
      /**
       * notes
       */
      {
        exact: true,
        path: '/app/management/notes',
        component: lazy(() => import('src/views/notes/NoteListView'))
      },
      {
        exact: true,
        path: '/app/management/notes/create',
        component: lazy(() => import('src/views/notes/NoteCreateView'))
      },
      {
        exact: true,
        path: '/app/management/notes/:id',
        component: lazy(() => import('src/views/notes/NoteDetailsView'))
      },
      {
        exact: true,
        path: '/app/management/notes/:id/edit',
        component: lazy(() => import('src/views/notes/NoteCreateView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '/docs',
    layout: DocsLayout,
    routes: [
      {
        exact: true,
        path: '/docs',
        component: () => <Redirect to="/docs/welcome" />
      },
      {
        exact: true,
        path: '/docs/welcome',
        component: lazy(() => import('src/views/docs/WelcomeView'))
      },
      {
        exact: true,
        path: '/docs/getting-started',
        component: lazy(() => import('src/views/docs/GettingStartedView'))
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
