/*
 * Learning Isomorphic Web Application Development
 * Copyright © 2016 Konstantin Tarkus, Packt Publishing
 */

const routes = [
  require('../routes/Home').default,
  require('../routes/NotFound').default
];

const router = {
  match(location) {
    const route = routes.find(x => x.path === location.path);

    if (route) {
      try {
        return route.action();
      } catch (err) {
        return routes.find(x => x.path === '/500').action();
      }
    } else {
      return routes.find(x => x.path === '/404').action();
    }
  }
};

export default router;
