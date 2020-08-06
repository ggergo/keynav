# Keyboard navigation

Keyboard navigation for websites and web-applications to speed up the professionals work-flow.

## Installing
Install with nodejs:
```
npm i keynav
```

## Getting Started

Import:
```
import { keynav as keynav, Scope as Scope } from 'keynav';
```

Require:
```
const { keynav: keynav, Scope: Scope } = require('keynav');
```

Basic example:
```
// 'm' super-key and query selector to look for focusable elements in the menu
let menu = new Scope('m', '#menu');
keynav.addScope(menu);
```

The module is designed to extend the browsers existing tab and shift+tab focus navigation.
You can quickly move the focus to an element by pressing a super-key (i.e: 'm' for menu) and a target-key (i.e: 'r' for 'Reports' menu item) so no need to tab over all the intermediate elements.

In order to search focusable elements you need to add scopes.
A scope is basically a css selector to search in the focusabe dom nodes when pressing the super-key:
```;
let menu = new Scope('m', '#menu');
keynav.addScope(menu);
let content = new Scope('c', '#content');
keynav.addScope(content);
```

The 'document' string is not a valid css selector however you can set this exceptional argument for the scope:
```
...
new Scope('f', 'document');
...
```

By default the module tries to find out the target-key (i.e: 'r' for 'Reports' menu item) but you can also set a static value in the data-keynav-key attribute:
```
<div data-keynav-key="r"></div>
```
or you can overwrite the callback:
```
...
myScope.fnGetTargetKey = (element) => {
    return myCustomTargetChar;
};
...
```

By default the module tries to find out which elements are focusable inside a scope but you can overwrite it:
```
...
myScope.clearTargetSelectors();
myScope.addTargetSelector('.menuItem');
myScope.addTargetSelector('input[type="text"]');
myScope.removeTargetSelector('input[type="text"]');
...
```

The default timeout while the modul is expecting the target-key (i.e: 'r' for 'Reports' menu item) after pressing the super-key (i.e: 'm' for menu) is 2000 milliseconds but you can overwrite it:
```
...
keynav.listeningTimeMS = 5000;
...
```

By default the module is not accepting keypresses when the focus is on an element which does, but you can overwrite it:
```
keynav.clearNotReceivingSelectors();
keynav.addNotReceivingSelector('input');
keynav.addNotReceivingSelector('[contenteditable="true"]');
keynav.removeNotReceivingSelector('[contenteditable="true"]');
```

The module works fine when you remove an element from the document which has scopes with matching selectors however you can remove a scope directly:
```
keynav.removeScope('f');
```

By default the module sorts focusable elements by tabindex but you can overwrite it:
```
...
myScope.fnSortPossibleTargetElements = (a,b) => {
    // your logic
};
...
```