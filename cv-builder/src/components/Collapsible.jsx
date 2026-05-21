import { useState } from 'react'

export default function Collapsible({ title, count, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="section-card">
      <button className="section-toggle" onClick={() => setOpen(p => !p)} type="button">
        <span className="section-toggle-label">
          {title}
          {count > 0 && <span className="count-badge">{count}</span>}
        </span>
        <span className="section-toggle-icon">{open ? '−' : '+'}</span>
      </button>
      {open && children}
    </div>
  )
}
