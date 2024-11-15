(function(window){
  let speakWord = "Hello";

  let helloSpeaker = {};
  
  helloSpeaker.speak = function (name) {
    console.log(speakWord + " " + name);
  }

  window.helloSpeaker = helloSpeaker;
})(window);