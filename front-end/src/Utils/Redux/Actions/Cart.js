export const AddItem = ({ item, size, price, color }) => ({
    type: "ADD_ITEM",
    item,
    size,
    price,
    color
})

export const RemoveItem = ({ item }) => ({
    type: "REMOVE_FROM_CART",
    item
})

export const ModQuantity = ({ item, newQuantity }) => ({
    type: "MOD_QUANTITY",
    item,
    newQuantity
})

export const ClearCart = () => ({
    type: "CLEAR_CART"
})

