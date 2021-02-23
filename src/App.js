import React, { useState } from 'react'
import { Grid, Modal, Message, Icon, Header, Dimmer, Container, Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import './index.css';
const WP_IMPORT_URL = 'https://wordpress-import-server.herokuapp.com/import-wordpress-posts'
// const WP_IMPORT_URL = 'http://localhost:3000/import-wordpress-posts'
const getParam = (param) => {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}
const App = () => {
  const bucket_slug = getParam('bucket_slug')
  const read_key = getParam('read_key')
  const write_key = getParam('write_key')
  const importPosts = (e) => {
    e.preventDefault()
    const wordpress_url = e.target.elements.wordpress_url.value
    const number_posts = e.target.elements.number_posts.value
    if (!wordpress_url.trim() || !number_posts) {
      return false
    }
    const data = {
      bucket_slug,
      read_key,
      write_key,
      wordpress_url,
      number_posts
    }
    setLoading(true)
    axios.post(WP_IMPORT_URL, data)
    .then(response => {
      setLoading(false)
      setShowSuccessModal(true)
    })
    .catch(error => {
      console.log(error)
      setLoading(false)
      setShowFailModal(true)
    })
  }
  const [loading, setLoading] = useState(false)
  const [show_success_modal, setShowSuccessModal] = useState(false)
  const [show_fail_modal, setShowFailModal] = useState(false)
  if (loading) {
    return (
      <Dimmer active>
        <h2 style={{ marginBottom: 60 }}>Importing your posts...</h2>
        <Grid columns='three'>
          <Grid.Column>
            <div className="card-floating" style={{ width: 180, height: 180 }}><img alt="WordPress Logo" style={{ width: '100%' }} src={`https://cdn.cosmicjs.com/fdd328b0-761f-11eb-8bee-5f792a271a88-wp-logo.png`} /></div>
          </Grid.Column>
          <Grid.Column style={{paddingTop: 50, textAlign: 'center'}}>
            <svg className="objects-import" width="486" height="468" viewBox="0 0 486 418" fill="none">
              <path d="M225 6673V38" stroke="#00AFD7" stroke-opacity=".4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="5 15"></path>
            </svg>
          </Grid.Column>
          <Grid.Column>
          <div className="card-floating" style={{ width: 180, height: 180 }}><img alt="Cosmic Logo" style={{ width: '100%' }} src={`https://web-assets.cosmicjs.com/images/logo.svg`} /></div>
          </Grid.Column>
        </Grid>
      </Dimmer>
    )
  }
  if (show_success_modal) {
    return (
      <Modal open={true} basic size='small'>
        <Header icon='check' color='green' content='Posts Imported' />
        <Modal.Content>
          <p style={{ fontSize: 16 }}>
            Your posts have been successfully imported!&nbsp;&nbsp;&nbsp;<a href={`https://app.cosmicjs.com/${bucket_slug}/objects?type=posts`} target='_parent'>Go see them&nbsp;&nbsp;<Icon name='external' /></a>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted onClick={() => setShowSuccessModal(false)}>
            <Icon name='times' /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
  if (show_fail_modal) {
    return (
      <Modal open={true} basic size='small'>
        <Header icon='times' color='red' content='Posts Not Imported' />
        <Modal.Content>
          <p style={{ fontSize: 16 }}>
            There was an error with this request. Make sure the URL is a correct URL with the WordPress RSS feed. 
            For example: https://techcrunch.com/feed&nbsp;&nbsp;<a href="https://techcrunch.com/feed" target="_blank" rel="noopener noreferrer"><Icon name="external" /></a>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted onClick={() => setShowFailModal(false)}>
            <Icon name='times' /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
  const num_options = []
  let i = 20
  while(i <= 200) {
    num_options.push(i)
    i+=20
  }
  return (
    <Container style={{ marginBottom: 100, paddingTop: 20 }}>
      <h1>WordPress Import</h1>
      <div style={{ marginBottom: 20 }}>
        <img alt="WordPress to Cosmic" style={{ width: 250, height: 116 }} src='https://cosmic-s3.imgix.net/31cc7ee0-2d80-11e9-9636-75201e82cc8c-wordpress-to-cosmic.jpg?w=500' />
        { /* Hidden images loaded in bg */ }
        <img alt="WordPress Logo" src={`https://cdn.cosmicjs.com/fdd328b0-761f-11eb-8bee-5f792a271a88-wp-logo.png`} style={{ width: 0, height: 0 }}/>
        <img alt="Cosmic Logo" src={`https://web-assets.cosmicjs.com/images/logo.svg`} style={{ width: 0, height: 0 }}/>
      </div>
      <p>Follow the steps below to add your WordPress posts to your Cosmic Bucket.</p>
      <h2>Step 1:</h2>
      <p>Add your WordPress blog feed URL. You should be able to see the RSS feed at <br /><code>http://yourwebsite.com/feed</code></p>
      <p>Or copy this working URL: <br /><code>https://techcrunch.com/feed</code>&nbsp;&nbsp;<a href="https://techcrunch.com/feed" target="_blank" rel="noopener noreferrer"><Icon name="external" /></a></p>
      <Form onSubmit={ importPosts.bind(this) }>
        <Form.Field>
          <label>Your WordPress blog feed URL</label>
          <input placeholder='http://yourwebsite.com/feed' style={{ width: 300 }} name='wordpress_url'/>
        </Form.Field>
        <h2>Step 2:</h2>
        <p>How many posts do you want to import? This will import the latest posts (and will not import duplicates).</p>
        <Form.Field>
          <label>Number of posts</label>
          <select name='number_posts' style={{ width: 100 }}>
            {
              num_options.map(num => {
                return <option key={num} value={num}>{num}</option>
              })
            }
          </select>
        </Form.Field>
        <h2>Step 3:</h2>
        <p>Click the button!</p>
        <Message>
          <Message.Header>WARNING</Message.Header>
          <p>This will import into the <code>posts</code> Object Type in the Bucket <code>{ bucket_slug }</code></p>
        </Message>
        <Button type='submit' style={{ backgroundColor: '#00AFD7', color: '#fff' }}>{ !loading ? 'Import into Cosmic' : 'Loading...'}</Button>
      </Form>
    </Container>
  )
}
export default App
