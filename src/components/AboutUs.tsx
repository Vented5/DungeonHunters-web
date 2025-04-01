import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 60px 20px;
  background-color: #f9f9f9;
  text-align: center;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #007bff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 20px 0;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "✔️";
    margin-right: 10px;
    color: #28a745;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AboutUs: React.FC = () => {
  return (
    <Section id="about-us">
      <Container>
        <Heading>About Us</Heading>
        <Paragraph>
          We are a dynamic group of four passionate developers who thrive on turning ideas into reality. As a team, we know how to work together seamlessly, leveraging each other's strengths to deliver exceptional results. Our collaboration is built on trust, communication, and a shared commitment to excellence.
        </Paragraph>
        <Paragraph>
          What sets us apart is our ability to develop <strong>fully functional applications</strong> in record time. In this case, we have successfully created:
        </Paragraph>
        <List>
          <ListItem>
            A <strong>mobile app</strong> with a sleek and intuitive user interface.
          </ListItem>
          <ListItem>
            A <strong>video game</strong> that combines engaging gameplay with stunning visuals.
          </ListItem>
          <ListItem>
            A <strong>Progressive Web App (PWA)</strong> that offers a seamless experience across devices.
          </ListItem>
        </List>
        <Paragraph>
          All of this was accomplished in <strong>one quarter or less</strong>, showcasing our efficiency and dedication to meeting deadlines without compromising quality.
        </Paragraph>
        <Paragraph>
          We are well-versed in <strong>agile methodologies</strong>, which allow us to adapt quickly to changing requirements and deliver incremental value to our clients. Our development process is backed by rigorous testing, ensuring that every app we create is robust, reliable, and ready for real-world use.
        </Paragraph>
        <Paragraph>
          Whether it's a mobile app, a video game, or a PWA, we bring creativity, technical expertise, and a collaborative spirit to every project. Let us help you bring your vision to life!
        </Paragraph>
      </Container>
    </Section>
  );
};

export default AboutUs;
