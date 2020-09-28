import React, {useState} from 'react';
import ListItem from './ListItem/ListItem';
import classes from './List.module.scss';

const List = React.memo ((props) => {
   
    let tasksJSX =  
        props.tasks.map((task) => {
            return (
                <ListItem content={task.name} complete={task.complete} key={task.id} listId={props.id} id={task.id} delete={props.delete} editingItemId={props.editingItemId} toggleComplete={props.toggleComplete} toggleEditing={props.toggleEditing} editTask={props.editTask} />
            );
        });
    
    const [ inputState, setInputState ] = useState('');

    const addItem = () => {
        props.clicked(props.id, inputState);
        setInputState('');
    }

    const enterKeyDown = (event, action) => {
        if(event.key === 'Enter') {
            action();
        }
    }
    

    return (
        <div className={classes.List} onClick={(e) => e.stopPropagation()}>
            <div className={classes.deleteListBtnCtn}>
                <button onClick={() => props.removeList(props.id)} className={classes.deleteListBtn}><i className="fas fa-trash"></i></button>     
                <button onClick={() => props.toggleShow(props.id)} className={classes.seeListBtn}>
                    {   props.showListId === props.id ?
                        <i className="fas fa-eye-slash"></i>
                        : <i className="fas fa-eye"></i>
                    }
                </button> 
            </div>
            <h2>{props.title}</h2>
            {props.showListId === props.id ?
                <div>
                    <ul>
                        {tasksJSX}
                    </ul>
                    <div className={classes.inputGroup}>
                        <input type="text" value={inputState} onKeyDown={event => enterKeyDown(event, addItem)} onChange={event => setInputState(event.target.value)} placeholder="Add task"/>
                        <button onClick={addItem}><i className="fas fa-plus"></i></button>
                    </div>
                </div>
                : null
            }
        </div>
    )
})

export default List;