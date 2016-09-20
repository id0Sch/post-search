chrome.contextMenus.create({
    title: 'Add "%s" to posts filter',
    contexts: ["selection"],
    onclick: function getword(info, tab) {
        chrome.storage.sync.get("filtered_post_blacklist", function(response) {
            var blacklist = response["filtered_post_blacklist"].split(',');
            blacklist.push(info.selectionText);
            chrome.storage.sync.set({
                "filtered_post_blacklist": blacklist.toString()
            }, function() {});
        });
    }
});