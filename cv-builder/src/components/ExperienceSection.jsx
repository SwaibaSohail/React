import { useState } from 'react'
import Field from './Field'
import Collapsible from './Collapsible'

const uid = () => Math.random().toString(36).slice(2, 9)
const empty = () => ({ id: uid(), company: '', position: '', location: '', responsibilities: '', from: '', to: '' })

function ExpEntry({ entry, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(!entry.company)
  const [draft, setDraft] = useState(entry)
  const ch = e => setDraft(p => ({ ...p, [e.target.name]: e.target.value }))
  const save = () => { onUpdate(draft); setEditing(false) }

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-card-top">
        <div>
          <div className="entry-card-title">{draft.position ? `${draft.position}, ${draft.company}` : draft.company}</div>
          {draft.location && <div className="entry-card-sub">{draft.location}</div>}
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
      <Field label="Company" name="company" value={draft.company} onChange={ch} placeholder="Systems" />
      <Field label="Position Title" name="position" value={draft.position} onChange={ch} placeholder="Full Stack Intern" />
      <Field label="Location" name="location" value={draft.location} onChange={ch} placeholder="Lahore" />
      <Field
        label="Responsibilities (one per line, start with –)"
        name="responsibilities"
        value={draft.responsibilities}
        onChange={ch}
        as="textarea"
        rows={5}
        placeholder={"– Built full-stack applications using React and Django.\n– Designed APIs for auth, posts, and comments."}
      />
      <div className="field-row">
        <Field label="From" name="from" value={draft.from} onChange={ch} placeholder="Jun 2023" />
        <Field label="To" name="to" value={draft.to} onChange={ch} placeholder="Aug 2023" />
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={save}>Save</button>
        {entry.company && <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>}
      </div>
    </div>
  )
}

export default function ExperienceSection({ experience, setExperience }) {
  return (
    <Collapsible title="Experience" count={experience.filter(e => e.company).length}>
      <div className="section-body">
        {experience.map(e => (
          <ExpEntry key={e.id} entry={e}
            onUpdate={d => setExperience(p => p.map(x => x.id === e.id ? { ...d, id: e.id } : x))}
            onRemove={() => setExperience(p => p.filter(x => x.id !== e.id))}
          />
        ))}
        <button className="btn-add" onClick={() => setExperience(p => [...p, empty()])}>+ Add Experience</button>
      </div>
    </Collapsible>
  )
}
