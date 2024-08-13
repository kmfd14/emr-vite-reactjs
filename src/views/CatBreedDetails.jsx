import { useSearchParams, useNavigate } from "react-router-dom"

const CatBreedDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const catId = decodeURIComponent(searchParams.get('id'))
  const catName = decodeURIComponent(searchParams.get('name') || '');
  console.log("searchParams", searchParams)
  console.log("catName", catName)

  return (
    <>
      <div className="container mt-4">
        <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back</button>
        <div className="card">
          <div className="card-header">
            <h2>Breed Detail</h2>
          </div>
          <div className="card-body">
            <p><strong>Cat Breed ID:</strong> {catId}</p>
            <p><strong>Cat Breed Name:</strong> {catName}</p>
          </div>
        </div>
      </div>
    </>
  )
}


export default CatBreedDetails