(function (window) {
    const ITEMS_LIST_TEMPLATE_URL = "templates/homepage/home_items_list_template.html";
    const ITEM_TEMPLATE_URL = "templates/homepage/home_item_template.html";
  
    const ALL_GAMES_DATA_URL = "data/items.json"
    
    const MAX_DESCRIPTION_LENGTH = 230;
  
    document.addEventListener("DOMContentLoaded", function (event) {
      showLoading("#main-content");
      $ajaxUtils.get(
        ALL_GAMES_DATA_URL,
        showHomeHtml,
        true);
    });
  
    function showHomeHtml(games) {
      $ajaxUtils.get(
        ITEMS_LIST_TEMPLATE_URL,
        function (containerTemplate) {
          $ajaxUtils.get(
            ITEM_TEMPLATE_URL,
            function (itemTemplate) {

              let container = containerTemplate;
              let result = "";
              
              for (const game of games) {
                result += insertProperties(itemTemplate, {
                    "item_id": game.id,
                    "item_image": game.img,
                    "item_name": game.name,
                    "item_short_description": (game.short_description.length > MAX_DESCRIPTION_LENGTH ? game.short_description.slice(0, MAX_DESCRIPTION_LENGTH) + "..." : game.short_description),
                    "item_price": format_currency(game.price)
                });
              }
  
              container = insertProperty(container, "content", result);
  
              insertHtml("#main-content", container);
  
            },
            false
          )
        },
        false);
    }

    window.$page_loader.homeHtml = function (event) {
    showLoading("#main-content");
    $ajaxUtils.get(
        ALL_GAMES_DATA_URL,
        showHomeHtml,
        true);
    };

})(window);