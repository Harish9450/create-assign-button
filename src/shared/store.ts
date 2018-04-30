import { createStore } from 'redux'

interface IContactList {
    contactid: string
}
function fun1(state: { contactid?: string, SelectedRowsCount?: number, contactList?: any[] }, action: any) {
    switch (action.type) {
        case 'contactid':
            state.contactid = action.text;
            return state;
        case 'selectedRows':
            state.SelectedRowsCount = action.text;
            return state;
        case 'contactList':
            state.contactList = action.text;
            return state;
        default:
            return state
    }
}

export const store = createStore(fun1, { contactid: "", contactList: [] });

// store.dispatch({
//     type: 'ADD_TODO',
//     text: 'na'
// });

console.log(store.getState())



export default store;