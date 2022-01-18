import React from 'react'

import PropTypes from 'prop-types'
const Blog = (props) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <td style={blogStyle}>
      {props.blog.title} by {props.blog.author}
    </td>
  )

}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog