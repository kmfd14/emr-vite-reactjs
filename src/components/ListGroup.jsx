import { useState } from "react"

function ListGroup() {
  const items = ['Quezon City', 'Manila', 'Makati', 'Taguig', 'Pasig']
  const [selectedIndex, setSelectedIndex] = useState(-1) 


  return (
    <>
      <h5>This is from List Group.jsx file</h5>
      {items.length === 0 && <p>No items to display.</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li 
            className={ selectedIndex === index ? 'list-group-item active' : 'list-group-item' } 
            key={index}
            onClick={() => { setSelectedIndex(index)}}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListGroup
