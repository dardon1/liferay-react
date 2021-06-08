import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

function BlogDetail(props) {
  const { loading, error, data } = useQuery(BLOG_DETAIL_QUERY, {
    variables: { id: props.match.params.id }
  })

  if (loading) return <div>Fetching</div>
  if (error) return <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
      </pre>

  const blog = data.blogPosting

  return (
    <div>
      <Link to="/">Back to overview</Link>
      <div>
        <h2>
          {blog.headline}
        </h2>
        <span>{blog.creator.name}</span>
        <div dangerouslySetInnerHTML={{ __html:blog.articleBody}} />
      </div>
    </div>
  )
}

export default withRouter(BlogDetail)

const BLOG_DETAIL_QUERY = gql`
query BLOG_DETAIL_QUERY($id: Long){
  blogPosting(blogPostingId: $id){
    id
    headline
    articleBody
    creator {
      name
    }
  }
}
`
