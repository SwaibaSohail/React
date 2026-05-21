export default function Field({ label, name, value, onChange, as = 'input', placeholder = '', rows = 3 }) {
  return (
    <div className="field">
      <label>{label}</label>
      {as === 'textarea' ? (
        <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={rows} />
      ) : (
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  )
}
