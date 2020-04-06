import React from 'react';
import { Github } from '@icons-pack/react-simple-icons';


const Contribute = () => {
  return (
    <section className='contributeContainer'>
      <h2>ThermaKube is an Open-Source Project</h2> 
      <h5>Feel free to contribute!</h5>
      <a href='https://github.com/oslabs-beta/ThermaKube'>
        <Github color="#7a9d96" size={50}/>
      </a>
    </section>
  )
}

export default Contribute;