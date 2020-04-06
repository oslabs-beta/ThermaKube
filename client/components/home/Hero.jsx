import React from 'react';
import icon from '../../assets/icon.png'
import GitHubButton from 'react-github-btn';

const Hero = () => {

  return (
    <section className='heroContainer'>
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
      </section>
  )
}

export default Hero;
