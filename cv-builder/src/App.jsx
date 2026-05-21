import { useState } from 'react'
import GeneralSection from './components/GeneralSection'
import SummarySection from './components/SummarySection'
import EducationSection from './components/EducationSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import CVPreview from './components/CVPreview'
import './styles/App.css'

const emptyGeneral = { name: '', email: '', phone: '', location: '', linkedin: '' }
const emptySkills = { languages: '', technologies: '', tools: '', softSkills: '', other: '' }

export default function App() {
  const [general, setGeneral] = useState(emptyGeneral)
  const [generalDone, setGeneralDone] = useState(false)

  const [summary, setSummary] = useState('')
  const [summaryDone, setSummaryDone] = useState(false)

  const [education, setEducation] = useState([])
  const [experience, setExperience] = useState([])
  const [projects, setProjects] = useState([])

  const [skills, setSkills] = useState(emptySkills)
  const [skillsDone, setSkillsDone] = useState(false)

  return (
    <div className="app-layout">

      {/* ── Left Sidebar ── */}
      <div className="sidebar">
        <div className="app-title">CV Builder</div>
        <div className="app-subtitle">Fill in each section</div>

        <GeneralSection
          data={general}
          submitted={generalDone}
          onSave={d => { setGeneral(d); setGeneralDone(true) }}
          onEdit={() => setGeneralDone(false)}
        />

        <SummarySection
          value={summary}
          submitted={summaryDone}
          onSave={v => { setSummary(v); setSummaryDone(true) }}
          onEdit={() => setSummaryDone(false)}
        />

        <EducationSection education={education} setEducation={setEducation} />

        <ExperienceSection experience={experience} setExperience={setExperience} />

        <ProjectsSection projects={projects} setProjects={setProjects} />

        <SkillsSection
          skills={skills}
          submitted={skillsDone}
          onSave={d => { setSkills(d); setSkillsDone(true) }}
          onEdit={() => setSkillsDone(false)}
        />
      </div>

      {/* ── Right Preview ── */}
      <div className="preview-pane">
        <div className="preview-label">Live Preview</div>
        <div className="preview-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Live Preview</span>
          <button className="btn btn-primary" onClick={() => window.print()}>Download PDF</button>
        </div>
        <CVPreview
          general={general}
          summary={summary}
          education={education}
          experience={experience}
          projects={projects}
          skills={skills}
        />
      </div>
    </div>  
  )
}
