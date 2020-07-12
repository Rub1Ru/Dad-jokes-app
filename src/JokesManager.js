import React, { Component } from 'react'
import axios from  "axios"
import "./JokesManager.css"
import Joke from "./Joke"


export default class JokesManager extends Component {
  static defaultProps = {
    numJokesToGet: 10
  }

  constructor(props) {
    super(props)
    this.state = {
       jokeList: JSON.parse(window.localStorage.getItem("jokes") || "[]")
    }
    this.upVote = this.upVote.bind(this);
    this.downVote = this.downVote.bind(this);
    this.getJokes = this.getJokes.bind(this);
  }

  componentDidMount() {
    if(this.state.jokeList.length === 0) this.getJokes();
  }

  async getJokes() {
    let newJoke, jokeArr = [];
    while(jokeArr.length < this.props.numJokesToGet) {
      do {
        newJoke = await axios.get("https://icanhazdadjoke.com/",
          {headers: {Accept: "application/json"}});
      } while (this.state.jokeList.find(jokes => jokes.id === newJoke.data.id) !== undefined);
        jokeArr.push({id: newJoke.data.id, text: newJoke.data.joke, votes: 0});
    }
    this.setState(st => ({
      jokeList: [...st.jokeList, ...jokeArr]
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokeList))
    );
  }

  // componentDidUpdate(nextProps, nextState) {
  //     localStorage.setItem("jokes", JSON.stringify(nextState));
  // }

  upVote(text) {
    let newJokeList = this.state.jokeList.map(j => {
      if( j.text === text ) {
        return {...j, votes: j.votes + 1};
      } else return j;
    })
    this.setState(st => ({
      jokeList: newJokeList
    }), 
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokeList))
    );
  }

  downVote(text) {
    let newJokeList = this.state.jokeList.map(j => {
      if( j.text === text ) {
        return {...j, votes: j.votes - 1};
      } else return j;
    })
    this.setState(st => ({
      jokeList: newJokeList
    }),
    () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokeList))
    );
  }

  
  render() {
    let jokes = 
      <div className="JokesManager-jokes">  
        {this.state.jokeList.sort((a,b) => -a.votes + b.votes).map(j => 
          <Joke key={j.id} text={j.text} votes={j.votes} upVote={this.upVote} downVote={this.downVote}/>  
        )};
      </div>

    return (
      <div className={this.state.jokeList.length < this.props.numJokesToGet ? "JokesManager loader" : "JokesManager"}>
        <div className="JokesManager-sidebar">
          <h1 className="JokesManager-title"><span>Dad</span> Jokes</h1>
          <img src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg" alt="smiley face"/>
          <button className="JokesManager-getmore" onClick={this.getJokes}>Fetch Jokes</button>
        </div>
        {this.state.jokeList.length >= this.props.numJokesToGet && jokes}
      </div>
    )
  }
}
