import {Component} from 'react'

import './index.css'

const apiConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    inProgress: "IN_PROGRESS"
    failure: "FAILURE"
}

class Home extends Component {
    state = {
        coursesList: [],
        apiStatus: 
    }

  render() {
    return (
      <div className="home-container">
        <h1 className="home-heading">Courses</h1>
        <ul className="courses-list-container">
          <li>Hi</li>
        </ul>
      </div>
    )
  }
}

export default Home
