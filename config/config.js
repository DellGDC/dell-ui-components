Sherpa.config.designLibrary = {
  "version": {
    "design-library": {
      "codeName": "DesLibPolaris",
      "prodName": "Dell Design Library",
      "releaseName": "Dell UI Bootstrap",
      "minor": ".00",
      "major": "1.0",
      "releaseDescription": "Release with Sherpa 1.0",
      "releaseDate": "TBD"
    }
  },
  "paths": {
    "design_library": {
      "root": "lib/design-library/",
      "themes_folder": "themes/",
      "themes_url": "{theme}/bootstrap.css",
      "layouts": "layouts/templates/"
    },
    "libraries": [
      "lib/design-library/js/services.js",
      "lib/design-library/js/directives.js",
      "lib/design-library/js/controllers.js",
      "lib/design-library/js/filters.js",
      "lib/design-library/styleguide/assets/js/styleguide.js",
      "lib/design-library/styleguide/config/routes.js",
      "lib/design-library/layouts/assets/js/layouts.js",
      "lib/design-library/layouts/config/routes.js"
    ],
    "i18nFiles": [
      "lib/design-library/styleguide/assets/content/messages_{locale}.js"
    ],
    "styles": [
      "lib/design-library/assets/styles/dell-ui.css"
    ]
  },
  "angular": {
    "modules": [
      "sherpaApp.desLibServices",
      "sherpaApp.desLibDirectives",
      "sherpaApp.desLibControllers",
      "sherpaApp.desLibFilters",
      "sherpaApp.styleguide"
    ]
  },
  "config_build": {
    "files": {
      "config": {
        "design-library": "lib/design-library/config/config.js"
      },
      "routes": {
        "styleguide": "lib/design-library/styleguide/config/routes.js",
        "layouts": "lib/design-library/layouts/config/routes.js",
        "design-library": "lib/design-library/config/routes.js"
      },
      "messages": {
        "styleguide": "lib/design-library/styleguide/assets/content/messages_{locale}.js"
      }
    }
  }
}