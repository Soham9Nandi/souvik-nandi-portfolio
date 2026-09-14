import { motion } from 'framer-motion'

const workHistory = [
  {
    role: 'Head, Clinical Affairs',
    org: 'Micro Data Labs, India',
    dates: 'April 2024 - Present',
    location: 'Remote',
    bullets: [
      'Built the clinical affairs and medical/regulatory writing function from an initial single-person setup into a structured six-member specialist team, establishing SOPs, workflows, quality processes, and documentation standards.',
      'Lead a six-member medical, scientific, and regulatory writing team along with freelancers and provide technical and clinical oversight to a broader operations group of approximately 20 professionals.',
      'Supported 50+ clinical research projects across approximately 4-5 domestic and international clients, spanning medical devices, surgical specialties, pharmacokinetic research, and other clinical areas.',
      'Oversee development and review of protocols, CRFs, SAPs, statistical analysis reports, CSRs, SOPs, manuscripts, case reports, white papers, and other clinical and scientific documentation.',
      'Provide lifecycle support across feasibility, study initiation documentation, Ethics Committee interactions, Principal Investigator briefing, team training, initiation and monitoring support, clinical data review, query identification and resolution, statistical analysis, reporting, and closeout.',
      'Coordinate clinical, regulatory, operations, consultants, freelancers, and other cross-functional contributors to maintain scientific accuracy, consistency, timelines, and study-specific quality standards.',
      'Prepare and review clinical documentation supporting work intended for EU and US regulatory environments, with study reports generally developed in alignment with ICH principles and applicable requirements.',
    ],
  },
  {
    role: 'Consultant / Team Lead, Clinical & Regulatory Writing',
    org: 'Meril Life Sciences, India',
    dates: 'Aug 2022 - Jan 2024',
    location: 'Ahmedabad / Remote — initially engaged as a consultant before assuming lead-level responsibilities',
    bullets: [
      'Led clinical and regulatory writing activities across protocols, CRFs, clinical reports, SOPs, manuscripts, case reports, and scientific communications.',
      'Provided scientific and editorial oversight for multidisciplinary writing assignments, including literature evaluation, data interpretation, document quality review, and consistency checks.',
      'Supported clinical research teams with study documentation, data review, statistical interpretation, and preparation of study outputs.',
      'Mentored writers and contributed to development of writing processes, review practices, and project-specific documentation standards.',
    ],
  },
  {
    role: 'Concurrent Director',
    org: 'MDL Clintech Ltd., Kenya',
    dates: 'Dates to be confirmed',
    location: 'Kenya — concurrent leadership appointment within the current company group',
    bullets: [
      'Helped establish a new BA/BE research facility in Kenya from the ground up, covering organizational setup, recruitment, functional planning, clinical and bioanalytical infrastructure, and operational readiness.',
      'Recruited and supported specialist personnel across clinical, bioanalytical, quality, regulatory, and operational functions, defining roles and enabling teams to build fit-for-purpose systems and workflows.',
      'Led or supported development of SOPs, QMS processes, ethics and regulatory readiness, BA/BE protocol and pharmacokinetic planning, subject and sample workflows, data and statistical processes, and study-reporting frameworks.',
      'Contributed to facility and equipment planning, including clinical-unit requirements, LC-MS/MS and chromatographic capability, vendor evaluation, sample handling, bioanalytical workflow, method-development/validation planning, and resource budgeting.',
      'Provided cross-functional oversight and technical support for inspection readiness, training, study execution planning, statistical reporting, and end-to-end BA/BE operational capability.',
    ],
  },
  {
    role: "Senior Research Fellow (DST INSPIRE)",
    org: "Siksha 'O' Anusandhan",
    dates: 'Dates to be confirmed',
    location: 'Bhubaneswar',
    bullets: [
      'Conducted doctoral research in pharmaceutical sciences with a focus on drug delivery, including experimental design, data analysis, interpretation, scientific writing, and publication development.',
      'Provided scientific manuscript-development and editorial support across multiple research projects during doctoral training.',
    ],
  },
]

const education = [
  {
    degree: 'MBA, Marketing (Pursuing)',
    school: 'Symbiosis (SSODL), Pune',
    detail: 'Expected completion: 2027',
  },
  {
    degree: 'PhD in Pharmaceutical Sciences',
    school: "Siksha 'O' Anusandhan",
    detail: '2022 — Research focus: Drug Delivery',
  },
  {
    degree: 'M.Pharm',
    school: "Siksha 'O' Anusandhan",
    detail: '2017',
  },
  {
    degree: 'B.Pharm',
    school: 'West Bengal University of Technology',
    detail: '2015',
  },
]

const certifications = [
  'Good Clinical Practice — NIDA (2025)',
  'Understanding Clinical Research: Behind the Statistics — University of Cape Town (2025)',
  'Medical Writing for Healthcare Professionals — Udemy (2023)',
  'Research Methodology — Queen Mary University of London (2026)',
  'Statistics and Data Analysis with Excel: Essentials — Macquarie University (2026)',
]

const coreExpertise = [
  'Clinical Affairs Leadership',
  'Medical & Regulatory Writing',
  'End-to-End Clinical Trial Support',
  'Medical Device Clinical Investigations',
  'BA/BE & Pharmacokinetic Research',
  'Protocols, CRFs, SAPs, SARs & CSRs',
  'SOP & Process Development',
  'Clinical Data Review & Statistical Interpretation',
  'Team Building, Training & Mentoring',
  'ICH | EU MDR | FDA & EMA Frameworks | CDSCO/NDCTR | ISO 14155 | ISO 11979',
]

const regulatoryKnowledge = [
  'ICH',
  'EU MDR',
  'FDA Regulatory Framework',
  'EMA Requirements',
  'CDSCO / NDCTR',
  'CTRI',
  'ISO 14155',
  'ISO 11979',
]

const tools = [
  { label: 'Statistical & Analytical', items: 'R, GraphPad Prism, Microsoft Excel' },
  { label: 'Reference Management', items: 'EndNote, Zotero, Mendeley' },
  { label: 'Research & Trial Resources', items: 'PubMed, ClinicalTrials.gov, CTRI' },
]

const jobReveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5 },
}

export default function Experience() {
  return (
    <div className="experience-page">
      <h1>Experience</h1>

      <section className="experience-section">
        <h2>Work History</h2>
        <div className="work-list">
          {workHistory.map((job) => (
            <motion.article key={job.role + job.org} {...jobReveal} className="work-item">
              <div className="work-item-header">
                <h3>{job.role}</h3>
                <span className="work-dates">{job.dates}</span>
              </div>
              <p className="work-org">{job.org}</p>
              <p className="work-location">{job.location}</p>
              <ul>
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="experience-section">
        <h2>Education</h2>
        <ul className="education-list">
          {education.map((item) => (
            <li key={item.degree}>
              <strong>{item.degree}</strong> — {item.school}
              <span className="education-detail"> ({item.detail})</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="experience-section">
        <h2>Certifications</h2>
        <ul className="certifications-list">
          {certifications.map((cert) => (
            <li key={cert}>{cert}</li>
          ))}
        </ul>
      </section>

      <section className="experience-section">
        <h2>Core Expertise</h2>
        <ul className="skills-grid">
          {coreExpertise.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="experience-section">
        <h2>Regulatory & Technical Knowledge</h2>
        <p className="tag-list">{regulatoryKnowledge.join(' | ')}</p>
      </section>

      <section className="experience-section">
        <h2>Tools</h2>
        <ul className="tools-list">
          {tools.map((group) => (
            <li key={group.label}>
              <strong>{group.label}:</strong> {group.items}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
