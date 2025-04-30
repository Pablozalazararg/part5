import { useState } from "react";

const Blog = ({ blog, addBlogLike }) => {
  const [showAll, setShowAll] = useState(true)
  const hideWhenVisible = { display: showAll ? 'none' : '' }
  const showWhenVisible = { display: showAll ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const toggleVisibility = () => {
    setShowAll(!showAll)
  }
return(
  <li key={blog.id} className="blog" style={blogStyle}>   
    <div>
      {blog.title} {blog.author} 
      <button className='viewButton' onClick={toggleVisibility} style={showWhenVisible}>view</button>
      <button className='hideButton' onClick={toggleVisibility} style={hideWhenVisible}>hide</button>
      <div className='additionalInfo' style={hideWhenVisible}>
        <ul>
          <li>URL: {blog.url}</li>
          <li>Likes: {blog.likes} <button onClick={addBlogLike}> like </button></li>
          
        </ul>
    
      </div>
    </div>
  </li>
)
}

export default Blog;