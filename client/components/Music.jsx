import React from 'react';

const Music = (props) => (

  <div className="music-container" id="music-container">
    <div className="music-info">
      <h4 id="title">{props.name}</h4>
      <div className="progress-container" id="progress-container">
        <div className="progress" id="progress"></div>
      </div>
    </div>

    <audio src={props.music} id="audio"></audio>

    <div className="img-container">
      <img src={props.picture} alt="music-cover" id="cover" />
    </div>
    <div className="navigation">
      <button id="prev" className="action-btn">
        <i className="fas fa-backward"></i>
      </button>
      <button id="play" className="action-btn action-btn-big">
        <i className="fas fa-play"></i>
      </button>
      <button id="next" className="action-btn">
        <i className="fas fa-forward"></i>
      </button>
    </div>
  </div>

)

export default Music;