
##Dell UI Components Bower Package

# Installation

Installation of dell-ui-components has a few dependencies:
  - AngularJS,
  - jQuery
  - dell-ui-bootstrap css. (included in this package)

#### Install dependencies with Bower
```sh
$ bower install angular
$ bower install jquery
```


#### Install with Bower
```sh
$ bower install dell-ui-components
```

#### Manual download

After downloading dependencies (or referencing them from your favorite CDN) you can download this project from https://github.com/DellGDC/dell-ui-components


### Adding dependency to your project

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `dellUiComponents` AngularJS module:

```js
angular.module('myModule', ['dellUiComponents']);
```

NOTE: dellUiComponents Angular module is experimental at the moment.

### Minimal example


``` indexhtml
<html ng-app="myApp">
<head>
<script src="path-to-angular/angular.min.js"></script>
<script src="path-to-jquery/jquery.min.js"></script>
<script src="path-to-dell-ui-components/dell-ui-components/dell-ui-components.min.js"></script>
<link src="path-to-dell-ui-components/dell-ui-bootstrap/dell-ui-bootstrap.min.css" type="text/css" rel="stylesheet"/>
<link src="path-to-dell-ui-components/dell-ui-components/dell-ui-components.min.css" type="text/css" rel="stylesheet"/>
</head>
<body>
<h1>Hello world!</h1>
<script src="myApp.js"></script>
</body>
</html>
```

```myAppjs
angular.module('myApp', ['dellUiComponents']);
```



##Dell UI Components development environment
NOTE: Not included in Bower package, must download/fork from github master branch.

>Node.js environment for developing Dell's UI Components

