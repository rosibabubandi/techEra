import {useState, useEffect} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Courses from '../Courses'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [coursesStatus, setCoursesStatus] = useState(apiStatusConstants.initial)
  const [coursesData, setCoursesData] = useState([])

  const getCoursesData = async () => {
    setCoursesStatus(apiStatusConstants.inProgress)

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const responseData = await response.json()

    if (response.ok) {
      const fetchedCoursesData = responseData.courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))
      setCoursesStatus(apiStatusConstants.success)
      setCoursesData(fetchedCoursesData)
    } else {
      setCoursesStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    getCoursesData()
  }, [])

  const onClickRetry = () => {
    getCoursesData()
  }

  const getCoursesLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  const getCoursesSuccessView = () => (
    <ul className="courses-container">
      {coursesData.map(eachCourse => (
        <Courses key={eachCourse.id} courseDetails={eachCourse} />
      ))}
    </ul>
  )

  const getCoursesFailureView = () => (
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

  const getAllCourseViews = () => {
    switch (coursesStatus) {
      case apiStatusConstants.inProgress:
        return getCoursesLoadingView()
      case apiStatusConstants.success:
        return getCoursesSuccessView()
      case apiStatusConstants.failure:
        return getCoursesFailureView()
      default:
        return null
    }
  }

  return (
    <>
      <Header />
      <div className="home-main-container">
        <h1 className="courses-heading">Courses</h1>
        {getAllCourseViews()}
      </div>
    </>
  )
}

export default Home
