import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import CoursesList from '../CoursesList'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch('https://apis.ccbp.in/te/courses')
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = fetchedData.courses.map(eachCourses => ({
        id: eachCourses.id,
        name: eachCourses.name,
        logoUrl: eachCourses.logo_url,
      }))
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4656a1" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state

    return (
      <div className="success-container">
        <ul className="course-list-container">
          {coursesList.map(eachCourse => (
            <CoursesList key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-paragraph">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getCoursesList()}
      >
        Retry
      </button>
    </div>
  )

  renderAllViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Courses</h1>
          {this.renderAllViews()}
        </div>
      </>
    )
  }
}

export default Home
