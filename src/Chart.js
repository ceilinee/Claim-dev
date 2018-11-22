import React from 'react';
import moment from 'moment';
import './Chart.css';
import axios from 'axios';

export default class Chart extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
        }
  }
	//Renders the boxes that composes the bars
  renderBar = () => {
		//intialize items array
    var items = [];
		//If the bar is supposed to be the shorter version
    if(this.props.length == "short"){
			//There are 10 divs that composes the bars, representing 10%, 20% etc.
			//The divs that are coloured are within the percentage certainty while the rest are greyed
			//Set divs that are "filled"
      for (var i = 0; i < this.props.value; i++) {
					//Sets the color for the specific div
          var style = {
            'backgroundColor': this.props.color[i]
          };
					//Pushes the div onto the array
          items.push(<div style={style} className="Chart-bar-section"/>);
      }
			//Set the remaining divs as grey
      for (var i = 0; i < 10-this.props.value; i++){
				//Pushes the grey divs onto the array
        items.push(<div className="Chart-bar-section-grey"/>);
      }
    }
		//If the bar is supposed to be the longer version
    else{
			//Set divs that are "filled"
      for (var i = 0; i < this.props.value; i++) {
					//Sets the color for the specific div
          var style = {
            'backgroundColor': this.props.color[i]
          };
					//Pushes the div onto the array
          items.push(<div style={style} className="Chart-bar-section-long"/>);
      }
			//Set the remaining divs as grey
      for (var i = 0; i < 10-this.props.value; i++){
				//Pushes the grey divs onto the array
        items.push(<div className="Chart-bar-section-grey-long"/>);
      }
    }
		//Return the array of divs
    return(
      <span className="Chart-Span">
      {items}
      </span>
    );
  }
	//Renders the label and calls renderBar() to render the bar
  render(){
			return(
	       <div className="Chart">
	        <span className="Chart-Label">{this.props.label}</span>
          <div className="Chart-bar">{this.renderBar()}</div>
	       </div>
			);
  }
}
