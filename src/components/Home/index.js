import Loader from 'react-loader-spinner'
import {Component} from 'react'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    cardList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    const updatedData = fetchData.teams.map(eachData => ({
      name: eachData.name,
      teamImageUrl: eachData.team_image_url,
      id: eachData.id,
    }))
    this.setState({cardList: updatedData, isLoading: false})
  }

  renderTeamsList = () => {
    const {cardList} = this.state
    return (
      <ul className="cards-list-items">
        {cardList.map(eachItem => (
          <TeamCard key={eachItem.id} cardsList={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="dashboard-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsList()}
        </div>
      </div>
    )
  }
}

export default Home
