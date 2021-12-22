import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import CreationForm from './components/CreationForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notifmasg, setNotifMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const addBlog = async (blogObject) => {
    creationFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setNotifMsg(`a new blog: ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => {
      setNotifMsg(null)
    },5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      setNotifMsg('wrong username or password')
      setTimeout(() => {
        setNotifMsg(null)
      },5000)
    }
  }
  const loginForm = () => (
    <Togglable buttonLabel ='log in'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )
  const creationFormRef = useRef()
  const creationForm = () => (
    <Togglable buttonLabel = 'add new' ref={creationFormRef}>
      <CreationForm createBlog={addBlog} user={user} />
    </Togglable>
  )
  const logOut = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    window.location.reload(false)
  }
  const giveLike = async (id) => {
    const blog = blogs.find(b => b.id===id)
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes +1,
      user: blog.user.id
    }
    await blogService.update(id, changedBlog)
    setBlogs(await blogService.getAll())

  }
  const removeBlog = async (id) => {
    const blog = blogs.find(b => b.id===id)
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id!==id))
    }


  }
  const compare = (a, b) => {
    if(a.likes < b.likes){
      return 1
    }
    if(a.likes > b.likes){
      return -1
    }
    return 0
  }


  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification.Error message={notifmasg}/>
        {loginForm()}
      </div>
    )
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification.Notification message={notifmasg}/>
      <p>
        {user.name} logged in
        <button onClick={logOut}>logout</button>
      </p>
      <h2>create new</h2>
      {creationForm()}
      {blogs.sort(compare).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          likeBlog={() => giveLike(blog.id)}
          user={user}
          deleteBlog={() => removeBlog(blog.id)}
        />
      )}
    </div>
  )
}

export default App