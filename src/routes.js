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
import {
  PROGRAMS_URL, PUBLIC_PROGRAMS_URL, TOPICS_URL, NOTES_URL
} from 'src/constants'

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
      /**
       * MAIN
       */

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
       *USER
       */
      {
        exact: true,
        path: '/app/users',
        component: lazy(() => import('src/views/users/List'))
      },
      {
        exact: true,
        path: '/app/users/:userId',
        component: lazy(() => import('src/views/users/Item'))
      },
      {
        exact: true,
        path: '/app/users/:userId/edit',
        component: lazy(() => import('src/views/users/Create'))
      },
      /**
     * NOTE
     */
      {
        exact: true,
        path: `${NOTES_URL}`,
        component: lazy(() => import('src/views/notes/List'))
      },
      {
        exact: true,
        path: `${NOTES_URL}/create`,
        component: lazy(() => import('src/views/notes/Create'))
      },
      /**
       * TOPIC
       */
      {
        exact: true,
        path: `${TOPICS_URL}`,
        component: lazy(() => import('src/views/topics/List'))
      },
      {
        exact: true,
        path: `${TOPICS_URL}/create`,
        component: lazy(() => import('src/views/topics/Create'))
      },
      {
        exact: true,
        path: `${TOPICS_URL}/:topicId`,
        component: lazy(() => import('src/views/topics/Item'))
      },
      {
        exact: true,
        path: `${TOPICS_URL}/:topicId/edit`,
        component: lazy(() => import('src/views/topics/Create'))
      },

      /**
       * PROGRAM
       * Create, Edit
       */

      {
        exact: true,
        path: `${PROGRAMS_URL}/create`,
        component: lazy(() => import('src/views/programs/Create'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/edit`,
        component: lazy(() => import('src/views/programs/Create'))
      },

      /**
       * PROGRAM TOPICS
       */
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/topics/create`,
        component: lazy(() => import('src/views/topics/Create'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/topics/:topicId`,
        component: lazy(() => import('src/views/topics/Item'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/topics/:topicId/edit`,
        component: lazy(() => import('src/views/topics/Create'))
      },

      /**
       * PROGRAM TOPIC NOTE
       */
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/topics/:topicId/notes/create`,
        component: lazy(() => import('src/views/notes/Create'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/topics/:topicId/notes/:noteId`,
        component: lazy(() => import('src/views/notes/Item'))
      },
      {
        exact: true,
        path: `${PROGRAMS_URL}/:programId/topics/:topicId/notes/:noteId/edit`,
        component: lazy(() => import('src/views/notes/Create'))
      },

      {
        component: () => <Redirect to="/404" />
      },
    ]
  },
  {
    path: `${PUBLIC_PROGRAMS_URL}`,
    layout: ProgramListLayout,
    routes: [
      {
        exact: true,
        path: `${PUBLIC_PROGRAMS_URL}`,
        component: lazy(() => import('src/views/programs/List'))
      },
      {
        layout: ProgramLayout,
        routes: [
          {
            exact: true,
            path: `${PUBLIC_PROGRAMS_URL}/:programId`,
            component: lazy(() => import('src/views/programs/Item'))
          },
          {
            exact: true,
            path: `${PUBLIC_PROGRAMS_URL}/:programId/topics/:topicId`,
            component: lazy(() => import('src/views/public/topicItem'))
          },
          {
            exact: true,
            path: `${PUBLIC_PROGRAMS_URL}/:programId/topics/:topicId/notes/:noteId`,
            component: lazy(() => import('src/views/notes/Item'))
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
  // {
  //   path: '/docs',
  //   layout: DocsLayout,
  //   routes: [
  //     {
  //       exact: true,
  //       path: '/docs',
  //       component: () => <Redirect to="/docs/welcome" />
  //     },
  //     {
  //       exact: true,
  //       path: '/docs/welcome',
  //       component: lazy(() => import('src/views/docs/WelcomeView'))
  //     },
  //     {
  //       exact: true,
  //       path: '/docs/getting-started',
  //       component: lazy(() => import('src/views/docs/GettingStartedView'))
  //     },
  //     {
  //       component: () => <Redirect to="/404" />
  //     }
  //   ]
  // },
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
