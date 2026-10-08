import RevealCard from '../components/RevealCard'
import { patents } from '../data/patents'

export default function Patents() {
  return (
    <div className="patents-page">
      <h1>Patents</h1>

      <section className="experience-section">
        <ul className="patents-list">
          {patents.map((patent) => (
            <RevealCard as="li" className="patent-card" key={patent.applicationNumber}>
              <h3 className="patent-title">{patent.title}</h3>
              <p className="patent-meta">
                Application {patent.applicationNumber} &middot; {patent.jurisdiction}
              </p>
              <p className="patent-meta">
                Filed {patent.filedDate} &middot; {patent.status} {patent.publicationDate}
              </p>
              <p className="patent-inventors">{patent.inventors}</p>
            </RevealCard>
          ))}
        </ul>
      </section>
    </div>
  )
}
