import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {cardsList} = props
  const {name, id, teamImageUrl} = cardsList

  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="team-card">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
