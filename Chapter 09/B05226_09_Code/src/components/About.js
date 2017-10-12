import React from 'react'

export default class About extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      msg: 'Hello'
    }
  }
  
  static loadData(){
    return Promise.resolve({
      data: 'Hello About'
    });
  }
  
  changeMsg(){
    this.setState({
      msg: 'World'
    })
  }
  
  render() {
    return <div>
        <span className="about-msg">{this.state.msg}</span>
        <button className="about-btn" onClick={this.changeMsg.bind(this)}>Click me</button>
      </div>
  }
  
}
