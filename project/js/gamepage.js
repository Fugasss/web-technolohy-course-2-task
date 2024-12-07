(function (window) {
  const GAME_TEMPLATE_URL = "templates/concreteitem/concrete_item_template.html";
  const CAROUSEL_IMAGE_TEMPLATE_URL = "templates/concreteitem/carousel_image_template.html";
  const RATING_ROW_URL = "templates/star_rating_row_template.html";
  const STAR_TEMPLATE = "templates/star_template.html";

  const GAME_DATA_URL = "data/games/"

  async function generateRatingHtml(rating){
    const ratingRow = await $ajaxUtils.fetch(RATING_ROW_URL, false);
    const starContainer = await $ajaxUtils.fetch(STAR_TEMPLATE, false);
    const emptyStar = await $ajaxUtils.fetch("images/star_empty.svg", false);
    const filledStar = await $ajaxUtils.fetch("images/star_filled.svg", false);

    let result = "";
    for(let ind = 0; ind < 5; ind++){
      result += insertProperty(starContainer, "star", (ind + 1 <= rating ? filledStar : emptyStar));
    }

    return insertProperty(ratingRow, "stars", result);
  }

  async function showConcreteItemHtml(game) {
    const containerTemplate = await $ajaxUtils.fetch(GAME_TEMPLATE_URL, false);
    const carouselImageTemplate = await $ajaxUtils.fetch(CAROUSEL_IMAGE_TEMPLATE_URL, false);

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
      "game_rating": await generateRatingHtml(game.rating),
      "game_price": format_currency(game.price),
      "game_id": game.id
    });

    insertHtml("#main-content", container);

    function setBuyButtonState(button){
      button.classList.remove("btn-success");
      button.classList.add("btn-danger");
      button.textContent = "Remove";
    }

    
    function setRemoveButtonState(button){
      button.classList.remove("btn-danger");
      button.classList.add("btn-success");
      button.textContent = "Buy";
    }

    const buyButton = window.document.getElementById("buy-button");

    const cart = window.$cartUtils;

    if(!cart.isGameInCart(game.id)){
      setRemoveButtonState(buyButton);
    }else{
      setBuyButtonState(buyButton);
    }

    buyButton.addEventListener("click", ()=>{

      if(cart.isGameInCart(game.id)){
        cart.removeFromCart(game.id);
        setRemoveButtonState(buyButton);
      }else{
        console.log(game);
        console.log(game.id);
        
        cart.addToCart(game.id);
        setBuyButtonState(buyButton);
      }
      
    });

  }

  window.$page_loader.gameHtml = function (game_id) {
    showLoading("#main-content");
    $ajaxUtils.get(
      GAME_DATA_URL + game_id + ".json",
      showConcreteItemHtml,
      true);
  };

})(window);