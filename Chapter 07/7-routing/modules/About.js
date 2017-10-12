import React from 'react'

export default class About extends React.Component {
  
  constructor(props){
    super(props);
    console.log(`about props: ${Object.keys(props)}`)
  }
  
  static loadData(){
    return Promise.resolve({
      data: 'Hello About'
    });
  }
  
  render() {
    return <div>About</div>
  }
  
}
