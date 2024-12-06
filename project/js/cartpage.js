(function (window) {
    const CART_STORAGE_KEY = "user_cart";
    
    function getCartFromStorage() {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    }

    function saveCartToStorage(cartItems) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }

    function addToCart(item_id) {
        const cartItemsIds = getCartFromStorage();

        const existingItem = cartItemsIds.find((cartItem) => cartItem === item_id);
        if (existingItem) {
            return;
        } else {
            cartItemsIds.push(item_id);
        }
        
        saveCartToStorage(cartItemsIds);
    }

    function removeFromCart(item_id){
        const cartItemsIds = getCartFromStorage();

        const index = cartItemsIds.indexOf(item_id);
        if (index > -1) { 
            cartItemsIds.splice(index, 1);
        }
                
        saveCartToStorage(cartItemsIds);
    }

    function calculateTotalPrice(cartItems) {
        let sum = 0;

        for (const item of cartItems) {
            sum+= +item.price;
        }

        return sum.toString();
    }

    function generateCartItemsHtml(cartItems, itemTemplate) {
        let result = "";
        for (const item of cartItems) {
            result += insertProperties(itemTemplate, {
                "item_id": item.id,
                "item_image": item.imgs[0],
                "item_name": item.name,
                "item_price": format_currency(item.price),
            });
        }
        return result;
    }

    async function renderCartPage(template) {
        const cartItemsId = getCartFromStorage();
        const cartItems = await window.$utils.loadGamesById(cartItemsId);
        const itemTemplate = await $ajaxUtils.fetch("templates/cartpage/cart_item_template.html", false);

        // Render product list
        const cartItemsHtml = generateCartItemsHtml(cartItems, itemTemplate);
        let container = insertProperties(template,{
             "items": cartItemsHtml,
             "total_price": format_currency(calculateTotalPrice(cartItems))
            }); 

        insertHtml("#main-content", container);
        
    }

    const CART_TEMPLATE = "templates/cartpage/cart_template.html";

    window.$page_loader.cartHtml = async function () {
        showLoading("#main-content");
        let data = await $ajaxUtils.fetch(CART_TEMPLATE, false);
        renderCartPage(data);
    };

    window.$cartUtils = {
        addToCart: addToCart,
        getCartFromStorage: getCartFromStorage,
        removeFromCart: removeFromCart,
    };
})(window);