This environment at is core uses a Yeoman generator called [cg-angular](https://github.com/cgross/generator-cg-angular) to enable easy creation of demo components.

This environment follows the [Angular Best Practice Guidelines for Project Structure](https://blog.angularjs.org/2014/02/an-angularjs-style-guide-and-best.html?_escaped_fragment_=).

Features

* Each package component has a directory with all package and demo files.
* Provides a Grunt build that produces an extremely optimized distribution of all css and js files.
   * It uses an Angular annotation library so you don't have to use the Angular injection syntax for safe minification (i.e. you dont need `$inject` or `(['$scope','$http',...`.

     (note) While [grunt-ng-annotate](https://github.com/olov/ng-annotate) is the new defacto angular annotator, there are issues with it in this environment (windows) so the environment is currently using ngmin which has be deprecated but still works perfectly.
   * Custom grunt script to create a new package component and creates all files needed: `grunt component my-component`
   * Custom grunt script to create a new package directive and create all files needed: `grunt directive my-directive`
   * `grunt serve` task allows you to run a simple development server with watch/livereload enabled .  `http:localhost:9002` Additionally, JSHint and the appropriate unit tests are run for the changed files.
* Integrates Bower for package management
* Integrates LESS and includes Dell-UI-Bootstrap via the source LESS files allowing you to reuse Bootstrap vars/mixins/etc. (TODO) Need to add dell-ui-components package when published.

Directory Layout
-------------
The package's directory file structure is as follows:


    app.less ....................... main demo-wide styles
    app.js ......................... angular demo module initialization and route setup
    index.html ..................... main HTML file for demo
    Gruntfile.js ................... Grunt build file
    /bower_components .............. 3rd party libraries managed by bower
    /components .................... Component associated files to include less, html, directives and demo files
    /data .......................... Contains data related to the demo application
    /demo-assets.................... Images and other assets used in the demo
    /dist........................... Distribution files for package
    /node_modules .................. 3rd party libraries managed by npm
    /templates ..................... Templates used by grunt to automatically create files.


Getting Started
-------------

(You need to be outside firewall for these steps to work)

Prerequisites: Node, Grunt, Yeoman, and Bower.  Once Node is installed, do:

    npm install -g grunt-cli yo bower

Next, install this generator:

    npm install -g generator-cg-angular

To clone project (inside firewall):

    git clone http://dmvmsherpa.oldev.preol.dell.com:7990/scm/duc/dell-ui-components.git


Make sure all node modules are loaded (outside firewall):

    npm install


Grunt Tasks
-------------

Now that the project is created, you have 5 simple Grunt commands available:

    grunt serve          #This will run a development server with watch & livereload enabled.
    grunt test           #Run local unit tests.
    grunt build          #Places a fully optimized (minified, concatenated, and more) in /dist
    grunt component      #Creates all the files needed for a new component
    grunt directive      #Creates all the files needed to add a directive to the package

When `grunt serve` is running, any changed javascript files will be linted using JSHint as well as have their appropriate unit tests executed.  Only the unit tests that correspond to the changed file will be run.  This allows for an efficient test driven workflow.

Working with it all together
-------------

The best thing to do while developing is to launch two separate bash shells:
1. Run  `grunt serve`: This will set up your watch and live reload to see changes as you make them in the files.
2. Use this shell to execute grunt commands above.

Preconfigured Libraries
-------------

The new app will have a handful of pre-configured libraries included.  This includes Angular, Bootstrap, Dell UI Bootstrap, AngularUI Bootstrap, AngularUI Utils, JQuery, Underscore, Underscore String, and LESS.  You may of course add to or remove any of these libraries.  But the work to integrate them into the app and into the build process has already been done for you.

Build Process
-------------

The project will include a ready-made Grunt build that will:

* Build all the LESS files into one minified CSS file.
* Uses [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to turn all your partials into Javascript.
* Uses [grunt-ng-min](https://github.com/btford/grunt-ngmin) to preprocess all Angular injectable methods and make them minification safe.  Thus you don't have to use the array syntax.
* Concatenates and minifies all Javascript into one file.
* Replaces all appropriate script references in `index.html` with the minified CSS and JS files.
* Minifies the `index.html`.
* Copies any extra files necessary for a distributable build (ex.  node-webkit files files, etc).

The resulting build loads only a few highly compressed files and node webkit application.

The build process uses [grunt-dom-munger](https://github.com/cgross/grunt-dom-munger) to pull script references from the `index.html`.  This means that **your index.html is the single source of truth about what makes up your app**.  Adding a new library, new controller, new directive, etc does not require that you update the build file.  Also the order of the scripts in your `index.html` will be maintained when they're concatenated.

Importantly, grunt-dom-munger uses CSS attribute selectors to manage the parsing of the script and link tags.  Its very easy to exclude certain scripts or stylesheets from the concatenated files. This is often the case if you're using a CDN. This can also be used to prevent certain development scripts from being included in the final build.

* To prevent a script or stylesheet from being included in concatenation, put a `data-concat="false"` attribute on the link or script tag.  This is currently applied for the `livereload.js` and `less.js` script tags.

* To prevent a script or link tag from being removed from the finalized `index.html`, use a `data-remove="false"` attribute.


### Release notes:
You can install a specific version with 'bower install dell-ui-components#&lt;version&gt;'

**1.0.18** - March 9, 2016:
  - Adding in guides layout for product stack
  - fixes for popovers so it stays pen when clikced inside of open popover
  - test build for staging/DesLib
  - adding in guides layout page
  - created p-stack sectional images for guides page
  - additional refinements for product stack
  - fixed progress bar issue that was hiding labels


### Older versions:

```
1.0.17 - January 21, 2016:
  - Got rid of hard coded reference to demo data in complex table example

-1.0.16 - January 20, 2016:
  - Fixed issue with erroneous masthead element - now header.masthead
  - Added Uber Tables
  - Added universal footer
  - Added accesability tags to icon demo
  - Changed demo content for states dropdowns
  - Minor adjustments to unordered lists
  - Changed demo content for tabs
  - Changed demo code for date selector and fixed minor issues
-1.0.15 - December 03, 2015:
  - Removed XS tootip treament
-1.0.14 - November 30, 2015:
  - Fixed conflict with overflow tabs and offcanvas
  - Fixed issue with dropdown progress status hover
  - Updated to dell-ui-bootstrap 1.2.5
  - Fixed conflict between overflow tabs and off-canvas
- 1.0.13 - November 19, 2015:
  - Fixed bug in Tooltips (css)
  - Fixed css bug in date selector
  - Fixed hover highlight bug in with overflow tabs
  - Fixed bug in equalize height function
  - Fixed padding issue in ratings
  - Fixed footer link highlight color bug
  - Added styling for popover trigger with help icon
- 1.0.12 - November 13, 2015:
  - Fixed bug in Tooltips (js & css)
  - Fixed bug Popovers
- 1.0.11 - November 3, 2015:
  - Updated Ratings and Reviews
  - Added Date Selector
  - Added Overflow tabs
  - Added Anchored Tab Navigation with scroll spy
  - Added Simplified Footer
  - Added Simplifiead Masthead
  - Fixed bug in Tooltips
- 1.0.10 Updated to dell-ui-bootstrap 1.2.2 which includes updates to icon font files and added icon-ui-handle
- 1.0.9 Changes to carousel (dots and css), collapsible items (added content gallery), social media icons, edits to blockquote icon positioning, added contextual help component
- 1.0.8 Changes to tables, breadcrumbs, show/hide, addition of contact drawer
- 1.0.7 Changes to tabs and cleaned up README instructions
- 1.0.6 - Updated Value Props so the content aligns left in mobile XS view, updated tool-tip hover and removed underline onconnect with dell component, made fix on show/hide toggle in XS view, updated grouped form to view in DesLib. Restructured package to remove development files from distribution.
- 1.0.5 - Fixed carousels slider dots disappearing in DesLib, added Content-teasers, additional colors, banners, grid example patterns. Moved progress bar and pagination demo.js to non-demo.js files. added code patch for forms.less
- 1.0.4 - Fixed issues accordions not displaying in wells correctly. Fixed tool-tip transparent background. Fix offsets examples.
- 1.0.3 - Fixed issues with broken images.
- 1.0.2 - Upgraded to Bootstrap 3.3.4 and had minor fixes
- 1.0.1 - Upgraded to Bootstrap 3.3.1 and had minor fixes
- 1.0.0 - Initial publish of components
...
```
