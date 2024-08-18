import axios from 'axios'
import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Patients = () => {
  const [patients, setPatients] = useState([])
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(-1)
  const [selectedPatient, setSelectedPatient] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1) // Pagination state
  // const navigate = useNavigate()

  const recordsPerPage = 20

  useEffect(() => {
    axios.get('http://127.0.0.1:4040/patient')
      .then((response) => {
        setPatients(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  const handlePatientClick = (index) => {
    setSelectedPatientIndex(index)
    setSelectedPatient(patients[index].first_name)
  }

  // const handlePatientOpen = (index) => {
  //   navigate(`/patient?id=${encodeURIComponent(patients[index].id)}`)
  // }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(patients.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const currentRecords = patients.slice(startIndex, startIndex + recordsPerPage)
  console.log(selectedPatientIndex)

  return (
    <div className="container mt-4">
      <h5 className="text-center">This is from Patients.jsx file</h5>
      <h6 className="text-center">
        {selectedPatient === '' ? 'No patient is selected.' : `${selectedPatient} is selected.`}
      </h6>
      <div className="d-flex justify-content-center w-100">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="table-responsive w-100" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <table className="table table-hover table-bordered" style={{ height: '400px', tableLayout: 'fixed' }}>
              <thead className="table-light text-center">
                <tr style={{ height: '50px' }}>
                  <th scope="col" style={{ width: '200px' }}>Patient Name</th>
                  {/* <th scope="col" style={{ width: '100px' }}>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr
                    key={index}
                    className={selectedPatientIndex === index + startIndex ? 'table-active' : ''}
                    onClick={() => handlePatientClick(index + startIndex)}
                  >
                    <td>{item.first_name + ' ' + item.last_name}</td>
                    {/* <td className='d-flex flex-column justify-content-evenly'>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={(e) => { e.stopPropagation(); handlePatientOpen(index + startIndex) }}
                      >
                        Open
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <nav>
      <ul className="pagination justify-content-center" style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
            Previous
          </button>
        </li>
        {pages.map(page => (
          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Patients
