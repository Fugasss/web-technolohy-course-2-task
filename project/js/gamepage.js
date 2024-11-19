(function (window) {
  const GAME_TEMPLATE_URL = "templates/concreteitem/concrete_item_template.html";
  const CAROUSEL_IMAGE_TEMPLATE_URL = "templates/concreteitem/carousel_image_template.html"

  const GAME_DATA_URL = "data/games/"

  function showConcreteItemHtml(game) {
    $ajaxUtils.get(
      GAME_TEMPLATE_URL,
      function (containerTemplate) {
        $ajaxUtils.get(
          CAROUSEL_IMAGE_TEMPLATE_URL,
          function (carouselImageTemplate) {
            let container = containerTemplate;
            let images = "";

            // Insert all images in carousel
            for (const ind in game.imgs) {
              images += insertProperties(carouselImageTemplate, {
                "image_interval": (ind == 0 ? 5000 : 3000),
                "image_active_or_empty": (ind == 0 ? "active" : ""),
                "image_source": "images/" + game.imgs[ind]
              });
            }

            container = insertProperties(container, {
              "carousel_images": images,
              "game_name": game.name,
              "game_full_description": game.full_description,
              "game_rating": game.rating,
              "game_price": format_currency(game.price)
            })

            insertHtml("#main-content", container);
          },
          false
        )
      },
      false);
  }

  window.$page_loader.gameHtml = function (game_id) {
    showLoading("#main-content");
    $ajaxUtils.get(
      GAME_DATA_URL + game_id + ".json",
      showConcreteItemHtml,
      true);
  };

})(window);