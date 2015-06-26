// Eve.js <evejs.com> - v0.8.4 February 18, 2013
(function (u) {
  function g(a) {
    if (!f)
      a:
        if (!f) {
          for (var b = [
                'jQuery',
                'MooTools',
                'YUI',
                'Prototype',
                'dojo'
              ], d = 0; d <= b.length; d++)
            if (window[b[d]]) {
              Eve.setFramework(b[d]);
              break a;
            }
          console.error('Eve doesn\'t support your JavaScript framework.');
        }
    return a ? f == a.toLowerCase() : f;
  }
  function l(a, b) {
    if (window.console) {
      var d = m;
      if (!m)
        for (var d = !1, c = 0; c < n.length; c++)
          n[c] == a && (d = !0);
      if (d) {
        for (; 10 > a.length;)
          a += ' ';
        a = a.substring(0, 10) + ' - ';
        console.info(a, b);
      }
    }
  }
  function q(a, b, d, c) {
    for (var e in r)
      b[e] = r[e];
    for (e in p)
      b[e] = p[e];
    g('YUI') ? YUI().use('node', function (e) {
      j = e.one;
      d[c] = a.apply(b);
    }) : g('dojo') ? require([
      'dojo/NodeList-dom',
      'dojo/NodeList-traverse'
    ], function (e) {
      j = e;
      d[c] = a.apply(b);
    }) : d[c] = a.apply(b);
  }
  var h = {}, s = {}, t = {}, p = {}, n = [], m = !1, f, j;
  u.Eve = {
    setFramework: function (a) {
      f = (a + '').toLowerCase();
      'jquery' == f && ($ = jQuery);
    },
    debug: function (a) {
      a ? n.push(a) : m = !0;
    },
    register: function (a, b) {
      l(a, 'registered');
      if (h[a])
        throw Error('Module already exists: ' + a);
      h[a] = b;
      return this;
    },
    extend: function (a, b) {
      p[a] = b;
    },
    scope: function (a, b) {
      s[a] && console.warn('Duplicate namespace: ' + a);
      q(b, {
        name: a,
        namespace: a
      }, s, a);
    },
    attach: function (a, b) {
      var d = [], c = 0;
      for (c; c < arguments.length; c++)
        d[d.length] = arguments[c];
      l(a, 'attached to ' + b);
      if (t[a + b])
        return !1;
      if (!h[a])
        return console.warn('Module not found: ' + a), !1;
      q(function () {
        h[a].apply(this, d.slice(2));
      }, {
        namespace: b,
        name: a
      }, t, a + b);
      return !0;
    }
  };
  var r = {
      listen: function (a, b, d) {
        function c(a, c) {
          l(v, f + ':' + b);
          h.event = a;
          g('MooTools') && (a.target = c);
          g('jQuery') && (a.target = a.currentTarget);
          g('dojo') && (a.target = a.explicitOriginalTarget);
          d.apply(h, arguments);
        }
        d || (d = b, b = a, a = '');
        a = a || '';
        var e = this.event ? this.find() : document.body, v = this.name, f = (this.namespace + ' ' + a).trim(), h = {}, k;
        for (k in this)
          this.hasOwnProperty(k) && (h[k] = this[k]);
        if (g('jQuery'))
          $(e).delegate(f, b, c);
        else if (g('MooTools'))
          $(e).addEvent(b + ':relay(' + f + ')', c);
        else if (g('YUI'))
          j(e).delegate(b, c, f);
        else if (g('Prototype'))
          $(e).on(b, f, c);
        else
          g('dojo') && require(['dojo/on'], function (a) {
            a(e, f + ':' + b, c);
          });
      },
      find: function (a) {
        var b, d = this.namespace;
        if (!a || 'string' == typeof a)
          a = (a || '').trim();
        b = this.event ? this.event.target : document.body;
        g('jQuery') && (b = jQuery(b));
        j && (b = j(b));
        var c = {
            jQuery: [
              'is',
              'parents',
              'find'
            ],
            MooTools: [
              'match',
              'getParent',
              'getElements'
            ],
            Prototype: [
              'match',
              'up',
              'select'
            ],
            YUI: [
              'test',
              'ancestor',
              'all'
            ],
            dojo: [
              '',
              'closest',
              'query'
            ]
          }, e;
        for (e in c)
          if (g(e)) {
            var f = c[e], c = f[0];
            e = f[1];
            f = f[2];
            if (!g('dojo') && b[c](d))
              return b;
            b = this.event ? b[e](d) : b;
            return this.event ? b[f](a) : b[f](d + ' ' + a);
          }
      },
      first: function (a, b) {
        b = 2 == arguments.length ? b : this.find(a);
        g('YUI') && (b = b.getDOMNodes());
        return b[0];
      },
      scope: function (a, b) {
        Eve.scope(this.namespace + ' ' + a, b);
      },
      attach: function (a, b) {
        Eve.attach(a, this.namespace + ' ' + (b || ''));
      }
    };
}(this));
this.module && (this.module.exports = this.Eve);
/*!
 * jqPagination, a jQuery pagination plugin (obviously)
 * Version: 1.4 (26th July 2013)
 *
 * Copyright (C) 2013 Ben Everard
 *
 * http://beneverard.github.com/jqPagination
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
(function ($) {
  'use strict';
  $.jqPagination = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // get input jQuery object
    base.$input = base.$el.find('input');
    // Add a reverse reference to the DOM object
    base.$el.data('jqPagination', base);
    base.init = function () {
      base.options = $.extend({}, $.jqPagination.defaultOptions, options);
      // if the user hasn't provided a max page number in the options try and find
      // the data attribute for it, if that cannot be found, use one as a max page number
      if (base.options.max_page === null) {
        if (base.$input.data('max-page') !== undefined) {
          base.options.max_page = base.$input.data('max-page');
        } else {
          base.options.max_page = 1;
        }
      }
      // if the current-page data attribute is specified this takes priority
      // over the options passed in, so long as it's a number
      if (base.$input.data('current-page') !== undefined && base.isNumber(base.$input.data('current-page'))) {
        base.options.current_page = base.$input.data('current-page');
      }
      // remove the readonly attribute as JavaScript must be working by now ;-)
      base.$input.removeAttr('readonly');
      // set the initial input value
      // pass true to prevent paged callback form being fired
      base.updateInput(true);
      //***************
      // BIND EVENTS
      base.$input.on('focus.jqPagination mouseup.jqPagination', function (event) {
        // if event === focus, select all text...
        if (event.type === 'focus') {
          var current_page = parseInt(base.options.current_page, 10);
          $(this).val(current_page).select();
        }
        // if event === mouse up, return false. Fixes Chrome bug
        if (event.type === 'mouseup') {
          return false;
        }
      });
      base.$input.on('blur.jqPagination keydown.jqPagination', function (event) {
        var $self = $(this), current_page = parseInt(base.options.current_page, 10);
        // if the user hits escape revert the input back to the original value
        if (event.keyCode === 27) {
          $self.val(current_page);
          $self.blur();
        }
        // if the user hits enter, trigger blur event but DO NOT set the page value
        if (event.keyCode === 13) {
          $self.blur();
        }
        // only set the page is the event is focusout.. aka blur
        if (event.type === 'blur') {
          base.setPage($self.val());
        }
      });
      base.$el.on('click.jqPagination', 'a', function (event) {
        var $self = $(this);
        // we don't want to do anything if we've clicked a disabled link
        // return false so we stop normal link action btu also drop out of this event
        if ($self.hasClass('disabled')) {
          return false;
        }
        // for mac + windows (read: other), maintain the cmd + ctrl click for new tab
        if (!event.metaKey && !event.ctrlKey) {
          event.preventDefault();
          base.setPage($self.data('action'));
        }
      });
    };
    base.setPage = function (page, prevent_paged) {
      // return current_page value if getting instead of setting
      if (page === undefined) {
        return base.options.current_page;
      }
      var current_page = parseInt(base.options.current_page, 10), max_page = parseInt(base.options.max_page, 10);
      if (isNaN(parseInt(page, 10))) {
        switch (page) {
        case 'first':
          page = 1;
          break;
        case 'prev':
        case 'previous':
          page = current_page - 1;
          break;
        case 'next':
          page = current_page + 1;
          break;
        case 'last':
          page = max_page;
          break;
        }
      }
      page = parseInt(page, 10);
      // reject any invalid page requests
      if (isNaN(page) || page < 1 || page > max_page) {
        // update the input element
        base.setInputValue(current_page);
        return false;
      }
      // update current page options
      base.options.current_page = page;
      base.$input.data('current-page', page);
      // update the input element
      base.updateInput(prevent_paged);
    };
    base.setMaxPage = function (max_page, prevent_paged) {
      // return the max_page value if getting instead of setting
      if (max_page === undefined) {
        return base.options.max_page;
      }
      // ignore if max_page is not a number
      if (!base.isNumber(max_page)) {
        console.error('jqPagination: max_page is not a number');
        return false;
      }
      // ignore if max_page is less than the current_page
      if (max_page < base.options.current_page) {
        console.error('jqPagination: max_page lower than current_page');
        return false;
      }
      // set max_page options
      base.options.max_page = max_page;
      base.$input.data('max-page', max_page);
      // update the input element
      base.updateInput(prevent_paged);
    };
    // ATTN this isn't really the correct name is it?
    base.updateInput = function (prevent_paged) {
      var current_page = parseInt(base.options.current_page, 10);
      // set the input value
      base.setInputValue(current_page);
      // set the link href attributes
      base.setLinks(current_page);
      // we may want to prevent the paged callback from being fired
      if (prevent_paged !== true) {
        // fire the callback function with the current page
        base.options.paged(current_page);
      }
    };
    base.setInputValue = function (page) {
      var page_string = base.options.page_string, max_page = base.options.max_page;
      // this looks horrible :-(
      page_string = page_string.replace('{current_page}', page).replace('{max_page}', max_page);
      base.$input.val(page_string);
    };
    base.isNumber = function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    };
    base.setLinks = function (page) {
      var link_string = base.options.link_string, current_page = parseInt(base.options.current_page, 10), max_page = parseInt(base.options.max_page, 10);
      if (link_string !== '') {
        // set initial page numbers + make sure the page numbers aren't out of range
        var previous = current_page - 1;
        if (previous < 1) {
          previous = 1;
        }
        var next = current_page + 1;
        if (next > max_page) {
          next = max_page;
        }
        // apply each page number to the link string, set it back to the element href attribute
        base.$el.find('a.first').attr('href', link_string.replace('{page_number}', '1'));
        base.$el.find('a.prev, a.previous').attr('href', link_string.replace('{page_number}', previous));
        base.$el.find('a.next').attr('href', link_string.replace('{page_number}', next));
        base.$el.find('a.last').attr('href', link_string.replace('{page_number}', max_page));
      }
      // set disable class on appropriate links
      base.$el.find('a').removeClass('disabled');
      if (current_page === max_page) {
        base.$el.find('.next, .last').addClass('disabled');
      }
      if (current_page === 1) {
        //base.$el.find('.previous, .first').addClass('disabled');
        base.$el.find('.previous').addClass('pull-left');
        base.$el.find('.first').addClass('pull-right');
      }
    };
    base.callMethod = function (method, key, value) {
      switch (method.toLowerCase()) {
      case 'option':
        // if we're getting, immediately return the value
        if (value === undefined && typeof key !== 'object') {
          return base.options[key];
        }
        // set default object to trigger the paged event (legacy opperation)
        var options = { 'trigger': true }, result = false;
        // if the key passed in is an object
        if ($.isPlainObject(key) && !value) {
          $.extend(options, key);
        } else {
          // make the key value pair part of the default object
          options[key] = value;
        }
        var prevent_paged = options.trigger === false;
        // if current_page property is set call setPage
        if (options.current_page !== undefined) {
          result = base.setPage(options.current_page, prevent_paged);
        }
        // if max_page property is set call setMaxPage
        if (options.max_page !== undefined) {
          result = base.setMaxPage(options.max_page, prevent_paged);
        }
        // if we've not got a result fire an error and return false
        if (result === false)
          console.error('jqPagination: cannot get / set option ' + key);
        return result;
        break;
      case 'destroy':
        base.$el.off('.jqPagination').find('*').off('.jqPagination');
        break;
      default:
        // the function name must not exist
        console.error('jqPagination: method "' + method + '" does not exist');
        return false;
      }
    };
    // Run initializer
    base.init();
  };
  $.jqPagination.defaultOptions = {
    current_page: 1,
    link_string: '',
    max_page: null,
    page_string: '{current_page}',
    paged: function () {
    }
  };
  $.fn.jqPagination = function () {
    // get any function parameters
    var self = this, $self = $(self), args = Array.prototype.slice.call(arguments), result = false;
    // if the first argument is a string call the desired function
    // note: we can only do this to a single element, and not a collection of elements
    if (typeof args[0] === 'string') {
      // if we're getting, we can only get value for the first pagination element
      if (args[2] === undefined) {
        result = $self.first().data('jqPagination').callMethod(args[0], args[1]);
      } else {
        // if we're setting, set values for all pagination elements
        $self.each(function () {
          result = $(this).data('jqPagination').callMethod(args[0], args[1], args[2]);
        });
      }
      return result;
    }
    // if we're not dealing with a method, initialise plugin
    self.each(function () {
      new $.jqPagination(this, args[0]);
    });
  };
}(jQuery));
// polyfill, provide a fallback if the console doesn't exist
if (!console) {
  var console = {}, func = function () {
      return false;
    };
  console.log = func;
  console.info = func;
  console.warn = func;
  console.error = func;
}
/*
 Input Mask plugin for jquery
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - 2014 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 3.0.55
 Input Mask plugin for jquery
 http://github.com/RobinHerbots/jquery.inputmask
 Copyright (c) 2010 - 2014 Robin Herbots
 Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 Version: 3.0.55
*/
(function (e) {
  if (void 0 === e.fn.inputmask) {
    var a = function (a) {
        var b = document.createElement('input');
        a = 'on' + a;
        var e = a in b;
        e || (b.setAttribute(a, 'return;'), e = 'function' == typeof b[a]);
        return e;
      }, b = function (a, d, f) {
        return (a = f.aliases[a]) ? (a.alias && b(a.alias, void 0, f), e.extend(!0, f, a), e.extend(!0, f, d), !0) : !1;
      }, d = function (a) {
        function b(e) {
          function f(a, b, e, d) {
            this.matches = [];
            this.isGroup = a || !1;
            this.isOptional = b || !1;
            this.isQuantifier = e || !1;
            this.isAlternator = d || !1;
            this.quantifier = {
              min: 1,
              max: 1
            };
          }
          function d(b, e, f) {
            var c = a.definitions[e], g = 0 == b.matches.length;
            f = void 0 != f ? f : b.matches.length;
            if (c && !q) {
              for (var k = c.prevalidator, h = k ? k.length : 0, t = 1; t < c.cardinality; t++) {
                var m = h >= t ? k[t - 1] : [], I = m.validator, m = m.cardinality;
                b.matches.splice(f++, 0, {
                  fn: I ? 'string' == typeof I ? RegExp(I) : new function () {
                    this.test = I;
                  }() : /./,
                  cardinality: m ? m : 1,
                  optionality: b.isOptional,
                  newBlockMarker: g,
                  casing: c.casing,
                  def: c.definitionSymbol || e,
                  placeholder: c.placeholder
                });
              }
              b.matches.splice(f++, 0, {
                fn: c.validator ? 'string' == typeof c.validator ? RegExp(c.validator) : new function () {
                  this.test = c.validator;
                }() : /./,
                cardinality: c.cardinality,
                optionality: b.isOptional,
                newBlockMarker: g,
                casing: c.casing,
                def: c.definitionSymbol || e,
                placeholder: c.placeholder
              });
            } else
              b.matches.splice(f++, 0, {
                fn: null,
                cardinality: 0,
                optionality: b.isOptional,
                newBlockMarker: g,
                casing: null,
                def: e,
                placeholder: void 0
              }), q = !1;
          }
          for (var c = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?\})\??|[^.?*+^${[]()|\\]+|./g, q = !1, g = new f(), h, m = [], n = []; h = c.exec(e);)
            switch (h = h[0], h.charAt(0)) {
            case a.optionalmarker.end:
            case a.groupmarker.end:
              var p = m.pop();
              0 < m.length ? m[m.length - 1].matches.push(p) : g.matches.push(p);
              break;
            case a.optionalmarker.start:
              m.push(new f(!1, !0));
              break;
            case a.groupmarker.start:
              m.push(new f(!0));
              break;
            case a.quantifiermarker.start:
              p = new f(!1, !1, !0);
              h = h.replace(/[{}]/g, '');
              var r = h.split(',');
              h = isNaN(r[0]) ? r[0] : parseInt(r[0]);
              r = 1 == r.length ? h : isNaN(r[1]) ? r[1] : parseInt(r[1]);
              if ('*' == r || '+' == r)
                h = '*' == r ? 0 : 1;
              p.quantifier = {
                min: h,
                max: r
              };
              if (0 < m.length) {
                r = m[m.length - 1].matches;
                h = r.pop();
                if (!h.isGroup) {
                  var u = new f(!0);
                  u.matches.push(h);
                  h = u;
                }
                r.push(h);
                r.push(p);
              } else
                h = g.matches.pop(), h.isGroup || (u = new f(!0), u.matches.push(h), h = u), g.matches.push(h), g.matches.push(p);
              break;
            case a.escapeChar:
              q = !0;
              break;
            case a.alternatormarker:
              break;
            default:
              0 < m.length ? d(m[m.length - 1], h) : (0 < g.matches.length && (p = g.matches[g.matches.length - 1], p.isGroup && (p.isGroup = !1, d(p, a.groupmarker.start, 0), d(p, a.groupmarker.end))), d(g, h));
            }
          0 < g.matches.length && (p = g.matches[g.matches.length - 1], p.isGroup && (p.isGroup = !1, d(p, a.groupmarker.start, 0), d(p, a.groupmarker.end)), n.push(g));
          return n;
        }
        function f(f, d) {
          if (a.numericInput && !0 !== a.multi) {
            f = f.split('').reverse();
            for (var c = 0; c < f.length; c++)
              f[c] == a.optionalmarker.start ? f[c] = a.optionalmarker.end : f[c] == a.optionalmarker.end ? f[c] = a.optionalmarker.start : f[c] == a.groupmarker.start ? f[c] = a.groupmarker.end : f[c] == a.groupmarker.end && (f[c] = a.groupmarker.start);
            f = f.join('');
          }
          if (void 0 != f && '' != f) {
            if (0 < a.repeat || '*' == a.repeat || '+' == a.repeat)
              f = a.groupmarker.start + f + a.groupmarker.end + a.quantifiermarker.start + ('*' == a.repeat ? 0 : '+' == a.repeat ? 1 : a.repeat) + ',' + a.repeat + a.quantifiermarker.end;
            void 0 == e.inputmask.masksCache[f] && (e.inputmask.masksCache[f] = {
              mask: f,
              maskToken: b(f),
              validPositions: {},
              _buffer: void 0,
              buffer: void 0,
              tests: {},
              metadata: d
            });
            return e.extend(!0, {}, e.inputmask.masksCache[f]);
          }
        }
        var d = [];
        e.isFunction(a.mask) && (a.mask = a.mask.call(this, a));
        e.isArray(a.mask) ? e.each(a.mask, function (a, b) {
          void 0 != b.mask ? d.push(f(b.mask.toString(), b)) : d.push(f(b.toString()));
        }) : (1 == a.mask.length && !1 == a.greedy && 0 != a.repeat && (a.placeholder = ''), d = void 0 != a.mask.mask ? f(a.mask.mask.toString(), a.mask) : f(a.mask.toString()));
        return d;
      }, c = 'function' === typeof ScriptEngineMajorVersion ? ScriptEngineMajorVersion() : 10 <= new Function('/*@cc_on return @_jscript_version; @*/')(), g = navigator.userAgent, h = null !== g.match(/iphone/i), n = null !== g.match(/android.*safari.*/i), z = null !== g.match(/android.*chrome.*/i), u = null !== g.match(/android.*firefox.*/i), J = /Kindle/i.test(g) || /Silk/i.test(g) || /KFTT/i.test(g) || /KFOT/i.test(g) || /KFJWA/i.test(g) || /KFJWI/i.test(g) || /KFSOWI/i.test(g) || /KFTHWA/i.test(g) || /KFTHWI/i.test(g) || /KFAPWA/i.test(g) || /KFAPWI/i.test(g), K = a('paste') ? 'paste' : a('input') ? 'input' : 'propertychange', r = function (a, b, f) {
        function d(a, e, c) {
          e = e || 0;
          var g = [], h, w = 0, k;
          do {
            if (!0 === a && b.validPositions[w]) {
              var t = b.validPositions[w];
              k = t.match;
              h = t.locator.slice();
              g.push(null == k.fn ? k.def : !0 === c ? t.input : k.placeholder || f.placeholder.charAt(w % f.placeholder.length));
            } else
              h = e > w ? N(w, h, w - 1)[0] : G(w, h, w - 1), k = h.match, h = h.locator.slice(), g.push(null == k.fn ? k.def : k.placeholder || f.placeholder.charAt(w % f.placeholder.length));
            w++;
          } while ((void 0 == L || w - 1 < L) && null != k.fn || null == k.fn && '' != k.def || e >= w);
          g.pop();
          return g;
        }
        function g(a) {
          var e = b;
          e.buffer = void 0;
          e.tests = {};
          !0 !== a && (e._buffer = void 0, e.validPositions = {}, e.p = -1);
        }
        function r(a) {
          var e = -1, f = b.validPositions;
          void 0 == a && (a = -1);
          var c = e, d;
          for (d in f) {
            var g = parseInt(d);
            if (-1 == a || null != f[g].match.fn)
              g < a && (c = g), g >= a && (e = g);
          }
          return 1 < a - c || e < a ? c : e;
        }
        function k(a, c, d) {
          if (f.insertMode && void 0 != b.validPositions[a] && void 0 == d) {
            d = e.extend(!0, {}, b.validPositions);
            var g = r(), k;
            for (k = a; k <= g; k++)
              delete b.validPositions[k];
            b.validPositions[a] = c;
            c = !0;
            for (k = a; k <= g; k++) {
              a = d[k];
              if (void 0 != a) {
                var h = null == a.match.fn ? k + 1 : C(k);
                c = ea(h, a.match.def) ? c && !1 !== P(h, a.input, !0, !0) : !1;
              }
              if (!c)
                break;
            }
            if (!c)
              return b.validPositions = e.extend(!0, {}, d), !1;
          } else
            b.validPositions[a] = c;
          return !0;
        }
        function t(a, e) {
          var f, c = a;
          for (f = a; f < e; f++)
            delete b.validPositions[f];
          for (f = e; f <= r();) {
            var d = b.validPositions[f], k = b.validPositions[c];
            void 0 != d && void 0 == k ? (ea(c, d.match.def) && !1 !== P(c, d.input, !0) && (delete b.validPositions[f], f++), c++) : f++;
          }
          for (f = r(); 0 < f && (void 0 == b.validPositions[f] || null == b.validPositions[f].match.fn);)
            delete b.validPositions[f], f--;
          g(!0);
        }
        function G(a, b, e) {
          a = N(a, b, e);
          var c;
          for (b = 0; b < a.length && (c = a[b], !f.greedy && (!c.match || !1 !== c.match.optionality && !1 !== c.match.newBlockMarker || !0 === c.match.optionalQuantifier)); b++);
          return c;
        }
        function x(a) {
          return b.validPositions[a] ? b.validPositions[a].match : N(a)[0].match;
        }
        function ea(a, b) {
          for (var e = !1, f = N(a), c = 0; c < f.length; c++)
            if (f[c].match && f[c].match.def == b) {
              e = !0;
              break;
            }
          return e;
        }
        function N(a, c, d) {
          function g(b, c, d, v) {
            function S(d, v, q) {
              if (h == a && void 0 == d.matches)
                return t.push({
                  match: d,
                  locator: v.reverse()
                }), !0;
              if (void 0 != d.matches)
                if (d.isGroup && !0 !== q) {
                  if (d = S(b.matches[k + 1], v))
                    return !0;
                } else if (d.isOptional) {
                  var m = d;
                  if (d = g(d, c, v, q))
                    d = t[t.length - 1].match, (d = 0 == e.inArray(d, m.matches)) && (l = !0), h = a;
                } else {
                  if (!d.isAlternator)
                    if (d.isQuantifier && !0 !== q)
                      for (m = d, f.greedy = f.greedy && isFinite(m.quantifier.max), q = 0 < c.length && !0 !== q ? c.shift() : 0; q < (isNaN(m.quantifier.max) ? q + 1 : m.quantifier.max) && h <= a; q++) {
                        var r = b.matches[e.inArray(m, b.matches) - 1];
                        if (d = S(r, [q].concat(v), !0))
                          if (d = t[t.length - 1].match, d.optionalQuantifier = q > m.quantifier.min - 1, d = 0 == e.inArray(d, r.matches))
                            if (q > m.quantifier.min - 1) {
                              l = !0;
                              h = a;
                              break;
                            } else
                              return !0;
                          else
                            return !0;
                      }
                    else if (d = g(d, c, v, q))
                      return !0;
                }
              else
                h++;
            }
            for (var k = 0 < c.length ? c.shift() : 0; k < b.matches.length; k++)
              if (!0 !== b.matches[k].isQuantifier) {
                var q = S(b.matches[k], [k].concat(d), v);
                if (q && h == a)
                  return q;
                if (h > a)
                  break;
              }
          }
          var k = b.maskToken, h = c ? d : 0;
          d = c || [0];
          var t = [], l = !1;
          if (void 0 == c) {
            c = a - 1;
            for (var m; void 0 == (m = b.validPositions[c]) && -1 < c;)
              c--;
            if (void 0 != m && -1 < c)
              h = c, d = m.locator.slice();
            else {
              for (c = a - 1; void 0 == (m = b.tests[c]) && -1 < c;)
                c--;
              void 0 != m && -1 < c && (h = c, d = m[0].locator.slice());
            }
          }
          for (c = d.shift(); c < k.length && !(g(k[c], d, [c]) && h == a || h > a); c++);
          (0 == t.length || l) && t.push({
            match: {
              fn: null,
              cardinality: 0,
              optionality: !0,
              casing: null,
              def: ''
            },
            locator: []
          });
          return b.tests[a] = t;
        }
        function D() {
          void 0 == b._buffer && (b._buffer = d(!1, 1));
          return b._buffer;
        }
        function p() {
          void 0 == b.buffer && (b.buffer = d(!0, r(), !0));
          return b.buffer;
        }
        function Z(a, c) {
          var e = p().slice();
          if (!0 === a)
            g(), a = 0, c = e.length;
          else
            for (var d = a; d < c; d++)
              delete b.validPositions[d], delete b.tests[d];
          for (d = a; d < c; d++)
            e[d] != f.skipOptionalPartCharacter && P(d, e[d], !0, !0);
        }
        function la(a, b) {
          switch (b.casing) {
          case 'upper':
            a = a.toUpperCase();
            break;
          case 'lower':
            a = a.toLowerCase();
          }
          return a;
        }
        function P(a, c, d, h) {
          function m(a, c, d, ma) {
            var v = !1;
            e.each(N(a), function (h, S) {
              var l = S.match, w = c ? 1 : 0, m = '';
              p();
              for (var V = l.cardinality; V > w; V--)
                m += void 0 == b.validPositions[a - (V - 1)] ? U(a - (V - 1)) : b.validPositions[a - (V - 1)].input;
              c && (m += c);
              v = null != l.fn ? l.fn.test(m, b, a, d, f) : c != l.def && c != f.skipOptionalPartCharacter || '' == l.def ? !1 : {
                c: l.def,
                pos: a
              };
              if (!1 !== v) {
                w = void 0 != v.c ? v.c : c;
                w = w == f.skipOptionalPartCharacter && null === l.fn ? l.def : w;
                m = a;
                void 0 != v.remove && t(v.remove, v.remove + 1);
                if (v.refreshFromBuffer) {
                  m = v.refreshFromBuffer;
                  d = !0;
                  Z(!0 === m ? m : m.start, m.end);
                  if (void 0 == v.pos && void 0 == v.c)
                    return v.pos = r(), !1;
                  m = void 0 != v.pos ? v.pos : a;
                  if (m != a)
                    return v = e.extend(v, P(m, w, !0)), !1;
                } else if (!0 !== v && void 0 != v.pos && v.pos != a && (m = v.pos, Z(a, m), m != a))
                  return v = e.extend(v, P(m, w, !0)), !1;
                if (!0 != v && void 0 == v.pos && void 0 == v.c)
                  return !1;
                0 < h && g(!0);
                k(m, e.extend({}, S, { input: la(w, l) }), ma) || (v = !1);
                return !1;
              }
            });
            return v;
          }
          d = !0 === d;
          for (var w = p(), l = a - 1; -1 < l && (!b.validPositions[l] || null != b.validPositions[l].fn); l--)
            if ((!M(l) || w[l] != U(l)) && 1 < N(l).length) {
              m(l, w[l], !0);
              break;
            }
          if (a >= Q())
            return !1;
          w = m(a, c, d, h);
          if (!d && !1 === w)
            if ((l = b.validPositions[a]) && null == l.match.fn && (l.match.def == c || c == f.skipOptionalPartCharacter))
              w = { caret: C(a) };
            else if ((f.insertMode || void 0 == b.validPositions[C(a)]) && !M(a))
              for (var l = a + 1, x = C(a); l <= x; l++)
                if (w = m(l, c, d, h), !1 !== w) {
                  a = l;
                  break;
                }
          !0 === w && (w = { pos: a });
          return w;
        }
        function M(a) {
          a = x(a);
          return null != a.fn ? a.fn : !1;
        }
        function Q() {
          var a;
          L = s.prop('maxLength');
          -1 == L && (L = void 0);
          if (!1 == f.greedy) {
            var c;
            c = r();
            a = b.validPositions[c];
            var d = void 0 != a ? a.locator.slice() : void 0;
            for (c += 1; void 0 == a || null != a.match.fn || null == a.match.fn && '' != a.match.def; c++)
              a = G(c, d, c - 1), d = a.locator.slice();
            a = c;
          } else
            a = p().length;
          return void 0 == L || a < L ? a : L;
        }
        function C(a) {
          var b = Q();
          if (a >= b)
            return b;
          for (; ++a < b && !M(a) && (!0 !== f.nojumps || f.nojumpsThreshold > a););
          return a;
        }
        function X(a) {
          if (0 >= a)
            return 0;
          for (; 0 < --a && !M(a););
          return a;
        }
        function F(a, b, c) {
          a._valueSet(b.join(''));
          void 0 != c && y(a, c);
        }
        function U(a, b) {
          b = b || x(a);
          return b.placeholder || (null == b.fn ? b.def : f.placeholder.charAt(a % f.placeholder.length));
        }
        function R(a, c, d, k, h) {
          k = void 0 != k ? k.slice() : ka(a._valueGet()).split('');
          g();
          c && a._valueSet('');
          e.each(k, function (c, f) {
            if (!0 === h) {
              var g = b.p, g = -1 == g ? g : X(g), k = -1 == g ? c : C(g);
              -1 == e.inArray(f, D().slice(g + 1, k)) && $.call(a, void 0, !0, f.charCodeAt(0), !1, d, c);
            } else
              $.call(a, void 0, !0, f.charCodeAt(0), !1, d, c), d = d || 0 < c && c > b.p;
          });
          c && (c = f.onKeyPress.call(this, void 0, p(), 0, f), Y(a, c), F(a, p(), e(a).is(':focus') ? C(r(0)) : void 0));
        }
        function da(a) {
          return e.inputmask.escapeRegex.call(this, a);
        }
        function ka(a) {
          return a.replace(RegExp('(' + da(D().join('')) + ')*$'), '');
        }
        function fa(a) {
          if (a.data('_inputmask') && !a.hasClass('hasDatepicker')) {
            var c = [], d = b.validPositions, g;
            for (g in d)
              d[g].match && null != d[g].match.fn && c.push(d[g].input);
            c = (A ? c.reverse() : c).join('');
            d = (A ? p().reverse() : p()).join('');
            e.isFunction(f.onUnMask) && (c = f.onUnMask.call(a, d, c, f));
            return c;
          }
          return a[0]._valueGet();
        }
        function O(a) {
          !A || 'number' != typeof a || f.greedy && '' == f.placeholder || (a = p().length - a);
          return a;
        }
        function y(a, b, c) {
          a = a.jquery && 0 < a.length ? a[0] : a;
          if ('number' == typeof b) {
            b = O(b);
            c = O(c);
            c = 'number' == typeof c ? c : b;
            var d = e(a).data('_inputmask') || {};
            d.caret = {
              begin: b,
              end: c
            };
            e(a).data('_inputmask', d);
            e(a).is(':visible') && (a.scrollLeft = a.scrollWidth, !1 == f.insertMode && b == c && c++, a.setSelectionRange ? (a.selectionStart = b, a.selectionEnd = c) : a.createTextRange && (a = a.createTextRange(), a.collapse(!0), a.moveEnd('character', c), a.moveStart('character', b), a.select()));
          } else
            return d = e(a).data('_inputmask'), !e(a).is(':visible') && d && void 0 != d.caret ? (b = d.caret.begin, c = d.caret.end) : a.setSelectionRange ? (b = a.selectionStart, c = a.selectionEnd) : document.selection && document.selection.createRange && (a = document.selection.createRange(), b = 0 - a.duplicate().moveStart('character', -100000), c = b + a.text.length), b = O(b), c = O(c), {
              begin: b,
              end: c
            };
        }
        function aa(a) {
          var c = p(), d = c.length, f, g = r(), k = {}, h = void 0 != b.validPositions[g] ? b.validPositions[g].locator.slice() : void 0, l;
          for (f = g + 1; f < c.length; f++)
            l = G(f, h, f - 1), h = l.locator.slice(), k[f] = e.extend(!0, {}, l);
          for (f = d - 1; f > g; f--)
            if (l = k[f].match, (l.optionality || l.optionalQuantifier) && c[f] == U(f, l))
              d--;
            else
              break;
          return a ? {
            l: d,
            def: k[d] ? k[d].match : void 0
          } : d;
        }
        function ba(a) {
          var b = p().slice(), c = aa();
          b.length = c;
          F(a, b);
        }
        function T(a) {
          if (e.isFunction(f.isComplete))
            return f.isComplete.call(s, a, f);
          if ('*' != f.repeat) {
            var b = !1, c = aa(!0), d = X(c.l);
            if (r() == d && (void 0 == c.def || c.def.newBlockMarker || c.def.optionalQuantifier))
              for (b = !0, c = 0; c <= d; c++) {
                var g = M(c);
                if (g && (void 0 == a[c] || a[c] == U(c)) || !g && a[c] != U(c)) {
                  b = !1;
                  break;
                }
              }
            return b;
          }
        }
        function na(a) {
          a = e._data(a).events;
          e.each(a, function (a, b) {
            e.each(b, function (a, b) {
              if ('inputmask' == b.namespace && 'setvalue' != b.type) {
                var c = b.handler;
                b.handler = function (a) {
                  if (this.readOnly || this.disabled)
                    a.preventDefault;
                  else
                    return c.apply(this, arguments);
                };
              }
            });
          });
        }
        function oa(a) {
          function b(a) {
            if (void 0 == e.valHooks[a] || !0 != e.valHooks[a].inputmaskpatch) {
              var c = e.valHooks[a] && e.valHooks[a].get ? e.valHooks[a].get : function (a) {
                  return a.value;
                }, d = e.valHooks[a] && e.valHooks[a].set ? e.valHooks[a].set : function (a, b) {
                  a.value = b;
                  return a;
                };
              e.valHooks[a] = {
                get: function (a) {
                  var b = e(a);
                  if (b.data('_inputmask')) {
                    if (b.data('_inputmask').opts.autoUnmask)
                      return b.inputmask('unmaskedvalue');
                    a = c(a);
                    b = (b = b.data('_inputmask').maskset._buffer) ? b.join('') : '';
                    return a != b ? a : '';
                  }
                  return c(a);
                },
                set: function (a, b) {
                  var c = e(a), f = c.data('_inputmask');
                  f ? (f = d(a, e.isFunction(f.opts.onBeforeMask) ? f.opts.onBeforeMask.call(B, b, f.opts) : b), c.triggerHandler('setvalue.inputmask')) : f = d(a, b);
                  return f;
                },
                inputmaskpatch: !0
              };
            }
          }
          var c;
          Object.getOwnPropertyDescriptor && (c = Object.getOwnPropertyDescriptor(a, 'value'));
          if (c && c.get) {
            if (!a._valueGet) {
              var d = c.get, f = c.set;
              a._valueGet = function () {
                return A ? d.call(this).split('').reverse().join('') : d.call(this);
              };
              a._valueSet = function (a) {
                f.call(this, A ? a.split('').reverse().join('') : a);
              };
              Object.defineProperty(a, 'value', {
                get: function () {
                  var a = e(this), b = e(this).data('_inputmask');
                  return b ? b.opts.autoUnmask ? a.inputmask('unmaskedvalue') : d.call(this) != D().join('') ? d.call(this) : '' : d.call(this);
                },
                set: function (a) {
                  var b = e(this).data('_inputmask');
                  b ? (f.call(this, e.isFunction(b.opts.onBeforeMask) ? b.opts.onBeforeMask.call(B, a, b.opts) : a), e(this).triggerHandler('setvalue.inputmask')) : f.call(this, a);
                }
              });
            }
          } else
            document.__lookupGetter__ && a.__lookupGetter__('value') ? a._valueGet || (d = a.__lookupGetter__('value'), f = a.__lookupSetter__('value'), a._valueGet = function () {
              return A ? d.call(this).split('').reverse().join('') : d.call(this);
            }, a._valueSet = function (a) {
              f.call(this, A ? a.split('').reverse().join('') : a);
            }, a.__defineGetter__('value', function () {
              var a = e(this), b = e(this).data('_inputmask');
              return b ? b.opts.autoUnmask ? a.inputmask('unmaskedvalue') : d.call(this) != D().join('') ? d.call(this) : '' : d.call(this);
            }), a.__defineSetter__('value', function (a) {
              var b = e(this).data('_inputmask');
              b ? (f.call(this, e.isFunction(b.opts.onBeforeMask) ? b.opts.onBeforeMask.call(B, a, b.opts) : a), e(this).triggerHandler('setvalue.inputmask')) : f.call(this, a);
            })) : (a._valueGet || (a._valueGet = function () {
              return A ? this.value.split('').reverse().join('') : this.value;
            }, a._valueSet = function (a) {
              this.value = A ? a.split('').reverse().join('') : a;
            }), b(a.type));
        }
        function ga(a, c, d) {
          if (f.numericInput || A)
            c == f.keyCode.BACKSPACE ? c = f.keyCode.DELETE : c == f.keyCode.DELETE && (c = f.keyCode.BACKSPACE), A && (a = d.end, d.end = d.begin, d.begin = a);
          c == f.keyCode.BACKSPACE && 1 >= d.end - d.begin ? d.begin = X(d.begin) : c == f.keyCode.DELETE && d.begin == d.end && d.end++;
          t(d.begin, d.end);
          c = r(d.begin);
          b.p = c < d.begin ? C(c) : d.begin;
        }
        function Y(a, b, c) {
          if (b && b.refreshFromBuffer) {
            var d = b.refreshFromBuffer;
            Z(!0 === d ? d : d.start, d.end);
            g(!0);
            void 0 != c && (F(a, p()), y(a, b.caret || c.begin, b.caret || c.end));
          }
        }
        function ha(a) {
          ca = !1;
          var c = this, d = e(c), g = a.keyCode, k = y(c);
          g == f.keyCode.BACKSPACE || g == f.keyCode.DELETE || h && 127 == g || a.ctrlKey && 88 == g ? (a.preventDefault(), 88 == g && (H = p().join('')), ga(c, g, k), F(c, p(), b.p), c._valueGet() == D().join('') && d.trigger('cleared'), f.showTooltip && d.prop('title', b.mask)) : g == f.keyCode.END || g == f.keyCode.PAGE_DOWN ? setTimeout(function () {
            var b = C(r());
            f.insertMode || b != Q() || a.shiftKey || b--;
            y(c, a.shiftKey ? k.begin : b, b);
          }, 0) : g == f.keyCode.HOME && !a.shiftKey || g == f.keyCode.PAGE_UP ? y(c, 0, a.shiftKey ? k.begin : 0) : g == f.keyCode.ESCAPE || 90 == g && a.ctrlKey ? (R(c, !0, !1, H.split('')), d.click()) : g != f.keyCode.INSERT || a.shiftKey || a.ctrlKey ? !1 != f.insertMode || a.shiftKey || (g == f.keyCode.RIGHT ? setTimeout(function () {
            var a = y(c);
            y(c, a.begin);
          }, 0) : g == f.keyCode.LEFT && setTimeout(function () {
            var a = y(c);
            y(c, A ? a.begin + 1 : a.begin - 1);
          }, 0)) : (f.insertMode = !f.insertMode, y(c, f.insertMode || k.begin != Q() ? k.begin : k.begin - 1));
          var d = y(c), l = f.onKeyDown.call(this, a, p(), d.begin, f);
          Y(c, l, d);
          ia = -1 != e.inArray(g, f.ignorables);
        }
        function $(a, c, d, h, l, m) {
          if (void 0 == d && ca)
            return !1;
          ca = !0;
          var t = e(this);
          a = a || window.event;
          d = c ? d : a.which || a.charCode || a.keyCode;
          if (!(!0 === c || a.ctrlKey && a.altKey) && (a.ctrlKey || a.metaKey || ia))
            return !0;
          if (d) {
            !0 !== c && 46 == d && !1 == a.shiftKey && ',' == f.radixPoint && (d = 44);
            var x, G;
            d = String.fromCharCode(d);
            c ? (m = l ? m : r() + 1, x = {
              begin: m,
              end: m
            }) : x = y(this);
            if (m = A ? 1 < x.begin - x.end || 1 == x.begin - x.end && f.insertMode : 1 < x.end - x.begin || 1 == x.end - x.begin && f.insertMode)
              b.undoPositions = e.extend(!0, {}, b.validPositions), ga(this, f.keyCode.DELETE, x), f.insertMode || (f.insertMode = !f.insertMode, k(x.begin, l), f.insertMode = !f.insertMode), m = !f.multi;
            b.writeOutBuffer = !0;
            x = A && !m ? x.end : x.begin;
            var n = P(x, d, l);
            !1 !== n && (!0 !== n && (x = void 0 != n.pos ? n.pos : x, d = void 0 != n.c ? n.c : d), g(!0), void 0 != n.caret ? G = n.caret : (l = b.validPositions, G = void 0 != l[x + 1] && 1 < N(x + 1, l[x].locator.slice(), x).length ? x + 1 : C(x)), b.p = G);
            if (!1 !== h) {
              var s = this;
              setTimeout(function () {
                f.onKeyValidation.call(s, n, f);
              }, 0);
              if (b.writeOutBuffer && !1 !== n) {
                var u = p();
                F(this, u, c ? void 0 : f.numericInput ? X(G) : G);
                !0 !== c && setTimeout(function () {
                  !0 === T(u) && t.trigger('complete');
                  W = !0;
                  t.trigger('input');
                }, 0);
              } else
                m && (b.buffer = void 0, b.validPositions = b.undoPositions);
            } else
              m && (b.buffer = void 0, b.validPositions = b.undoPositions);
            f.showTooltip && t.prop('title', b.mask);
            a && !0 != c && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, c = y(this), a = f.onKeyPress.call(this, a, p(), c.begin, f), Y(this, a, c));
            for (var D in b.validPositions);
          }
        }
        function pa(a) {
          var b = e(this), c = a.keyCode, d = p(), k = y(this);
          a = f.onKeyUp.call(this, a, d, k.begin, f);
          Y(this, a, k);
          c == f.keyCode.TAB && f.showMaskOnFocus && (b.hasClass('focus-inputmask') && 0 == this._valueGet().length ? (g(), d = p(), F(this, d), y(this, 0), H = p().join('')) : (F(this, d), y(this, O(0), O(Q()))));
        }
        function ja(a) {
          if (!0 === W && 'input' == a.type)
            return W = !1, !0;
          var b = e(this), c = this._valueGet();
          if ('propertychange' == a.type && this._valueGet().length <= Q())
            return !0;
          'paste' == a.type && (window.clipboardData && window.clipboardData.getData ? c = window.clipboardData.getData('Text') : a.originalEvent && a.originalEvent.clipboardData && a.originalEvent.clipboardData.getData && (c = a.originalEvent.clipboardData.getData('text/plain')));
          a = e.isFunction(f.onBeforePaste) ? f.onBeforePaste.call(this, c, f) : c;
          R(this, !0, !1, a.split(''), !0);
          b.click();
          !0 === T(p()) && b.trigger('complete');
          return !1;
        }
        function qa(a) {
          if (!0 === W && 'input' == a.type)
            return W = !1, !0;
          var b = y(this), c = this._valueGet(), c = c.replace(RegExp('(' + da(D().join('')) + ')*'), '');
          b.begin > c.length && (y(this, c.length), b = y(this));
          1 != p().length - c.length || c.charAt(b.begin) == p()[b.begin] || c.charAt(b.begin + 1) == p()[b.begin] || M(b.begin) || (a.keyCode = f.keyCode.BACKSPACE, ha.call(this, a));
          a.preventDefault();
        }
        function ra(a) {
          s = e(a);
          if (s.is(':input') && 'number' != s.attr('type')) {
            s.data('_inputmask', {
              maskset: b,
              opts: f,
              isRTL: !1
            });
            f.showTooltip && s.prop('title', b.mask);
            oa(a);
            ('rtl' == a.dir || f.rightAlign) && s.css('text-align', 'right');
            if ('rtl' == a.dir || f.numericInput) {
              a.dir = 'ltr';
              s.removeAttr('dir');
              var d = s.data('_inputmask');
              d.isRTL = !0;
              s.data('_inputmask', d);
              A = !0;
            }
            s.unbind('.inputmask');
            s.removeClass('focus-inputmask');
            s.closest('form').bind('submit', function () {
              H != p().join('') && s.change();
              f.autoUnmask && f.removeMaskOnSubmit && s.inputmask('remove');
            }).bind('reset', function () {
              setTimeout(function () {
                s.trigger('setvalue');
              }, 0);
            });
            s.bind('mouseenter.inputmask', function () {
              !e(this).hasClass('focus-inputmask') && f.showMaskOnHover && this._valueGet() != p().join('') && F(this, p());
            }).bind('blur.inputmask', function () {
              var a = e(this);
              if (a.data('_inputmask')) {
                var b = this._valueGet(), c = p();
                a.removeClass('focus-inputmask');
                H != p().join('') && a.change();
                f.clearMaskOnLostFocus && '' != b && (b == D().join('') ? this._valueSet('') : ba(this));
                !1 === T(c) && (a.trigger('incomplete'), f.clearIncomplete && (g(), f.clearMaskOnLostFocus ? this._valueSet('') : (c = D().slice(), F(this, c))));
              }
            }).bind('focus.inputmask', function () {
              var a = e(this), b = this._valueGet();
              f.showMaskOnFocus && !a.hasClass('focus-inputmask') && (!f.showMaskOnHover || f.showMaskOnHover && '' == b) && this._valueGet() != p().join('') && F(this, p(), C(r()));
              a.addClass('focus-inputmask');
              H = p().join('');
            }).bind('mouseleave.inputmask', function () {
              var a = e(this);
              f.clearMaskOnLostFocus && (a.hasClass('focus-inputmask') || this._valueGet() == a.attr('placeholder') || (this._valueGet() == D().join('') || '' == this._valueGet() ? this._valueSet('') : ba(this)));
            }).bind('click.inputmask', function () {
              var a = this;
              e(a).is(':focus') && setTimeout(function () {
                var b = y(a);
                if (b.begin == b.end) {
                  var b = A ? O(b.begin) : b.begin, c = r(b), c = C(c);
                  b < c ? M(b) ? y(a, b) : y(a, C(b)) : y(a, c);
                }
              }, 0);
            }).bind('dblclick.inputmask', function () {
              var a = this;
              setTimeout(function () {
                y(a, 0, C(r()));
              }, 0);
            }).bind(K + '.inputmask dragdrop.inputmask drop.inputmask', ja).bind('setvalue.inputmask', function () {
              R(this, !0);
              H = p().join('');
              this._valueGet() == D().join('') && this._valueSet('');
            }).bind('complete.inputmask', f.oncomplete).bind('incomplete.inputmask', f.onincomplete).bind('cleared.inputmask', f.oncleared);
            s.bind('keydown.inputmask', ha).bind('keypress.inputmask', $).bind('keyup.inputmask', pa);
            if (n || u || z || J)
              'input' == K && s.unbind(K + '.inputmask'), s.bind('input.inputmask', qa);
            c && s.bind('input.inputmask', ja);
            d = e.isFunction(f.onBeforeMask) ? f.onBeforeMask.call(a, a._valueGet(), f) : a._valueGet();
            R(a, !0, !1, d.split(''), !0);
            H = p().join('');
            var k;
            try {
              k = document.activeElement;
            } catch (h) {
            }
            k === a ? (s.addClass('focus-inputmask'), y(a, C(r()))) : (!1 === T(p()) && f.clearIncomplete && g(), f.clearMaskOnLostFocus ? p().join('') == D().join('') ? a._valueSet('') : ba(a) : F(a, p()));
            na(a);
          }
        }
        var A = !1, H, s, ca = !1, W = !1, ia = !1, L;
        if (void 0 != a)
          switch (a.action) {
          case 'isComplete':
            return s = e(a.el), b = s.data('_inputmask').maskset, f = s.data('_inputmask').opts, T(a.buffer);
          case 'unmaskedvalue':
            return s = a.$input, b = s.data('_inputmask').maskset, f = s.data('_inputmask').opts, A = a.$input.data('_inputmask').isRTL, fa(a.$input);
          case 'mask':
            H = p().join('');
            ra(a.el);
            break;
          case 'format':
            s = e({});
            s.data('_inputmask', {
              maskset: b,
              opts: f,
              isRTL: f.numericInput
            });
            f.numericInput && (A = !0);
            var E = a.value.split('');
            R(s, !1, !1, A ? E.reverse() : E, !0);
            return A ? p().reverse().join('') : p().join('');
          case 'isValid':
            s = e({});
            s.data('_inputmask', {
              maskset: b,
              opts: f,
              isRTL: f.numericInput
            });
            f.numericInput && (A = !0);
            E = a.value.split('');
            R(s, !1, !0, A ? E.reverse() : E);
            var E = p(), sa = aa();
            E.length = sa;
            return T(E) && a.value == E.join('');
          case 'getemptymask':
            return s = e(a.el), b = s.data('_inputmask').maskset, f = s.data('_inputmask').opts, D();
          case 'remove':
            var B = a.el;
            s = e(B);
            b = s.data('_inputmask').maskset;
            f = s.data('_inputmask').opts;
            B._valueSet(fa(s));
            s.unbind('.inputmask');
            s.removeClass('focus-inputmask');
            s.removeData('_inputmask');
            Object.getOwnPropertyDescriptor && (E = Object.getOwnPropertyDescriptor(B, 'value'));
            E && E.get ? B._valueGet && Object.defineProperty(B, 'value', {
              get: B._valueGet,
              set: B._valueSet
            }) : document.__lookupGetter__ && B.__lookupGetter__('value') && B._valueGet && (B.__defineGetter__('value', B._valueGet), B.__defineSetter__('value', B._valueSet));
            try {
              delete B._valueGet, delete B._valueSet;
            } catch (ua) {
              B._valueGet = void 0, B._valueSet = void 0;
            }
          }
      };
    e.inputmask = {
      defaults: {
        placeholder: '_',
        optionalmarker: {
          start: '[',
          end: ']'
        },
        quantifiermarker: {
          start: '{',
          end: '}'
        },
        groupmarker: {
          start: '(',
          end: ')'
        },
        alternatormarker: '|',
        escapeChar: '\\',
        mask: null,
        oncomplete: e.noop,
        onincomplete: e.noop,
        oncleared: e.noop,
        repeat: 0,
        greedy: !0,
        autoUnmask: !1,
        removeMaskOnSubmit: !0,
        clearMaskOnLostFocus: !0,
        insertMode: !0,
        clearIncomplete: !1,
        aliases: {},
        alias: null,
        onKeyUp: e.noop,
        onKeyPress: e.noop,
        onKeyDown: e.noop,
        onBeforeMask: void 0,
        onBeforePaste: void 0,
        onUnMask: void 0,
        showMaskOnFocus: !0,
        showMaskOnHover: !0,
        onKeyValidation: e.noop,
        skipOptionalPartCharacter: ' ',
        showTooltip: !1,
        numericInput: !1,
        rightAlign: !1,
        radixPoint: '',
        nojumps: !1,
        nojumpsThreshold: 0,
        definitions: {
          9: {
            validator: '[0-9]',
            cardinality: 1,
            definitionSymbol: '*'
          },
          a: {
            validator: '[A-Za-z\u0410-\u044f\u0401\u0451]',
            cardinality: 1,
            definitionSymbol: '*'
          },
          '*': {
            validator: '[A-Za-z\u0410-\u044f\u0401\u04510-9]',
            cardinality: 1
          }
        },
        keyCode: {
          ALT: 18,
          BACKSPACE: 8,
          CAPS_LOCK: 20,
          COMMA: 188,
          COMMAND: 91,
          COMMAND_LEFT: 91,
          COMMAND_RIGHT: 93,
          CONTROL: 17,
          DELETE: 46,
          DOWN: 40,
          END: 35,
          ENTER: 13,
          ESCAPE: 27,
          HOME: 36,
          INSERT: 45,
          LEFT: 37,
          MENU: 93,
          NUMPAD_ADD: 107,
          NUMPAD_DECIMAL: 110,
          NUMPAD_DIVIDE: 111,
          NUMPAD_ENTER: 108,
          NUMPAD_MULTIPLY: 106,
          NUMPAD_SUBTRACT: 109,
          PAGE_DOWN: 34,
          PAGE_UP: 33,
          PERIOD: 190,
          RIGHT: 39,
          SHIFT: 16,
          SPACE: 32,
          TAB: 9,
          UP: 38,
          WINDOWS: 91
        },
        ignorables: [
          8,
          9,
          13,
          19,
          27,
          33,
          34,
          35,
          36,
          37,
          38,
          39,
          40,
          45,
          46,
          93,
          112,
          113,
          114,
          115,
          116,
          117,
          118,
          119,
          120,
          121,
          122,
          123
        ],
        isComplete: void 0
      },
      masksCache: {},
      escapeRegex: function (a) {
        return a.replace(RegExp('(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)', 'gim'), '\\$1');
      },
      format: function (a, c) {
        var f = e.extend(!0, {}, e.inputmask.defaults, c);
        b(f.alias, c, f);
        return r({
          action: 'format',
          value: a
        }, d(f), f);
      },
      isValid: function (a, c) {
        var f = e.extend(!0, {}, e.inputmask.defaults, c);
        b(f.alias, c, f);
        return r({
          action: 'isValid',
          value: a
        }, d(f), f);
      }
    };
    e.fn.inputmask = function (a, c, f, g, h) {
      function n(a, b) {
        var c = e(a), d;
        for (d in b) {
          var f = c.data('inputmask-' + d.toLowerCase());
          void 0 != f && (b[d] = f);
        }
        return b;
      }
      f = f || r;
      g = g || '_inputmask';
      var k = e.extend(!0, {}, e.inputmask.defaults, c), t;
      if ('string' === typeof a)
        switch (a) {
        case 'mask':
          return b(k.alias, c, k), t = d(k), 0 == t.length ? this : this.each(function () {
            f({
              action: 'mask',
              el: this
            }, e.extend(!0, {}, e.isArray(t) && f === r ? t[0] : t), n(this, k));
          });
        case 'unmaskedvalue':
          return a = e(this), a.data(g) ? f({
            action: 'unmaskedvalue',
            $input: a
          }) : a.val();
        case 'remove':
          return this.each(function () {
            e(this).data(g) && f({
              action: 'remove',
              el: this
            });
          });
        case 'getemptymask':
          return this.data(g) ? f({
            action: 'getemptymask',
            el: this
          }) : '';
        case 'hasMaskedValue':
          return this.data(g) ? !this.data(g).opts.autoUnmask : !1;
        case 'isComplete':
          return this.data(g) ? f({
            action: 'isComplete',
            buffer: this[0]._valueGet().split(''),
            el: this
          }) : !0;
        case 'getmetadata':
          if (this.data(g))
            return t = this.data(g).maskset, t.metadata;
          break;
        case '_detectScope':
          return b(k.alias, c, k), void 0 == h || b(h, c, k) || -1 != e.inArray(h, 'mask unmaskedvalue remove getemptymask hasMaskedValue isComplete getmetadata _detectScope'.split(' ')) || (k.mask = h), e.isFunction(k.mask) && (k.mask = k.mask.call(this, k)), e.isArray(k.mask);
        default:
          return b(k.alias, c, k), b(a, c, k) || (k.mask = a), t = d(k), void 0 == t ? this : this.each(function () {
            f({
              action: 'mask',
              el: this
            }, e.extend(!0, {}, e.isArray(t) && f === r ? t[0] : t), n(this, k));
          });
        }
      else {
        if ('object' == typeof a)
          return k = e.extend(!0, {}, e.inputmask.defaults, a), b(k.alias, a, k), t = d(k), void 0 == t ? this : this.each(function () {
            f({
              action: 'mask',
              el: this
            }, e.extend(!0, {}, e.isArray(t) && f === r ? t[0] : t), n(this, k));
          });
        if (void 0 == a)
          return this.each(function () {
            var a = e(this).attr('data-inputmask');
            if (a && '' != a)
              try {
                var a = a.replace(RegExp('\'', 'g'), '"'), d = e.parseJSON('{' + a + '}');
                e.extend(!0, d, c);
                k = e.extend(!0, {}, e.inputmask.defaults, d);
                b(k.alias, d, k);
                k.alias = void 0;
                e(this).inputmask('mask', k, f);
              } catch (g) {
              }
          });
      }
    };
  }
}(jQuery));
(function (e) {
  if (void 0 != e.fn.inputmask) {
    var a = function (a, d, c) {
      function g(a) {
        var c = document.createElement('input');
        a = 'on' + a;
        var b = a in c;
        b || (c.setAttribute(a, 'return;'), b = 'function' == typeof c[a]);
        return b;
      }
      function h(a) {
        if (void 0 == e.valHooks[a] || !0 != e.valHooks[a].inputmaskmultipatch) {
          var c = e.valHooks[a] && e.valHooks[a].get ? e.valHooks[a].get : function (a) {
              return a.value;
            }, b = e.valHooks[a] && e.valHooks[a].set ? e.valHooks[a].set : function (a, c) {
              a.value = c;
              return a;
            };
          e.valHooks[a] = {
            get: function (a) {
              var b = e(a);
              return b.data('_inputmask-multi') ? (a = b.data('_inputmask-multi'), c(a.elmasks[a.activeMasksetIndex])) : c(a);
            },
            set: function (a, c) {
              var d = e(a), f = b(a, c);
              d.data('_inputmask-multi') && d.triggerHandler('setvalue');
              return f;
            },
            inputmaskmultipatch: !0
          };
        }
      }
      function n(a, b, d) {
        a = a.jquery && 0 < a.length ? a[0] : a;
        if ('number' == typeof b) {
          b = z(b);
          d = z(d);
          d = 'number' == typeof d ? d : b;
          if (a != l) {
            var f = e(a).data('_inputmask') || {};
            f.caret = {
              begin: b,
              end: d
            };
            e(a).data('_inputmask', f);
          }
          e(a).is(':visible') && (a.scrollLeft = a.scrollWidth, !1 == c.insertMode && b == d && d++, a.setSelectionRange ? (a.selectionStart = b, a.selectionEnd = d) : a.createTextRange && (a = a.createTextRange(), a.collapse(!0), a.moveEnd('character', d), a.moveStart('character', b), a.select()));
        } else
          return f = e(a).data('_inputmask'), !e(a).is(':visible') && f && void 0 != f.caret ? (b = f.caret.begin, d = f.caret.end) : a.setSelectionRange ? (b = a.selectionStart, d = a.selectionEnd) : document.selection && document.selection.createRange && (a = document.selection.createRange(), b = 0 - a.duplicate().moveStart('character', -100000), d = b + a.text.length), b = z(b), d = z(d), {
            begin: b,
            end: d
          };
      }
      function z(a) {
        !r || 'number' != typeof a || c.greedy && '' == c.placeholder || (a = l.value.length - a);
        return a;
      }
      function u(a, b) {
        if ('multiMaskScope' != a) {
          if (e.isFunction(c.determineActiveMasksetIndex))
            m = c.determineActiveMasksetIndex.call(q, a, b);
          else {
            var d = -1, f = -1, g = -1;
            e.each(b, function (a, b) {
              var c = e(b).data('_inputmask').maskset, h = -1, l = 0, k = n(b).begin, q;
              for (q in c.validPositions)
                c = parseInt(q), c > h && (h = c), l++;
              if (l > d || l == d && f > k && g > h || l == d && f == k && g < h)
                d = l, f = k, m = a, g = h;
            });
          }
          var h = q.data('_inputmask-multi') || {
              activeMasksetIndex: 0,
              elmasks: b
            };
          h.activeMasksetIndex = m;
          q.data('_inputmask-multi', h);
        }
        -1 == e.inArray(a, ['focus']) && l.value != b[m]._valueGet() && (h = '' == e(b[m]).val() ? b[m]._valueGet() : e(b[m]).val(), l.value = h);
        -1 == e.inArray(a, [
          'blur',
          'focus'
        ]) && e(b[m]).hasClass('focus-inputmask') && (h = n(b[m]), n(l, h.begin, h.end));
      }
      function J(a) {
        l = a;
        q = e(l);
        r = 'rtl' == l.dir || c.numericInput;
        m = 0;
        f = e.map(d, function (a, b) {
          var d = '<input type="text" ';
          q.attr('value') && (d += 'value="' + q.attr('value') + '" ');
          q.attr('dir') && (d += 'dir="' + q.attr('dir') + '" ');
          d = e(d + '/>')[0];
          e(d).inputmask(e.extend({}, c, { mask: a.mask }));
          return d;
        });
        q.data('_inputmask-multi', {
          activeMasksetIndex: 0,
          elmasks: f
        });
        ('rtl' == l.dir || c.rightAlign) && q.css('text-align', 'right');
        l.dir = 'ltr';
        q.removeAttr('dir');
        '' != q.attr('value') && u('init', f);
        q.bind('mouseenter blur focus mouseleave click dblclick keydown keypress keypress', function (a) {
          var b = n(l), d, g = !0;
          if ('keydown' == a.type) {
            d = a.keyCode;
            if (d == c.keyCode.DOWN && m < f.length - 1)
              return m++, u('multiMaskScope', f), !1;
            if (d == c.keyCode.UP && 0 < m)
              return m--, u('multiMaskScope', f), !1;
            if (a.ctrlKey || a.shiftKey || a.altKey)
              return !0;
          } else if ('keypress' == a.type && (a.ctrlKey || a.shiftKey || a.altKey))
            return !0;
          e.each(f, function (f, h) {
            if ('keydown' == a.type) {
              d = a.keyCode;
              if (d == c.keyCode.BACKSPACE && h._valueGet().length < b.begin)
                return;
              if (d == c.keyCode.TAB)
                g = !1;
              else {
                if (d == c.keyCode.RIGHT) {
                  n(h, b.begin + 1, b.end + 1);
                  g = !1;
                  return;
                }
                if (d == c.keyCode.LEFT) {
                  n(h, b.begin - 1, b.end - 1);
                  g = !1;
                  return;
                }
              }
            }
            if (-1 != e.inArray(a.type, ['click']) && (n(h, z(b.begin), z(b.end)), b.begin != b.end)) {
              g = !1;
              return;
            }
            -1 != e.inArray(a.type, ['keydown']) && b.begin != b.end && n(h, b.begin, b.end);
            e(h).triggerHandler(a);
          });
          g && setTimeout(function () {
            u(a.type, f);
          }, 0);
        });
        q.bind(K + ' dragdrop drop setvalue', function (a) {
          n(l);
          setTimeout(function () {
            e.each(f, function (b, c) {
              c._valueSet(l.value);
              e(c).triggerHandler(a);
            });
            setTimeout(function () {
              u(a.type, f);
            }, 0);
          }, 0);
        });
        h(l.type);
      }
      var K = g('paste') ? 'paste' : g('input') ? 'input' : 'propertychange', r, l, q, f, m;
      c.multi = !0;
      if (void 0 != a)
        switch (a.action) {
        case 'isComplete':
          return q = e(a.el), a = q.data('_inputmask-multi'), a = a.elmasks[a.activeMasksetIndex], e(a).inputmask('isComplete');
        case 'unmaskedvalue':
          return q = a.$input, a = q.data('_inputmask-multi'), a = a.elmasks[a.activeMasksetIndex], e(a).inputmask('unmaskedvalue');
        case 'mask':
          J(a.el);
          break;
        case 'format':
          return q = e({}), q.data('_inputmask', {
            maskset: maskset,
            opts: c,
            isRTL: c.numericInput
          }), c.numericInput && (r = !0), a = a.value.split(''), checkVal(q, !1, !1, r ? a.reverse() : a, !0), r ? getBuffer().reverse().join('') : getBuffer().join('');
        case 'isValid':
          return q = e({}), q.data('_inputmask', {
            maskset: maskset,
            opts: c,
            isRTL: c.numericInput
          }), c.numericInput && (r = !0), a = a.value.split(''), checkVal(q, !1, !0, r ? a.reverse() : a), isComplete(getBuffer());
        case 'getemptymask':
          return q = e(a.el), maskset = q.data('_inputmask').maskset, c = q.data('_inputmask').opts, getBufferTemplate();
        case 'remove':
          l = a.el;
          q = e(l);
          maskset = q.data('_inputmask').maskset;
          c = q.data('_inputmask').opts;
          l._valueSet(unmaskedvalue(q));
          q.unbind('.inputmask');
          q.removeClass('focus-inputmask');
          q.removeData('_inputmask');
          var I;
          Object.getOwnPropertyDescriptor && (I = Object.getOwnPropertyDescriptor(l, 'value'));
          I && I.get ? l._valueGet && Object.defineProperty(l, 'value', {
            get: l._valueGet,
            set: l._valueSet
          }) : document.__lookupGetter__ && l.__lookupGetter__('value') && l._valueGet && (l.__defineGetter__('value', l._valueGet), l.__defineSetter__('value', l._valueSet));
          try {
            delete l._valueGet, delete l._valueSet;
          } catch (ta) {
            l._valueGet = void 0, l._valueSet = void 0;
          }
        }
    };
    e.extend(e.inputmask.defaults, {
      multi: !1,
      determineActiveMasksetIndex: void 0
    });
    e.inputmask._fn = e.fn.inputmask;
    e.fn.inputmask = function (b, d) {
      if ('string' === typeof b)
        return e.inputmask._fn('_detectScope', d, void 0, void 0, b) ? e.inputmask._fn.call(this, b, d, a, '_inputmask-multi') : e.inputmask._fn.call(this, b, d);
      if ('object' == typeof b)
        return e.inputmask._fn('_detectScope', b) ? e.inputmask._fn.call(this, b, d, a, '_inputmask-multi') : e.inputmask._fn.call(this, b, d);
      if (void 0 == b)
        return e.inputmask._fn.call(this, b, d);
    };
  }
}(jQuery));
(function (e) {
  e.extend(e.inputmask.defaults.definitions, {
    A: {
      validator: '[A-Za-z]',
      cardinality: 1,
      casing: 'upper'
    },
    '#': {
      validator: '[A-Za-z\u0410-\u044f\u0401\u04510-9]',
      cardinality: 1,
      casing: 'upper'
    }
  });
  e.extend(e.inputmask.defaults.aliases, {
    url: {
      mask: 'ir',
      placeholder: '',
      separator: '',
      defaultPrefix: 'http://',
      regex: {
        urlpre1: /[fh]/,
        urlpre2: /(ft|ht)/,
        urlpre3: /(ftp|htt)/,
        urlpre4: /(ftp:|http|ftps)/,
        urlpre5: /(ftp:\/|ftps:|http:|https)/,
        urlpre6: /(ftp:\/\/|ftps:\/|http:\/|https:)/,
        urlpre7: /(ftp:\/\/|ftps:\/\/|http:\/\/|https:\/)/,
        urlpre8: /(ftp:\/\/|ftps:\/\/|http:\/\/|https:\/\/)/
      },
      definitions: {
        i: {
          validator: function (a, b, d, c, g) {
            return !0;
          },
          cardinality: 8,
          prevalidator: function () {
            for (var a = [], b = 0; 8 > b; b++)
              a[b] = function () {
                var a = b;
                return {
                  validator: function (b, g, e, n, z) {
                    if (z.regex['urlpre' + (a + 1)]) {
                      var u = b;
                      0 < a + 1 - b.length && (u = g.buffer.join('').substring(0, a + 1 - b.length) + '' + u);
                      b = z.regex['urlpre' + (a + 1)].test(u);
                      if (!n && !b) {
                        e -= a;
                        for (n = 0; n < z.defaultPrefix.length; n++)
                          g.buffer[e] = z.defaultPrefix[n], e++;
                        for (n = 0; n < u.length - 1; n++)
                          g.buffer[e] = u[n], e++;
                        return { pos: e };
                      }
                      return b;
                    }
                    return !1;
                  },
                  cardinality: a
                };
              }();
            return a;
          }()
        },
        r: {
          validator: '.',
          cardinality: 50
        }
      },
      insertMode: !1,
      autoUnmask: !1
    },
    ip: {
      mask: 'i[i[i]].i[i[i]].i[i[i]].i[i[i]]',
      definitions: {
        i: {
          validator: function (a, b, d, c, g) {
            -1 < d - 1 && '.' != b.buffer[d - 1] ? (a = b.buffer[d - 1] + a, a = -1 < d - 2 && '.' != b.buffer[d - 2] ? b.buffer[d - 2] + a : '0' + a) : a = '00' + a;
            return /25[0-5]|2[0-4][0-9]|[01][0-9][0-9]/.test(a);
          },
          cardinality: 1
        }
      }
    },
    email: {
      mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}.*{2,6}[.*{1,2}]',
      greedy: !1,
      onBeforePaste: function (a, b) {
        a = a.toLowerCase();
        return a.replace('mailto:', '');
      },
      definitions: {
        '*': {
          validator: '[A-Za-z\u0410-\u044f\u0401\u04510-9]',
          cardinality: 1,
          casing: 'lower'
        }
      }
    }
  });
}(jQuery));
(function (e) {
  e.extend(e.inputmask.defaults.definitions, {
    h: {
      validator: '[01][0-9]|2[0-3]',
      cardinality: 2,
      prevalidator: [{
          validator: '[0-2]',
          cardinality: 1
        }]
    },
    s: {
      validator: '[0-5][0-9]',
      cardinality: 2,
      prevalidator: [{
          validator: '[0-5]',
          cardinality: 1
        }]
    },
    d: {
      validator: '0[1-9]|[12][0-9]|3[01]',
      cardinality: 2,
      prevalidator: [{
          validator: '[0-3]',
          cardinality: 1
        }]
    },
    m: {
      validator: '0[1-9]|1[012]',
      cardinality: 2,
      prevalidator: [{
          validator: '[01]',
          cardinality: 1
        }]
    },
    y: {
      validator: '(19|20)\\d{2}',
      cardinality: 4,
      prevalidator: [
        {
          validator: '[12]',
          cardinality: 1
        },
        {
          validator: '(19|20)',
          cardinality: 2
        },
        {
          validator: '(19|20)\\d',
          cardinality: 3
        }
      ]
    }
  });
  e.extend(e.inputmask.defaults.aliases, {
    'dd/mm/yyyy': {
      mask: '1/2/y',
      placeholder: 'dd/mm/yyyy',
      regex: {
        val1pre: /[0-3]/,
        val1: /0[1-9]|[12][0-9]|3[01]/,
        val2pre: function (a) {
          a = e.inputmask.escapeRegex.call(this, a);
          return RegExp('((0[1-9]|[12][0-9]|3[01])' + a + '[01])');
        },
        val2: function (a) {
          a = e.inputmask.escapeRegex.call(this, a);
          return RegExp('((0[1-9]|[12][0-9])' + a + '(0[1-9]|1[012]))|(30' + a + '(0[13-9]|1[012]))|(31' + a + '(0[13578]|1[02]))');
        }
      },
      leapday: '29/02/',
      separator: '/',
      yearrange: {
        minyear: 1900,
        maxyear: 2099
      },
      isInYearRange: function (a, b, d) {
        if (isNaN(a))
          return !1;
        var c = parseInt(a.concat(b.toString().slice(a.length)));
        a = parseInt(a.concat(d.toString().slice(a.length)));
        return (isNaN(c) ? !1 : b <= c && c <= d) || (isNaN(a) ? !1 : b <= a && a <= d);
      },
      determinebaseyear: function (a, b, d) {
        var c = new Date().getFullYear();
        if (a > c)
          return a;
        if (b < c) {
          for (var c = b.toString().slice(0, 2), g = b.toString().slice(2, 4); b < c + d;)
            c--;
          b = c + g;
          return a > b ? a : b;
        }
        return c;
      },
      onKeyUp: function (a, b, d, c) {
        b = e(this);
        a.ctrlKey && a.keyCode == c.keyCode.RIGHT && (a = new Date(), b.val(a.getDate().toString() + (a.getMonth() + 1).toString() + a.getFullYear().toString()));
      },
      definitions: {
        1: {
          validator: function (a, b, d, c, g) {
            var e = g.regex.val1.test(a);
            return c || e || a.charAt(1) != g.separator && -1 == '-./'.indexOf(a.charAt(1)) || !(e = g.regex.val1.test('0' + a.charAt(0))) ? e : (b.buffer[d - 1] = '0', {
              refreshFromBuffer: {
                start: d - 1,
                end: d
              },
              pos: d,
              c: a.charAt(0)
            });
          },
          cardinality: 2,
          prevalidator: [{
              validator: function (a, b, d, c, e) {
                isNaN(b.buffer[d + 1]) || (a += b.buffer[d + 1]);
                var h = 1 == a.length ? e.regex.val1pre.test(a) : e.regex.val1.test(a);
                return c || h || !(h = e.regex.val1.test('0' + a)) ? h : (b.buffer[d] = '0', d++, { pos: d });
              },
              cardinality: 1
            }]
        },
        2: {
          validator: function (a, b, d, c, e) {
            var h = e.mask.indexOf('2') == e.mask.length - 1 ? b.buffer.join('').substr(5, 3) : b.buffer.join('').substr(0, 3);
            -1 != h.indexOf(e.placeholder[0]) && (h = '01' + e.separator);
            var n = e.regex.val2(e.separator).test(h + a);
            if (!(c || n || a.charAt(1) != e.separator && -1 == '-./'.indexOf(a.charAt(1))) && (n = e.regex.val2(e.separator).test(h + '0' + a.charAt(0))))
              return b.buffer[d - 1] = '0', {
                refreshFromBuffer: {
                  start: d - 1,
                  end: d
                },
                pos: d,
                c: a.charAt(0)
              };
            if (e.mask.indexOf('2') == e.mask.length - 1 && n) {
              if (b.buffer.join('').substr(4, 4) + a != e.leapday)
                return !0;
              a = parseInt(b.buffer.join('').substr(0, 4), 10);
              return 0 === a % 4 ? 0 === a % 100 ? 0 === a % 400 ? !0 : !1 : !0 : !1;
            }
            return n;
          },
          cardinality: 2,
          prevalidator: [{
              validator: function (a, b, d, c, e) {
                isNaN(b.buffer[d + 1]) || (a += b.buffer[d + 1]);
                var h = e.mask.indexOf('2') == e.mask.length - 1 ? b.buffer.join('').substr(5, 3) : b.buffer.join('').substr(0, 3);
                -1 != h.indexOf(e.placeholder[0]) && (h = '01' + e.separator);
                var n = 1 == a.length ? e.regex.val2pre(e.separator).test(h + a) : e.regex.val2(e.separator).test(h + a);
                return c || n || !(n = e.regex.val2(e.separator).test(h + '0' + a)) ? n : (b.buffer[d] = '0', d++, { pos: d });
              },
              cardinality: 1
            }]
        },
        y: {
          validator: function (a, b, d, c, e) {
            if (e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear)) {
              if (b.buffer.join('').substr(0, 6) != e.leapday)
                return !0;
              a = parseInt(a, 10);
              return 0 === a % 4 ? 0 === a % 100 ? 0 === a % 400 ? !0 : !1 : !0 : !1;
            }
            return !1;
          },
          cardinality: 4,
          prevalidator: [
            {
              validator: function (a, b, d, c, e) {
                var h = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                if (!c && !h) {
                  c = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + '0').toString().slice(0, 1);
                  if (h = e.isInYearRange(c + a, e.yearrange.minyear, e.yearrange.maxyear))
                    return b.buffer[d++] = c[0], { pos: d };
                  c = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a + '0').toString().slice(0, 2);
                  if (h = e.isInYearRange(c + a, e.yearrange.minyear, e.yearrange.maxyear))
                    return b.buffer[d++] = c[0], b.buffer[d++] = c[1], { pos: d };
                }
                return h;
              },
              cardinality: 1
            },
            {
              validator: function (a, b, d, c, e) {
                var h = e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
                if (!c && !h) {
                  c = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2);
                  if (h = e.isInYearRange(a[0] + c[1] + a[1], e.yearrange.minyear, e.yearrange.maxyear))
                    return b.buffer[d++] = c[1], { pos: d };
                  c = e.determinebaseyear(e.yearrange.minyear, e.yearrange.maxyear, a).toString().slice(0, 2);
                  e.isInYearRange(c + a, e.yearrange.minyear, e.yearrange.maxyear) ? b.buffer.join('').substr(0, 6) != e.leapday ? h = !0 : (e = parseInt(a, 10), h = 0 === e % 4 ? 0 === e % 100 ? 0 === e % 400 ? !0 : !1 : !0 : !1) : h = !1;
                  if (h)
                    return b.buffer[d - 1] = c[0], b.buffer[d++] = c[1], b.buffer[d++] = a[0], {
                      refreshFromBuffer: {
                        start: d - 3,
                        end: d
                      },
                      pos: d
                    };
                }
                return h;
              },
              cardinality: 2
            },
            {
              validator: function (a, b, d, c, e) {
                return e.isInYearRange(a, e.yearrange.minyear, e.yearrange.maxyear);
              },
              cardinality: 3
            }
          ]
        }
      },
      insertMode: !1,
      autoUnmask: !1
    },
    'mm/dd/yyyy': {
      placeholder: 'mm/dd/yyyy',
      alias: 'dd/mm/yyyy',
      regex: {
        val2pre: function (a) {
          a = e.inputmask.escapeRegex.call(this, a);
          return RegExp('((0[13-9]|1[012])' + a + '[0-3])|(02' + a + '[0-2])');
        },
        val2: function (a) {
          a = e.inputmask.escapeRegex.call(this, a);
          return RegExp('((0[1-9]|1[012])' + a + '(0[1-9]|[12][0-9]))|((0[13-9]|1[012])' + a + '30)|((0[13578]|1[02])' + a + '31)');
        },
        val1pre: /[01]/,
        val1: /0[1-9]|1[012]/
      },
      leapday: '02/29/',
      onKeyUp: function (a, b, d, c) {
        b = e(this);
        a.ctrlKey && a.keyCode == c.keyCode.RIGHT && (a = new Date(), b.val((a.getMonth() + 1).toString() + a.getDate().toString() + a.getFullYear().toString()));
      }
    },
    'yyyy/mm/dd': {
      mask: 'y/1/2',
      placeholder: 'yyyy/mm/dd',
      alias: 'mm/dd/yyyy',
      leapday: '/02/29',
      onKeyUp: function (a, b, d, c) {
        b = e(this);
        a.ctrlKey && a.keyCode == c.keyCode.RIGHT && (a = new Date(), b.val(a.getFullYear().toString() + (a.getMonth() + 1).toString() + a.getDate().toString()));
      }
    },
    'dd.mm.yyyy': {
      mask: '1.2.y',
      placeholder: 'dd.mm.yyyy',
      leapday: '29.02.',
      separator: '.',
      alias: 'dd/mm/yyyy'
    },
    'dd-mm-yyyy': {
      mask: '1-2-y',
      placeholder: 'dd-mm-yyyy',
      leapday: '29-02-',
      separator: '-',
      alias: 'dd/mm/yyyy'
    },
    'mm.dd.yyyy': {
      mask: '1.2.y',
      placeholder: 'mm.dd.yyyy',
      leapday: '02.29.',
      separator: '.',
      alias: 'mm/dd/yyyy'
    },
    'mm-dd-yyyy': {
      mask: '1-2-y',
      placeholder: 'mm-dd-yyyy',
      leapday: '02-29-',
      separator: '-',
      alias: 'mm/dd/yyyy'
    },
    'yyyy.mm.dd': {
      mask: 'y.1.2',
      placeholder: 'yyyy.mm.dd',
      leapday: '.02.29',
      separator: '.',
      alias: 'yyyy/mm/dd'
    },
    'yyyy-mm-dd': {
      mask: 'y-1-2',
      placeholder: 'yyyy-mm-dd',
      leapday: '-02-29',
      separator: '-',
      alias: 'yyyy/mm/dd'
    },
    datetime: {
      mask: '1/2/y h:s',
      placeholder: 'dd/mm/yyyy hh:mm',
      alias: 'dd/mm/yyyy',
      regex: {
        hrspre: /[012]/,
        hrs24: /2[0-4]|1[3-9]/,
        hrs: /[01][0-9]|2[0-4]/,
        ampm: /^[a|p|A|P][m|M]/,
        mspre: /[0-5]/,
        ms: /[0-5][0-9]/
      },
      timeseparator: ':',
      hourFormat: '24',
      definitions: {
        h: {
          validator: function (a, b, d, c, e) {
            if ('24' == e.hourFormat && 24 == parseInt(a, 10))
              return b.buffer[d - 1] = '0', b.buffer[d] = '0', {
                refreshFromBuffer: {
                  start: d - 1,
                  end: d
                },
                c: '0'
              };
            var h = e.regex.hrs.test(a);
            return c || h || a.charAt(1) != e.timeseparator && -1 == '-.:'.indexOf(a.charAt(1)) || !(h = e.regex.hrs.test('0' + a.charAt(0))) ? h && '24' !== e.hourFormat && e.regex.hrs24.test(a) ? (a = parseInt(a, 10), b.buffer[d + 5] = 24 == a ? 'a' : 'p', b.buffer[d + 6] = 'm', a -= 12, 10 > a ? (b.buffer[d] = a.toString(), b.buffer[d - 1] = '0') : (b.buffer[d] = a.toString().charAt(1), b.buffer[d - 1] = a.toString().charAt(0)), {
              refreshFromBuffer: {
                start: d - 1,
                end: d + 6
              },
              c: b.buffer[d]
            }) : h : (b.buffer[d - 1] = '0', b.buffer[d] = a.charAt(0), d++, {
              refreshFromBuffer: {
                start: d - 2,
                end: d
              },
              pos: d,
              c: e.timeseparator
            });
          },
          cardinality: 2,
          prevalidator: [{
              validator: function (a, b, d, c, e) {
                var h = e.regex.hrspre.test(a);
                return c || h || !(h = e.regex.hrs.test('0' + a)) ? h : (b.buffer[d] = '0', d++, { pos: d });
              },
              cardinality: 1
            }]
        },
        s: {
          validator: '[0-5][0-9]',
          cardinality: 2,
          prevalidator: [{
              validator: function (a, b, d, c, e) {
                var h = e.regex.mspre.test(a);
                return c || h || !(h = e.regex.ms.test('0' + a)) ? h : (b.buffer[d] = '0', d++, { pos: d });
              },
              cardinality: 1
            }]
        },
        t: {
          validator: function (a, b, d, c, e) {
            return e.regex.ampm.test(a + 'm');
          },
          casing: 'lower',
          cardinality: 1
        }
      },
      insertMode: !1,
      autoUnmask: !1
    },
    datetime12: {
      mask: '1/2/y h:s t\\m',
      placeholder: 'dd/mm/yyyy hh:mm xm',
      alias: 'datetime',
      hourFormat: '12'
    },
    'hh:mm t': {
      mask: 'h:s t\\m',
      placeholder: 'hh:mm xm',
      alias: 'datetime',
      hourFormat: '12'
    },
    'h:s t': {
      mask: 'h:s t\\m',
      placeholder: 'hh:mm xm',
      alias: 'datetime',
      hourFormat: '12'
    },
    'hh:mm:ss': {
      mask: 'h:s:s',
      placeholder: 'hh:mm:ss',
      alias: 'datetime',
      autoUnmask: !1
    },
    'hh:mm': {
      mask: 'h:s',
      placeholder: 'hh:mm',
      alias: 'datetime',
      autoUnmask: !1
    },
    date: { alias: 'dd/mm/yyyy' },
    'mm/yyyy': {
      mask: '1/y',
      placeholder: 'mm/yyyy',
      leapday: 'donotuse',
      separator: '/',
      alias: 'mm/dd/yyyy'
    }
  });
}(jQuery));
(function (e) {
  e.extend(e.inputmask.defaults.aliases, {
    numeric: {
      mask: function (a) {
        0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat);
        a.repeat = 0;
        a.autoGroup = a.autoGroup && '' != a.groupSeparator;
        if (a.autoGroup && isFinite(a.integerDigits)) {
          var b = Math.floor(a.integerDigits / a.groupSize);
          a.integerDigits += 0 == a.integerDigits % a.groupSize ? b - 1 : b;
        }
        a.definitions[':'].placeholder = a.radixPoint;
        b = a.prefix;
        b = b + '[+]' + ('~{1,' + a.integerDigits + '}');
        void 0 != a.digits && (isNaN(a.digits) || 0 < parseInt(a.digits)) && (b = a.digitsOptional ? b + ('[:~{' + a.digits + '}]') : b + (':~{' + a.digits + '}'));
        return b += a.suffix;
      },
      placeholder: '',
      greedy: !1,
      digits: '*',
      digitsOptional: !0,
      groupSeparator: '',
      radixPoint: '.',
      groupSize: 3,
      autoGroup: !1,
      allowPlus: !0,
      allowMinus: !0,
      integerDigits: '+',
      prefix: '',
      suffix: '',
      rightAlign: !0,
      postFormat: function (a, b, d, c) {
        var g = !1, h = a[b];
        if ('' == c.groupSeparator || -1 != e.inArray(c.radixPoint, a) && b >= e.inArray(c.radixPoint, a) || /[-+]/.test(h))
          return { pos: b };
        var n = a.slice();
        h == c.groupSeparator && (n.splice(b--, 1), h = n[b]);
        d ? n[b] = '?' : n.splice(b, 0, '?');
        b = n.join('');
        if (c.autoGroup || d && -1 != b.indexOf(c.groupSeparator)) {
          n = e.inputmask.escapeRegex.call(this, c.groupSeparator);
          g = 0 == b.indexOf(c.groupSeparator);
          b = b.replace(RegExp(n, 'g'), '');
          n = b.split(c.radixPoint);
          b = n[0];
          if (b != c.prefix + '?0' && b.length > c.groupSize + c.prefix.length)
            for (var g = !0, z = RegExp('([-+]?[\\d?]+)([\\d?]{' + c.groupSize + '})'); z.test(b);)
              b = b.replace(z, '$1' + c.groupSeparator + '$2'), b = b.replace(c.groupSeparator + c.groupSeparator, c.groupSeparator);
          1 < n.length && (b += c.radixPoint + n[1]);
        }
        a.length = b.length;
        c = 0;
        for (n = b.length; c < n; c++)
          a[c] = b.charAt(c);
        c = e.inArray('?', a);
        d ? a[c] = h : a.splice(c, 1);
        return {
          pos: c,
          refreshFromBuffer: g
        };
      },
      onKeyDown: function (a, b, d, c) {
        if (c.autoGroup && (a.keyCode == c.keyCode.DELETE || a.keyCode == c.keyCode.BACKSPACE))
          return a = c.postFormat(b, d - 1, !0, c), a.caret = a.pos + 1, a;
      },
      onKeyPress: function (a, b, d, c) {
        if (c.autoGroup)
          return a = c.postFormat(b, d - 1, !0, c), a.caret = a.pos + 1, a;
      },
      regex: {
        integerPart: function (a) {
          return /[-+]?\d+/;
        }
      },
      negationhandler: function (a, b, d, c, e) {
        return !c && e.allowMinus && '-' === a && (a = b.join('').match(e.regex.integerPart(e)), 0 < a.length) ? '+' == b[a.index] ? {
          pos: a.index,
          c: '-',
          remove: a.index,
          caret: d
        } : '-' == b[a.index] ? {
          remove: a.index,
          caret: d - 1
        } : {
          pos: a.index,
          c: '-',
          caret: d + 1
        } : !1;
      },
      definitions: {
        '~': {
          validator: function (a, b, d, c, g) {
            var h = g.negationhandler(a, b.buffer, d, c, g);
            if (!h && (h = c ? RegExp('[0-9' + e.inputmask.escapeRegex.call(this, g.groupSeparator) + ']').test(a) : /[0-9]/.test(a), !0 === h && (h = { pos: d }), !1 != h && !c)) {
              c = b.buffer.join('').match(g.regex.integerPart(g));
              var n = e.inArray(g.radixPoint, b.buffer);
              if (c)
                if (0 == c['0'][0].indexOf('0') && d >= g.prefix.length)
                  -1 == n || d <= n && void 0 == b.validPositions[n] ? (b.buffer.splice(c.index, 1), d = d > c.index ? d - 1 : c.index, e.extend(h, {
                    pos: d,
                    remove: c.index
                  })) : d > c.index && d <= n && (b.buffer.splice(c.index, 1), d = d > c.index ? d - 1 : c.index, e.extend(h, {
                    pos: d,
                    remove: c.index
                  }));
                else if ('0' == a && d <= c.index)
                  return !1;
              if (!1 === g.digitsOptional && d > n)
                return {
                  pos: d,
                  remove: d
                };
            }
            return h;
          },
          cardinality: 1,
          prevalidator: null
        },
        '+': {
          validator: function (a, b, d, c, e) {
            b = '[';
            !0 === e.allowMinus && (b += '-');
            !0 === e.allowPlus && (b += '+');
            return RegExp(b + ']').test(a);
          },
          cardinality: 1,
          prevalidator: null
        },
        ':': {
          validator: function (a, b, d, c, g) {
            c = g.negationhandler(a, b.buffer, d, c, g);
            c || (c = '[' + e.inputmask.escapeRegex.call(this, g.radixPoint) + ']', (c = RegExp(c).test(a)) && b.validPositions[d] && b.validPositions[d].match.placeholder == g.radixPoint && (c = {
              pos: d,
              remove: d
            }));
            return c;
          },
          cardinality: 1,
          prevalidator: null,
          placeholder: ''
        }
      },
      insertMode: !0,
      autoUnmask: !1,
      onUnMask: function (a, b, d) {
        a = a.replace(d.prefix, '');
        a = a.replace(d.suffix, '');
        return a = a.replace(RegExp(e.inputmask.escapeRegex.call(this, d.groupSeparator), 'g'), '');
      },
      isComplete: function (a, b) {
        var d = a.join(''), c = a.slice();
        b.postFormat(c, 0, !0, b);
        if (c.join('') != d)
          return !1;
        d = d.replace(b.prefix, '');
        d = d.replace(b.suffix, '');
        d = d.replace(RegExp(e.inputmask.escapeRegex.call(this, b.groupSeparator), 'g'), '');
        d = d.replace(e.inputmask.escapeRegex.call(this, b.radixPoint), '.');
        return isFinite(d);
      },
      onBeforeMask: function (a, b) {
        if (isFinite(a))
          return a.toString().replace('.', b.radixPoint);
        var d = a.match(/,/g), c = a.match(/\./g);
        c && d ? c.length > d.length ? (a = a.replace(/\./g, ''), a = a.replace(',', b.radixPoint)) : d.length > c.length && (a = a.replace(/,/g, ''), a = a.replace('.', b.radixPoint)) : a = a.replace(RegExp(e.inputmask.escapeRegex.call(this, b.groupSeparator), 'g'), '');
        return a;
      }
    },
    decimal: { alias: 'numeric' },
    integer: {
      alias: 'numeric',
      digits: '0'
    }
  });
}(jQuery));
(function (e) {
  e.extend(e.inputmask.defaults.aliases, {
    Regex: {
      mask: 'r',
      greedy: !1,
      repeat: '*',
      regex: null,
      regexTokens: null,
      tokenizer: /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
      quantifierFilter: /[0-9]+[^,]/,
      isComplete: function (a, b) {
        return RegExp(b.regex).test(a.join(''));
      },
      definitions: {
        r: {
          validator: function (a, b, d, c, g) {
            function h(a, b) {
              this.matches = [];
              this.isGroup = a || !1;
              this.isQuantifier = b || !1;
              this.quantifier = {
                min: 1,
                max: 1
              };
              this.repeaterPart = void 0;
            }
            function n() {
              var a = new h(), b, c = [];
              for (g.regexTokens = []; b = g.tokenizer.exec(g.regex);)
                switch (b = b[0], b.charAt(0)) {
                case '(':
                  c.push(new h(!0));
                  break;
                case ')':
                  var d = c.pop();
                  0 < c.length ? c[c.length - 1].matches.push(d) : a.matches.push(d);
                  break;
                case '{':
                case '+':
                case '*':
                  var e = new h(!1, !0);
                  b = b.replace(/[{}]/g, '');
                  d = b.split(',');
                  b = isNaN(d[0]) ? d[0] : parseInt(d[0]);
                  d = 1 == d.length ? b : isNaN(d[1]) ? d[1] : parseInt(d[1]);
                  e.quantifier = {
                    min: b,
                    max: d
                  };
                  if (0 < c.length) {
                    var n = c[c.length - 1].matches;
                    b = n.pop();
                    b.isGroup || (d = new h(!0), d.matches.push(b), b = d);
                    n.push(b);
                    n.push(e);
                  } else
                    b = a.matches.pop(), b.isGroup || (d = new h(!0), d.matches.push(b), b = d), a.matches.push(b), a.matches.push(e);
                  break;
                default:
                  0 < c.length ? c[c.length - 1].matches.push(b) : a.matches.push(b);
                }
              0 < a.matches.length && g.regexTokens.push(a);
            }
            function z(a, b) {
              var c = !1;
              b && (u += '(', J++);
              for (var d = 0; d < a.matches.length; d++) {
                var g = a.matches[d];
                if (!0 == g.isGroup)
                  c = z(g, !0);
                else if (!0 == g.isQuantifier) {
                  var h = e.inArray(g, a.matches), h = a.matches[h - 1], n = u;
                  if (isNaN(g.quantifier.max)) {
                    for (; g.repeaterPart && g.repeaterPart != u && g.repeaterPart.length > u.length && !(c = z(h, !0)););
                    (c = c || z(h, !0)) && (g.repeaterPart = u);
                    u = n + g.quantifier.max;
                  } else {
                    for (var k = 0, t = g.quantifier.max - 1; k < t && !(c = z(h, !0)); k++);
                    u = n + '{' + g.quantifier.min + ',' + g.quantifier.max + '}';
                  }
                } else if (void 0 != g.matches)
                  for (h = 0; h < g.length && !(c = z(g[h], b)); h++);
                else {
                  if ('[' == g[0]) {
                    c = u;
                    c += g;
                    for (k = 0; k < J; k++)
                      c += ')';
                    c = RegExp('^(' + c + ')$');
                    c = c.test(K);
                  } else
                    for (h = 0, n = g.length; h < n; h++)
                      if ('\\' != g[h]) {
                        c = u;
                        c += g.substr(0, h + 1);
                        c = c.replace(/\|$/, '');
                        for (k = 0; k < J; k++)
                          c += ')';
                        c = RegExp('^(' + c + ')$');
                        if (c = c.test(K))
                          break;
                      }
                  u += g;
                }
                if (c)
                  break;
              }
              b && (u += ')', J--);
              return c;
            }
            null == g.regexTokens && n();
            c = b.buffer.slice();
            var u = '';
            b = !1;
            var J = 0;
            c.splice(d, 0, a);
            var K = c.join('');
            for (a = 0; a < g.regexTokens.length && !(h = g.regexTokens[a], b = z(h, h.isGroup)); a++);
            return b;
          },
          cardinality: 1
        }
      }
    }
  });
}(jQuery));
(function (e) {
  e.extend(e.inputmask.defaults.aliases, {
    phone: {
      url: 'phone-codes/phone-codes.json',
      mask: function (a) {
        a.definitions = {
          p: {
            validator: function () {
              return !1;
            },
            cardinality: 1
          },
          '#': {
            validator: '[0-9]',
            cardinality: 1
          }
        };
        var b = [];
        e.ajax({
          url: a.url,
          async: !1,
          dataType: 'json',
          success: function (a) {
            b = a;
          }
        });
        b.splice(0, 0, '+p(ppp)ppp-pppp');
        return b;
      },
      nojumps: !0,
      nojumpsThreshold: 1
    },
    phonebe: {
      url: 'phone-codes/phone-be.json',
      mask: function (a) {
        a.definitions = {
          p: {
            validator: function () {
              return !1;
            },
            cardinality: 1
          },
          '#': {
            validator: '[0-9]',
            cardinality: 1
          }
        };
        var b = [];
        e.ajax({
          url: a.url,
          async: !1,
          dataType: 'json',
          success: function (a) {
            b = a;
          }
        });
        b.splice(0, 0, '+32(ppp)ppp-pppp');
        return b;
      },
      nojumps: !0,
      nojumpsThreshold: 4
    }
  });
}(jQuery));
/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 * @version 1.1.0
 *
 * http://wenzhixin.net.cn/p/multiple-select/
 */
