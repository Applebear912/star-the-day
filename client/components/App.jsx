import React from 'react';
import axios from 'axios';
import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';
import { Button } from 'react-bootstrap';
import { Container, Grid, Row, Col } from 'react-bootstrap';



// import Music from './Music.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // - what to display:
      image: '', // url
      title: '',
      explanation: '',
      date: '',
      copy_right: '',
      quote: '',
      author: '',
      background: '',
      music: '',
      button: 'Save Photo',
    };
  };

  componentDidMount() {
    // setting state
    // when load page, get the photo of the day from nasa API (invoke get photo method)
    this.getPhoto();
    this.getQuote();
    this.getMusic();
  }

  getPhoto() {
    axios.get('https://api.nasa.gov/planetary/apod?api_key=OCNM6w9b9xwzEP0NLyAhNmv6zhDen0RUUtYdWEE7')
      .then(response => {
        this.setState({
          image: response.data.url,
          title: response.data.title,
          explanation: response.data.explanation,
          date: response.data.date,
          copy_right: response.data.copyright,
        });
      })
      .catch(console.error);
  };

  getQuote() {
    axios.get('https://quotes.rest/qod')
      .then(response => {
        this.setState({
          quote: response.data.contents.quotes[0].quote,
          author: response.data.contents.quotes[0].author,
          background: response.data.contents.quotes[0].background,
        });
      })
      .catch(console.error);
  };

  getMusic() {
    axios({
      method: 'get',
      url: 'https://www.googleapis.com/youtube/v3/search',
      params: {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
        access_token: API_KEY,
        q: 'classical music',
        maxResults: 1,
        type: 'video',
        videoEmbeddable: 'true'
      }
    })
      //playlist id = 111229530
      .then(response => {
        console.log(response.data.items[0].id.videoId);
        this.setState({
          music: response.data.items[0].id.videoId,
        });
      })
      .catch(console.error);
  };

  savePhoto() {
    const { image, title, explanation, date } = this.state;
    axios.post('/photo', { image, title, explanation, date })
      .then(result => {
        console.log('Result of POST:', result.data);
      })
      .catch(console.error);
  };

  render() {
    return (

      <Container>

        <Row>
          <Col>
            <img id="logo" src='/images/logo.jpeg' alt='gif' />
          </Col>
        </Row>

        <Row>
          <p id='photoTitle'> Photo Of The Day (From Nasa) </p>
          <br></br>
          <Col sm>
            <div id='photoName'>{" " + this.state.title}</div>
            <span id='photoDate'>{this.state.date}</span>
            {/* <div>{this.state.explaination}</div> */}
            <div>
              <input
                id="savePhoto"
                type="submit"
                value={this.state.button}
                onClick={(e) => {
                  this.savePhoto();
                  this.setState({button: "saved"})
                }}
              />
            </div>
            <img id="nasaPhoto" src={this.state.image} />
          </Col>

          <Col sm>

            <div id='musicTitle'>Music Of The Day</div>
            <iframe id='music' width="30" height="30" src="https://www.youtube.com/embed/f7SS57LFPco?autoplay=1" title="YouTube video player" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
            <img id='musicLogo' src='/images/record_animation_800x600.gif' alt='gif' />

          </Col>
        </Row>

        <Row>
          <p id='quoteTitle'>Quote Of The Day</p>
          <Col sm>
            <div id='quote'>
              <h4>{this.state.quote}</h4>
              <h6>{this.state.author}</h6>
            </div>
          </Col>

        </Row>

      </Container>
    );
  };
};

export default App;


