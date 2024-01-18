import '../App.css';
import NavBar from './NavBar';

const Base = ({children}) =>  {
    return (
        <div className="App">
            <NavBar />
            {children}
        </div>
    );
}

export default Base;