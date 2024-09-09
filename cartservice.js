export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
};

export const clearCartFromLocalStorage = () => {
    localStorage.removeItem('cart');
};
