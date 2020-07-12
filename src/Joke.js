import React, { Component } from 'react'
import "./Joke.css"

export default class Joke extends Component {

  constructor(props) {
    super(props)
    // const {text, votes, upVote, downVote} = this.props;
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
    this.getColor = this.getColor.bind(this);
  }

  handleUpVote(evt) {
    // evt.preventDefault();
    this.props.upVote(this.props.text);
  }

  handleDownVote(evt) {
    // evt.preventDefault();
    this.props.downVote(this.props.text);
  }
  
  getColor() {
    if(this.props.votes >= 15) {
      return "#4CAF50";
    } else if(this.props.votes >= 12) {
      return "#8BC34A"; 
    } else if(this.props.votes >= 9) {
      return "#CDDC39";
    } else if(this.props.votes >= 6) {
      return "#FFEB3B";
    } else if(this.props.votes >= 3) {
      return "#FFC107";
    } else if(this.props.votes >= 0) {
      return "#FF9800";
    } else {
      return "#f44336";
    }
  }

  getEmoji() {
    if(this.props.votes >= 15) {
      return "em em-rolling_on_the_floor_laughing";
    } else if(this.props.votes >= 12) {
      return "em em-laughing"; 
    } else if(this.props.votes >= 9) {
      return "em em-smiley";
    } else if(this.props.votes >= 6) {
      return "em em-slightly_smiling_face";
    } else if(this.props.votes >= 3) {
      return "em em-neutral_face";
    } else if(this.props.votes >= 0) {
      return "em em-confused";
    } else {
      return "em em-angry";
    }
  }

  render() {
    return (
      <div className="Joke">
        <div className="Joke-buttons">
          <i className="fas fa-arrow-up" onClick={this.handleUpVote}></i>
          <span className="Joke-votes" style={{borderColor: this.getColor()}}>{this.props.votes}</span>
          <i className="fas fa-arrow-down" onClick={this.handleDownVote}></i>
        </div>
        <div className="Joke-text">
          {this.props.text}
        </div>
        <div className="Joke-smile">
          <i className={this.getEmoji()}></i>
        </div>
      </div>
    )
  }
}
