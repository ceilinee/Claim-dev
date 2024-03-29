import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Switch, Router, Route, Link } from 'react-router-dom';
import logo from './logo.png';
import up from './up.png';
import down from './down.png';
import icon from './icon.png';
import danger from './danger.png';
import university from './university.png';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';
import car from './car.png';
import senti from './senti.png';
import Claim from './Claim.js';
var moment = require('moment');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      width: 0,
      height: 0,
      page: "Information",
      claimant: true,
      issued: true,
      open: false,
      claim: true,
      language: true,
      claimlist: [{idClaims: 1, street: "Toronto", city: "ON", link: "https://i.imgur.com/BleOAcq.png", imgTrait: "90,80,70,90,90", chatTrait: "60,70,30,40", date: "10/10/2018"}],
      loading: true,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
  componentDidMount() {
    this.fetchClaims();
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    setTimeout(() => this.setState({ loading: false }), 1000);
  }
  fetchClaims = () => {
    // fetch('/users/', {
		// 	accept: 'application/json',
		// }).then((response) => response.json()).then(response => {
		// 	this.setClaims(response);
		// });
  }
  setClaims = (data) => {
    var newdata = [];
    for(var i = 0; i<data.length; i++){
      newdata.push(data[i]);
      console.log(newdata);
    }
    this.setState({
      claimlist : newdata,
    })
    console.log(this.state.claimlist);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  renderClaims = () => {
    var time = moment().format("MM/DD/YYYY");
    return(
      <div>
      <div className="box3">
        <div className="title">
        {this.state.claim ? <img className="chevron" src={up} alt="img" onClick = {() => {this.clickClaim()}}/> : <img className="chevron" src={down} alt="img" onClick = {() => {this.clickClaim()}}/> }
          Claims
        </div>
      </div>
      {this.state.claim?
      <div className="box2">
        <div className="answer">
          <table id = "issued">
            <tbody>
              <tr>
                <th>Status</th>
                <th>Claim Number</th>
                <th>Severity</th>
                <th>Accident Date</th>
                <th>Filing Date</th>
                <th>Location</th>
              </tr>
              {this.state.claimlist.map(claim =>
                  <Claim
                  key={claim.idClaims}
                  claim={claim}
                  refresh={() => {this.fetchClaims()}}
                />
              )}
              <tr>
                <div className="green"><td>Completed</td></div>
                <td><a className="car" onClick = {() => {this.setState({page: "Detail"})}}>0000382934</a></td>
                <td>4 - Low</td>
                <td>08/03/2017</td>
                <td>08/03/2017</td>
                <td>Toronto, ON</td>
              </tr>
              <tr>
                <div className="green"><td>Completed</td></div>
                <td><a className="car" onClick = {() => {this.setState({page: "Detail"})}}>0000234987</a></td>
                <td>4 - Low</td>
                <td>07/09/2015</td>
                <td>07/09/2015</td>
                <td>Toronto, ON</td>
              </tr>
            </tbody>
          </table>
          <br/>
        </div>
      </div>
      : ""}
      </div>
    )
  }
  // <tr>
  //   <div className="red"><td>Pending Review</td></div>
  //   <td><a className="car" onClick = {() => {this.setState({open: true})}}>0000416756</a></td>
  //   <td>1 - Severe <img className="danger" src={danger} alt="danger"/></td>
  //   <td>{time}</td>
  //   <td>{time}</td>
  //   <td>Toronto, ON</td>
  // </tr>

  clickClaim = () => {
    console.log("CLicked");
    if(this.state.claim){
    this.setState({
      claim:false,
    });
    }
    else{
      this.setState({
        claim:true,
      });
    }
    console.log(this.state.claim);
  }
  clickClaimant = () => {
    console.log("CLicked");
    if(this.state.claimant){
    this.setState({
      claimant:false,
    });
    }
    else{
      this.setState({
        claimant:true,
      });
    }
    console.log(this.state.claimant);
  }
  clickIssued = () => {
    console.log("CLicked");
    if(this.state.issued){
    this.setState({
      issued:false,
    });
    }
    else{
      this.setState({
        issued:true,
      });
    }
    console.log(this.state.issued);
  }
  renderClaimant = () => {
    return(
      <div>
      <div className="box3">
        {this.state.claimant ? <img className="chevron" src={up} alt="img" onClick = {() => {this.clickClaimant()}}/> : <img className="chevron" src={down} alt="img" onClick = {() => {this.clickClaimant()}}/> }
        <div className="title">
          Claimant Overview
        </div>
      </div>
      {this.state.claimant ?
      <div className="box2">
        <div className="answer">
          <table id="policy">
            <tbody>
            <tr>
              <th>Occupation:</th>
              <th>CEO</th>
              <th></th>
              <th>Open Claims:</th>
              <th>1</th>
            </tr>
            <tr>
              <th>Marital Status:</th>
              <th>Single</th>
              <th></th>
              <th>Open Quotes:</th>
              <th>0</th>
            </tr>
            <tr>
              <th>Total Monthly Premiums:</th>
              <th>$2,142.78</th>
              <th></th>
              <th>Open Transactions:</th>
              <th>3</th>
            </tr>
            </tbody>
          </table>
          <br/>
        </div>
      </div>
      : ""}
      </div>
    )
  }
  renderIssued = () => {
    return(
      <div>
          <div className="box3">
            <div className="title">
            {this.state.issued ? <img className="chevron" src={up} alt="img" onClick = {() => {this.clickIssued()}}/> : <img className="chevron" src={down} alt="img" onClick = {() => {this.clickIssued()}}/> }
              Issued Policies
            </div>
          </div>
          {this.state.issued ?
          <div className="box2">
            <div className="answer">
              <table id = "issued">
                <tbody>
                  <tr>
                    <th>Car Type</th>
                    <th>Status</th>
                    <th>Open Claim(s)</th>
                    <th>Policy #</th>
                    <th>Inception</th>
                    <th>Expiry</th>
                  </tr>
                  <tr>
                    <td><a className="car" onClick = {() => {this.changePage()}}>Lamborgini</a></td>
                    <td>Active</td>
                    <td>1</td>
                    <td>AD983JF803</td>
                    <td>03/12/2013</td>
                    <td>03/12/2023</td>
                  </tr>
                </tbody>
              </table>
              <br/>
            </div>
          </div>
          : ""}
      </div>
    )
  }
  // {this.state.users.map(user =>
  //   <div key={user.idUsers}>{user.email}</div>
  // )}
  renderInformation = () => {
    return(
      <div className="innerBox">
        <div className="box4">
          <div className="title">
            Bruce Wayne (42938472) - Active
          </div>
        </div>
        {this.renderClaimant()}
        {this.renderIssued()}
        {this.renderClaims()}
      </div>
    )
  }
  changePage = () => {
    this.setState({
      page: "Car",
    })
    console.log("HIIII");
  }
  renderHeader = () => {
    return(
      <div>
              <div className="links">
                <img src={icon} alt="university " className="university"/>
                Gotham Insurance Portal
                <Link to={`/`} className="selection">
                  Home
                </Link>
                <Link to={`/portal`} className="selected">
                  Claims Portal
                </Link>
                <Link to={`/`} className="selection">
                  Forms
                </Link>
                <div className="profile">
                    Sally Joseph (Agent: 07456)
                </div>
                <div className="powered">
                    Powered by
                    <img src={logo} alt="picture" className="logo"/>
                </div>
              </div>
     </div>
    )
  }
  render() {
    if(this.state.loading){
      return (
        <div className="loading">
        {this.renderHeader()}
          <img className="loading-image" src="https://static.wixstatic.com/media/a81fe2_93868a3c4045406aad83d16937851563~mv2.gif" alt="loading"/>
        </div>
      )
    }
    else{
    return (
      <div>
        {this.renderHeader()}
          <div className="two">
            {this.renderInformation()}
            {this.state.open ? this.renderModal() : ""}
          </div>
      </div>
    );
    }
}
}
export default App;
