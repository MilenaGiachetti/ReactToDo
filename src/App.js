import React, {useState, useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './containers/List/List';
import CreateList from './containers/List/CreateList/CreateList';

function App() {
	const [ listsState, setListsState ] = useState([]);
	const [ editingItemState, setEditingItemState ] = useState("");
	const [ showListState, setShowListItemState ] = useState("");
	
	useEffect(() => {
		// get saved lists from localStorage at app initiation
		if (localStorage.getItem("lists") !== null) {
			let storedListsJSON = localStorage.getItem("lists");
			let storedLists = JSON.parse(storedListsJSON);
			setListsState(storedLists);
		} 
	}, [])

	useEffect(() => {
		// save lists to Local Storage when states changes
		localStorage.setItem('lists', JSON.stringify(listsState));
	}, [listsState])

	// TASK HANDLERS
	// ADD TASK TO LIST
	const addTask = useCallback((listId, taskToAdd) => {
		if(taskToAdd !== ""){
			let updatedList = listsState.filter(list => {
				return list.id === listId;
			});
			updatedList[0].tasks.push({
				id: `${listId}-${new Date().getTime()}`, name: taskToAdd , complete: false
			})
			
			let updatedLists = listsState.map((list, index) => {
				if(index !== listId) {
					return list;
				}		
				return updatedList;   
			});
			
			setListsState(updatedLists);	
		}
	}, [listsState])

	// EDIT TASK
	const editTask = useCallback((listId, taskToEditId, newName) => {
		let updatedList = listsState.filter(list => {
			return list.id === listId;
		});
		
		let updatedTasks = updatedList[0].tasks.map((list, index) => {
			if(list.id !== taskToEditId) {
				return list;
			}	
			return {
				...list,
				name: newName
			};    
		});
		updatedList[0].tasks = updatedTasks;
		let updatedLists = listsState.map((list, index) => {
			if(index !== listId) {
				return list;
			}		
			return updatedList;    
		});
		
		setListsState(updatedLists);	
	}, [listsState])

	// DELETE TASK
	const deleteTask = useCallback((listId, taskToDeleteId) => {
		let updatedList = listsState.filter(list => {
			return list.id === listId;
		});
		
		let updatedTasks = updatedList[0].tasks.filter( (item, index) => item.id !== taskToDeleteId);
		updatedList[0].tasks = updatedTasks;
		let updatedLists = listsState.map((list, index) => {
			if(index !== listId) {
				return list;
			}		
			return updatedList;    
		});
		
		setListsState(updatedLists);	
	}, [listsState]);
	
	// CHANGE TASK STATE - COMPLETE OR INCOMPLETE
	const changeTaskStatus = useCallback((listId, taskToChangeId) => {
		let updatedList = listsState.filter(list => {
			return list.id === listId;
		});
		
		let updatedTasks = updatedList[0].tasks.map((list, index) => {
			if(list.id !== taskToChangeId) {
				return list;
			}	
			return {
				...list,
				complete: !list.complete
			};    
		});
		updatedList[0].tasks = updatedTasks;
		let updatedLists = listsState.map((list, index) => {
			if(index !== listId) {
				return list;
			}		
			return updatedList;
		});
		setListsState(updatedLists);	
	}, [listsState])

	// CHANGE TASK STATE - EDITING OR NOT EDITING
	const changeTaskEdit = useCallback((taskToEditId) => {
		if (editingItemState === taskToEditId) {
			setEditingItemState("");
		} else {
			setEditingItemState(taskToEditId);
		}
	}, [editingItemState])

	// LISTS HANDLERS
	// ADD LIST
	const addList = useCallback((listTitle) => {
		if(listTitle !== ""){
			let updatedLists = [...listsState];
			updatedLists.push(
				{
					id: new Date().getTime(),
					title: listTitle, 
					tasks: []
				},
			)
			setListsState(updatedLists);	
		}
	}, [listsState])

	// DELETE LIST
	const removeList = useCallback((listId) => {
		let updatedLists = listsState.filter( (item) => item.id !== listId);
		setListsState(updatedLists);	
	}, [listsState])

	// CHANGE LIST STATE - SHOW OR HIDE
	const changeShownList = useCallback((listToViewId) => {
		if (showListState === listToViewId) {
			setShowListItemState("");
		} else {
			setShowListItemState(listToViewId);
		}
	}, [showListState])

	let listsJSX = listsState !== [] ? listsState.map((list) => {
		return (
			<List 
				title={list.title} 
				key={list.id} 
				id={list.id}
				tasks={list.tasks} 
				clicked={addTask} 
				delete={deleteTask} 
				removeList={removeList} 
				toggleComplete={changeTaskStatus} 
				editingItemId={editingItemState} 
				toggleEditing={changeTaskEdit} 
				editTask={editTask}
				showListId={showListState}
				toggleShow={changeShownList}
			/>
		);
	}) : null;
	
	return (
		<div className="App" onClick={editingItemState ? () => changeTaskEdit(editingItemState) : undefined }>
			<header className="App-header">
				<div className="Container">
				<img src={logo} className="App-logo" alt="logo" />
				<h1>To-Do made with React</h1>
				</div>
			</header>
			<main>
				{listsJSX}
				<CreateList clicked={addList}/>
			</main>
		</div>
	);
}

export default App;
