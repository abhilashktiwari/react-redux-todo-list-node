import { List } from 'immutable';
import * as toDoTypes from '../../constants/ActionTypes';

const INIT_STATE = { items: List([]) }

export default (state = INIT_STATE, action) => {
    console.log(state)
    switch (action.type) {
        case toDoTypes.ADD_ITEM:
            return {
                ...state,
                items: state.items.push({ id: action.itemId, item: action.item, completed: action.completed })
            }

        case toDoTypes.COMPLETED_ITEM:
            return {
                ...state,
                items: state.items.update(action.itemId - 1, (value) => {
                    return { ...value, completed: action.completed }
                })
            }

        case toDoTypes.DELETED_ITEM:
            return {
                ...state,
                items: state.items.filter(value => {
                    return value.item !== action.itemName
                })
            }

        case toDoTypes.INITIAL_ITEMS:
            console.log(action)
            return {
                ...state,
                items: List(action.items)
            }
        // return {
        //     ...state,
        //     items:state.items.push({id:action.items.itemId,item:action.items.item,completed:action.items.completed})
        //   }
        default:
            return state
    }
};