(function ($) {
  'use strict';
  function MultipleSelect($el, options) {
    var that = this, name = $el.attr('name') || options.name || '';
    $el.parent().hide();
    var elWidth = $el.css('width');
    $el.parent().show();
    if (elWidth == '0px') {
      elWidth = $el.outerWidth() + 20;
    }
    this.$el = $el.hide();
    this.options = options;
    this.$parent = $('<div' + $.map([
      'class',
      'title'
    ], function (att) {
      var attValue = that.$el.attr(att) || '';
      attValue = (att === 'class' ? 'ms-parent' + (attValue ? ' ' : '') : '') + attValue;
      return attValue ? ' ' + att + '="' + attValue + '"' : '';
    }).join('') + ' />');
    this.$choice = $('<button type="button" class="ms-choice"><span class="placeholder">' + options.placeholder + '</span><div></div></button>');
    this.$drop = $('<div class="ms-drop ' + options.position + '"></div>');
    this.$el.after(this.$parent);
    this.$parent.append(this.$choice);
    this.$parent.append(this.$drop);
    if (this.$el.prop('disabled')) {
      this.$choice.addClass('disabled');
    }
    this.$parent.css('width', options.width || elWidth);
    if (!this.options.keepOpen) {
      $('body').click(function (e) {
        if ($(e.target)[0] === that.$choice[0] || $(e.target).parents('.ms-choice')[0] === that.$choice[0]) {
          return;
        }
        if (($(e.target)[0] === that.$drop[0] || $(e.target).parents('.ms-drop')[0] !== that.$drop[0]) && that.options.isOpen) {
          that.close();
        }
      });
    }
    this.selectAllName = 'name="selectAll' + name + '"';
    this.selectGroupName = 'name="selectGroup' + name + '"';
    this.selectItemName = 'name="selectItem' + name + '"';
  }
  MultipleSelect.prototype = {
    constructor: MultipleSelect,
    init: function () {
      var that = this, html = [];
      if (this.options.filter) {
        html.push('<div class="ms-search">', '<input type="text" autocomplete="off" autocorrect="off" autocapitilize="off" spellcheck="false">', '</div>');
      }
      html.push('<ul>');
      if (this.options.selectAll && !this.options.single) {
        html.push('<li class="ms-select-all">', '<label>', '<input type="checkbox" ' + this.selectAllName + ' /> ', this.options.selectAllDelimiter[0] + this.options.selectAllText + this.options.selectAllDelimiter[1], '</label>', '</li>');
      }
      $.each(this.$el.children(), function (i, elm) {
        html.push(that.optionToHtml(i, elm));
      });
      html.push('<li class="ms-no-results">' + this.options.noMatchesFound + '</li>');
      html.push('</ul>');
      this.$drop.html(html.join(''));
      this.$drop.find('ul').css('max-height', this.options.maxHeight + 'px');
      this.$drop.find('.multiple').css('width', this.options.multipleWidth + 'px');
      this.$searchInput = this.$drop.find('.ms-search input');
      this.$selectAll = this.$drop.find('input[' + this.selectAllName + ']');
      this.$selectGroups = this.$drop.find('input[' + this.selectGroupName + ']');
      this.$selectItems = this.$drop.find('input[' + this.selectItemName + ']:enabled');
      this.$disableItems = this.$drop.find('input[' + this.selectItemName + ']:disabled');
      this.$noResults = this.$drop.find('.ms-no-results');
      this.events();
      this.updateSelectAll(true);
      this.update(true);
      if (this.options.isOpen) {
        this.open();
      }
    },
    optionToHtml: function (i, elm, group, groupDisabled) {
      var that = this, $elm = $(elm), html = [], multiple = this.options.multiple, optAttributesToCopy = [
          'class',
          'title'
        ], clss = $.map(optAttributesToCopy, function (att, i) {
          var isMultiple = att === 'class' && multiple;
          var attValue = $elm.attr(att) || '';
          return isMultiple || attValue ? ' ' + att + '="' + (isMultiple ? 'multiple' + (attValue ? ' ' : '') : '') + attValue + '"' : '';
        }).join(''), disabled, type = this.options.single ? 'radio' : 'checkbox';
      if ($elm.is('option')) {
        var value = $elm.val(), text = that.options.textTemplate($elm), selected = that.$el.attr('multiple') != undefined ? $elm.prop('selected') : $elm.attr('selected') == 'selected', style = this.options.styler(value) ? ' style="' + this.options.styler(value) + '"' : '';
        disabled = groupDisabled || $elm.prop('disabled');
        if (this.options.blockSeparator > '' && this.options.blockSeparator == $elm.val()) {
          html.push('<li' + clss + style + '>', '<label class="' + this.options.blockSeparator + (disabled ? 'disabled' : '') + '">', text, '</label>', '</li>');
        } else {
          html.push('<li' + clss + style + '>', '<label' + (disabled ? ' class="disabled"' : '') + '>', '<input type="' + type + '" ' + this.selectItemName + ' value="' + value + '"' + (selected ? ' checked="checked"' : '') + (disabled ? ' disabled="disabled"' : '') + (group ? ' data-group="' + group + '"' : '') + '/> ', text, '</label>', '</li>');
        }
      } else if (!group && $elm.is('optgroup')) {
        var _group = 'group_' + i, label = $elm.attr('label');
        disabled = $elm.prop('disabled');
        html.push('<li class="group">', '<label class="optgroup' + (disabled ? ' disabled' : '') + '" data-group="' + _group + '">', this.options.hideOptgroupCheckboxes ? '' : '<input type="checkbox" ' + this.selectGroupName + (disabled ? ' disabled="disabled"' : '') + ' /> ', label, '</label>', '</li>');
        $.each($elm.children(), function (i, elm) {
          html.push(that.optionToHtml(i, elm, _group, disabled));
        });
      }
      return html.join('');
    },
    events: function () {
      var that = this;
      function toggleOpen(e) {
        e.preventDefault();
        that[that.options.isOpen ? 'close' : 'open']();
      }
      var label = this.$el.parent().closest('label')[0] || $('label[for=' + this.$el.attr('id') + ']')[0];
      if (label) {
        $(label).off('click').on('click', function (e) {
          if (e.target.nodeName.toLowerCase() !== 'label' || e.target !== this) {
            return;
          }
          toggleOpen(e);
          if (!that.options.filter || !that.options.isOpen) {
            that.focus();
          }
          e.stopPropagation();  // Causes lost focus otherwise
        });
      }
      this.$choice.off('click').on('click', toggleOpen).off('focus').on('focus', this.options.onFocus).off('blur').on('blur', this.options.onBlur);
      this.$parent.off('keydown').on('keydown', function (e) {
        switch (e.which) {
        case 27:
          // esc key
          that.close();
          that.$choice.focus();
          break;
        }
      });
      this.$searchInput.off('keydown').on('keydown', function (e) {
        if (e.keyCode === 9 && e.shiftKey) {
          // Ensure shift-tab causes lost focus from filter as with clicking away
          that.close();
        }
      }).off('keyup').on('keyup', function (e) {
        if (that.options.filterAcceptOnEnter && (e.which === 13 || e.which == 32) && that.$searchInput.val()) {
          that.$selectAll.click();
          that.close();
          that.focus();
          return;
        }
        that.filter();
      });
      this.$selectAll.off('click').on('click', function () {
        var checked = $(this).prop('checked'), $items = that.$selectItems.filter(':visible');
        if ($items.length === that.$selectItems.length) {
          that[checked ? 'checkAll' : 'uncheckAll']();
        } else {
          // when the filter option is true
          that.$selectGroups.prop('checked', checked);
          $items.prop('checked', checked);
          that.options[checked ? 'onCheckAll' : 'onUncheckAll']();
          that.update();
        }
      });
      this.$selectGroups.off('click').on('click', function () {
        var group = $(this).parent().attr('data-group'), $items = that.$selectItems.filter(':visible'), $children = $items.filter('[data-group="' + group + '"]'), checked = $children.length !== $children.filter(':checked').length;
        $children.prop('checked', checked);
        that.updateSelectAll();
        that.update();
        that.options.onOptgroupClick({
          label: $(this).parent().text(),
          checked: checked,
          children: $children.get()
        });
      });
      this.$selectItems.off('click').on('click', function () {
        that.updateSelectAll();
        that.update();
        that.updateOptGroupSelect();
        that.options.onClick({
          label: $(this).parent().text(),
          value: $(this).val(),
          checked: $(this).prop('checked')
        });
        if (that.options.single && that.options.isOpen && !that.options.keepOpen) {
          that.close();
        }
      });
    },
    open: function () {
      if (this.$choice.hasClass('disabled')) {
        return;
      }
      this.options.isOpen = true;
      this.$choice.find('>div').addClass('open');
      this.$drop.show();
      // fix filter bug: no results show
      this.$selectAll.parent().show();
      this.$noResults.hide();
      // Fix #77: 'All selected' when no options
      if (this.$el.children().length === 0) {
        this.$selectAll.parent().hide();
        this.$noResults.show();
      }
      if (this.options.container) {
        var offset = this.$drop.offset();
        this.$drop.appendTo($(this.options.container));
        this.$drop.offset({
          top: offset.top,
          left: offset.left
        });
      }
      if (this.options.filter) {
        this.$searchInput.val('');
        this.$searchInput.focus();
        this.filter();
      }
      this.options.onOpen();
    },
    close: function () {
      this.options.isOpen = false;
      this.$choice.find('>div').removeClass('open');
      this.$drop.hide();
      if (this.options.container) {
        this.$parent.append(this.$drop);
        this.$drop.css({
          'top': 'auto',
          'left': 'auto'
        });
      }
      this.options.onClose();
    },
    update: function (isInit) {
      var selects = this.getSelects(), $span = this.$choice.find('>span');
      if (selects.length === 0) {
        $span.addClass('placeholder').html(this.options.placeholder);
      } else if (this.options.countSelected && selects.length < this.options.minimumCountSelected) {
        $span.removeClass('placeholder').html((this.options.displayValues ? selects : this.getSelects('text')).join(this.options.delimiter));
      } else if (this.options.allSelected && selects.length === this.$selectItems.length + this.$disableItems.length) {
        $span.removeClass('placeholder').html(this.options.allSelected);
      } else if ((this.options.countSelected || this.options.etcaetera) && selects.length > this.options.minimumCountSelected) {
        if (this.options.etcaetera) {
          $span.removeClass('placeholder').html((this.options.displayValues ? selects : this.getSelects('text').slice(0, this.options.minimumCountSelected)).join(this.options.delimiter) + '...');
        } else {
          $span.html(this.options.placeholder + this.options.countSelected.replace('#', selects.length).replace('%', this.$selectItems.length + this.$disableItems.length));
        }
      } else {
        $span.removeClass('placeholder').html((this.options.displayValues ? selects : this.getSelects('text')).join(this.options.delimiter));
      }
      // set selects to select
      this.$el.val(this.getSelects());
      // add selected class to selected li
      this.$drop.find('li').removeClass('selected');
      this.$drop.find('input[' + this.selectItemName + ']:checked').each(function () {
        $(this).parents('li').first().addClass('selected');
      });
      // trigger <select> change event
      if (!isInit) {
        this.$el.trigger('change');
      }
    },
    updateSelectAll: function (Init) {
      var $items = this.$selectItems;
      if (!Init) {
        $items = $items.filter(':visible');
      }
      this.$selectAll.prop('checked', $items.length && $items.length === $items.filter(':checked').length);
      if (this.$selectAll.prop('checked')) {
        this.options.onCheckAll();
      }
    },
    updateOptGroupSelect: function () {
      var $items = this.$selectItems.filter(':visible');
      $.each(this.$selectGroups, function (i, val) {
        var group = $(val).parent().attr('data-group'), $children = $items.filter('[data-group="' + group + '"]');
        $(val).prop('checked', $children.length && $children.length === $children.filter(':checked').length);
      });
    },
    getSelects: function (type) {
      var that = this, texts = [], values = [];
      this.$drop.find('input[' + this.selectItemName + ']:checked').each(function () {
        texts.push($(this).parents('li').first().text());
        values.push($(this).val());
      });
      if (type === 'text' && this.$selectGroups.length) {
        texts = [];
        this.$selectGroups.each(function () {
          var html = [], text = $.trim($(this).parent().text()), group = $(this).parent().data('group'), $children = that.$drop.find('[' + that.selectItemName + '][data-group="' + group + '"]'), $selected = $children.filter(':checked');
          if ($selected.length === 0) {
            return;
          }
          html.push('[');
          html.push(text);
          if ($children.length > $selected.length) {
            var list = [];
            $selected.each(function () {
              list.push($(this).parent().text());
            });
            html.push(': ' + list.join(', '));
          }
          html.push(']');
          texts.push(html.join(''));
        });
      }
      return type === 'text' ? texts : values;
    },
    setSelects: function (values) {
      var that = this;
      this.$selectItems.prop('checked', false);
      $.each(values, function (i, value) {
        that.$selectItems.filter('[value="' + value + '"]').prop('checked', true);
      });
      this.$selectAll.prop('checked', this.$selectItems.length === this.$selectItems.filter(':checked').length);
      this.update();
    },
    enable: function () {
      this.$choice.removeClass('disabled');
    },
    disable: function () {
      this.$choice.addClass('disabled');
    },
    checkAll: function () {
      this.$selectItems.prop('checked', true);
      this.$selectGroups.prop('checked', true);
      this.$selectAll.prop('checked', true);
      this.update();
      this.options.onCheckAll();
    },
    uncheckAll: function () {
      this.$selectItems.prop('checked', false);
      this.$selectGroups.prop('checked', false);
      this.$selectAll.prop('checked', false);
      this.update();
      this.options.onUncheckAll();
    },
    focus: function () {
      this.$choice.focus();
      this.options.onFocus();
    },
    blur: function () {
      this.$choice.blur();
      this.options.onBlur();
    },
    refresh: function () {
      this.init();
    },
    filter: function () {
      var that = this, text = $.trim(this.$searchInput.val()).toLowerCase();
      if (text.length === 0) {
        this.$selectItems.parent().show();
        this.$disableItems.parent().show();
        this.$selectGroups.parent().show();
      } else {
        this.$selectItems.each(function () {
          var $parent = $(this).parent();
          $parent[$parent.text().toLowerCase().indexOf(text) < 0 ? 'hide' : 'show']();
        });
        this.$disableItems.parent().hide();
        this.$selectGroups.each(function () {
          var $parent = $(this).parent();
          var group = $parent.attr('data-group'), $items = that.$selectItems.filter(':visible');
          $parent[$items.filter('[data-group="' + group + '"]').length === 0 ? 'hide' : 'show']();
        });
        //Check if no matches found
        if (this.$selectItems.filter(':visible').length) {
          this.$selectAll.parent().show();
          this.$noResults.hide();
        } else {
          this.$selectAll.parent().hide();
          this.$noResults.show();
        }
      }
      this.updateOptGroupSelect();
      this.updateSelectAll();
    }
  };
  $.fn.multipleSelect = function () {
    var option = arguments[0], args = arguments, value, allowedMethods = [
        'getSelects',
        'setSelects',
        'enable',
        'disable',
        'checkAll',
        'uncheckAll',
        'focus',
        'blur',
        'refresh'
      ];
    this.each(function () {
      var $this = $(this), data = $this.data('multipleSelect'), options = $.extend({}, $.fn.multipleSelect.defaults, $this.data(), typeof option === 'object' && option);
      if (!data) {
        data = new MultipleSelect($this, options);
        $this.data('multipleSelect', data);
      }
      if (typeof option === 'string') {
        if ($.inArray(option, allowedMethods) < 0) {
          throw 'Unknown method: ' + option;
        }
        value = data[option](args[1]);
      } else {
        data.init();
        if (args[1]) {
          value = data[args[1]].apply(data, [].slice.call(args, 2));
        }
      }
    });
    return value ? value : this;
  };
  $.fn.multipleSelect.defaults = {
    name: '',
    isOpen: false,
    placeholder: '',
    selectAll: true,
    selectAllText: 'Select all',
    selectAllDelimiter: [
      '[',
      ']'
    ],
    allSelected: 'All selected',
    minimumCountSelected: 0,
    countSelected: '&nbsp;&nbsp;(#)',
    noMatchesFound: 'No matches found',
    multiple: false,
    multipleWidth: 80,
    single: false,
    filter: false,
    width: undefined,
    maxHeight: 250,
    container: null,
    position: 'bottom',
    keepOpen: false,
    blockSeparator: '',
    displayValues: false,
    delimiter: ', ',
    styler: function () {
      return false;
    },
    textTemplate: function ($elm) {
      return $elm.text();
    },
    onOpen: function () {
      return false;
    },
    onClose: function () {
      return false;
    },
    onCheckAll: function () {
      return false;
    },
    onUncheckAll: function () {
      return false;
    },
    onFocus: function () {
      return false;
    },
    onBlur: function () {
      return false;
    },
    onOptgroupClick: function () {
      return false;
    },
    onClick: function () {
      return false;
    }
  };
}(jQuery));
/*
 _ _      _       _
 ___| (_) ___| | __  (_)___
 / __| | |/ __| |/ /  | / __|
 \__ \ | | (__|   < _ | \__ \
 |___/_|_|\___|_|\_(_)/ |___/
 |__/

 Version: 1.5.0
 Author: Ken Wheeler
 Website: http://kenwheeler.github.io
 Docs: http://kenwheeler.github.io/slick
 Repo: http://github.com/kenwheeler/slick
 Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function (factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function ($) {
  'use strict';
  var Slick = window.Slick || {};
  Slick = function () {
    var instanceUid = 0;
    function Slick(element, settings) {
      var _ = this, dataSettings, responsiveSettings, breakpoint;
      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button type="button" data-role="none" class="carousel-control left" aria-label="previous"></button>',
        nextArrow: '<button type="button" data-role="none" class="carousel-control right" aria-label="next"></button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function (slider, i) {
          return '<button type="button" data-role="none">' + (i + 1) + '</button>';
        },
        dots: true,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        $list: null,
        touchObject: {},
        transformsEnabled: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.hidden = 'hidden';
      _.paused = false;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, dataSettings, settings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;
      responsiveSettings = _.options.responsive || null;
      if (responsiveSettings && responsiveSettings.length > -1) {
        _.respondTo = _.options.respondTo || 'window';
        for (breakpoint in responsiveSettings) {
          if (responsiveSettings.hasOwnProperty(breakpoint)) {
            _.breakpoints.push(responsiveSettings[breakpoint].breakpoint);
            _.breakpointSettings[responsiveSettings[breakpoint].breakpoint] = responsiveSettings[breakpoint].settings;
          }
        }
        _.breakpoints.sort(function (a, b) {
          if (_.options.mobileFirst === true) {
            return a - b;
          } else {
            return b - a;
          }
        });
      }
      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.msHidden !== 'undefined') {
        _.hidden = 'msHidden';
        _.visibilityChange = 'msvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }
      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.instanceUid = instanceUid++;
      // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source
      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
      _.init();
      _.checkResponsive(true);
    }
    return Slick;
  }();
  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;
    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }
    _.unload();
    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.animateHeight = function () {
    var _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.animate({ height: targetHeight }, _.options.speed);
    }
  };
  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {}, _ = this;
    _.animateHeight();
    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }
    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({ left: targetLeft }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({ top: targetLeft }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }
        $({ animStart: _.currentLeft }).animate({ animStart: targetLeft }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function (now) {
            now = Math.ceil(now);
            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';
              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';
              _.$slideTrack.css(animProps);
            }
          },
          complete: function () {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();
        targetLeft = Math.ceil(targetLeft);
        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }
        _.$slideTrack.css(animProps);
        if (callback) {
          setTimeout(function () {
            _.disableTransition();
            callback.call();
          }, _.options.speed);
        }
      }
    }
  };
  Slick.prototype.asNavFor = function (index) {
    var _ = this, asNavFor = _.options.asNavFor !== null ? $(_.options.asNavFor).slick('getSlick') : null;
    if (asNavFor !== null)
      asNavFor.slideHandler(index, true);
  };
  Slick.prototype.applyTransition = function (slide) {
    var _ = this, transition = {};
    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.autoPlay = function () {
    var _ = this;
    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
    if (_.slideCount > _.options.slidesToShow && _.paused !== true) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };
  Slick.prototype.autoPlayClear = function () {
    var _ = this;
    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };
  Slick.prototype.autoPlayIterator = function () {
    var _ = this;
    if (_.options.infinite === false) {
      if (_.direction === 1) {
        if (_.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        }
        _.slideHandler(_.currentSlide + _.options.slidesToScroll);
      } else {
        if (_.currentSlide - 1 === 0) {
          _.direction = 1;
        }
        _.slideHandler(_.currentSlide - _.options.slidesToScroll);
      }
    } else {
      _.slideHandler(_.currentSlide + _.options.slidesToScroll);
    }
  };
  Slick.prototype.buildArrows = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow = $(_.options.prevArrow);
      _.$nextArrow = $(_.options.nextArrow);
      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.appendTo(_.options.appendArrows);
      }
      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.appendTo(_.options.appendArrows);
      }
      if (_.options.infinite !== true) {
        _.$prevArrow.addClass('slick-disabled');
      }
    }
  };
  Slick.prototype.buildDots = function () {
    var _ = this, i, dotString;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      dotString = '<ul class="' + _.options.dotsClass + '">';
      for (i = 0; i <= _.getDotCount(); i += 1) {
        dotString += '<li>' + _.options.customPaging.call(this, _, i) + '</li>';
      }
      dotString += '</ul>';
      _.$dots = $(dotString).appendTo(_.options.appendDots);
      _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');
    }
  };
  Slick.prototype.buildOut = function () {
    var _ = this;
    _.$slides = _.$slider.children(':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;
    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });
    _.$slidesCache = _.$slides;
    _.$slider.addClass('slick-slider');
    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
    _.$slideTrack.css('opacity', 0);
    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }
    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
    _.setupInfinite();
    _.buildArrows();
    _.buildDots();
    _.updateDots();
    if (_.options.accessibility === true) {
      _.$list.prop('tabIndex', 0);
    }
    _.setSlideClasses(typeof this.currentSlide === 'number' ? this.currentSlide : 0);
    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };
  Slick.prototype.buildRows = function () {
    var _ = this, a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;
    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();
    if (_.options.rows > 1) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');
        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');
          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }
          slide.appendChild(row);
        }
        newSlides.appendChild(slide);
      }
      ;
      _.$slider.html(newSlides);
      _.$slider.children().children().children().width(100 / _.options.slidesPerRow + '%').css({ 'display': 'inline-block' });
    }
    ;
  };
  Slick.prototype.checkResponsive = function (initial) {
    var _ = this, breakpoint, targetBreakpoint, respondToWidth;
    var sliderWidth = _.$slider.width();
    var windowWidth = window.innerWidth || $(window).width();
    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }
    if (_.originalSettings.responsive && _.originalSettings.responsive.length > -1 && _.originalSettings.responsive !== null) {
      targetBreakpoint = null;
      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }
      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint) {
            _.activeBreakpoint = targetBreakpoint;
            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick();
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
              if (initial === true)
                _.currentSlide = _.options.initialSlide;
              _.refresh();
            }
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;
          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick();
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
            if (initial === true)
              _.currentSlide = _.options.initialSlide;
            _.refresh();
          }
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;
          if (initial === true)
            _.currentSlide = _.options.initialSlide;
          _.refresh();
        }
      }
    }
  };
  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this, $target = $(event.target), indexOffset, slideOffset, unevenOffset;
    // If target is a link, prevent default action.
    $target.is('a') && event.preventDefault();
    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
    switch (event.data.message) {
    case 'previous':
      slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
      if (_.slideCount > _.options.slidesToShow) {
        _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
      }
      break;
    case 'next':
      slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
      if (_.slideCount > _.options.slidesToShow) {
        _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
      }
      break;
    case 'index':
      var index = event.data.index === 0 ? 0 : event.data.index || $(event.target).parent().index() * _.options.slidesToScroll;
      _.slideHandler(_.checkNavigable(index), false, dontAnimate);
      break;
    default:
      return;
    }
  };
  Slick.prototype.checkNavigable = function (index) {
    var _ = this, navigables, prevNavigable;
    navigables = _.getNavigableIndexes();
    prevNavigable = 0;
    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }
        prevNavigable = navigables[n];
      }
    }
    return index;
  };
  Slick.prototype.cleanUpEvents = function () {
    var _ = this;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).off('click.slick', _.changeSlide);
    }
    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
      $('li', _.$dots).off('mouseenter.slick', _.setPaused.bind(_, true)).off('mouseleave.slick', _.setPaused.bind(_, false));
    }
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
    }
    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
    _.$list.off('click.slick', _.clickHandler);
    if (_.options.autoplay === true) {
      $(document).off(_.visibilityChange, _.visibility);
    }
    _.$list.off('mouseenter.slick', _.setPaused.bind(_, true));
    _.$list.off('mouseleave.slick', _.setPaused.bind(_, false));
    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }
    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);
  };
  Slick.prototype.cleanUpRows = function () {
    var _ = this, originalSlides;
    if (_.options.rows > 1) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');
      _.$slider.html(originalSlides);
    }
  };
  Slick.prototype.clickHandler = function (event) {
    var _ = this;
    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };
  Slick.prototype.destroy = function () {
    var _ = this;
    _.autoPlayClear();
    _.touchObject = {};
    _.cleanUpEvents();
    $('.slick-cloned', _.$slider).remove();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && typeof _.options.prevArrow !== 'object') {
      _.$prevArrow.remove();
    }
    if (_.$nextArrow && typeof _.options.nextArrow !== 'object') {
      _.$nextArrow.remove();
    }
    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible').attr('aria-hidden', 'true').removeAttr('data-slick-index').css({
        position: '',
        left: '',
        top: '',
        zIndex: '',
        opacity: '',
        width: ''
      });
      _.$slider.html(_.$slides);
    }
    _.cleanUpRows();
    _.$slider.removeClass('slick-slider');
    _.$slider.removeClass('slick-initialized');
  };
  Slick.prototype.disableTransition = function (slide) {
    var _ = this, transition = {};
    transition[_.transitionType] = '';
    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };
  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;
    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({ zIndex: 1000 });
      _.$slides.eq(slideIndex).animate({ opacity: 1 }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);
      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: 1000
      });
      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);
          callback.call();
        }, _.options.speed);
      }
    }
  };
  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;
    if (filter !== null) {
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;
    return _.currentSlide;
  };
  Slick.prototype.getDotCount = function () {
    var _ = this;
    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;
    if (_.options.infinite === true) {
      pagerQty = Math.ceil(_.slideCount / _.options.slidesToScroll);
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToShow;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }
    return pagerQty - 1;
  };
  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this, targetLeft, verticalHeight, verticalOffset = 0, targetSlide;
    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight();
    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        verticalOffset = verticalHeight * _.options.slidesToShow * -1;
      }
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }
    if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }
    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }
    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }
      targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      if (_.options.centerMode === true) {
        if (_.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }
    return targetLeft;
  };
  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;
    return _.options[option];
  };
  Slick.prototype.getNavigableIndexes = function () {
    var _ = this, breakPoint = 0, counter = 0, indexes = [], max;
    if (_.options.infinite === false) {
      max = _.slideCount - _.options.slidesToShow + 1;
      if (_.options.centerMode === true)
        max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }
    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }
    return indexes;
  };
  Slick.prototype.getSlick = function () {
    return this;
  };
  Slick.prototype.getSlideCount = function () {
    var _ = this, slidesTraversed, swipedSlide, centerOffset;
    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      });
      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };
  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;
    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };
  Slick.prototype.init = function () {
    var _ = this;
    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');
      _.buildRows();
      _.buildOut();
      _.setProps();
      _.startLoad();
      _.loadSlider();
      _.initializeEvents();
      _.updateArrows();
      _.updateDots();
    }
    _.$slider.trigger('init', [_]);
  };
  Slick.prototype.initArrowEvents = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.on('click.slick', { message: 'previous' }, _.changeSlide);
      _.$nextArrow.on('click.slick', { message: 'next' }, _.changeSlide);
    }
  };
  Slick.prototype.initDotEvents = function () {
    var _ = this;
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', { message: 'index' }, _.changeSlide);
    }
    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.options.autoplay === true) {
      $('li', _.$dots).on('mouseenter.slick', _.setPaused.bind(_, true)).on('mouseleave.slick', _.setPaused.bind(_, false));
    }
  };
  Slick.prototype.initializeEvents = function () {
    var _ = this;
    _.initArrowEvents();
    _.initDotEvents();
    _.$list.on('touchstart.slick mousedown.slick', { action: 'start' }, _.swipeHandler);
    _.$list.on('touchmove.slick mousemove.slick', { action: 'move' }, _.swipeHandler);
    _.$list.on('touchend.slick mouseup.slick', { action: 'end' }, _.swipeHandler);
    _.$list.on('touchcancel.slick mouseleave.slick', { action: 'end' }, _.swipeHandler);
    _.$list.on('click.slick', _.clickHandler);
    if (_.options.autoplay === true) {
      $(document).on(_.visibilityChange, _.visibility.bind(_));
    }
    _.$list.on('mouseenter.slick', _.setPaused.bind(_, true));
    _.$list.on('mouseleave.slick', _.setPaused.bind(_, false));
    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }
    $(window).on('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange.bind(_));
    $(window).on('resize.slick.slick-' + _.instanceUid, _.resize.bind(_));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);
  };
  Slick.prototype.initUI = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();
      _.$nextArrow.show();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
    if (_.options.autoplay === true) {
      _.autoPlay();
    }
  };
  Slick.prototype.keyHandler = function (event) {
    var _ = this;
    if (event.keyCode === 37 && _.options.accessibility === true) {
      _.changeSlide({ data: { message: 'previous' } });
    } else if (event.keyCode === 39 && _.options.accessibility === true) {
      _.changeSlide({ data: { message: 'next' } });
    }
  };
  Slick.prototype.lazyLoad = function () {
    var _ = this, loadRange, cloneRange, rangeStart, rangeEnd;
    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this), imageSource = $(this).attr('data-lazy'), imageToLoad = document.createElement('img');
        imageToLoad.onload = function () {
          image.animate({ opacity: 1 }, 200);
        };
        imageToLoad.src = imageSource;
        image.css({ opacity: 0 }).attr('src', imageSource).removeAttr('data-lazy').removeClass('slick-loading');
      });
    }
    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = rangeStart + _.options.slidesToShow;
      if (_.options.fade === true) {
        if (rangeStart > 0)
          rangeStart--;
        if (rangeEnd <= _.slideCount)
          rangeEnd++;
      }
    }
    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
    loadImages(loadRange);
    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };
  Slick.prototype.loadSlider = function () {
    var _ = this;
    _.setPosition();
    _.$slideTrack.css({ opacity: 1 });
    _.$slider.removeClass('slick-loading');
    _.initUI();
    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };
  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;
    _.changeSlide({ data: { message: 'next' } });
  };
  Slick.prototype.orientationChange = function () {
    var _ = this;
    _.checkResponsive();
    _.setPosition();
  };
  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;
    _.autoPlayClear();
    _.paused = true;
  };
  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;
    _.paused = false;
    _.autoPlay();
  };
  Slick.prototype.postSlide = function (index) {
    var _ = this;
    _.$slider.trigger('afterChange', [
      _,
      index
    ]);
    _.animating = false;
    _.setPosition();
    _.swipeLeft = null;
    if (_.options.autoplay === true && _.paused === false) {
      _.autoPlay();
    }
  };
  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;
    _.changeSlide({ data: { message: 'previous' } });
  };
  Slick.prototype.preventDefault = function (e) {
    e.preventDefault();
  };
  Slick.prototype.progressiveLazyLoad = function () {
    var _ = this, imgCount, targetImage;
    imgCount = $('img[data-lazy]', _.$slider).length;
    if (imgCount > 0) {
      targetImage = $('img[data-lazy]', _.$slider).first();
      targetImage.attr('src', targetImage.attr('data-lazy')).removeClass('slick-loading').load(function () {
        targetImage.removeAttr('data-lazy');
        _.progressiveLazyLoad();
        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }
      }).error(function () {
        targetImage.removeAttr('data-lazy');
        _.progressiveLazyLoad();
      });
    }
  };
  Slick.prototype.refresh = function () {
    var _ = this, currentSlide = _.currentSlide;
    _.destroy();
    $.extend(_, _.initials);
    _.init();
    _.changeSlide({
      data: {
        message: 'index',
        index: currentSlide
      }
    }, false);
  };
  Slick.prototype.reinit = function () {
    var _ = this;
    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;
    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }
    _.setProps();
    _.setupInfinite();
    _.buildArrows();
    _.updateArrows();
    _.initArrowEvents();
    _.buildDots();
    _.updateDots();
    _.initDotEvents();
    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }
    _.setSlideClasses(0);
    _.setPosition();
    _.$slider.trigger('reInit', [_]);
  };
  Slick.prototype.resize = function () {
    var _ = this;
    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();
        _.checkResponsive();
        _.setPosition();
      }, 50);
    }
  };
  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;
    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }
    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }
    _.unload();
    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }
    _.$slides = _.$slideTrack.children(this.options.slide);
    _.$slideTrack.children(this.options.slide).detach();
    _.$slideTrack.append(_.$slides);
    _.$slidesCache = _.$slides;
    _.reinit();
  };
  Slick.prototype.setCSS = function (position) {
    var _ = this, positionProps = {}, x, y;
    if (_.options.rtl === true) {
      position = -position;
    }
    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;
    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};
      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
        _.$slideTrack.css(positionProps);
      }
    }
  };
  Slick.prototype.setDimensions = function () {
    var _ = this;
    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({ padding: '0px ' + _.options.centerPadding });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
      if (_.options.centerMode === true) {
        _.$list.css({ padding: _.options.centerPadding + ' 0px' });
      }
    }
    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();
    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);
      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }
    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
    if (_.options.variableWidth === false)
      _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };
  Slick.prototype.setFade = function () {
    var _ = this, targetLeft;
    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;
      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: 800,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: 800,
          opacity: 0
        });
      }
    });
    _.$slides.eq(_.currentSlide).css({
      zIndex: 900,
      opacity: 1
    });
  };
  Slick.prototype.setHeight = function () {
    var _ = this;
    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
      _.$list.css('height', targetHeight);
    }
  };
  Slick.prototype.setOption = Slick.prototype.slickSetOption = function (option, value, refresh) {
    var _ = this;
    _.options[option] = value;
    if (refresh === true) {
      _.unload();
      _.reinit();
    }
  };
  Slick.prototype.setPosition = function () {
    var _ = this;
    _.setDimensions();
    _.setHeight();
    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }
    _.$slider.trigger('setPosition', [_]);
  };
  Slick.prototype.setProps = function () {
    var _ = this, bodyStyle = document.body.style;
    _.positionProp = _.options.vertical === true ? 'top' : 'left';
    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }
    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }
    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined)
        _.animType = false;
    }
    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined)
        _.animType = false;
    }
    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined)
        _.animType = false;
    }
    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined)
        _.animType = false;
    }
    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }
    _.transformsEnabled = _.animType !== null && _.animType !== false;
  };
  Slick.prototype.setSlideClasses = function (index) {
    var _ = this, centerOffset, allSlides, indexOffset, remainder;
    _.$slider.find('.slick-slide').removeClass('slick-active').attr('aria-hidden', 'true').removeClass('slick-center');
    allSlides = _.$slider.find('.slick-slide');
    if (_.options.centerMode === true) {
      centerOffset = Math.floor(_.options.slidesToShow / 2);
      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }
        if (index === 0) {
          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }
      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }
    if (_.options.lazyLoad === 'ondemand') {
      _.lazyLoad();
    }
  };
  Slick.prototype.setupInfinite = function () {
    var _ = this, i, slideIndex, infiniteCount;
    if (_.options.fade === true) {
      _.options.centerMode = false;
    }
    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;
      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }
        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }
        for (i = 0; i < infiniteCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }
        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };
  Slick.prototype.setPaused = function (paused) {
    var _ = this;
    if (_.options.autoplay === true && _.options.pauseOnHover === true) {
      _.paused = paused;
      _.autoPlayClear();
    }
  };
  Slick.prototype.selectHandler = function (event) {
    var _ = this;
    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index)
      index = 0;
    if (_.slideCount <= _.options.slidesToShow) {
      _.$slider.find('.slick-slide').removeClass('slick-active').attr('aria-hidden', 'true');
      _.$slides.eq(index).addClass('slick-active').attr('aria-hidden', 'false');
      if (_.options.centerMode === true) {
        _.$slider.find('.slick-slide').removeClass('slick-center');
        _.$slides.eq(index).addClass('slick-center');
      }
      _.asNavFor(index);
      return;
    }
    _.slideHandler(index);
  };
  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null, _ = this;
    sync = sync || false;
    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }
    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }
    if (_.slideCount <= _.options.slidesToShow) {
      return;
    }
    if (sync === false) {
      _.asNavFor(index);
    }
    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;
        if (dontAnimate !== true) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }
      return;
    }
    if (_.options.autoplay === true) {
      clearInterval(_.autoPlayTimer);
    }
    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }
    _.animating = true;
    _.$slider.trigger('beforeChange', [
      _,
      _.currentSlide,
      animSlide
    ]);
    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;
    _.setSlideClasses(_.currentSlide);
    _.updateDots();
    _.updateArrows();
    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }
      _.animateHeight();
      return;
    }
    if (dontAnimate !== true) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };
  Slick.prototype.startLoad = function () {
    var _ = this;
    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();
      _.$nextArrow.hide();
    }
    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }
    _.$slider.addClass('slick-loading');
  };
  Slick.prototype.swipeDirection = function () {
    var xDist, yDist, r, swipeAngle, _ = this;
    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);
    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }
    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }
    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }
    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }
    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'left';
      } else {
        return 'right';
      }
    }
    return 'vertical';
  };
  Slick.prototype.swipeEnd = function (event) {
    var _ = this, slideCount;
    _.dragging = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;
    if (_.touchObject.curX === undefined) {
      return false;
    }
    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [
        _,
        _.swipeDirection()
      ]);
    }
    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      switch (_.swipeDirection()) {
      case 'left':
        slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
        _.slideHandler(slideCount);
        _.currentDirection = 0;
        _.touchObject = {};
        _.$slider.trigger('swipe', [
          _,
          'left'
        ]);
        break;
      case 'right':
        slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
        _.slideHandler(slideCount);
        _.currentDirection = 1;
        _.touchObject = {};
        _.$slider.trigger('swipe', [
          _,
          'right'
        ]);
        break;
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);
        _.touchObject = {};
      }
    }
  };
  Slick.prototype.swipeHandler = function (event) {
    var _ = this;
    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }
    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }
    switch (event.data.action) {
    case 'start':
      _.swipeStart(event);
      break;
    case 'move':
      _.swipeMove(event);
      break;
    case 'end':
      _.swipeEnd(event);
      break;
    }
  };
  Slick.prototype.swipeMove = function (event) {
    var _ = this, edgeWasHit = false, curLeft, swipeDirection, swipeLength, positionOffset, touches;
    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
    if (!_.dragging || touches && touches.length !== 1) {
      return false;
    }
    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
    }
    swipeDirection = _.swipeDirection();
    if (swipeDirection === 'vertical') {
      return;
    }
    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      event.preventDefault();
    }
    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }
    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;
    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }
    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }
    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }
    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }
    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }
    _.setCSS(_.swipeLeft);
  };
  Slick.prototype.swipeStart = function (event) {
    var _ = this, touches;
    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }
    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }
    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };
  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;
    if (_.$slidesCache !== null) {
      _.unload();
      _.$slideTrack.children(this.options.slide).detach();
      _.$slidesCache.appendTo(_.$slideTrack);
      _.reinit();
    }
  };
  Slick.prototype.unload = function () {
    var _ = this;
    $('.slick-cloned', _.$slider).remove();
    if (_.$dots) {
      _.$dots.remove();
    }
    if (_.$prevArrow && typeof _.options.prevArrow !== 'object') {
      _.$prevArrow.remove();
    }
    if (_.$nextArrow && typeof _.options.nextArrow !== 'object') {
      _.$nextArrow.remove();
    }
    _.$slides.removeClass('slick-slide slick-active slick-visible').attr('aria-hidden', 'true').css('width', '');
  };
  Slick.prototype.unslick = function () {
    var _ = this;
    _.destroy();
  };
  Slick.prototype.updateArrows = function () {
    var _ = this, centerOffset;
    centerOffset = Math.floor(_.options.slidesToShow / 2);
    if (_.options.arrows === true && _.options.infinite !== true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.removeClass('slick-disabled');
      _.$nextArrow.removeClass('slick-disabled');
      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled');
        _.$nextArrow.removeClass('slick-disabled');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled');
        _.$prevArrow.removeClass('slick-disabled');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled');
        _.$prevArrow.removeClass('slick-disabled');
      }
    }
  };
  Slick.prototype.updateDots = function () {
    var _ = this;
    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').attr('aria-hidden', 'true');
      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active').attr('aria-hidden', 'false');
    }
  };
  Slick.prototype.visibility = function () {
    var _ = this;
    if (document[_.hidden]) {
      _.paused = true;
      _.autoPlayClear();
    } else {
      _.paused = false;
      _.autoPlay();
    }
  };
  $.fn.slick = function () {
    var _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = _.length, i = 0, ret;
    for (i; i < l; i++) {
      if (typeof opt == 'object' || typeof opt == 'undefined')
        _[i].slick = new Slick(_[i], opt);
      else
        ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined')
        return ret;
    }
    return _;
  };
}));
/*
* bootstrap-table - v1.6.0 - 2015-03-03
* https://github.com/wenzhixin/bootstrap-table
* Copyright (c) 2015 zhixin wen
* Licensed MIT License
*/
!function (a) {
  'use strict';
  var b = function (a) {
      var b = arguments, c = !0, d = 1;
      return a = a.replace(/%s/g, function () {
        var a = b[d++];
        return 'undefined' == typeof a ? (c = !1, '') : a;
      }), c ? a : '';
    }, c = function (b, c, d, e) {
      var f = '';
      return a.each(b, function (a, b) {
        return b[c] === e ? (f = b[d], !1) : !0;
      }), f;
    }, d = function (b, c) {
      var d = -1;
      return a.each(b, function (a, b) {
        return b.field === c ? (d = a, !1) : !0;
      }), d;
    }, e = function () {
      var b, c, d = a('<p/>').addClass('fixed-table-scroll-inner'), e = a('<div/>').addClass('fixed-table-scroll-outer');
      return e.append(d), a('body').append(e), b = d[0].offsetWidth, e.css('overflow', 'scroll'), c = d[0].offsetWidth, b === c && (c = e[0].clientWidth), e.remove(), b - c;
    }, f = function (b, c, d, e) {
      if ('string' == typeof c) {
        var f = c.split('.');
        f.length > 1 ? (c = window, a.each(f, function (a, b) {
          c = c[b];
        })) : c = window[c];
      }
      return 'object' == typeof c ? c : 'function' == typeof c ? c.apply(b, d) : e;
    }, g = function (a) {
      return 'string' == typeof a ? a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') : a;
    }, h = function (b, c) {
      this.options = c, this.$el = a(b), this.$el_ = this.$el.clone(), this.timeoutId_ = 0, this.init();
    };
  h.DEFAULTS = {
    classes: 'table table-hover',
    height: void 0,
    undefinedText: '-',
    sortName: void 0,
    sortOrder: 'asc',
    striped: !1,
    columns: [],
    data: [],
    method: 'get',
    url: void 0,
    cache: !0,
    contentType: 'application/json',
    dataType: 'json',
    ajaxOptions: {},
    queryParams: function (a) {
      return a;
    },
    queryParamsType: 'limit',
    responseHandler: function (a) {
      return a;
    },
    pagination: !1,
    sidePagination: 'client',
    totalRows: 0,
    pageNumber: 1,
    pageSize: 10,
    pageList: [
      10,
      25,
      50,
      100
    ],
    search: !1,
    searchAlign: 'right',
    selectItemName: 'btSelectItem',
    showHeader: !0,
    showColumns: !1,
    showPaginationSwitch: !1,
    showRefresh: !1,
    showToggle: !1,
    buttonsAlign: 'right',
    smartDisplay: !0,
    minimumCountColumns: 1,
    idField: void 0,
    cardView: !1,
    trimOnSearch: !0,
    clickToSelect: !1,
    singleSelect: !1,
    toolbar: void 0,
    toolbarAlign: 'left',
    checkboxHeader: !0,
    sortable: !0,
    maintainSelected: !1,
    searchTimeOut: 500,
    iconSize: void 0,
    iconsPrefix: 'glyphicon',
    icons: {
      paginationSwitchDown: 'glyphicon-collapse-down icon-chevron-down',
      paginationSwitchUp: 'glyphicon-collapse-up icon-chevron-up',
      refresh: 'glyphicon-refresh icon-refresh',
      toggle: 'glyphicon-list-alt icon-list-alt',
      columns: 'glyphicon-th icon-th'
    },
    rowStyle: function () {
      return {};
    },
    rowAttributes: function () {
      return {};
    },
    onAll: function () {
      return !1;
    },
    onClickRow: function () {
      return !1;
    },
    onDblClickRow: function () {
      return !1;
    },
    onSort: function () {
      return !1;
    },
    onCheck: function () {
      return !1;
    },
    onUncheck: function () {
      return !1;
    },
    onCheckAll: function () {
      return !1;
    },
    onUncheckAll: function () {
      return !1;
    },
    onLoadSuccess: function () {
      return !1;
    },
    onLoadError: function () {
      return !1;
    },
    onColumnSwitch: function () {
      return !1;
    },
    onPageChange: function () {
      return !1;
    },
    onSearch: function () {
      return !1;
    },
    onPreBody: function () {
      return !1;
    },
    onPostBody: function () {
      return !1;
    },
    onPostHeader: function () {
      return !1;
    }
  }, h.LOCALES = [], h.LOCALES['en-US'] = {
    formatLoadingMessage: function () {
      return 'Loading, please wait...';
    },
    formatRecordsPerPage: function (a) {
      return b('%s records per page', a);
    },
    formatShowingRows: function (a, c, d) {
      return b('Showing %s to %s of %s rows', a, c, d);
    },
    formatSearch: function () {
      return 'Search';
    },
    formatNoMatches: function () {
      return 'No matching records found';
    },
    formatPaginationSwitch: function () {
      return 'Hide/Show pagination';
    },
    formatRefresh: function () {
      return 'Refresh';
    },
    formatToggle: function () {
      return 'Toggle';
    },
    formatColumns: function () {
      return 'Columns';
    }
  }, a.extend(h.DEFAULTS, h.LOCALES['en-US']), h.COLUMN_DEFAULTS = {
    radio: !1,
    checkbox: !1,
    checkboxEnabled: !0,
    field: void 0,
    title: void 0,
    'class': void 0,
    align: void 0,
    halign: void 0,
    valign: void 0,
    width: void 0,
    sortable: !1,
    order: 'asc',
    visible: !0,
    switchable: !0,
    clickToSelect: !0,
    formatter: void 0,
    events: void 0,
    sorter: void 0,
    cellStyle: void 0,
    searchable: !0
  }, h.EVENTS = {
    'all.bs.table': 'onAll',
    'click-row.bs.table': 'onClickRow',
    'dbl-click-row.bs.table': 'onDblClickRow',
    'sort.bs.table': 'onSort',
    'check.bs.table': 'onCheck',
    'uncheck.bs.table': 'onUncheck',
    'check-all.bs.table': 'onCheckAll',
    'uncheck-all.bs.table': 'onUncheckAll',
    'load-success.bs.table': 'onLoadSuccess',
    'load-error.bs.table': 'onLoadError',
    'column-switch.bs.table': 'onColumnSwitch',
    'page-change.bs.table': 'onPageChange',
    'search.bs.table': 'onSearch',
    'pre-body.bs.table': 'onPreBody',
    'post-body.bs.table': 'onPostBody',
    'post-header.bs.table': 'onPostHeader'
  }, h.prototype.init = function () {
    this.initContainer(), this.initTable(), this.initHeader(), this.initData(), this.initToolbar(), this.initPagination(), this.initBody(), this.initServer();
  }, h.prototype.initContainer = function () {
    this.$container = a([
      '<div class="bootstrap-table">',
      '<div class="fixed-table-toolbar"></div>',
      '<div class="fixed-table-container">',
      '<div class="fixed-table-header"><table></table></div>',
      '<div class="fixed-table-body">',
      '<div class="fixed-table-loading">',
      this.options.formatLoadingMessage(),
      '</div>',
      '</div>',
      '<div class="fixed-table-pagination"></div>',
      '</div>',
      '</div>'
    ].join('')), this.$container.insertAfter(this.$el), this.$container.find('.fixed-table-body').append(this.$el), this.$container.after('<div class="clearfix"></div>'), this.$loading = this.$container.find('.fixed-table-loading'), this.$el.addClass(this.options.classes), this.options.striped && this.$el.addClass('table-striped');
  }, h.prototype.initTable = function () {
    var b = this, c = [], d = [];
    this.$header = this.$el.find('thead'), this.$header.length || (this.$header = a('<thead></thead>').appendTo(this.$el)), this.$header.find('tr').length || this.$header.append('<tr></tr>'), this.$header.find('th').each(function () {
      var b = a.extend({}, {
          title: a(this).html(),
          'class': a(this).attr('class')
        }, a(this).data());
      c.push(b);
    }), this.options.columns = a.extend([], c, this.options.columns), a.each(this.options.columns, function (c, d) {
      b.options.columns[c] = a.extend({}, h.COLUMN_DEFAULTS, { field: c }, d);
    }), this.options.data.length || (this.$el.find('tbody tr').each(function () {
      var c = {};
      c._id = a(this).attr('id'), c._class = a(this).attr('class'), a(this).find('td').each(function (d) {
        var e = b.options.columns[d].field;
        c[e] = a(this).html(), c['_' + e + '_id'] = a(this).attr('id'), c['_' + e + '_class'] = a(this).attr('class'), c['_' + e + '_data'] = a(this).data();
      }), d.push(c);
    }), this.options.data = d);
  }, h.prototype.initHeader = function () {
    var c = this, d = [], e = [];
    this.header = {
      fields: [],
      styles: [],
      classes: [],
      formatters: [],
      events: [],
      sorters: [],
      cellStyles: [],
      clickToSelects: [],
      searchables: []
    }, a.each(this.options.columns, function (a, f) {
      {
        var g = '', h = '', i = '', j = '', k = b(' class="%s"', f['class']);
        c.options.sortOrder || f.order;
      }
      f.visible && (h = b('text-align: %s; ', f.halign ? f.halign : f.align), i = b('text-align: %s; ', f.align), j = b('vertical-align: %s; ', f.valign), j += b('width: %spx; ', f.checkbox || f.radio ? 36 : f.width), d.push(f), c.header.fields.push(f.field), c.header.styles.push(i + j), c.header.classes.push(k), c.header.formatters.push(f.formatter), c.header.events.push(f.events), c.header.sorters.push(f.sorter), c.header.cellStyles.push(f.cellStyle), c.header.clickToSelects.push(f.clickToSelect), c.header.searchables.push(f.searchable), e.push('<th', f.checkbox || f.radio ? b(' class="bs-checkbox %s"', f['class'] || '') : k, b(' style="%s"', h + j), '>'), e.push(b('<div class="th-inner %s">', c.options.sortable && f.sortable ? 'sortable' : '')), g = f.title, c.options.sortName === f.field && c.options.sortable && f.sortable && (g += c.getCaretHtml()), f.checkbox && (!c.options.singleSelect && c.options.checkboxHeader && (g = '<input name="btSelectAll" type="checkbox" />'), c.header.stateField = f.field), f.radio && (g = '', c.header.stateField = f.field, c.options.singleSelect = !0), e.push(g), e.push('</div>'), e.push('<div class="fht-cell"></div>'), e.push('</th>'));
    }), this.$header.find('tr').html(e.join('')), this.$header.find('th').each(function (b) {
      a(this).data(d[b]);
    }), this.$container.off('click', 'th').on('click', 'th', function (b) {
      c.options.sortable && a(this).data().sortable && c.onSort(b);
    }), !this.options.showHeader || this.options.cardView ? (this.$header.hide(), this.$container.find('.fixed-table-header').hide(), this.$loading.css('top', 0)) : (this.$header.show(), this.$container.find('.fixed-table-header').show(), this.$loading.css('top', '37px')), this.$selectAll = this.$header.find('[name="btSelectAll"]'), this.$container.off('click', '[name="btSelectAll"]').on('click', '[name="btSelectAll"]', function () {
      var b = a(this).prop('checked');
      c[b ? 'checkAll' : 'uncheckAll']();
    });
  }, h.prototype.initData = function (a, b) {
    this.data = 'append' === b ? this.data.concat(a) : 'prepend' === b ? [].concat(a).concat(this.data) : a || this.options.data, this.options.data = this.data, 'server' !== this.options.sidePagination && this.initSort();
  }, h.prototype.initSort = function () {
    var b = this, c = this.options.sortName, d = 'desc' === this.options.sortOrder ? -1 : 1, e = a.inArray(this.options.sortName, this.header.fields);
    -1 !== e && this.data.sort(function (g, h) {
      var i = g[c], j = h[c], k = f(b.header, b.header.sorters[e], [
          i,
          j
        ]);
      return void 0 !== k ? d * k : void 0 !== k ? d * k : ((void 0 === i || null === i) && (i = ''), (void 0 === j || null === j) && (j = ''), a.isNumeric(i) && a.isNumeric(j) ? (i = parseFloat(i), j = parseFloat(j), j > i ? -1 * d : d) : i === j ? 0 : ('string' != typeof i && (i = i.toString()), -1 === i.localeCompare(j) ? -1 * d : d));
    });
  }, h.prototype.onSort = function (b) {
    var c = a(b.currentTarget), d = this.$header.find('th').eq(c.index());
    return this.$header.add(this.$header_).find('span.order').remove(), this.options.sortName === c.data('field') ? this.options.sortOrder = 'asc' === this.options.sortOrder ? 'desc' : 'asc' : (this.options.sortName = c.data('field'), this.options.sortOrder = 'asc' === c.data('order') ? 'desc' : 'asc'), this.trigger('sort', this.options.sortName, this.options.sortOrder), c.add(d).data('order', this.options.sortOrder).find('.th-inner').append(this.getCaretHtml()), 'server' === this.options.sidePagination ? void this.initServer() : (this.initSort(), void this.initBody());
  }, h.prototype.initToolbar = function () {
    var c, d, e = this, g = [], h = 0, i = 0;
    this.$toolbar = this.$container.find('.fixed-table-toolbar').html(''), 'string' == typeof this.options.toolbar && a(b('<div class="bars pull-%s"></div>', this.options.toolbarAlign)).appendTo(this.$toolbar).append(a(this.options.toolbar)), g = [b('<div class="columns columns-%s btn-group pull-%s">', this.options.buttonsAlign, this.options.buttonsAlign)], 'string' == typeof this.options.icons && (this.options.icons = f(null, this.options.icons)), this.options.showPaginationSwitch && g.push(b('<button class="btn btn-default" type="button" name="paginationSwitch" title="%s">', this.options.formatPaginationSwitch()), b('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.paginationSwitchDown), '</button>'), this.options.showRefresh && g.push(b('<button class="btn btn-default' + (void 0 === this.options.iconSize ? '' : ' btn-' + this.options.iconSize) + '" type="button" name="refresh" title="%s">', this.options.formatRefresh()), b('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.refresh), '</button>'), this.options.showToggle && g.push(b('<button class="btn btn-default' + (void 0 === this.options.iconSize ? '' : ' btn-' + this.options.iconSize) + '" type="button" name="toggle" title="%s">', this.options.formatToggle()), b('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.toggle), '</button>'), this.options.showColumns && (g.push(b('<div class="keep-open btn-group" title="%s">', this.options.formatColumns()), '<button type="button" class="btn btn-default' + (void 0 == this.options.iconSize ? '' : ' btn-' + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">', b('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.columns), ' <span class="caret"></span>', '</button>', '<ul class="dropdown-menu" role="menu">'), a.each(this.options.columns, function (a, c) {
      if (!c.radio && !c.checkbox) {
        var d = c.visible ? ' checked="checked"' : '';
        c.switchable && (g.push(b('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>', c.field, a, d, c.title)), i++);
      }
    }), g.push('</ul>', '</div>')), g.push('</div>'), (this.showToolbar || g.length > 2) && this.$toolbar.append(g.join('')), this.options.showPaginationSwitch && this.$toolbar.find('button[name="paginationSwitch"]').off('click').on('click', a.proxy(this.togglePagination, this)), this.options.showRefresh && this.$toolbar.find('button[name="refresh"]').off('click').on('click', a.proxy(this.refresh, this)), this.options.showToggle && this.$toolbar.find('button[name="toggle"]').off('click').on('click', function () {
      e.options.cardView = !e.options.cardView, e.initHeader(), e.initBody();
    }), this.options.showColumns && (c = this.$toolbar.find('.keep-open'), i <= this.options.minimumCountColumns && c.find('input').prop('disabled', !0), c.find('li').off('click').on('click', function (a) {
      a.stopImmediatePropagation();
    }), c.find('input').off('click').on('click', function () {
      var b = a(this);
      e.toggleColumn(b.val(), b.prop('checked'), !1), e.trigger('column-switch', a(this).data('field'), b.prop('checked'));
    })), this.options.search && (g = [], g.push('<div class="pull-' + this.options.searchAlign + ' search">', b('<input class="form-control' + (void 0 === this.options.iconSize ? '' : ' input-' + this.options.iconSize) + '" type="text" placeholder="%s">', this.options.formatSearch()), '</div>'), this.$toolbar.append(g.join('')), d = this.$toolbar.find('.search input'), d.off('keyup').on('keyup', function (a) {
      clearTimeout(h), h = setTimeout(function () {
        e.onSearch(a);
      }, e.options.searchTimeOut);
    }));
  }, h.prototype.onSearch = function (b) {
    var c = a.trim(a(b.currentTarget).val());
    this.options.trimOnSearch && a(b.currentTarget).val(c), c !== this.searchText && (this.searchText = c, this.options.pageNumber = 1, this.initSearch(), this.updatePagination(), this.trigger('search', c));
  }, h.prototype.initSearch = function () {
    var b = this;
    if ('server' !== this.options.sidePagination) {
      var c = this.searchText && this.searchText.toLowerCase(), d = a.isEmptyObject(this.filterColumns) ? null : this.filterColumns;
      this.data = d ? a.grep(this.options.data, function (a) {
        for (var b in d)
          if (a[b] !== d[b])
            return !1;
        return !0;
      }) : this.options.data, this.data = c ? a.grep(this.data, function (d, e) {
        for (var g in d) {
          g = a.isNumeric(g) ? parseInt(g, 10) : g;
          var h = d[g];
          h = f(b.header, b.header.formatters[a.inArray(g, b.header.fields)], [
            h,
            d,
            e
          ], h);
          var i = a.inArray(g, b.header.fields);
          if (-1 !== i && b.header.searchables[i] && ('string' == typeof h || 'number' == typeof h) && -1 !== (h + '').toLowerCase().indexOf(c))
            return !0;
        }
        return !1;
      }) : this.data;
    }
  }, h.prototype.initPagination = function () {
    if (this.$pagination = this.$container.find('.fixed-table-pagination'), !this.options.pagination)
      return void this.$pagination.hide();
    this.$pagination.show();
    var c, d, e, f, g, h, i, j, k, l = this, m = [], n = this.getData();
    'server' !== this.options.sidePagination && (this.options.totalRows = n.length), this.totalPages = 0, this.options.totalRows && (this.totalPages = ~~((this.options.totalRows - 1) / this.options.pageSize) + 1, this.options.totalPages = this.totalPages), this.totalPages > 0 && this.options.pageNumber > this.totalPages && (this.options.pageNumber = this.totalPages), this.pageFrom = (this.options.pageNumber - 1) * this.options.pageSize + 1, this.pageTo = this.options.pageNumber * this.options.pageSize, this.pageTo > this.options.totalRows && (this.pageTo = this.options.totalRows), m.push('<div class="pull-left pagination-detail">', '<span class="pagination-info">', this.options.formatShowingRows(this.pageFrom, this.pageTo, this.options.totalRows), '</span>'), m.push('<span class="page-list">');
    var o = [
        '<span class="btn-group dropup">',
        '<button type="button" class="btn btn-default ' + (void 0 === this.options.iconSize ? '' : ' btn-' + this.options.iconSize) + ' dropdown-toggle" data-toggle="dropdown">',
        '<span class="page-size">',
        this.options.pageSize,
        '</span>',
        ' <span class="caret"></span>',
        '</button>',
        '<ul class="dropdown-menu" role="menu">'
      ], p = this.options.pageList;
    if ('string' == typeof this.options.pageList) {
      var q = this.options.pageList.replace('[', '').replace(']', '').replace(/ /g, '').split(',');
      p = [], a.each(q, function (a, b) {
        p.push(+b);
      });
    }
    for (a.each(p, function (a, c) {
        if (!l.options.smartDisplay || 0 === a || p[a - 1] <= l.options.totalRows) {
          var d = c === l.options.pageSize ? ' class="active"' : '';
          o.push(b('<li%s><a href="javascript:void(0)">%s</a></li>', d, c));
        }
      }), o.push('</ul></span>'), m.push(this.options.formatRecordsPerPage(o.join(''))), m.push('</span>'), m.push('</div>', '<div class="pull-right pagination">', '<ul class="pagination' + (void 0 === this.options.iconSize ? '' : ' pagination-' + this.options.iconSize) + '">', '<li class="page-first"><a href="javascript:void(0)">&lt;&lt;</a></li>', '<li class="page-pre"><a href="javascript:void(0)">&lt;</a></li>'), this.totalPages < 5 ? (d = 1, e = this.totalPages) : (d = this.options.pageNumber - 2, e = d + 4, 1 > d && (d = 1, e = 5), e > this.totalPages && (e = this.totalPages, d = e - 4)), c = d; e >= c; c++)
      m.push('<li class="page-number' + (c === this.options.pageNumber ? ' active' : '') + '">', '<a href="javascript:void(0)">', c, '</a>', '</li>');
    m.push('<li class="page-next"><a href="javascript:void(0)">&gt;</a></li>', '<li class="page-last"><a href="javascript:void(0)">&gt;&gt;</a></li>', '</ul>', '</div>'), this.$pagination.html(m.join('')), f = this.$pagination.find('.page-list a'), g = this.$pagination.find('.page-first'), h = this.$pagination.find('.page-pre'), i = this.$pagination.find('.page-next'), j = this.$pagination.find('.page-last'), k = this.$pagination.find('.page-number'), this.options.pageNumber <= 1 && (g.addClass('disabled'), h.addClass('disabled')), this.options.pageNumber >= this.totalPages && (i.addClass('disabled'), j.addClass('disabled')), this.options.smartDisplay && (this.totalPages <= 1 && this.$pagination.find('div.pagination').hide(), (this.options.pageList.length < 2 || this.options.totalRows <= this.options.pageList[0]) && this.$pagination.find('span.page-list').hide(), this.$pagination[this.getData().length ? 'show' : 'hide']()), f.off('click').on('click', a.proxy(this.onPageListChange, this)), g.off('click').on('click', a.proxy(this.onPageFirst, this)), h.off('click').on('click', a.proxy(this.onPagePre, this)), i.off('click').on('click', a.proxy(this.onPageNext, this)), j.off('click').on('click', a.proxy(this.onPageLast, this)), k.off('click').on('click', a.proxy(this.onPageNumber, this));
  }, h.prototype.updatePagination = function (b) {
    b && a(b.currentTarget).hasClass('disabled') || (this.options.maintainSelected || this.resetRows(), this.initPagination(), 'server' === this.options.sidePagination ? this.initServer() : this.initBody(), this.trigger('page-change', this.options.pageNumber, this.options.pageSize));
  }, h.prototype.onPageListChange = function (b) {
    var c = a(b.currentTarget);
    c.parent().addClass('active').siblings().removeClass('active'), this.options.pageSize = +c.text(), this.$toolbar.find('.page-size').text(this.options.pageSize), this.updatePagination(b);
  }, h.prototype.onPageFirst = function (a) {
    this.options.pageNumber = 1, this.updatePagination(a);
  }, h.prototype.onPagePre = function (a) {
    this.options.pageNumber--, this.updatePagination(a);
  }, h.prototype.onPageNext = function (a) {
    this.options.pageNumber++, this.updatePagination(a);
  }, h.prototype.onPageLast = function (a) {
    this.options.pageNumber = this.totalPages, this.updatePagination(a);
  }, h.prototype.onPageNumber = function (b) {
    this.options.pageNumber !== +a(b.currentTarget).text() && (this.options.pageNumber = +a(b.currentTarget).text(), this.updatePagination(b));
  }, h.prototype.initBody = function (e) {
    var h = this, i = [], j = this.getData();
    this.trigger('pre-body', j), this.$body = this.$el.find('tbody'), this.$body.length || (this.$body = a('<tbody></tbody>').appendTo(this.$el)), this.options.pagination && 'server' !== this.options.sidePagination || (this.pageFrom = 1, this.pageTo = j.length);
    for (var k = this.pageFrom - 1; k < this.pageTo; k++) {
      var l = j[k], m = {}, n = [], o = {}, p = [];
      if (m = f(this.options, this.options.rowStyle, [
          l,
          k
        ], m), m && m.css)
        for (var q in m.css)
          n.push(q + ': ' + m.css[q]);
      if (o = f(this.options, this.options.rowAttributes, [
          l,
          k
        ], o))
        for (var q in o)
          p.push(b('%s="%s"', q, g(o[q])));
      i.push('<tr', b(' %s', p.join(' ')), b(' id="%s"', a.isArray(l) ? void 0 : l._id), b(' class="%s"', m.classes || (a.isArray(l) ? void 0 : l._class)), b(' data-index="%s"', k), '>'), this.options.cardView && i.push(b('<td colspan="%s">', this.header.fields.length)), a.each(this.header.fields, function (e, g) {
        var j = '', o = l[g], p = '', q = {}, r = '', s = h.header.classes[e], t = '', u = h.options.columns[d(h.options.columns, g)];
        if (m = b('style="%s"', n.concat(h.header.styles[e]).join('; ')), o = f(h.header, h.header.formatters[e], [
            o,
            l,
            k
          ], o), l['_' + g + '_id'] && (r = b(' id="%s"', l['_' + g + '_id'])), l['_' + g + '_class'] && (s = b(' class="%s"', l['_' + g + '_class'])), q = f(h.header, h.header.cellStyles[e], [
            o,
            l,
            k
          ], q), q.classes && (s = b(' class="%s"', q.classes)), q.css) {
          var v = [];
          for (var w in q.css)
            v.push(w + ': ' + q.css[w]);
          m = b('style="%s"', v.concat(h.header.styles[e]).join('; '));
        }
        l['_' + g + '_data'] && !a.isEmptyObject(l['_' + g + '_data']) && a.each(l['_' + g + '_data'], function (a, c) {
          'index' !== a && (t += b(' data-%s="%s"', a, c));
        }), u.checkbox || u.radio ? (p = u.checkbox ? 'checkbox' : p, p = u.radio ? 'radio' : p, j = [
          h.options.cardView ? '<div class="card-view">' : '<td class="bs-checkbox">',
          '<input' + b(' data-index="%s"', k) + b(' name="%s"', h.options.selectItemName) + b(' type="%s"', p) + b(' value="%s"', l[h.options.idField]) + b(' checked="%s"', o === !0 || o && o.checked ? 'checked' : void 0) + b(' disabled="%s"', !u.checkboxEnabled || o && o.disabled ? 'disabled' : void 0) + ' />',
          h.options.cardView ? '</div>' : '</td>'
        ].join('')) : (o = 'undefined' == typeof o || null === o ? h.options.undefinedText : o, j = h.options.cardView ? [
          '<div class="card-view">',
          h.options.showHeader ? b('<span class="title" %s>%s</span>', m, c(h.options.columns, 'field', 'title', g)) : '',
          b('<span class="value">%s</span>', o),
          '</div>'
        ].join('') : [
          b('<td%s %s %s %s>', r, s, m, t),
          o,
          '</td>'
        ].join(''), h.options.cardView && h.options.smartDisplay && '' === o && (j = '')), i.push(j);
      }), this.options.cardView && i.push('</td>'), i.push('</tr>');
    }
    i.length || i.push('<tr class="no-records-found">', b('<td colspan="%s">%s</td>', this.header.fields.length, this.options.formatNoMatches()), '</tr>'), this.$body.html(i.join('')), e || this.scrollTo(0), this.$body.find('> tr > td').off('click').on('click', function () {
      var c = a(this).parent();
      h.trigger('click-row', h.data[c.data('index')], c), h.options.clickToSelect && h.header.clickToSelects[c.children().index(a(this))] && c.find(b('[name="%s"]', h.options.selectItemName))[0].click();
    }), this.$body.find('tr').off('dblclick').on('dblclick', function () {
      h.trigger('dbl-click-row', h.data[a(this).data('index')], a(this));
    }), this.$selectItem = this.$body.find(b('[name="%s"]', this.options.selectItemName)), this.$selectItem.off('click').on('click', function (b) {
      b.stopImmediatePropagation();
      var c = a(this).prop('checked'), d = h.data[a(this).data('index')];
      d[h.header.stateField] = c, h.trigger(c ? 'check' : 'uncheck', d), h.options.singleSelect && (h.$selectItem.not(this).each(function () {
        h.data[a(this).data('index')][h.header.stateField] = !1;
      }), h.$selectItem.filter(':checked').not(this).prop('checked', !1)), h.updateSelected();
    }), a.each(this.header.events, function (b, c) {
      if (c) {
        'string' == typeof c && (c = f(null, c));
        for (var d in c)
          h.$body.find('tr').each(function () {
            var e = a(this), f = e.find(h.options.cardView ? '.card-view' : 'td').eq(b), g = d.indexOf(' '), i = d.substring(0, g), j = d.substring(g + 1), k = c[d];
            f.find(j).off(i).on(i, function (a) {
              var c = e.data('index'), d = h.data[c], f = d[h.header.fields[b]];
              k.apply(this, [
                a,
                f,
                d,
                c
              ]);
            });
          });
      }
    }), this.updateSelected(), this.resetView(), this.trigger('post-body');
  }, h.prototype.initServer = function (b, c) {
    var d = this, e = {}, g = {
        pageSize: this.options.pageSize,
        pageNumber: this.options.pageNumber,
        searchText: this.searchText,
        sortName: this.options.sortName,
        sortOrder: this.options.sortOrder
      };
    this.options.url && ('limit' === this.options.queryParamsType && (g = {
      search: g.searchText,
      sort: g.sortName,
      order: g.sortOrder
    }, this.options.pagination && (g.limit = this.options.pageSize, g.offset = this.options.pageSize * (this.options.pageNumber - 1))), e = f(this.options, this.options.queryParams, [g], e), a.extend(e, c || {}), e !== !1 && (b || this.$loading.show(), a.ajax(a.extend({}, f(null, this.options.ajaxOptions), {
      type: this.options.method,
      url: this.options.url,
      data: 'application/json' === this.options.contentType && 'post' === this.options.method ? JSON.stringify(e) : e,
      cache: this.options.cache,
      contentType: this.options.contentType,
      dataType: this.options.dataType,
      success: function (a) {
        a = f(d.options, d.options.responseHandler, [a], a), d.load(a), d.trigger('load-success', a);
      },
      error: function (a) {
        d.trigger('load-error', a.status);
      },
      complete: function () {
        b || d.$loading.hide();
      }
    }))));
  }, h.prototype.getCaretHtml = function () {
    return [
      '<span class="order' + ('desc' === this.options.sortOrder ? '' : ' dropup') + '">',
      '<span class="caret" style="margin: 10px 5px;"></span>',
      '</span>'
    ].join('');
  }, h.prototype.updateSelected = function () {
    var b = this.$selectItem.filter(':enabled').length === this.$selectItem.filter(':enabled').filter(':checked').length;
    this.$selectAll.add(this.$selectAll_).prop('checked', b), this.$selectItem.each(function () {
      a(this).parents('tr')[a(this).prop('checked') ? 'addClass' : 'removeClass']('selected');
    });
  }, h.prototype.updateRows = function (b) {
    var c = this;
    this.$selectItem.each(function () {
      c.data[a(this).data('index')][c.header.stateField] = b;
    });
  }, h.prototype.resetRows = function () {
    var b = this;
    a.each(this.data, function (a, c) {
      b.$selectAll.prop('checked', !1), b.$selectItem.prop('checked', !1), c[b.header.stateField] = !1;
    });
  }, h.prototype.trigger = function (b) {
    var c = Array.prototype.slice.call(arguments, 1);
    b += '.bs.table', this.options[h.EVENTS[b]].apply(this.options, c), this.$el.trigger(a.Event(b), c), this.options.onAll(b, c), this.$el.trigger(a.Event('all.bs.table'), [
      b,
      c
    ]);
  }, h.prototype.resetHeader = function () {
    var b = this, c = this.$container.find('.fixed-table-header'), d = this.$container.find('.fixed-table-body'), f = this.$el.width() > d.width() ? e() : 0;
    return this.$el.is(':hidden') ? (clearTimeout(this.timeoutId_), void (this.timeoutId_ = setTimeout(a.proxy(this.resetHeader, this), 100))) : (this.$header_ = this.$header.clone(!0, !0), this.$selectAll_ = this.$header_.find('[name="btSelectAll"]'), void setTimeout(function () {
      c.css({
        height: '37px',
        'border-bottom': '1px solid #dddddd',
        'margin-right': f
      }).find('table').css('width', b.$el.css('width')).html('').attr('class', b.$el.attr('class')).append(b.$header_), b.$header.find('th').each(function (c) {
        b.$header_.find('th').eq(c).data(a(this).data());
      }), b.$body.find('tr:first-child:not(.no-records-found) > *').each(function (c) {
        b.$header_.find('div.fht-cell').eq(c).width(a(this).innerWidth());
      }), b.$el.css('margin-top', -b.$header.height()), d.off('scroll').on('scroll', function () {
        c.scrollLeft(a(this).scrollLeft());
      }), b.trigger('post-header');
    }));
  }, h.prototype.toggleColumn = function (a, c, d) {
    if (-1 !== a && (this.options.columns[a].visible = c, this.initHeader(), this.initSearch(), this.initPagination(), this.initBody(), this.options.showColumns)) {
      var e = this.$toolbar.find('.keep-open input').prop('disabled', !1);
      d && e.filter(b('[value="%s"]', a)).prop('checked', c), e.filter(':checked').length <= this.options.minimumCountColumns && e.filter(':checked').prop('disabled', !0);
    }
  }, h.prototype.resetView = function (a) {
    {
      var b = this;
      this.header;
    }
    if (a && a.height && (this.options.height = a.height), this.$selectAll.prop('checked', this.$selectItem.length > 0 && this.$selectItem.length === this.$selectItem.filter(':checked').length), this.options.height) {
      var c = +this.$toolbar.children().outerHeight(!0), d = +this.$pagination.children().outerHeight(!0), e = this.options.height - c - d;
      this.$container.find('.fixed-table-container').css('height', e + 'px');
    }
    return this.options.cardView ? (b.$el.css('margin-top', '0'), void b.$container.find('.fixed-table-container').css('padding-bottom', '0')) : (this.options.showHeader && this.options.height ? this.resetHeader() : this.trigger('post-header'), void (this.options.height && this.options.showHeader && this.$container.find('.fixed-table-container').css('padding-bottom', '37px')));
  }, h.prototype.getData = function () {
    return this.searchText || !a.isEmptyObject(this.filterColumns) ? this.data : this.options.data;
  }, h.prototype.load = function (b) {
    var c = !1;
    'server' === this.options.sidePagination ? (this.options.totalRows = b.total, c = b.fixedScroll, b = b.rows) : a.isArray(b) || (c = b.fixedScroll, b = b.data), this.initData(b), this.initSearch(), this.initPagination(), this.initBody(c);
  }, h.prototype.append = function (a) {
    this.initData(a, 'append'), this.initSearch(), this.initPagination(), this.initBody(!0);
  }, h.prototype.prepend = function (a) {
    this.initData(a, 'prepend'), this.initSearch(), this.initPagination(), this.initBody(!0);
  }, h.prototype.remove = function (b) {
    var c, d, e = this.options.data.length;
    if (b.hasOwnProperty('field') && b.hasOwnProperty('values')) {
      for (c = e - 1; c >= 0; c--)
        d = this.options.data[c], d.hasOwnProperty(b.field) && -1 !== a.inArray(d[b.field], b.values) && this.options.data.splice(c, 1);
      e !== this.options.data.length && (this.initSearch(), this.initPagination(), this.initBody(!0));
    }
  }, h.prototype.insertRow = function (a) {
    a.hasOwnProperty('index') && a.hasOwnProperty('row') && (this.data.splice(a.index, 0, a.row), this.initBody(!0));
  }, h.prototype.updateRow = function (b) {
    b.hasOwnProperty('index') && b.hasOwnProperty('row') && (a.extend(this.data[b.index], b.row), this.initBody(!0));
  }, h.prototype.mergeCells = function (b) {
    var c, d, e = b.index, f = a.inArray(b.field, this.header.fields), g = b.rowspan || 1, h = b.colspan || 1, i = this.$body.find('tr'), j = i.eq(e).find('td').eq(f);
    if (!(0 > e || 0 > f || e >= this.data.length)) {
      for (c = e; e + g > c; c++)
        for (d = f; f + h > d; d++)
          i.eq(c).find('td').eq(d).hide();
      j.attr('rowspan', g).attr('colspan', h).show();
    }
  }, h.prototype.getOptions = function () {
    return this.options;
  }, h.prototype.getSelections = function () {
    var b = this;
    return a.grep(this.data, function (a) {
      return a[b.header.stateField];
    });
  }, h.prototype.checkAll = function () {
    this.checkAll_(!0);
  }, h.prototype.uncheckAll = function () {
    this.checkAll_(!1);
  }, h.prototype.checkAll_ = function (a) {
    var b;
    a || (b = this.getSelections()), this.$selectItem.filter(':enabled').prop('checked', a), this.updateRows(a), this.updateSelected(), a && (b = this.getSelections()), this.trigger(a ? 'check-all' : 'uncheck-all', b);
  }, h.prototype.check = function (a) {
    this.check_(!0, a);
  }, h.prototype.uncheck = function (a) {
    this.check_(!1, a);
  }, h.prototype.check_ = function (a, c) {
    this.$selectItem.filter(b('[data-index="%s"]', c)).prop('checked', a), this.data[c][this.header.stateField] = a, this.updateSelected(), this.trigger(a ? 'check' : 'uncheck', this.data[c]);
  }, h.prototype.checkBy = function (a) {
    this.checkBy_(!0, a);
  }, h.prototype.uncheckBy = function (a) {
    this.checkBy_(!1, a);
  }, h.prototype.checkBy_ = function (c, d) {
    if (d.hasOwnProperty('field') && d.hasOwnProperty('values')) {
      var e = this;
      a.each(this.options.data, function (f, g) {
        return g.hasOwnProperty(d.field) ? void (-1 !== a.inArray(g[d.field], d.values) && (e.$selectItem.filter(b('[data-index="%s"]', f)).prop('checked', c), g[e.header.stateField] = c, e.trigger(c ? 'check' : 'uncheck', g))) : !1;
      }), this.updateSelected();
    }
  }, h.prototype.destroy = function () {
    this.$el.insertBefore(this.$container), a(this.options.toolbar).insertBefore(this.$el), this.$container.next().remove(), this.$container.remove(), this.$el.html(this.$el_.html()).css('margin-top', '0').attr('class', this.$el_.attr('class') || '');
  }, h.prototype.showLoading = function () {
    this.$loading.show();
  }, h.prototype.hideLoading = function () {
    this.$loading.hide();
  }, h.prototype.togglePagination = function () {
    this.options.pagination = !this.options.pagination;
    var a = this.$toolbar.find('button[name="paginationSwitch"] i');
    this.options.pagination ? a.attr('class', this.options.iconsPrefix + ' ' + this.options.icons.paginationSwitchDown) : a.attr('class', this.options.iconsPrefix + ' ' + this.options.icons.paginationSwitchUp), this.updatePagination();
  }, h.prototype.refresh = function (a) {
    a && a.url && (this.options.url = a.url, this.options.pageNumber = 1), this.initServer(a && a.silent, a && a.query);
  }, h.prototype.showColumn = function (a) {
    this.toggleColumn(d(this.options.columns, a), !0, !0);
  }, h.prototype.hideColumn = function (a) {
    this.toggleColumn(d(this.options.columns, a), !1, !0);
  }, h.prototype.filterBy = function (b) {
    this.filterColumns = a.isEmptyObject(b) ? {} : b, this.options.pageNumber = 1, this.initSearch(), this.updatePagination();
  }, h.prototype.scrollTo = function (a) {
    var b = this.$container.find('.fixed-table-body');
    'string' == typeof a && (a = 'bottom' === a ? b[0].scrollHeight : 0), 'number' == typeof a && b.scrollTop(a);
  }, h.prototype.selectPage = function (a) {
    a > 0 && a <= this.options.totalPages && (this.options.pageNumber = a, this.updatePagination());
  }, h.prototype.prevPage = function () {
    this.options.pageNumber > 1 && (this.options.pageNumber--, this.updatePagination());
  }, h.prototype.nextPage = function () {
    this.options.pageNumber < this.options.totalPages && (this.options.pageNumber++, this.updatePagination());
  }, h.prototype.toggleView = function () {
    this.options.cardView = !this.options.cardView, this.initHeader(), this.initBody();
  };
  var i = [
      'getOptions',
      'getSelections',
      'getData',
      'load',
      'append',
      'prepend',
      'remove',
      'insertRow',
      'updateRow',
      'mergeCells',
      'checkAll',
      'uncheckAll',
      'check',
      'uncheck',
      'checkBy',
      'uncheckBy',
      'refresh',
      'resetView',
      'destroy',
      'showLoading',
      'hideLoading',
      'showColumn',
      'hideColumn',
      'filterBy',
      'scrollTo',
      'selectPage',
      'prevPage',
      'nextPage',
      'togglePagination',
      'toggleView'
    ];
  a.fn.bootstrapTable = function (b, c) {
    var d;
    return this.each(function () {
      var e = a(this), f = e.data('bootstrap.table'), g = a.extend({}, h.DEFAULTS, e.data(), 'object' == typeof b && b);
      if ('string' == typeof b) {
        if (a.inArray(b, i) < 0)
          throw 'Unknown method: ' + b;
        if (!f)
          return;
        d = f[b](c), 'destroy' === b && e.removeData('bootstrap.table');
      }
      f || e.data('bootstrap.table', f = new h(this, g));
    }), 'undefined' == typeof d ? this : d;
  }, a.fn.bootstrapTable.Constructor = h, a.fn.bootstrapTable.defaults = h.DEFAULTS, a.fn.bootstrapTable.columnDefaults = h.COLUMN_DEFAULTS, a.fn.bootstrapTable.locales = h.LOCALES, a.fn.bootstrapTable.methods = i, a(function () {
    a('[data-toggle="table"]').bootstrapTable();
  });
}(jQuery);
/**
* jquery.matchHeight.js master
* http://brm.io/jquery-match-height/
* License: MIT
*/
;
(function ($) {
  /*
    *  internal
    */
  var _previousResizeWidth = -1, _updateTimeout = -1;
  /*
    *  _parse
    *  value parse utility function
    */
  var _parse = function (value) {
    // parse value and convert NaN to 0
    return parseFloat(value) || 0;
  };
  /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */
  var _rows = function (elements) {
    var tolerance = 1, $elements = $(elements), lastTop = null, rows = [];
    // group elements by their top position
    $elements.each(function () {
      var $that = $(this), top = $that.offset().top - _parse($that.css('margin-top')), lastRow = rows.length > 0 ? rows[rows.length - 1] : null;
      if (lastRow === null) {
        // first item on the row, so just push it
        rows.push($that);
      } else {
        // if the row top is the same, add to the row group
        if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
          rows[rows.length - 1] = lastRow.add($that);
        } else {
          // otherwise start a new row group
          rows.push($that);
        }
      }
      // keep track of the last row top
      lastTop = top;
    });
    return rows;
  };
  /*
    *  _parseOptions
    *  handle plugin options
    */
  var _parseOptions = function (options) {
    var opts = {
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      };
    if (typeof options === 'object') {
      return $.extend(opts, options);
    }
    if (typeof options === 'boolean') {
      opts.byRow = options;
    } else if (options === 'remove') {
      opts.remove = true;
    }
    return opts;
  };
  /*
    *  matchHeight
    *  plugin definition
    */
  var matchHeight = $.fn.matchHeight = function (options) {
      var opts = _parseOptions(options);
      // handle remove
      if (opts.remove) {
        var that = this;
        // remove fixed height from all selected elements
        this.css(opts.property, '');
        // remove selected elements from all groups
        $.each(matchHeight._groups, function (key, group) {
          group.elements = group.elements.not(that);
        });
        // TODO: cleanup empty groups
        return this;
      }
      if (this.length <= 1 && !opts.target) {
        return this;
      }
      // keep track of this group so we can re-apply later on load and resize events
      matchHeight._groups.push({
        elements: this,
        options: opts
      });
      // match each element's height to the tallest element in the selection
      matchHeight._apply(this, opts);
      return this;
    };
  /*
    *  plugin global options
    */
  matchHeight._groups = [];
  matchHeight._throttle = 80;
  matchHeight._maintainScroll = false;
  matchHeight._beforeUpdate = null;
  matchHeight._afterUpdate = null;
  /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */
  matchHeight._apply = function (elements, options) {
    var opts = _parseOptions(options), $elements = $(elements), rows = [$elements];
    // take note of scroll position
    var scrollTop = $(window).scrollTop(), htmlHeight = $('html').outerHeight(true);
    // get hidden parents
    var $hiddenParents = $elements.parents().filter(':hidden');
    // cache the original inline style
    $hiddenParents.each(function () {
      var $that = $(this);
      $that.data('style-cache', $that.attr('style'));
    });
    // temporarily must force hidden parents visible
    $hiddenParents.css('display', 'block');
    // get rows if using byRow, otherwise assume one row
    if (opts.byRow && !opts.target) {
      // must first force an arbitrary equal height so floating elements break evenly
      $elements.each(function () {
        var $that = $(this), display = $that.css('display') === 'inline-block' ? 'inline-block' : 'block';
        // cache the original inline style
        $that.data('style-cache', $that.attr('style'));
        $that.css({
          'display': display,
          'padding-top': '0',
          'padding-bottom': '0',
          'margin-top': '0',
          'margin-bottom': '0',
          'border-top-width': '0',
          'border-bottom-width': '0',
          'height': '100px'
        });
      });
      // get the array of rows (based on element top position)
      rows = _rows($elements);
      // revert original inline styles
      $elements.each(function () {
        var $that = $(this);
        $that.attr('style', $that.data('style-cache') || '');
      });
    }
    $.each(rows, function (key, row) {
      var $row = $(row), targetHeight = 0;
      if (!opts.target) {
        // skip apply to rows with only one item
        if (opts.byRow && $row.length <= 1) {
          $row.css(opts.property, '');
          return;
        }
        // iterate the row and find the max height
        $row.each(function () {
          var $that = $(this), display = $that.css('display') === 'inline-block' ? 'inline-block' : 'block';
          // ensure we get the correct actual height (and not a previously set height value)
          var css = { 'display': display };
          css[opts.property] = '';
          $that.css(css);
          // find the max height (including padding, but not margin)
          if ($that.outerHeight(false) > targetHeight) {
            targetHeight = $that.outerHeight(false);
          }
          // revert display block
          $that.css('display', '');
        });
      } else {
        // if target set, use the height of the target element
        targetHeight = opts.target.outerHeight(false);
      }
      // iterate the row and apply the height to all elements
      $row.each(function () {
        var $that = $(this), verticalPadding = 0;
        // don't apply to a target
        if (opts.target && $that.is(opts.target)) {
          return;
        }
        // handle padding and border correctly (required when not using border-box)
        if ($that.css('box-sizing') !== 'border-box') {
          verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
          verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
        }
        // set the height (accounting for padding and border)
        $that.css(opts.property, targetHeight - verticalPadding);
      });
    });
    // revert hidden parents
    $hiddenParents.each(function () {
      var $that = $(this);
      $that.attr('style', $that.data('style-cache') || null);
    });
    // restore scroll position if enabled
    if (matchHeight._maintainScroll) {
      $(window).scrollTop(scrollTop / htmlHeight * $('html').outerHeight(true));
    }
    return this;
  };
  /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */
  matchHeight._applyDataApi = function () {
    var groups = {};
    // generate groups by their groupId set by elements using data-match-height
    $('[data-match-height], [data-mh]').each(function () {
      var $this = $(this), groupId = $this.attr('data-mh') || $this.attr('data-match-height');
      if (groupId in groups) {
        groups[groupId] = groups[groupId].add($this);
      } else {
        groups[groupId] = $this;
      }
    });
    // apply matchHeight to each group
    $.each(groups, function () {
      this.matchHeight(true);
    });
  };
  /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */
  var _update = function (event) {
    if (matchHeight._beforeUpdate) {
      matchHeight._beforeUpdate(event, matchHeight._groups);
    }
    $.each(matchHeight._groups, function () {
      matchHeight._apply(this.elements, this.options);
    });
    if (matchHeight._afterUpdate) {
      matchHeight._afterUpdate(event, matchHeight._groups);
    }
  };
  matchHeight._update = function (throttle, event) {
    // prevent update if fired from a resize event
    // where the viewport width hasn't actually changed
    // fixes an event looping bug in IE8
    if (event && event.type === 'resize') {
      var windowWidth = $(window).width();
      if (windowWidth === _previousResizeWidth) {
        return;
      }
      _previousResizeWidth = windowWidth;
    }
    // throttle updates
    if (!throttle) {
      _update(event);
    } else if (_updateTimeout === -1) {
      _updateTimeout = setTimeout(function () {
        _update(event);
        _updateTimeout = -1;
      }, matchHeight._throttle);
    }
  };
  /*
    *  bind events
    */
  // apply on DOM ready event
  $(matchHeight._applyDataApi);
  // update heights on load and resize events
  $(window).bind('load', function (event) {
    matchHeight._update(false, event);
  });
  // throttled update heights on resize events
  $(window).bind('resize orientationchange', function (event) {
    matchHeight._update(true, event);
  });
}(jQuery));
/*! =========================================================
 * bootstrap-slider.js
 *
 * Maintainers:
 *		Kyle Kemp
 *			- Twitter: @seiyria
 *			- Github:  seiyria
 *		Rohit Kalkur
 *			- Twitter: @Rovolutionary
 *			- Github:  rovolution
 *
 * =========================================================
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
/**
 * Bridget makes jQuery widgets
 * v1.0.1
 * MIT license
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['../../../../jquery/jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    var jQuery;
    try {
      jQuery = require('jquery');
    } catch (err) {
      jQuery = null;
    }
    module.exports = factory(jQuery);
  } else {
    root.Slider = factory(root.jQuery);
  }
}(this, function ($) {
  // Reference to Slider constructor
  var Slider;
  (function ($) {
    'use strict';
    // -------------------------- utils -------------------------- //
    var slice = Array.prototype.slice;
    function noop() {
    }
    // -------------------------- definition -------------------------- //
    function defineBridget($) {
      // bail if no jQuery
      if (!$) {
        return;
      }
      // -------------------------- addOptionMethod -------------------------- //
      /**
			 * adds option method -> $().plugin('option', {...})
			 * @param {Function} PluginClass - constructor class
			 */
      function addOptionMethod(PluginClass) {
        // don't overwrite original option method
        if (PluginClass.prototype.option) {
          return;
        }
        // option setter
        PluginClass.prototype.option = function (opts) {
          // bail out if not an object
          if (!$.isPlainObject(opts)) {
            return;
          }
          this.options = $.extend(true, this.options, opts);
        };
      }
      // -------------------------- plugin bridge -------------------------- //
      // helper function for logging errors
      // $.error breaks jQuery chaining
      var logError = typeof console === 'undefined' ? noop : function (message) {
          console.error(message);
        };
      /**
			 * jQuery plugin bridge, access methods like $elem.plugin('method')
			 * @param {String} namespace - plugin name
			 * @param {Function} PluginClass - constructor class
			 */
      function bridge(namespace, PluginClass) {
        // add to jQuery fn namespace
        $.fn[namespace] = function (options) {
          if (typeof options === 'string') {
            // call plugin method when first argument is a string
            // get arguments for method
            var args = slice.call(arguments, 1);
            for (var i = 0, len = this.length; i < len; i++) {
              var elem = this[i];
              var instance = $.data(elem, namespace);
              if (!instance) {
                logError('cannot call methods on ' + namespace + ' prior to initialization; ' + 'attempted to call \'' + options + '\'');
                continue;
              }
              if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                logError('no such method \'' + options + '\' for ' + namespace + ' instance');
                continue;
              }
              // trigger method with arguments
              var returnValue = instance[options].apply(instance, args);
              // break look and return first value if provided
              if (returnValue !== undefined && returnValue !== instance) {
                return returnValue;
              }
            }
            // return this if no return value
            return this;
          } else {
            var objects = this.map(function () {
                var instance = $.data(this, namespace);
                if (instance) {
                  // apply options & init
                  instance.option(options);
                  instance._init();
                } else {
                  // initialize new instance
                  instance = new PluginClass(this, options);
                  $.data(this, namespace, instance);
                }
                return $(this);
              });
            if (!objects || objects.length > 1) {
              return objects;
            } else {
              return objects[0];
            }
          }
        };
      }
      // -------------------------- bridget -------------------------- //
      /**
			 * converts a Prototypical class into a proper jQuery plugin
			 *   the class must have a ._init method
			 * @param {String} namespace - plugin name, used in $().pluginName
			 * @param {Function} PluginClass - constructor class
			 */
      $.bridget = function (namespace, PluginClass) {
        addOptionMethod(PluginClass);
        bridge(namespace, PluginClass);
      };
      return $.bridget;
    }
    // get jquery from browser global
    defineBridget($);
  }($));
  /*************************************************

			BOOTSTRAP-SLIDER SOURCE CODE

	**************************************************/
  (function ($) {
    var ErrorMsgs = {
        formatInvalidInputErrorMsg: function (input) {
          return 'Invalid input value \'' + input + '\' passed in';
        },
        callingContextNotSliderInstance: 'Calling context element does not have instance of Slider bound to it. Check your code to make sure the JQuery object returned from the call to the slider() initializer is calling the method'
      };
    var SliderScale = {
        linear: {
          toValue: function (percentage) {
            var rawValue = percentage / 100 * (this.options.max - this.options.min);
            if (this.options.ticks_positions.length > 0) {
              var minv, maxv, minp, maxp = 0;
              for (var i = 0; i < this.options.ticks_positions.length; i++) {
                if (percentage <= this.options.ticks_positions[i]) {
                  minv = i > 0 ? this.options.ticks[i - 1] : 0;
                  minp = i > 0 ? this.options.ticks_positions[i - 1] : 0;
                  maxv = this.options.ticks[i];
                  maxp = this.options.ticks_positions[i];
                  break;
                }
              }
              if (i > 0) {
                var partialPercentage = (percentage - minp) / (maxp - minp);
                rawValue = minv + partialPercentage * (maxv - minv);
              }
            }
            var value = this.options.min + Math.round(rawValue / this.options.step) * this.options.step;
            if (value < this.options.min) {
              return this.options.min;
            } else if (value > this.options.max) {
              return this.options.max;
            } else {
              return value;
            }
          },
          toPercentage: function (value) {
            if (this.options.max === this.options.min) {
              return 0;
            }
            if (this.options.ticks_positions.length > 0) {
              var minv, maxv, minp, maxp = 0;
              for (var i = 0; i < this.options.ticks.length; i++) {
                if (value <= this.options.ticks[i]) {
                  minv = i > 0 ? this.options.ticks[i - 1] : 0;
                  minp = i > 0 ? this.options.ticks_positions[i - 1] : 0;
                  maxv = this.options.ticks[i];
                  maxp = this.options.ticks_positions[i];
                  break;
                }
              }
              if (i > 0) {
                var partialPercentage = (value - minv) / (maxv - minv);
                return minp + partialPercentage * (maxp - minp);
              }
            }
            return 100 * (value - this.options.min) / (this.options.max - this.options.min);
          }
        },
        logarithmic: {
          toValue: function (percentage) {
            var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
            var max = Math.log(this.options.max);
            var value = Math.exp(min + (max - min) * percentage / 100);
            value = this.options.min + Math.round((value - this.options.min) / this.options.step) * this.options.step;
            /* Rounding to the nearest step could exceed the min or
					 * max, so clip to those values. */
            if (value < this.options.min) {
              return this.options.min;
            } else if (value > this.options.max) {
              return this.options.max;
            } else {
              return value;
            }
          },
          toPercentage: function (value) {
            if (this.options.max === this.options.min) {
              return 0;
            } else {
              var max = Math.log(this.options.max);
              var min = this.options.min === 0 ? 0 : Math.log(this.options.min);
              var v = value === 0 ? 0 : Math.log(value);
              return 100 * (v - min) / (max - min);
            }
          }
        }
      };
    /*************************************************

							CONSTRUCTOR

		**************************************************/
    Slider = function (element, options) {
      createNewSlider.call(this, element, options);
      return this;
    };
    function createNewSlider(element, options) {
      if (typeof element === 'string') {
        this.element = document.querySelector(element);
      } else if (element instanceof HTMLElement) {
        this.element = element;
      }
      /*************************************************

							Process Options

			**************************************************/
      options = options ? options : {};
      var optionTypes = Object.keys(this.defaultOptions);
      for (var i = 0; i < optionTypes.length; i++) {
        var optName = optionTypes[i];
        // First check if an option was passed in via the constructor
        var val = options[optName];
        // If no data attrib, then check data atrributes
        val = typeof val !== 'undefined' ? val : getDataAttrib(this.element, optName);
        // Finally, if nothing was specified, use the defaults
        val = val !== null ? val : this.defaultOptions[optName];
        // Set all options on the instance of the Slider
        if (!this.options) {
          this.options = {};
        }
        this.options[optName] = val;
      }
      function getDataAttrib(element, optName) {
        var dataName = 'data-slider-' + optName.replace(/_/g, '-');
        var dataValString = element.getAttribute(dataName);
        try {
          return JSON.parse(dataValString);
        } catch (err) {
          return dataValString;
        }
      }
      /*************************************************

							Create Markup

			**************************************************/
      var origWidth = this.element.style.width;
      var updateSlider = false;
      var parent = this.element.parentNode;
      var sliderTrackSelection;
      var sliderTrackLow, sliderTrackHigh;
      var sliderMinHandle;
      var sliderMaxHandle;
      if (this.sliderElem) {
        updateSlider = true;
      } else {
        /* Create elements needed for slider */
        this.sliderElem = document.createElement('div');
        this.sliderElem.className = 'slider';
        /* Create slider track elements */
        var sliderTrack = document.createElement('div');
        sliderTrack.className = 'slider-track';
        sliderTrackLow = document.createElement('div');
        sliderTrackLow.className = 'slider-track-low';
        sliderTrackSelection = document.createElement('div');
        sliderTrackSelection.className = 'slider-selection';
        sliderTrackHigh = document.createElement('div');
        sliderTrackHigh.className = 'slider-track-high';
        sliderMinHandle = document.createElement('div');
        sliderMinHandle.className = 'slider-handle min-slider-handle';
        sliderMaxHandle = document.createElement('div');
        sliderMaxHandle.className = 'slider-handle max-slider-handle';
        sliderTrack.appendChild(sliderTrackLow);
        sliderTrack.appendChild(sliderTrackSelection);
        sliderTrack.appendChild(sliderTrackHigh);
        /* Create ticks */
        this.ticks = [];
        if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
          for (i = 0; i < this.options.ticks.length; i++) {
            var tick = document.createElement('div');
            tick.className = 'slider-tick';
            this.ticks.push(tick);
            sliderTrack.appendChild(tick);
          }
          sliderTrackSelection.className += ' tick-slider-selection';
        }
        sliderTrack.appendChild(sliderMinHandle);
        sliderTrack.appendChild(sliderMaxHandle);
        this.tickLabels = [];
        if (Array.isArray(this.options.ticks_labels) && this.options.ticks_labels.length > 0) {
          this.tickLabelContainer = document.createElement('div');
          this.tickLabelContainer.className = 'slider-tick-label-container';
          for (i = 0; i < this.options.ticks_labels.length; i++) {
            var label = document.createElement('div');
            label.className = 'slider-tick-label';
            label.innerHTML = this.options.ticks_labels[i];
            this.tickLabels.push(label);
            this.tickLabelContainer.appendChild(label);
          }
        }
        var createAndAppendTooltipSubElements = function (tooltipElem) {
          var arrow = document.createElement('div');
          arrow.className = 'tooltip-arrow';
          var inner = document.createElement('div');
          inner.className = 'tooltip-inner';
          tooltipElem.appendChild(arrow);
          tooltipElem.appendChild(inner);
        };
        /* Create tooltip elements */
        var sliderTooltip = document.createElement('div');
        sliderTooltip.className = 'tooltip tooltip-main';
        createAndAppendTooltipSubElements(sliderTooltip);
        var sliderTooltipMin = document.createElement('div');
        sliderTooltipMin.className = 'tooltip tooltip-min';
        createAndAppendTooltipSubElements(sliderTooltipMin);
        var sliderTooltipMax = document.createElement('div');
        sliderTooltipMax.className = 'tooltip tooltip-max';
        createAndAppendTooltipSubElements(sliderTooltipMax);
        /* Append components to sliderElem */
        this.sliderElem.appendChild(sliderTrack);
        this.sliderElem.appendChild(sliderTooltip);
        this.sliderElem.appendChild(sliderTooltipMin);
        this.sliderElem.appendChild(sliderTooltipMax);
        if (this.tickLabelContainer) {
          this.sliderElem.appendChild(this.tickLabelContainer);
        }
        /* Append slider element to parent container, right before the original <input> element */
        parent.insertBefore(this.sliderElem, this.element);
        /* Hide original <input> element */
        this.element.style.display = 'none';
      }
      /* If JQuery exists, cache JQ references */
      if ($) {
        this.$element = $(this.element);
        this.$sliderElem = $(this.sliderElem);
      }
      /*************************************************

								Setup

			**************************************************/
      this.eventToCallbackMap = {};
      this.sliderElem.id = this.options.id;
      this.touchCapable = 'ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch;
      this.tooltip = this.sliderElem.querySelector('.tooltip-main');
      this.tooltipInner = this.tooltip.querySelector('.tooltip-inner');
      this.tooltip_min = this.sliderElem.querySelector('.tooltip-min');
      this.tooltipInner_min = this.tooltip_min.querySelector('.tooltip-inner');
      this.tooltip_max = this.sliderElem.querySelector('.tooltip-max');
      this.tooltipInner_max = this.tooltip_max.querySelector('.tooltip-inner');
      if (SliderScale[this.options.scale]) {
        this.options.scale = SliderScale[this.options.scale];
      }
      if (updateSlider === true) {
        // Reset classes
        this._removeClass(this.sliderElem, 'slider-horizontal');
        this._removeClass(this.sliderElem, 'slider-vertical');
        this._removeClass(this.tooltip, 'hide');
        this._removeClass(this.tooltip_min, 'hide');
        this._removeClass(this.tooltip_max, 'hide');
        // Undo existing inline styles for track
        [
          'left',
          'top',
          'width',
          'height'
        ].forEach(function (prop) {
          this._removeProperty(this.trackLow, prop);
          this._removeProperty(this.trackSelection, prop);
          this._removeProperty(this.trackHigh, prop);
        }, this);
        // Undo inline styles on handles
        [
          this.handle1,
          this.handle2
        ].forEach(function (handle) {
          this._removeProperty(handle, 'left');
          this._removeProperty(handle, 'top');
        }, this);
        // Undo inline styles and classes on tooltips
        [
          this.tooltip,
          this.tooltip_min,
          this.tooltip_max
        ].forEach(function (tooltip) {
          this._removeProperty(tooltip, 'left');
          this._removeProperty(tooltip, 'top');
          this._removeProperty(tooltip, 'margin-left');
          this._removeProperty(tooltip, 'margin-top');
          this._removeClass(tooltip, 'right');
          this._removeClass(tooltip, 'top');
        }, this);
      }
      if (this.options.orientation === 'vertical') {
        this._addClass(this.sliderElem, 'slider-vertical');
        this.stylePos = 'top';
        this.mousePos = 'pageY';
        this.sizePos = 'offsetHeight';
        this._addClass(this.tooltip, 'right');
        this.tooltip.style.left = '100%';
        this._addClass(this.tooltip_min, 'right');
        this.tooltip_min.style.left = '100%';
        this._addClass(this.tooltip_max, 'right');
        this.tooltip_max.style.left = '100%';
      } else {
        this._addClass(this.sliderElem, 'slider-horizontal');
        this.sliderElem.style.width = origWidth;
        this.options.orientation = 'horizontal';
        this.stylePos = 'left';
        this.mousePos = 'pageX';
        this.sizePos = 'offsetWidth';
        this._addClass(this.tooltip, 'top');
        this.tooltip.style.top = -this.tooltip.outerHeight - 14 + 'px';
        this._addClass(this.tooltip_min, 'top');
        this.tooltip_min.style.top = -this.tooltip_min.outerHeight - 14 + 'px';
        this._addClass(this.tooltip_max, 'top');
        this.tooltip_max.style.top = -this.tooltip_max.outerHeight - 14 + 'px';
      }
      /* In case ticks are specified, overwrite the min and max bounds */
      if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
        this.options.max = Math.max.apply(Math, this.options.ticks);
        this.options.min = Math.min.apply(Math, this.options.ticks);
      }
      if (Array.isArray(this.options.value)) {
        this.options.range = true;
      } else if (this.options.range) {
        // User wants a range, but value is not an array
        this.options.value = [
          this.options.value,
          this.options.max
        ];
      }
      this.trackLow = sliderTrackLow || this.trackLow;
      this.trackSelection = sliderTrackSelection || this.trackSelection;
      this.trackHigh = sliderTrackHigh || this.trackHigh;
      if (this.options.selection === 'none') {
        this._addClass(this.trackLow, 'hide');
        this._addClass(this.trackSelection, 'hide');
        this._addClass(this.trackHigh, 'hide');
      }
      this.handle1 = sliderMinHandle || this.handle1;
      this.handle2 = sliderMaxHandle || this.handle2;
      if (updateSlider === true) {
        // Reset classes
        this._removeClass(this.handle1, 'square triangle');
        this._removeClass(this.handle2, 'square triangle hide');
        for (i = 0; i < this.ticks.length; i++) {
          this._removeClass(this.ticks[i], 'square triangle hide');
        }
      }
      var availableHandleModifiers = [
          'square',
          'triangle',
          'custom'
        ];
      var isValidHandleType = availableHandleModifiers.indexOf(this.options.handle) !== -1;
      if (isValidHandleType) {
        this._addClass(this.handle1, this.options.handle);
        this._addClass(this.handle2, this.options.handle);
        for (i = 0; i < this.ticks.length; i++) {
          this._addClass(this.ticks[i], this.options.handle);
        }
      }
      this.offset = this._offset(this.sliderElem);
      this.size = this.sliderElem[this.sizePos];
      this.setValue(this.options.value);
      /******************************************

						Bind Event Listeners

			******************************************/
      // Bind keyboard handlers
      this.handle1Keydown = this._keydown.bind(this, 0);
      this.handle1.addEventListener('keydown', this.handle1Keydown, false);
      this.handle2Keydown = this._keydown.bind(this, 1);
      this.handle2.addEventListener('keydown', this.handle2Keydown, false);
      this.mousedown = this._mousedown.bind(this);
      if (this.touchCapable) {
        // Bind touch handlers
        this.sliderElem.addEventListener('touchstart', this.mousedown, false);
      }
      this.sliderElem.addEventListener('mousedown', this.mousedown, false);
      // Bind tooltip-related handlers
      if (this.options.tooltip === 'hide') {
        this._addClass(this.tooltip, 'hide');
        this._addClass(this.tooltip_min, 'hide');
        this._addClass(this.tooltip_max, 'hide');
      } else if (this.options.tooltip === 'always') {
        this._showTooltip();
        this._alwaysShowTooltip = true;
      } else {
        this.showTooltip = this._showTooltip.bind(this);
        this.hideTooltip = this._hideTooltip.bind(this);
        this.sliderElem.addEventListener('mouseenter', this.showTooltip, false);
        this.sliderElem.addEventListener('mouseleave', this.hideTooltip, false);
        this.handle1.addEventListener('focus', this.showTooltip, false);
        this.handle1.addEventListener('blur', this.hideTooltip, false);
        this.handle2.addEventListener('focus', this.showTooltip, false);
        this.handle2.addEventListener('blur', this.hideTooltip, false);
      }
      if (this.options.enabled) {
        this.enable();
      } else {
        this.disable();
      }
    }
    /*************************************************

					INSTANCE PROPERTIES/METHODS

		- Any methods bound to the prototype are considered
		part of the plugin's `public` interface

		**************************************************/
    Slider.prototype = {
      _init: function () {
      },
      constructor: Slider,
      defaultOptions: {
        id: '',
        min: 0,
        max: 10,
        step: 1,
        precision: 0,
        orientation: 'horizontal',
        value: 5,
        range: false,
        selection: 'before',
        tooltip: 'show',
        tooltip_split: false,
        handle: 'square',
        reversed: false,
        enabled: true,
        formatter: function (val) {
          if (Array.isArray(val)) {
            return val[0] + ' : ' + val[1];
          } else {
            return val;
          }
        },
        natural_arrow_keys: false,
        ticks: [],
        ticks_positions: [],
        ticks_labels: [],
        ticks_snap_bounds: 0,
        scale: 'linear',
        focus: false
      },
      over: false,
      inDrag: false,
      getValue: function () {
        if (this.options.range) {
          return this.options.value;
        }
        return this.options.value[0];
      },
      setValue: function (val, triggerSlideEvent, triggerChangeEvent) {
        if (!val) {
          val = 0;
        }
        var oldValue = this.getValue();
        this.options.value = this._validateInputValue(val);
        var applyPrecision = this._applyPrecision.bind(this);
        if (this.options.range) {
          this.options.value[0] = applyPrecision(this.options.value[0]);
          this.options.value[1] = applyPrecision(this.options.value[1]);
          this.options.value[0] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[0]));
          this.options.value[1] = Math.max(this.options.min, Math.min(this.options.max, this.options.value[1]));
        } else {
          this.options.value = applyPrecision(this.options.value);
          this.options.value = [Math.max(this.options.min, Math.min(this.options.max, this.options.value))];
          this._addClass(this.handle2, 'hide');
          if (this.options.selection === 'after') {
            this.options.value[1] = this.options.max;
          } else {
            this.options.value[1] = this.options.min;
          }
        }
        if (this.options.max > this.options.min) {
          this.percentage = [
            this._toPercentage(this.options.value[0]),
            this._toPercentage(this.options.value[1]),
            this.options.step * 100 / (this.options.max - this.options.min)
          ];
        } else {
          this.percentage = [
            0,
            0,
            100
          ];
        }
        this._layout();
        var newValue = this.options.range ? this.options.value : this.options.value[0];
        if (triggerSlideEvent === true) {
          this._trigger('slide', newValue);
        }
        if (oldValue !== newValue && triggerChangeEvent === true) {
          this._trigger('change', {
            oldValue: oldValue,
            newValue: newValue
          });
        }
        this._setDataVal(newValue);
        return this;
      },
      destroy: function () {
        // Remove event handlers on slider elements
        this._removeSliderEventHandlers();
        // Remove the slider from the DOM
        this.sliderElem.parentNode.removeChild(this.sliderElem);
        /* Show original <input> element */
        this.element.style.display = '';
        // Clear out custom event bindings
        this._cleanUpEventCallbacksMap();
        // Remove data values
        this.element.removeAttribute('data');
        // Remove JQuery handlers/data
        if ($) {
          this._unbindJQueryEventHandlers();
          this.$element.removeData('slider');
        }
      },
      disable: function () {
        this.options.enabled = false;
        this.handle1.removeAttribute('tabindex');
        this.handle2.removeAttribute('tabindex');
        this._addClass(this.sliderElem, 'slider-disabled');
        this._trigger('slideDisabled');
        return this;
      },
      enable: function () {
        this.options.enabled = true;
        this.handle1.setAttribute('tabindex', 0);
        this.handle2.setAttribute('tabindex', 0);
        this._removeClass(this.sliderElem, 'slider-disabled');
        this._trigger('slideEnabled');
        return this;
      },
      toggle: function () {
        if (this.options.enabled) {
          this.disable();
        } else {
          this.enable();
        }
        return this;
      },
      isEnabled: function () {
        return this.options.enabled;
      },
      on: function (evt, callback) {
        this._bindNonQueryEventHandler(evt, callback);
        return this;
      },
      getAttribute: function (attribute) {
        if (attribute) {
          return this.options[attribute];
        } else {
          return this.options;
        }
      },
      setAttribute: function (attribute, value) {
        this.options[attribute] = value;
        return this;
      },
      refresh: function () {
        this._removeSliderEventHandlers();
        createNewSlider.call(this, this.element, this.options);
        if ($) {
          // Bind new instance of slider to the element
          $.data(this.element, 'slider', this);
        }
        return this;
      },
      relayout: function () {
        this._layout();
        return this;
      },
      _removeSliderEventHandlers: function () {
        // Remove event listeners from handle1
        this.handle1.removeEventListener('keydown', this.handle1Keydown, false);
        this.handle1.removeEventListener('focus', this.showTooltip, false);
        this.handle1.removeEventListener('blur', this.hideTooltip, false);
        // Remove event listeners from handle2
        this.handle2.removeEventListener('keydown', this.handle2Keydown, false);
        this.handle2.removeEventListener('focus', this.handle2Keydown, false);
        this.handle2.removeEventListener('blur', this.handle2Keydown, false);
        // Remove event listeners from sliderElem
        this.sliderElem.removeEventListener('mouseenter', this.showTooltip, false);
        this.sliderElem.removeEventListener('mouseleave', this.hideTooltip, false);
        this.sliderElem.removeEventListener('touchstart', this.mousedown, false);
        this.sliderElem.removeEventListener('mousedown', this.mousedown, false);
      },
      _bindNonQueryEventHandler: function (evt, callback) {
        if (this.eventToCallbackMap[evt] === undefined) {
          this.eventToCallbackMap[evt] = [];
        }
        this.eventToCallbackMap[evt].push(callback);
      },
      _cleanUpEventCallbacksMap: function () {
        var eventNames = Object.keys(this.eventToCallbackMap);
        for (var i = 0; i < eventNames.length; i++) {
          var eventName = eventNames[i];
          this.eventToCallbackMap[eventName] = null;
        }
      },
      _showTooltip: function () {
        if (this.options.tooltip_split === false) {
          this._addClass(this.tooltip, 'in');
          this.tooltip_min.style.display = 'none';
          this.tooltip_max.style.display = 'none';
        } else {
          this._addClass(this.tooltip_min, 'in');
          this._addClass(this.tooltip_max, 'in');
          this.tooltip.style.display = 'none';
        }
        this.over = true;
      },
      _hideTooltip: function () {
        if (this.inDrag === false && this.alwaysShowTooltip !== true) {
          this._removeClass(this.tooltip, 'in');
          this._removeClass(this.tooltip_min, 'in');
          this._removeClass(this.tooltip_max, 'in');
        }
        this.over = false;
      },
      _layout: function () {
        var positionPercentages;
        if (this.options.reversed) {
          positionPercentages = [
            100 - this.percentage[0],
            this.percentage[1]
          ];
        } else {
          positionPercentages = [
            this.percentage[0],
            this.percentage[1]
          ];
        }
        this.handle1.style[this.stylePos] = positionPercentages[0] + '%';
        this.handle2.style[this.stylePos] = positionPercentages[1] + '%';
        /* Position ticks and labels */
        if (Array.isArray(this.options.ticks) && this.options.ticks.length > 0) {
          var maxTickValue = Math.max.apply(Math, this.options.ticks);
          var minTickValue = Math.min.apply(Math, this.options.ticks);
          var styleSize = this.options.orientation === 'vertical' ? 'height' : 'width';
          var styleMargin = this.options.orientation === 'vertical' ? 'marginTop' : 'marginLeft';
          var labelSize = this.size / (this.options.ticks.length - 1);
          if (this.tickLabelContainer) {
            var extraMargin = 0;
            if (this.options.ticks_positions.length === 0) {
              this.tickLabelContainer.style[styleMargin] = -labelSize / 2 + 'px';
              extraMargin = this.tickLabelContainer.offsetHeight;
            } else {
              /* Chidren are position absolute, calculate height by finding the max offsetHeight of a child */
              for (i = 0; i < this.tickLabelContainer.childNodes.length; i++) {
                if (this.tickLabelContainer.childNodes[i].offsetHeight > extraMargin) {
                  extraMargin = this.tickLabelContainer.childNodes[i].offsetHeight;
                }
              }
            }
            if (this.options.orientation === 'horizontal') {
              this.sliderElem.style.marginBottom = extraMargin + 'px';
            }
          }
          for (var i = 0; i < this.options.ticks.length; i++) {
            var percentage = this.options.ticks_positions[i] || 100 * (this.options.ticks[i] - minTickValue) / (maxTickValue - minTickValue);
            this.ticks[i].style[this.stylePos] = percentage + '%';
            /* Set class labels to denote whether ticks are in the selection */
            this._removeClass(this.ticks[i], 'in-selection');
            if (!this.options.range) {
              if (this.options.selection === 'after' && percentage >= positionPercentages[0]) {
                this._addClass(this.ticks[i], 'in-selection');
              } else if (this.options.selection === 'before' && percentage <= positionPercentages[0]) {
                this._addClass(this.ticks[i], 'in-selection');
              }
            } else if (percentage >= positionPercentages[0] && percentage <= positionPercentages[1]) {
              this._addClass(this.ticks[i], 'in-selection');
            }
            if (this.tickLabels[i]) {
              this.tickLabels[i].style[styleSize] = labelSize + 'px';
              if (this.options.ticks_positions[i] !== undefined) {
                this.tickLabels[i].style.position = 'absolute';
                this.tickLabels[i].style[this.stylePos] = this.options.ticks_positions[i] + '%';
                this.tickLabels[i].style[styleMargin] = -labelSize / 2 + 'px';
              }
            }
          }
        }
        if (this.options.orientation === 'vertical') {
          this.trackLow.style.top = '0';
          this.trackLow.style.height = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
          this.trackSelection.style.top = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
          this.trackSelection.style.height = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
          this.trackHigh.style.bottom = '0';
          this.trackHigh.style.height = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
        } else {
          this.trackLow.style.left = '0';
          this.trackLow.style.width = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
          this.trackSelection.style.left = Math.min(positionPercentages[0], positionPercentages[1]) + '%';
          this.trackSelection.style.width = Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
          this.trackHigh.style.right = '0';
          this.trackHigh.style.width = 100 - Math.min(positionPercentages[0], positionPercentages[1]) - Math.abs(positionPercentages[0] - positionPercentages[1]) + '%';
          var offset_min = this.tooltip_min.getBoundingClientRect();
          var offset_max = this.tooltip_max.getBoundingClientRect();
          if (offset_min.right > offset_max.left) {
            this._removeClass(this.tooltip_max, 'top');
            this._addClass(this.tooltip_max, 'bottom');
            this.tooltip_max.style.top = 18 + 'px';
          } else {
            this._removeClass(this.tooltip_max, 'bottom');
            this._addClass(this.tooltip_max, 'top');
            this.tooltip_max.style.top = this.tooltip_min.style.top;
          }
        }
        var formattedTooltipVal;
        if (this.options.range) {
          formattedTooltipVal = this.options.formatter(this.options.value);
          this._setText(this.tooltipInner, formattedTooltipVal);
          this.tooltip.style[this.stylePos] = (positionPercentages[1] + positionPercentages[0]) / 2 + '%';
          if (this.options.orientation === 'vertical') {
            this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
          } else {
            this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
          }
          if (this.options.orientation === 'vertical') {
            this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
          } else {
            this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
          }
          var innerTooltipMinText = this.options.formatter(this.options.value[0]);
          this._setText(this.tooltipInner_min, innerTooltipMinText);
          var innerTooltipMaxText = this.options.formatter(this.options.value[1]);
          this._setText(this.tooltipInner_max, innerTooltipMaxText);
          this.tooltip_min.style[this.stylePos] = positionPercentages[0] + '%';
          if (this.options.orientation === 'vertical') {
            this._css(this.tooltip_min, 'margin-top', -this.tooltip_min.offsetHeight / 2 + 'px');
          } else {
            this._css(this.tooltip_min, 'margin-left', -this.tooltip_min.offsetWidth / 2 + 'px');
          }
          this.tooltip_max.style[this.stylePos] = positionPercentages[1] + '%';
          if (this.options.orientation === 'vertical') {
            this._css(this.tooltip_max, 'margin-top', -this.tooltip_max.offsetHeight / 2 + 'px');
          } else {
            this._css(this.tooltip_max, 'margin-left', -this.tooltip_max.offsetWidth / 2 + 'px');
          }
        } else {
          formattedTooltipVal = this.options.formatter(this.options.value[0]);
          this._setText(this.tooltipInner, formattedTooltipVal);
          this.tooltip.style[this.stylePos] = positionPercentages[0] + '%';
          if (this.options.orientation === 'vertical') {
            this._css(this.tooltip, 'margin-top', -this.tooltip.offsetHeight / 2 + 'px');
          } else {
            this._css(this.tooltip, 'margin-left', -this.tooltip.offsetWidth / 2 + 'px');
          }
        }
      },
      _removeProperty: function (element, prop) {
        if (element.style.removeProperty) {
          element.style.removeProperty(prop);
        } else {
          element.style.removeAttribute(prop);
        }
      },
      _mousedown: function (ev) {
        if (!this.options.enabled) {
          return false;
        }
        this.offset = this._offset(this.sliderElem);
        this.size = this.sliderElem[this.sizePos];
        var percentage = this._getPercentage(ev);
        if (this.options.range) {
          var diff1 = Math.abs(this.percentage[0] - percentage);
          var diff2 = Math.abs(this.percentage[1] - percentage);
          this.dragged = diff1 < diff2 ? 0 : 1;
        } else {
          this.dragged = 0;
        }
        this.percentage[this.dragged] = this.options.reversed ? 100 - percentage : percentage;
        this._layout();
        if (this.touchCapable) {
          document.removeEventListener('touchmove', this.mousemove, false);
          document.removeEventListener('touchend', this.mouseup, false);
        }
        if (this.mousemove) {
          document.removeEventListener('mousemove', this.mousemove, false);
        }
        if (this.mouseup) {
          document.removeEventListener('mouseup', this.mouseup, false);
        }
        this.mousemove = this._mousemove.bind(this);
        this.mouseup = this._mouseup.bind(this);
        if (this.touchCapable) {
          // Touch: Bind touch events:
          document.addEventListener('touchmove', this.mousemove, false);
          document.addEventListener('touchend', this.mouseup, false);
        }
        // Bind mouse events:
        document.addEventListener('mousemove', this.mousemove, false);
        document.addEventListener('mouseup', this.mouseup, false);
        this.inDrag = true;
        var newValue = this._calculateValue();
        this._trigger('slideStart', newValue);
        this._setDataVal(newValue);
        this.setValue(newValue, false, true);
        this._pauseEvent(ev);
        if (this.options.focus) {
          this._triggerFocusOnHandle(this.dragged);
        }
        return true;
      },
      _triggerFocusOnHandle: function (handleIdx) {
        if (handleIdx === 0) {
          this.handle1.focus();
        }
        if (handleIdx === 1) {
          this.handle2.focus();
        }
      },
      _keydown: function (handleIdx, ev) {
        if (!this.options.enabled) {
          return false;
        }
        var dir;
        switch (ev.keyCode) {
        case 37:
        // left
        case 40:
          // down
          dir = -1;
          break;
        case 39:
        // right
        case 38:
          // up
          dir = 1;
          break;
        }
        if (!dir) {
          return;
        }
        // use natural arrow keys instead of from min to max
        if (this.options.natural_arrow_keys) {
          var ifVerticalAndNotReversed = this.options.orientation === 'vertical' && !this.options.reversed;
          var ifHorizontalAndReversed = this.options.orientation === 'horizontal' && this.options.reversed;
          if (ifVerticalAndNotReversed || ifHorizontalAndReversed) {
            dir = -dir;
          }
        }
        var val = this.options.value[handleIdx] + dir * this.options.step;
        if (this.options.range) {
          val = [
            !handleIdx ? val : this.options.value[0],
            handleIdx ? val : this.options.value[1]
          ];
        }
        this._trigger('slideStart', val);
        this._setDataVal(val);
        this.setValue(val, true, true);
        this._trigger('slideStop', val);
        this._setDataVal(val);
        this._layout();
        this._pauseEvent(ev);
        return false;
      },
      _pauseEvent: function (ev) {
        if (ev.stopPropagation) {
          ev.stopPropagation();
        }
        if (ev.preventDefault) {
          ev.preventDefault();
        }
        ev.cancelBubble = true;
        ev.returnValue = false;
      },
      _mousemove: function (ev) {
        if (!this.options.enabled) {
          return false;
        }
        var percentage = this._getPercentage(ev);
        this._adjustPercentageForRangeSliders(percentage);
        this.percentage[this.dragged] = this.options.reversed ? 100 - percentage : percentage;
        this._layout();
        var val = this._calculateValue(true);
        this.setValue(val, true, true);
        return false;
      },
      _adjustPercentageForRangeSliders: function (percentage) {
        if (this.options.range) {
          if (this.dragged === 0 && this.percentage[1] < percentage) {
            this.percentage[0] = this.percentage[1];
            this.dragged = 1;
          } else if (this.dragged === 1 && this.percentage[0] > percentage) {
            this.percentage[1] = this.percentage[0];
            this.dragged = 0;
          }
        }
      },
      _mouseup: function () {
        if (!this.options.enabled) {
          return false;
        }
        if (this.touchCapable) {
          // Touch: Unbind touch event handlers:
          document.removeEventListener('touchmove', this.mousemove, false);
          document.removeEventListener('touchend', this.mouseup, false);
        }
        // Unbind mouse event handlers:
        document.removeEventListener('mousemove', this.mousemove, false);
        document.removeEventListener('mouseup', this.mouseup, false);
        this.inDrag = false;
        if (this.over === false) {
          this._hideTooltip();
        }
        var val = this._calculateValue(true);
        this._layout();
        this._trigger('slideStop', val);
        this._setDataVal(val);
        return false;
      },
      _calculateValue: function (snapToClosestTick) {
        var val;
        if (this.options.range) {
          val = [
            this.options.min,
            this.options.max
          ];
          if (this.percentage[0] !== 0) {
            val[0] = this._toValue(this.percentage[0]);
            val[0] = this._applyPrecision(val[0]);
          }
          if (this.percentage[1] !== 100) {
            val[1] = this._toValue(this.percentage[1]);
            val[1] = this._applyPrecision(val[1]);
          }
        } else {
          val = this._toValue(this.percentage[0]);
          val = parseFloat(val);
          val = this._applyPrecision(val);
        }
        if (snapToClosestTick) {
          var min = [
              val,
              Infinity
            ];
          for (var i = 0; i < this.options.ticks.length; i++) {
            var diff = Math.abs(this.options.ticks[i] - val);
            if (diff <= min[1]) {
              min = [
                this.options.ticks[i],
                diff
              ];
            }
          }
          if (min[1] <= this.options.ticks_snap_bounds) {
            return min[0];
          }
        }
        return val;
      },
      _applyPrecision: function (val) {
        var precision = this.options.precision || this._getNumDigitsAfterDecimalPlace(this.options.step);
        return this._applyToFixedAndParseFloat(val, precision);
      },
      _getNumDigitsAfterDecimalPlace: function (num) {
        var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
        if (!match) {
          return 0;
        }
        return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
      },
      _applyToFixedAndParseFloat: function (num, toFixedInput) {
        var truncatedNum = num.toFixed(toFixedInput);
        return parseFloat(truncatedNum);
      },
      _getPercentage: function (ev) {
        if (this.touchCapable && (ev.type === 'touchstart' || ev.type === 'touchmove')) {
          ev = ev.touches[0];
        }
        var eventPosition = ev[this.mousePos];
        var sliderOffset = this.offset[this.stylePos];
        var distanceToSlide = eventPosition - sliderOffset;
        // Calculate what percent of the length the slider handle has slid
        var percentage = distanceToSlide / this.size * 100;
        percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2];
        // Make sure the percent is within the bounds of the slider.
        // 0% corresponds to the 'min' value of the slide
        // 100% corresponds to the 'max' value of the slide
        return Math.max(0, Math.min(100, percentage));
      },
      _validateInputValue: function (val) {
        if (typeof val === 'number') {
          return val;
        } else if (Array.isArray(val)) {
          this._validateArray(val);
          return val;
        } else {
          throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(val));
        }
      },
      _validateArray: function (val) {
        for (var i = 0; i < val.length; i++) {
          var input = val[i];
          if (typeof input !== 'number') {
            throw new Error(ErrorMsgs.formatInvalidInputErrorMsg(input));
          }
        }
      },
      _setDataVal: function (val) {
        var value = 'value: \'' + val + '\'';
        this.element.setAttribute('data', value);
        this.element.setAttribute('value', val);
        this.element.value = val;
      },
      _trigger: function (evt, val) {
        val = val || val === 0 ? val : undefined;
        var callbackFnArray = this.eventToCallbackMap[evt];
        if (callbackFnArray && callbackFnArray.length) {
          for (var i = 0; i < callbackFnArray.length; i++) {
            var callbackFn = callbackFnArray[i];
            callbackFn(val);
          }
        }
        /* If JQuery exists, trigger JQuery events */
        if ($) {
          this._triggerJQueryEvent(evt, val);
        }
      },
      _triggerJQueryEvent: function (evt, val) {
        var eventData = {
            type: evt,
            value: val
          };
        this.$element.trigger(eventData);
        this.$sliderElem.trigger(eventData);
      },
      _unbindJQueryEventHandlers: function () {
        this.$element.off();
        this.$sliderElem.off();
      },
      _setText: function (element, text) {
        if (typeof element.innerText !== 'undefined') {
          element.innerText = text;
        } else if (typeof element.textContent !== 'undefined') {
          element.textContent = text;
        }
      },
      _removeClass: function (element, classString) {
        var classes = classString.split(' ');
        var newClasses = element.className;
        for (var i = 0; i < classes.length; i++) {
          var classTag = classes[i];
          var regex = new RegExp('(?:\\s|^)' + classTag + '(?:\\s|$)');
          newClasses = newClasses.replace(regex, ' ');
        }
        element.className = newClasses.trim();
      },
      _addClass: function (element, classString) {
        var classes = classString.split(' ');
        var newClasses = element.className;
        for (var i = 0; i < classes.length; i++) {
          var classTag = classes[i];
          var regex = new RegExp('(?:\\s|^)' + classTag + '(?:\\s|$)');
          var ifClassExists = regex.test(newClasses);
          if (!ifClassExists) {
            newClasses += ' ' + classTag;
          }
        }
        element.className = newClasses.trim();
      },
      _offsetLeft: function (obj) {
        var offsetLeft = obj.offsetLeft;
        while ((obj = obj.offsetParent) && !isNaN(obj.offsetLeft)) {
          offsetLeft += obj.offsetLeft;
        }
        return offsetLeft;
      },
      _offsetTop: function (obj) {
        var offsetTop = obj.offsetTop;
        while ((obj = obj.offsetParent) && !isNaN(obj.offsetTop)) {
          offsetTop += obj.offsetTop;
        }
        return offsetTop;
      },
      _offset: function (obj) {
        return {
          left: this._offsetLeft(obj),
          top: this._offsetTop(obj)
        };
      },
      _css: function (elementRef, styleName, value) {
        if ($) {
          $.style(elementRef, styleName, value);
        } else {
          var style = styleName.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (all, letter) {
              return letter.toUpperCase();
            });
          elementRef.style[style] = value;
        }
      },
      _toValue: function (percentage) {
        return this.options.scale.toValue.apply(this, [percentage]);
      },
      _toPercentage: function (value) {
        return this.options.scale.toPercentage.apply(this, [value]);
      }
    };
    /*********************************

			Attach to global namespace

		*********************************/
    if ($) {
      var namespace = $.fn.slider ? 'bootstrapSlider' : 'slider';
      $.bridget(namespace, Slider);
    }
  }($));
  return Slider;
}));
angular.module('dellUiComponents', []);
angular.module('dellUiComponents').config(function () {
});
angular.module('dellUiComponents').directive('toggle', function () {
  return {
    restrict: 'A',
    link: function ($scope, element, attributes, controller) {
      switch (attributes.toggle) {
      case 'popover':
        var destroy = function () {
          $('[data-toggle="popover"]').popover('destroy');
        };
        if (attributes.trigger === 'hover') {
          $(element).mouseover(function (event) {
            event.preventDefault();
            destroy();
            $(this).popover('show');
          });
        } else {
          $(element).popover({ trigger: 'manual' });
          $(element).click(function (event) {
            event.preventDefault();
            destroy();
            $(this).popover('show');
            $('[data-dismiss="popover"]').bind('click', function (event) {
              event.preventDefault();
              destroy();
            });
          });
        }
        break;
      case 'tooltip':
        $(element).tooltip();
        break;
      case 'offcanvas':
        $(element).on('click', function (event) {
          event.preventDefault();
          $(element).parents('.row-offcanvas').find('.tab-content').removeClass('active');
        });
        break;
      case 'tab':
        $(element).on('click', function (event) {
          event.preventDefault();
          $(this).tab('show');
          console.log($(this).parents('.row-offcanvas').html());
          $(this).parents('.row-offcanvas').find('.tab-content').addClass('active');
        });
        break;
      case 'collapse':
        $(element).on('click', function (event) {
          event.preventDefault();
        });
        break;
      }
    }
  };
});
angular.module('dellUiComponents').directive('divHeightEqualize', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    // requires bower_components/slick-1.5.0/slick/slick.js which is bundled in dell-ui-components.js
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $(function () {
          $('.tab-center-equalize').matchHeight();
        });
        $(function () {
          $('.tab-justify-equalize').matchHeight();
        });
      }
    };
  }
]);
//asumes that angular-ui-bootstrap is loaded
angular.module('ui.bootstrap.carousel', ['ui.bootstrap.transition']).controller('CarouselController', [
  '$scope',
  '$timeout',
  '$transition',
  '$q',
  function ($scope, $timeout, $transition, $q) {
  }
]).directive('carousel', function () {
  return {};
}).directive('slide', function () {
  return {};
});
angular.module('dellUiComponents').directive('carousel', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $element.carousel();
      }
    };
  }
]).directive('carouselFilmstrip', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    // requires bower_components/slick-1.5.0/slick/slick.js which is bundled in dell-ui-components.js
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $($element).find('.carousel-inner').slick({
          dots: true,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    };
  }
]).directive('carouselFilmstripArrowOnly', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    // requires bower_components/slick-1.5.0/slick/slick.js which is bundled in dell-ui-components.js
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $($element).find('.carousel-inner').slick({
          dots: false,
          infinite: false,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: false,
                dots: false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: false,
                dots: false
              }
            }
          ]
        });
      }
    };
  }
]).directive('slide', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attr, controller) {
        $element.on('click', function (event) {
          event.preventDefault();
        });
        $element.carousel($attr.slide);
      }
    };
  }
]);
/**
 * Created by Clint_Batte on 3/24/2015.
 */
