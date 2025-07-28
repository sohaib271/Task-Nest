import { useSelector } from 'react-redux'
import LoginForm from './components/Login'
import SignupForm from './components/Signup'
import TodoApp from './components/TodoManagement'

function App() {
const token = useSelector((state) => state.user.token);
const user = useSelector((state) => state.user.loggedInUser);

  return (
    <>
    {token && user?<TodoApp/>:<LoginForm/>}
    </>
  )
}

export default App
