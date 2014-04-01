Sherpa.routes.layouts = [
     {
          "id": "layouts",
          "name": "layouts",
          "label": "Layouts",
          "url": "/layouts",
          "alias": "/layouts/",
          "views": {
               "@": {
                    "templateUrl": "lib/design-library/layouts/index.html"
               }
          }
     },
     {
          "id": "layouts.simple",
          "name": "simple",
          "label": "Simple",
          "url": "/simple",
          "alias": "/simple/",
          "views": {
               "layouts@layouts": {
                    "templateUrl": "lib/design-library/layouts/templates/simple.html"
               },
               "masthead@simple":{
                    "template":"<div class=\"well\">Masthead</div>"
               },
               "main-content-area@simple":{
                    "template":"<div class=\"well\">Main Content Area</div>"
               },
               "footer@simple":{
                    "template":"<div class=\"well\">footer</div>"
               }
          }
     }

]