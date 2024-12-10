(function (window) {
    const ALL_GAMES_DATA_URL = "data/items.json";
    const ITEM_TEMPLATE = "templates/cataloguepage/catalogue_item_template.html";
    const CATALOGUE_TEMPLATE = "templates/cataloguepage/catalogue_template.html";


    async function catalogueHtml(games) {
        const catalogueTemplate = await $ajaxUtils.fetch(CATALOGUE_TEMPLATE, false);
        const gameTemplate = await $ajaxUtils.fetch(ITEM_TEMPLATE, false);

        function renderGames(filteredGames) {
            let content = '';
            filteredGames.forEach(game => {

                content += insertProperties(gameTemplate, {
                    "item_id": game.id,
                    "item_image": game.img,
                    "item_name": game.name,
                    "item_price": format_currency(game.price),
                });
            });
            
            let render = insertProperties(catalogueTemplate, {"items":content});

            insertHtml("#main-content", render);
        }

        renderGames(games);

        // const priceMin = window.document.getElementById('price-min');
        // const priceMax = window.document.getElementById('price-max');
        // const minPriceLabel = window.document.getElementById('min-price-label');
        // const maxPriceLabel = window.document.getElementById('max-price-label');

        // const ratingRange = window.document.getElementById('rating-range');

        // const applyFilters = window.document.getElementById('apply-filters');
        // const minRatingLabel = window.document.getElementById('min-rating');
        // const maxRatingLabel = window.document.getElementById('max-rating');

        // function filterGames() {
        //     const minValue = parseInt(priceMin.value, 10);
        //     const maxValue = parseInt(priceMax.value, 10);
        //     const maxRating = parseInt(ratingRange.value, 10);
        //     const filteredGames = games.filter(game => game.price >= minValue && game.price <= maxValue && game.rating <= maxRating);
        //     renderGames(filteredGames);
        // }

        // function updateLabels() {
        //     minRatingLabel.textContent = ratingRange.min;
        //     maxRatingLabel.textContent = ratingRange.value;

        //     const minValue = Math.min(parseInt(priceMin.value, 10), parseInt(priceMax.value, 10));
        //     const maxValue = Math.max(parseInt(priceMin.value, 10), parseInt(priceMax.value, 10));
        //     priceMin.value = minValue;
        //     priceMax.value = maxValue;
    
        //     minPriceLabel.textContent = minValue;
        //     maxPriceLabel.textContent = maxValue;
        // }

        // updateLabels();

        // priceMin.addEventListener('input', updateLabels);
        // priceMax.addEventListener('input', updateLabels);
        // applyFilters.addEventListener('click', filterGames);
        // ratingRange.addEventListener('input', updateLabels);

    }

    window.$page_loader.catalogueHtml = async function() {
        showLoading("#main-content");
        $ajaxUtils.get(
            ALL_GAMES_DATA_URL,
            catalogueHtml,
            true);
    };

})(window);