import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <div className="header-container">
    <Link className="tech-era-logo-link" to="/">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        className="tech-era-logo"
        alt="website logo"
      />
    </Link>
  </div>
)

export default Header
