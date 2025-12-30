export const LoginLocators= {
    usernameInput: 'input[data-test="username"]',
    passwordInput: 'input[data-test="password"]',
    loginButton: 'input[data-test="login-button"]',
    errorMessage: 'h3[data-test="error"]'
};

export const InventoryLocators= {
    inventoryItem: '.inventory_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    cartButton: '.shopping_cart_link',
    cartBadge: '.shopping_cart_badge',
    menuButton: '#react-burger-menu-btn',
    logoutButton: '#logout_sidebar_link',
    sortDropdown: 'select[data-test="product_sort_container"], select.product_sort_container, [data-test="product_sort_container"]'
};

export const CartLocators= {
    cartItem: '.cart_item',
    removeButton: 'button[data-test^="remove"]',
    checkoutButton: '#checkout',
    continueShoppingButton: '#continue-shopping'
};

export const CheckoutLocators= {
    firstNameInput: 'input[data-test="firstName"]',
    lastNameInput: 'input[data-test="lastName"]',
    postalCodeInput: 'input[data-test="postalCode"]',
    continueButton: 'input[data-test="continue"]',
    finishButton: 'button[data-test="finish"]',
    cancelButton: 'button[data-test="cancel"]',
    errorMessage: 'h3[data-test="error"]',
    thankYouMsg: '.complete-header',
    backHomeButton: '#back-to-products',
};