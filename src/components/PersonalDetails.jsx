import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import "../UI/Input.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function PersonalDetails() {
  const [intial, setIntial] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    portfolio: "",
    dob: "",
    summary: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume_data"));
    if (saved && saved.personalInfo) {
      setIntial({
        name: saved.personalInfo.name || "",
        email: saved.personalInfo.email || "",
        phone: saved.personalInfo.phone || "",
        location: saved.personalInfo.location || "",
        linkedin: saved.personalInfo.linkedin || "",
        portfolio: saved.personalInfo.portfolio || "",
        dob: saved.personalInfo.dob || "",
        summary: saved.personalInfo.summary || "",
      });
    }
  }, []);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("Full Name");
    const email = formData.get("Email");
    const phone = formData.get("phone number");
    const location = formData.get("location");
    const linkedin = formData.get("linkedin");
    const portfolio = formData.get("portfolio");
    const dob = formData.get("dob");
    const summary = formData.get("summary");

    const personalInfo = {
      name,
      email,
      phone,
      location,
      linkedin,
      portfolio,
      dob,
      summary,
    };

    //saving to local storage

    const existing = JSON.parse(localStorage.getItem("resume_data")) || {};
    const updated = {
      ...existing,
      resumeType: "new",
      personalInfo,
    };
    localStorage.setItem("resume_data", JSON.stringify(updated));

    // need to add next page logiin in here
    navigate("/education");

    //event.preventDefault()
  }

  return (
    <>
      {/*<Progress></Progress>*/}
      <Header />
      <div className="max-w-3xl w-full mx-auto px-2 sm:px-4">
        <form onSubmit={handleSubmit} className="form-section bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          <h2 className="form-heading text-xl sm:text-2xl font-bold mb-6 text-gray-800">Personal Information</h2>
          <Input
            placeholder="Your Full Name"
            type="text"
            name="Full Name"
            label="Full Name *"
            minLength={3}
            maxLength={100}
            defaultValue={intial.name}
          ></Input>
          <Input
            placeholder="example@email.com"
            type="email"
            name="Email"
            label="Email *"
            minLength={10}
            maxLength={255}
            defaultValue={intial.email}
          ></Input>
          <Input
            placeholder="(123) 456-7890"
            minLength={10}
            maxLength={15}
            type="tel"
            name="phone number"
            label="Phone Number *"
            className="input w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            defaultValue={intial.phone}
          ></Input>
          <Input
            placeholder="City, State and Pincode"
            type="text"
            name="location"
            label="Location *"
            minLength={5}
            maxLength={100}
            defaultValue={intial.location}
          ></Input>

          {/* Optional Fields */}
          <Input
            placeholder="https://linkedin.com/in/yourprofile"
            type="url"
            name="linkedin"
            label="LinkedIn Profile (Optional)"
            maxLength={255}
            defaultValue={intial.linkedin}
            required = {false}
          ></Input>

          <Input
            placeholder="https://yourportfolio.com"
            type="url"
            name="portfolio"
            label="Portfolio/Website (Optional)"
            maxLength={255}
            defaultValue={intial.portfolio}
            required = {false}
          ></Input>

          <Input
            placeholder="MM/DD/YYYY"
            type="date"
            name="dob"
            label="Date of Birth (Optional)"
            defaultValue={intial.dob}
            required = {false}
          ></Input>

          <Input
            placeholder="Experienced professional with expertise in [your field]. Skilled in [key skills]. Seeking opportunities to [your goal]."
            type="textarea"
            name="summary"
            label="Professional Summary/Objective (Optional)"
            maxLength={500}
            defaultValue={intial.summary}
            required = {false}
          ></Input>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto mt-4"
            type="submit"
          >
            Next Step &rarr;
          </button>
        </form>
      </div>
    </>
  );
}
