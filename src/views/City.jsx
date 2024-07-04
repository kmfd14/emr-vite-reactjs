import { useSearchParams, useNavigate } from "react-router-dom"

const CityDetail = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const cityId = decodeURIComponent(searchParams.get('id'))
  const cityName = decodeURIComponent(searchParams.get('name') || '');
  console.log("searchParams", searchParams)
  console.log("cityName", cityName)

  return (
    <>
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
        <div className="card">
          <div className="card-header">
            <h2>City Detail</h2>
          </div>
          <div className="card-body">
            <p><strong>City ID:</strong> {cityId}</p>
            <p><strong>City Name:</strong> {cityName}</p>
          </div>
        </div>
      </div>
    </>
  )
}


export default CityDetail