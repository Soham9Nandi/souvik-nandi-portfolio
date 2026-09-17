import { useState } from 'react'
import RevealCard from '../components/RevealCard'
import { publications, inReviewPublication } from '../data/publications'

function PublicationCard({ pub }) {
  const [expanded, setExpanded] = useState(false)

  const metaParts = [pub.journal]
  if (pub.year) metaParts.push(pub.year)
  if (pub.status) metaParts.push(pub.status)

  return (
    <RevealCard as="li" className="publication-card">
      <button
        type="button"
        className="publication-toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        <h3 className="publication-title">{pub.title}</h3>
        <p className="publication-meta">{metaParts.join(' · ')}</p>
        <div className="publication-badges">
          {pub.firstAuthor && <span className="badge badge-first-author">First author</span>}
          {pub.impactFactor != null && (
            <span className="badge badge-impact-factor">IF {pub.impactFactor}</span>
          )}
        </div>
        <span className="publication-expand-hint">
          {expanded ? 'Hide details' : 'Show details'}
        </span>
      </button>

      {expanded && (
        <div className="publication-details">
          <p className="publication-authors">{pub.authors}</p>
          {pub.link && (
            <a
              href={pub.link}
              target="_blank"
              rel="noreferrer"
              className="publication-link"
              onClick={(e) => e.stopPropagation()}
            >
              View source
            </a>
          )}
        </div>
      )}
    </RevealCard>
  )
}

export default function Publications() {
  const ranked = publications
    .filter((pub) => pub.impactFactor != null)
    .sort((a, b) => b.impactFactor - a.impactFactor)

  const additional = publications
    .filter((pub) => pub.impactFactor == null)
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))

  return (
    <div className="publications-page">
      <h1>Publications</h1>

      <section className="experience-section">
        <h2>In review</h2>
        <ul className="publications-list">
          <PublicationCard pub={inReviewPublication} />
        </ul>
      </section>

      <section className="experience-section">
        <h2>Peer-Reviewed Publications</h2>
        <ul className="publications-list">
          {ranked.map((pub) => (
            <PublicationCard key={pub.title} pub={pub} />
          ))}
        </ul>
      </section>

      <section className="experience-section">
        <h2>Additional Publications</h2>
        <ul className="publications-list">
          {additional.map((pub) => (
            <PublicationCard key={pub.title} pub={pub} />
          ))}
        </ul>
      </section>
    </div>
  )
}
