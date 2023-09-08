import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

export default function WelcomePage() {
  const [audioClip, setAudioClip] = useState(null);
  const audioRef = React.createRef();
  const FADE_DURATION = 3000; 
  const MAX_VOLUME = .1; 

  const fadeIn = () => {
    const audioElement = audioRef.current;
    const startVolume = 0;
    const endVolume = MAX_VOLUME;
    const interval = FADE_DURATION / 1000; 

    let currentVolume = startVolume;

    const fadeInterval = setInterval(() => {
      if (currentVolume >= endVolume) {
        clearInterval(fadeInterval);
      } else {
        currentVolume += (endVolume - startVolume) / interval;
        audioElement.volume = currentVolume;
      }
    }, 10);
  };

  const fadeOut = () => {
    const audioElement = audioRef.current;
    const startVolume = audioElement.volume;
    const endVolume = .1;
    const interval = FADE_DURATION / 1000; 

    let currentVolume = startVolume;

    const fadeInterval = setInterval(() => {
      if (currentVolume <= endVolume) {
        clearInterval(fadeInterval);
        audioElement.pause(); 
      } else {
        currentVolume -= startVolume / interval;
        audioElement.volume = currentVolume;
      }
    }, 10);
  };

  useEffect(() => {
    import('../../stylesheets/twltzone.mp3')
      .then((module) => {
        setAudioClip(module.default);
      })
      .catch((error) => {
        console.error('Failed to load audio:', error);
      });
  }, []);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement && typeof audioElement.loop !== 'undefined' && audioClip) {
      audioElement.loop = true;
      audioElement.src = audioClip;
      audioElement.volume = 0; 
      audioElement.play();
      fadeIn(); 
    }
  }, [audioClip]);

  return (
    <main className="welcome-page-main">
      <div className="ransomizer-container">
        <div id="ransomizer">
          <div className="rww">
            <div className="rr" style={{ backgroundColor: '#444444', color: '#f7f7f7', fontFamily: 'Times New Roman, Times, serif', fontSize: '100%', fontWeight: 'lighter', textTransform: 'lowercase', lineHeight: '100%', margin: '0.1em', padding: '0.1em', verticalAlign: 'baseline' }}>T</div>
            <div style={{ backgroundColor: '#333333', color: '#e6e6e6', fontFamily: 'Verdana, Geneva, sans-serif', fontSize: '110%', fontWeight: 'bold', backgroundImage: 'url(https://i.imgur.com/pwrAKPo.png)', backgroundPosition: 'right top', boxShadow: '1px -1px 2px #333', textTransform: 'uppercase', lineHeight: '75%', margin: '0.1em', padding: '0.3em', verticalAlign: '0.1em' }}>h</div>
            <div style={{ backgroundColor: '#222222', color: '#d5d5d5', fontFamily: 'Tahoma, Geneva, sans-serif', fontSize: '90%', fontWeight: 'bold', fontStyle: 'italic', boxShadow: '1px 1px 2px #333', textTransform: 'uppercase', lineHeight: '100%', margin: '0.1em', padding: '0.2em', verticalAlign: '0.1em' }}>e</div>
          </div>
          <div className="rww">
            <div className="rr" style={{ backgroundColor: '#777777', color: '#ffffff', fontFamily: 'Verdana, Geneva, sans-serif', fontSize: '110%', backgroundImage: 'url(https://i.imgur.com/ruhP2kd.png)', backgroundPosition: 'right top', textTransform: 'lowercase', lineHeight: '75%', textDecoration: 'underline', margin: '0.1em', padding: '0.3em', verticalAlign: '0.1em' }}>F</div>
            <div style={{ backgroundColor: '#888888', color: '#000000', fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif', fontSize: '110%', boxShadow: '-1px 1px 2px #333', textTransform: 'uppercase', lineHeight: '125%', margin: '0.1em', padding: '0.3em', verticalAlign: '0.1em' }}>o</div>
            <div className="rl" style={{ backgroundColor: '#888888', color: '#000000', fontFamily: 'Times New Roman, Times, serif', fontSize: '110%', fontWeight: 'bold', backgroundImage: 'url(https://i.imgur.com/ruhP2kd.png)', backgroundPosition: 'center center', fontStyle: 'italic', boxShadow: '1px 1px 2px #333', textTransform: 'lowercase', lineHeight: '75%', margin: '0.1em', padding: '0.1em', verticalAlign: '0.1em' }}>o</div>
            <div className="rr" style={{ backgroundColor: '#111111', color: '#c4c4c4', fontFamily: 'Times New Roman, Times, serif', fontSize: '110%', boxShadow: '1px -1px 2px #333', textTransform: 'uppercase', lineHeight: '100%', margin: '0.1em', padding: '0.3em', verticalAlign: 'baseline' }}>d</div>
            <div style={{ backgroundColor: '#333333', color: '#e6e6e6', fontFamily: 'Times New Roman, Times, serif', fontSize: '110%', backgroundImage: 'url(https://i.imgur.com/pwrAKPo.png)', backgroundPosition: 'left center', fontStyle: 'italic', boxShadow: '1px 1px 2px #333', textTransform: 'lowercase', lineHeight: '100%', margin: '0.1em', padding: '0.3em', verticalAlign: '-0.1em' }}>i</div>
            <div className="rr" style={{ backgroundColor: '#777777', color: '#ffffff', fontFamily: 'Comic Sans MS, cursive', fontSize: '110%', boxShadow: '1px -1px 2px #333', lineHeight: '75%', margin: '0.1em', padding: '0.3em', verticalAlign: 'baseline' }}>e</div>
          </div>
          <div className="rww">
            <div className="rr" style={{ backgroundColor: '#999999', color: '#000000', fontFamily: 'Palatino Linotype, Book Antiqua, Palatino, serif', fontSize: '90%', fontWeight: 'bold', fontStyle: 'italic', boxShadow: '1px -1px 2px #333', lineHeight: '125%', margin: '0.1em', padding: '0.1em', verticalAlign: 'baseline' }}>F</div>
            <div className="rr" style={{ backgroundColor: '#888888', color: '#000000', fontFamily: 'Tahoma, Geneva, sans-serif', fontSize: '100%', fontWeight: 'bold', boxShadow: '-1px -1px 2px #333', textTransform: 'uppercase', lineHeight: '125%', textDecoration: 'underline', margin: '0.1em', padding: '0.2em', verticalAlign: 'baseline' }}>i</div>
            <div className="rr" style={{ backgroundColor: '#333333', color: '#e6e6e6', fontFamily: 'Verdana, Geneva, sans-serif', fontSize: '100%', fontWeight: 'bolder', boxShadow: '-1px 1px 2px #333', lineHeight: '125%', margin: '0.1em', padding: '0em', verticalAlign: '-0.1em' }}>l</div>
            <div style={{ backgroundColor: '#222222', color: '#d5d5d5', fontFamily: 'Courier, monospace', fontSize: '90%', boxShadow: '-1px -1px 2px #333', textTransform: 'uppercase', lineHeight: '75%', margin: '0.1em', padding: '0.2em', verticalAlign: 'baseline' }}>e</div>
            <div className="rr" style={{ backgroundColor: '#222222', color: '#d5d5d5', fontFamily: 'Comic Sans MS, cursive', fontSize: '90%', fontWeight: 'bold', boxShadow: '1px 1px 2px #333', textTransform: 'uppercase', lineHeight: '125%', textDecoration: 'underline', margin: '0.1em', padding: '0.2em', verticalAlign: '0.1em' }}>s</div>
          </div>
        </div>
      </div>
      <div className="text-container">
        <h4 className="continue-header">Step into the Enigmatic World of The Foodie Files.</h4>
        <p className="continue-paragraph">Where Taste Meets Intrigue.</p>
      </div>
      <br />
      <div className="login-welcome-page">
        <Link to="/credentials">
          <button type="button" className="login-signup-welcome-button">LOG IN / SIGN UP</button>
        </Link>
      </div>
      <audio ref={audioRef} style={{ display: 'none' }} />
    </main>
  );
}



