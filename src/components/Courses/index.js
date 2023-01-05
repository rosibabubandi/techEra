import {Link} from 'react-router-dom'

import './index.css'

const Courses = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <li>
      <Link className="course-link" to={`/courses/${id}`}>
        <div className="each-course-container">
          <img src={logoUrl} className="course-image" alt={name} />
          <p className="course-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default Courses
