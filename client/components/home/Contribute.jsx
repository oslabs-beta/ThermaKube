import React from 'react';
import { Github } from '@icons-pack/react-simple-icons';


const Contribute = () => {
  return (
    <section id='contribute' className='contributeContainer'>
      <h2>ThermaKube is an Open-Source Project</h2> 
      <h5>Feel free to contribute!</h5>
      <a href='https://github.com/oslabs-beta/ThermaKube'>
        <Github color='#001e3f' size={70}/>
      </a>
    </section>
  )
}

export default Contribute;