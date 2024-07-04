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
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
      <h1>City Detail</h1>
      <p>City ID: {cityId}</p>
      <p>City Name: {cityName}</p>
    </>
  )

}


export default CityDetail