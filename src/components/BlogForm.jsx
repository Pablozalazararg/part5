import { useState } from "react"

const BlogForm = ({addBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newUrl,setNewUrl] = useState('') 

  const handleRaddBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    
    
  }

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={handleRaddBlog}>
        <div>Title <input value={newTitle} onChange={({target})=> setNewTitle(target.value)}/></div>
        <div>Author <input value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}/></div>
        <div>Url <input value={newUrl} onChange={({target})=> setNewUrl(target.value)}/></div> 
              
        
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm