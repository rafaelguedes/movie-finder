var React = require('react');
var Home = require('./Home');
var Detail = require('./Detail');
var NotFound = require('./NotFound');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/detail' component={Detail} />
            <Route render={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

module.exports = App;
