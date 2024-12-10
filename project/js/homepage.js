(function (window) {
    async function loadGamesById(gamesId){
      const result = [];

      for (const id of gamesId) {
        result.push((await $ajaxUtils.fetch(`data/games/${id}.json`, true)));
      }

      return result;
    }

    function generateContent(games, itemTemplate){
      const MAX_DESCRIPTION_LENGTH = 230;

      let result = "";
              
      for (const game of games) {
        result += insertProperties(itemTemplate, {
            "item_id": game.id,
            "item_image": game.imgs[0],
            "item_name": game.name,
            "item_short_description": (game.short_description.length > MAX_DESCRIPTION_LENGTH ? game.short_description.slice(0, MAX_DESCRIPTION_LENGTH) + "..." : game.short_description),
            "item_price": format_currency(game.price)
        });
      }

      return result;
    }

    async function generatePopular(popularGames){
      const containerTemplate = await $ajaxUtils.fetch("templates/homepage/popular/carousel_template.html", false);
      const imageTemplate = await $ajaxUtils.fetch("templates/homepage/popular/image_template.html", false);
      const indicatorTemplate = await $ajaxUtils.fetch("templates/homepage/popular/indicator_template.html", false);

      const getRandomImage = function(game){
        const images = game.imgs;

        if(images.length == 0){
          return null;
        }
        if(images.length == 1){
          return images[0];
        }

        return images.slice(1)[Math.floor(Math.random() * (images.length - 1))];
      }

      let images = "";
      let indicators = "";

      for (const ind in popularGames) {
        images += insertProperties(imageTemplate, {
          "image_url": "images/" + getRandomImage(popularGames[ind]),
          "interval": (ind == 0 ? 5000 : 3000),
          "active_or_empty":(ind == 0 ? "active" : "" ),
          "caption": popularGames[ind].name
        });

        indicators += insertProperties(indicatorTemplate, {
          "id": ind,
          "label": "Slide " + ind,
          "active_or_empty": (ind == 0 ? "active" : "" ),
          "current": (ind == 0)
        });

      }

      return insertProperties(containerTemplate, {
        "indicators": indicators,
        "images":images
      });
    }

    async function showHomeHtml(data) {
      const containerTemplate = await $ajaxUtils.fetch("templates/homepage/home_items_list_template.html", false);
      const itemTemplate      = await $ajaxUtils.fetch("templates/homepage/home_item_template.html", false);
      
      const popularGames = await loadGamesById(data.games_id);

      const topGames = popularGames.slice(0, 3);
      const otherGames = popularGames.slice(3);

      let container = insertProperties(containerTemplate, {
        "content": generateContent(otherGames, itemTemplate),
        "popular": await generatePopular(topGames.sort(() => Math.random() - 0.5)),
      });
      
      insertHtml("#main-content", container);
    }

    window.$page_loader.homeHtml = function (event) {
    showLoading("#main-content");
    $ajaxUtils.get(
        "data/popular.json",
        showHomeHtml,
        true);
    };

    window.$utils = {
      loadGamesById: loadGamesById
    };

})(window);