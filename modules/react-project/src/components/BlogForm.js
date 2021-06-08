import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { withRouter } from 'react-router-dom'


function BlogForm() {
  const [newBlog, { error: mutationError, called: mutationCalled }] = useMutation(NEW_BLOG)
  const [form, setValues] = useState({
    headline: '',
    alternativeHeadline:'',
    articleBody: ''
  })

  const updateField = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    newBlog({ variables:  {blog: form  }})
  }


  return (
    <div>
      <h2>
        New Blog
      </h2>
      <Form onSubmit={handleSubmit}>
        {mutationError && <Alert variant="danger">Error. Please try again</Alert>}
        {!mutationError && mutationCalled && <Alert variant="success">Successfully saved</Alert>}
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control required type="text" name="headline" value={form.headline} onChange={updateField} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control type="text" name="alternativeHeadline" value={form.alternativeHeadline} onChange={updateField} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label>Article</Form.Label>
          <Form.Control required type="textarea" name="articleBody" value={form.articleBody} onChange={updateField} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default withRouter(BlogForm)


const NEW_BLOG= gql`
mutation CreateBlog($blog: InputBlogPosting){
  createSiteBlogPosting(blogPosting: $blog, siteKey: "37244" ) {
    headline
    articleBody
    id
    friendlyUrlPath
  }
}
`
