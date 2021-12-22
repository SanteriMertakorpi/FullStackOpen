import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    title: 'this is a title',
    author: 'this is an author',
    url:'this is an url'
  }
  const component = render(
    <Blog blog={blog} />
  )
  expect(component.container).toHaveTextContent('this is a title')
  expect(component.container).toHaveTextContent('this is an author')
  expect(component.container).not.toHaveTextContent('this is an url')
  expect(component.container).not.toHaveTextContent(0)
})
test('clicking the button renders also url and likes', () => {
  const user = {
    username: 'user_name',
    name: 'na_me',
    id:'i_d'
  }
  const blog = {
    title: 'this is a title',
    author: 'this is an author',
    url:'this is an url',
    likes: 0,
    user:{
      username: 'username',
      name: 'name',
      id:'id'
    }
  }
  const component = render(
    <Blog blog={blog} user={user} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  expect(component.container).toHaveTextContent('this is a title')
  expect(component.container).toHaveTextContent('this is an author')
  expect(component.container).toHaveTextContent('this is an url')
  expect(component.container).toHaveTextContent(0)
})
test('like button is pressed twice, so event handler is called twice', () => {
  const giveLike = jest.fn()
  const user = {
    username: 'user_name',
    name: 'na_me',
    id:'i_d'
  }
  const blog = {
    title: 'this is a title',
    author: 'this is an author',
    url:'this is an url',
    likes: 0,
    user:{
      username: 'username',
      name: 'name',
      id:'id'
    }
  }
  const component = render(
    <Blog blog={blog} user={user} likeBlog={giveLike} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  const likebutton = component.getByText('like')
  fireEvent.click(likebutton)
  fireEvent.click(likebutton)
  expect(giveLike.mock.calls).toHaveLength(2)
})