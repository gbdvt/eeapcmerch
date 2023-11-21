const defaultState = []

export default (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, {item: action.item, quantity: 1, size: action.size, price: action.price, color: action.color}].sort((a, b) => (a.item > b.item) ? 1 : -1)

        case "MOD_QUANTITY":
            const modifiedItem = state.find(itemObject  => itemObject.item == action.item)
            modifiedItem.quantity = action.newQuantity
            return [...state.filter(value => value.item != action.item), modifiedItem].sort((a, b) => (a.item > b.item) ? 1 : -1)

        case "REMOVE_FROM_CART":
            return state.filter(value => value.item != action.item)

        case "CLEAR_CART":
            return []

        default:
            return state
    }
}