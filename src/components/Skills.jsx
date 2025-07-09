import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import "../UI/Input.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Skills() {
  const navigate = useNavigate();

  // Technical skills
  const [skills, setSkills] = useState("");

  // Work experiences as an array
  const [experiences, setExperiences] = useState([
    { company: "", role: "", startDate: "", endDate: "", duties: "" }
  ]);

  // Load from localStorage if available
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume_data"));
    if (saved && saved.skillInfo) {
      setSkills(saved.skillInfo.skills || "");
      setExperiences(saved.skillInfo.experiences || [
        { company: "", role: "", startDate: "", endDate: "", duties: "" }
      ]);
    }
  }, []);

  function handleExpChange(idx, field, value) {
    setExperiences((prev) =>
      prev.map((exp, i) => (i === idx ? { ...exp, [field]: value } : exp))
    );
  }


  function addExperience() {
    setExperiences((prev) => [
      ...prev,
      { company: "", role: "", startDate: "", endDate: "", duties: "" }
    ]);
  }

  function removeExperience(idx) {
    setExperiences((prev) => prev.filter((item, i) => i !== idx));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const skillInfo = {
      skills,
      experiences,
    };
    const existing = JSON.parse(localStorage.getItem("resume_data")) || {};
    const updated = {
      ...existing,
      resumetype: "new",
      skillInfo,
    };
    localStorage.setItem("resume_data", JSON.stringify(updated));
    // You can navigate to the next step here if needed

    navigate("/certifications")
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 max-w-2xl mx-auto mt-4"
      >
        <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800">
          Skills and Experience
        </h2>

        {/* Technical Skills Section */}
        <div className="bg-gray-50 rounded-md p-4 sm:p-6 mb-8">
          <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-gray-800">
            Technical Skills *
          </h3>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-600 text-xs sm:text-sm" htmlFor="skills">
              List your technical skills
            </label>
            <textarea
              id="skills"
              name="skills"
              className="input resize-y min-h-[100px] max-h-[300px] text-xs sm:text-sm"
              placeholder="Python, JavaScript, React, Node.js, MySQL, Git, AWS"
              minLength={3}
              maxLength={500}
              rows={4}
              required
              value={skills}
              onChange={e => setSkills(e.target.value)}
            />
          </div>
        </div>

        {/* Work Experience Section */}
        {experiences.map((exp, idx) => (
          <div key={idx} className="bg-gray-50 rounded-md p-4 sm:p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
              <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Work Experience {experiences.length > 1 ? `#${idx + 1}` : "(Optional)"}</h3>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(idx)}
                  className="ml-0 sm:ml-4 text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm px-2 py-1 border border-red-300 rounded"
                  aria-label="Remove this experience"
                >
                  Remove
                </button>
              )}
            </div>
            <Input
              placeholder="Company Name"
              type="text"
              name={`company-${idx}`}
              label="Company Name"
              minLength={2}
              maxLength={255}
              required={false}
              value={exp.company}
              onChange={e => handleExpChange(idx, "company", e.target.value)}
            />
            <Input
              placeholder="Your Role/Title"
              type="text"
              name={`role-${idx}`}
              label="Role/Title"
              minLength={2}
              maxLength={100}
              required={false}
              value={exp.role}
              onChange={e => handleExpChange(idx, "role", e.target.value)}
            />
            <Input
              placeholder="MM/YYYY"
              type="month"
              name={`startDate-${idx}`}
              label="Start Date"
              required={false}
              value={exp.startDate}
              onChange={e => handleExpChange(idx, "startDate", e.target.value)}
            />
            <Input
              placeholder="MM/YYYY"
              type="month"
              name={`endDate-${idx}`}
              label="End Date (Leave empty if currently working here)"
              required={false}
              value={exp.endDate}
              onChange={e => handleExpChange(idx, "endDate", e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <label
                className="flex font-medium text-gray-600 justify-start gap-1"
                htmlFor={`duties-${idx}`}
              >
                List your Responsibilities/Job Duties
              </label>
              <textarea
                id={`duties-${idx}`}
                name={`duties-${idx}`}
                className="input resize-y min-h-[100px] max-h-[300px]"
                placeholder="creating reports, communicating with customers, problem-solving, and managing teams"
                minLength={3}
                maxLength={1000}
                rows={4}
                required={false}
                value={exp.duties}
                onChange={e => handleExpChange(idx, "duties", e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end mb-8 gap-2">
          <button
            type="button"
            onClick={addExperience}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
          >
            Add More Experience
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate("/education")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-l w-full sm:w-auto"
          >
            &larr; Back to Education
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full sm:w-auto"
            type="submit"
          >
            Next Step &rarr;
          </button>
        </div>
      </form>
    </>
  );
}
