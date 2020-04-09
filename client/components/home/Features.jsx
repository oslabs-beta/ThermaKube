import React from 'react';
import Fade from 'react-reveal/Fade';
// screenshots
import cluster_ss from '../../assets/cluster_screenshot.png';
import vis_ss from '../../assets/vis_screenshot.png';

const Features = () => {
  return (
    <section id='features' className='featuresContainer'>
      <h2>Visualize Your Kubernetes Clusters</h2>
      <div className='featureInfo'>
        <Fade left>
          <section className='featureImgs'>
            <img src={cluster_ss} />
            <img src={vis_ss} />
          </section>
        </Fade>
        <Fade right>
          <section className='featureDesc'>
            <h4>Monitor and Visualize your Kubernetes Clusters</h4>
            <p className='featureText'>
              ThermaKube monitors the health and performance of Kubernetes
              clusters with support for Amazon's Elastic Kubernetes Service
              (EKS) deployments. It tracks real-time data and renders
              visualization of clusters, and alerts you when pods within the
              cluster crash - all features you can utilize with a click of a
              button, without having to download or configure anything!
            </p>
            <h4>Why Use Us</h4>
            <p className='featureText'>
              We provide:
              <li>a simplified way to display your Kubernetes cluster data</li>
              <li>
                a visualization tool to display relationships within the
                cluster, as well as usage data on pods
              </li>
              <br />
              <i>Monitor your pods with a click of a button!</i>
            </p>
          </section>
        </Fade>
      </div>
    </section>
  );
};

export default Features;
