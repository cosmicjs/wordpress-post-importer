import React, { useState } from 'react'
import { Container, Button, Loader, Form } from 'semantic-ui-react'
import axios from 'axios'
const importPosts = (e) => {
  e.preventDefault()
  const bucket_slug = getParam('bucket_slug')
  const read_key = getParam('read_key')
  const write_key = getParam('write_key')
  const wordpress_url = e.target.elements.wordpress_url.value
  const number_posts = e.target.elements.number_posts.value
  const data = {
    bucket_slug,
    read_key,
    write_key,
    wordpress_url,
    number_posts
  }
  axios.post('http://localhost:3000/import-wordpress-posts', data)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
}
const getParam = (param) => {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}
const App = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Container style={{ marginBottom: 100 }}>
      <h1 style={{marginTop: 20}}>WordPress Import Extension</h1>
      <p>Follow the steps below to add your WordPress posts to your Cosmic JS Bucket.</p>
      <h2>Step 1:</h2>
      <p>Add your WordPress blog feed URL. You should be able to see the RSS feed at <code>http://yourwebsite.com/feed</code></p>
      <Form style={{ width: '50%'}} onSubmit={ importPosts.bind(this) }>
        <Form.Field>
          <label>Your WordPress blog feed URL</label>
          <input placeholder='http://yourwebsite.com/feed' name='wordpress_url'/>
        </Form.Field>
        <h2>Step 2:</h2>
        <p>How many posts do you want to import?</p>
        <Form.Field>
          <label>Number of posts</label>
          <input placeholder='100' type='number' name='number_posts' />
        </Form.Field>
        <h2>Step 3:</h2>
        <p>Import into your Cosmic JS Bucket.</p>
        <Button type='submit' onClick={() => setLoading(true)}>{ !loading ? 'Import into Cosmic JS' : 'Loading...'}</Button>
      </Form>
    </Container>
  )
}
export default App
