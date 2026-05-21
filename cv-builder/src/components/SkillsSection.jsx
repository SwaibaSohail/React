import { useState } from 'react'
import Collapsible from './Collapsible'

const EMPTY = { languages: '', technologies: '', tools: '', softSkills: '', other: '' }

export default function SkillsSection({ skills, submitted, onSave, onEdit }) {
  const [draft, setDraft] = useState(skills)
  const ch = e => setDraft(p => ({ ...p, [e.target.name]: e.target.value }))
  const filled = Object.values(skills).some(v => v)

  return (
    <Collapsible title="Skills" defaultOpen={true}>
      <div className="section-body">
        {submitted ? (
          <>
            {skills.languages && <p style={{ fontSize: 12, color: '#444', marginBottom: 4 }}><strong>Languages:</strong> {skills.languages}</p>}
            {skills.technologies && <p style={{ fontSize: 12, color: '#444', marginBottom: 4 }}><strong>Technologies:</strong> {skills.technologies}</p>}
            {skills.tools && <p style={{ fontSize: 12, color: '#444', marginBottom: 4 }}><strong>Tools:</strong> {skills.tools}</p>}
            {skills.softSkills && <p style={{ fontSize: 12, color: '#444', marginBottom: 4 }}><strong>Soft Skills:</strong> {skills.softSkills}</p>}
            {skills.other && <p style={{ fontSize: 12, color: '#444', marginBottom: 4 }}><strong>Other:</strong> {skills.other}</p>}
            <div className="btn-row" style={{ marginTop: 10 }}>
              <button className="btn btn-ghost" onClick={onEdit}>Edit</button>
            </div>
          </>
        ) : (
          <>
            {[
              { label: 'Languages', name: 'languages', placeholder: 'Python, C/C++, JavaScript, HTML, CSS, SQL' },
              { label: 'Technologies', name: 'technologies', placeholder: 'React, Node.js, Django, Firebase, PostgreSQL' },
              { label: 'Tools', name: 'tools', placeholder: 'Git, GitHub, REST APIs, VS Code' },
              { label: 'Soft Skills', name: 'softSkills', placeholder: 'Problem Solving, Teamwork, Adaptability' },
              { label: 'Other (optional)', name: 'other', placeholder: 'Canva, Figma, etc.' },
            ].map(({ label, name, placeholder }) => (
              <div className="field" key={name}>
                <label>{label}</label>
                <input name={name} value={draft[name]} onChange={ch} placeholder={placeholder} />
              </div>
            ))}
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => onSave(draft)}>Save Section</button>
            </div>
          </>
        )}
      </div>
    </Collapsible>
  )
}
