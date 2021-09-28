import './App.css';
import Sidebar from "./components/Sidebar";
import {useEffect, useState} from "react";
import {fetchRooms} from "./store/slices/rooms";
import {useDispatch, useSelector} from "react-redux";
import {authChecking, setUser, signIn} from "./store/slices/auth";
import Chat from "./components/Chat";


function App() {
    const dispatch = useDispatch();
    const [value, setValue] = useState();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchRooms());
        dispatch(authChecking());
    }, [dispatch])

    const nameInputHandler = () => {
        if(value) {
            let user = {
                name: value
            }
            dispatch(setUser(user))
        }
    }

    return (
        <div className="App">
            {
                !Object.keys(user).length ?
                    <div className='auth'>
                        <input type='text' value={value} placeholder='Имя пиши' onChange={(e) => setValue(e.target.value)}/>
                        <button onClick={() =>  nameInputHandler()}>Зарегайся</button>
                    </div> :
                    <>
                        <Sidebar/>
                        <Chat/>
                    </>
            }
        </div>
    );
}

export default App;
