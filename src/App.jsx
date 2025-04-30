import { useState, useEffect , useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blog'
import loginService from './services/login'
import Notification from './components/Notification'
import blog from './services/blog'

const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  
  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()
  
  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility() // Hide creation form
    blogService.create(newBlog).then(returnedBlog=>setBlogs(blogs.concat(returnedBlog)))
  }   
  

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  } 
  
  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
      )
    }

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef} >
       <BlogForm addBlog={addBlog} />
    </Togglable>
  )
   
  const addBlogLike = id => {
    
    const blogToUpdate = blogs.find(n=> n.id === id)
    const updatedBlog  = {...blogToUpdate, likes: blogToUpdate.likes+1}
    blogService.update(id,updatedBlog)
    .then(returnedBlog => {
      setBlogs(blogs.map(note => note.id !== id ? note : returnedBlog))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${blog.title}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    
  }
  
  const blogList = () => {
    return (
      <ul>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addBlogLike={()=>addBlogLike(blog.id)}
          />
        )}
      </ul>
    )
  }
  

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        {blogForm()}
      </div>
      }
      <ul>
        {blogList()}
      </ul>

      
    </div>
  )
}

export default App


