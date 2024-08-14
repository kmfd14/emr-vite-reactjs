import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const GenderDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const genderId = decodeURIComponent(searchParams.get('id'))
  const [gender, setGender] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: ''
  })

  useEffect(() => {
    const fetchData = async () => {
      axios.get(`http://127.0.0.1:4040/gender/${genderId}`)
        .then((response) => {
          setGender(response.data)
          setFormData({ name: response.data.name })
        })
        .catch((error) => {
          console.error('Error fetching data:', error)
        })
    }

    fetchData()
  }, [genderId])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://127.0.0.1:4040/gender/${genderId}`, { gender: formData })
      setGender(response.data) // Update the gender state with the new data
      setIsEditing(false) // Exit editing mode
      navigate(`/gender?id=${genderId}`) // Optionally navigate to the updated details
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-row gap-2">
        <button className="btn btn-secondary mb-3" style={{width: '5rem'}} onClick={() => navigate(-1)}>Back</button>
        <button className="btn btn-primary mb-3" style={{width: '5rem'}} onClick={handleEditClick}>Edit</button>
      </div>
      <div className="card" style={{height: '89vh'}}>
        <form onSubmit={handleFormSubmit}>
          <div className="card-header d-flex flex-row justify-content-between">
            <h2>Gender Detail</h2>
            {isEditing && (
              <div className="d-flex flex-row gap-2 justify-content-center align-items-center">
                <button type="button" className="btn btn-secondary mt-2 ml-2" style={{width: '5rem'}} onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary mt-2 bg-gradient-success" style={{width: '5rem'}}>Save</button>
              </div>
            )}
          </div>
          <div className="card-body">
            {isEditing ? (
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Name</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control w-25"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder="Enter gender name"
                    onChange={handleInputChange}
                    required={true}
                  />
                </div>
              </div>
            ) : (
              <>
                <p><strong>Gender ID:</strong> {gender.id}</p>
                <p><strong>Name:</strong> {gender.name}</p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default GenderDetails
