import React from 'react'
import {Link} from 'react-router-dom'
import RouteWithSubRoutes from './RouteWithSubRoutes'

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
        msg: "Loading..."
    };
  }
  
  static loadData() {
    return Promise.resolve({
      data: 'Hello App'
    });
  }
  
  componentDidMount() {
    if(!this.props.initialData){
      this.constructor.loadData().then((data) => {
        this.setState({msg: data.data});
      });
    } else {
      this.setState({msg: this.props.initialData[0].data});
    }
  }
  
  render() {
    return (
      <div>
        <h1>React Router Tutorial</h1>
        <ul role="nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/repos">Repos</Link></li>
        </ul>
        
        <div>{this.state.msg}</div>
        {
          this.props.routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} initialData={this.props.initialData} />
          ))
        }
      </div>
    )
  }
};
