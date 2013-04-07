var storageToken = "shutupguy_blacklist";
function save() {
    var blacklist = document.getElementById("blacklist").value;
    localStorage[storageToken] = blacklist;

    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

function restore() {
    var blacklist = localStorage[storageToken];
    if (!blacklist) {
        blacklist = initializeBlacklist();
    }
    document.getElementById("blacklist").value = blacklist;
}

function initializeBlacklist() {
    var sampleBlacklist = [
       "Obama",
       "kardashian",
       "tardis" 
    ];
    return sampleBlacklist.join(", ");    
}

document.addEventListener("DOMContentLoaded", function() {
    restore();    
    document.getElementById("save").addEventListener('click', save);
});
