// src/components/AboutUs.tsx
import React from 'react';
import '../styles/AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="about-us">
      <div className="container">
        <h2>About Us</h2>
        <p>
          We are a dynamic group of four passionate developers who thrive on turning ideas into reality. 
          As a team, we know how to work together seamlessly, leveraging each other's strengths to deliver 
          exceptional results. Our collaboration is built on trust, communication, and a shared commitment 
          to excellence.
        </p>
        <p>
          What sets us apart is our ability to develop <strong>fully functional applications</strong> in 
          record time. In this case, we have successfully created:
        </p>
        <ul>
          <li>A <strong>mobile app</strong> with a sleek and intuitive user interface.</li>
          <li>A <strong>video game</strong> that combines engaging gameplay with stunning visuals.</li>
          <li>A <strong>Progressive Web App (PWA)</strong> that offers a seamless experience across devices.</li>
        </ul>
        <p>
          All of this was accomplished in <strong>one quarter or less</strong>, showcasing our efficiency 
          and dedication to meeting deadlines without compromising quality.
        </p>
        <p>
          We are well-versed in <strong>agile methodologies</strong>, which allow us to adapt quickly to 
          changing requirements and deliver incremental value to our clients. Our development process is 
          backed by rigorous testing, ensuring that every app we create is robust, reliable, and ready for 
          real-world use.
        </p>
        <p>
          Whether it's a mobile app, a video game, or a PWA, we bring creativity, technical expertise, and 
          a collaborative spirit to every project. Let us help you bring your vision to life!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;