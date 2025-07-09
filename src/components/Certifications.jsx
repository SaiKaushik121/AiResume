import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import "../UI/Input.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Certifications() {
  const navigate = useNavigate();

  // State for different sections
  const [certifications, setCertifications] = useState([
    { name: "", organization: "", date: "", credentialId: "", expiryDate: "" }
  ]);

  const [awards, setAwards] = useState([
    { name: "", organization: "", date: "", description: "" }
  ]);

  const [projects, setProjects] = useState([
    { name: "", technologies: "", description: "", githubLink: "", demoLink: "" }
  ]);

  // Load from localStorage if available
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("resume_data"));
    if (saved && saved.certificationsInfo) {
      setCertifications(saved.certificationsInfo.certifications || [
        { name: "", organization: "", date: "", credentialId: "", expiryDate: "" }
      ]);
      setAwards(saved.certificationsInfo.awards || [
        { name: "", organization: "", date: "", description: "" }
      ]);
      setProjects(saved.certificationsInfo.projects || [
        { name: "", technologies: "", description: "", githubLink: "", demoLink: "" }
      ]);
    }
  }, []);

  // Handle changes for certifications
  function handleCertificationChange(index, field, value) {
    setCertifications((prev) =>
      prev.map((cert, i) => (i === index ? { ...cert, [field]: value } : cert))
    );
  }

  // Handle changes for awards
  function handleAwardChange(index, field, value) {
    setAwards((prev) =>
      prev.map((award, i) => (i === index ? { ...award, [field]: value } : award))
    );
  }

  // Handle changes for projects
  function handleProjectChange(index, field, value) {
    setProjects((prev) =>
      prev.map((project, i) => (i === index ? { ...project, [field]: value } : project))
    );
  }

  // Add/Remove functions for certifications
  function addCertification() {
    setCertifications((prev) => [
      ...prev,
      { name: "", organization: "", date: "", credentialId: "", expiryDate: "" }
    ]);
  }

  function removeCertification(idx) {
    setCertifications((prev) => prev.filter((_, i) => i !== idx));
  }

  // Add/Remove functions for awards
  function addAward() {
    setAwards((prev) => [
      ...prev,
      { name: "", organization: "", date: "", description: "" }
    ]);
  }

  function removeAward(idx) {
    setAwards((prev) => prev.filter((_, i) => i !== idx));
  }

  // Add/Remove functions for projects
  function addProject() {
    setProjects((prev) => [
      ...prev,
      { name: "", technologies: "", description: "", githubLink: "", demoLink: "" }
    ]);
  }

  function removeProject(idx) {
    setProjects((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const certificationsInfo = {
      certifications,
      awards,
      projects,
    };

    const existing = JSON.parse(localStorage.getItem("resume_data")) || {};
    const updated = {
      ...existing,
      resumetype: "new",
      certificationsInfo,
    };

    localStorage.setItem("resume_data", JSON.stringify(updated));
    navigate("/jobdesc");
  }

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 max-w-4xl mx-auto mt-4"
      >
        <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 text-gray-800">
          Certifications, Awards & Projects
        </h2>

        {/* Certifications Section */}
        <div className="mb-8">
          <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-gray-800">
            Certifications (Optional)
          </h3>
          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-gray-50 rounded-md p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                  Certification {certifications.length > 1 ? `#${idx + 1}` : ""}
                </h4>
                {certifications.length > 1 && idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(idx)}
                    className="ml-0 sm:ml-4 text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm px-2 py-1 border border-red-300 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="AWS Certified Solutions Architect"
                  type="text"
                  name={`cert-name-${idx}`}
                  label="Certification Name"
                  maxLength={200}
                  required={false}
                  value={cert.name}
                  onChange={(e) => handleCertificationChange(idx, "name", e.target.value)}
                />
                <Input
                  placeholder="Amazon Web Services"
                  type="text"
                  name={`cert-org-${idx}`}
                  label="Issuing Organization"
                  maxLength={200}
                  required={false}
                  value={cert.organization}
                  onChange={(e) => handleCertificationChange(idx, "organization", e.target.value)}
                />
                <Input
                  placeholder="MM/YYYY"
                  type="month"
                  name={`cert-date-${idx}`}
                  label="Date Obtained"
                  required={false}
                  value={cert.date}
                  onChange={(e) => handleCertificationChange(idx, "date", e.target.value)}
                />
                <Input
                  placeholder="AWS-123456"
                  type="text"
                  name={`cert-id-${idx}`}
                  label="Credential ID (Optional)"
                  maxLength={100}
                  required={false}
                  value={cert.credentialId}
                  onChange={(e) => handleCertificationChange(idx, "credentialId", e.target.value)}
                />
                <Input
                  placeholder="MM/YYYY"
                  type="month"
                  name={`cert-expiry-${idx}`}
                  label="Expiry Date (Optional)"
                  required={false}
                  value={cert.expiryDate}
                  onChange={(e) => handleCertificationChange(idx, "expiryDate", e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end mb-6 gap-2">
            <button
              type="button"
              onClick={addCertification}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
            >
              Add Certification
            </button>
          </div>
        </div>

        {/* Awards Section */}
        <div className="mb-8">
          <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-gray-800">
            Awards & Achievements (Optional)
          </h3>
          {awards.map((award, idx) => (
            <div key={idx} className="bg-gray-50 rounded-md p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                  Award {awards.length > 1 ? `#${idx + 1}` : ""}
                </h4>
                {awards.length > 1 && idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeAward(idx)}
                    className="ml-0 sm:ml-4 text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm px-2 py-1 border border-red-300 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Employee of the Year"
                  type="text"
                  name={`award-name-${idx}`}
                  label="Award Name"
                  maxLength={200}
                  required={false}
                  value={award.name}
                  onChange={(e) => handleAwardChange(idx, "name", e.target.value)}
                />
                <Input
                  placeholder="Company Name"
                  type="text"
                  name={`award-org-${idx}`}
                  label="Issuing Organization"
                  maxLength={200}
                  required={false}
                  value={award.organization}
                  onChange={(e) => handleAwardChange(idx, "organization", e.target.value)}
                />
                <Input
                  placeholder="MM/YYYY"
                  type="month"
                  name={`award-date-${idx}`}
                  label="Date Received"
                  required={false}
                  value={award.date}
                  onChange={(e) => handleAwardChange(idx, "date", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block font-medium text-gray-600 mb-2 text-xs sm:text-sm">
                  Description (Optional)
                </label>
                <textarea
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                  placeholder="Brief description of the award and why it was received..."
                  rows={3}
                  maxLength={500}
                  value={award.description}
                  onChange={(e) => handleAwardChange(idx, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end mb-6 gap-2">
            <button
              type="button"
              onClick={addAward}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
            >
              Add Award
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h3 className="text-base sm:text-xl font-bold mb-2 sm:mb-4 text-gray-800">
            Projects (Optional)
          </h3>
          {projects.map((project, idx) => (
            <div key={idx} className="bg-gray-50 rounded-md p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2">
                <h4 className="text-sm sm:text-lg font-semibold text-gray-700">
                  Project {projects.length > 1 ? `#${idx + 1}` : ""}
                </h4>
                {projects.length > 1 && idx !== 0 && (
                  <button
                    type="button"
                    onClick={() => removeProject(idx)}
                    className="ml-0 sm:ml-4 text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm px-2 py-1 border border-red-300 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="E-commerce Website"
                  type="text"
                  name={`project-name-${idx}`}
                  label="Project Name"
                  maxLength={200}
                  required={false}
                  value={project.name}
                  onChange={(e) => handleProjectChange(idx, "name", e.target.value)}
                />
                <Input
                  placeholder="React, Node.js, MongoDB"
                  type="text"
                  name={`project-tech-${idx}`}
                  label="Technologies Used"
                  maxLength={200}
                  required={false}
                  value={project.technologies}
                  onChange={(e) => handleProjectChange(idx, "technologies", e.target.value)}
                />
                <Input
                  placeholder="https://github.com/username/project"
                  type="url"
                  name={`project-github-${idx}`}
                  label="GitHub Link (Optional)"
                  maxLength={255}
                  required={false}
                  value={project.githubLink}
                  onChange={(e) => handleProjectChange(idx, "githubLink", e.target.value)}
                />
                <Input
                  placeholder="https://project-demo.com"
                  type="url"
                  name={`project-demo-${idx}`}
                  label="Live Demo Link (Optional)"
                  maxLength={255}
                  required={false}
                  value={project.demoLink}
                  onChange={(e) => handleProjectChange(idx, "demoLink", e.target.value)}
                />
              </div>
              <div className="mt-4">
                <label className="block font-medium text-gray-600 mb-2 text-xs sm:text-sm">
                  Project Description
                </label>
                <textarea
                  className="w-full p-2 sm:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-sm"
                  placeholder="Describe what the project does, your role, key features, and outcomes..."
                  rows={4}
                  maxLength={1000}
                  value={project.description}
                  onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                />
              </div>
            </div>
          ))}
          <div className="flex justify-end mb-6 gap-2">
            <button
              type="button"
              onClick={addProject}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
            >
              Add Project
            </button>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
            type="button"
            onClick={() => navigate("/skills")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded w-full sm:w-auto"
          >
            &larr; Back to Skills
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