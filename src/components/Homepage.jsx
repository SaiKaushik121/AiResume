import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import airesume from '../assets/airesume.png';


export default function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="homepage-hero">
        <div className="hero-left">
          <h1 className="hero-title">AI-Powered Resume Builder</h1>
          <div className="hero-tagline">Land your dream job with a smarter, faster, and more personalized career toolkit.</div>
          <ul className="hero-steps">
            <li><span className="step-icon">1️⃣</span> Enter your details & job description</li>
            <li><span className="step-icon">2️⃣</span> Get a tailored resume, skill gap analysis, and learning plan</li>
            <li><span className="step-icon">3️⃣</span> Download, copy, and ace your interview!</li>
          </ul>
          <div className="button-container hero-buttons">
            <button id="newresumebtn" onClick={()=>navigate('/personal')}>
              <span className="btn-icon">✨</span> Create New Resume
            </button>
            <button id="existingresumebtn" disabled>
              <span className="btn-icon">📝</span> Update Existing Resume <span className="coming-soon">(Coming Soon...)</span>
            </button>
          </div>
        </div>
        <div className="hero-right">
          <img src={airesume} alt="AI Resume Assistant" className="hero-illustration" />
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="features">
        <div className="feature">
          <div className="feature-icon">🤖</div>
          <div className="feature-title">AI Resume Generation</div>
          <div>Instantly create a professional, ATS-friendly resume tailored to your target job.</div>
        </div>
        <div className="feature">
          <div className="feature-icon">�</div>
          <div className="feature-title">Skill Gap Analysis</div>
          <div>See exactly what skills you need to improve for your dream role.</div>
        </div>
        <div className="feature">
          <div className="feature-icon">📚</div>
          <div className="feature-title">Personalized Learning</div>
          <div>Get 3-5 handpicked resources to close your skill gaps fast.</div>
        </div>
        <div className="feature">
          <div className="feature-icon">�</div>
          <div className="feature-title">Interview Q&A</div>
          <div>Practice with 5-7 likely questions and strong sample answers.</div>
        </div>
        <div className="feature">
          <div className="feature-icon">📄</div>
          <div className="feature-title">Easy Export</div>
          <div>Copy, print, or download your resume as PDF in one click.</div>
        </div>
      </div>

      {/* Testimonial/Trust Section */}
      <div className="homepage-testimonial">
        <div className="testimonial-quote">“This is the smartest resume tool I’ve ever used. I got more interviews in a week than in the last 3 months!”</div>
        <div className="testimonial-user">— Sridhara Sai Kaushik, Software Engineer</div>
      </div>

      {/* Footer */}
      <footer className="homepage-footer">
        <span>© {new Date().getFullYear()} AI Resume Assistant</span>
        {/* <a href="mailto:support@airesume.com">Contact Support</a> */}
      </footer>
    </>
  );
}