angular.module('dellUiComponents').directive('msCheckbox', function () {
  return {
    restrict: 'C',
    link: function () {
      $('.ms-checkbox').multipleSelect({ placeholder: 'Select title' });
    }
  };
}).directive('listTree', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, $attr) {
      $element.find('.checkbox input').on('click', function () {
        if ($(this).is(':checked')) {
          $(this).parent().addClass('open');
        } else {
          $(this).parent().removeClass('open');
        }
      });
    }
  };
}).directive('emailValidate', function () {
  return {
    restrict: 'C',
    link: function ($scope, element, attributes, controller) {
      $(element).blur(function () {
        var email = $(this).validate();
        var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim;
        if (re.test(element)) {
          $(element).addClass('alert alert-warning');
          $(element).tooltip({ title: 'Please input a valid email address!' });
        } else {
        }
      });
    }
  };
}).directive('emailCheck', function () {
  return {
    restrict: 'AEC',
    link: function ($scope, element, attributes, controller) {
      //$(element).blur(function () {
      //    var string1 = $(element).val();
      //    if (string1.indexOf("@") === -1){
      //        $(element).addClass('alert alert-warning');
      //        $(element).tooltip({
      //            title: "Please input a valid email address!"
      //        });
      //    //$(element).blur();
      //    } else {
      //        $(element).removeClass('alert alert-warning');
      //        $(element).tooltip('disable');
      //    }
      //});
      $(element).on('keyup', function () {
        var string1 = $(element).val();
        var regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim;
        if (!string1.match(regex)) {
          if (!attributes.errorMessage) {
            attributes.errorMessage = 'Please input a valid email address!';
          }
          $(element).addClass('alert alert-warning');
          $(element).tooltip({ title: attributes.errorMessage });
        } else {
          $(element).removeClass('alert alert-warning');
          $(element).tooltip('destroy');
        }
      });
    }
  };
}).directive('showPassword', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, $attrs, controller) {
      $scope.togglePassword = function () {
        $scope.showPassword = !$scope.showPassword;
        if ($scope.showPassword) {
          $($element).find('input[type=password]').attr('type', 'text');
        } else {
          $($element).find('input[type=text]').attr('type', 'password');
        }
      };
    }
  };
}).directive('phoneNumber', function () {
  // Runs during compile
  return {
    restrict: 'C',
    link: function ($scope, element, attributes, controller) {
      //requires https://raw.githubusercontent.com/RobinHerbots/jquery.inputmask/3.x/dist/jquery.inputmask.bundle.min.js
      //TODO use $locale to create mask
      if ($(element).is('input')) {
        $(element).attr('data-inputmask', '\'mask\': \'(999)-999-9999\'');
        $(element).inputmask();
      }
    }
  };
}).directive('phoneExtension', function () {
  return {
    restrict: 'C',
    link: function ($scope, element, attributes, controller) {
      if ($(element).is('input')) {
        $(element).attr('data-inputmask', '\'mask\': \'ext: (9999)\'');
        $(element).inputmask();
      }
    }
  };
}).directive('bsSlider', function () {
  return {
    restrict: 'AEC',
    link: function ($scope, element, attributes, controller) {
      // With JQuery
      $('#single-handle-ex1').slider({
        formatter: function (value) {
          return 'Current value: ' + value;
        }
      });
      $('#single-handle-ex2').slider({ tooltip: 'always' });
      $('#double-handle-ex1').slider({
        id: 'slider12c',
        min: 0,
        max: 10,
        range: true,
        value: [
          3,
          7
        ]
      });
    }
  };
}).directive('spinbox', function () {
  return {
    restrict: 'C',
    link: function ($scope, element, attributes, controller) {
      // Inject html code
      $('.spinbox').each(function (index) {
        var el = $(this);
        if (el.data('orient') === 'vertical') {
          $(el).addClass('dpui-numberPicker spinbox-vert').html('<button class=\'spinbox-increase\'>' + el.data('spinincrease') + '</button><input type=\'text\' class=\'spinbox-input spinbox-input-vert\' style=\'border-top: 0px solid #cfcfcf; border-bottom: 0px solid #cfcfcf;\' value=\'' + el.data('spindefault') + '\' name=\'' + el.data('spinname') + '\'/><button class=\'spinbox-decrease\'>' + el.data('spindecrease') + '</button>');
        } else {
          $(el).addClass('dpui-numberPicker').html('<button class=\'spinbox-decrease\'>' + el.data('spindecrease') + '</button><input type=\'text\' class=\'spinbox-input\' style=\'border-left: 0px solid #cfcfcf; border-right: 0px solid #cfcfcf;\' value=\'' + el.data('spindefault') + '\' name=\'' + el.data('spinname') + '\'/><button class=\'spinbox-increase\'>' + el.data('spinincrease') + '</button>');
        }
      });
      // Increase Button code
      $('.spinbox-increase').click(function () {
        var em = $(this);
        if (em.parent().data('orient') === 'vertical' && parseInt($(this).siblings('input').val()) < em.parent().data('spinmax')) {
          $(em).next().val(parseInt($(em).next().val()) + em.parent().data('spinstep'));
        } else if (parseInt($(this).siblings('input').val()) < em.parent().data('spinmax')) {
          $(em).prev().val(parseInt($(em).prev().val()) + em.parent().data('spinstep'));
        }
      });
      // Decrease Button code
      $('.spinbox-decrease').click(function () {
        var el = $(this);
        if (el.parent().data('orient') === 'vertical' && parseInt($(this).siblings('input').val()) > el.parent().data('spinmin')) {
          $(el).prev().val(parseInt($(el).prev().val()) - el.parent().data('spinstep'));
        } else if (parseInt($(this).siblings('input').val()) > el.parent().data('spinmin')) {
          $(el).next().val(parseInt($(el).next().val()) - el.parent().data('spinstep'));
        }
      });
      //Checks to see if the manual input is outside the range of the min-max and changes it to bring it back in range.
      $('.spinbox-input').blur(function () {
        var em = $(this);
        if (parseInt($(this).val()) > em.parent().data('spinmax')) {
          $(this).val(em.parent().data('spinmax'));
        } else if (parseInt($(this).val()) < em.parent().data('spinmin')) {
          $(this).val(em.parent().data('spinmin'));
        }
      });
      // Limits keyboard input to alphanumeric
      $(document).ready(function () {
        $('.spinbox-input').keypress(function (key) {
          if (key.charCode < 48 || key.charCode > 57) {
            return false;
          }
        });
      });
    }
  };
}).directive('selectState', function () {
  // Runs during compile
  var template = '<option value="">{{ emptyName }}</option>' + '<option ng-repeat="state in states" value="{{state.code}}">' + '   {{state[label]}}' + '</option>';
  return {
    scope: true,
    controller: [
      '$scope',
      '$element',
      '$attrs',
      '$transclude',
      function ($scope, $element, $attrs, $transclude) {
        $scope.selectedState = '';
        $scope.format = $attrs.format;
        $scope.states = [
          {
            'code': 'AL',
            'label': 'Alabama',
            'long_label': 'AL - Alabama'
          },
          {
            'code': 'AK',
            'label': 'Alaska',
            'long_label': 'AK - Alaska'
          },
          {
            'code': 'AZ',
            'label': 'Arizona',
            'long_label': 'AZ - Arizona'
          },
          {
            'code': 'AR',
            'label': 'Arkansas',
            'long_label': 'AR - Arkansas'
          },
          {
            'code': 'CA',
            'label': 'California',
            'long_label': 'CA - California'
          },
          {
            'code': 'CO',
            'label': 'Colorado',
            'long_label': 'CO - Colorado'
          },
          {
            'code': 'CT',
            'label': 'Connecticut',
            'long_label': 'CT - Connecticut'
          },
          {
            'code': 'DE',
            'label': 'Delaware',
            'long_label': 'DE - Delaware'
          },
          {
            'code': 'DC',
            'label': 'District of Columbia',
            'long_label': 'DC - District of Columbia'
          },
          {
            'code': 'FL',
            'label': 'Florida',
            'long_label': 'FL - Florida'
          },
          {
            'code': 'GA',
            'label': 'Georgia',
            'long_label': 'GA - Georgia'
          },
          {
            'code': 'HI',
            'label': 'Hawaii',
            'long_label': 'HI - Hawaii'
          },
          {
            'code': 'ID',
            'label': 'Idaho',
            'long_label': 'ID - Idaho'
          },
          {
            'code': 'IL',
            'label': 'Illinois',
            'long_label': 'IL - Illinois'
          },
          {
            'code': 'IN',
            'label': 'Indiana',
            'long_label': 'IN - Indiana'
          },
          {
            'code': 'IA',
            'label': 'Iowa',
            'long_label': 'IA - Iowa'
          },
          {
            'code': 'KS',
            'label': 'Kansas',
            'long_label': 'KS - Kansas'
          },
          {
            'code': 'KY',
            'label': 'Kentucky',
            'long_label': 'KY - Kentucky'
          },
          {
            'code': 'LA',
            'label': 'Louisiana',
            'long_label': 'LA - Louisiana'
          },
          {
            'code': 'ME',
            'label': 'Maine',
            'long_label': 'ME - Maine'
          },
          {
            'code': 'MD',
            'label': 'Maryland',
            'long_label': 'MD - Maryland'
          },
          {
            'code': 'MA',
            'label': 'Massachusetts',
            'long_label': 'MA - Massachusetts'
          },
          {
            'code': 'MI',
            'label': 'Michigan',
            'long_label': 'MI - Michigan'
          },
          {
            'code': 'MN',
            'label': 'Minnesota',
            'long_label': 'MN - Minnesota'
          },
          {
            'code': 'MS',
            'label': 'Mississippi',
            'long_label': 'MS - Mississippi'
          },
          {
            'code': 'MO',
            'label': 'Missouri',
            'long_label': 'MO - Missouri'
          },
          {
            'code': 'MT',
            'label': 'Montana',
            'long_label': 'MT - Montana'
          },
          {
            'code': 'NE',
            'label': 'Nebraska',
            'long_label': 'NE - Nebraska'
          },
          {
            'code': 'NV',
            'label': 'Nevada',
            'long_label': 'NV - Nevada'
          },
          {
            'code': 'NH',
            'label': 'New Hampshire',
            'long_label': 'NH - New Hampshire'
          },
          {
            'code': 'NJ',
            'label': 'New Jersey',
            'long_label': 'NJ - New Jersey'
          },
          {
            'code': 'NM',
            'label': 'New Mexico',
            'long_label': 'NM - New Mexico'
          },
          {
            'code': 'NY',
            'label': 'New York',
            'long_label': 'NY - New York'
          },
          {
            'code': 'NC',
            'label': 'North Carolina',
            'long_label': 'NC - North Carolina'
          },
          {
            'code': 'ND',
            'label': 'North Dakota',
            'long_label': 'ND - North Dakota'
          },
          {
            'code': 'OH',
            'label': 'Ohio',
            'long_label': 'OH - Ohio'
          },
          {
            'code': 'OK',
            'label': 'Oklahoma',
            'long_label': 'OK - Oklahoma'
          },
          {
            'code': 'OR',
            'label': 'Oregon',
            'long_label': 'OR - Oregon'
          },
          {
            'code': 'PA',
            'label': 'Pennsylvania',
            'long_label': 'PA - Pennsylvania'
          },
          {
            'code': 'RI',
            'label': 'Rhode Island',
            'long_label': 'RI - Rhode Island'
          },
          {
            'code': 'SC',
            'label': 'South Carolina',
            'long_label': 'SC - South Carolina'
          },
          {
            'code': 'SD',
            'label': 'South Dakota',
            'long_label': 'SD - South Dakota'
          },
          {
            'code': 'TN',
            'label': 'Tennessee',
            'long_label': 'TN - Tennessee'
          },
          {
            'code': 'TX',
            'label': 'Texas',
            'long_label': 'TX - Texas'
          },
          {
            'code': 'UT',
            'label': 'Utah',
            'long_label': 'UT - Utah'
          },
          {
            'code': 'VA',
            'label': 'Virginia',
            'long_label': 'VA - Virginia'
          },
          {
            'code': 'WA',
            'label': 'Washington',
            'long_label': 'WA - Washington'
          },
          {
            'code': 'WV',
            'label': 'West Virginia',
            'long_label': 'WV - West Virginia'
          },
          {
            'code': 'WI',
            'label': 'Wisconsin',
            'long_label': 'WI - Wisconsin'
          },
          {
            'code': 'WY',
            'label': 'Wyoming',
            'long_label': 'WY - Wyoming'
          },
          {
            'code': 'AA',
            'label': 'Armed Forces-Americas',
            'long_label': 'AA - Armed Forces-Americas'
          },
          {
            'code': 'AE',
            'label': 'Armed Forces-Europe',
            'long_label': 'AE - Armed Forces-Europe'
          },
          {
            'code': 'AP',
            'label': 'Armed Forces-Pacific',
            'long_label': 'AP - Armed Forces-Pacific'
          }
        ];
        switch ($attrs.format) {
        case 'short':
          $scope.label = 'code';
          break;
        case 'both':
          $scope.label = 'long_label';
          break;
        default:
          $scope.label = 'label';
        }
      }
    ],
    restrict: 'AC',
    template: template,
    link: function ($scope, $element, $attributes, controller) {
      $scope.emptyName = $attributes.emptyName || '*State';
    }
  };
});
angular.module('dellUiComponents').directive('alertCollapsible', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, $attrs) {
      //toggle x
      $element.find('.close').on('click', function () {
        $(event.currentTarget).parent().addClass('collapsed');
      });
      $element.find('> .show-collapsed').on('click', function () {
        $(event.currentTarget).parent().removeClass('collapsed');
      });
    }
  };
});
angular.module('dellUiComponents').directive('table', function () {
  // Runs during compile
  return {
    scope: {},
    restrict: 'C',
    link: function ($scope, $element, $attrs, controller) {
      $element.bootstrapTable();
    }
  };
});
/**
 * Created by Clint_Batte on 5/7/2015.
 */
