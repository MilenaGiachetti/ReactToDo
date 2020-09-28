import React, {useState} from 'react';
import classes from './CreateList.module.scss';

const CreateList = React.memo ((props) => {
    const [ inputState, setInputState ] = useState('');

    const addList = () => {
        props.clicked(inputState)
        setInputState('');
    }

    const enterKeyDown = (event, action) => {
        if(event.key === 'Enter') {
            action();
        }
    }

    return (
        <div className={classes.inputGroup}>
            <input type="text" value={inputState} onKeyDown={event => enterKeyDown(event, addList)} onChange={(e) => setInputState(e.target.value)} placeholder="Add new list name"/>
            <button onClick={addList}><i className="fas fa-plus" title="Add new list"></i></button>
        </div>
    )
})

export default CreateList;