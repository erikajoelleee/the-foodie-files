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



