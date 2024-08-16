import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import AlertMessage from "../components/AlertMessage"

const GenderDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const genderId = decodeURIComponent(searchParams.get('id'))
  const [gender, setGender] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: ''
  })
  const [alertVisible, setAlertVisibility] = useState(false)

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
      setAlertVisibility(true)
      navigate(`/gender?id=${genderId}`) // Optionally navigate to the updated details
    } catch (error) {
      console.error('Error updating data:', error)
    }
  }

  return (
    <div className="mx-auto" style={{width: '98%'}}>
      <div className="d-flex flex-row gap-2 mx-2 mt-2">
        <button className="btn btn-secondary mb-3" style={{width: '5rem'}} onClick={() => navigate(-1)}>Back</button>
        <button className="btn btn-primary mb-3" style={{width: '5rem'}} onClick={handleEditClick}>Edit</button>
      </div>
      {alertVisible && 
        <AlertMessage 
          onClose={() => setAlertVisibility(false)} 
          messageValue="Saved successfully!" 
        />
      }
      <div style={{height: '79vh'}}>
        <form onSubmit={handleFormSubmit} className="gap-2">
          <div className="d-flex justify-content-between align-items-center p-0 m-0 rounded" style={{height: '3rem', border: '2px #4FB06D solid', backgroundColor: '#4FB06D', color: 'white'}}>
            <h2 className="mb-0 ps-1">Gender Details</h2>
            {isEditing && (
              <div className="d-flex flex-row gap-2 align-items-center pe-1">
                <button type="button" className="btn btn-secondary" style={{width: '5rem'}} onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{width: '5rem'}}>Save</button>
              </div>
            )}
          </div>
          <div className="border border-primary-subtle rounded mt-1 pb-1" style={{height: '70vh'}}>
            {isEditing ? (
              <>
                <div className="form-group row ms-1 me-1 pt-1">
                  <div className="row">
                    <label htmlFor="name" className="col-sm-1 col-form-label" style={{fontWeight: 'bold'}}>Name</label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        placeholder="Enter gender name"
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                    
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row ms-1 me-1 pt-1">
                  <div className="row">
                    <label htmlFor="name" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>Name</label>
                    <div className="col-sm-3">
                      <span className="form-control-plaintext" style={{paddingLeft: '0.81rem', borderBottom: '1px black solid'}}>{gender.name}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default GenderDetails
