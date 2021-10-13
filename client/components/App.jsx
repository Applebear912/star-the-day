import React from 'react';
import axios from 'axios';
import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

// import searchMusic from './searchMusic.js';
// import Image from 'react-bootstrap/Image';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';


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
    };
  };

  componentDidMount() {
    // setting state
    // when load page, get the photo of the day from nasa API (invoke get photo method)
    this.getPhoto();
    this.getQuote();
    // this.getMusic();
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
      <main>
        <nav>
          <img src='/images/logo.jpeg' alt='gif' />
        </nav>
        <div id='quote'> One quote for today:
            <h4>{this.state.quote}</h4>
            <h6>{this.state.author}</h6>
        </div>

        <div id="nasaPhoto">
          <img src={this.state.image} />
          <h6>{this.state.title}</h6>
          <p>{this.state.explaination}</p>
          <p>{this.state.date}</p>
          <input
            type="submit"
            value="Save Photo"
            onClick={() => {
              this.savePhoto();
            }}
          />
        </div>


        <div id='musicLogo'>
          <p>music of the day</p>
          <img src='/images/record_animation_800x600.gif' alt='gif' />
          <div id='music'>
            <iframe width="25" height="25" src="https://www.youtube.com/embed/f7SS57LFPco?autoplay=1" title="YouTube video player" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
          </div>
        </div>

      </main>
    );
  };
};

export default App;

