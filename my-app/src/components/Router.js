import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemDetail from './ItemDetail/ItemDetail';

function AppRouter() {
    return (
      <Router>
        <Switch>
          <Route path="/:id" component={ItemDetail} />
        </Switch>
      </Router>
    );
  }

export default AppRouter;