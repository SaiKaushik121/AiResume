import { useNavigate } from "react-router-dom";
import './Header.css'


export default function CreateResume() {
   const navigate =  useNavigate();
  return (
    <>
      <header className="header-container">
        <div>
          <button className="back-btn" onClick={()=>navigate("/")}>&larr; Back to Home</button>
        </div>
        <div>Create Resume</div>
      </header>
      </>
  );
}
