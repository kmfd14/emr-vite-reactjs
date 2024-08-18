import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const Cats = () => {
  const [catBreeds, setCatBreeds] = useState([])
  const [selectedBreedIndex, setSelectedBreedIndex] = useState(-1)
  const [selectedBreed, setSelectedBreed] = useState('')
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1) // Pagination state
  const navigate = useNavigate()

  const recordsPerPage = 20

  useEffect(() => {
    axios.get('https://api.thecatapi.com/v1/breeds')
      .then((response) => {
        setCatBreeds(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  const handleCatClick = (index) => {
    setSelectedBreedIndex(index)
    setSelectedBreed(catBreeds[index].name)
  }

  const handleCatBreedOpen = (index) => {
    navigate(`/cat?id=${encodeURIComponent(catBreeds[index].id)}`)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(catBreeds.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const currentRecords = catBreeds.slice(startIndex, startIndex + recordsPerPage)

  return (
    <div className="container mt-4">
      <h6 className="text-center">
        {selectedBreed === '' ? 'No cat breed is selected.' : `${selectedBreed} is selected.`}
      </h6>
      <div className="d-flex justify-content-center w-100">
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="table-responsive w-100 rounded shadow bg-body-tertiary" style={{ maxHeight: '71vh', border: 'solid 2px gray'}}>
            <table className="table table-hover table-bordered" style={{height: '400px'}}>
              <thead className="table-light text-center">
                <tr>
                  <th scope="col">Breed Name</th>
                  <th scope="col" style={{width: '100px'}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr
                    key={index}
                    className={selectedBreedIndex === index + startIndex ? 'table-active' : ''}
                    onClick={() => handleCatClick(index + startIndex)}
                  >
                    <td>{item.name}</td>
                    <td className='d-flex flex-column justify-content-evenly'>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={(e) => { e.stopPropagation(); handleCatBreedOpen(index + startIndex) }}
                      >
                        Open
                      </button>
                    </td>
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
    <nav className='pt-4'>
      <ul className="pagination justify-content-center">
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

export default Cats
