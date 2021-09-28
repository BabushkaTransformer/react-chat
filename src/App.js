import './App.css';
import Sidebar from "./components/Sidebar";
import {useEffect} from "react";
import {fetchRooms} from "./store/slices/rooms";
import {useDispatch, useSelector} from "react-redux";
import {authChecking, signIn} from "./store/slices/auth";
import Chat from "./components/Chat";


function App() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        dispatch(fetchRooms());
        dispatch(authChecking());
    }, [dispatch])

    return (
        <div className="App">
            {
                !Object.keys(user).length ?
                    <div className='auth'>
                        <button onClick={() =>  dispatch(signIn())}>Зарегайся</button>
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
