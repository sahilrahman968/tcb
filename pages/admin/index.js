import React from 'react'

const index = () => {
  const clickHandler = async () => {
      let response = await fetch("/api/addProduct",{
        method:"post"
      })

      response = await response.json()
  }
  return (
    <div>
        <button onClick={clickHandler}>Add Product</button>      
    </div>
  )
}

export default index