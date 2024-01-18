import { useNavigate } from 'react-router-dom';
import '../App.css';
import { removeToken } from '../auth';
import Base from '../Components/Base';

function Logout(){

    removeToken();

    return(
        <Base></Base>
    );

}

export default Logout;