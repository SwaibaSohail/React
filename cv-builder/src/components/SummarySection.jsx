import { useState } from 'react'
import Collapsible from './Collapsible'

export default function SummarySection({ value, submitted, onSave, onEdit }) {
  const [draft, setDraft] = useState(value)

  return (
    <Collapsible title="Summary" defaultOpen={true}>
      <div className="section-body">
        {submitted ? (
          <>
            <p style={{ fontSize: 12.5, color: '#444', lineHeight: 1.6, marginBottom: 10 }}>{value}</p>
            <button className="btn btn-ghost" onClick={onEdit}>Edit</button>
          </>
        ) : (
          <>
            <div className="field">
              <label>Professional Summary</label>
              <textarea
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Computer Science graduate with a strong foundation in full-stack development..."
                rows={4}
              />
            </div>
            <div className="btn-row">
              <button className="btn btn-primary" onClick={() => onSave(draft)}>Save Section</button>
            </div>
          </>
        )}
      </div>
    </Collapsible>
  )
}
