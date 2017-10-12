import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'

class ReposWithRouter extends React.Component{
  
  constructor(props){
    super(props);
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const userName = event.target.elements[0].value;
    const repo = event.target.elements[1].value;
    const path = `/repos/${userName}/${repo}`;
    this.props.history.push(path);
  }
  
  render() {
    return (
      <div>
        <h2 className="repos-title">Repos</h2>
        <ul>
          <li><Link to="/repos/reactjs/react-router">React Router</Link></li>
          <li><Link to="/repos/facebook/react">React</Link></li>
          <li>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" placeholder="userName"/> / {' '}
              <input type="text" placeholder="repo"/>{' '}
              <button type="submit">Go</button>
            </form>
          </li>
        </ul>
      </div>
    )
  }
}

export default withRouter(ReposWithRouter);