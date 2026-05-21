import "../styles/CVPreview.css";

function Bullet({ text }) {
  return text.trim()
    ? text
        .split("\n")
        .filter((l) => l.trim())
        .map((line, i) => <li key={i}>{line.replace(/^[-•]\s*/, "")}</li>)
    : null;
}

export default function CVPreview({
  general,
  summary,
  education,
  experience,
  projects,
  skills,
}) {
  const hasAny =
    general.name ||
    summary ||
    education.some((e) => e.school) ||
    experience.some((e) => e.company) ||
    projects.some((p) => p.name) ||
    Object.values(skills).some((v) => v);

  if (!hasAny) {
    return (
      <div className="cv-paper cv-empty" style={{ minHeight: 600 }}>
        <p>Fill in the left panel — your CV appears here live.</p>
      </div>
    );
  }

  const contact = [general.location, general.phone, general.email].filter(
    Boolean,
  );

  return (
    <div className="cv-paper">
      {/* Header */}
      {(general.name || contact.length > 0) && (
        <div className="cv-header">
          {general.name && <div className="cv-name">{general.name}</div>}
          {contact.length > 0 && (
            <div className="cv-contact-line">
              {contact.map((c, i) => (
                <span key={c}>
                  {i > 0 && <span className="cv-contact-sep"> — </span>}
                  {c}
                </span>
              ))}
              {general.linkedin && (
                <div style={{ fontSize: 12, color: "#555", marginTop: 3 }}>
                  <a
                    href={general.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#555" }}
                  >
                    {general.linkedin}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {summary && (
        <div className="cv-section">
          <div className="cv-section-title">Summary</div>
          <hr className="cv-rule" />
          <p className="cv-summary">{summary}</p>
        </div>
      )}

      {/* Education */}
      {education.some((e) => e.school) && (
        <div className="cv-section">
          <div className="cv-section-title">Education</div>
          <hr className="cv-rule" />
          {education
            .filter((e) => e.school)
            .map((e) => (
              <div key={e.id} className="cv-entry">
                <div className="cv-entry-row">
                  <span className="cv-entry-org">{e.school}</span>
                  <span className="cv-entry-date">
                    {[e.from, e.to].filter(Boolean).join(" – ")}
                  </span>
                </div>
                {(e.degree || e.field) && (
                  <div className="cv-entry-role">
                    {e.degree}
                    {e.field ? ` – ${e.field}` : ""}
                  </div>
                )}
                {e.gpa && (
                  <div
                    className="cv-entry-course"
                    style={{ fontStyle: "normal" }}
                  >
                    GPA: {e.gpa}
                  </div>
                )}
                {e.courses && (
                  <div className="cv-entry-course">
                    <strong>Relevant Coursework:</strong> {e.courses}
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Experience */}
      {experience.some((e) => e.company) && (
        <div className="cv-section">
          <div className="cv-section-title">Experience</div>
          <hr className="cv-rule" />
          {experience
            .filter((e) => e.company)
            .map((e) => (
              <div key={e.id} className="cv-entry">
                <div className="cv-entry-row">
                  <span className="cv-entry-org">
                    {e.position ? `${e.position}, ${e.company}` : e.company}
                    {e.location ? (
                      <span className="cv-entry-location"> – {e.location}</span>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="cv-entry-date">
                    {[e.from, e.to].filter(Boolean).join(" – ")}
                  </span>
                </div>
                {e.responsibilities && (
                  <ul className="cv-bullets">
                    <Bullet text={e.responsibilities} />
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Projects */}
      {projects.some((p) => p.name) && (
        <div className="cv-section">
          <div className="cv-section-title">Projects</div>
          <hr className="cv-rule" />
          {projects
            .filter((p) => p.name)
            .map((p) => (
              <div key={p.id} className="cv-project">
                <div className="cv-project-header">
                  <span className="cv-project-name">
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "inherit",
                          textDecoration: "underline",
                        }}
                      >
                        {p.name}
                      </a>
                    ) : (
                      p.name
                    )}
                    {p.subtitle && (
                      <span style={{ fontWeight: 400, color: "#555" }}>
                        {" "}
                        – {p.subtitle}
                      </span>
                    )}
                  </span>
                  <span className="cv-project-date">
                    {[p.from, p.to].filter(Boolean).join(" – ")}
                  </span>
                </div>
                {p.stack && <div className="cv-project-stack">{p.stack}</div>}
                {p.description && (
                  <div className="cv-project-desc">{p.description}</div>
                )}
              </div>
            ))}
        </div>
      )}

      {/* Skills */}
      {Object.values(skills).some((v) => v) && (
        <div className="cv-section">
          <div className="cv-section-title">Core Skills</div>
          <hr className="cv-rule" />
          <table className="cv-skills-table">
            <tbody>
              {skills.languages && (
                <tr>
                  <td>Languages</td>
                  <td>{skills.languages}</td>
                </tr>
              )}
              {skills.technologies && (
                <tr>
                  <td>Technologies</td>
                  <td>{skills.technologies}</td>
                </tr>
              )}
              {skills.tools && (
                <tr>
                  <td>Tools</td>
                  <td>{skills.tools}</td>
                </tr>
              )}
              {skills.softSkills && (
                <tr>
                  <td>Soft Skills</td>
                  <td>{skills.softSkills}</td>
                </tr>
              )}
              {skills.other && (
                <tr>
                  <td>Other</td>
                  <td>{skills.other}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
