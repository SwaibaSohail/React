import { useState } from 'react'
import Field from './Field'
import Collapsible from './Collapsible'

const uid = () => Math.random().toString(36).slice(2, 9)
const empty = () => ({ id: uid(), name: '', subtitle: '', stack: '', description: '', link: '', from: '', to: '' })

function ProjectEntry({ entry, onUpdate, onRemove }) {
  const [editing, setEditing] = useState(!entry.name)
  const [draft, setDraft] = useState(entry)
  const ch = e => setDraft(p => ({ ...p, [e.target.name]: e.target.value }))
  const save = () => { onUpdate(draft); setEditing(false) }

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-card-top">
        <div>
          <div className="entry-card-title">{draft.name}{draft.subtitle ? ` – ${draft.subtitle}` : ''}</div>
          {draft.stack && <div className="entry-card-sub">{draft.stack}</div>}
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
      <Field label="Project Name" name="name" value={draft.name} onChange={ch} placeholder="RentWise" />
      <Field label="Subtitle (optional)" name="subtitle" value={draft.subtitle} onChange={ch} placeholder="Rental Management Platform" />
      <Field label="Tech Stack" name="stack" value={draft.stack} onChange={ch} placeholder="React, Node.js, PostgreSQL, Firebase" />
      <Field label="Description" name="description" value={draft.description} onChange={ch} as="textarea" rows={4}
        placeholder="Built multi-role app for landlords and tenants with secure auth, real-time chat, and Stripe payments." />
      <Field label="Link (optional)" name="link" value={draft.link} onChange={ch} placeholder="https://github.com/you/project" />
      <div className="field-row">
        <Field label="From" name="from" value={draft.from} onChange={ch} placeholder="Jul 2024" />
        <Field label="To" name="to" value={draft.to} onChange={ch} placeholder="Sep 2024" />
      </div>
      <div className="btn-row">
        <button className="btn btn-primary" onClick={save}>Save</button>
        {entry.name && <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>}
      </div>
    </div>
  )
}

export default function ProjectsSection({ projects, setProjects }) {
  return (
    <Collapsible title="Projects" count={projects.filter(p => p.name).length}>
      <div className="section-body">
        {projects.map(p => (
          <ProjectEntry key={p.id} entry={p}
            onUpdate={d => setProjects(prev => prev.map(x => x.id === p.id ? { ...d, id: p.id } : x))}
            onRemove={() => setProjects(prev => prev.filter(x => x.id !== p.id))}
          />
        ))}
        <button className="btn-add" onClick={() => setProjects(p => [...p, empty()])}>+ Add Project</button>
      </div>
    </Collapsible>
  )
}
