import ReposWithRouter from './src/components/ReposWithRouter'
import About from './src/components/About'
import Repo from './src/components/Repo'
import App from './src/components/App'
import RequireAuth from './src/components/hoc/require_auth';

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
        component: RequireAuth(About),
        loadData: About.loadData
      }
    ]
  }
];

export default routeConfig;
