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


  render(){


    return (
      <div style={Styles.container}>
        <div style={Styles.leftGradient} />
        <img src={headerimg} alt="V.I.C.K.I.E. H.A.S."/>
        <div style={Styles.rightGradient} >
        </div>
      </div>
    )
  }

}
