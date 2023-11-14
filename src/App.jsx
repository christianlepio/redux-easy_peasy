// before running this app, server should run first!
// type this command on terminal 'npx json-server -p 3500 -w data/db.json' to run the server...
import AppRoutes from './components/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
//this will allow component to access state variable or function from easy-peasy redux
import { StoreProvider } from 'easy-peasy'
//pass your store as a props to StoreProvider
import store from './store/store'

function App() {

  return (
    <>
      <StoreProvider store={store}>
        <Router>
          <AppRoutes />
        </Router>
      </StoreProvider>
    </>
  )
}

export default App
