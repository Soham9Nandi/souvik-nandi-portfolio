import profilePhoto from '../assets/profile.jpeg'

// Email CTA temporarily disabled — see DESIGN_LOG.md.
// const EMAIL = 'ph.souvikn@gmail.com'

const stats = [
  { number: '25', label: 'Peer-reviewed publications — ~5 as first author' },
  { number: '50+', label: 'Clinical research projects supported' },
  { number: '6', label: 'Person team led — oversight of ~20 professionals' },
]

export default function Home() {
  return (
    <section className="home-hero">
      <div className="home-photo">
        <img src={profilePhoto} alt="Dr. Souvik Nandi" />
      </div>

      <div className="home-content">
        <h1>Dr. Souvik Nandi</h1>
        <p className="home-title">
          Clinical Affairs &amp; Medical Writing Leader | Clinical Research | Medical Devices
        </p>

        <p className="home-summary">
          Clinical affairs and medical writing leader with experience building clinical research
          functions from the ground up, leading multidisciplinary teams, and supporting 50+
          clinical research projects for domestic and international clients. Hands-on experience
          spans medical-device clinical investigations, pharmacokinetic and BA/BE research, study
          documentation, ethics and regulatory support, investigator briefing, operations
          training, monitoring support, clinical data review, statistical analysis planning and
          interpretation, final reporting, and closeout. Experienced in developing documentation
          aligned with ICH and supporting work intended for IN, EU and US regulatory
          environments.
        </p>

        <div className="home-stats">
          {stats.map((stat) => (
            <div className="stat-badge" key={stat.label}>
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* <a className="home-cta" href={`mailto:${EMAIL}`}>
          Get in touch &mdash; {EMAIL}
        </a> */}
      </div>
    </section>
  )
}
