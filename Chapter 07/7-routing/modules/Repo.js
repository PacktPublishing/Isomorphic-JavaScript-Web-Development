import React from 'react'

export default class Repo extends React.Component {
  
  constructor(props){
    super(props);
  }
  
  render() {
    const { userName, repoName } = this.props.params;
    return (
      <div>
        <h2>{userName} / {repoName}</h2>
      </div>
    )
  }
}
