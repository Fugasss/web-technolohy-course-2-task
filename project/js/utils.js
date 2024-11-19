function format_currency(number) {
  let result = [...number.toString()];
  for (let i = number.length - 3 - (number.indexOf('.') + 1); i > 0; i -= 3) {
    result.splice(i, 0, ' ');
  }
  return result.join('');
}

function insertHtml (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

function showLoading(selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

function insertProperty(string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

function insertProperties(string, dataMap){
  for (const key in dataMap) {
      let propToReplace = "{{" + key + "}}";
      string = string.replace(new RegExp(propToReplace, "g"), dataMap[key]);
  }
  return string;
}