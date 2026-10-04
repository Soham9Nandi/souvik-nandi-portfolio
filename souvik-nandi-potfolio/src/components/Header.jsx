import snIcon from '../assets/sn-icon.jpeg'

export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header-inner">
        <img src={snIcon} alt="" className="app-header-icon" />
        <div className="app-header-text">
          <span className="app-header-name">Souvik Nandi</span>
          <span className="app-header-tagline">Clinical Affairs &amp; Medical Writing Leader</span>
        </div>
      </div>
    </header>
  )
}
