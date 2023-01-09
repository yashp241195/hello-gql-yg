import './App.css';
import { useLazyQuery, gql } from '@apollo/client';

function App() {

  const HelloQuery = gql`
    query Hello{
      hello
    }
  `

  const [doLogin,{loading, error, data}] = useLazyQuery(HelloQuery)

  const onLoginClick = () =>{ doLogin() }

  if(loading) return null
  if(error) {console.log("Error",JSON.stringify(error))}
  if(data){ console.log("data",JSON.stringify(data)) }

  return (
    <div className="App">
      <br/>{data && JSON.stringify(data)}
      <br/><button onClick={()=>onLoginClick()}>Login</button>
    </div>
  );
}

export default App
