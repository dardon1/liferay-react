import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Container, Navbar, Nav } from 'react-bootstrap'
import BlogOverview from './components/BlogOverview'
import BlogDetail from './components/BlogDetail'
import BlogForm from './components/BlogForm'

export default class extends React.Component {


	render() {
		return (
      <Container>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">
            Blogs
          </Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Overview</Nav.Link>
              <Nav.Link href="/new">New blog</Nav.Link>
            </Nav>
        </Navbar>
        <Switch>
          <Route path="/" exact component={BlogOverview} />
          <Route path="/blog/:id" component={BlogDetail} />
          <Route path="/new" exact component={BlogForm} />
        </Switch>
      </Container>
		);
	}
}
