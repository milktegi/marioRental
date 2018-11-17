import React, { Component } from 'react'

// Input: liked : boolean 
// Output: onClick 

class Like extends Component {
	
	render() { 
	  let baseIcon = "fa fa-heart";
	  if(!this.props.liked) {
		  baseIcon += "-o";
	  }

		return ( 
			<i style={{ cursor: 'pointer'}}
			onClick={this.props.onClick}
			className={baseIcon} aria-hidden="true"></i>
		);
	}
}
 
export default Like;