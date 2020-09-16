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
        // nombre de la Lista
        // items de la Lista
        // agregar elemento a la lista
        <div className={classes.List}>
            <h2>{props.title}</h2>
            <ul>
                {tasksJSX}
            </ul>
            <div className={classes.inputGroup}>
                <input type="text" value={inputState} onKeyDown={event => enterKeyDown(event, addItem)} onChange={event => setInputState(event.target.value)} placeholder="Add task"/>
                <button onClick={addItem}>ADD</button>
            </div>
        </div>
    )
})

export default List;