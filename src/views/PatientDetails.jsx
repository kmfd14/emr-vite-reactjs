import { useSearchParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import AlertMessage from "../components/AlertMessage"

const PatientDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const patientId = decodeURIComponent(searchParams.get('id'))
  const [patient, setPatient] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birthdate: '',
    gender_id: 0,
    address_line_1: '',
    address_line_2: '',
    city: '',
    province: '',
    country: '',
    zipcode: '',
    present_address: ''
  })
  const [alertVisible, setAlertVisibility] = useState(false)
  const [genderOptions, setGenderOptions] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await axios.get(`http://127.0.0.1:4040/patient/${patientId}`)
        setPatient(patientResponse.data)
        setFormData({
          first_name: patientResponse.data.first_name,
          middle_name: patientResponse.data.middle_name,
          last_name: patientResponse.data.last_name,
          birthdate: patientResponse.data.birthdate,
          gender_id: patientResponse.data.gender_id,
          present_address: patientResponse.data.present_address,
          address_line_1: patientResponse.data.address_line_1,
          address_line_2: patientResponse.data.address_line_2,
          city: patientResponse.data.city,
          province: patientResponse.data.province,
          country: patientResponse.data.country,
          zipcode: patientResponse.data.zipcode
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const fetchGenderOptions = async () => {
      try {
        const genderResponse = await axios.get('http://127.0.0.1:4040/gender')
        setGenderOptions(genderResponse.data)
      } catch (error) {
        console.error('Error fetching gender options:', error)
      }
    }

    fetchData()
    fetchGenderOptions()
  }, [patientId])

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleInputChange = (e) => {

    const { name, value } = e.target

    const newFormData = { ...formData, [name]: value }
    let address_line_1 = newFormData.address_line_1 || ''
    let address_line_2 = newFormData.address_line_2 || ''
    let city = newFormData.city || ''
    let province = newFormData.province || ''
    let country = newFormData.country || ''
    let zipcode = newFormData.zipcode || ''

    newFormData.present_address = `${address_line_1}, ${address_line_2}, ${city}, ${province}, ${country}, ${zipcode}`
      .trim()
      .replace(/ ,/g, '')
      .replace(/^,|,$/g, '')

    // setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormData(newFormData)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://127.0.0.1:4040/patient/${patientId}`, { patient: formData })
      setPatient(response.data)
      setIsEditing(false)
      setAlertVisibility(true)
      navigate(`/patient?id=${patientId}`)
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
            <h2 className="mb-0 ps-1">Patient Details</h2>
            {isEditing && (
              <div className="d-flex flex-row gap-2 align-items-center pe-1">
                <button type="button" className="btn btn-secondary" style={{width: '5rem'}} onClick={() => setIsEditing(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{width: '5rem'}}>Save</button>
              </div>
            )}
          </div>
          <div className="border border-primary-subtle rounded mt-1 pb-1" style={{height: '70vh', border: '2px #4FB06D solid'}}>
            {isEditing ? (
              <>
                <div className="form-group row ms-1 me-1 pt-1 gap-2">
                  <div className="row">
                    <label htmlFor="first_name" className="col-sm-1 col-form-label" style={{fontWeight: 'bold'}}>First Name</label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name}
                        placeholder="Enter patient first name"
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                    <label htmlFor="middle_name" className="col-sm-1 col-form-label" style={{fontWeight: 'bold'}}>Middle Name</label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        id="middle_name"
                        name="middle_name"
                        value={formData.middle_name}
                        placeholder="Enter patient middle name"
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                    <label htmlFor="last_name" className="col-sm-1 col-form-label" style={{fontWeight: 'bold'}}>Last Name</label>
                    <div className="col-sm-3">
                      <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name}
                        placeholder="Enter patient last name"
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="birthdate" className="col-sm-1 col-form-label" style={{fontWeight: 'bold'}}>Birthdate</label>
                    <div className="col-sm-3">
                      <input
                        type="date"
                        className="form-control"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                        required={true}
                      />
                    </div>
                    <label htmlFor="gender_id" className="col-sm-1 col-form-label" style={{fontWeight: 'bold'}}>Gender</label>
                    <div className="col-sm-2">
                      <select
                        className="form-select"
                        id="gender_id"
                        name="gender_id"
                        value={formData.gender_id}
                        onChange={handleInputChange}
                        required={true}
                      >
                        <option value="">Select Gender</option>
                        {genderOptions.map((gender) => (
                          <option key={gender.id} value={gender.id}>
                            {gender.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="address_line_1" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Address Line 1</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="address_line_1"
                        name="address_line_1"
                        value={formData.address_line_1}
                        placeholder="Enter Address Line 1"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="address_line_2" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Address Line 2</label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        id="address_line_2"
                        name="address_line_2"
                        value={formData.address_line_2}
                        placeholder="Enter Address Line 2"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="city" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>City</label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        value={formData.city}
                        placeholder="Enter City"
                        onChange={handleInputChange}
                      />
                    </div>
                    <label htmlFor="province" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Province</label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        id="province"
                        name="province"
                        value={formData.province}
                        placeholder="Enter Province"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="country" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Country</label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        id="country"
                        name="country"
                        value={formData.country}
                        placeholder="Enter Country"
                        onChange={handleInputChange}
                      />
                    </div>
                    <label htmlFor="zipcode" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Zipcode</label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        id="zipcode"
                        name="zipcode"
                        value={formData.zipcode}
                        placeholder="Enter Zip Ccode"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="present_address" className="col-sm-2 col-form-label" style={{fontWeight: 'bold'}}>Present Address</label>
                    <div className="col-sm-10">
                      <textarea
                        className="form-control"
                        id="present_address"
                        name="present_address"
                        value={formData.present_address}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        placeholder="Present address will be generated here"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row ms-1 me-1 pt-1 gap-2">
                  <div className="row">
                    <label htmlFor="first_name" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>First Name</label>
                    <div className="col-sm-3">
                      <span className="form-control-plaintext" style={{paddingLeft: '0.81rem', borderBottom: '1px black solid'}}>{patient.first_name}</span>
                    </div>
                    <label htmlFor="middle_name" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>Middle Name</label>
                    <div className="col-sm-3">
                      <span className="form-control-plaintext" style={{paddingLeft: '0.81rem', borderBottom: '1px black solid'}}>{patient.middle_name}</span>
                    </div>
                    <label htmlFor="last_name" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>Last Name</label>
                    <div className="col-sm-3">
                      <span className="form-control-plaintext" style={{paddingLeft: '0.81rem', borderBottom: '1px black solid'}}>{patient.last_name}</span>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="birthdate" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>Birthdate</label>
                    <div className="col-sm-2">
                      <span className="form-control-plaintext" style={{paddingLeft: '0.81rem', borderBottom: '1px black solid'}}>{moment(patient.birthdate).format('MM/DD/YYYY')}</span>
                    </div>
                    <label htmlFor="age" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>Age</label>
                    <div className="col-sm-1">
                      <span className="form-control-plaintext" style={{borderBottom: '1px black solid', textAlign: 'center'}}>{moment().diff(patient.birthdate, 'years')}</span>
                    </div>
                    <label htmlFor="gender" className="col-sm-1 col-form-label" style={{ fontWeight: 'bold' }}>Gender</label>
                    <div className="col-sm-2">
                      <span className="form-control-plaintext" style={{paddingLeft: '0.81rem', borderBottom: '1px black solid'}}>
                        {genderOptions.find(gender => gender.id === patient.gender_id)?.name || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="address_line_1" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      Address Line 1
                    </label>
                    <div className="col-sm-10">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.address_line_1}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="address_line_2" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      Address Line 2
                    </label>
                    <div className="col-sm-10">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.address_line_2}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="city" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      City
                    </label>
                    <div className="col-sm-4">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.city}
                      </span>
                    </div>
                    <label htmlFor="province" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      Province
                    </label>
                    <div className="col-sm-4">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.province}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="country" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      Country
                    </label>
                    <div className="col-sm-4">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.country}
                      </span>
                    </div>
                    <label htmlFor="zipcode" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      Zipcode
                    </label>
                    <div className="col-sm-4">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.zipcode}
                      </span>
                    </div>
                  </div>
                  <div className="row">
                    <label htmlFor="present_address" className="col-sm-2 col-form-label" style={{ fontWeight: 'bold' }}>
                      Present Address
                    </label>
                    <div className="col-sm-10">
                      <span className="form-control-plaintext" style={{ borderBottom: '1px black solid' }}>
                        {patient.present_address}
                      </span>
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

export default PatientDetails
