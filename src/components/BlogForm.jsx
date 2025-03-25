import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor,setNewAuthor] = useState('')
  const [newUrl,setNewUrl] = useState('')
  const [newLikes,setNewLikes] = useState(0)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    setNewLikes('')
  }

  return (
    <div>
      <h2>Create a new Blog</h2>

      <form onSubmit={addBlog}>
        <div>Title <input value={newTitle} onChange={event => setNewTitle(event.target.value)}/></div>
        <div>Author <input value={newAuthor} onChange={event => setNewAuthor(event.target.value)}/></div>
        <div>Url <input value={newUrl} onChange={event => setNewUrl(event.target.value)}/></div> 
        <div>Likes <input value={newLikes} onChange={event => setNewLikes(event.target.value)}/></div>      
        
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm