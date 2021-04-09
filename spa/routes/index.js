/**
 * The Routing Component for the Single Page App
 */
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from 'Components/Header'
import Footer from 'Components/Footer'

import Home from './_root'
import About from './About'
import Topics from './Topics'

export default props =>
  <Router>
    <Header />
    <Switch>
      <Route path='/about'>
        <About />
      </Route>
      <Route path='/topics'>
        <Topics />
      </Route>
      <Route path='/'>
        <Home />
      </Route>
    </Switch>
    <Footer />
  </Router>
