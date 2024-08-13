import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const GenderDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const genderId = decodeURIComponent(searchParams.get('id'))
  const [gender, setGenders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      axios.get('http://127.0.0.1:4040/gender/' + genderId)
        .then((response) => {
          setGenders(response.data)
          console.log("gender", gender)
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }

    fetchData()
  }, [gender, genderId])

  return (
    <>
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
        <div className="card">
          <div className="card-header">
            <h2>Gender Detail</h2>
          </div>
          <div className="card-body">
            <p><strong>Gender ID:</strong> {gender.id}</p>
            <p><strong>Name:</strong> {gender.name}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default GenderDetails