import React from 'react'
import { render } from 'react-dom'
import Routes from './routes'
import './scss/index.scss'

const App = () =>
  <React.StrictMode>
    <Routes />
  </React.StrictMode>

render(<App />, document.getElementById('spa-entry'))

if (module.hot) {
  module.hot.accept()
}
