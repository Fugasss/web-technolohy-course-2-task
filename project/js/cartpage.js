(function (window) {
    const CART_STORAGE_KEY = "user_cart";

    function getCartFromStorage() {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    }

    function saveCartToStorage(cartItems) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }

    function addToCart(item) {
        const cartItems = getCartFromStorage();

        // Check if the item is already in the cart
        const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cartItems.push(item);
        }

        saveCartToStorage(cartItems);
    }

    function calculateTotalPrice(cartItems) {
        let sum = 0;

        for (const item of cartItems) {
            sum+=item.price;
            
        }

        return sum.toString();
    }

    function generateCartItemsHtml(cartItems, itemTemplate) {
        let result = "";
        for (const item of cartItems) {
            result += insertProperties(itemTemplate, {
                "item_id": item.id,
                "item_image": item.img,
                "item_name": item.name,
                "item_price": format_currency(item.price),
            });
        }
        return result;
    }

    async function renderCartPage(template) {
        const cartItems = getCartFromStorage();
        const itemTemplate = await $ajaxUtils.fetch("templates/cartpage/cart_item_template.html", false);

        // Render product list
        const cartItemsHtml = generateCartItemsHtml(cartItems, itemTemplate);
        template = insertProperties(template,{
             "items": cartItemsHtml,
             "total_price": format_currency(calculateTotalPrice(cartItems))
            }); 
    }

    window.$page_loader.cartHtml = function () {
        showLoading("#main-content");
        $ajaxUtils.get("templates/cartpage/cart_template.html",
            renderCartPage,
            false);
    };

    window.$cartUtils = {
        addToCart: addToCart,
        getCartFromStorage: getCartFromStorage,
        renderCartPage: renderCartPage
    };
})(window);
