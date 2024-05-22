import React from 'react'
import Helmet from "react-helmet"
function Metadata(props) {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  )
}

export default Metadata
