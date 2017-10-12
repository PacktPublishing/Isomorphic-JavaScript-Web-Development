import ReposWithRouter from './modules/ReposWithRouter'
import About from './modules/About'
import Repo from './modules/Repo'
import App from './modules/App'

const routeConfig = [
  {
    path: '/',
    component: App,
    loadData: App.loadData,
    routes: [
      {
        path: '/repos',
        component: ReposWithRouter,
        loadData: About.loadData,
        routes: [
          {
            path: '/repos/:userName/:repoName',
            component: Repo,
            loadData: About.loadData
          }
        ]
      },
      {
        path: '/about',
        component: About,
        loadData: About.loadData
      }
    ]
  }
];

export default routeConfig;
