import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import "../UI/Input.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Education() {
  const navigate = useNavigate();

  const [intial, setIntial] = useState([
    { degree: "", university: "", startDate: "", endDate: "", cgpa: "" },
  ]);

  function addEducation() {
    setIntial((prev) => [
      ...prev,
      { degree: "", university: "", startDate: "", endDate: "", cgpa: "" },
    ]);
  }

  function removeEducation(idx) {
    setIntial((prev) => prev.filter((_, i) => i !== idx));
  }

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume_data"));
    if (saved && saved.educationinfo) {
      setIntial(
        saved.educationinfo.intial || [
          { degree: "", university: "", startDate: "", endDate: "" },
        ]
      );
    }
  }, []);

  function handleChange(index, e) {
    const { name, value } = e.target;
    setIntial((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [name]: value } : item))
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const educationinfo = {
      intial,
    };

    const existing = JSON.parse(localStorage.getItem("resume_data")) || {};

    const updated = {
      ...existing,
      resumetype: "new",
      educationinfo,
    };

    localStorage.setItem("resume_data", JSON.stringify(updated));

    // next page

    navigate("/skills");
  }

  return (
    <>
      <Header />
      <div className="max-w-3xl w-full mx-auto px-2 sm:px-4">
        <form onSubmit={handleSubmit} className="form-section bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mt-4">
          {intial.map((fields, index) => (
            <div key={index} className="bg-gray-50 rounded-md p-4 sm:p-6 mb-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800">
                  Education {intial.length > 1 && `#${index + 1}`}
                </h2>
                {intial.length > 1 && index !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="ml-0 sm:ml-4 text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm px-2 py-1 border border-red-300 rounded"
                    aria-label="Remove this education"
                  >
                    Remove
                  </button>
                )}
              </div>
              <Input
                placeholder="Bachelor of science in Computer Science"
                type="text"
                name="degree"
                label="Degree *"
                minLength={3}
                maxLength={200}
                value={fields.degree}
                onChange={(e) => handleChange(index, e)}
              />
              <Input
                placeholder="University or College Name"
                type="text"
                name="university"
                label="Institution *"
                minLength={5}
                maxLength={255}
                value={fields.university}
                onChange={(e) => handleChange(index, e)}
              />
              <Input
                placeholder="MM/YYYY"
                type="month"
                name="startDate"
                label="Start Date *"
                value={fields.startDate}
                onChange={(e) => handleChange(index, e)}
              />
              <Input
                placeholder="MM/YYYY"
                type="month"
                name="endDate"
                label="End Date (Leave empty if currently studying)"
                value={fields.endDate}
                onChange={(e) => handleChange(index, e)}
                required={false}
              />
              <Input
                placeholder="e.g. 8.5 or 75%"
                type="text"
                name="cgpa"
                label="CGPA / Percentage (Optional)"
                value={fields.cgpa}
                onChange={(e) => handleChange(index, e)}
                required={false}
                maxLength={20}
              />
            </div>
          ))}

          <div className="flex justify-end mb-8 gap-2">
            <button
              type="button"
              onClick={addEducation}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
            >
              Add More Education
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-2">
            <button
              type="button"
              onClick={() => navigate("/personal")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-l w-full sm:w-auto"
            >
              &larr; Back to Personal Details
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full sm:w-auto"
              type="submit"
            >
              Next Step &rarr;
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
