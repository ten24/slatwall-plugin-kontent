import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProductPicker from './plugins/ProductPicker/ProductPicker'
import SpecialPage from './plugins/SpecialPage/SpecialPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/product-picker" exact>
          <ProductPicker />
        </Route>
        <Route path="/special-page" exact>
          <SpecialPage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
