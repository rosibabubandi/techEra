import {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const CourseItemDetails = props => {
  const [courseItemApiStatus, setCourseItemApiStatus] = useState(
    apiStatusConstants.initial,
  )
  const [courseItemData, setCourseItemData] = useState({})

  const getCourseItemData = async () => {
    setCourseItemApiStatus(apiStatusConstants.inProgress)

    const {match} = props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    const responseData = await response.json()
    console.log(responseData)

    if (response.ok) {
      const fetchedData = {
        id: responseData.course_details.id,
        name: responseData.course_details.name,
        imageUrl: responseData.course_details.image_url,
        description: responseData.course_details.description,
      }
      setCourseItemData(fetchedData)
      setCourseItemApiStatus(apiStatusConstants.success)
    } else {
      setCourseItemApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getCourseItemData()
  }, [])

  const onClickRetry = () => {
    getCourseItemData()
  }

  const getCourseItemLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const getCourseItemSuccessView = () => (
    <div className="course-item-container">
      <img
        src={courseItemData.imageUrl}
        className="course-item-image"
        alt={courseItemData.name}
      />
      <div className="course-item-text-container">
        <h1 className="course-item-heading">{courseItemData.name}</h1>
        <p className="course-description-heading">
          {courseItemData.description}
        </p>
      </div>
    </div>
  )

  const getCourseItemFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-image"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description-text">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )

  const getAllCourseItemViews = () => {
    switch (courseItemApiStatus) {
      case apiStatusConstants.inProgress:
        return getCourseItemLoadingView()
      case apiStatusConstants.success:
        return getCourseItemSuccessView()
      case apiStatusConstants.failure:
        return getCourseItemFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="course-item-main-container">
        {getAllCourseItemViews()}
      </div>
    </>
  )
}

export default withRouter(CourseItemDetails)
