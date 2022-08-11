import {Link} from 'react-router-dom'

import './index.css'

const CoursesList = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`courses/${id}`} className="link">
      <li className="course-list">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="logo-heading">{name}</p>
      </li>
    </Link>
  )
}

export default CoursesList
