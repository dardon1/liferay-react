import React from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function BlogOverview() {
  const { loading, error, data } = useQuery(FIND_ALL_BLOGS)
  const [deleteBlog] = useMutation(DELETE_BLOG)

  if (loading) return <div>Fetching</div>
  if (error) return <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
        <span key={i}>{message}</span>
      ))}
      </pre>

  const handleDelete = blog => {
    if (window.confirm('Are you sure you want do delete this blog?')) {
      deleteBlog({
        variables: { id: blog.id },
        refetchQueries: () => [{ query: FIND_ALL_BLOGS}]
      })
    }
  }

  return (
    <div>
      <h2>
        Overview
      </h2>
      <div className="blog-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.blogPostings.items.map(blog => (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blog/${blog.id}`}>{blog.headline}</Link>
                </td>
                <td>{blog.creator.name}</td>
                <td>
                  <span className="pointer" role="img" aria-label="delete" onClick={() => handleDelete(blog)}>
                    🗑️
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

const FIND_ALL_BLOGS = gql`
{
blogPostings(filter: "", page: 1, pageSize: 10, search: "", siteKey: "37244", sort: "") {
  page
  items {
    id
    headline
    creator {
      name
    }
  }
}
}
`

const DELETE_BLOG = gql`
mutation DELETE_BLOG($id: Long){
  deleteBlogPosting(blogPostingId:  $id)
}
`
