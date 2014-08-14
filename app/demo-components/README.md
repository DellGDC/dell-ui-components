Dell UI Site Components
=====================

Each component folder will have four files. These files should ONLY be used for specific syle and function that is used in the site to deliver the documentation for each component. It is NOT to be used for the development of directives and styles that will be part of the theme itself.

###HTML File (component_name.html)

The HTML file should contain the Dell UI Site documentation for a specific component. This should include examples, copy functionality for each example and sandbox environment that allows users to play/edit the component and then copy their customized component.


###JavaScript File (component_name.js)

The JavaScript file should contain the controller file which provides **example** data for the component.

###LESS File (component_name.less)

The LESS file should contain **only** CSS required for properly displaying the examples in the component page. It should **NOT** contain any CSS that is related to the execution of the theme.


###Test File (component_name-spec.js)

The test file should contain [Karma][1]/[Jasmine 1.3][2] test functions for unit testing of Dell UI Site component pages.


  [1]: http://karma-runner.github.io/0.12/index.html
  [2]: http://jasmine.github.io/1.3/introduction.html