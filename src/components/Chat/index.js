import React, {useRef, useState, useEffect} from 'react';
import styles from './styles.module.scss';
import {setMessage} from "../../store/slices/rooms";
import {useDispatch, useSelector} from "react-redux";
import firebase from "firebase/compat";

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef}/>;
};

const Chat = () => {
    const dispatch = useDispatch();
    const {messages, roomId} = useSelector(state => state.rooms);
    const user = useSelector(state => state.auth.user);
    const [value, setValue] = useState("");
    console.log(user)

    const sendMessage = (e) => {
        e.preventDefault();
        let message = {
            name: user.name,
            audio: '',
            image: '',
            message: value,
            time: firebase.firestore.FieldValue.serverTimestamp(),
        }
        dispatch(setMessage({roomId, message}))
    }

    return (
        <div className={styles.chat}>
            <div className={styles.messageContainer}>
                {messages.map(message => {
                    return (
                        <div className={message.data.name === user.name ? styles.myMessage : styles.message}
                             key={message.id}>
                            <div className={styles.messageInner}>
                                <div className={styles.name}>{message.data.name}</div>
                                <p className={styles.text}>{message.data.message}</p>
                                <span
                                    className={styles.time}>{new Date(message.data?.time?.toDate()).toUTCString()}</span>
                            </div>
                        </div>
                    )
                })}
                <AlwaysScrollToBottom/>
            </div>
            {roomId &&
            <div className={styles.send}>
                <input type='text' value={value} placeholder='Сообщение' onChange={(e) => setValue(e.target.value)}/>
                <button onClick={(e) => sendMessage(e)}>Отправить</button>
            </div>}
        </div>
    );
};

export default Chat;
