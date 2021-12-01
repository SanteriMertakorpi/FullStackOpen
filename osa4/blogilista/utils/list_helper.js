const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.length === 0
    ? 0
    : likes.reduce(reducer,0)
}

const favouriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  const topBlog = blogs.find(blog => maxLikes===blog.likes)
  return likes.length === 0 
    ? { 'error': 'No blogs'}
    : {
      'title': topBlog.title,
      'author': topBlog.author,
      'likes' : topBlog.likes
    }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}

