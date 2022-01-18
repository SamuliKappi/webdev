import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders correct elements', () => {
  const blog = {
    'title': 'testiblogxd',
    'author': 'test',
    'url': 'www.blog3.com',
    'likes': 1337420,
    'user': {
      'username': 'teppo',
      'name': 'turboman',
      'id': '6197db9a04287b5225641d3b'
    }
  }
  const component = render(
    <Blog blog={blog} reloadBlogs={false} setReloadBlogs={() => true} />
  )
  expect(component.container).toHaveTextContent(
    'testiblogxd by test'
  )
  expect(component.container.querySelector('.togglableContent')).toHaveStyle(
    'display: none'
  )
})
test('correct elements are shown after click', () => {
  const blog = {
    'title': 'testiblogxd',
    'author': 'test',
    'url': 'www.blog3.com',
    'likes': 1337420,
    'user': {
      'username': 'teppo',
      'name': 'turboman',
      'id': '6197db9a04287b5225641d3b'
    }
  }
  const component = render(
    <Blog blog={blog} reloadBlogs={false} setReloadBlogs={() => true} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)
  const element = component.container.querySelector('.togglableContent')
  expect(element).not.toHaveStyle(
    'display: none'
  )
  expect(element).toHaveTextContent(
    'www.blog3.com'
  )
  expect(element).toHaveTextContent(
    '0'
  )
})
test('form calls event handler with correct props', () => {
  const mockHandler = jest.fn()
  const component = render(
    <BlogForm handleNewBlog={mockHandler} />
  )
  const button = component.getByText('create a new blog')
  fireEvent.click(button)
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const title = component.container.querySelector('#title')
  const form = component.container.querySelector('form')
  fireEvent.change(author, {
    target: { value: 'testiman' }
  })
  fireEvent.change(url, {
    target: { value: 'testiman.com' }
  })
  fireEvent.change(title, {
    target: { value: 'the big testing' }
  })
  fireEvent.submit(form)
  expect(mockHandler.mock.calls).toHaveLength(1)
})