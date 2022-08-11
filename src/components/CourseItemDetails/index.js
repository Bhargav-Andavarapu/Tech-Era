import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseDetails: {},
  }

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    const fetchedData = await response.json()

    if (response.ok === true) {
      const updatedData = {
        id: fetchedData.course_details.id,
        name: fetchedData.course_details.name,
        description: fetchedData.course_details.description,
        imageUrl: fetchedData.course_details.image_url,
      }
      this.setState({
        courseDetails: updatedData,
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
    const {courseDetails} = this.state
    const {name, description, imageUrl} = courseDetails

    return (
      <div className="course-item-details">
        <img src={imageUrl} alt={name} className="course-image" />
        <div className="course-name-and-description-container">
          <h1 className="course-title">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
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
        onClick={() => this.getCourseDetails()}
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
        <div className="course-detailed-container">{this.renderAllViews()}</div>
      </>
    )
  }
}

export default CourseItemDetails
