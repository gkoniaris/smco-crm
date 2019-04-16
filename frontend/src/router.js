import Vue from 'vue'
import Router from 'vue-router'
import AuthService from './services/AuthService.js'
import LoginSignup from './components/LoginSignup'
import Dashboard from './components/Dashboard'
import ClientsIndex from './components/Clients/Index'
import ClientsCreate from './components/Clients/Create'
import ClientsView from './components/Clients/View'
import ClientsViewProfile from './components/Clients/Profile'
import ClientsViewDevices from './components/Clients/Devices'
import ClientsViewQuestions from './components/Clients/Questions'
import QuestionsIndex from './components/Questions/Index'
import QuestionsCreate from './components/Questions/Create'
import QuestionView from './components/Questions/View'
import DevicesIndex from './components/Devices/Index'
import DevicesCreate from './components/Devices/Create'
import DeviceView from './components/Devices/View'
import VisitsIndex from './components/Visits/Index'
import VisitsCreate from './components/Visits/Create'
import VisitView from './components/Visits/View'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginSignup,
      meta: { 
        access: 'non_authenticated'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsIndex,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/client/:id',
      name: 'client',
      component: ClientsView,
      meta: { 
        access: 'authenticated'
      },
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'clientProfile',
          path: 'profile',
          component: ClientsViewProfile
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'clientDevices',
          path: 'devices',
          component: ClientsViewDevices
        },
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          name: 'clientQuestions',
          path: 'questions',
          component: ClientsViewQuestions
        }
      ]
    },
    {
      path: '/clients/create',
      name: 'createClients',
      component: ClientsCreate,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/questions',
      name: 'questions',
      component: QuestionsIndex,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionView,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/questions/create',
      name: 'createQuestions',
      component: QuestionsCreate,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/devices',
      name: 'devices',
      component: DevicesIndex,
      meta: { 
        access: 'authenticated'
      },
    },
    {
      path: '/devices/create',
      name: 'createDevices',
      component: DevicesCreate,
      meta: { 
        access: 'authenticated'
      },
    },
    {
        path: '/device/:id',
        name: 'device',
        component: DeviceView,
        meta: { 
          access: 'authenticated'
        }
    },
    {
      path: '/visits',
      name: 'Visits',
      component: VisitsIndex,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/visits/create',
      name: 'createVisits',
      component: VisitsCreate,
      meta: { 
        access: 'authenticated'
      }
    },
    {
      path: '/visit/:id',
      name: 'visit',
      component: VisitView,
      meta: { 
        access: 'authenticated'
      }
  },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.access === 'authenticated' && !AuthService.isAuthenticated()) {
    return next('/login')
  }

  if (to.meta.access === 'non_authenticated' && AuthService.isAuthenticated()) {
    return next('/dashboard')
  }

  if (to.path === '/' && !AuthService.isAuthenticated()) {
    return next('/login')
  } else if (to.path === '/' && AuthService.isAuthenticated()) {
    return next('/dashboard')
  }
  
  return next()
})

export default router