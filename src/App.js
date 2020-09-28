import React, {useState, useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import List from './containers/List/List';
import CreateList from './containers/List/CreateList/CreateList';

// let lists = [
// 	{
// 		id: 2,
// 		title: "Cosas por hacer", 
// 		tasks: [
// 			{id: "2-1600280210238", name: "Water plants", complete: false},
// 			{id: "2-1600280210248", name: "Clean kitchen", complete: false},
// 			{id: "2-1600280210258", name: "Laundry", complete: false}
// 		]
// 	},
// 	{
// 		id: 3,
// 		title: "Lista de compras", 
// 		tasks: [
// 			{id: "3-1600280210239", name: "Apples", complete: false},
// 			{id: "3-1600280210249", name: "Milk", complete: false}
// 		]
// 	},
// ]

function App() {
	useEffect(() => {
        console.log('render')
    })
	const [ listsState, setListsState ] = useState([]);
	const [ editingItemState, setEditingItemState ] = useState("");
	const [ showListState, setShowListItemState ] = useState("");
	
	useEffect(() => {
		//localStorage.setItem('lists', JSON.stringify(lists));
		if (localStorage.getItem("lists") !== null) {
			let storedListsJSON = localStorage.getItem("lists");
			let storedLists = JSON.parse(storedListsJSON);
			setListsState(storedLists);
		} 
	}, [])

	
	useEffect(() => {
		localStorage.setItem('lists', JSON.stringify(listsState));
	}, [listsState])

	const addTask = useCallback((listId, taskToAdd) => {
		console.log(listId)
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
			return {
				updatedList
			};    
		});
		
		setListsState(updatedLists);	
		console.log(listsState)	
	}, [listsState])

	const deleteTask = useCallback((listId, taskToDeleteId) => {
		console.log(listId)
		let updatedList = listsState.filter(list => {
			return list.id === listId;
		});
		
		let updatedTasks = updatedList[0].tasks.filter( (item, index) => item.id !== taskToDeleteId);
		updatedList[0].tasks = updatedTasks;
		let updatedLists = listsState.map((list, index) => {
			if(index !== listId) {
				return list;
			}		
			return {
				updatedList
			};    
		});
		
		setListsState(updatedLists);	
		console.log(listsState)	
	}, [listsState]);
	

	const changeTaskState = useCallback((listId, taskToChangeId) => {
		console.log(listId)
		let updatedList = listsState.filter(list => {
			return list.id === listId;
		});
		
		let updatedTasks = updatedList[0].tasks.map((list, index) => {
			if(list.id !== taskToChangeId) {
				return list;
				
			}	
			console.log(list)	
			return {
				...list,
				complete: !list.complete
			};    
		});
		console.log(updatedTasks)
		updatedList[0].tasks = updatedTasks;
		let updatedLists = listsState.map((list, index) => {
			if(index !== listId) {
				return list;
			}		
			return {
				updatedList
			};    
		});
		
		setListsState(updatedLists);	
		console.log(listsState)	
	}, [listsState])

	const changeTaskEdit = useCallback((taskToEditId) => {
		if (editingItemState === taskToEditId) {
			setEditingItemState("");
		} else {
			setEditingItemState(taskToEditId);
		}
	}, [editingItemState])

	const changeShownList = useCallback((listToViewId) => {
		if (showListState === listToViewId) {
			setShowListItemState("");
		} else {
			setShowListItemState(listToViewId);
		}
	}, [showListState])

	const editTask = useCallback((listId, taskToEditId, newName) => {
		console.log(listId)
		let updatedList = listsState.filter(list => {
			return list.id === listId;
		});
		
		let updatedTasks = updatedList[0].tasks.map((list, index) => {
			if(list.id !== taskToEditId) {
				return list;
				
			}	
			console.log(list)	
			return {
				...list,
				name: newName
			};    
		});
		console.log(updatedTasks)
		updatedList[0].tasks = updatedTasks;
		let updatedLists = listsState.map((list, index) => {
			if(index !== listId) {
				return list;
			}		
			return {
				updatedList
			};    
		});
		
		setListsState(updatedLists);	
		console.log(listsState)	
	}, [listsState])

	const AddList = useCallback((listTitle) => {
		let updatedLists = [...listsState];
		updatedLists.push(
			{
				id: new Date().getTime(),
				title: listTitle, 
				tasks: []
			},
		)
		setListsState(updatedLists);	
		console.log(listsState);

	}, [listsState])

	const removeList = useCallback((listId) => {
		let updatedLists = listsState.filter( (item) => item.id !== listId);
		setListsState(updatedLists);	
		console.log(listsState);
	}, [listsState])

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
					toggleComplete={changeTaskState} 
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
				{/* lista de listas */}
				{/* lista individual */}
				{listsJSX}
				<CreateList clicked={AddList}/>
			</main>
		</div>
	);
}

export default App;
