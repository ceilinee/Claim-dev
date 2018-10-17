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
		fetch('/users/chat', {
			accept: 'application/json',
		}).then((response) => response.json()).then(response => {
			this.setChat(response);
		});
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
												<ResponsiveBar
															data={[{
																	"Emotion": "Color",
																	"Color": this.props.claim.imgTrait.substring(0,2),
																},
																{
																	"Emotion": "Vehicle",
																	"Vehicle": this.props.claim.imgTrait.substring(3,5),
																},
																{
																	"Emotion": "Car",
																	"Car": this.props.claim.imgTrait.substring(6,8),
																},
																{
																	"Emotion": "Sports",
																	"Sports": this.props.claim.imgTrait.substring(9,11),
																},
																{
																	"Emotion": "Roadster",
																	"Roadster": this.props.claim.imgTrait.substring(12,14),
																}
																]}
															keys={[
																	"Color",
																	"Vehicle",
																	"Car",
																	"Sports",
																	"Roadster"
															]}
															indexBy="Emotion"
															margin={{
																	"top": 30,
																	"right": 50,
																	"bottom": 50,
																	"left": 60
															}}
															padding={0.3}
															colors="nivo"
															colorBy="id"
															defs={[
																	{
																			"id": "dots",
																			"type": "patternLines",
																			"background": "inherit",
																			"color": "#ff605d",
																			"size": 4,
																			"padding": 1,
																			"stagger": true
																	},
																	{
																			"id": "lines",
																			"type": "patternLines",
																			"background": "inherit",
																			"color": "#eed312",
																			"rotation": -45,
																			"lineWidth": 6,
																			"spacing": 10
																	}
															]}
															fill={[
																	{
																			"match": {
																					"id": "Percentage Certain"
																			},
																			"id": "dots"
																	}
															]}
															layout="horizontal"
															borderColor="inherit:darker(1.6)"
															labelSkipWidth={12}
															labelSkipHeight={12}
															axisBottom={{
											            "orient": "bottom",
											            "tickSize": 5,
											            "tickPadding": 5,
											            "tickRotation": 0,
											            "legend": "% Certainty",
											            "legendPosition": "right",
											            "legendOffset": 36,
											        }}
															labelTextColor="inherit:darker(1.6)"
															animate={true}
															motionStiffness={90}
															motionDamping={13}
													/>
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
											<ResponsiveBar
										        data={[{
														    "Emotion": "Anger",
														    "Anger": this.props.claim.chatTrait.substring(0,2),
														  },
														  {
														    "Emotion": "Fear",
																"Fear": this.props.claim.chatTrait.substring(3,5),
														  },
														  {
														    "Emotion": "Joy",
														    "Joy": this.props.claim.chatTrait.substring(6,8),
														  },
														  {
														    "Emotion": "Sadness",
														    "Sadness": this.props.claim.chatTrait.substring(9,11),
														  }
													    ]}
										        keys={[
										            "Anger",
																"Joy",
																"Sadness",
																"Fear"
										        ]}
										        indexBy="Emotion"
										        margin={{
										            "top": 50,
										            "right": 130,
										            "bottom": 50,
										            "left": 60
										        }}
										        padding={0.3}
										        colors="nivo"
										        colorBy="id"
										        defs={[
										            {
										                "id": "dots",
										                "type": "patternLines",
										                "background": "inherit",
										                "color": "#ff605d",
										                "size": 4,
										                "padding": 1,
										                "stagger": true
										            },
										            {
										                "id": "lines",
										                "type": "patternLines",
										                "background": "inherit",
										                "color": "#eed312",
										                "rotation": -45,
										                "lineWidth": 6,
										                "spacing": 10
										            }
										        ]}
										        fill={[
										            {
										                "match": {
										                    "id": "Percentage Certain"
										                },
										                "id": "dots"
										            }
										        ]}
										        borderColor="inherit:darker(1.6)"
										        labelSkipWidth={12}
										        labelSkipHeight={12}
										        labelTextColor="inherit:darker(1.6)"
										        animate={true}
										        motionStiffness={90}
										        motionDamping={15}
										    />
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
				{this.state.chatlist.map(chat =>
						<Chat
						key={chat.idChat}
						chat={chat}
					/>
				)}
      </div>
    )
  }
	deleteClaim = () => {
		axios.delete('/users/deleteClaim', { params: { idClaims: this.props.claim.idClaims } })
				.then(this.setState({open: false})).then(() => {this.props.refresh()});
	}
  renderFrChat = () => {
    return(
      <div className="chat">
				{this.state.chatlist.map(chat =>
						<ChatFr
						key={chat.idChat}
						chat={chat}
					/>
				)}
      </div>
    )
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