import React from 'react';
import moment from 'moment';
import './App.css';
import './Modal.css';
import './Claim.css';
import './index.css';
import './newClaim.css';
import axios from 'axios';
import danger from './danger.png';
import up from './up.png';
import down from './down.png';
import icon from './icon.png';
import university from './university.png';
import card from './coverage card.jpg';
import location from './location.JPG';
import summary from './claim summary card.png';
import car from './car.png';
import senti from './senti.png';
import App from './App';
import Chat from './Chat';
import ChatFr from './ChatFr';
import { ResponsiveBar } from '@nivo/bar';
import Chart from './Chart';

export default class Claim extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            claim: [],
            idNumber: '',
            open: false,
            language: true,
						chatlist: [],
						number: 20,
        }
  }
  componentWillMount() {
    this.generateID();
		this.fetchChat();

	}
	fetchChat = () => {
		// fetch('/users/chat', {
		// 	accept: 'application/json',
		// }).then((response) => response.json()).then(response => {
		// 	this.setChat(response);
		// });
	}
	setChat = (data) => {
		var newdata = [];
		for(var i = 0; i<data.length; i++){
			newdata.push(data[i]);
			console.log(newdata);
		}
		this.setState({
			chatlist : newdata,
		})
		console.log(this.state.chatlist);
	}
  generateID = () => {
    var num = Math.floor((Math.random() * 90) + 10);
    this.setState({
      idNumber : num
    })
  }
  renderModal = () => {
    var date = this.props.claim.date.toString();
		var data = 40;
    var time = date.substring(0,10);
		var colorarray = ["#667EEA","#6778E2","#6972DA","#6B6DD2","#6D67CA","#6E61C2","#705CBA","#705CBA","#7450AA","#764BA2"];
		var colorarray2 = ["#56A4E4","#579FE4","#599BE5","#5B97E6","#5D93E6","#5E8EE7","#608AE8","#6286E8","#6482E9","#667EEA"];
		var colorarray3 = ["#36D1DC","#3AC8DD","#3EC0DE","#42B8DF","#46AFE0","#4AA7E1","#4AA7E1","#5296E3","#568EE4","#5B86E5"];
		var colorarray4 = ["#5b86e5","#547DD5","#4E75C5","#486DB5","#4264A5","#3C5C95","#365485","#304b75","#2a4365","#243b55"];
    return(
      <div id="modal">
        <div id="modal-background">
            <div className="left">
              <div className="box5">
                <div className="title">
                  Chat Log
                </div>
                <div className="french" onClick = {() => {if(this.state.language){this.setState({ language: false})} else{this.setState({ language: true})}}}>
                  FR/EN
                </div>
              </div>
              {this.state.language ? this.renderChat() : this.renderFrChat()}
            </div>
            <div className="right">
                <div className="box5">
                  <div className="title">
                    Claim Details (00004167{this.state.idNumber})
                    <div className="close" onClick = {() => {this.setState({ open: false})}}>
                    x
                    </div>
                  </div>
									<div className="delete" onClick = {() => {this.deleteClaim()}}>
										Delete
									</div>
                </div>
                  <div className="answer1">
                    <table id="policy">
                      <tbody>
                      <tr>
                        <td>Policy No.:</td>
                        <td>AD983JF803</td>
                        <td></td>
                        <td>Accident Date:</td>
                        <td>{time}</td>
                      </tr>
                      <tr>
                        <td>Claim No.:</td>
                        <td>00004167{this.state.idNumber}</td>
                        <td></td>
                        <td>Filing Date:</td>
                        <td>{time}</td>
                      </tr>
                      <tr>
                        <td>Severity:</td>
                        <td>1 - Severe</td>
                        <td></td>
                        <td>Address:</td>
                        <td>{this.props.claim.street}, {this.props.claim.city}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                <div className="box5">
                  <div className="title">
                    Accident Context
                  </div>
                </div>
                  <div className="answer1">
										<div className="context-left">
										  <div className="context-title">
												Client Attachment
											</div>
											<img src={this.props.claim.link} alt="car" className="carpic"/>
										</div>
										<div className="context-right">
												<div className="context-title">
													Image Attributes
												</div>
												<div className="context-chart">
												<Chart value="10" length="short" label="Ash Grey Color" color={colorarray4}/>
												<Chart value="9" length="short" label="Vehicle" color={colorarray2}/>
												<Chart value="8" length="short" label="Car" color={colorarray3}/>
												<Chart value="6" length="short" label="Sports Car" color={colorarray}/>
													</div>
												</div>
                  </div>
                <div className="box5">
                  <div className="title">
                    Conversation Sentiment
                  </div>
                </div>
                <div className="answer1">
											<div className="sentiment-chart">
												<Chart value="5" length="long" label="Anger" color={colorarray4}/>
												<Chart value="3" length="long" label="Fear" color={colorarray2}/>
												<Chart value="6" length="long" label="Sad" color={colorarray3}/>
												<Chart value="1" length="long" label="Joy" color={colorarray}/>
											</div>
                </div>
            </div>
        </div>
      </div>
    )
  }
	renderChat = () => {
    return(
      <div className="chat">
        <p className="chat-right">Hello</p>
        <p>Hello! How can we help you today?</p>
        <p className="chat-right">Check Coverage</p>
        <p><img src={card} alt="card" className="card"/></p>
        <p className="chat-right">I just got in an accident!</p>
        <p>It sounds like you’ve had quite an adventurous day. </p>
        <p>Lets start a new auto claim for you! Where did the accident occur?</p>
        <p className="chat-right"><img src={location} alt="card" className="card"/></p>
        <p>Was there another car or person involved in the accident?</p>
        <p className="chat-right">yes</p>
        <p>Oh no! That sounds bad.</p>
        <p>Do you want to submit a picture to attach to the claim?</p>
        <p className="chat-right">yes</p>
        <p>Okay. Please use your camera to take a photo or select an existing photo.</p>
        <p className="chat-right">yes</p>
        <p>I have submitted a claim on your behalf. You can review the submitted information below. </p>
        <p><img src={summary} alt="card" className="card"/></p>
      </div>
    )
  }
  renderFrChat = () => {
    return(
      <div className="chat">
        <p className="chat-right">Bonjour</p>
        <p>Salut! Que peut-on faire pour vous aider aujourd'hui?</p>
        <p className="chat-right">Vérifier la couverture</p>
        <p><img src={card} alt="card" className="card"/></p>
        <p className="chat-right">Je viens d'avoir un accident!</p>
        <p>On dirait que vous avez passé une journée aventureuse. </p>
        <p>Commençons une nouvelle réclamation automatique pour vous! Où l'accident s'est-il produit?</p>
        <p className="chat-right"><img src={location} alt="card" className="card"/></p>
        <p>Y avait-il une autre voiture ou une personne impliquée dans l'accident?</p>
        <p className="chat-right">Oui</p>
        <p>Oh non! Cela sonne mal.</p>
        <p>Voulez-vous soumettre une photo à joindre à la demande?</p>
        <p className="chat-right">yes</p>
        <p>D'accord. Veuillez utiliser votre appareil photo pour prendre une photo ou sélectionner une photo existante.</p>
        <p className="chat-right">Oui</p>
        <p>Jai soumis une demande en votre nom. Vous pouvez consulter les informations soumises ci-dessous.</p>
        <p><img src={summary} alt="card" className="card"/></p>
      </div>
    )
  }
	deleteClaim = () => {
		// axios.delete('/users/deleteClaim', { params: { idClaims: this.props.claim.idClaims } })
		// 		.then(this.setState({open: false})).then(() => {this.props.refresh()});
	}
  render(){
    var date = this.props.claim.date.toString();
    var time = date.substring(0,10);
		return(
        <tr>
            <div className="red"><td>Pending Review</td></div>
            <td><a className="car" onClick = {() => {this.setState({open: true})}}>00004167{this.state.idNumber}</a></td>
            <td>1 - Severe <img className="danger" src={danger} alt="danger"/></td>
            <td>{time}</td>
            <td>{time}</td>
            <td>{this.props.claim.street}, {this.props.claim.city}</td>
            {this.state.open ? this.renderModal() : ''}
        </tr>
		);
    }
  }
