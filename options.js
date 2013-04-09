function save() {
    var blacklist = document.getElementById("blacklist").value;
    status.innerHTML = "Saving...";
    chrome.storage.sync.set({"shutupguy_blacklist": blacklist}, function() {

        var status = document.getElementById("status");
        status.innerHTML = "Options Saved.";
        setTimeout(function() {
            status.innerHTML = "";
        }, 750);
    });
}

function restore() {
    chrome.storage.sync.get("shutupguy_blacklist", function(response) {
        var blacklist = response["shutupguy_blacklist"];
        if (!blacklist) {
            blacklist = getSampleBlacklist();
        }
        document.getElementById("blacklist").value = blacklist;
    });
}

function getSampleBlacklist() {
    var sampleBlacklist = [
       "Obamacare",
       "kardashian",
       "tardis" 
    ];
    return sampleBlacklist.join(", ");    
}

document.addEventListener("DOMContentLoaded", function() {
    restore();    
    document.getElementById("save").addEventListener('click', save);
});



