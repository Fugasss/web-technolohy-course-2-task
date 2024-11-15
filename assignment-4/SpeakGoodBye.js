(function(window) {

  let speakWord = "Good Bye";

  let byeSpeaker = {};
  
  byeSpeaker.speak = function(name) {
    console.log(speakWord + " " + name);
  }

  window.byeSpeaker = byeSpeaker;
})(window); 