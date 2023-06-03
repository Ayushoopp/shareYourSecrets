import React from 'react'

const api = (props) => {
  return (
    <>
        <div class="card">
   
   
    <p class="card-text">{props.secret}</p>
    
    <a href="/about" class="btn btn-primary">View</a>

</div>
    </>
  )
}

export default api