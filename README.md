Shut Up, Guy
============

Rob (who went to highschool in Macon) told me he wished he had a way to block all Facebook posts that contained the word "liberal", so that he could automatically hide lots of vague, ill-informed posts by old acquaintances without de-friending these people.

So I implemented it!

"Shut Up, Guy" is a Chrome extension that will black out Facebook posts containing one or more user-provided forbidden words. Keep your tenuous friendship intact while hiding all mentions of "Obamaphones"! It's a win-win!


_To install:_ 

- Download the contents of this repo (click the button at the top that says "ZIP").
- Open the Extensions view in Chrome.
- Make sure Developer mode is enabled.
- Click "Load unpacked extension...". 
- Point the file dialog to wherever you downloaded the ZIP. 
- Enjoy?

_To update:_

- Re-download the ZIP and extract it to the same place as before. (Or just $ git pull.)
- Open the Extensions view in Chrome.
- Find the "Shut Up, Guy" extension and click the link that says "Reload".
- Accept my gratitude for using my dumb thing.

_To configure and use:_

- Open the Extensions view in Chrome.
- Find the "Shut Up, Guy" extension and click the link that says "Options".
- In the textarea, enter whatever words or phrases you want to hide, separated by commas. Capitalization is not important and will be ignored.
- Remember, these words must *exactly* match words in a Facebook post for the post to be blocked, so make sure you haven't made any typos!
- Click "Save". Your changes will be applied when you reload Facebook.

If you forget to configure the list of forbidden words, "Shut Up, Guy" will prompt you each time you visit Facebook until it has been configured. Yes, this *is* annoying.
