import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Results() {
  // For PDF export
  const [downloading, setDownloading] = useState(false);

  // Helper: Convert resume section to rich text (HTML) for PDF
  function getResumeHTML() {
    if (!resumeData) return "";
    let html = `<div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto;">
      <h1 style='font-size:2em; font-weight:bold; margin-bottom:0.2em;'>${
        resumeData.contact?.name || ""
      }</h1>
      <div style='margin-bottom:0.5em;'>${resumeData.contact?.email || ""} | ${
      resumeData.contact?.phone || ""
    } | ${resumeData.contact?.location || ""}</div>
      <div style='margin-bottom:0.5em;'>${
        resumeData.contact?.linkedin
          ? `<a href='${resumeData.contact.linkedin}'>LinkedIn</a>`
          : ""
      } ${
      resumeData.contact?.portfolio
        ? `| <a href='${resumeData.contact.portfolio}'>Portfolio</a>`
        : ""
    }</div>
      <h2 style='font-size:1.2em; margin-top:1em;'>Professional Summary</h2>
      <div style='margin-bottom:1em;'>${resumeData.summary || ""}</div>
      <h2 style='font-size:1.2em; margin-top:1em;'>Skills</h2>
      <div style='margin-bottom:1em;'>${(resumeData.skills || [])
        .map(
          (s) =>
            `<span style='display:inline-block; background:#f3f3f3; border:1px solid #ccc; border-radius:12px; padding:2px 10px; margin:2px;'>${s.name}</span>`
        )
        .join(" ")}</div>
      <h2 style='font-size:1.2em; margin-top:1em;'>Education</h2>
      <ul style='margin-bottom:1em;'>${(resumeData.education || [])
        .map(
          (ed) =>
            `<li><b>${ed.degree}</b>, ${ed.university}${
              ed.cgpa
                ? ` <span style='color:#666;'>| CGPA: ${ed.cgpa}</span>`
                : ""
            } <span style='color:#888;'>${ed.dates}</span></li>`
        )
        .join("")}</ul>
      <h2 style='font-size:1.2em; margin-top:1em;'>Experience</h2>
      <ul style='margin-bottom:1em;'>${(resumeData.experience || [])
        .map(
          (exp) =>
            `<li><b>${exp.role}</b> <span style='color:#888;'>${
              exp.company
            } | ${exp.dates}</span><ul>${
              Array.isArray(exp.details)
                ? exp.details.map((d) => `<li>${d}</li>`).join("")
                : `<li>${exp.details}</li>`
            }</ul></li>`
        )
        .join("")}</ul>
      <h2 style='font-size:1.2em; margin-top:1em;'>Certifications</h2>
      <ul style='margin-bottom:1em;'>${(resumeData.certifications || [])
        .map(
          (cert) =>
            `<li><b>${cert.name}</b> - ${cert.organization} <span style='color:#888;'>${cert.date}</span></li>`
        )
        .join("")}</ul>
      <h2 style='font-size:1.2em; margin-top:1em;'>Projects</h2>
      <ul style='margin-bottom:1em;'>${(resumeData.projects || [])
        .map(
          (proj) =>
            `<li><b>${proj.name}</b> <span style='color:#888;'>${
              proj.technologies
            }</span><div>${proj.description}</div>${
              proj.github ? `<a href='${proj.github}'>GitHub</a>` : ""
            } ${proj.demo ? `<a href='${proj.demo}'>Demo</a>` : ""}</li>`
        )
        .join("")}</ul>
    </div>`;
    return html;
  }

  // Copy resume section to clipboard as plain text
  function handleCopyResume() {
    if (!resumeData) return;
    let text = `${resumeData.contact?.name || ""}\n${
      resumeData.contact?.email || ""
    } | ${resumeData.contact?.phone || ""} | ${
      resumeData.contact?.location || ""
    }\n${
      resumeData.contact?.linkedin
        ? "LinkedIn: " + resumeData.contact.linkedin
        : ""
    } ${
      resumeData.contact?.portfolio
        ? "| Portfolio: " + resumeData.contact.portfolio
        : ""
    }\n\nProfessional Summary\n${resumeData.summary || ""}\n\nSkills: ${(
      resumeData.skills || []
    ).join(", ")}\n\nEducation:\n${(resumeData.education || [])
      .map(
        (ed) =>
          `${ed.degree}, ${ed.university}${
            ed.cgpa ? ` | CGPA: ${ed.cgpa}` : ""
          } (${ed.dates})`
      )
      .join("\n")}\n\nExperience:\n${(resumeData.experience || [])
      .map(
        (exp) =>
          `${exp.role} at ${exp.company} (${exp.dates})\n${
            Array.isArray(exp.details)
              ? exp.details.map((d) => "- " + d).join("\n")
              : "- " + exp.details
          }`
      )
      .join("\n\n")}\n\nCertifications:\n${(resumeData.certifications || [])
      .map((cert) => `${cert.name} - ${cert.organization} (${cert.date})`)
      .join("\n")}\n\nProjects:\n${(resumeData.projects || [])
      .map(
        (proj) =>
          `${proj.name} - ${proj.technologies}\n${proj.description}\n${
            proj.github ? "GitHub: " + proj.github : ""
          } ${proj.demo ? "Demo: " + proj.demo : ""}`
      )
      .join("\n\n")}`;
    navigator.clipboard.writeText(text);
    alert("Resume copied to clipboard!");
  }

  // Download resume section as PDF (rich text)
  async function handleDownloadPDF() {
    setDownloading(true);
    const html = getResumeHTML();
    // Use browser print to PDF for simplicity (no extra dependency)
    const printWindow = window.open("", "", "width=900,height=1200");
    printWindow.document.write(
      `<!DOCTYPE html><html><head><title>Resume</title></head><body>${html}</body></html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setTimeout(() => {
      printWindow.close();
      setDownloading(false);
    }, 1000);
  }
  const location = useLocation();
  const navigate = useNavigate();
  const { resume } = location.state || {};

  // If using new Gemini JSON structure, resume is the full object
  const resumeData = resume?.resume;
  const skillGap = resume?.skill_gap_analysis;
  const learningResources = resume?.learning_resources;
  const interviewQA = resume?.interview_qa;

  return (
    <>
      <Header />
      {/* Top action bar */}
      <div className="flex flex-col items-center md:flex-row md:items-center md:justify-center gap-6 mt-8 mb-6">
        <button
          onClick={() => navigate("/jobdesc")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-5 rounded shadow"
        >
          &larr; Back to Edit
        </button>
        <button
          onClick={handleCopyResume}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-5 rounded shadow"
        >
          Copy Resume to Clipboard
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded shadow ${
            downloading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={downloading}
        >
          {downloading ? "Preparing PDF..." : "Download Resume as PDF"}
        </button>
      </div>
      {/* PDF instruction */}
      <div className="mb-4 text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded px-4 py-2 max-w-2xl mx-auto flex items-center gap-2">
        <span role="img" aria-label="info">
          ℹ️
        </span>
        For best results, when saving as PDF,{" "}
        <b>uncheck "Headers and Footers"</b> in the print dialog.
      </div>
      <div className="bg-gray-50 rounded-md p-4 sm:p-6 md:p-8 lg:p-10 mb-8">
        {/* Success Message */}
        <div className="bg-green-100 border border-green-300 text-green-900 rounded-md px-4 sm:px-6 py-3 sm:py-4 mb-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center text-center">
          <span role="img" aria-label="party" className="text-2xl">
            🎉
          </span>
          <div className="text-center">
            <div className="font-bold text-lg">
              Your Career Package is Ready!
            </div>
            <div>
              AI has created your resume, learning resources, and interview prep
            </div>
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">
          Generated Resume
        </h1>
        {/* Resume Section */}
        <div className="bg-white p-4 sm:p-6 rounded-md shadow text-left mb-8 overflow-x-auto">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 tracking-wide border-b pb-2">
            Resume
          </h2>
          {/* Contact */}
          {resumeData?.contact && (
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="text-lg sm:text-2xl font-bold tracking-wide">
                  {resumeData.contact.name}
                </span>
                <span className="text-gray-700 text-sm sm:text-base">
                  {resumeData.contact.email} | {resumeData.contact.phone}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm mt-1 gap-1">
                <span>{resumeData.contact.location}</span>
                <span>
                  {resumeData.contact.linkedin && (
                    <a
                      href={resumeData.contact.linkedin}
                      className="text-blue-600 underline mr-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                  {resumeData.contact.portfolio && (
                    <a
                      href={resumeData.contact.portfolio}
                      className="text-blue-600 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Portfolio
                    </a>
                  )}
                </span>
              </div>
            </div>
          )}
          {/* Summary */}
          {resumeData?.summary && (
            <div className="mb-4">
              <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                Professional Summary
              </div>
              <div className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {resumeData.summary}
              </div>
            </div>
          )}
          {/* Skills */}
          {Array.isArray(resumeData?.skills) &&
            resumeData.skills.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  Skills
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 border border-gray-300 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm text-gray-800 whitespace-nowrap"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          {/* Education */}
          {Array.isArray(resumeData?.education) &&
            resumeData.education.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  Education
                </div>
                <ul className="space-y-1">
                  {resumeData.education.map((ed, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm"
                    >
                      <span>
                        <span className="font-semibold">{ed.degree}</span>,{" "}
                        {ed.university}
                        {ed.cgpa && (
                          <span className="ml-2 text-gray-600">
                            | CGPA: {ed.cgpa}
                          </span>
                        )}
                      </span>
                      <span className="text-gray-500">{ed.dates}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {/* Experience */}
          {Array.isArray(resumeData?.experience) &&
            resumeData.experience.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  Experience
                </div>
                <ul className="space-y-3">
                  {resumeData.experience.map((exp, i) => (
                    <li key={i}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm">
                        <span className="font-semibold">{exp.role}</span>
                        <span className="text-gray-500">
                          {exp.company} | {exp.dates}
                        </span>
                      </div>
                      {Array.isArray(exp.details) ? (
                        <ul className="list-disc ml-4 sm:ml-6 text-gray-700 mt-1 space-y-1">
                          {exp.details.map((d, j) => (
                            <li key={j}>{d}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="ml-2 text-gray-700">{exp.details}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {/* Certifications */}
          {Array.isArray(resumeData?.certifications) &&
            resumeData.certifications.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  Certifications
                </div>
                <ul className="space-y-1">
                  {resumeData.certifications.map((cert, i) => (
                    <li
                      key={i}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm"
                    >
                      <span>
                        <span className="font-semibold">{cert.name}</span> -{" "}
                        {cert.organization}
                      </span>
                      <span className="text-gray-500">{cert.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          {/* Projects */}
          {Array.isArray(resumeData?.projects) &&
            resumeData.projects.length > 0 && (
              <div className="mb-4">
                <div className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">
                  Projects
                </div>
                <ul className="space-y-2">
                  {resumeData.projects.map((proj, i) => (
                    <li key={i}>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs sm:text-sm">
                        <span className="font-semibold">{proj.name}</span>
                        <span className="text-gray-500">
                          {proj.technologies}
                        </span>
                      </div>
                      <div className="ml-2 text-gray-700">
                        {proj.description}
                      </div>
                      <div className="ml-2 mt-1">
                        {proj.github && (
                          <a
                            href={proj.github}
                            className="text-blue-600 underline mr-2"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub
                          </a>
                        )}
                        {proj.demo && (
                          <a
                            href={proj.demo}
                            className="text-blue-600 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Demo
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* Skill Gap Analysis */}
        <div className="bg-white p-4 sm:p-6 rounded-md shadow text-left mb-8 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Skill Gap Analysis
          </h2>
          {Array.isArray(skillGap) && skillGap.length > 0 ? (
            <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-xs sm:text-sm">
              {skillGap.map((gap, i) => (
                <li key={i}>
                  <span className="font-semibold">{gap.skill}:</span>{" "}
                  {gap.suggestion}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">
              No skill gap analysis available.
            </div>
          )}
        </div>

        {/* Learning Resources */}
        <div className="bg-white p-4 sm:p-6 rounded-md shadow text-left mb-8 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Learning Resources
          </h2>
          {Array.isArray(learningResources) && learningResources.length > 0 ? (
            <ul className="list-disc pl-4 sm:pl-6 text-gray-700 text-xs sm:text-sm">
              {learningResources.map((res, i) => (
                <li key={i} className="mb-2">
                  <div className="font-semibold">{res.title}</div>
                  <div>
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-all"
                    >
                      {res.link}
                    </a>
                  </div>
                  {res.alternative && (
                    <div className="text-gray-500">
                      Alternative: {res.alternative}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">
              No learning resources available.
            </div>
          )}
        </div>

        {/* Interview Q&A */}
        <div className="bg-white p-4 sm:p-6 rounded-md shadow text-left mb-8 overflow-x-auto">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Interview Q&amp;A
          </h2>
          {Array.isArray(interviewQA) && interviewQA.length > 0 ? (
            <div className="space-y-4 text-xs sm:text-sm">
              {interviewQA.map((qa, i) => (
                <div key={i} className="mb-2">
                  <p className="font-semibold text-gray-800">
                    Q{i + 1}: {qa.question}
                  </p>
                  <p className="text-gray-700">A: {qa.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">No interview Q&amp;A available.</div>
          )}
        </div>

        {/* No resume data fallback */}
        {!resumeData && (
          <p>No resume data available. Please go back and generate one.</p>
        )}
      </div>
      {/* Bottom action bar */}
      <div className="flex flex-col items-center justify-center gap-4 mt-8 mb-4 sm:flex-row">
        <button
          onClick={() => navigate("/jobdesc")}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded shadow w-full sm:w-auto"
        >
          &larr; Back to Edit
        </button>
      </div>
    </>
  );
}
