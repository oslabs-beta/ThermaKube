import React from 'react';
import FadeIn from 'react-fade-in';
import icon from '../../assets/icon.png';
import GitHubButton from 'react-github-btn';
import { Fade } from 'react-bootstrap';

const Hero = () => {
  return (
    <section className='heroContainer'>
      <div className='heroComp'>
        <FadeIn delay='500' transitionDuration='1000'>
          <h3 className='heroQuote'>
            Power your metrics and monitoring with a modern open-source solution
            for <br /> any Kubernetes cluster
          </h3>
          <div className='col1'>
            <img src={icon} alt='Logo' className='logoMain' />
          </div>
          <h1 className='logoName'>ThermaKube</h1>
          <div className='github-buttons'>
            <GitHubButton
              href='https://github.com/oslabs-beta/ThermaKube'
              data-size='large'
              data-show-count='true'
            >
              Follow ThermaKube
            </GitHubButton>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
