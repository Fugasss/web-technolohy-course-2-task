(function (window) {
    const ALL_GAMES_DATA_URL = "data/items.json";

    function catalogueHtml(games){
        
    }

    window.$page_loader.catalogueHtml = function (event) {
    showLoading("#main-content");
    $ajaxUtils.get(
        ALL_GAMES_DATA_URL,
        showCatalogueHtml,
        true);
    };

})(window);