# AI Resume Builder

A modern, fully responsive AI-powered resume builder built with **React**, **Vite**, and **Google Gemini API**. Generate tailored resumes, identify skill gaps, get personalized learning resources, and prep for interviews — all in one place.

---

## 🎯 Project Goal & What Makes This Different

While tools like ChatGPT can generate resumes with the right prompts, this project aims to **streamline and automate the entire job application prep process** for real users—not just prompt engineers.

**What sets this AI Resume Builder apart:**
- **No prompt engineering required:** Users simply fill out forms; the app handles all the AI prompting logic behind the scenes.
- **Multi-step, structured workflow:** Instead of a single prompt, the app sends a series of targeted prompts to Gemini:
  1. **Resume Generation:** Tailors your resume to your job description.
  2. **Skill Gap Analysis:** Identifies what you’re missing for the target role.
  3. **Learning Resources:** Suggests free, relevant resources to close those gaps.
  4. **Interview Q&A:** Generates likely interview questions and strong sample answers.
- **Seamless UI:** All results are organized, clearly labeled, and visually separated between user and AI-generated content.
- **Persistence & Editing:** Your data is saved, editable, and reusable—unlike a one-off chat session.

**Goal:**  
To make AI-powered career prep accessible, structured, and actionable for everyone—no prompt writing, no copy-paste, just results.

---


## ✨ Features

- 🚀 **Multi-Step Form:** Personal Info, Education, Skills, Certifications, Job Match — all split into smooth, responsive steps.
- ➕ **Dynamic Sections:** Add/remove entries for Education, Certifications, Projects, and Awards.
- 🧠 **AI Integration:** Generates a full resume, skill gap analysis, learning resources, and interview Q&A using Gemini.
- 🧾 **AI vs User Content:** Clearly separates user-input data from AI-generated results.
- 📱 **Mobile-First Design:** Fully responsive layout with clean spacing and layout consistency.
- 💾 **Local Storage Persistence:** Auto-saves user input across sessions.
- 🔁 **Step Navigation:** Easily go back and forth between steps. Buttons are always accessible.
- 📋 **Copy & Download:** Resume can be copied to clipboard or downloaded as PDF (in-progress).

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Gemini API Key from [Google AI Studio](https://makersuite.google.com/app)

### Installation

```bash
npm install
# or
yarn install
Run Locally

npm run dev
# or
yarn dev
App runs at http://localhost:5173

🛠 Tech Stack
Frontend: React 19 + Vite

Styling: Tailwind CSS

AI Engine: gemini-2.5-flash-lite-preview-06-17

Data Persistence: localStorage

Routing: React Router

PDF Export: html2pdf / jspdf (in progress)

🧾 Data Model
The app stores user progress in localStorage under the key resume_data:

json
{
  "personalInfo": {
    "name": "John",
    "email": "...",
    "phone": "...",
    "location": "...",
    "dob": "yyyy-mm-dd",
    "linkedin": "linkedin URL",
    "portfolio": "Portfolio URL",
    "summary": "Professional summary here..."
  },
  "educationinfo": {
    "intial": [
      { "degree": "B.Tech", "university": "XYZ", "startDate": "2016-08", "endDate": "2020-06", "cgpa": "8.5" }
    ]
  },
  "skillsinfo": {
    "skills": ["React", "Selenium", "Java"]
  },
  "certificationsInfo": {
    "certifications": [
      { "name": "AWS Certified", "organization": "Amazon", "date": "2023-05", "credentialId": "AWS-123456", "expiryDate": "2026-05" }
    ],
    "awards": [
      { "name": "Employee of the Year", "organization": "Capgemini", "date": "2022-12", "description": "For outstanding performance." }
    ],
    "projects": [
      { "name": "E-commerce Website", "technologies": "React, Node.js", "description": "Built a scalable e-commerce platform.", "githubLink": "https://github.com/username/project", "demoLink": "https://project-demo.com" }
    ]
  },
  "jobdesc": {
    "jd": "Paste of job description here..."
  },
  "aiResults": {
    "resume": "...",
    "skillGapAnalysis": ["..."],
    "learningResources": ["..."],
    "interviewQA": ["..."]
  }
}
🧠 AI Prompt Logic
Gemini receives a structured prompt containing:

User profile and job description

Instructions to:

✅ Generate a clean, ATS-friendly resume

✅ Identify missing skills

✅ Suggest free learning tools

✅ Provide interview Q&A

AI Output is streamed and parsed into labeled sections:

## Resume

## Skill Gap Analysis

## Learning Resources

## Interview Q&A

Powered by the @google/genai SDK.

🙌 AI + Developer Collaboration
This project was self-built and AI-assisted. AI was used to:

Draft and iterate on the Gemini prompt

Suggest logic for parsing, saving, and formatting resume data

Speed up repetitive UI code (copy to clipboard, download features)

All architecture, data flow, UI structure, and integration work was done by the developer.

🤝 Contributing
Fork the repo

Create a new branch (git checkout -b feature/your-feature)

Commit your changes (git commit -am 'Add feature')

Push (git push origin feature/your-feature)

Open a Pull Request 🚀

📄 License
MIT

🙏 Acknowledgements
Built with React, Vite, and Tailwind

AI powered by Gemini API