import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="btn-group btns-header" role="group" aria-label="Basic example">
      <Link to="/" type="button" className="btn btn-dark">Users</Link>
      <Link to="/groups/" type="button" className="btn btn-dark">Groups</Link>
    </div>
  )
}

export default Header