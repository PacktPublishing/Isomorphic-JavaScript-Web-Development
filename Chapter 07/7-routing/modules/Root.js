import React from 'react'
import routes from '../routesConfig'
import RouteWithSubRoutes from './RouteWithSubRoutes'

export default class Root extends React.Component {
  
  render() {
    return (
      <div>
        {
          routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} initialData={this.props.initialData} />
          ))
        }
      </div>
    )
  }
};
