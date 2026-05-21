import { useState } from 'react'
import Field from './Field'
import Collapsible from './Collapsible'

const uid = () => Math.random().toString(36).slice(2, 9)
const empty = () => ({ id: uid(), school: '', degree: '', field: '', gpa: '', courses: '', from: '', to: '' })

function EduEntry({ entry, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(!entry.school)
  const [draft, setDraft] = useState(entry)
  const ch = e => setDraft(p => ({ ...p, [e.target.name]: e.target.value }))
  const save = () => { onUpdate(draft); setEditing(false) }

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-card-top">
        <div>
          <div className="entry-card-title">{draft.school}</div>
          {draft.degree && <div className="entry-card-sub">{draft.degree}{draft.field ? ` – ${draft.field}` : ''}</div>}
          {(draft.from || draft.to) && <div className="entry-card-sub">{[draft.from, draft.to].filter(Boolean).join(' – ')}</div>}
        </div>
        <div className="entry-card-actions">
          <button className="btn btn-ghost" style={{ fontSize: 11, padding: '3px 9px' }} onClick={() => setEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={onRemove}>Remove</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="entry-card entry-card--editing">
      <Field label="School / University" name="school" value={draft.school} onChange={ch} placeholder="LUMS" />
      <Field label="Degree" name="degree" value={draft.degree} onChange={ch} placeholder="BSc. Computer Science" />
      <Field label="Field of Study" name="field" value={draft.field} onChange={ch} placeholder="Computer Science" />
      <Field label="GPA / Grade (optional)" name="gpa" value={draft.gpa} onChange={ch} placeholder="3.8 / 4.0" />
      <Field label="Relevant Coursework (optional)" name="courses" value={draft.courses} onChange={ch} placeholder="Algorithms, Databases, Networks" />
      <div className="field-row">
        <Field label="From" name="from" value={draft.from} onChange={ch} placeholder="2020" />
        <Field label="To" name="to" value={draft.to} onChange={ch} placeholder="2024" />
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={save}>Save</button>
        {entry.school && <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>}
      </div>
    </div>
  )
}

export default function EducationSection({ education, setEducation }) {
  return (
    <Collapsible title="Education" count={education.filter(e => e.school).length}>
      <div className="section-body">
        {education.map(e => (
          <EduEntry key={e.id} entry={e}
            onUpdate={d => setEducation(p => p.map(x => x.id === e.id ? { ...d, id: e.id } : x))}
            onRemove={() => setEducation(p => p.filter(x => x.id !== e.id))}
          />
        ))}
        <button className="btn-add" onClick={() => setEducation(p => [...p, empty()])}>+ Add Education</button>
      </div>
    </Collapsible>
  )
}
