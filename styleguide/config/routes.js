Sherpa.styleguideRoutes= [
     {
          "id": "styleguide",
          "url": "/styleguide",
          "name": "Styleguide",
          "label": "Overview",
          "views": {
               "@": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/index.html",
                    "controller": "styleguideController",
               },
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/overview.html"
               }
          },
          "defaultRoute": true

     },
     {
          "id": "styleguide.alerts",
          "url": "/alerts",
          "alias": "",
          "name": "Project CSS Theme: Alerts",
          "label": "Alerts",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/alerts.html"
               }
          }          
     },
     {
          "id": "styleguide.breadcrumbs",
          "url": "/breadcrumbs",
          "name": "Project CSS Theme: Breadcrumbs",
          "label": "Breadcrumbs",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/breadcrumbs.html"
               }
          }
     },
     {
          "id": "styleguide.buttons",
          "url": "/buttons",
          "name": "Project CSS Theme: Buttons",
          "label": "Buttons",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/buttons.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.collapsible-items",
          "url": "/collapsible-items",
          "name": "Project CSS Theme: Collapsible Items",
          "label": "Collapsible Items",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/collapsible-items.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.forms",
          "url": "/forms",
          "name": "Project CSS Theme: Forms",
          "label": "Forms",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/forms.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.icons",
          "url": "/icons",
          "name": "Project CSS Theme: Icons",
          "label": "Icons",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/icons.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.labels-and-badges",
          "url": "/labels-and-badges",
          "name": "Project CSS Theme: Labels and Badges",
          "label": "Labels and Badges",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/labels-and-badges.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.modals",
          "url": "/modals",
          "name": "Project CSS Theme: Modals",
          "label": "Modals",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/modals.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.navbar",
          "url": "/navbar",
          "name": "Project CSS Theme: Navigation Bars",
          "label": "Navigation Bars",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/navbar.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.pagers",
          "url": "/pagers",
          "name": "Project CSS Theme: Pagers",
          "label": "Pagers",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/pagers.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.pagination",
          "url": "/pagination",
          "name": "Project CSS Theme: Pagination",
          "label": "Pagination",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/pagination.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.popovers",
          "url": "/popovers",
          "name": "Project CSS Theme: Popovers",
          "label": "Popovers",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/popovers.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.progress-bars",
          "url": "/progress-bars",
          "name": "Project CSS Theme: Progress Bars",
          "label": "Progress Bars",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/progress-bars.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.responsive-classes",
          "url": "/responsive-classes",
          "name": "Project CSS Theme: Responsive Classes",
          "label": "Responsive Classes",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/responsive-classes.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.tables",
          "url": "/tables",
          "name": "Project CSS Theme: Tables",
          "label": "Tables",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/tables.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.tabs",
          "url": "/tabs",
          "name": "Project CSS Theme: Tabs",
          "label": "Tabs",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/tabs.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.tooltips",
          "url": "/tooltips",
          "name": "Project CSS Theme: Tooltips",
          "label": "Tooltips",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/tooltips.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.typography",
          "url": "/typography",
          "name": "Project CSS Theme: Typography",
          "label": "Typography",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/typography.html"
               }
          },
          "controller": "styleguideController"
     },
     {
          "id": "styleguide.wells-and-containers",
          "url": "/wells-and-containers",
          "name": "Project CSS Theme: Wells and Containers",
          "label": "Wells and Containers",
          "views": {
               "tab-pane@styleguide": {
                    "templateUrl": "lib/sherpa/design_library/styleguide/partials/wells-and-containers.html"
               }
          },
          "controller": "styleguideController"
     }
]