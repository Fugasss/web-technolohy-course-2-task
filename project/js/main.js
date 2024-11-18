
function format_currency(number){
  let result = [...number.toString()];
  for(let i = number.length - 3 - (number.indexOf('.') + 1); i > 0; i-=3){
    result.splice(i, 0, ' ');
  }
  return result.join('');
}


(function (window) {
  const ITEMS_LIST_TEMPLATE_URL = "templates/home_items_list_template.html";
  const ITEM_TEMPLATE_URL = "templates/home_item_template.html";
  const ALL_GAMES_DATA_URL = "data/items.json"

  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string
      .replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // var switchMenuToActive = function () {
  //   var classes = document.querySelector("#navHomeButton").className;
  //   classes = classes.replace(new RegExp("active", "g"), "");
  //   document.querySelector("#navHomeButton").className = classes;

  //   classes = document.querySelector("#navMenuButton").className;
  //   if (classes.indexOf("active") === -1) {
  //     classes += " active";
  //     document.querySelector("#navMenuButton").className = classes;
  //   }
  // };

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    $ajaxUtils.get(
      ALL_GAMES_DATA_URL,
      buildAndShowHomeHTML,
      true);
  });


  function buildAndShowHomeHTML(games) {
    $ajaxUtils.get(
      ITEMS_LIST_TEMPLATE_URL,
      function (containerTemplate) {
        $ajaxUtils.get(
          ITEM_TEMPLATE_URL,
          function (itemTemplate) {
            const MAX_DESCRIPTION_LENGTH = 230;

            let container = containerTemplate;
            let result = "";
            
            for (const game of games) {
              let gameTemplate = itemTemplate;

              gameTemplate = insertProperty(gameTemplate, "item_image", game.img);
              gameTemplate = insertProperty(gameTemplate, "item_name", game.name);
              gameTemplate = insertProperty(gameTemplate, "item_short_description", (game.short_description.length > MAX_DESCRIPTION_LENGTH ? game.short_description.slice(0, MAX_DESCRIPTION_LENGTH) + "..." : game.short_description));
              gameTemplate = insertProperty(gameTemplate, "item_price",format_currency(game.price));
              result += gameTemplate;
            }

            container = insertProperty(container, "content", result);

            insertHtml("#main-content", container);

          },
          false
        )
      },
      false);
  }

})(window);