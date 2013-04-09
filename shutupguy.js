var shutUp = function(regex) {
    $(".userContent:not(.shutupguy), .userContentWrapper:not(.shutupguy)")
        .filter(function() { 
            return regex.test(this.textContent); 
        })
        .parents(".uiUnifiedStory")
        .addClass("shutupguy")
        .children(".userContent, .userContentWrapper")
        .addClass("shutupguy");
}

function makeRegex(blacklist) {
    var bannedWords = blacklist.split(/,\s*/); // comma-separated, optional whitespace
    // only match on word boundaries
    bannedWords = bannedWords.map(function(word) { return "\\b" + escape(word) + "\\b"; });
    return new RegExp(bannedWords.join("|"), "i");
}

function escape(str) {
    // source: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
} 

chrome.storage.sync.get("shutupguy_blacklist", function(response) {
    console.log(response);
    var blacklist = response["shutupguy_blacklist"];
    if (!blacklist) {
        if (window.confirm("'Shut Up, Guy' won't do anything unless you " +
                "set up a list of words to ban." +
                "\nDo that now?")) {
            window.open(chrome.extension.getURL("options.html"));
        }
    } else {
        var regex = makeRegex(blacklist);
        document.addEventListener("DOMNodeInserted", function() {
            shutUp(regex);    
        });
        shutUp(regex);
    }
});


