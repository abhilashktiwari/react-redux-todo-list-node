import * as toDoTypes from '../../constants/ActionTypes';

export const setFilter = (filter) => ({
	type: toDoTypes.FILTER_TODO,
	payload: { filter }
})


export const AddItem = (data) => {
	console.log(data)
	return ({
		type: toDoTypes.ADD_ITEM,
		item: data.item,
		itemId: data.id,
		completed: data.completed
	})
}

export const completeItem = (data) => ({
	type: toDoTypes.COMPLETED_ITEM,
	itemId: data.id,
	completed: data.completed
})

export const deleteItem = (data) => ({
	type: toDoTypes.DELETED_ITEM,
	itemId: data.id,
	itemName: data.item,
})

/* Used only by actions for sockets */
export const initialItems = (res) => ({
	type: toDoTypes.INITIAL_ITEMS,
	items: res
})

/***************************************************************************************** */
/* Async Action items using - Sockets													   */
/***************************************************************************************** */
export const loadInitialDataSocket = (socket) => {
	return (dispatch) => {
		// dispatch(clearAllItems())
		socket.on('initialList', (res) => {
			dispatch(initialItems(res))
		})
	}
}

export const addNewItemSocket = (socket, id, item) => {
	return (dispatch) => {
		let postData = {
			id: id + 1,
			item: item,
			completed: false
		}
		socket.emit('addItem', postData)
	}
}

export const markItemCompleteSocket = (socket, id, completedFlag) => {
	return (dispatch) => {
		let postData = {
			id: id,
			completed: completedFlag
		}
		socket.emit('markItem', postData)
	}
}

export const deleteItemSocket = (socket, item, id) => {
	return (dispatch) => {
		let postData = {
			item: item,
			id: id,
		}
		socket.emit('deletedItem', postData)
	}
}
