import React, {useState, useRef, useEffect} from 'react';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    const [inputValueState, setInputValueState] = useState(props.content);
    const inputRef = useRef();
    useEffect(() => {
        if(inputRef.current){
            console.log(inputRef.current)
            inputRef.current.focus();
        }
    }, [props.editingItemId])
    return (
        <li className={classes.ListItem}>
            {props.editingItemId === props.id ?
                <input type="text" className={classes.Editing} value={inputValueState} onChange={(e) => {setInputValueState(e.target.value); props.editTask(props.listId, props.id, e.target.value)}} ref={inputRef} />
                : <p className={props.complete === true ? classes.Complete : classes.Incomplete }>{props.content}</p>
            }
            <div className={classes.ButtonGroup}>
                {/* edit complete delete */}
                <button onClick={() => {props.toggleEditing(props.id)}}><i className="fas fa-edit"></i></button>
                <button onClick={() => {props.toggleComplete(props.listId, props.id)}}><i className="fas fa-check"></i></button>
                <button onClick={() => {props.delete(props.listId, props.id)}}><i className="fas fa-trash"></i></button>
            </div>
        </li>
    )
}

export default ListItem;