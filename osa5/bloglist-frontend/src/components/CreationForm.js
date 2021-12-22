import React, { useState } from 'react'

const CreationForm = ({ createBlog, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      user: user.id
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <div>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            id='title'
            type="text"
            value = {title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        auhtor:
          <input
            id='author'
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            id='url'
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='save-button' type="submit">create</button>

      </form>
    </div>
  )
}
export default CreationForm