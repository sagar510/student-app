
import '../App.css';
import Base from '../Components/Base.js';
import { getCurrentUser } from '../auth.js';
import { isAuthenticated } from '../auth.js';

function Home() {

   const curruser = getCurrentUser(); 
   const logIn = isAuthenticated();

  return (
    <Base>
      <div className="App">
      
        {logIn?
          <h1>Hello {curruser?.role}, {curruser?.email}</h1>
          :
          <h1>Hello, User</h1>
        }

        <img src='https://media-public.canva.com/sAoQk/MAEvNosAoQk/1/tl.png' />
      
    </div>
    </Base>
  );
}

export default Home;
