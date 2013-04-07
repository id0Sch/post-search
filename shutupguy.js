var shutUp = function() {
    $(".userContent")
        .filter(function() { 
            return /the/gi.test(this.textContent); 
        })
        .parents(".uiUnifiedStory")
        .css("background-color", "#FF00FF");
}

document.addEventListener("DOMNodeInserted", shutUp);
shutUp();
