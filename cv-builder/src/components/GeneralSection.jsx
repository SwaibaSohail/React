import { useState } from 'react'
import Field from './Field'
import Collapsible from './Collapsible'

export default function GeneralSection({ data, submitted, onSave, onEdit }) {
  const [draft, setDraft] = useState(data)
  const ch = e => setDraft(p => ({ ...p, [e.target.name]: e.target.value }))

  return (
    <Collapsible title="General Info" defaultOpen={true}>
      <div className="section-body">
        {submitted ? (
          <>
            <div className="submitted-block">
              <p className="submitted-name">{data.name}</p>
              <p className="submitted-detail">{[data.location, data.phone, data.email].filter(Boolean).join(' · ')}</p>
            </div>
            <button className="btn btn-ghost" onClick={onEdit}>Edit</button>
          </>
        ) : (
          <>
            <Field label="Full Name" name="name" value={draft.name} onChange={ch} placeholder="Swaiba Sohail" />
            <Field label="Email" name="email" value={draft.email} onChange={ch} placeholder="you@email.com" />
            <Field label="Phone" name="phone" value={draft.phone} onChange={ch} placeholder="+92 300 0000000" />
            <Field label="Location" name="location" value={draft.location} onChange={ch} placeholder="Lahore, Pakistan" />
            <Field label="LinkedIn URL" name="linkedin" value={draft.linkedin} onChange={ch} placeholder="https://linkedin.com/in/yourname" />
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => onSave(draft)}>Save Section</button>
            </div>
          </>
        )}
      </div>
    </Collapsible>
  )
}
