var lock = false; // so we don't trigger shutUp() as we manipulate the dom in shutUp()
var menuLock = false;
var facebookStoryClass = "[role='article']";
var subMenu = 'ul[role="menu"]';
var shutUp = function(regex) {
    if (lock) {
        return;
    }
    lock = true;
    jQuery(facebookStoryClass + ":not(.filtered_post)").filter(function() {
        if (jQuery(this).closest(facebookStoryClass + ".filtered_post").length > 0) {
            return false; // don't add stuff more than once per story
        }
        // debugger;
        var matches = regex.exec(this.textContent);
        if (matches !== null) {
            // console.log(matches);
            var matchingString = matches.join(", ");
            var story = jQuery(this);
            // insert the list of matched words
            var div = jQuery("<div/></div>", {
                class: "filtered_post_matches"                 
            });
            div.append(jQuery('<span/>', {
                class: 'matches_text',
                text: matchingString
            }));
            div.append(jQuery('<span/>', {                
                text: ' was found in post'
            }))
            div.append(jQuery('<a/>', {                
                text: ' (view post)'
            }).on('click', ()=>{
                story.addClass('filtered_post_view');
            }))
            div.appendTo(story.parent());
            return true;
        }
        return false;
    }).addClass("filtered_post");
    lock = false;
}

function makeRegex(blacklist) {
    var bannedWords = blacklist.split(/,\s*/); // comma-separated, optional whitespace
    bannedWords= bannedWords.filter(function(word){
        return word.length;
    });
    // only match on word boundaries
    // bannedWords = bannedWords.map(function(word) { return "\\b" + escape(word) + "\\b"; });
    return new RegExp(bannedWords.join("|"), "i");
}

function escape(str) {
    // source: http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript/3561711#3561711
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
// function addToSubMenu() {
//     if (menuLock) {
//         return
//     } else {
//         menuLock = true;
//     }
//     jQuery(subMenu + ":not(.filtered_post_submenu)").filter(function() {
//         var menu = jQuery(this);
//         if (menu.closest(subMenu + ".filtered_post_submenu").length > 0) {
//             return false; // don't add stuff more than once per menu
//         }
//         var menuItems = menu.children();
//         var list = menuItems.filter(function(){
//             return jQuery(this).has('a');
//         }).map(function (elem){
//             console.log(this);
//             return jQuery(this).attr('ajaxify');
//         });
//         var menuItemClassName = jQuery(menuItems[menuItems.length - 1]).attr('class');
//         var newMenuItem = jQuery("<li/>", {
//             class: menuItemClassName
//         }).append(jQuery('<a/>', {
//             text: 'Add to blacklist'
//         })).on('click', function() {
//             alert('clicked!');
//         });
//         newMenuItem.appendTo(menu);
//         return true;
//     }).addClass('filtered_post_submenu');
//     menuLock = false;
// }
chrome.storage.sync.get("filtered_post_blacklist", function(response) {
    var blacklist = response["filtered_post_blacklist"];
    if (!blacklist) {
        if (window.confirm("No filters provided" + "please set up a list of words to ban." + "\nDo that now?")) {
            window.open(chrome.extension.getURL("options.html"));
        }
    } else {
        var regex = makeRegex(blacklist);
        document.addEventListener("DOMNodeInserted", function() {
            // this runs pretty slow-- it'd be better to hook into whatever event Facebook
            // uses to trigger loading additional content, I think.
            shutUp(regex);
            // addToSubMenu();
        });
        shutUp(regex);
        // addToSubMenu();
    }
});