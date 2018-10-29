import React, {Component} from 'react'
import headerimg from '../../img/has_header.png'

const Styles = {

  container: {
    width: '100%',
    height: '80px',
    borderStyle: 'none none solid none',
    borderWidth: '1px',
    display: 'flex'
  },
  leftGradient: {
    backgroundColor: '#717270',
    flex: '1 1 auto'
  },
  rightGradient: {
    backgroundColor: '#ffffff',
    flex: '10 1 auto'
  }
}

export class Header extends Component{


  constructor(props){
    super(props);
  }

  render(){

    var sensorsClickFn = this.props.sensorsClick;
    console.log("click set.")
    if(this.props.sensorsClick == null){
      console.log("resetting onclick")
      sensorsClickFn = ()=>{};
    }

    return (
      <div style={Styles.container}>
        <div style={Styles.leftGradient} />
        <img src={headerimg} />
        <div style={Styles.rightGradient} >
          Welcome to Zombocom!
        </div>
      </div>
    )
  }

}
