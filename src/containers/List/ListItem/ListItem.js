import React, {useState, useRef, useEffect} from 'react';
import classes from './ListItem.module.scss';

const ListItem = (props) => {
    const [inputValueState, setInputValueState] = useState(props.content);
    const inputRef = useRef();
    useEffect(() => {
        if(inputRef.current){
            inputRef.current.focus();
        }
    }, [props.editingItemId])
    return (
        <li className={classes.ListItem}>
            {props.editingItemId === props.id ?
                <input type="text" 
                    className={classes.Editing} 
                    value={inputValueState} 
                    onChange={(e) => {setInputValueState(e.target.value); props.editTask(props.listId, props.id, e.target.value)}} 
                    ref={inputRef}
                />
                : <p className={props.complete ? classes.Complete : classes.Incomplete }>{props.content}</p>
            }
            <div className={classes.ButtonGroup}>
                {/* edit complete delete */}
                <button className={[classes.itemBtn, classes.btnEditing].join('')} onClick={() => {props.toggleEditing(props.id)}}><i className="fas fa-edit"></i></button>
                <button className={[classes.itemBtn, classes.btnCheck].join('')} onClick={() => {props.toggleComplete(props.listId, props.id)}}>{props.complete ? <i className="fas fa-times"></i> : <i className="fas fa-check"></i>}</button>
                <button className={[classes.itemBtn, classes.btnDelete].join('')} onClick={() => {props.delete(props.listId, props.id)}}><i className="fas fa-trash"></i></button>
            </div>
        </li>
    )
}

export default ListItem;