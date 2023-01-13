import React from 'react'
import { useSelector } from "react-redux";
function Blogs() {
  const state = useSelector((state) => state.addForm.fields);
  // const njdcnn =JSON.parse(state)
  console.log('state', state)
  return (
    <div>Blogs{state.firstname}</div>
  )
}

export default Blogs