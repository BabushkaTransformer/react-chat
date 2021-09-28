import React, {useState} from 'react';
import styles from './styles.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addRoom, getMessages} from "../../store/slices/rooms";
import {signOut} from "../../store/slices/auth";


const Sidebar = () => {
    const dispatch = useDispatch();
    const {rooms, roomId} = useSelector(state => state.rooms);
    const [value, setValue] = useState('');

    return (
        <div className={styles.sidebar}>
            <div>
                <div className={styles.adding}>
                    <input value={value} placeholder='Добавить комнату' onChange={(e) => setValue(e.target.value)}/>
                    <button onClick={() => dispatch(addRoom(value))}>Добавить</button>
                </div>
                <div className={styles.rooms}>
                    {
                        rooms.map(room => <div className={roomId === room.id ? styles.roomActive : styles.room} onClick={() => dispatch(getMessages(room.id))} key={room.id}>{room.data?.name}</div>)
                    }
                </div>
            </div>
            <button className={styles.signOut} onClick={() => dispatch(signOut())}>Выйти</button>
        </div>
    );
};

export default Sidebar;
