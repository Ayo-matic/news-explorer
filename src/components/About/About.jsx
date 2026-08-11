import avatarImage from '../../assets/avatar.jpg';
import './About.css';

function About() {
  return (
    <section className="about">
      <img src={avatarImage} alt="Ayomikun Adekile" className="about__avatar" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          Hi, I'm Ayomikun — a software engineer who just completed TripleTen's
          software engineering bootcamp. NewsExplorer is my final capstone project,
          built with React, React Router, Express, and MongoDB, with JWT authentication
          and full save/unsave article functionality backed by a real API.
        </p>
        <p className="about__text">
          Through TripleTen I learned full-stack development from the ground up —
          building REST APIs, handling authentication and validation, and designing
          responsive, accessible interfaces. I'm currently looking for opportunities
          to keep building and growing as a developer.
        </p>
      </div>
    </section>
  );
}

export default About;
