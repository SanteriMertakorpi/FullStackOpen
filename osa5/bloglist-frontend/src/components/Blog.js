import React,{ useState } from 'react'


const Blog = ({ blog,likeBlog,user,deleteBlog }) => {
  const [details, setDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidith: 1,
    marginBottom: 5
  }


  if(!details){
    return(
      <div style={blogStyle} className='blog'>
        <p>
          {blog.title} {blog.author}
          <button id='view' onClick={() => setDetails(true)}>view</button>
        </p>
      </div>
    )
  }
  if(details && blog.user.name === user.name){
    return(
      <div style={blogStyle} className='deletableBlog' >
        <p>
          {blog.title} {blog.author}
          <button onClick={() => setDetails(false)} className='dView'>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button id='deletable-like' onClick={likeBlog}>like</button>
        </p>
        <p>{blog.user.name}</p>
        <button id='delete' onClick={deleteBlog}>remove</button>
      </div>
    )
  }
  return(
    <div style={blogStyle} className='extendedBlog'>
      <p>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(false)} className='eView'>hide</button>
      </p>
      <p>{blog.url}</p>
      <p>
        {blog.likes}
        <button id='extended-like' onClick={likeBlog}>like</button>
      </p>
      <p>{blog.user.name}</p>

    </div>
  )


}




export default Blog