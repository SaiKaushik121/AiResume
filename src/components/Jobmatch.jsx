import { useNavigate } from "react-router-dom";
import "../UI/Input.css";
import Header from "./Header";
import { useEffect, useState } from "react";
import { genrateWithGemini } from "../api/gemini";

export default function Jobmatch() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [initial, setInitial] = useState({
    jd: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('resume_data'));
    if (saved && saved.jobdesc) {
      setInitial({
        jd: saved.jobdesc.jd
      });
    }
  }, []);

  function handleChange(e) {
    setInitial((prev) => ({ ...prev, jd: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setVisible(true);

    const jd = initial.jd;
    const existing = JSON.parse(localStorage.getItem('resume_data'));
    const jobdesc = { jd };
    const updated = {
      ...existing,
      resumeType: 'new',
      jobdesc
    };
    localStorage.setItem('resume_data', JSON.stringify(updated));

    const finalData = JSON.parse(localStorage.getItem('resume_data'));
    console.log("Final Data is ",finalData);

    try {
      const resume = await genrateWithGemini(finalData);
      console.log("Resume from functin inside jobMatch is "+resume)
      navigate("/results", { state: { resume } });
    } catch (error) {
      console.error("Error generating resume:", error);
      // Optionally, show an error message to the user
      setVisible(false);
    }
  }

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 max-w-2xl mx-auto mt-4">
        <div className="bg-gray-50 rounded-md p-4 sm:p-6 mb-8">
          <label
            htmlFor="jd"
            className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800 flex items-center gap-2"
          >
            Target Job Description
            <span className="text-gray-500 text-xs sm:text-base font-normal ml-2">(Optional, but recommended for a tailored resume)</span>
          </label>
          <textarea
            id="jd"
            name="jd"
            rows={10}
            placeholder="Paste the job description you're applying for here. Leave blank for a general resume. This helps AI tailor your resume and generate relevant interview questions."
            className="input resize-y min-h-[100px] max-h-[300px] text-xs sm:text-sm"
            value={initial.jd}
            onChange={handleChange}
            disabled={visible}
            minLength={0}
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate("/certifications")}
            className={`bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-l ${visible ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400 cursor-pointer'}`}
            disabled={visible}
          >
            &larr; Back to Certifications...
          </button>

          <button
            className={`bg-blue-500 text-white font-medium py-2 px-4 rounded ${visible ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 cursor-pointer'}`}
            type="submit"
            disabled={visible}
          >
            {visible ? 'Generating...' : 'Generate Resume'}
          </button>
        </div>
      </form>
    </>
  );
}