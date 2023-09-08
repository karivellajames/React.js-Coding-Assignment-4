import Loader from 'react-loader-spinner'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    matchesData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchedData = await response.json()
    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatchDetails: {
        id: fetchedData.latest_match_details.id,
        competingTeam: fetchedData.latest_match_details.competing_team,
        competingTeamLogo: fetchedData.latest_match_details.competing_team_logo,
        date: fetchedData.latest_match_details.date,
        firstInnings: fetchedData.latest_match_details.first_innings,
        manOfTheMatch: fetchedData.latest_match_details.man_of_the_match,
        matchStatus: fetchedData.latest_match_details.match_status,
        result: fetchedData.latest_match_details.result,
        secondInnings: fetchedData.latest_match_details.second_innings,
        umpires: fetchedData.latest_match_details.umpires,
        venue: fetchedData.latest_match_details.venue,
      },
      recentMatches: fetchedData.recent_matches.map(recentMatch => ({
        id: recentMatch.id,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        date: recentMatch.date,
        firstInnings: recentMatch.first_innings,
        manOfTheMatch: recentMatch.man_of_the_match,
        matchStatus: recentMatch.match_status,
        result: recentMatch.result,
        secondInnings: recentMatch.second_innings,
        umpires: recentMatch.umpires,
        venue: recentMatch.venue,
      })),
    }
    this.setState({matchesData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchesData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchesData

    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {matchesData} = this.state
    const {recentMatches} = matchesData

    return (
      <ul className="recent-matches-list">
        {recentMatches.map(eachMatch => (
          <MatchCard matchData={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-route-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