angular.module('dellUiComponents').directive('tapToLoad', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, attrs) {
      $(document).ready(function () {
        $('.news-pagination li').slice(5).hide();
        $('#loadmore').jqPagination({
          max_page: Math.ceil($('.news-pagination li').length / 5),
          paged: function (page) {
            $('.news-pagination li').hide();
            $('.news-pagination li').slice((page - 1) * 5, page * 5).fadeIn('slow');
          }
        });
      });
    }
  };
}).directive('pagination', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, attrs) {
      $('.pagination').jqPagination({
        paged: function (page) {
        }
      });
    }
  };
});
/**
 * Created by Clint_Batte on 5/18/2015.
 */
//TODO need to add this to wordpress site as native jquery
angular.module('dellUiComponents').directive('interactiveProgressBar', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $scope.fakeAnimationValue = 0;
        $scope.fakeAnimation = function () {
          $scope.fakeAnimationId = $timeout(function () {
            if ($scope.fakeAnimationValue < 100) {
              $scope.fakeAnimationValue = $scope.fakeAnimationValue + 1;
              $scope.fakeAnimationSteps = Math.round($scope.fakeAnimationValue / 20);
              console.log($scope.fakeAnimationValue, $scope.fakeAnimationSteps);
              $scope.stripeAnimate = 'active';
              $scope.fakeAnimation();
            }
          }, _.random(100, 500));
        };
        $scope.pauseFakeAnimation = function () {
          $timeout.cancel($scope.fakeAnimationId);
          $scope.fakeAnimationId = undefined;
          $scope.stripeAnimate = '';
        };
        console.log('hello timeout');
        $scope.resetFakeAnimation = function () {
          $scope.fakeAnimationValue = 0;
          $scope.fakeAnimation();
          $scope.stripeAnimate = 'active';
        };
      }
    };
  }
]);
/**
 * Created by Clint_Batte on 5/18/2015.
 */
angular.module('dellUiComponents').directive('ratingsAndReviews', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
      }
    };
  }
]);
angular.module('dellUiComponents').directive('equalizeHeight', [
  '$timeout',
  '$rootScope',
  function ($timeout, $rootScope) {
    // Runs during compile
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs, controller) {
        var selector = $attrs.equalizeHeight;
        if (selector) {
          $timeout(function () {
            $(selector).matchHeight();
          }, 500);
        } else {
          console.error('equalize-height usage error. Must include css selector to identify objects to equalize. Example: cequalize-height=".classname"');
        }
      }
    };
  }
]);
Eve.scope('.contact-drawer', function () {
  this.listen('.contact-drawer-cta', 'click', function (e) {
    var contactDrawer = $(e.currentTarget).parents('.contact-drawer');
    contactDrawer.toggleClass('open');
  });
});