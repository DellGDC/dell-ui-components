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
          return '<button type="button" data-role="none"></button>';
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
      _.$slider.html(newSlides);
      _.$slider.children().children().children().width(100 / _.options.slidesPerRow + '%').css({ 'display': 'inline-block' });
    }
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
/* jQuery rt Responsive Tables - v1.0.2 - 2014-07-07
* https://github.com/stazna01/jQuery-rt-Responsive-Tables
*
* This plugin is built heavily upon the work by Chris Coyier
* found at http://css-tricks.com/responsive-data-tables/
*
* Copyright (c) 2014 Nathan Stazewski; Licensed MIT */
(function ($) {
  $.fn.rtResponsiveTables = function (options) {
    // This is the easiest way to have default options.
    var settings = $.extend({ containerBreakPoint: 0 }, options);
    rtStartingOuterWidth = $(window).width();
    //used later to detect orientation change across all mobile browsers (other methods don't always work on Android)
    is_iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    //needed due to the fact that iOS scrolling causes false resizes
    rt_responsive_table_object = this;
    function isEmpty(el) {
      return !$.trim(el.html());
    }
    function rt_write_css(rt_class_identifier) {
      rt_css_code = '<style type="text/css">';
      $(rt_class_identifier).find('th').each(function (index, element) {
        rt_css_code += rt_class_identifier + '.rt-vertical-table td:nth-of-type(' + (index + 1) + '):before { content: "' + $(this).text() + '"; }';
      });
      rt_css_code += '</style>';
      $(rt_css_code).appendTo('head');
    }
    function determine_table_width(rt_table_object) {
      //outerWidth doesn't work properly in Safari if the table is overflowing its container
      rt_table_width = 0;
      if (rt_table_object.hasClass('rt-vertical-table')) {
        rt_table_width = rt_table_object.outerWidth();
      } else {
        rt_table_object.find('th').each(function (index, element) {
          rt_table_width += $(this).outerWidth();
        });
        rt_table_width = rt_table_width;  //this seems to fix a rounding bug in firefox
      }
      return rt_table_width;
    }
    function fix_responsive_tables() {
      if ($('table.rt-responsive-table').length) {
        $('table.rt-responsive-table').each(function (index) {
          rt_containers_width = $(this).parent().width();
          rt_current_width = determine_table_width($(this)) - 1;
          //this "-1" seems to fix an issue in firefox without harming any other browsers
          rt_max_width = $(this).attr('data-rt-max-width');
          rt_has_class_rt_vertical_table = $(this).hasClass('rt-vertical-table');
          if ($(this).attr('data-rtContainerBreakPoint')) {
            rt_user_defined_container_breakpoint = $(this).attr('data-rtContainerBreakPoint');
          } else {
            rt_user_defined_container_breakpoint = settings.containerBreakPoint;
          }
          if (rt_containers_width < rt_current_width || rt_containers_width <= rt_user_defined_container_breakpoint) {
            //the parent element is less than the current width of the table or the parent element is less than or equal to a user supplied breakpoint
            $(this).addClass('rt-vertical-table');
            //switch to vertical orientation (or at least keep it that orientation)
            if (rt_max_width > rt_current_width && rt_max_width > rt_user_defined_container_breakpoint) {
              //the max width was set too high and needs to be adjusted to this lower number
              $(this).attr('data-rt-max-width', rt_current_width);
            } else if (rt_max_width > rt_current_width && rt_max_width <= rt_user_defined_container_breakpoint) {
              //same as above but in this case the breakpoint is larger or equal so it needs to be set as the max width
              $(this).attr('data-rt-max-width', rt_user_defined_container_breakpoint);
            }
          } else if (rt_containers_width > rt_max_width && rt_containers_width > rt_user_defined_container_breakpoint) {
            //the parent element is bigger than the max width and user supplied breakpoint
            $(this).removeClass('rt-vertical-table');
            //switch to horizontal orientation (or at least keep it that orientation)
            if (rt_max_width > rt_current_width && !rt_has_class_rt_vertical_table && (rt_max_width > rt_user_defined_container_breakpoint && !rt_has_class_rt_vertical_table)) {
              //max width is greater than the table's current width and it's in horizontal mode currently...so the max width was set to low and needs to be adjusted to a higher number
              $(this).attr('data-rt-max-width', rt_current_width);
            } else if (rt_max_width > rt_current_width && !rt_has_class_rt_vertical_table && (rt_max_width <= rt_user_defined_container_breakpoint && !rt_has_class_rt_vertical_table)) {
              //same as above but in this case the user supplied breakpoint is larger or equal so it needs to be set as the max width
              $(this).attr('data-rt-max-width', rt_user_defined_container_breakpoint);
            }
          } else {
          }
        });
      }
    }
    rt_responsive_table_object.each(function (index, element) {
      $(this).addClass('rt-responsive-table-' + index).addClass('rt-responsive-table');
      if (index == rt_responsive_table_object.length - 1) {
        $(window).resize(function () {
          if (!is_iOS || is_iOS && rtStartingOuterWidth !== $(window).width()) {
            rtStartingOuterWidth = $(window).width();
            //MUST update the starting width so future orientation changes will be noticed
            fix_responsive_tables();
          }
        });
        rt_responsive_table_count = $('table.rt-responsive-table').length;
        $('table.rt-responsive-table').each(function (index2, element2) {
          rt_write_css('table.rt-responsive-table-' + index2);
          $('table.rt-responsive-table-' + index2).attr('data-rt-max-width', determine_table_width($(this)));
          $(this).find('td,th').each(function (index3, element3) {
            //empty td tags made them disappear
            if (isEmpty($(this))) {
              $(this).html('&#160;');
            }
          });
          if (rt_responsive_table_count - 1 == index2) {
            fix_responsive_tables();
          }
        });
      }
    });
    return this;
  };
}(jQuery));
//! moment.js
//! version : 2.10.6
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
!function (a, b) {
  'object' == typeof exports && 'undefined' != typeof module ? module.exports = b() : 'function' == typeof define && define.amd ? define(b) : a.moment = b();
}(this, function () {
  'use strict';
  function a() {
    return Hc.apply(null, arguments);
  }
  function b(a) {
    Hc = a;
  }
  function c(a) {
    return '[object Array]' === Object.prototype.toString.call(a);
  }
  function d(a) {
    return a instanceof Date || '[object Date]' === Object.prototype.toString.call(a);
  }
  function e(a, b) {
    var c, d = [];
    for (c = 0; c < a.length; ++c)
      d.push(b(a[c], c));
    return d;
  }
  function f(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  function g(a, b) {
    for (var c in b)
      f(b, c) && (a[c] = b[c]);
    return f(b, 'toString') && (a.toString = b.toString), f(b, 'valueOf') && (a.valueOf = b.valueOf), a;
  }
  function h(a, b, c, d) {
    return Ca(a, b, c, d, !0).utc();
  }
  function i() {
    return {
      empty: !1,
      unusedTokens: [],
      unusedInput: [],
      overflow: -2,
      charsLeftOver: 0,
      nullInput: !1,
      invalidMonth: null,
      invalidFormat: !1,
      userInvalidated: !1,
      iso: !1
    };
  }
  function j(a) {
    return null == a._pf && (a._pf = i()), a._pf;
  }
  function k(a) {
    if (null == a._isValid) {
      var b = j(a);
      a._isValid = !(isNaN(a._d.getTime()) || !(b.overflow < 0) || b.empty || b.invalidMonth || b.invalidWeekday || b.nullInput || b.invalidFormat || b.userInvalidated), a._strict && (a._isValid = a._isValid && 0 === b.charsLeftOver && 0 === b.unusedTokens.length && void 0 === b.bigHour);
    }
    return a._isValid;
  }
  function l(a) {
    var b = h(NaN);
    return null != a ? g(j(b), a) : j(b).userInvalidated = !0, b;
  }
  function m(a, b) {
    var c, d, e;
    if ('undefined' != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject), 'undefined' != typeof b._i && (a._i = b._i), 'undefined' != typeof b._f && (a._f = b._f), 'undefined' != typeof b._l && (a._l = b._l), 'undefined' != typeof b._strict && (a._strict = b._strict), 'undefined' != typeof b._tzm && (a._tzm = b._tzm), 'undefined' != typeof b._isUTC && (a._isUTC = b._isUTC), 'undefined' != typeof b._offset && (a._offset = b._offset), 'undefined' != typeof b._pf && (a._pf = j(b)), 'undefined' != typeof b._locale && (a._locale = b._locale), Jc.length > 0)
      for (c in Jc)
        d = Jc[c], e = b[d], 'undefined' != typeof e && (a[d] = e);
    return a;
  }
  function n(b) {
    m(this, b), this._d = new Date(null != b._d ? b._d.getTime() : NaN), Kc === !1 && (Kc = !0, a.updateOffset(this), Kc = !1);
  }
  function o(a) {
    return a instanceof n || null != a && null != a._isAMomentObject;
  }
  function p(a) {
    return 0 > a ? Math.ceil(a) : Math.floor(a);
  }
  function q(a) {
    var b = +a, c = 0;
    return 0 !== b && isFinite(b) && (c = p(b)), c;
  }
  function r(a, b, c) {
    var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
    for (d = 0; e > d; d++)
      (c && a[d] !== b[d] || !c && q(a[d]) !== q(b[d])) && g++;
    return g + f;
  }
  function s() {
  }
  function t(a) {
    return a ? a.toLowerCase().replace('_', '-') : a;
  }
  function u(a) {
    for (var b, c, d, e, f = 0; f < a.length;) {
      for (e = t(a[f]).split('-'), b = e.length, c = t(a[f + 1]), c = c ? c.split('-') : null; b > 0;) {
        if (d = v(e.slice(0, b).join('-')))
          return d;
        if (c && c.length >= b && r(e, c, !0) >= b - 1)
          break;
        b--;
      }
      f++;
    }
    return null;
  }
  function v(a) {
    var b = null;
    if (!Lc[a] && 'undefined' != typeof module && module && module.exports)
      try {
        b = Ic._abbr, require('./locale/' + a), w(b);
      } catch (c) {
      }
    return Lc[a];
  }
  function w(a, b) {
    var c;
    return a && (c = 'undefined' == typeof b ? y(a) : x(a, b), c && (Ic = c)), Ic._abbr;
  }
  function x(a, b) {
    return null !== b ? (b.abbr = a, Lc[a] = Lc[a] || new s(), Lc[a].set(b), w(a), Lc[a]) : (delete Lc[a], null);
  }
  function y(a) {
    var b;
    if (a && a._locale && a._locale._abbr && (a = a._locale._abbr), !a)
      return Ic;
    if (!c(a)) {
      if (b = v(a))
        return b;
      a = [a];
    }
    return u(a);
  }
  function z(a, b) {
    var c = a.toLowerCase();
    Mc[c] = Mc[c + 's'] = Mc[b] = a;
  }
  function A(a) {
    return 'string' == typeof a ? Mc[a] || Mc[a.toLowerCase()] : void 0;
  }
  function B(a) {
    var b, c, d = {};
    for (c in a)
      f(a, c) && (b = A(c), b && (d[b] = a[c]));
    return d;
  }
  function C(b, c) {
    return function (d) {
      return null != d ? (E(this, b, d), a.updateOffset(this, c), this) : D(this, b);
    };
  }
  function D(a, b) {
    return a._d['get' + (a._isUTC ? 'UTC' : '') + b]();
  }
  function E(a, b, c) {
    return a._d['set' + (a._isUTC ? 'UTC' : '') + b](c);
  }
  function F(a, b) {
    var c;
    if ('object' == typeof a)
      for (c in a)
        this.set(c, a[c]);
    else if (a = A(a), 'function' == typeof this[a])
      return this[a](b);
    return this;
  }
  function G(a, b, c) {
    var d = '' + Math.abs(a), e = b - d.length, f = a >= 0;
    return (f ? c ? '+' : '' : '-') + Math.pow(10, Math.max(0, e)).toString().substr(1) + d;
  }
  function H(a, b, c, d) {
    var e = d;
    'string' == typeof d && (e = function () {
      return this[d]();
    }), a && (Qc[a] = e), b && (Qc[b[0]] = function () {
      return G(e.apply(this, arguments), b[1], b[2]);
    }), c && (Qc[c] = function () {
      return this.localeData().ordinal(e.apply(this, arguments), a);
    });
  }
  function I(a) {
    return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, '') : a.replace(/\\/g, '');
  }
  function J(a) {
    var b, c, d = a.match(Nc);
    for (b = 0, c = d.length; c > b; b++)
      Qc[d[b]] ? d[b] = Qc[d[b]] : d[b] = I(d[b]);
    return function (e) {
      var f = '';
      for (b = 0; c > b; b++)
        f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
      return f;
    };
  }
  function K(a, b) {
    return a.isValid() ? (b = L(b, a.localeData()), Pc[b] = Pc[b] || J(b), Pc[b](a)) : a.localeData().invalidDate();
  }
  function L(a, b) {
    function c(a) {
      return b.longDateFormat(a) || a;
    }
    var d = 5;
    for (Oc.lastIndex = 0; d >= 0 && Oc.test(a);)
      a = a.replace(Oc, c), Oc.lastIndex = 0, d -= 1;
    return a;
  }
  function M(a) {
    return 'function' == typeof a && '[object Function]' === Object.prototype.toString.call(a);
  }
  function N(a, b, c) {
    dd[a] = M(b) ? b : function (a) {
      return a && c ? c : b;
    };
  }
  function O(a, b) {
    return f(dd, a) ? dd[a](b._strict, b._locale) : new RegExp(P(a));
  }
  function P(a) {
    return a.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (a, b, c, d, e) {
      return b || c || d || e;
    }).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
  function Q(a, b) {
    var c, d = b;
    for ('string' == typeof a && (a = [a]), 'number' == typeof b && (d = function (a, c) {
        c[b] = q(a);
      }), c = 0; c < a.length; c++)
      ed[a[c]] = d;
  }
  function R(a, b) {
    Q(a, function (a, c, d, e) {
      d._w = d._w || {}, b(a, d._w, d, e);
    });
  }
  function S(a, b, c) {
    null != b && f(ed, a) && ed[a](b, c._a, c, a);
  }
  function T(a, b) {
    return new Date(Date.UTC(a, b + 1, 0)).getUTCDate();
  }
  function U(a) {
    return this._months[a.month()];
  }
  function V(a) {
    return this._monthsShort[a.month()];
  }
  function W(a, b, c) {
    var d, e, f;
    for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), d = 0; 12 > d; d++) {
      if (e = h([
          2000,
          d
        ]), c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp('^' + this.months(e, '').replace('.', '') + '$', 'i'), this._shortMonthsParse[d] = new RegExp('^' + this.monthsShort(e, '').replace('.', '') + '$', 'i')), c || this._monthsParse[d] || (f = '^' + this.months(e, '') + '|^' + this.monthsShort(e, ''), this._monthsParse[d] = new RegExp(f.replace('.', ''), 'i')), c && 'MMMM' === b && this._longMonthsParse[d].test(a))
        return d;
      if (c && 'MMM' === b && this._shortMonthsParse[d].test(a))
        return d;
      if (!c && this._monthsParse[d].test(a))
        return d;
    }
  }
  function X(a, b) {
    var c;
    return 'string' == typeof b && (b = a.localeData().monthsParse(b), 'number' != typeof b) ? a : (c = Math.min(a.date(), T(a.year(), b)), a._d['set' + (a._isUTC ? 'UTC' : '') + 'Month'](b, c), a);
  }
  function Y(b) {
    return null != b ? (X(this, b), a.updateOffset(this, !0), this) : D(this, 'Month');
  }
  function Z() {
    return T(this.year(), this.month());
  }
  function $(a) {
    var b, c = a._a;
    return c && -2 === j(a).overflow && (b = c[gd] < 0 || c[gd] > 11 ? gd : c[hd] < 1 || c[hd] > T(c[fd], c[gd]) ? hd : c[id] < 0 || c[id] > 24 || 24 === c[id] && (0 !== c[jd] || 0 !== c[kd] || 0 !== c[ld]) ? id : c[jd] < 0 || c[jd] > 59 ? jd : c[kd] < 0 || c[kd] > 59 ? kd : c[ld] < 0 || c[ld] > 999 ? ld : -1, j(a)._overflowDayOfYear && (fd > b || b > hd) && (b = hd), j(a).overflow = b), a;
  }
  function _(b) {
    a.suppressDeprecationWarnings === !1 && 'undefined' != typeof console && console.warn && console.warn('Deprecation warning: ' + b);
  }
  function aa(a, b) {
    var c = !0;
    return g(function () {
      return c && (_(a + '\n' + new Error().stack), c = !1), b.apply(this, arguments);
    }, b);
  }
  function ba(a, b) {
    od[a] || (_(b), od[a] = !0);
  }
  function ca(a) {
    var b, c, d = a._i, e = pd.exec(d);
    if (e) {
      for (j(a).iso = !0, b = 0, c = qd.length; c > b; b++)
        if (qd[b][1].exec(d)) {
          a._f = qd[b][0];
          break;
        }
      for (b = 0, c = rd.length; c > b; b++)
        if (rd[b][1].exec(d)) {
          a._f += (e[6] || ' ') + rd[b][0];
          break;
        }
      d.match(ad) && (a._f += 'Z'), va(a);
    } else
      a._isValid = !1;
  }
  function da(b) {
    var c = sd.exec(b._i);
    return null !== c ? void (b._d = new Date(+c[1])) : (ca(b), void (b._isValid === !1 && (delete b._isValid, a.createFromInputFallback(b))));
  }
  function ea(a, b, c, d, e, f, g) {
    var h = new Date(a, b, c, d, e, f, g);
    return 1970 > a && h.setFullYear(a), h;
  }
  function fa(a) {
    var b = new Date(Date.UTC.apply(null, arguments));
    return 1970 > a && b.setUTCFullYear(a), b;
  }
  function ga(a) {
    return ha(a) ? 366 : 365;
  }
  function ha(a) {
    return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
  }
  function ia() {
    return ha(this.year());
  }
  function ja(a, b, c) {
    var d, e = c - b, f = c - a.day();
    return f > e && (f -= 7), e - 7 > f && (f += 7), d = Da(a).add(f, 'd'), {
      week: Math.ceil(d.dayOfYear() / 7),
      year: d.year()
    };
  }
  function ka(a) {
    return ja(a, this._week.dow, this._week.doy).week;
  }
  function la() {
    return this._week.dow;
  }
  function ma() {
    return this._week.doy;
  }
  function na(a) {
    var b = this.localeData().week(this);
    return null == a ? b : this.add(7 * (a - b), 'd');
  }
  function oa(a) {
    var b = ja(this, 1, 4).week;
    return null == a ? b : this.add(7 * (a - b), 'd');
  }
  function pa(a, b, c, d, e) {
    var f, g = 6 + e - d, h = fa(a, 0, 1 + g), i = h.getUTCDay();
    return e > i && (i += 7), c = null != c ? 1 * c : e, f = 1 + g + 7 * (b - 1) - i + c, {
      year: f > 0 ? a : a - 1,
      dayOfYear: f > 0 ? f : ga(a - 1) + f
    };
  }
  function qa(a) {
    var b = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 86400000) + 1;
    return null == a ? b : this.add(a - b, 'd');
  }
  function ra(a, b, c) {
    return null != a ? a : null != b ? b : c;
  }
  function sa(a) {
    var b = new Date();
    return a._useUTC ? [
      b.getUTCFullYear(),
      b.getUTCMonth(),
      b.getUTCDate()
    ] : [
      b.getFullYear(),
      b.getMonth(),
      b.getDate()
    ];
  }
  function ta(a) {
    var b, c, d, e, f = [];
    if (!a._d) {
      for (d = sa(a), a._w && null == a._a[hd] && null == a._a[gd] && ua(a), a._dayOfYear && (e = ra(a._a[fd], d[fd]), a._dayOfYear > ga(e) && (j(a)._overflowDayOfYear = !0), c = fa(e, 0, a._dayOfYear), a._a[gd] = c.getUTCMonth(), a._a[hd] = c.getUTCDate()), b = 0; 3 > b && null == a._a[b]; ++b)
        a._a[b] = f[b] = d[b];
      for (; 7 > b; b++)
        a._a[b] = f[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
      24 === a._a[id] && 0 === a._a[jd] && 0 === a._a[kd] && 0 === a._a[ld] && (a._nextDay = !0, a._a[id] = 0), a._d = (a._useUTC ? fa : ea).apply(null, f), null != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm), a._nextDay && (a._a[id] = 24);
    }
  }
  function ua(a) {
    var b, c, d, e, f, g, h;
    b = a._w, null != b.GG || null != b.W || null != b.E ? (f = 1, g = 4, c = ra(b.GG, a._a[fd], ja(Da(), 1, 4).year), d = ra(b.W, 1), e = ra(b.E, 1)) : (f = a._locale._week.dow, g = a._locale._week.doy, c = ra(b.gg, a._a[fd], ja(Da(), f, g).year), d = ra(b.w, 1), null != b.d ? (e = b.d, f > e && ++d) : e = null != b.e ? b.e + f : f), h = pa(c, d, e, g, f), a._a[fd] = h.year, a._dayOfYear = h.dayOfYear;
  }
  function va(b) {
    if (b._f === a.ISO_8601)
      return void ca(b);
    b._a = [], j(b).empty = !0;
    var c, d, e, f, g, h = '' + b._i, i = h.length, k = 0;
    for (e = L(b._f, b._locale).match(Nc) || [], c = 0; c < e.length; c++)
      f = e[c], d = (h.match(O(f, b)) || [])[0], d && (g = h.substr(0, h.indexOf(d)), g.length > 0 && j(b).unusedInput.push(g), h = h.slice(h.indexOf(d) + d.length), k += d.length), Qc[f] ? (d ? j(b).empty = !1 : j(b).unusedTokens.push(f), S(f, d, b)) : b._strict && !d && j(b).unusedTokens.push(f);
    j(b).charsLeftOver = i - k, h.length > 0 && j(b).unusedInput.push(h), j(b).bigHour === !0 && b._a[id] <= 12 && b._a[id] > 0 && (j(b).bigHour = void 0), b._a[id] = wa(b._locale, b._a[id], b._meridiem), ta(b), $(b);
  }
  function wa(a, b, c) {
    var d;
    return null == c ? b : null != a.meridiemHour ? a.meridiemHour(b, c) : null != a.isPM ? (d = a.isPM(c), d && 12 > b && (b += 12), d || 12 !== b || (b = 0), b) : b;
  }
  function xa(a) {
    var b, c, d, e, f;
    if (0 === a._f.length)
      return j(a).invalidFormat = !0, void (a._d = new Date(NaN));
    for (e = 0; e < a._f.length; e++)
      f = 0, b = m({}, a), null != a._useUTC && (b._useUTC = a._useUTC), b._f = a._f[e], va(b), k(b) && (f += j(b).charsLeftOver, f += 10 * j(b).unusedTokens.length, j(b).score = f, (null == d || d > f) && (d = f, c = b));
    g(a, c || b);
  }
  function ya(a) {
    if (!a._d) {
      var b = B(a._i);
      a._a = [
        b.year,
        b.month,
        b.day || b.date,
        b.hour,
        b.minute,
        b.second,
        b.millisecond
      ], ta(a);
    }
  }
  function za(a) {
    var b = new n($(Aa(a)));
    return b._nextDay && (b.add(1, 'd'), b._nextDay = void 0), b;
  }
  function Aa(a) {
    var b = a._i, e = a._f;
    return a._locale = a._locale || y(a._l), null === b || void 0 === e && '' === b ? l({ nullInput: !0 }) : ('string' == typeof b && (a._i = b = a._locale.preparse(b)), o(b) ? new n($(b)) : (c(e) ? xa(a) : e ? va(a) : d(b) ? a._d = b : Ba(a), a));
  }
  function Ba(b) {
    var f = b._i;
    void 0 === f ? b._d = new Date() : d(f) ? b._d = new Date(+f) : 'string' == typeof f ? da(b) : c(f) ? (b._a = e(f.slice(0), function (a) {
      return parseInt(a, 10);
    }), ta(b)) : 'object' == typeof f ? ya(b) : 'number' == typeof f ? b._d = new Date(f) : a.createFromInputFallback(b);
  }
  function Ca(a, b, c, d, e) {
    var f = {};
    return 'boolean' == typeof c && (d = c, c = void 0), f._isAMomentObject = !0, f._useUTC = f._isUTC = e, f._l = c, f._i = a, f._f = b, f._strict = d, za(f);
  }
  function Da(a, b, c, d) {
    return Ca(a, b, c, d, !1);
  }
  function Ea(a, b) {
    var d, e;
    if (1 === b.length && c(b[0]) && (b = b[0]), !b.length)
      return Da();
    for (d = b[0], e = 1; e < b.length; ++e)
      (!b[e].isValid() || b[e][a](d)) && (d = b[e]);
    return d;
  }
  function Fa() {
    var a = [].slice.call(arguments, 0);
    return Ea('isBefore', a);
  }
  function Ga() {
    var a = [].slice.call(arguments, 0);
    return Ea('isAfter', a);
  }
  function Ha(a) {
    var b = B(a), c = b.year || 0, d = b.quarter || 0, e = b.month || 0, f = b.week || 0, g = b.day || 0, h = b.hour || 0, i = b.minute || 0, j = b.second || 0, k = b.millisecond || 0;
    this._milliseconds = +k + 1000 * j + 60000 * i + 3600000 * h, this._days = +g + 7 * f, this._months = +e + 3 * d + 12 * c, this._data = {}, this._locale = y(), this._bubble();
  }
  function Ia(a) {
    return a instanceof Ha;
  }
  function Ja(a, b) {
    H(a, 0, 0, function () {
      var a = this.utcOffset(), c = '+';
      return 0 > a && (a = -a, c = '-'), c + G(~~(a / 60), 2) + b + G(~~a % 60, 2);
    });
  }
  function Ka(a) {
    var b = (a || '').match(ad) || [], c = b[b.length - 1] || [], d = (c + '').match(xd) || [
        '-',
        0,
        0
      ], e = +(60 * d[1]) + q(d[2]);
    return '+' === d[0] ? e : -e;
  }
  function La(b, c) {
    var e, f;
    return c._isUTC ? (e = c.clone(), f = (o(b) || d(b) ? +b : +Da(b)) - +e, e._d.setTime(+e._d + f), a.updateOffset(e, !1), e) : Da(b).local();
  }
  function Ma(a) {
    return 15 * -Math.round(a._d.getTimezoneOffset() / 15);
  }
  function Na(b, c) {
    var d, e = this._offset || 0;
    return null != b ? ('string' == typeof b && (b = Ka(b)), Math.abs(b) < 16 && (b = 60 * b), !this._isUTC && c && (d = Ma(this)), this._offset = b, this._isUTC = !0, null != d && this.add(d, 'm'), e !== b && (!c || this._changeInProgress ? bb(this, Ya(b - e, 'm'), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, a.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? e : Ma(this);
  }
  function Oa(a, b) {
    return null != a ? ('string' != typeof a && (a = -a), this.utcOffset(a, b), this) : -this.utcOffset();
  }
  function Pa(a) {
    return this.utcOffset(0, a);
  }
  function Qa(a) {
    return this._isUTC && (this.utcOffset(0, a), this._isUTC = !1, a && this.subtract(Ma(this), 'm')), this;
  }
  function Ra() {
    return this._tzm ? this.utcOffset(this._tzm) : 'string' == typeof this._i && this.utcOffset(Ka(this._i)), this;
  }
  function Sa(a) {
    return a = a ? Da(a).utcOffset() : 0, (this.utcOffset() - a) % 60 === 0;
  }
  function Ta() {
    return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
  }
  function Ua() {
    if ('undefined' != typeof this._isDSTShifted)
      return this._isDSTShifted;
    var a = {};
    if (m(a, this), a = Aa(a), a._a) {
      var b = a._isUTC ? h(a._a) : Da(a._a);
      this._isDSTShifted = this.isValid() && r(a._a, b.toArray()) > 0;
    } else
      this._isDSTShifted = !1;
    return this._isDSTShifted;
  }
  function Va() {
    return !this._isUTC;
  }
  function Wa() {
    return this._isUTC;
  }
  function Xa() {
    return this._isUTC && 0 === this._offset;
  }
  function Ya(a, b) {
    var c, d, e, g = a, h = null;
    return Ia(a) ? g = {
      ms: a._milliseconds,
      d: a._days,
      M: a._months
    } : 'number' == typeof a ? (g = {}, b ? g[b] = a : g.milliseconds = a) : (h = yd.exec(a)) ? (c = '-' === h[1] ? -1 : 1, g = {
      y: 0,
      d: q(h[hd]) * c,
      h: q(h[id]) * c,
      m: q(h[jd]) * c,
      s: q(h[kd]) * c,
      ms: q(h[ld]) * c
    }) : (h = zd.exec(a)) ? (c = '-' === h[1] ? -1 : 1, g = {
      y: Za(h[2], c),
      M: Za(h[3], c),
      d: Za(h[4], c),
      h: Za(h[5], c),
      m: Za(h[6], c),
      s: Za(h[7], c),
      w: Za(h[8], c)
    }) : null == g ? g = {} : 'object' == typeof g && ('from' in g || 'to' in g) && (e = _a(Da(g.from), Da(g.to)), g = {}, g.ms = e.milliseconds, g.M = e.months), d = new Ha(g), Ia(a) && f(a, '_locale') && (d._locale = a._locale), d;
  }
  function Za(a, b) {
    var c = a && parseFloat(a.replace(',', '.'));
    return (isNaN(c) ? 0 : c) * b;
  }
  function $a(a, b) {
    var c = {
        milliseconds: 0,
        months: 0
      };
    return c.months = b.month() - a.month() + 12 * (b.year() - a.year()), a.clone().add(c.months, 'M').isAfter(b) && --c.months, c.milliseconds = +b - +a.clone().add(c.months, 'M'), c;
  }
  function _a(a, b) {
    var c;
    return b = La(b, a), a.isBefore(b) ? c = $a(a, b) : (c = $a(b, a), c.milliseconds = -c.milliseconds, c.months = -c.months), c;
  }
  function ab(a, b) {
    return function (c, d) {
      var e, f;
      return null === d || isNaN(+d) || (ba(b, 'moment().' + b + '(period, number) is deprecated. Please use moment().' + b + '(number, period).'), f = c, c = d, d = f), c = 'string' == typeof c ? +c : c, e = Ya(c, d), bb(this, e, a), this;
    };
  }
  function bb(b, c, d, e) {
    var f = c._milliseconds, g = c._days, h = c._months;
    e = null == e ? !0 : e, f && b._d.setTime(+b._d + f * d), g && E(b, 'Date', D(b, 'Date') + g * d), h && X(b, D(b, 'Month') + h * d), e && a.updateOffset(b, g || h);
  }
  function cb(a, b) {
    var c = a || Da(), d = La(c, this).startOf('day'), e = this.diff(d, 'days', !0), f = -6 > e ? 'sameElse' : -1 > e ? 'lastWeek' : 0 > e ? 'lastDay' : 1 > e ? 'sameDay' : 2 > e ? 'nextDay' : 7 > e ? 'nextWeek' : 'sameElse';
    return this.format(b && b[f] || this.localeData().calendar(f, this, Da(c)));
  }
  function db() {
    return new n(this);
  }
  function eb(a, b) {
    var c;
    return b = A('undefined' != typeof b ? b : 'millisecond'), 'millisecond' === b ? (a = o(a) ? a : Da(a), +this > +a) : (c = o(a) ? +a : +Da(a), c < +this.clone().startOf(b));
  }
  function fb(a, b) {
    var c;
    return b = A('undefined' != typeof b ? b : 'millisecond'), 'millisecond' === b ? (a = o(a) ? a : Da(a), +a > +this) : (c = o(a) ? +a : +Da(a), +this.clone().endOf(b) < c);
  }
  function gb(a, b, c) {
    return this.isAfter(a, c) && this.isBefore(b, c);
  }
  function hb(a, b) {
    var c;
    return b = A(b || 'millisecond'), 'millisecond' === b ? (a = o(a) ? a : Da(a), +this === +a) : (c = +Da(a), +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b));
  }
  function ib(a, b, c) {
    var d, e, f = La(a, this), g = 60000 * (f.utcOffset() - this.utcOffset());
    return b = A(b), 'year' === b || 'month' === b || 'quarter' === b ? (e = jb(this, f), 'quarter' === b ? e /= 3 : 'year' === b && (e /= 12)) : (d = this - f, e = 'second' === b ? d / 1000 : 'minute' === b ? d / 60000 : 'hour' === b ? d / 3600000 : 'day' === b ? (d - g) / 86400000 : 'week' === b ? (d - g) / 604800000 : d), c ? e : p(e);
  }
  function jb(a, b) {
    var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, 'months');
    return 0 > b - f ? (c = a.clone().add(e - 1, 'months'), d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, 'months'), d = (b - f) / (c - f)), -(e + d);
  }
  function kb() {
    return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }
  function lb() {
    var a = this.clone().utc();
    return 0 < a.year() && a.year() <= 9999 ? 'function' == typeof Date.prototype.toISOString ? this.toDate().toISOString() : K(a, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]') : K(a, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
  }
  function mb(b) {
    var c = K(this, b || a.defaultFormat);
    return this.localeData().postformat(c);
  }
  function nb(a, b) {
    return this.isValid() ? Ya({
      to: this,
      from: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }
  function ob(a) {
    return this.from(Da(), a);
  }
  function pb(a, b) {
    return this.isValid() ? Ya({
      from: this,
      to: a
    }).locale(this.locale()).humanize(!b) : this.localeData().invalidDate();
  }
  function qb(a) {
    return this.to(Da(), a);
  }
  function rb(a) {
    var b;
    return void 0 === a ? this._locale._abbr : (b = y(a), null != b && (this._locale = b), this);
  }
  function sb() {
    return this._locale;
  }
  function tb(a) {
    switch (a = A(a)) {
    case 'year':
      this.month(0);
    case 'quarter':
    case 'month':
      this.date(1);
    case 'week':
    case 'isoWeek':
    case 'day':
      this.hours(0);
    case 'hour':
      this.minutes(0);
    case 'minute':
      this.seconds(0);
    case 'second':
      this.milliseconds(0);
    }
    return 'week' === a && this.weekday(0), 'isoWeek' === a && this.isoWeekday(1), 'quarter' === a && this.month(3 * Math.floor(this.month() / 3)), this;
  }
  function ub(a) {
    return a = A(a), void 0 === a || 'millisecond' === a ? this : this.startOf(a).add(1, 'isoWeek' === a ? 'week' : a).subtract(1, 'ms');
  }
  function vb() {
    return +this._d - 60000 * (this._offset || 0);
  }
  function wb() {
    return Math.floor(+this / 1000);
  }
  function xb() {
    return this._offset ? new Date(+this) : this._d;
  }
  function yb() {
    var a = this;
    return [
      a.year(),
      a.month(),
      a.date(),
      a.hour(),
      a.minute(),
      a.second(),
      a.millisecond()
    ];
  }
  function zb() {
    var a = this;
    return {
      years: a.year(),
      months: a.month(),
      date: a.date(),
      hours: a.hours(),
      minutes: a.minutes(),
      seconds: a.seconds(),
      milliseconds: a.milliseconds()
    };
  }
  function Ab() {
    return k(this);
  }
  function Bb() {
    return g({}, j(this));
  }
  function Cb() {
    return j(this).overflow;
  }
  function Db(a, b) {
    H(0, [
      a,
      a.length
    ], 0, b);
  }
  function Eb(a, b, c) {
    return ja(Da([
      a,
      11,
      31 + b - c
    ]), b, c).week;
  }
  function Fb(a) {
    var b = ja(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
    return null == a ? b : this.add(a - b, 'y');
  }
  function Gb(a) {
    var b = ja(this, 1, 4).year;
    return null == a ? b : this.add(a - b, 'y');
  }
  function Hb() {
    return Eb(this.year(), 1, 4);
  }
  function Ib() {
    var a = this.localeData()._week;
    return Eb(this.year(), a.dow, a.doy);
  }
  function Jb(a) {
    return null == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3);
  }
  function Kb(a, b) {
    return 'string' != typeof a ? a : isNaN(a) ? (a = b.weekdaysParse(a), 'number' == typeof a ? a : null) : parseInt(a, 10);
  }
  function Lb(a) {
    return this._weekdays[a.day()];
  }
  function Mb(a) {
    return this._weekdaysShort[a.day()];
  }
  function Nb(a) {
    return this._weekdaysMin[a.day()];
  }
  function Ob(a) {
    var b, c, d;
    for (this._weekdaysParse = this._weekdaysParse || [], b = 0; 7 > b; b++)
      if (this._weekdaysParse[b] || (c = Da([
          2000,
          1
        ]).day(b), d = '^' + this.weekdays(c, '') + '|^' + this.weekdaysShort(c, '') + '|^' + this.weekdaysMin(c, ''), this._weekdaysParse[b] = new RegExp(d.replace('.', ''), 'i')), this._weekdaysParse[b].test(a))
        return b;
  }
  function Pb(a) {
    var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
    return null != a ? (a = Kb(a, this.localeData()), this.add(a - b, 'd')) : b;
  }
  function Qb(a) {
    var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
    return null == a ? b : this.add(a - b, 'd');
  }
  function Rb(a) {
    return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7);
  }
  function Sb(a, b) {
    H(a, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), b);
    });
  }
  function Tb(a, b) {
    return b._meridiemParse;
  }
  function Ub(a) {
    return 'p' === (a + '').toLowerCase().charAt(0);
  }
  function Vb(a, b, c) {
    return a > 11 ? c ? 'pm' : 'PM' : c ? 'am' : 'AM';
  }
  function Wb(a, b) {
    b[ld] = q(1000 * ('0.' + a));
  }
  function Xb() {
    return this._isUTC ? 'UTC' : '';
  }
  function Yb() {
    return this._isUTC ? 'Coordinated Universal Time' : '';
  }
  function Zb(a) {
    return Da(1000 * a);
  }
  function $b() {
    return Da.apply(null, arguments).parseZone();
  }
  function _b(a, b, c) {
    var d = this._calendar[a];
    return 'function' == typeof d ? d.call(b, c) : d;
  }
  function ac(a) {
    var b = this._longDateFormat[a], c = this._longDateFormat[a.toUpperCase()];
    return b || !c ? b : (this._longDateFormat[a] = c.replace(/MMMM|MM|DD|dddd/g, function (a) {
      return a.slice(1);
    }), this._longDateFormat[a]);
  }
  function bc() {
    return this._invalidDate;
  }
  function cc(a) {
    return this._ordinal.replace('%d', a);
  }
  function dc(a) {
    return a;
  }
  function ec(a, b, c, d) {
    var e = this._relativeTime[c];
    return 'function' == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a);
  }
  function fc(a, b) {
    var c = this._relativeTime[a > 0 ? 'future' : 'past'];
    return 'function' == typeof c ? c(b) : c.replace(/%s/i, b);
  }
  function gc(a) {
    var b, c;
    for (c in a)
      b = a[c], 'function' == typeof b ? this[c] = b : this['_' + c] = b;
    this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + /\d{1,2}/.source);
  }
  function hc(a, b, c, d) {
    var e = y(), f = h().set(d, b);
    return e[c](f, a);
  }
  function ic(a, b, c, d, e) {
    if ('number' == typeof a && (b = a, a = void 0), a = a || '', null != b)
      return hc(a, b, c, e);
    var f, g = [];
    for (f = 0; d > f; f++)
      g[f] = hc(a, f, c, e);
    return g;
  }
  function jc(a, b) {
    return ic(a, b, 'months', 12, 'month');
  }
  function kc(a, b) {
    return ic(a, b, 'monthsShort', 12, 'month');
  }
  function lc(a, b) {
    return ic(a, b, 'weekdays', 7, 'day');
  }
  function mc(a, b) {
    return ic(a, b, 'weekdaysShort', 7, 'day');
  }
  function nc(a, b) {
    return ic(a, b, 'weekdaysMin', 7, 'day');
  }
  function oc() {
    var a = this._data;
    return this._milliseconds = Wd(this._milliseconds), this._days = Wd(this._days), this._months = Wd(this._months), a.milliseconds = Wd(a.milliseconds), a.seconds = Wd(a.seconds), a.minutes = Wd(a.minutes), a.hours = Wd(a.hours), a.months = Wd(a.months), a.years = Wd(a.years), this;
  }
  function pc(a, b, c, d) {
    var e = Ya(b, c);
    return a._milliseconds += d * e._milliseconds, a._days += d * e._days, a._months += d * e._months, a._bubble();
  }
  function qc(a, b) {
    return pc(this, a, b, 1);
  }
  function rc(a, b) {
    return pc(this, a, b, -1);
  }
  function sc(a) {
    return 0 > a ? Math.floor(a) : Math.ceil(a);
  }
  function tc() {
    var a, b, c, d, e, f = this._milliseconds, g = this._days, h = this._months, i = this._data;
    return f >= 0 && g >= 0 && h >= 0 || 0 >= f && 0 >= g && 0 >= h || (f += 86400000 * sc(vc(h) + g), g = 0, h = 0), i.milliseconds = f % 1000, a = p(f / 1000), i.seconds = a % 60, b = p(a / 60), i.minutes = b % 60, c = p(b / 60), i.hours = c % 24, g += p(c / 24), e = p(uc(g)), h += e, g -= sc(vc(e)), d = p(h / 12), h %= 12, i.days = g, i.months = h, i.years = d, this;
  }
  function uc(a) {
    return 4800 * a / 146097;
  }
  function vc(a) {
    return 146097 * a / 4800;
  }
  function wc(a) {
    var b, c, d = this._milliseconds;
    if (a = A(a), 'month' === a || 'year' === a)
      return b = this._days + d / 86400000, c = this._months + uc(b), 'month' === a ? c : c / 12;
    switch (b = this._days + Math.round(vc(this._months)), a) {
    case 'week':
      return b / 7 + d / 604800000;
    case 'day':
      return b + d / 86400000;
    case 'hour':
      return 24 * b + d / 3600000;
    case 'minute':
      return 1440 * b + d / 60000;
    case 'second':
      return 86400 * b + d / 1000;
    case 'millisecond':
      return Math.floor(86400000 * b) + d;
    default:
      throw new Error('Unknown unit ' + a);
    }
  }
  function xc() {
    return this._milliseconds + 86400000 * this._days + this._months % 12 * 2592000000 + 31536000000 * q(this._months / 12);
  }
  function yc(a) {
    return function () {
      return this.as(a);
    };
  }
  function zc(a) {
    return a = A(a), this[a + 's']();
  }
  function Ac(a) {
    return function () {
      return this._data[a];
    };
  }
  function Bc() {
    return p(this.days() / 7);
  }
  function Cc(a, b, c, d, e) {
    return e.relativeTime(b || 1, !!c, a, d);
  }
  function Dc(a, b, c) {
    var d = Ya(a).abs(), e = ke(d.as('s')), f = ke(d.as('m')), g = ke(d.as('h')), h = ke(d.as('d')), i = ke(d.as('M')), j = ke(d.as('y')), k = e < le.s && [
        's',
        e
      ] || 1 === f && ['m'] || f < le.m && [
        'mm',
        f
      ] || 1 === g && ['h'] || g < le.h && [
        'hh',
        g
      ] || 1 === h && ['d'] || h < le.d && [
        'dd',
        h
      ] || 1 === i && ['M'] || i < le.M && [
        'MM',
        i
      ] || 1 === j && ['y'] || [
        'yy',
        j
      ];
    return k[2] = b, k[3] = +a > 0, k[4] = c, Cc.apply(null, k);
  }
  function Ec(a, b) {
    return void 0 === le[a] ? !1 : void 0 === b ? le[a] : (le[a] = b, !0);
  }
  function Fc(a) {
    var b = this.localeData(), c = Dc(this, !a, b);
    return a && (c = b.pastFuture(+this, c)), b.postformat(c);
  }
  function Gc() {
    var a, b, c, d = me(this._milliseconds) / 1000, e = me(this._days), f = me(this._months);
    a = p(d / 60), b = p(a / 60), d %= 60, a %= 60, c = p(f / 12), f %= 12;
    var g = c, h = f, i = e, j = b, k = a, l = d, m = this.asSeconds();
    return m ? (0 > m ? '-' : '') + 'P' + (g ? g + 'Y' : '') + (h ? h + 'M' : '') + (i ? i + 'D' : '') + (j || k || l ? 'T' : '') + (j ? j + 'H' : '') + (k ? k + 'M' : '') + (l ? l + 'S' : '') : 'P0D';
  }
  var Hc, Ic, Jc = a.momentProperties = [], Kc = !1, Lc = {}, Mc = {}, Nc = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Oc = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Pc = {}, Qc = {}, Rc = /\d/, Sc = /\d\d/, Tc = /\d{3}/, Uc = /\d{4}/, Vc = /[+-]?\d{6}/, Wc = /\d\d?/, Xc = /\d{1,3}/, Yc = /\d{1,4}/, Zc = /[+-]?\d{1,6}/, $c = /\d+/, _c = /[+-]?\d+/, ad = /Z|[+-]\d\d:?\d\d/gi, bd = /[+-]?\d+(\.\d{1,3})?/, cd = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, dd = {}, ed = {}, fd = 0, gd = 1, hd = 2, id = 3, jd = 4, kd = 5, ld = 6;
  H('M', [
    'MM',
    2
  ], 'Mo', function () {
    return this.month() + 1;
  }), H('MMM', 0, 0, function (a) {
    return this.localeData().monthsShort(this, a);
  }), H('MMMM', 0, 0, function (a) {
    return this.localeData().months(this, a);
  }), z('month', 'M'), N('M', Wc), N('MM', Wc, Sc), N('MMM', cd), N('MMMM', cd), Q([
    'M',
    'MM'
  ], function (a, b) {
    b[gd] = q(a) - 1;
  }), Q([
    'MMM',
    'MMMM'
  ], function (a, b, c, d) {
    var e = c._locale.monthsParse(a, d, c._strict);
    null != e ? b[gd] = e : j(c).invalidMonth = a;
  });
  var md = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), nd = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'), od = {};
  a.suppressDeprecationWarnings = !1;
  var pd = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, qd = [
      [
        'YYYYYY-MM-DD',
        /[+-]\d{6}-\d{2}-\d{2}/
      ],
      [
        'YYYY-MM-DD',
        /\d{4}-\d{2}-\d{2}/
      ],
      [
        'GGGG-[W]WW-E',
        /\d{4}-W\d{2}-\d/
      ],
      [
        'GGGG-[W]WW',
        /\d{4}-W\d{2}/
      ],
      [
        'YYYY-DDD',
        /\d{4}-\d{3}/
      ]
    ], rd = [
      [
        'HH:mm:ss.SSSS',
        /(T| )\d\d:\d\d:\d\d\.\d+/
      ],
      [
        'HH:mm:ss',
        /(T| )\d\d:\d\d:\d\d/
      ],
      [
        'HH:mm',
        /(T| )\d\d:\d\d/
      ],
      [
        'HH',
        /(T| )\d\d/
      ]
    ], sd = /^\/?Date\((\-?\d+)/i;
  a.createFromInputFallback = aa('moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.', function (a) {
    a._d = new Date(a._i + (a._useUTC ? ' UTC' : ''));
  }), H(0, [
    'YY',
    2
  ], 0, function () {
    return this.year() % 100;
  }), H(0, [
    'YYYY',
    4
  ], 0, 'year'), H(0, [
    'YYYYY',
    5
  ], 0, 'year'), H(0, [
    'YYYYYY',
    6,
    !0
  ], 0, 'year'), z('year', 'y'), N('Y', _c), N('YY', Wc, Sc), N('YYYY', Yc, Uc), N('YYYYY', Zc, Vc), N('YYYYYY', Zc, Vc), Q([
    'YYYYY',
    'YYYYYY'
  ], fd), Q('YYYY', function (b, c) {
    c[fd] = 2 === b.length ? a.parseTwoDigitYear(b) : q(b);
  }), Q('YY', function (b, c) {
    c[fd] = a.parseTwoDigitYear(b);
  }), a.parseTwoDigitYear = function (a) {
    return q(a) + (q(a) > 68 ? 1900 : 2000);
  };
  var td = C('FullYear', !1);
  H('w', [
    'ww',
    2
  ], 'wo', 'week'), H('W', [
    'WW',
    2
  ], 'Wo', 'isoWeek'), z('week', 'w'), z('isoWeek', 'W'), N('w', Wc), N('ww', Wc, Sc), N('W', Wc), N('WW', Wc, Sc), R([
    'w',
    'ww',
    'W',
    'WW'
  ], function (a, b, c, d) {
    b[d.substr(0, 1)] = q(a);
  });
  var ud = {
      dow: 0,
      doy: 6
    };
  H('DDD', [
    'DDDD',
    3
  ], 'DDDo', 'dayOfYear'), z('dayOfYear', 'DDD'), N('DDD', Xc), N('DDDD', Tc), Q([
    'DDD',
    'DDDD'
  ], function (a, b, c) {
    c._dayOfYear = q(a);
  }), a.ISO_8601 = function () {
  };
  var vd = aa('moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548', function () {
      var a = Da.apply(null, arguments);
      return this > a ? this : a;
    }), wd = aa('moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548', function () {
      var a = Da.apply(null, arguments);
      return a > this ? this : a;
    });
  Ja('Z', ':'), Ja('ZZ', ''), N('Z', ad), N('ZZ', ad), Q([
    'Z',
    'ZZ'
  ], function (a, b, c) {
    c._useUTC = !0, c._tzm = Ka(a);
  });
  var xd = /([\+\-]|\d\d)/gi;
  a.updateOffset = function () {
  };
  var yd = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, zd = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
  Ya.fn = Ha.prototype;
  var Ad = ab(1, 'add'), Bd = ab(-1, 'subtract');
  a.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
  var Cd = aa('moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.', function (a) {
      return void 0 === a ? this.localeData() : this.locale(a);
    });
  H(0, [
    'gg',
    2
  ], 0, function () {
    return this.weekYear() % 100;
  }), H(0, [
    'GG',
    2
  ], 0, function () {
    return this.isoWeekYear() % 100;
  }), Db('gggg', 'weekYear'), Db('ggggg', 'weekYear'), Db('GGGG', 'isoWeekYear'), Db('GGGGG', 'isoWeekYear'), z('weekYear', 'gg'), z('isoWeekYear', 'GG'), N('G', _c), N('g', _c), N('GG', Wc, Sc), N('gg', Wc, Sc), N('GGGG', Yc, Uc), N('gggg', Yc, Uc), N('GGGGG', Zc, Vc), N('ggggg', Zc, Vc), R([
    'gggg',
    'ggggg',
    'GGGG',
    'GGGGG'
  ], function (a, b, c, d) {
    b[d.substr(0, 2)] = q(a);
  }), R([
    'gg',
    'GG'
  ], function (b, c, d, e) {
    c[e] = a.parseTwoDigitYear(b);
  }), H('Q', 0, 0, 'quarter'), z('quarter', 'Q'), N('Q', Rc), Q('Q', function (a, b) {
    b[gd] = 3 * (q(a) - 1);
  }), H('D', [
    'DD',
    2
  ], 'Do', 'date'), z('date', 'D'), N('D', Wc), N('DD', Wc, Sc), N('Do', function (a, b) {
    return a ? b._ordinalParse : b._ordinalParseLenient;
  }), Q([
    'D',
    'DD'
  ], hd), Q('Do', function (a, b) {
    b[hd] = q(a.match(Wc)[0], 10);
  });
  var Dd = C('Date', !0);
  H('d', 0, 'do', 'day'), H('dd', 0, 0, function (a) {
    return this.localeData().weekdaysMin(this, a);
  }), H('ddd', 0, 0, function (a) {
    return this.localeData().weekdaysShort(this, a);
  }), H('dddd', 0, 0, function (a) {
    return this.localeData().weekdays(this, a);
  }), H('e', 0, 0, 'weekday'), H('E', 0, 0, 'isoWeekday'), z('day', 'd'), z('weekday', 'e'), z('isoWeekday', 'E'), N('d', Wc), N('e', Wc), N('E', Wc), N('dd', cd), N('ddd', cd), N('dddd', cd), R([
    'dd',
    'ddd',
    'dddd'
  ], function (a, b, c) {
    var d = c._locale.weekdaysParse(a);
    null != d ? b.d = d : j(c).invalidWeekday = a;
  }), R([
    'd',
    'e',
    'E'
  ], function (a, b, c, d) {
    b[d] = q(a);
  });
  var Ed = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'), Fd = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'), Gd = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
  H('H', [
    'HH',
    2
  ], 0, 'hour'), H('h', [
    'hh',
    2
  ], 0, function () {
    return this.hours() % 12 || 12;
  }), Sb('a', !0), Sb('A', !1), z('hour', 'h'), N('a', Tb), N('A', Tb), N('H', Wc), N('h', Wc), N('HH', Wc, Sc), N('hh', Wc, Sc), Q([
    'H',
    'HH'
  ], id), Q([
    'a',
    'A'
  ], function (a, b, c) {
    c._isPm = c._locale.isPM(a), c._meridiem = a;
  }), Q([
    'h',
    'hh'
  ], function (a, b, c) {
    b[id] = q(a), j(c).bigHour = !0;
  });
  var Hd = /[ap]\.?m?\.?/i, Id = C('Hours', !0);
  H('m', [
    'mm',
    2
  ], 0, 'minute'), z('minute', 'm'), N('m', Wc), N('mm', Wc, Sc), Q([
    'm',
    'mm'
  ], jd);
  var Jd = C('Minutes', !1);
  H('s', [
    'ss',
    2
  ], 0, 'second'), z('second', 's'), N('s', Wc), N('ss', Wc, Sc), Q([
    's',
    'ss'
  ], kd);
  var Kd = C('Seconds', !1);
  H('S', 0, 0, function () {
    return ~~(this.millisecond() / 100);
  }), H(0, [
    'SS',
    2
  ], 0, function () {
    return ~~(this.millisecond() / 10);
  }), H(0, [
    'SSS',
    3
  ], 0, 'millisecond'), H(0, [
    'SSSS',
    4
  ], 0, function () {
    return 10 * this.millisecond();
  }), H(0, [
    'SSSSS',
    5
  ], 0, function () {
    return 100 * this.millisecond();
  }), H(0, [
    'SSSSSS',
    6
  ], 0, function () {
    return 1000 * this.millisecond();
  }), H(0, [
    'SSSSSSS',
    7
  ], 0, function () {
    return 10000 * this.millisecond();
  }), H(0, [
    'SSSSSSSS',
    8
  ], 0, function () {
    return 100000 * this.millisecond();
  }), H(0, [
    'SSSSSSSSS',
    9
  ], 0, function () {
    return 1000000 * this.millisecond();
  }), z('millisecond', 'ms'), N('S', Xc, Rc), N('SS', Xc, Sc), N('SSS', Xc, Tc);
  var Ld;
  for (Ld = 'SSSS'; Ld.length <= 9; Ld += 'S')
    N(Ld, $c);
  for (Ld = 'S'; Ld.length <= 9; Ld += 'S')
    Q(Ld, Wb);
  var Md = C('Milliseconds', !1);
  H('z', 0, 0, 'zoneAbbr'), H('zz', 0, 0, 'zoneName');
  var Nd = n.prototype;
  Nd.add = Ad, Nd.calendar = cb, Nd.clone = db, Nd.diff = ib, Nd.endOf = ub, Nd.format = mb, Nd.from = nb, Nd.fromNow = ob, Nd.to = pb, Nd.toNow = qb, Nd.get = F, Nd.invalidAt = Cb, Nd.isAfter = eb, Nd.isBefore = fb, Nd.isBetween = gb, Nd.isSame = hb, Nd.isValid = Ab, Nd.lang = Cd, Nd.locale = rb, Nd.localeData = sb, Nd.max = wd, Nd.min = vd, Nd.parsingFlags = Bb, Nd.set = F, Nd.startOf = tb, Nd.subtract = Bd, Nd.toArray = yb, Nd.toObject = zb, Nd.toDate = xb, Nd.toISOString = lb, Nd.toJSON = lb, Nd.toString = kb, Nd.unix = wb, Nd.valueOf = vb, Nd.year = td, Nd.isLeapYear = ia, Nd.weekYear = Fb, Nd.isoWeekYear = Gb, Nd.quarter = Nd.quarters = Jb, Nd.month = Y, Nd.daysInMonth = Z, Nd.week = Nd.weeks = na, Nd.isoWeek = Nd.isoWeeks = oa, Nd.weeksInYear = Ib, Nd.isoWeeksInYear = Hb, Nd.date = Dd, Nd.day = Nd.days = Pb, Nd.weekday = Qb, Nd.isoWeekday = Rb, Nd.dayOfYear = qa, Nd.hour = Nd.hours = Id, Nd.minute = Nd.minutes = Jd, Nd.second = Nd.seconds = Kd, Nd.millisecond = Nd.milliseconds = Md, Nd.utcOffset = Na, Nd.utc = Pa, Nd.local = Qa, Nd.parseZone = Ra, Nd.hasAlignedHourOffset = Sa, Nd.isDST = Ta, Nd.isDSTShifted = Ua, Nd.isLocal = Va, Nd.isUtcOffset = Wa, Nd.isUtc = Xa, Nd.isUTC = Xa, Nd.zoneAbbr = Xb, Nd.zoneName = Yb, Nd.dates = aa('dates accessor is deprecated. Use date instead.', Dd), Nd.months = aa('months accessor is deprecated. Use month instead', Y), Nd.years = aa('years accessor is deprecated. Use year instead', td), Nd.zone = aa('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', Oa);
  var Od = Nd, Pd = {
      sameDay: '[Today at] LT',
      nextDay: '[Tomorrow at] LT',
      nextWeek: 'dddd [at] LT',
      lastDay: '[Yesterday at] LT',
      lastWeek: '[Last] dddd [at] LT',
      sameElse: 'L'
    }, Qd = {
      LTS: 'h:mm:ss A',
      LT: 'h:mm A',
      L: 'MM/DD/YYYY',
      LL: 'MMMM D, YYYY',
      LLL: 'MMMM D, YYYY h:mm A',
      LLLL: 'dddd, MMMM D, YYYY h:mm A'
    }, Rd = 'Invalid date', Sd = '%d', Td = /\d{1,2}/, Ud = {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: 'an hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years'
    }, Vd = s.prototype;
  Vd._calendar = Pd, Vd.calendar = _b, Vd._longDateFormat = Qd, Vd.longDateFormat = ac, Vd._invalidDate = Rd, Vd.invalidDate = bc, Vd._ordinal = Sd, Vd.ordinal = cc, Vd._ordinalParse = Td, Vd.preparse = dc, Vd.postformat = dc, Vd._relativeTime = Ud, Vd.relativeTime = ec, Vd.pastFuture = fc, Vd.set = gc, Vd.months = U, Vd._months = md, Vd.monthsShort = V, Vd._monthsShort = nd, Vd.monthsParse = W, Vd.week = ka, Vd._week = ud, Vd.firstDayOfYear = ma, Vd.firstDayOfWeek = la, Vd.weekdays = Lb, Vd._weekdays = Ed, Vd.weekdaysMin = Nb, Vd._weekdaysMin = Gd, Vd.weekdaysShort = Mb, Vd._weekdaysShort = Fd, Vd.weekdaysParse = Ob, Vd.isPM = Ub, Vd._meridiemParse = Hd, Vd.meridiem = Vb, w('en', {
    ordinalParse: /\d{1,2}(th|st|nd|rd)/,
    ordinal: function (a) {
      var b = a % 10, c = 1 === q(a % 100 / 10) ? 'th' : 1 === b ? 'st' : 2 === b ? 'nd' : 3 === b ? 'rd' : 'th';
      return a + c;
    }
  }), a.lang = aa('moment.lang is deprecated. Use moment.locale instead.', w), a.langData = aa('moment.langData is deprecated. Use moment.localeData instead.', y);
  var Wd = Math.abs, Xd = yc('ms'), Yd = yc('s'), Zd = yc('m'), $d = yc('h'), _d = yc('d'), ae = yc('w'), be = yc('M'), ce = yc('y'), de = Ac('milliseconds'), ee = Ac('seconds'), fe = Ac('minutes'), ge = Ac('hours'), he = Ac('days'), ie = Ac('months'), je = Ac('years'), ke = Math.round, le = {
      s: 45,
      m: 45,
      h: 22,
      d: 26,
      M: 11
    }, me = Math.abs, ne = Ha.prototype;
  ne.abs = oc, ne.add = qc, ne.subtract = rc, ne.as = wc, ne.asMilliseconds = Xd, ne.asSeconds = Yd, ne.asMinutes = Zd, ne.asHours = $d, ne.asDays = _d, ne.asWeeks = ae, ne.asMonths = be, ne.asYears = ce, ne.valueOf = xc, ne._bubble = tc, ne.get = zc, ne.milliseconds = de, ne.seconds = ee, ne.minutes = fe, ne.hours = ge, ne.days = he, ne.weeks = Bc, ne.months = ie, ne.years = je, ne.humanize = Fc, ne.toISOString = Gc, ne.toString = Gc, ne.toJSON = Gc, ne.locale = rb, ne.localeData = sb, ne.toIsoString = aa('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', Gc), ne.lang = Cd, H('X', 0, 0, 'unix'), H('x', 0, 0, 'valueOf'), N('x', _c), N('X', bd), Q('X', function (a, b, c) {
    c._d = new Date(1000 * parseFloat(a, 10));
  }), Q('x', function (a, b, c) {
    c._d = new Date(q(a));
  }), a.version = '2.10.6', b(Da), a.fn = Od, a.min = Fa, a.max = Ga, a.utc = h, a.unix = Zb, a.months = jc, a.isDate = d, a.locale = w, a.invalid = l, a.duration = Ya, a.isMoment = o, a.weekdays = lc, a.parseZone = $b, a.localeData = y, a.isDuration = Ia, a.monthsShort = kc, a.weekdaysMin = nc, a.defineLocale = x, a.weekdaysShort = mc, a.normalizeUnits = A, a.relativeTimeThreshold = Ec;
  var oe = a;
  return oe;
});
/*! version : 4.17.37
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
!function (a) {
  'use strict';
  if ('function' == typeof define && define.amd)
    define([
      'jquery',
      'moment'
    ], a);
  else if ('object' == typeof exports)
    a(require('jquery'), require('moment'));
  else {
    if ('undefined' == typeof jQuery)
      throw 'bootstrap-datetimepicker requires jQuery to be loaded first';
    if ('undefined' == typeof moment)
      throw 'bootstrap-datetimepicker requires Moment.js to be loaded first';
    a(jQuery, moment);
  }
}(function (a, b) {
  'use strict';
  if (!b)
    throw new Error('bootstrap-datetimepicker requires Moment.js to be loaded first');
  var c = function (c, d) {
    var e, f, g, h, i, j, k, l = {}, m = !0, n = !1, o = !1, p = 0, q = [
        {
          clsName: 'days',
          navFnc: 'M',
          navStep: 1
        },
        {
          clsName: 'months',
          navFnc: 'y',
          navStep: 1
        },
        {
          clsName: 'years',
          navFnc: 'y',
          navStep: 10
        },
        {
          clsName: 'decades',
          navFnc: 'y',
          navStep: 100
        }
      ], r = [
        'days',
        'months',
        'years',
        'decades'
      ], s = [
        'top',
        'bottom',
        'auto'
      ], t = [
        'left',
        'right',
        'auto'
      ], u = [
        'default',
        'top',
        'bottom'
      ], v = {
        up: 38,
        38: 'up',
        down: 40,
        40: 'down',
        left: 37,
        37: 'left',
        right: 39,
        39: 'right',
        tab: 9,
        9: 'tab',
        escape: 27,
        27: 'escape',
        enter: 13,
        13: 'enter',
        pageUp: 33,
        33: 'pageUp',
        pageDown: 34,
        34: 'pageDown',
        shift: 16,
        16: 'shift',
        control: 17,
        17: 'control',
        space: 32,
        32: 'space',
        t: 84,
        84: 't',
        'delete': 46,
        46: 'delete'
      }, w = {}, x = function (a) {
        var c, e, f, g, h, i = !1;
        return void 0 !== b.tz && void 0 !== d.timeZone && null !== d.timeZone && '' !== d.timeZone && (i = !0), void 0 === a || null === a ? c = i ? b().tz(d.timeZone).startOf('d') : b().startOf('d') : i ? (e = b().tz(d.timeZone).utcOffset(), f = b(a, j, d.useStrict).utcOffset(), f !== e ? (g = b().tz(d.timeZone).format('Z'), h = b(a, j, d.useStrict).format('YYYY-MM-DD[T]HH:mm:ss') + g, c = b(h, j, d.useStrict).tz(d.timeZone)) : c = b(a, j, d.useStrict).tz(d.timeZone)) : c = b(a, j, d.useStrict), c;
      }, y = function (a) {
        if ('string' != typeof a || a.length > 1)
          throw new TypeError('isEnabled expects a single character string parameter');
        switch (a) {
        case 'y':
          return -1 !== i.indexOf('Y');
        case 'M':
          return -1 !== i.indexOf('M');
        case 'd':
          return -1 !== i.toLowerCase().indexOf('d');
        case 'h':
        case 'H':
          return -1 !== i.toLowerCase().indexOf('h');
        case 'm':
          return -1 !== i.indexOf('m');
        case 's':
          return -1 !== i.indexOf('s');
        default:
          return !1;
        }
      }, z = function () {
        return y('h') || y('m') || y('s');
      }, A = function () {
        return y('y') || y('M') || y('d');
      }, B = function () {
        var b = a('<thead>').append(a('<tr>').append(a('<th>').addClass('prev').attr('data-action', 'previous').append(a('<span>').addClass(d.icons.previous))).append(a('<th>').addClass('picker-switch').attr('data-action', 'pickerSwitch').attr('colspan', d.calendarWeeks ? '6' : '5')).append(a('<th>').addClass('next').attr('data-action', 'next').append(a('<span>').addClass(d.icons.next)))), c = a('<tbody>').append(a('<tr>').append(a('<td>').attr('colspan', d.calendarWeeks ? '8' : '7')));
        return [
          a('<div>').addClass('datepicker-days').append(a('<table>').addClass('table-condensed').append(b).append(a('<tbody>'))),
          a('<div>').addClass('datepicker-months').append(a('<table>').addClass('table-condensed').append(b.clone()).append(c.clone())),
          a('<div>').addClass('datepicker-years').append(a('<table>').addClass('table-condensed').append(b.clone()).append(c.clone())),
          a('<div>').addClass('datepicker-decades').append(a('<table>').addClass('table-condensed').append(b.clone()).append(c.clone()))
        ];
      }, C = function () {
        var b = a('<tr>'), c = a('<tr>'), e = a('<tr>');
        return y('h') && (b.append(a('<td>').append(a('<a>').attr({
          href: '#',
          tabindex: '-1',
          title: d.tooltips.incrementHour
        }).addClass('btn').attr('data-action', 'incrementHours').append(a('<span>').addClass(d.icons.up)))), c.append(a('<td>').append(a('<span>').addClass('timepicker-hour').attr({
          'data-time-component': 'hours',
          title: d.tooltips.pickHour
        }).attr('data-action', 'showHours'))), e.append(a('<td>').append(a('<a>').attr({
          href: '#',
          tabindex: '-1',
          title: d.tooltips.decrementHour
        }).addClass('btn').attr('data-action', 'decrementHours').append(a('<span>').addClass(d.icons.down))))), y('m') && (y('h') && (b.append(a('<td>').addClass('separator')), c.append(a('<td>').addClass('separator').html(':')), e.append(a('<td>').addClass('separator'))), b.append(a('<td>').append(a('<a>').attr({
          href: '#',
          tabindex: '-1',
          title: d.tooltips.incrementMinute
        }).addClass('btn').attr('data-action', 'incrementMinutes').append(a('<span>').addClass(d.icons.up)))), c.append(a('<td>').append(a('<span>').addClass('timepicker-minute').attr({
          'data-time-component': 'minutes',
          title: d.tooltips.pickMinute
        }).attr('data-action', 'showMinutes'))), e.append(a('<td>').append(a('<a>').attr({
          href: '#',
          tabindex: '-1',
          title: d.tooltips.decrementMinute
        }).addClass('btn').attr('data-action', 'decrementMinutes').append(a('<span>').addClass(d.icons.down))))), y('s') && (y('m') && (b.append(a('<td>').addClass('separator')), c.append(a('<td>').addClass('separator').html(':')), e.append(a('<td>').addClass('separator'))), b.append(a('<td>').append(a('<a>').attr({
          href: '#',
          tabindex: '-1',
          title: d.tooltips.incrementSecond
        }).addClass('btn').attr('data-action', 'incrementSeconds').append(a('<span>').addClass(d.icons.up)))), c.append(a('<td>').append(a('<span>').addClass('timepicker-second').attr({
          'data-time-component': 'seconds',
          title: d.tooltips.pickSecond
        }).attr('data-action', 'showSeconds'))), e.append(a('<td>').append(a('<a>').attr({
          href: '#',
          tabindex: '-1',
          title: d.tooltips.decrementSecond
        }).addClass('btn').attr('data-action', 'decrementSeconds').append(a('<span>').addClass(d.icons.down))))), h || (b.append(a('<td>').addClass('separator')), c.append(a('<td>').append(a('<button>').addClass('btn btn-primary').attr({
          'data-action': 'togglePeriod',
          tabindex: '-1',
          title: d.tooltips.togglePeriod
        }))), e.append(a('<td>').addClass('separator'))), a('<div>').addClass('timepicker-picker').append(a('<table>').addClass('table-condensed').append([
          b,
          c,
          e
        ]));
      }, D = function () {
        var b = a('<div>').addClass('timepicker-hours').append(a('<table>').addClass('table-condensed')), c = a('<div>').addClass('timepicker-minutes').append(a('<table>').addClass('table-condensed')), d = a('<div>').addClass('timepicker-seconds').append(a('<table>').addClass('table-condensed')), e = [C()];
        return y('h') && e.push(b), y('m') && e.push(c), y('s') && e.push(d), e;
      }, E = function () {
        var b = [];
        return d.showTodayButton && b.push(a('<td>').append(a('<a>').attr({
          'data-action': 'today',
          title: d.tooltips.today
        }).append(a('<span>').addClass(d.icons.today)))), !d.sideBySide && A() && z() && b.push(a('<td>').append(a('<a>').attr({
          'data-action': 'togglePicker',
          title: d.tooltips.selectTime
        }).append(a('<span>').addClass(d.icons.time)))), d.showClear && b.push(a('<td>').append(a('<a>').attr({
          'data-action': 'clear',
          title: d.tooltips.clear
        }).append(a('<span>').addClass(d.icons.clear)))), d.showClose && b.push(a('<td>').append(a('<a>').attr({
          'data-action': 'close',
          title: d.tooltips.close
        }).append(a('<span>').addClass(d.icons.close)))), a('<table>').addClass('table-condensed').append(a('<tbody>').append(a('<tr>').append(b)));
      }, F = function () {
        var b = a('<div>').addClass('bootstrap-datetimepicker-widget dropdown-menu'), c = a('<div>').addClass('datepicker').append(B()), e = a('<div>').addClass('timepicker').append(D()), f = a('<ul>').addClass('list-unstyled'), g = a('<li>').addClass('picker-switch' + (d.collapse ? ' accordion-toggle' : '')).append(E());
        return d.inline && b.removeClass('dropdown-menu'), h && b.addClass('usetwentyfour'), y('s') && !h && b.addClass('wider'), d.sideBySide && A() && z() ? (b.addClass('timepicker-sbs'), 'top' === d.toolbarPlacement && b.append(g), b.append(a('<div>').addClass('row').append(c.addClass('col-md-6')).append(e.addClass('col-md-6'))), 'bottom' === d.toolbarPlacement && b.append(g), b) : ('top' === d.toolbarPlacement && f.append(g), A() && f.append(a('<li>').addClass(d.collapse && z() ? 'collapse in' : '').append(c)), 'default' === d.toolbarPlacement && f.append(g), z() && f.append(a('<li>').addClass(d.collapse && A() ? 'collapse' : '').append(e)), 'bottom' === d.toolbarPlacement && f.append(g), b.append(f));
      }, G = function () {
        var b, e = {};
        return b = c.is('input') || d.inline ? c.data() : c.find('input').data(), b.dateOptions && b.dateOptions instanceof Object && (e = a.extend(!0, e, b.dateOptions)), a.each(d, function (a) {
          var c = 'date' + a.charAt(0).toUpperCase() + a.slice(1);
          void 0 !== b[c] && (e[a] = b[c]);
        }), e;
      }, H = function () {
        var b, e = (n || c).position(), f = (n || c).offset(), g = d.widgetPositioning.vertical, h = d.widgetPositioning.horizontal;
        if (d.widgetParent)
          b = d.widgetParent.append(o);
        else if (c.is('input'))
          b = c.after(o).parent();
        else {
          if (d.inline)
            return void (b = c.append(o));
          b = c, c.children().first().after(o);
        }
        if ('auto' === g && (g = f.top + 1.5 * o.height() >= a(window).height() + a(window).scrollTop() && o.height() + c.outerHeight() < f.top ? 'top' : 'bottom'), 'auto' === h && (h = b.width() < f.left + o.outerWidth() / 2 && f.left + o.outerWidth() > a(window).width() ? 'right' : 'left'), 'top' === g ? o.addClass('top').removeClass('bottom') : o.addClass('bottom').removeClass('top'), 'right' === h ? o.addClass('pull-right') : o.removeClass('pull-right'), 'relative' !== b.css('position') && (b = b.parents().filter(function () {
            return 'relative' === a(this).css('position');
          }).first()), 0 === b.length)
          throw new Error('datetimepicker component should be placed within a relative positioned container');
        o.css({
          top: 'top' === g ? 'auto' : e.top + c.outerHeight(),
          bottom: 'top' === g ? e.top + c.outerHeight() : 'auto',
          left: 'left' === h ? b === c ? 0 : e.left : 'auto',
          right: 'left' === h ? 'auto' : b.outerWidth() - c.outerWidth() - (b === c ? 0 : e.left)
        });
      }, I = function (a) {
        'dp.change' === a.type && (a.date && a.date.isSame(a.oldDate) || !a.date && !a.oldDate) || c.trigger(a);
      }, J = function (a) {
        'y' === a && (a = 'YYYY'), I({
          type: 'dp.update',
          change: a,
          viewDate: f.clone()
        });
      }, K = function (a) {
        o && (a && (k = Math.max(p, Math.min(3, k + a))), o.find('.datepicker > div').hide().filter('.datepicker-' + q[k].clsName).show());
      }, L = function () {
        var b = a('<tr>'), c = f.clone().startOf('w').startOf('d');
        for (d.calendarWeeks === !0 && b.append(a('<th>').addClass('cw').text('#')); c.isBefore(f.clone().endOf('w'));)
          b.append(a('<th>').addClass('dow').text(c.format('dd'))), c.add(1, 'd');
        o.find('.datepicker-days thead').append(b);
      }, M = function (a) {
        return d.disabledDates[a.format('YYYY-MM-DD')] === !0;
      }, N = function (a) {
        return d.enabledDates[a.format('YYYY-MM-DD')] === !0;
      }, O = function (a) {
        return d.disabledHours[a.format('H')] === !0;
      }, P = function (a) {
        return d.enabledHours[a.format('H')] === !0;
      }, Q = function (b, c) {
        if (!b.isValid())
          return !1;
        if (d.disabledDates && 'd' === c && M(b))
          return !1;
        if (d.enabledDates && 'd' === c && !N(b))
          return !1;
        if (d.minDate && b.isBefore(d.minDate, c))
          return !1;
        if (d.maxDate && b.isAfter(d.maxDate, c))
          return !1;
        if (d.daysOfWeekDisabled && 'd' === c && -1 !== d.daysOfWeekDisabled.indexOf(b.day()))
          return !1;
        if (d.disabledHours && ('h' === c || 'm' === c || 's' === c) && O(b))
          return !1;
        if (d.enabledHours && ('h' === c || 'm' === c || 's' === c) && !P(b))
          return !1;
        if (d.disabledTimeIntervals && ('h' === c || 'm' === c || 's' === c)) {
          var e = !1;
          if (a.each(d.disabledTimeIntervals, function () {
              return b.isBetween(this[0], this[1]) ? (e = !0, !1) : void 0;
            }), e)
            return !1;
        }
        return !0;
      }, R = function () {
        for (var b = [], c = f.clone().startOf('y').startOf('d'); c.isSame(f, 'y');)
          b.push(a('<span>').attr('data-action', 'selectMonth').addClass('month').text(c.format('MMM'))), c.add(1, 'M');
        o.find('.datepicker-months td').empty().append(b);
      }, S = function () {
        var b = o.find('.datepicker-months'), c = b.find('th'), g = b.find('tbody').find('span');
        c.eq(0).find('span').attr('title', d.tooltips.prevYear), c.eq(1).attr('title', d.tooltips.selectYear), c.eq(2).find('span').attr('title', d.tooltips.nextYear), b.find('.disabled').removeClass('disabled'), Q(f.clone().subtract(1, 'y'), 'y') || c.eq(0).addClass('disabled'), c.eq(1).text(f.year()), Q(f.clone().add(1, 'y'), 'y') || c.eq(2).addClass('disabled'), g.removeClass('active'), e.isSame(f, 'y') && !m && g.eq(e.month()).addClass('active'), g.each(function (b) {
          Q(f.clone().month(b), 'M') || a(this).addClass('disabled');
        });
      }, T = function () {
        var a = o.find('.datepicker-years'), b = a.find('th'), c = f.clone().subtract(5, 'y'), g = f.clone().add(6, 'y'), h = '';
        for (b.eq(0).find('span').attr('title', d.tooltips.prevDecade), b.eq(1).attr('title', d.tooltips.selectDecade), b.eq(2).find('span').attr('title', d.tooltips.nextDecade), a.find('.disabled').removeClass('disabled'), d.minDate && d.minDate.isAfter(c, 'y') && b.eq(0).addClass('disabled'), b.eq(1).text(c.year() + '-' + g.year()), d.maxDate && d.maxDate.isBefore(g, 'y') && b.eq(2).addClass('disabled'); !c.isAfter(g, 'y');)
          h += '<span data-action="selectYear" class="year' + (c.isSame(e, 'y') && !m ? ' active' : '') + (Q(c, 'y') ? '' : ' disabled') + '">' + c.year() + '</span>', c.add(1, 'y');
        a.find('td').html(h);
      }, U = function () {
        var a = o.find('.datepicker-decades'), c = a.find('th'), g = b({ y: f.year() - f.year() % 100 - 1 }), h = g.clone().add(100, 'y'), i = g.clone(), j = '';
        for (c.eq(0).find('span').attr('title', d.tooltips.prevCentury), c.eq(2).find('span').attr('title', d.tooltips.nextCentury), a.find('.disabled').removeClass('disabled'), (g.isSame(b({ y: 1900 })) || d.minDate && d.minDate.isAfter(g, 'y')) && c.eq(0).addClass('disabled'), c.eq(1).text(g.year() + '-' + h.year()), (g.isSame(b({ y: 2000 })) || d.maxDate && d.maxDate.isBefore(h, 'y')) && c.eq(2).addClass('disabled'); !g.isAfter(h, 'y');)
          j += '<span data-action="selectDecade" class="decade' + (g.isSame(e, 'y') ? ' active' : '') + (Q(g, 'y') ? '' : ' disabled') + '" data-selection="' + (g.year() + 6) + '">' + (g.year() + 1) + ' - ' + (g.year() + 12) + '</span>', g.add(12, 'y');
        j += '<span></span><span></span><span></span>', a.find('td').html(j), c.eq(1).text(i.year() + 1 + '-' + g.year());
      }, V = function () {
        var b, c, g, h, i = o.find('.datepicker-days'), j = i.find('th'), k = [];
        if (A()) {
          for (j.eq(0).find('span').attr('title', d.tooltips.prevMonth), j.eq(1).attr('title', d.tooltips.selectMonth), j.eq(2).find('span').attr('title', d.tooltips.nextMonth), i.find('.disabled').removeClass('disabled'), j.eq(1).text(f.format(d.dayViewHeaderFormat)), Q(f.clone().subtract(1, 'M'), 'M') || j.eq(0).addClass('disabled'), Q(f.clone().add(1, 'M'), 'M') || j.eq(2).addClass('disabled'), b = f.clone().startOf('M').startOf('w').startOf('d'), h = 0; 42 > h; h++)
            0 === b.weekday() && (c = a('<tr>'), d.calendarWeeks && c.append('<td class="cw">' + b.week() + '</td>'), k.push(c)), g = '', b.isBefore(f, 'M') && (g += ' old'), b.isAfter(f, 'M') && (g += ' new'), b.isSame(e, 'd') && !m && (g += ' active'), Q(b, 'd') || (g += ' disabled'), b.isSame(x(), 'd') && (g += ' today'), (0 === b.day() || 6 === b.day()) && (g += ' weekend'), c.append('<td data-action="selectDay" data-day="' + b.format('L') + '" class="day' + g + '">' + b.date() + '</td>'), b.add(1, 'd');
          i.find('tbody').empty().append(k), S(), T(), U();
        }
      }, W = function () {
        var b = o.find('.timepicker-hours table'), c = f.clone().startOf('d'), d = [], e = a('<tr>');
        for (f.hour() > 11 && !h && c.hour(12); c.isSame(f, 'd') && (h || f.hour() < 12 && c.hour() < 12 || f.hour() > 11);)
          c.hour() % 4 === 0 && (e = a('<tr>'), d.push(e)), e.append('<td data-action="selectHour" class="hour' + (Q(c, 'h') ? '' : ' disabled') + '">' + c.format(h ? 'HH' : 'hh') + '</td>'), c.add(1, 'h');
        b.empty().append(d);
      }, X = function () {
        for (var b = o.find('.timepicker-minutes table'), c = f.clone().startOf('h'), e = [], g = a('<tr>'), h = 1 === d.stepping ? 5 : d.stepping; f.isSame(c, 'h');)
          c.minute() % (4 * h) === 0 && (g = a('<tr>'), e.push(g)), g.append('<td data-action="selectMinute" class="minute' + (Q(c, 'm') ? '' : ' disabled') + '">' + c.format('mm') + '</td>'), c.add(h, 'm');
        b.empty().append(e);
      }, Y = function () {
        for (var b = o.find('.timepicker-seconds table'), c = f.clone().startOf('m'), d = [], e = a('<tr>'); f.isSame(c, 'm');)
          c.second() % 20 === 0 && (e = a('<tr>'), d.push(e)), e.append('<td data-action="selectSecond" class="second' + (Q(c, 's') ? '' : ' disabled') + '">' + c.format('ss') + '</td>'), c.add(5, 's');
        b.empty().append(d);
      }, Z = function () {
        var a, b, c = o.find('.timepicker span[data-time-component]');
        h || (a = o.find('.timepicker [data-action=togglePeriod]'), b = e.clone().add(e.hours() >= 12 ? -12 : 12, 'h'), a.text(e.format('A')), Q(b, 'h') ? a.removeClass('disabled') : a.addClass('disabled')), c.filter('[data-time-component=hours]').text(e.format(h ? 'HH' : 'hh')), c.filter('[data-time-component=minutes]').text(e.format('mm')), c.filter('[data-time-component=seconds]').text(e.format('ss')), W(), X(), Y();
      }, $ = function () {
        o && (V(), Z());
      }, _ = function (a) {
        var b = m ? null : e;
        return a ? (a = a.clone().locale(d.locale), 1 !== d.stepping && a.minutes(Math.round(a.minutes() / d.stepping) * d.stepping % 60).seconds(0), void (Q(a) ? (e = a, f = e.clone(), g.val(e.format(i)), c.data('date', e.format(i)), m = !1, $(), I({
          type: 'dp.change',
          date: e.clone(),
          oldDate: b
        })) : (d.keepInvalid || g.val(m ? '' : e.format(i)), I({
          type: 'dp.error',
          date: a
        })))) : (m = !0, g.val(''), c.data('date', ''), I({
          type: 'dp.change',
          date: !1,
          oldDate: b
        }), void $());
      }, aa = function () {
        var b = !1;
        return o ? (o.find('.collapse').each(function () {
          var c = a(this).data('collapse');
          return c && c.transitioning ? (b = !0, !1) : !0;
        }), b ? l : (n && n.hasClass('btn') && n.toggleClass('active'), o.hide(), a(window).off('resize', H), o.off('click', '[data-action]'), o.off('mousedown', !1), o.remove(), o = !1, I({
          type: 'dp.hide',
          date: e.clone()
        }), g.blur(), l)) : l;
      }, ba = function () {
        _(null);
      }, ca = {
        next: function () {
          var a = q[k].navFnc;
          f.add(q[k].navStep, a), V(), J(a);
        },
        previous: function () {
          var a = q[k].navFnc;
          f.subtract(q[k].navStep, a), V(), J(a);
        },
        pickerSwitch: function () {
          K(1);
        },
        selectMonth: function (b) {
          var c = a(b.target).closest('tbody').find('span').index(a(b.target));
          f.month(c), k === p ? (_(e.clone().year(f.year()).month(f.month())), d.inline || aa()) : (K(-1), V()), J('M');
        },
        selectYear: function (b) {
          var c = parseInt(a(b.target).text(), 10) || 0;
          f.year(c), k === p ? (_(e.clone().year(f.year())), d.inline || aa()) : (K(-1), V()), J('YYYY');
        },
        selectDecade: function (b) {
          var c = parseInt(a(b.target).data('selection'), 10) || 0;
          f.year(c), k === p ? (_(e.clone().year(f.year())), d.inline || aa()) : (K(-1), V()), J('YYYY');
        },
        selectDay: function (b) {
          var c = f.clone();
          a(b.target).is('.old') && c.subtract(1, 'M'), a(b.target).is('.new') && c.add(1, 'M'), _(c.date(parseInt(a(b.target).text(), 10))), z() || d.keepOpen || d.inline || aa();
        },
        incrementHours: function () {
          var a = e.clone().add(1, 'h');
          Q(a, 'h') && _(a);
        },
        incrementMinutes: function () {
          var a = e.clone().add(d.stepping, 'm');
          Q(a, 'm') && _(a);
        },
        incrementSeconds: function () {
          var a = e.clone().add(1, 's');
          Q(a, 's') && _(a);
        },
        decrementHours: function () {
          var a = e.clone().subtract(1, 'h');
          Q(a, 'h') && _(a);
        },
        decrementMinutes: function () {
          var a = e.clone().subtract(d.stepping, 'm');
          Q(a, 'm') && _(a);
        },
        decrementSeconds: function () {
          var a = e.clone().subtract(1, 's');
          Q(a, 's') && _(a);
        },
        togglePeriod: function () {
          _(e.clone().add(e.hours() >= 12 ? -12 : 12, 'h'));
        },
        togglePicker: function (b) {
          var c, e = a(b.target), f = e.closest('ul'), g = f.find('.in'), h = f.find('.collapse:not(.in)');
          if (g && g.length) {
            if (c = g.data('collapse'), c && c.transitioning)
              return;
            g.collapse ? (g.collapse('hide'), h.collapse('show')) : (g.removeClass('in'), h.addClass('in')), e.is('span') ? e.toggleClass(d.icons.time + ' ' + d.icons.date) : e.find('span').toggleClass(d.icons.time + ' ' + d.icons.date);
          }
        },
        showPicker: function () {
          o.find('.timepicker > div:not(.timepicker-picker)').hide(), o.find('.timepicker .timepicker-picker').show();
        },
        showHours: function () {
          o.find('.timepicker .timepicker-picker').hide(), o.find('.timepicker .timepicker-hours').show();
        },
        showMinutes: function () {
          o.find('.timepicker .timepicker-picker').hide(), o.find('.timepicker .timepicker-minutes').show();
        },
        showSeconds: function () {
          o.find('.timepicker .timepicker-picker').hide(), o.find('.timepicker .timepicker-seconds').show();
        },
        selectHour: function (b) {
          var c = parseInt(a(b.target).text(), 10);
          h || (e.hours() >= 12 ? 12 !== c && (c += 12) : 12 === c && (c = 0)), _(e.clone().hours(c)), ca.showPicker.call(l);
        },
        selectMinute: function (b) {
          _(e.clone().minutes(parseInt(a(b.target).text(), 10))), ca.showPicker.call(l);
        },
        selectSecond: function (b) {
          _(e.clone().seconds(parseInt(a(b.target).text(), 10))), ca.showPicker.call(l);
        },
        clear: ba,
        today: function () {
          var a = x();
          Q(a, 'd') && _(a);
        },
        close: aa
      }, da = function (b) {
        return a(b.currentTarget).is('.disabled') ? !1 : (ca[a(b.currentTarget).data('action')].apply(l, arguments), !1);
      }, ea = function () {
        var b, c = {
            year: function (a) {
              return a.month(0).date(1).hours(0).seconds(0).minutes(0);
            },
            month: function (a) {
              return a.date(1).hours(0).seconds(0).minutes(0);
            },
            day: function (a) {
              return a.hours(0).seconds(0).minutes(0);
            },
            hour: function (a) {
              return a.seconds(0).minutes(0);
            },
            minute: function (a) {
              return a.seconds(0);
            }
          };
        return g.prop('disabled') || !d.ignoreReadonly && g.prop('readonly') || o ? l : (void 0 !== g.val() && 0 !== g.val().trim().length ? _(ga(g.val().trim())) : d.useCurrent && m && (g.is('input') && 0 === g.val().trim().length || d.inline) && (b = x(), 'string' == typeof d.useCurrent && (b = c[d.useCurrent](b)), _(b)), o = F(), L(), R(), o.find('.timepicker-hours').hide(), o.find('.timepicker-minutes').hide(), o.find('.timepicker-seconds').hide(), $(), K(), a(window).on('resize', H), o.on('click', '[data-action]', da), o.on('mousedown', !1), n && n.hasClass('btn') && n.toggleClass('active'), o.show(), H(), d.focusOnShow && !g.is(':focus') && g.focus(), I({ type: 'dp.show' }), l);
      }, fa = function () {
        return o ? aa() : ea();
      }, ga = function (a) {
        return a = void 0 === d.parseInputDate ? b.isMoment(a) || a instanceof Date ? b(a) : x(a) : d.parseInputDate(a), a.locale(d.locale), a;
      }, ha = function (a) {
        var b, c, e, f, g = null, h = [], i = {}, j = a.which, k = 'p';
        w[j] = k;
        for (b in w)
          w.hasOwnProperty(b) && w[b] === k && (h.push(b), parseInt(b, 10) !== j && (i[b] = !0));
        for (b in d.keyBinds)
          if (d.keyBinds.hasOwnProperty(b) && 'function' == typeof d.keyBinds[b] && (e = b.split(' '), e.length === h.length && v[j] === e[e.length - 1])) {
            for (f = !0, c = e.length - 2; c >= 0; c--)
              if (!(v[e[c]] in i)) {
                f = !1;
                break;
              }
            if (f) {
              g = d.keyBinds[b];
              break;
            }
          }
        g && (g.call(l, o), a.stopPropagation(), a.preventDefault());
      }, ia = function (a) {
        w[a.which] = 'r', a.stopPropagation(), a.preventDefault();
      }, ja = function (b) {
        var c = a(b.target).val().trim(), d = c ? ga(c) : null;
        return _(d), b.stopImmediatePropagation(), !1;
      }, ka = function () {
        g.on({
          change: ja,
          blur: d.debug ? '' : aa,
          keydown: ha,
          keyup: ia,
          focus: d.allowInputToggle ? ea : ''
        }), c.is('input') ? g.on({ focus: ea }) : n && (n.on('click', fa), n.on('mousedown', !1));
      }, la = function () {
        g.off({
          change: ja,
          blur: blur,
          keydown: ha,
          keyup: ia,
          focus: d.allowInputToggle ? aa : ''
        }), c.is('input') ? g.off({ focus: ea }) : n && (n.off('click', fa), n.off('mousedown', !1));
      }, ma = function (b) {
        var c = {};
        return a.each(b, function () {
          var a = ga(this);
          a.isValid() && (c[a.format('YYYY-MM-DD')] = !0);
        }), Object.keys(c).length ? c : !1;
      }, na = function (b) {
        var c = {};
        return a.each(b, function () {
          c[this] = !0;
        }), Object.keys(c).length ? c : !1;
      }, oa = function () {
        var a = d.format || 'L LT';
        i = a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (a) {
          var b = e.localeData().longDateFormat(a) || a;
          return b.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (a) {
            return e.localeData().longDateFormat(a) || a;
          });
        }), j = d.extraFormats ? d.extraFormats.slice() : [], j.indexOf(a) < 0 && j.indexOf(i) < 0 && j.push(i), h = i.toLowerCase().indexOf('a') < 1 && i.replace(/\[.*?\]/g, '').indexOf('h') < 1, y('y') && (p = 2), y('M') && (p = 1), y('d') && (p = 0), k = Math.max(p, k), m || _(e);
      };
    if (l.destroy = function () {
        aa(), la(), c.removeData('DateTimePicker'), c.removeData('date');
      }, l.toggle = fa, l.show = ea, l.hide = aa, l.disable = function () {
        return aa(), n && n.hasClass('btn') && n.addClass('disabled'), g.prop('disabled', !0), l;
      }, l.enable = function () {
        return n && n.hasClass('btn') && n.removeClass('disabled'), g.prop('disabled', !1), l;
      }, l.ignoreReadonly = function (a) {
        if (0 === arguments.length)
          return d.ignoreReadonly;
        if ('boolean' != typeof a)
          throw new TypeError('ignoreReadonly () expects a boolean parameter');
        return d.ignoreReadonly = a, l;
      }, l.options = function (b) {
        if (0 === arguments.length)
          return a.extend(!0, {}, d);
        if (!(b instanceof Object))
          throw new TypeError('options() options parameter should be an object');
        return a.extend(!0, d, b), a.each(d, function (a, b) {
          if (void 0 === l[a])
            throw new TypeError('option ' + a + ' is not recognized!');
          l[a](b);
        }), l;
      }, l.date = function (a) {
        if (0 === arguments.length)
          return m ? null : e.clone();
        if (!(null === a || 'string' == typeof a || b.isMoment(a) || a instanceof Date))
          throw new TypeError('date() parameter must be one of [null, string, moment or Date]');
        return _(null === a ? null : ga(a)), l;
      }, l.format = function (a) {
        if (0 === arguments.length)
          return d.format;
        if ('string' != typeof a && ('boolean' != typeof a || a !== !1))
          throw new TypeError('format() expects a sting or boolean:false parameter ' + a);
        return d.format = a, i && oa(), l;
      }, l.timeZone = function (a) {
        return 0 === arguments.length ? d.timeZone : (d.timeZone = a, l);
      }, l.dayViewHeaderFormat = function (a) {
        if (0 === arguments.length)
          return d.dayViewHeaderFormat;
        if ('string' != typeof a)
          throw new TypeError('dayViewHeaderFormat() expects a string parameter');
        return d.dayViewHeaderFormat = a, l;
      }, l.extraFormats = function (a) {
        if (0 === arguments.length)
          return d.extraFormats;
        if (a !== !1 && !(a instanceof Array))
          throw new TypeError('extraFormats() expects an array or false parameter');
        return d.extraFormats = a, j && oa(), l;
      }, l.disabledDates = function (b) {
        if (0 === arguments.length)
          return d.disabledDates ? a.extend({}, d.disabledDates) : d.disabledDates;
        if (!b)
          return d.disabledDates = !1, $(), l;
        if (!(b instanceof Array))
          throw new TypeError('disabledDates() expects an array parameter');
        return d.disabledDates = ma(b), d.enabledDates = !1, $(), l;
      }, l.enabledDates = function (b) {
        if (0 === arguments.length)
          return d.enabledDates ? a.extend({}, d.enabledDates) : d.enabledDates;
        if (!b)
          return d.enabledDates = !1, $(), l;
        if (!(b instanceof Array))
          throw new TypeError('enabledDates() expects an array parameter');
        return d.enabledDates = ma(b), d.disabledDates = !1, $(), l;
      }, l.daysOfWeekDisabled = function (a) {
        if (0 === arguments.length)
          return d.daysOfWeekDisabled.splice(0);
        if ('boolean' == typeof a && !a)
          return d.daysOfWeekDisabled = !1, $(), l;
        if (!(a instanceof Array))
          throw new TypeError('daysOfWeekDisabled() expects an array parameter');
        if (d.daysOfWeekDisabled = a.reduce(function (a, b) {
            return b = parseInt(b, 10), b > 6 || 0 > b || isNaN(b) ? a : (-1 === a.indexOf(b) && a.push(b), a);
          }, []).sort(), d.useCurrent && !d.keepInvalid) {
          for (var b = 0; !Q(e, 'd');) {
            if (e.add(1, 'd'), 7 === b)
              throw 'Tried 7 times to find a valid date';
            b++;
          }
          _(e);
        }
        return $(), l;
      }, l.maxDate = function (a) {
        if (0 === arguments.length)
          return d.maxDate ? d.maxDate.clone() : d.maxDate;
        if ('boolean' == typeof a && a === !1)
          return d.maxDate = !1, $(), l;
        'string' == typeof a && ('now' === a || 'moment' === a) && (a = x());
        var b = ga(a);
        if (!b.isValid())
          throw new TypeError('maxDate() Could not parse date parameter: ' + a);
        if (d.minDate && b.isBefore(d.minDate))
          throw new TypeError('maxDate() date parameter is before options.minDate: ' + b.format(i));
        return d.maxDate = b, d.useCurrent && !d.keepInvalid && e.isAfter(a) && _(d.maxDate), f.isAfter(b) && (f = b.clone().subtract(d.stepping, 'm')), $(), l;
      }, l.minDate = function (a) {
        if (0 === arguments.length)
          return d.minDate ? d.minDate.clone() : d.minDate;
        if ('boolean' == typeof a && a === !1)
          return d.minDate = !1, $(), l;
        'string' == typeof a && ('now' === a || 'moment' === a) && (a = x());
        var b = ga(a);
        if (!b.isValid())
          throw new TypeError('minDate() Could not parse date parameter: ' + a);
        if (d.maxDate && b.isAfter(d.maxDate))
          throw new TypeError('minDate() date parameter is after options.maxDate: ' + b.format(i));
        return d.minDate = b, d.useCurrent && !d.keepInvalid && e.isBefore(a) && _(d.minDate), f.isBefore(b) && (f = b.clone().add(d.stepping, 'm')), $(), l;
      }, l.defaultDate = function (a) {
        if (0 === arguments.length)
          return d.defaultDate ? d.defaultDate.clone() : d.defaultDate;
        if (!a)
          return d.defaultDate = !1, l;
        'string' == typeof a && ('now' === a || 'moment' === a) && (a = x());
        var b = ga(a);
        if (!b.isValid())
          throw new TypeError('defaultDate() Could not parse date parameter: ' + a);
        if (!Q(b))
          throw new TypeError('defaultDate() date passed is invalid according to component setup validations');
        return d.defaultDate = b, (d.defaultDate && d.inline || '' === g.val().trim()) && _(d.defaultDate), l;
      }, l.locale = function (a) {
        if (0 === arguments.length)
          return d.locale;
        if (!b.localeData(a))
          throw new TypeError('locale() locale ' + a + ' is not loaded from moment locales!');
        return d.locale = a, e.locale(d.locale), f.locale(d.locale), i && oa(), o && (aa(), ea()), l;
      }, l.stepping = function (a) {
        return 0 === arguments.length ? d.stepping : (a = parseInt(a, 10), (isNaN(a) || 1 > a) && (a = 1), d.stepping = a, l);
      }, l.useCurrent = function (a) {
        var b = [
            'year',
            'month',
            'day',
            'hour',
            'minute'
          ];
        if (0 === arguments.length)
          return d.useCurrent;
        if ('boolean' != typeof a && 'string' != typeof a)
          throw new TypeError('useCurrent() expects a boolean or string parameter');
        if ('string' == typeof a && -1 === b.indexOf(a.toLowerCase()))
          throw new TypeError('useCurrent() expects a string parameter of ' + b.join(', '));
        return d.useCurrent = a, l;
      }, l.collapse = function (a) {
        if (0 === arguments.length)
          return d.collapse;
        if ('boolean' != typeof a)
          throw new TypeError('collapse() expects a boolean parameter');
        return d.collapse === a ? l : (d.collapse = a, o && (aa(), ea()), l);
      }, l.icons = function (b) {
        if (0 === arguments.length)
          return a.extend({}, d.icons);
        if (!(b instanceof Object))
          throw new TypeError('icons() expects parameter to be an Object');
        return a.extend(d.icons, b), o && (aa(), ea()), l;
      }, l.tooltips = function (b) {
        if (0 === arguments.length)
          return a.extend({}, d.tooltips);
        if (!(b instanceof Object))
          throw new TypeError('tooltips() expects parameter to be an Object');
        return a.extend(d.tooltips, b), o && (aa(), ea()), l;
      }, l.useStrict = function (a) {
        if (0 === arguments.length)
          return d.useStrict;
        if ('boolean' != typeof a)
          throw new TypeError('useStrict() expects a boolean parameter');
        return d.useStrict = a, l;
      }, l.sideBySide = function (a) {
        if (0 === arguments.length)
          return d.sideBySide;
        if ('boolean' != typeof a)
          throw new TypeError('sideBySide() expects a boolean parameter');
        return d.sideBySide = a, o && (aa(), ea()), l;
      }, l.viewMode = function (a) {
        if (0 === arguments.length)
          return d.viewMode;
        if ('string' != typeof a)
          throw new TypeError('viewMode() expects a string parameter');
        if (-1 === r.indexOf(a))
          throw new TypeError('viewMode() parameter must be one of (' + r.join(', ') + ') value');
        return d.viewMode = a, k = Math.max(r.indexOf(a), p), K(), l;
      }, l.toolbarPlacement = function (a) {
        if (0 === arguments.length)
          return d.toolbarPlacement;
        if ('string' != typeof a)
          throw new TypeError('toolbarPlacement() expects a string parameter');
        if (-1 === u.indexOf(a))
          throw new TypeError('toolbarPlacement() parameter must be one of (' + u.join(', ') + ') value');
        return d.toolbarPlacement = a, o && (aa(), ea()), l;
      }, l.widgetPositioning = function (b) {
        if (0 === arguments.length)
          return a.extend({}, d.widgetPositioning);
        if ('[object Object]' !== {}.toString.call(b))
          throw new TypeError('widgetPositioning() expects an object variable');
        if (b.horizontal) {
          if ('string' != typeof b.horizontal)
            throw new TypeError('widgetPositioning() horizontal variable must be a string');
          if (b.horizontal = b.horizontal.toLowerCase(), -1 === t.indexOf(b.horizontal))
            throw new TypeError('widgetPositioning() expects horizontal parameter to be one of (' + t.join(', ') + ')');
          d.widgetPositioning.horizontal = b.horizontal;
        }
        if (b.vertical) {
          if ('string' != typeof b.vertical)
            throw new TypeError('widgetPositioning() vertical variable must be a string');
          if (b.vertical = b.vertical.toLowerCase(), -1 === s.indexOf(b.vertical))
            throw new TypeError('widgetPositioning() expects vertical parameter to be one of (' + s.join(', ') + ')');
          d.widgetPositioning.vertical = b.vertical;
        }
        return $(), l;
      }, l.calendarWeeks = function (a) {
        if (0 === arguments.length)
          return d.calendarWeeks;
        if ('boolean' != typeof a)
          throw new TypeError('calendarWeeks() expects parameter to be a boolean value');
        return d.calendarWeeks = a, $(), l;
      }, l.showTodayButton = function (a) {
        if (0 === arguments.length)
          return d.showTodayButton;
        if ('boolean' != typeof a)
          throw new TypeError('showTodayButton() expects a boolean parameter');
        return d.showTodayButton = a, o && (aa(), ea()), l;
      }, l.showClear = function (a) {
        if (0 === arguments.length)
          return d.showClear;
        if ('boolean' != typeof a)
          throw new TypeError('showClear() expects a boolean parameter');
        return d.showClear = a, o && (aa(), ea()), l;
      }, l.widgetParent = function (b) {
        if (0 === arguments.length)
          return d.widgetParent;
        if ('string' == typeof b && (b = a(b)), null !== b && 'string' != typeof b && !(b instanceof a))
          throw new TypeError('widgetParent() expects a string or a jQuery object parameter');
        return d.widgetParent = b, o && (aa(), ea()), l;
      }, l.keepOpen = function (a) {
        if (0 === arguments.length)
          return d.keepOpen;
        if ('boolean' != typeof a)
          throw new TypeError('keepOpen() expects a boolean parameter');
        return d.keepOpen = a, l;
      }, l.focusOnShow = function (a) {
        if (0 === arguments.length)
          return d.focusOnShow;
        if ('boolean' != typeof a)
          throw new TypeError('focusOnShow() expects a boolean parameter');
        return d.focusOnShow = a, l;
      }, l.inline = function (a) {
        if (0 === arguments.length)
          return d.inline;
        if ('boolean' != typeof a)
          throw new TypeError('inline() expects a boolean parameter');
        return d.inline = a, l;
      }, l.clear = function () {
        return ba(), l;
      }, l.keyBinds = function (a) {
        return d.keyBinds = a, l;
      }, l.getMoment = function (a) {
        return x(a);
      }, l.debug = function (a) {
        if ('boolean' != typeof a)
          throw new TypeError('debug() expects a boolean parameter');
        return d.debug = a, l;
      }, l.allowInputToggle = function (a) {
        if (0 === arguments.length)
          return d.allowInputToggle;
        if ('boolean' != typeof a)
          throw new TypeError('allowInputToggle() expects a boolean parameter');
        return d.allowInputToggle = a, l;
      }, l.showClose = function (a) {
        if (0 === arguments.length)
          return d.showClose;
        if ('boolean' != typeof a)
          throw new TypeError('showClose() expects a boolean parameter');
        return d.showClose = a, l;
      }, l.keepInvalid = function (a) {
        if (0 === arguments.length)
          return d.keepInvalid;
        if ('boolean' != typeof a)
          throw new TypeError('keepInvalid() expects a boolean parameter');
        return d.keepInvalid = a, l;
      }, l.datepickerInput = function (a) {
        if (0 === arguments.length)
          return d.datepickerInput;
        if ('string' != typeof a)
          throw new TypeError('datepickerInput() expects a string parameter');
        return d.datepickerInput = a, l;
      }, l.parseInputDate = function (a) {
        if (0 === arguments.length)
          return d.parseInputDate;
        if ('function' != typeof a)
          throw new TypeError('parseInputDate() sholud be as function');
        return d.parseInputDate = a, l;
      }, l.disabledTimeIntervals = function (b) {
        if (0 === arguments.length)
          return d.disabledTimeIntervals ? a.extend({}, d.disabledTimeIntervals) : d.disabledTimeIntervals;
        if (!b)
          return d.disabledTimeIntervals = !1, $(), l;
        if (!(b instanceof Array))
          throw new TypeError('disabledTimeIntervals() expects an array parameter');
        return d.disabledTimeIntervals = b, $(), l;
      }, l.disabledHours = function (b) {
        if (0 === arguments.length)
          return d.disabledHours ? a.extend({}, d.disabledHours) : d.disabledHours;
        if (!b)
          return d.disabledHours = !1, $(), l;
        if (!(b instanceof Array))
          throw new TypeError('disabledHours() expects an array parameter');
        if (d.disabledHours = na(b), d.enabledHours = !1, d.useCurrent && !d.keepInvalid) {
          for (var c = 0; !Q(e, 'h');) {
            if (e.add(1, 'h'), 24 === c)
              throw 'Tried 24 times to find a valid date';
            c++;
          }
          _(e);
        }
        return $(), l;
      }, l.enabledHours = function (b) {
        if (0 === arguments.length)
          return d.enabledHours ? a.extend({}, d.enabledHours) : d.enabledHours;
        if (!b)
          return d.enabledHours = !1, $(), l;
        if (!(b instanceof Array))
          throw new TypeError('enabledHours() expects an array parameter');
        if (d.enabledHours = na(b), d.disabledHours = !1, d.useCurrent && !d.keepInvalid) {
          for (var c = 0; !Q(e, 'h');) {
            if (e.add(1, 'h'), 24 === c)
              throw 'Tried 24 times to find a valid date';
            c++;
          }
          _(e);
        }
        return $(), l;
      }, l.viewDate = function (a) {
        if (0 === arguments.length)
          return f.clone();
        if (!a)
          return f = e.clone(), l;
        if (!('string' == typeof a || b.isMoment(a) || a instanceof Date))
          throw new TypeError('viewDate() parameter must be one of [string, moment or Date]');
        return f = ga(a), J(), l;
      }, c.is('input'))
      g = c;
    else if (g = c.find(d.datepickerInput), 0 === g.size())
      g = c.find('input');
    else if (!g.is('input'))
      throw new Error('CSS class "' + d.datepickerInput + '" cannot be applied to non input element');
    if (c.hasClass('input-group') && (n = 0 === c.find('.datepickerbutton').size() ? c.find('.input-group-addon') : c.find('.datepickerbutton')), !d.inline && !g.is('input'))
      throw new Error('Could not initialize DateTimePicker without an input element');
    return e = x(), f = e.clone(), a.extend(!0, d, G()), l.options(d), oa(), ka(), g.prop('disabled') && l.disable(), g.is('input') && 0 !== g.val().trim().length ? _(ga(g.val().trim())) : d.defaultDate && void 0 === g.attr('placeholder') && _(d.defaultDate), d.inline && ea(), l;
  };
  a.fn.datetimepicker = function (b) {
    return this.each(function () {
      var d = a(this);
      d.data('DateTimePicker') || (b = a.extend(!0, {}, a.fn.datetimepicker.defaults, b), d.data('DateTimePicker', c(d, b)));
    });
  }, a.fn.datetimepicker.defaults = {
    timeZone: 'Etc/UTC',
    format: !1,
    dayViewHeaderFormat: 'MMMM YYYY',
    extraFormats: !1,
    stepping: 1,
    minDate: !1,
    maxDate: !1,
    useCurrent: !0,
    collapse: !0,
    locale: b.locale(),
    defaultDate: !1,
    disabledDates: !1,
    enabledDates: !1,
    icons: {
      time: 'glyphicon glyphicon-time',
      date: 'glyphicon glyphicon-calendar',
      up: 'glyphicon glyphicon-chevron-up',
      down: 'glyphicon glyphicon-chevron-down',
      previous: 'glyphicon glyphicon-chevron-left',
      next: 'glyphicon glyphicon-chevron-right',
      today: 'glyphicon glyphicon-screenshot',
      clear: 'glyphicon glyphicon-trash',
      close: 'glyphicon glyphicon-remove'
    },
    tooltips: {
      today: 'Go to today',
      clear: 'Clear selection',
      close: 'Close the picker',
      selectMonth: 'Select Month',
      prevMonth: 'Previous Month',
      nextMonth: 'Next Month',
      selectYear: 'Select Year',
      prevYear: 'Previous Year',
      nextYear: 'Next Year',
      selectDecade: 'Select Decade',
      prevDecade: 'Previous Decade',
      nextDecade: 'Next Decade',
      prevCentury: 'Previous Century',
      nextCentury: 'Next Century',
      pickHour: 'Pick Hour',
      incrementHour: 'Increment Hour',
      decrementHour: 'Decrement Hour',
      pickMinute: 'Pick Minute',
      incrementMinute: 'Increment Minute',
      decrementMinute: 'Decrement Minute',
      pickSecond: 'Pick Second',
      incrementSecond: 'Increment Second',
      decrementSecond: 'Decrement Second',
      togglePeriod: 'Toggle Period',
      selectTime: 'Select Time'
    },
    useStrict: !1,
    sideBySide: !1,
    daysOfWeekDisabled: !1,
    calendarWeeks: !1,
    viewMode: 'days',
    toolbarPlacement: 'default',
    showTodayButton: !1,
    showClear: !1,
    showClose: !1,
    widgetPositioning: {
      horizontal: 'auto',
      vertical: 'auto'
    },
    widgetParent: null,
    ignoreReadonly: !1,
    keepOpen: !1,
    focusOnShow: !0,
    inline: !1,
    keepInvalid: !1,
    datepickerInput: '.datepickerinput',
    keyBinds: {
      up: function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') ? this.date(b.clone().subtract(7, 'd')) : this.date(b.clone().add(this.stepping(), 'm'));
        }
      },
      down: function (a) {
        if (!a)
          return void this.show();
        var b = this.date() || this.getMoment();
        a.find('.datepicker').is(':visible') ? this.date(b.clone().add(7, 'd')) : this.date(b.clone().subtract(this.stepping(), 'm'));
      },
      'control up': function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') ? this.date(b.clone().subtract(1, 'y')) : this.date(b.clone().add(1, 'h'));
        }
      },
      'control down': function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') ? this.date(b.clone().add(1, 'y')) : this.date(b.clone().subtract(1, 'h'));
        }
      },
      left: function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') && this.date(b.clone().subtract(1, 'd'));
        }
      },
      right: function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') && this.date(b.clone().add(1, 'd'));
        }
      },
      pageUp: function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') && this.date(b.clone().subtract(1, 'M'));
        }
      },
      pageDown: function (a) {
        if (a) {
          var b = this.date() || this.getMoment();
          a.find('.datepicker').is(':visible') && this.date(b.clone().add(1, 'M'));
        }
      },
      enter: function () {
        this.hide();
      },
      escape: function () {
        this.hide();
      },
      'control space': function (a) {
        a.find('.timepicker').is(':visible') && a.find('.btn[data-action="togglePeriod"]').click();
      },
      t: function () {
        this.date(this.getMoment());
      },
      'delete': function () {
        this.clear();
      }
    },
    debug: !1,
    allowInputToggle: !1,
    disabledTimeIntervals: !1,
    disabledHours: !1,
    enabledHours: !1,
    viewDate: !1
  };
});
/*!
Waypoints - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function () {
  'use strict';
  function t(o) {
    if (!o)
      throw new Error('No options passed to Waypoint constructor');
    if (!o.element)
      throw new Error('No element option passed to Waypoint constructor');
    if (!o.handler)
      throw new Error('No handler option passed to Waypoint constructor');
    this.key = 'waypoint-' + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? 'horizontal' : 'vertical', this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1;
  }
  var e = 0, i = {};
  t.prototype.queueTrigger = function (t) {
    this.group.queueTrigger(this, t);
  }, t.prototype.trigger = function (t) {
    this.enabled && this.callback && this.callback.apply(this, t);
  }, t.prototype.destroy = function () {
    this.context.remove(this), this.group.remove(this), delete i[this.key];
  }, t.prototype.disable = function () {
    return this.enabled = !1, this;
  }, t.prototype.enable = function () {
    return this.context.refresh(), this.enabled = !0, this;
  }, t.prototype.next = function () {
    return this.group.next(this);
  }, t.prototype.previous = function () {
    return this.group.previous(this);
  }, t.invokeAll = function (t) {
    var e = [];
    for (var o in i)
      e.push(i[o]);
    for (var n = 0, r = e.length; r > n; n++)
      e[n][t]();
  }, t.destroyAll = function () {
    t.invokeAll('destroy');
  }, t.disableAll = function () {
    t.invokeAll('disable');
  }, t.enableAll = function () {
    t.invokeAll('enable');
  }, t.refreshAll = function () {
    t.Context.refreshAll();
  }, t.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  }, t.viewportWidth = function () {
    return document.documentElement.clientWidth;
  }, t.adapters = [], t.defaults = {
    context: window,
    continuous: !0,
    enabled: !0,
    group: 'default',
    horizontal: !1,
    offset: 0
  }, t.offsetAliases = {
    'bottom-in-view': function () {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    'right-in-view': function () {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  }, window.Waypoint = t;
}(), function () {
  'use strict';
  function t(t) {
    window.setTimeout(t, 1000 / 60);
  }
  function e(t) {
    this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = 'waypoint-context-' + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    }, this.waypoints = {
      vertical: {},
      horizontal: {}
    }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, this.createThrottledScrollHandler(), this.createThrottledResizeHandler();
  }
  var i = 0, o = {}, n = window.Waypoint, r = window.onload;
  e.prototype.add = function (t) {
    var e = t.options.horizontal ? 'horizontal' : 'vertical';
    this.waypoints[e][t.key] = t, this.refresh();
  }, e.prototype.checkEmpty = function () {
    var t = this.Adapter.isEmptyObject(this.waypoints.horizontal), e = this.Adapter.isEmptyObject(this.waypoints.vertical);
    t && e && (this.adapter.off('.waypoints'), delete o[this.key]);
  }, e.prototype.createThrottledResizeHandler = function () {
    function t() {
      e.handleResize(), e.didResize = !1;
    }
    var e = this;
    this.adapter.on('resize.waypoints', function () {
      e.didResize || (e.didResize = !0, n.requestAnimationFrame(t));
    });
  }, e.prototype.createThrottledScrollHandler = function () {
    function t() {
      e.handleScroll(), e.didScroll = !1;
    }
    var e = this;
    this.adapter.on('scroll.waypoints', function () {
      (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t));
    });
  }, e.prototype.handleResize = function () {
    n.Context.refreshAll();
  }, e.prototype.handleScroll = function () {
    var t = {}, e = {
        horizontal: {
          newScroll: this.adapter.scrollLeft(),
          oldScroll: this.oldScroll.x,
          forward: 'right',
          backward: 'left'
        },
        vertical: {
          newScroll: this.adapter.scrollTop(),
          oldScroll: this.oldScroll.y,
          forward: 'down',
          backward: 'up'
        }
      };
    for (var i in e) {
      var o = e[i], n = o.newScroll > o.oldScroll, r = n ? o.forward : o.backward;
      for (var s in this.waypoints[i]) {
        var a = this.waypoints[i][s], l = o.oldScroll < a.triggerPoint, h = o.newScroll >= a.triggerPoint, p = l && h, u = !l && !h;
        (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group);
      }
    }
    for (var c in t)
      t[c].flushTriggers();
    this.oldScroll = {
      x: e.horizontal.newScroll,
      y: e.vertical.newScroll
    };
  }, e.prototype.innerHeight = function () {
    return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight();
  }, e.prototype.remove = function (t) {
    delete this.waypoints[t.axis][t.key], this.checkEmpty();
  }, e.prototype.innerWidth = function () {
    return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth();
  }, e.prototype.destroy = function () {
    var t = [];
    for (var e in this.waypoints)
      for (var i in this.waypoints[e])
        t.push(this.waypoints[e][i]);
    for (var o = 0, n = t.length; n > o; o++)
      t[o].destroy();
  }, e.prototype.refresh = function () {
    var t, e = this.element == this.element.window, i = e ? void 0 : this.adapter.offset(), o = {};
    this.handleScroll(), t = {
      horizontal: {
        contextOffset: e ? 0 : i.left,
        contextScroll: e ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: e ? 0 : i.top,
        contextScroll: e ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    };
    for (var r in t) {
      var s = t[r];
      for (var a in this.waypoints[r]) {
        var l, h, p, u, c, d = this.waypoints[r][a], f = d.options.offset, w = d.triggerPoint, y = 0, g = null == w;
        d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), 'function' == typeof f ? f = f.apply(d) : 'string' == typeof f && (f = parseFloat(f), d.options.offset.indexOf('%') > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = y + l - f, h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group);
      }
    }
    return n.requestAnimationFrame(function () {
      for (var t in o)
        o[t].flushTriggers();
    }), this;
  }, e.findOrCreateByElement = function (t) {
    return e.findByElement(t) || new e(t);
  }, e.refreshAll = function () {
    for (var t in o)
      o[t].refresh();
  }, e.findByElement = function (t) {
    return o[t.waypointContextKey];
  }, window.onload = function () {
    r && r(), e.refreshAll();
  }, n.requestAnimationFrame = function (e) {
    var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
    i.call(window, e);
  }, n.Context = e;
}(), function () {
  'use strict';
  function t(t, e) {
    return t.triggerPoint - e.triggerPoint;
  }
  function e(t, e) {
    return e.triggerPoint - t.triggerPoint;
  }
  function i(t) {
    this.name = t.name, this.axis = t.axis, this.id = this.name + '-' + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this;
  }
  var o = {
      vertical: {},
      horizontal: {}
    }, n = window.Waypoint;
  i.prototype.add = function (t) {
    this.waypoints.push(t);
  }, i.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  }, i.prototype.flushTriggers = function () {
    for (var i in this.triggerQueues) {
      var o = this.triggerQueues[i], n = 'up' === i || 'left' === i;
      o.sort(n ? e : t);
      for (var r = 0, s = o.length; s > r; r += 1) {
        var a = o[r];
        (a.options.continuous || r === o.length - 1) && a.trigger([i]);
      }
    }
    this.clearTriggerQueues();
  }, i.prototype.next = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints), o = i === this.waypoints.length - 1;
    return o ? null : this.waypoints[i + 1];
  }, i.prototype.previous = function (e) {
    this.waypoints.sort(t);
    var i = n.Adapter.inArray(e, this.waypoints);
    return i ? this.waypoints[i - 1] : null;
  }, i.prototype.queueTrigger = function (t, e) {
    this.triggerQueues[e].push(t);
  }, i.prototype.remove = function (t) {
    var e = n.Adapter.inArray(t, this.waypoints);
    e > -1 && this.waypoints.splice(e, 1);
  }, i.prototype.first = function () {
    return this.waypoints[0];
  }, i.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  }, i.findOrCreate = function (t) {
    return o[t.axis][t.name] || new i(t);
  }, n.Group = i;
}(), function () {
  'use strict';
  function t(t) {
    this.$element = e(t);
  }
  var e = window.jQuery, i = window.Waypoint;
  e.each([
    'innerHeight',
    'innerWidth',
    'off',
    'offset',
    'on',
    'outerHeight',
    'outerWidth',
    'scrollLeft',
    'scrollTop'
  ], function (e, i) {
    t.prototype[i] = function () {
      var t = Array.prototype.slice.call(arguments);
      return this.$element[i].apply(this.$element, t);
    };
  }), e.each([
    'extend',
    'inArray',
    'isEmptyObject'
  ], function (i, o) {
    t[o] = e[o];
  }), i.adapters.push({
    name: 'jquery',
    Adapter: t
  }), i.Adapter = t;
}(), function () {
  'use strict';
  function t(t) {
    return function () {
      var i = [], o = arguments[0];
      return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function () {
        var n = t.extend({}, o, { element: this });
        'string' == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n));
      }), i;
    };
  }
  var e = window.Waypoint;
  window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
}();
/*!
Waypoints Sticky Element Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function () {
  'use strict';
  function t(s) {
    this.options = e.extend({}, i.defaults, t.defaults, s), this.element = this.options.element, this.$element = e(this.element), this.createWrapper(), this.createWaypoint();
  }
  var e = window.jQuery, i = window.Waypoint;
  t.prototype.createWaypoint = function () {
    var t = this.options.handler;
    this.waypoint = new i(e.extend({}, this.options, {
      element: this.wrapper,
      handler: e.proxy(function (e) {
        var i = this.options.direction.indexOf(e) > -1, s = i ? this.$element.outerHeight(!0) : '';
        this.$wrapper.height(s), this.$element.toggleClass(this.options.stuckClass, i), t && t.call(this, e);
      }, this)
    }));
  }, t.prototype.createWrapper = function () {
    this.options.wrapper && this.$element.wrap(this.options.wrapper), this.$wrapper = this.$element.parent(), this.wrapper = this.$wrapper[0];
  }, t.prototype.destroy = function () {
    this.$element.parent()[0] === this.wrapper && (this.waypoint.destroy(), this.$element.removeClass(this.options.stuckClass), this.options.wrapper && this.$element.unwrap());
  }, t.defaults = {
    wrapper: '<div class="sticky-wrapper" />',
    stuckClass: 'stuck',
    direction: 'down right'
  }, i.Sticky = t;
}();
/*!
Waypoints Inview Shortcut - 4.0.0
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function () {
  'use strict';
  function t() {
  }
  function e(t) {
    this.options = i.Adapter.extend({}, e.defaults, t), this.axis = this.options.horizontal ? 'horizontal' : 'vertical', this.waypoints = [], this.element = this.options.element, this.createWaypoints();
  }
  var i = window.Waypoint;
  e.prototype.createWaypoints = function () {
    for (var t = {
          vertical: [
            {
              down: 'enter',
              up: 'exited',
              offset: '100%'
            },
            {
              down: 'entered',
              up: 'exit',
              offset: 'bottom-in-view'
            },
            {
              down: 'exit',
              up: 'entered',
              offset: 0
            },
            {
              down: 'exited',
              up: 'enter',
              offset: function () {
                return -this.adapter.outerHeight();
              }
            }
          ],
          horizontal: [
            {
              right: 'enter',
              left: 'exited',
              offset: '100%'
            },
            {
              right: 'entered',
              left: 'exit',
              offset: 'right-in-view'
            },
            {
              right: 'exit',
              left: 'entered',
              offset: 0
            },
            {
              right: 'exited',
              left: 'enter',
              offset: function () {
                return -this.adapter.outerWidth();
              }
            }
          ]
        }, e = 0, i = t[this.axis].length; i > e; e++) {
      var n = t[this.axis][e];
      this.createWaypoint(n);
    }
  }, e.prototype.createWaypoint = function (t) {
    var e = this;
    this.waypoints.push(new i({
      context: this.options.context,
      element: this.options.element,
      enabled: this.options.enabled,
      handler: function (t) {
        return function (i) {
          e.options[t[i]].call(e, i);
        };
      }(t),
      offset: t.offset,
      horizontal: this.options.horizontal
    }));
  }, e.prototype.destroy = function () {
    for (var t = 0, e = this.waypoints.length; e > t; t++)
      this.waypoints[t].destroy();
    this.waypoints = [];
  }, e.prototype.disable = function () {
    for (var t = 0, e = this.waypoints.length; e > t; t++)
      this.waypoints[t].disable();
  }, e.prototype.enable = function () {
    for (var t = 0, e = this.waypoints.length; e > t; t++)
      this.waypoints[t].enable();
  }, e.defaults = {
    context: window,
    enabled: !0,
    enter: t,
    entered: t,
    exit: t,
    exited: t
  }, i.Inview = e;
}();
/*!
 DataTables 1.10.12
 ©2008-2015 SpryMedia Ltd - datatables.net/license
*/
(function (h) {
  'function' === typeof define && define.amd ? define(['jquery'], function (D) {
    return h(D, window, document);
  }) : 'object' === typeof exports ? module.exports = function (D, I) {
    D || (D = window);
    I || (I = 'undefined' !== typeof window ? require('jquery') : require('jquery')(D));
    return h(I, D, D.document);
  } : h(jQuery, window, document);
}(function (h, D, I, k) {
  function X(a) {
    var b, c, d = {};
    h.each(a, function (e) {
      if ((b = e.match(/^([^A-Z]+?)([A-Z])/)) && -1 !== 'a aa ai ao as b fn i m o s '.indexOf(b[1] + ' '))
        c = e.replace(b[0], b[2].toLowerCase()), d[c] = e, 'o' === b[1] && X(a[e]);
    });
    a._hungarianMap = d;
  }
  function K(a, b, c) {
    a._hungarianMap || X(a);
    var d;
    h.each(b, function (e) {
      d = a._hungarianMap[e];
      if (d !== k && (c || b[d] === k))
        'o' === d.charAt(0) ? (b[d] || (b[d] = {}), h.extend(!0, b[d], b[e]), K(a[d], b[d], c)) : b[d] = b[e];
    });
  }
  function Da(a) {
    var b = m.defaults.oLanguage, c = a.sZeroRecords;
    !a.sEmptyTable && (c && 'No data available in table' === b.sEmptyTable) && E(a, a, 'sZeroRecords', 'sEmptyTable');
    !a.sLoadingRecords && (c && 'Loading...' === b.sLoadingRecords) && E(a, a, 'sZeroRecords', 'sLoadingRecords');
    a.sInfoThousands && (a.sThousands = a.sInfoThousands);
    (a = a.sDecimal) && db(a);
  }
  function eb(a) {
    A(a, 'ordering', 'bSort');
    A(a, 'orderMulti', 'bSortMulti');
    A(a, 'orderClasses', 'bSortClasses');
    A(a, 'orderCellsTop', 'bSortCellsTop');
    A(a, 'order', 'aaSorting');
    A(a, 'orderFixed', 'aaSortingFixed');
    A(a, 'paging', 'bPaginate');
    A(a, 'pagingType', 'sPaginationType');
    A(a, 'pageLength', 'iDisplayLength');
    A(a, 'searching', 'bFilter');
    'boolean' === typeof a.sScrollX && (a.sScrollX = a.sScrollX ? '100%' : '');
    'boolean' === typeof a.scrollX && (a.scrollX = a.scrollX ? '100%' : '');
    if (a = a.aoSearchCols)
      for (var b = 0, c = a.length; b < c; b++)
        a[b] && K(m.models.oSearch, a[b]);
  }
  function fb(a) {
    A(a, 'orderable', 'bSortable');
    A(a, 'orderData', 'aDataSort');
    A(a, 'orderSequence', 'asSorting');
    A(a, 'orderDataType', 'sortDataType');
    var b = a.aDataSort;
    b && !h.isArray(b) && (a.aDataSort = [b]);
  }
  function gb(a) {
    if (!m.__browser) {
      var b = {};
      m.__browser = b;
      var c = h('<div/>').css({
          position: 'fixed',
          top: 0,
          left: 0,
          height: 1,
          width: 1,
          overflow: 'hidden'
        }).append(h('<div/>').css({
          position: 'absolute',
          top: 1,
          left: 1,
          width: 100,
          overflow: 'scroll'
        }).append(h('<div/>').css({
          width: '100%',
          height: 10
        }))).appendTo('body'), d = c.children(), e = d.children();
      b.barWidth = d[0].offsetWidth - d[0].clientWidth;
      b.bScrollOversize = 100 === e[0].offsetWidth && 100 !== d[0].clientWidth;
      b.bScrollbarLeft = 1 !== Math.round(e.offset().left);
      b.bBounding = c[0].getBoundingClientRect().width ? !0 : !1;
      c.remove();
    }
    h.extend(a.oBrowser, m.__browser);
    a.oScroll.iBarWidth = m.__browser.barWidth;
  }
  function hb(a, b, c, d, e, f) {
    var g, j = !1;
    c !== k && (g = c, j = !0);
    for (; d !== e;)
      a.hasOwnProperty(d) && (g = j ? b(g, a[d], d, a) : a[d], j = !0, d += f);
    return g;
  }
  function Ea(a, b) {
    var c = m.defaults.column, d = a.aoColumns.length, c = h.extend({}, m.models.oColumn, c, {
        nTh: b ? b : I.createElement('th'),
        sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : '',
        aDataSort: c.aDataSort ? c.aDataSort : [d],
        mData: c.mData ? c.mData : d,
        idx: d
      });
    a.aoColumns.push(c);
    c = a.aoPreSearchCols;
    c[d] = h.extend({}, m.models.oSearch, c[d]);
    ja(a, d, h(b).data());
  }
  function ja(a, b, c) {
    var b = a.aoColumns[b], d = a.oClasses, e = h(b.nTh);
    if (!b.sWidthOrig) {
      b.sWidthOrig = e.attr('width') || null;
      var f = (e.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
      f && (b.sWidthOrig = f[1]);
    }
    c !== k && null !== c && (fb(c), K(m.defaults.column, c), c.mDataProp !== k && !c.mData && (c.mData = c.mDataProp), c.sType && (b._sManualType = c.sType), c.className && !c.sClass && (c.sClass = c.className), h.extend(b, c), E(b, c, 'sWidth', 'sWidthOrig'), c.iDataSort !== k && (b.aDataSort = [c.iDataSort]), E(b, c, 'aDataSort'));
    var g = b.mData, j = Q(g), i = b.mRender ? Q(b.mRender) : null, c = function (a) {
        return 'string' === typeof a && -1 !== a.indexOf('@');
      };
    b._bAttrSrc = h.isPlainObject(g) && (c(g.sort) || c(g.type) || c(g.filter));
    b._setter = null;
    b.fnGetData = function (a, b, c) {
      var d = j(a, b, k, c);
      return i && b ? i(d, b, a, c) : d;
    };
    b.fnSetData = function (a, b, c) {
      return R(g)(a, b, c);
    };
    'number' !== typeof g && (a._rowReadObject = !0);
    a.oFeatures.bSort || (b.bSortable = !1, e.addClass(d.sSortableNone));
    a = -1 !== h.inArray('asc', b.asSorting);
    c = -1 !== h.inArray('desc', b.asSorting);
    !b.bSortable || !a && !c ? (b.sSortingClass = d.sSortableNone, b.sSortingClassJUI = '') : a && !c ? (b.sSortingClass = d.sSortableAsc, b.sSortingClassJUI = d.sSortJUIAscAllowed) : !a && c ? (b.sSortingClass = d.sSortableDesc, b.sSortingClassJUI = d.sSortJUIDescAllowed) : (b.sSortingClass = d.sSortable, b.sSortingClassJUI = d.sSortJUI);
  }
  function Y(a) {
    if (!1 !== a.oFeatures.bAutoWidth) {
      var b = a.aoColumns;
      Fa(a);
      for (var c = 0, d = b.length; c < d; c++)
        b[c].nTh.style.width = b[c].sWidth;
    }
    b = a.oScroll;
    ('' !== b.sY || '' !== b.sX) && ka(a);
    u(a, null, 'column-sizing', [a]);
  }
  function Z(a, b) {
    var c = la(a, 'bVisible');
    return 'number' === typeof c[b] ? c[b] : null;
  }
  function $(a, b) {
    var c = la(a, 'bVisible'), c = h.inArray(b, c);
    return -1 !== c ? c : null;
  }
  function aa(a) {
    var b = 0;
    h.each(a.aoColumns, function (a, d) {
      d.bVisible && 'none' !== h(d.nTh).css('display') && b++;
    });
    return b;
  }
  function la(a, b) {
    var c = [];
    h.map(a.aoColumns, function (a, e) {
      a[b] && c.push(e);
    });
    return c;
  }
  function Ga(a) {
    var b = a.aoColumns, c = a.aoData, d = m.ext.type.detect, e, f, g, j, i, h, l, q, t;
    e = 0;
    for (f = b.length; e < f; e++)
      if (l = b[e], t = [], !l.sType && l._sManualType)
        l.sType = l._sManualType;
      else if (!l.sType) {
        g = 0;
        for (j = d.length; g < j; g++) {
          i = 0;
          for (h = c.length; i < h; i++) {
            t[i] === k && (t[i] = B(a, i, e, 'type'));
            q = d[g](t[i], a);
            if (!q && g !== d.length - 1)
              break;
            if ('html' === q)
              break;
          }
          if (q) {
            l.sType = q;
            break;
          }
        }
        l.sType || (l.sType = 'string');
      }
  }
  function ib(a, b, c, d) {
    var e, f, g, j, i, n, l = a.aoColumns;
    if (b)
      for (e = b.length - 1; 0 <= e; e--) {
        n = b[e];
        var q = n.targets !== k ? n.targets : n.aTargets;
        h.isArray(q) || (q = [q]);
        f = 0;
        for (g = q.length; f < g; f++)
          if ('number' === typeof q[f] && 0 <= q[f]) {
            for (; l.length <= q[f];)
              Ea(a);
            d(q[f], n);
          } else if ('number' === typeof q[f] && 0 > q[f])
            d(l.length + q[f], n);
          else if ('string' === typeof q[f]) {
            j = 0;
            for (i = l.length; j < i; j++)
              ('_all' == q[f] || h(l[j].nTh).hasClass(q[f])) && d(j, n);
          }
      }
    if (c) {
      e = 0;
      for (a = c.length; e < a; e++)
        d(e, c[e]);
    }
  }
  function N(a, b, c, d) {
    var e = a.aoData.length, f = h.extend(!0, {}, m.models.oRow, {
        src: c ? 'dom' : 'data',
        idx: e
      });
    f._aData = b;
    a.aoData.push(f);
    for (var g = a.aoColumns, j = 0, i = g.length; j < i; j++)
      g[j].sType = null;
    a.aiDisplayMaster.push(e);
    b = a.rowIdFn(b);
    b !== k && (a.aIds[b] = f);
    (c || !a.oFeatures.bDeferRender) && Ha(a, e, c, d);
    return e;
  }
  function ma(a, b) {
    var c;
    b instanceof h || (b = h(b));
    return b.map(function (b, e) {
      c = Ia(a, e);
      return N(a, c.data, e, c.cells);
    });
  }
  function B(a, b, c, d) {
    var e = a.iDraw, f = a.aoColumns[c], g = a.aoData[b]._aData, j = f.sDefaultContent, i = f.fnGetData(g, d, {
        settings: a,
        row: b,
        col: c
      });
    if (i === k)
      return a.iDrawError != e && null === j && (L(a, 0, 'Requested unknown parameter ' + ('function' == typeof f.mData ? '{function}' : '\'' + f.mData + '\'') + ' for row ' + b + ', column ' + c, 4), a.iDrawError = e), j;
    if ((i === g || null === i) && null !== j && d !== k)
      i = j;
    else if ('function' === typeof i)
      return i.call(g);
    return null === i && 'display' == d ? '' : i;
  }
  function jb(a, b, c, d) {
    a.aoColumns[c].fnSetData(a.aoData[b]._aData, d, {
      settings: a,
      row: b,
      col: c
    });
  }
  function Ja(a) {
    return h.map(a.match(/(\\.|[^\.])+/g) || [''], function (a) {
      return a.replace(/\\./g, '.');
    });
  }
  function Q(a) {
    if (h.isPlainObject(a)) {
      var b = {};
      h.each(a, function (a, c) {
        c && (b[a] = Q(c));
      });
      return function (a, c, f, g) {
        var j = b[c] || b._;
        return j !== k ? j(a, c, f, g) : a;
      };
    }
    if (null === a)
      return function (a) {
        return a;
      };
    if ('function' === typeof a)
      return function (b, c, f, g) {
        return a(b, c, f, g);
      };
    if ('string' === typeof a && (-1 !== a.indexOf('.') || -1 !== a.indexOf('[') || -1 !== a.indexOf('('))) {
      var c = function (a, b, f) {
        var g, j;
        if ('' !== f) {
          j = Ja(f);
          for (var i = 0, n = j.length; i < n; i++) {
            f = j[i].match(ba);
            g = j[i].match(U);
            if (f) {
              j[i] = j[i].replace(ba, '');
              '' !== j[i] && (a = a[j[i]]);
              g = [];
              j.splice(0, i + 1);
              j = j.join('.');
              if (h.isArray(a)) {
                i = 0;
                for (n = a.length; i < n; i++)
                  g.push(c(a[i], b, j));
              }
              a = f[0].substring(1, f[0].length - 1);
              a = '' === a ? g : g.join(a);
              break;
            } else if (g) {
              j[i] = j[i].replace(U, '');
              a = a[j[i]]();
              continue;
            }
            if (null === a || a[j[i]] === k)
              return k;
            a = a[j[i]];
          }
        }
        return a;
      };
      return function (b, e) {
        return c(b, e, a);
      };
    }
    return function (b) {
      return b[a];
    };
  }
  function R(a) {
    if (h.isPlainObject(a))
      return R(a._);
    if (null === a)
      return function () {
      };
    if ('function' === typeof a)
      return function (b, d, e) {
        a(b, 'set', d, e);
      };
    if ('string' === typeof a && (-1 !== a.indexOf('.') || -1 !== a.indexOf('[') || -1 !== a.indexOf('('))) {
      var b = function (a, d, e) {
        var e = Ja(e), f;
        f = e[e.length - 1];
        for (var g, j, i = 0, n = e.length - 1; i < n; i++) {
          g = e[i].match(ba);
          j = e[i].match(U);
          if (g) {
            e[i] = e[i].replace(ba, '');
            a[e[i]] = [];
            f = e.slice();
            f.splice(0, i + 1);
            g = f.join('.');
            if (h.isArray(d)) {
              j = 0;
              for (n = d.length; j < n; j++)
                f = {}, b(f, d[j], g), a[e[i]].push(f);
            } else
              a[e[i]] = d;
            return;
          }
          j && (e[i] = e[i].replace(U, ''), a = a[e[i]](d));
          if (null === a[e[i]] || a[e[i]] === k)
            a[e[i]] = {};
          a = a[e[i]];
        }
        if (f.match(U))
          a[f.replace(U, '')](d);
        else
          a[f.replace(ba, '')] = d;
      };
      return function (c, d) {
        return b(c, d, a);
      };
    }
    return function (b, d) {
      b[a] = d;
    };
  }
  function Ka(a) {
    return G(a.aoData, '_aData');
  }
  function na(a) {
    a.aoData.length = 0;
    a.aiDisplayMaster.length = 0;
    a.aiDisplay.length = 0;
    a.aIds = {};
  }
  function oa(a, b, c) {
    for (var d = -1, e = 0, f = a.length; e < f; e++)
      a[e] == b ? d = e : a[e] > b && a[e]--;
    -1 != d && c === k && a.splice(d, 1);
  }
  function ca(a, b, c, d) {
    var e = a.aoData[b], f, g = function (c, d) {
        for (; c.childNodes.length;)
          c.removeChild(c.firstChild);
        c.innerHTML = B(a, b, d, 'display');
      };
    if ('dom' === c || (!c || 'auto' === c) && 'dom' === e.src)
      e._aData = Ia(a, e, d, d === k ? k : e._aData).data;
    else {
      var j = e.anCells;
      if (j)
        if (d !== k)
          g(j[d], d);
        else {
          c = 0;
          for (f = j.length; c < f; c++)
            g(j[c], c);
        }
    }
    e._aSortData = null;
    e._aFilterData = null;
    g = a.aoColumns;
    if (d !== k)
      g[d].sType = null;
    else {
      c = 0;
      for (f = g.length; c < f; c++)
        g[c].sType = null;
      La(a, e);
    }
  }
  function Ia(a, b, c, d) {
    var e = [], f = b.firstChild, g, j, i = 0, n, l = a.aoColumns, q = a._rowReadObject, d = d !== k ? d : q ? {} : [], t = function (a, b) {
        if ('string' === typeof a) {
          var c = a.indexOf('@');
          -1 !== c && (c = a.substring(c + 1), R(a)(d, b.getAttribute(c)));
        }
      }, S = function (a) {
        if (c === k || c === i)
          j = l[i], n = h.trim(a.innerHTML), j && j._bAttrSrc ? (R(j.mData._)(d, n), t(j.mData.sort, a), t(j.mData.type, a), t(j.mData.filter, a)) : q ? (j._setter || (j._setter = R(j.mData)), j._setter(d, n)) : d[i] = n;
        i++;
      };
    if (f)
      for (; f;) {
        g = f.nodeName.toUpperCase();
        if ('TD' == g || 'TH' == g)
          S(f), e.push(f);
        f = f.nextSibling;
      }
    else {
      e = b.anCells;
      f = 0;
      for (g = e.length; f < g; f++)
        S(e[f]);
    }
    if (b = b.firstChild ? b : b.nTr)
      (b = b.getAttribute('id')) && R(a.rowId)(d, b);
    return {
      data: d,
      cells: e
    };
  }
  function Ha(a, b, c, d) {
    var e = a.aoData[b], f = e._aData, g = [], j, i, n, l, q;
    if (null === e.nTr) {
      j = c || I.createElement('tr');
      e.nTr = j;
      e.anCells = g;
      j._DT_RowIndex = b;
      La(a, e);
      l = 0;
      for (q = a.aoColumns.length; l < q; l++) {
        n = a.aoColumns[l];
        i = c ? d[l] : I.createElement(n.sCellType);
        i._DT_CellIndex = {
          row: b,
          column: l
        };
        g.push(i);
        if ((!c || n.mRender || n.mData !== l) && (!h.isPlainObject(n.mData) || n.mData._ !== l + '.display'))
          i.innerHTML = B(a, b, l, 'display');
        n.sClass && (i.className += ' ' + n.sClass);
        n.bVisible && !c ? j.appendChild(i) : !n.bVisible && c && i.parentNode.removeChild(i);
        n.fnCreatedCell && n.fnCreatedCell.call(a.oInstance, i, B(a, b, l), f, b, l);
      }
      u(a, 'aoRowCreatedCallback', null, [
        j,
        f,
        b
      ]);
    }
    e.nTr.setAttribute('role', 'row');
  }
  function La(a, b) {
    var c = b.nTr, d = b._aData;
    if (c) {
      var e = a.rowIdFn(d);
      e && (c.id = e);
      d.DT_RowClass && (e = d.DT_RowClass.split(' '), b.__rowc = b.__rowc ? pa(b.__rowc.concat(e)) : e, h(c).removeClass(b.__rowc.join(' ')).addClass(d.DT_RowClass));
      d.DT_RowAttr && h(c).attr(d.DT_RowAttr);
      d.DT_RowData && h(c).data(d.DT_RowData);
    }
  }
  function kb(a) {
    var b, c, d, e, f, g = a.nTHead, j = a.nTFoot, i = 0 === h('th, td', g).length, n = a.oClasses, l = a.aoColumns;
    i && (e = h('<tr/>').appendTo(g));
    b = 0;
    for (c = l.length; b < c; b++)
      f = l[b], d = h(f.nTh).addClass(f.sClass), i && d.appendTo(e), a.oFeatures.bSort && (d.addClass(f.sSortingClass), !1 !== f.bSortable && (d.attr('tabindex', a.iTabIndex).attr('aria-controls', a.sTableId), Ma(a, f.nTh, b))), f.sTitle != d[0].innerHTML && d.html(f.sTitle), Na(a, 'header')(a, d, f, n);
    i && da(a.aoHeader, g);
    h(g).find('>tr').attr('role', 'row');
    h(g).find('>tr>th, >tr>td').addClass(n.sHeaderTH);
    h(j).find('>tr>th, >tr>td').addClass(n.sFooterTH);
    if (null !== j) {
      a = a.aoFooter[0];
      b = 0;
      for (c = a.length; b < c; b++)
        f = l[b], f.nTf = a[b].cell, f.sClass && h(f.nTf).addClass(f.sClass);
    }
  }
  function ea(a, b, c) {
    var d, e, f, g = [], j = [], i = a.aoColumns.length, n;
    if (b) {
      c === k && (c = !1);
      d = 0;
      for (e = b.length; d < e; d++) {
        g[d] = b[d].slice();
        g[d].nTr = b[d].nTr;
        for (f = i - 1; 0 <= f; f--)
          !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
        j.push([]);
      }
      d = 0;
      for (e = g.length; d < e; d++) {
        if (a = g[d].nTr)
          for (; f = a.firstChild;)
            a.removeChild(f);
        f = 0;
        for (b = g[d].length; f < b; f++)
          if (n = i = 1, j[d][f] === k) {
            a.appendChild(g[d][f].cell);
            for (j[d][f] = 1; g[d + i] !== k && g[d][f].cell == g[d + i][f].cell;)
              j[d + i][f] = 1, i++;
            for (; g[d][f + n] !== k && g[d][f].cell == g[d][f + n].cell;) {
              for (c = 0; c < i; c++)
                j[d + c][f + n] = 1;
              n++;
            }
            h(g[d][f].cell).attr('rowspan', i).attr('colspan', n);
          }
      }
    }
  }
  function O(a) {
    var b = u(a, 'aoPreDrawCallback', 'preDraw', [a]);
    if (-1 !== h.inArray(!1, b))
      C(a, !1);
    else {
      var b = [], c = 0, d = a.asStripeClasses, e = d.length, f = a.oLanguage, g = a.iInitDisplayStart, j = 'ssp' == y(a), i = a.aiDisplay;
      a.bDrawing = !0;
      g !== k && -1 !== g && (a._iDisplayStart = j ? g : g >= a.fnRecordsDisplay() ? 0 : g, a.iInitDisplayStart = -1);
      var g = a._iDisplayStart, n = a.fnDisplayEnd();
      if (a.bDeferLoading)
        a.bDeferLoading = !1, a.iDraw++, C(a, !1);
      else if (j) {
        if (!a.bDestroying && !lb(a))
          return;
      } else
        a.iDraw++;
      if (0 !== i.length) {
        f = j ? a.aoData.length : n;
        for (j = j ? 0 : g; j < f; j++) {
          var l = i[j], q = a.aoData[l];
          null === q.nTr && Ha(a, l);
          l = q.nTr;
          if (0 !== e) {
            var t = d[c % e];
            q._sRowStripe != t && (h(l).removeClass(q._sRowStripe).addClass(t), q._sRowStripe = t);
          }
          u(a, 'aoRowCallback', null, [
            l,
            q._aData,
            c,
            j
          ]);
          b.push(l);
          c++;
        }
      } else
        c = f.sZeroRecords, 1 == a.iDraw && 'ajax' == y(a) ? c = f.sLoadingRecords : f.sEmptyTable && 0 === a.fnRecordsTotal() && (c = f.sEmptyTable), b[0] = h('<tr/>', { 'class': e ? d[0] : '' }).append(h('<td />', {
          valign: 'top',
          colSpan: aa(a),
          'class': a.oClasses.sRowEmpty
        }).html(c))[0];
      u(a, 'aoHeaderCallback', 'header', [
        h(a.nTHead).children('tr')[0],
        Ka(a),
        g,
        n,
        i
      ]);
      u(a, 'aoFooterCallback', 'footer', [
        h(a.nTFoot).children('tr')[0],
        Ka(a),
        g,
        n,
        i
      ]);
      d = h(a.nTBody);
      d.children().detach();
      d.append(h(b));
      u(a, 'aoDrawCallback', 'draw', [a]);
      a.bSorted = !1;
      a.bFiltered = !1;
      a.bDrawing = !1;
    }
  }
  function T(a, b) {
    var c = a.oFeatures, d = c.bFilter;
    c.bSort && mb(a);
    d ? fa(a, a.oPreviousSearch) : a.aiDisplay = a.aiDisplayMaster.slice();
    !0 !== b && (a._iDisplayStart = 0);
    a._drawHold = b;
    O(a);
    a._drawHold = !1;
  }
  function nb(a) {
    var b = a.oClasses, c = h(a.nTable), c = h('<div/>').insertBefore(c), d = a.oFeatures, e = h('<div/>', {
        id: a.sTableId + '_wrapper',
        'class': b.sWrapper + (a.nTFoot ? '' : ' ' + b.sNoFooter)
      });
    a.nHolding = c[0];
    a.nTableWrapper = e[0];
    a.nTableReinsertBefore = a.nTable.nextSibling;
    for (var f = a.sDom.split(''), g, j, i, n, l, q, t = 0; t < f.length; t++) {
      g = null;
      j = f[t];
      if ('<' == j) {
        i = h('<div/>')[0];
        n = f[t + 1];
        if ('\'' == n || '"' == n) {
          l = '';
          for (q = 2; f[t + q] != n;)
            l += f[t + q], q++;
          'H' == l ? l = b.sJUIHeader : 'F' == l && (l = b.sJUIFooter);
          -1 != l.indexOf('.') ? (n = l.split('.'), i.id = n[0].substr(1, n[0].length - 1), i.className = n[1]) : '#' == l.charAt(0) ? i.id = l.substr(1, l.length - 1) : i.className = l;
          t += q;
        }
        e.append(i);
        e = h(i);
      } else if ('>' == j)
        e = e.parent();
      else if ('l' == j && d.bPaginate && d.bLengthChange)
        g = ob(a);
      else if ('f' == j && d.bFilter)
        g = pb(a);
      else if ('r' == j && d.bProcessing)
        g = qb(a);
      else if ('t' == j)
        g = rb(a);
      else if ('i' == j && d.bInfo)
        g = sb(a);
      else if ('p' == j && d.bPaginate)
        g = tb(a);
      else if (0 !== m.ext.feature.length) {
        i = m.ext.feature;
        q = 0;
        for (n = i.length; q < n; q++)
          if (j == i[q].cFeature) {
            g = i[q].fnInit(a);
            break;
          }
      }
      g && (i = a.aanFeatures, i[j] || (i[j] = []), i[j].push(g), e.append(g));
    }
    c.replaceWith(e);
    a.nHolding = null;
  }
  function da(a, b) {
    var c = h(b).children('tr'), d, e, f, g, j, i, n, l, q, t;
    a.splice(0, a.length);
    f = 0;
    for (i = c.length; f < i; f++)
      a.push([]);
    f = 0;
    for (i = c.length; f < i; f++) {
      d = c[f];
      for (e = d.firstChild; e;) {
        if ('TD' == e.nodeName.toUpperCase() || 'TH' == e.nodeName.toUpperCase()) {
          l = 1 * e.getAttribute('colspan');
          q = 1 * e.getAttribute('rowspan');
          l = !l || 0 === l || 1 === l ? 1 : l;
          q = !q || 0 === q || 1 === q ? 1 : q;
          g = 0;
          for (j = a[f]; j[g];)
            g++;
          n = g;
          t = 1 === l ? !0 : !1;
          for (j = 0; j < l; j++)
            for (g = 0; g < q; g++)
              a[f + g][n + j] = {
                cell: e,
                unique: t
              }, a[f + g].nTr = d;
        }
        e = e.nextSibling;
      }
    }
  }
  function qa(a, b, c) {
    var d = [];
    c || (c = a.aoHeader, b && (c = [], da(c, b)));
    for (var b = 0, e = c.length; b < e; b++)
      for (var f = 0, g = c[b].length; f < g; f++)
        if (c[b][f].unique && (!d[f] || !a.bSortCellsTop))
          d[f] = c[b][f].cell;
    return d;
  }
  function ra(a, b, c) {
    u(a, 'aoServerParams', 'serverParams', [b]);
    if (b && h.isArray(b)) {
      var d = {}, e = /(.*?)\[\]$/;
      h.each(b, function (a, b) {
        var c = b.name.match(e);
        c ? (c = c[0], d[c] || (d[c] = []), d[c].push(b.value)) : d[b.name] = b.value;
      });
      b = d;
    }
    var f, g = a.ajax, j = a.oInstance, i = function (b) {
        u(a, null, 'xhr', [
          a,
          b,
          a.jqXHR
        ]);
        c(b);
      };
    if (h.isPlainObject(g) && g.data) {
      f = g.data;
      var n = h.isFunction(f) ? f(b, a) : f, b = h.isFunction(f) && n ? n : h.extend(!0, b, n);
      delete g.data;
    }
    n = {
      data: b,
      success: function (b) {
        var c = b.error || b.sError;
        c && L(a, 0, c);
        a.json = b;
        i(b);
      },
      dataType: 'json',
      cache: !1,
      type: a.sServerMethod,
      error: function (b, c) {
        var d = u(a, null, 'xhr', [
            a,
            null,
            a.jqXHR
          ]);
        -1 === h.inArray(!0, d) && ('parsererror' == c ? L(a, 0, 'Invalid JSON response', 1) : 4 === b.readyState && L(a, 0, 'Ajax error', 7));
        C(a, !1);
      }
    };
    a.oAjaxData = b;
    u(a, null, 'preXhr', [
      a,
      b
    ]);
    a.fnServerData ? a.fnServerData.call(j, a.sAjaxSource, h.map(b, function (a, b) {
      return {
        name: b,
        value: a
      };
    }), i, a) : a.sAjaxSource || 'string' === typeof g ? a.jqXHR = h.ajax(h.extend(n, { url: g || a.sAjaxSource })) : h.isFunction(g) ? a.jqXHR = g.call(j, b, i, a) : (a.jqXHR = h.ajax(h.extend(n, g)), g.data = f);
  }
  function lb(a) {
    return a.bAjaxDataGet ? (a.iDraw++, C(a, !0), ra(a, ub(a), function (b) {
      vb(a, b);
    }), !1) : !0;
  }
  function ub(a) {
    var b = a.aoColumns, c = b.length, d = a.oFeatures, e = a.oPreviousSearch, f = a.aoPreSearchCols, g, j = [], i, n, l, q = V(a);
    g = a._iDisplayStart;
    i = !1 !== d.bPaginate ? a._iDisplayLength : -1;
    var k = function (a, b) {
      j.push({
        name: a,
        value: b
      });
    };
    k('sEcho', a.iDraw);
    k('iColumns', c);
    k('sColumns', G(b, 'sName').join(','));
    k('iDisplayStart', g);
    k('iDisplayLength', i);
    var S = {
        draw: a.iDraw,
        columns: [],
        order: [],
        start: g,
        length: i,
        search: {
          value: e.sSearch,
          regex: e.bRegex
        }
      };
    for (g = 0; g < c; g++)
      n = b[g], l = f[g], i = 'function' == typeof n.mData ? 'function' : n.mData, S.columns.push({
        data: i,
        name: n.sName,
        searchable: n.bSearchable,
        orderable: n.bSortable,
        search: {
          value: l.sSearch,
          regex: l.bRegex
        }
      }), k('mDataProp_' + g, i), d.bFilter && (k('sSearch_' + g, l.sSearch), k('bRegex_' + g, l.bRegex), k('bSearchable_' + g, n.bSearchable)), d.bSort && k('bSortable_' + g, n.bSortable);
    d.bFilter && (k('sSearch', e.sSearch), k('bRegex', e.bRegex));
    d.bSort && (h.each(q, function (a, b) {
      S.order.push({
        column: b.col,
        dir: b.dir
      });
      k('iSortCol_' + a, b.col);
      k('sSortDir_' + a, b.dir);
    }), k('iSortingCols', q.length));
    b = m.ext.legacy.ajax;
    return null === b ? a.sAjaxSource ? j : S : b ? j : S;
  }
  function vb(a, b) {
    var c = sa(a, b), d = b.sEcho !== k ? b.sEcho : b.draw, e = b.iTotalRecords !== k ? b.iTotalRecords : b.recordsTotal, f = b.iTotalDisplayRecords !== k ? b.iTotalDisplayRecords : b.recordsFiltered;
    if (d) {
      if (1 * d < a.iDraw)
        return;
      a.iDraw = 1 * d;
    }
    na(a);
    a._iRecordsTotal = parseInt(e, 10);
    a._iRecordsDisplay = parseInt(f, 10);
    d = 0;
    for (e = c.length; d < e; d++)
      N(a, c[d]);
    a.aiDisplay = a.aiDisplayMaster.slice();
    a.bAjaxDataGet = !1;
    O(a);
    a._bInitComplete || ta(a, b);
    a.bAjaxDataGet = !0;
    C(a, !1);
  }
  function sa(a, b) {
    var c = h.isPlainObject(a.ajax) && a.ajax.dataSrc !== k ? a.ajax.dataSrc : a.sAjaxDataProp;
    return 'data' === c ? b.aaData || b[c] : '' !== c ? Q(c)(b) : b;
  }
  function pb(a) {
    var b = a.oClasses, c = a.sTableId, d = a.oLanguage, e = a.oPreviousSearch, f = a.aanFeatures, g = '<input type="search" class="' + b.sFilterInput + '"/>', j = d.sSearch, j = j.match(/_INPUT_/) ? j.replace('_INPUT_', g) : j + g, b = h('<div/>', {
        id: !f.f ? c + '_filter' : null,
        'class': b.sFilter
      }).append(h('<label/>').append(j)), f = function () {
        var b = !this.value ? '' : this.value;
        b != e.sSearch && (fa(a, {
          sSearch: b,
          bRegex: e.bRegex,
          bSmart: e.bSmart,
          bCaseInsensitive: e.bCaseInsensitive
        }), a._iDisplayStart = 0, O(a));
      }, g = null !== a.searchDelay ? a.searchDelay : 'ssp' === y(a) ? 400 : 0, i = h('input', b).val(e.sSearch).attr('placeholder', d.sSearchPlaceholder).bind('keyup.DT search.DT input.DT paste.DT cut.DT', g ? Oa(f, g) : f).bind('keypress.DT', function (a) {
        if (13 == a.keyCode)
          return !1;
      }).attr('aria-controls', c);
    h(a.nTable).on('search.dt.DT', function (b, c) {
      if (a === c)
        try {
          i[0] !== I.activeElement && i.val(e.sSearch);
        } catch (d) {
        }
    });
    return b[0];
  }
  function fa(a, b, c) {
    var d = a.oPreviousSearch, e = a.aoPreSearchCols, f = function (a) {
        d.sSearch = a.sSearch;
        d.bRegex = a.bRegex;
        d.bSmart = a.bSmart;
        d.bCaseInsensitive = a.bCaseInsensitive;
      };
    Ga(a);
    if ('ssp' != y(a)) {
      wb(a, b.sSearch, c, b.bEscapeRegex !== k ? !b.bEscapeRegex : b.bRegex, b.bSmart, b.bCaseInsensitive);
      f(b);
      for (b = 0; b < e.length; b++)
        xb(a, e[b].sSearch, b, e[b].bEscapeRegex !== k ? !e[b].bEscapeRegex : e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
      yb(a);
    } else
      f(b);
    a.bFiltered = !0;
    u(a, null, 'search', [a]);
  }
  function yb(a) {
    for (var b = m.ext.search, c = a.aiDisplay, d, e, f = 0, g = b.length; f < g; f++) {
      for (var j = [], i = 0, n = c.length; i < n; i++)
        e = c[i], d = a.aoData[e], b[f](a, d._aFilterData, e, d._aData, i) && j.push(e);
      c.length = 0;
      h.merge(c, j);
    }
  }
  function xb(a, b, c, d, e, f) {
    if ('' !== b)
      for (var g = a.aiDisplay, d = Pa(b, d, e, f), e = g.length - 1; 0 <= e; e--)
        b = a.aoData[g[e]]._aFilterData[c], d.test(b) || g.splice(e, 1);
  }
  function wb(a, b, c, d, e, f) {
    var d = Pa(b, d, e, f), e = a.oPreviousSearch.sSearch, f = a.aiDisplayMaster, g;
    0 !== m.ext.search.length && (c = !0);
    g = zb(a);
    if (0 >= b.length)
      a.aiDisplay = f.slice();
    else {
      if (g || c || e.length > b.length || 0 !== b.indexOf(e) || a.bSorted)
        a.aiDisplay = f.slice();
      b = a.aiDisplay;
      for (c = b.length - 1; 0 <= c; c--)
        d.test(a.aoData[b[c]]._sFilterRow) || b.splice(c, 1);
    }
  }
  function Pa(a, b, c, d) {
    a = b ? a : Qa(a);
    c && (a = '^(?=.*?' + h.map(a.match(/"[^"]+"|[^ ]+/g) || [''], function (a) {
      if ('"' === a.charAt(0))
        var b = a.match(/^"(.*)"$/), a = b ? b[1] : a;
      return a.replace('"', '');
    }).join(')(?=.*?') + ').*$');
    return RegExp(a, d ? 'i' : '');
  }
  function zb(a) {
    var b = a.aoColumns, c, d, e, f, g, j, i, h, l = m.ext.type.search;
    c = !1;
    d = 0;
    for (f = a.aoData.length; d < f; d++)
      if (h = a.aoData[d], !h._aFilterData) {
        j = [];
        e = 0;
        for (g = b.length; e < g; e++)
          c = b[e], c.bSearchable ? (i = B(a, d, e, 'filter'), l[c.sType] && (i = l[c.sType](i)), null === i && (i = ''), 'string' !== typeof i && i.toString && (i = i.toString())) : i = '', i.indexOf && -1 !== i.indexOf('&') && (ua.innerHTML = i, i = Zb ? ua.textContent : ua.innerText), i.replace && (i = i.replace(/[\r\n]/g, '')), j.push(i);
        h._aFilterData = j;
        h._sFilterRow = j.join('  ');
        c = !0;
      }
    return c;
  }
  function Ab(a) {
    return {
      search: a.sSearch,
      smart: a.bSmart,
      regex: a.bRegex,
      caseInsensitive: a.bCaseInsensitive
    };
  }
  function Bb(a) {
    return {
      sSearch: a.search,
      bSmart: a.smart,
      bRegex: a.regex,
      bCaseInsensitive: a.caseInsensitive
    };
  }
  function sb(a) {
    var b = a.sTableId, c = a.aanFeatures.i, d = h('<div/>', {
        'class': a.oClasses.sInfo,
        id: !c ? b + '_info' : null
      });
    c || (a.aoDrawCallback.push({
      fn: Cb,
      sName: 'information'
    }), d.attr('role', 'status').attr('aria-live', 'polite'), h(a.nTable).attr('aria-describedby', b + '_info'));
    return d[0];
  }
  function Cb(a) {
    var b = a.aanFeatures.i;
    if (0 !== b.length) {
      var c = a.oLanguage, d = a._iDisplayStart + 1, e = a.fnDisplayEnd(), f = a.fnRecordsTotal(), g = a.fnRecordsDisplay(), j = g ? c.sInfo : c.sInfoEmpty;
      g !== f && (j += ' ' + c.sInfoFiltered);
      j += c.sInfoPostFix;
      j = Db(a, j);
      c = c.fnInfoCallback;
      null !== c && (j = c.call(a.oInstance, a, d, e, f, g, j));
      h(b).html(j);
    }
  }
  function Db(a, b) {
    var c = a.fnFormatNumber, d = a._iDisplayStart + 1, e = a._iDisplayLength, f = a.fnRecordsDisplay(), g = -1 === e;
    return b.replace(/_START_/g, c.call(a, d)).replace(/_END_/g, c.call(a, a.fnDisplayEnd())).replace(/_MAX_/g, c.call(a, a.fnRecordsTotal())).replace(/_TOTAL_/g, c.call(a, f)).replace(/_PAGE_/g, c.call(a, g ? 1 : Math.ceil(d / e))).replace(/_PAGES_/g, c.call(a, g ? 1 : Math.ceil(f / e)));
  }
  function ga(a) {
    var b, c, d = a.iInitDisplayStart, e = a.aoColumns, f;
    c = a.oFeatures;
    var g = a.bDeferLoading;
    if (a.bInitialised) {
      nb(a);
      kb(a);
      ea(a, a.aoHeader);
      ea(a, a.aoFooter);
      C(a, !0);
      c.bAutoWidth && Fa(a);
      b = 0;
      for (c = e.length; b < c; b++)
        f = e[b], f.sWidth && (f.nTh.style.width = x(f.sWidth));
      u(a, null, 'preInit', [a]);
      T(a);
      e = y(a);
      if ('ssp' != e || g)
        'ajax' == e ? ra(a, [], function (c) {
          var f = sa(a, c);
          for (b = 0; b < f.length; b++)
            N(a, f[b]);
          a.iInitDisplayStart = d;
          T(a);
          C(a, !1);
          ta(a, c);
        }, a) : (C(a, !1), ta(a));
    } else
      setTimeout(function () {
        ga(a);
      }, 200);
  }
  function ta(a, b) {
    a._bInitComplete = !0;
    (b || a.oInit.aaData) && Y(a);
    u(a, null, 'plugin-init', [
      a,
      b
    ]);
    u(a, 'aoInitComplete', 'init', [
      a,
      b
    ]);
  }
  function Ra(a, b) {
    var c = parseInt(b, 10);
    a._iDisplayLength = c;
    Sa(a);
    u(a, null, 'length', [
      a,
      c
    ]);
  }
  function ob(a) {
    for (var b = a.oClasses, c = a.sTableId, d = a.aLengthMenu, e = h.isArray(d[0]), f = e ? d[0] : d, d = e ? d[1] : d, e = h('<select/>', {
          name: c + '_length',
          'aria-controls': c,
          'class': b.sLengthSelect
        }), g = 0, j = f.length; g < j; g++)
      e[0][g] = new Option(d[g], f[g]);
    var i = h('<div><label/></div>').addClass(b.sLength);
    a.aanFeatures.l || (i[0].id = c + '_length');
    i.children().append(a.oLanguage.sLengthMenu.replace('_MENU_', e[0].outerHTML));
    h('select', i).val(a._iDisplayLength).bind('change.DT', function () {
      Ra(a, h(this).val());
      O(a);
    });
    h(a.nTable).bind('length.dt.DT', function (b, c, d) {
      a === c && h('select', i).val(d);
    });
    return i[0];
  }
  function tb(a) {
    var b = a.sPaginationType, c = m.ext.pager[b], d = 'function' === typeof c, e = function (a) {
        O(a);
      }, b = h('<div/>').addClass(a.oClasses.sPaging + b)[0], f = a.aanFeatures;
    d || c.fnInit(a, b, e);
    f.p || (b.id = a.sTableId + '_paginate', a.aoDrawCallback.push({
      fn: function (a) {
        if (d) {
          var b = a._iDisplayStart, i = a._iDisplayLength, h = a.fnRecordsDisplay(), l = -1 === i, b = l ? 0 : Math.ceil(b / i), i = l ? 1 : Math.ceil(h / i), h = c(b, i), k, l = 0;
          for (k = f.p.length; l < k; l++)
            Na(a, 'pageButton')(a, f.p[l], l, h, b, i);
        } else
          c.fnUpdate(a, e);
      },
      sName: 'pagination'
    }));
    return b;
  }
  function Ta(a, b, c) {
    var d = a._iDisplayStart, e = a._iDisplayLength, f = a.fnRecordsDisplay();
    0 === f || -1 === e ? d = 0 : 'number' === typeof b ? (d = b * e, d > f && (d = 0)) : 'first' == b ? d = 0 : 'previous' == b ? (d = 0 <= e ? d - e : 0, 0 > d && (d = 0)) : 'next' == b ? d + e < f && (d += e) : 'last' == b ? d = Math.floor((f - 1) / e) * e : L(a, 0, 'Unknown paging action: ' + b, 5);
    b = a._iDisplayStart !== d;
    a._iDisplayStart = d;
    b && (u(a, null, 'page', [a]), c && O(a));
    return b;
  }
  function qb(a) {
    return h('<div/>', {
      id: !a.aanFeatures.r ? a.sTableId + '_processing' : null,
      'class': a.oClasses.sProcessing
    }).html(a.oLanguage.sProcessing).insertBefore(a.nTable)[0];
  }
  function C(a, b) {
    a.oFeatures.bProcessing && h(a.aanFeatures.r).css('display', b ? 'block' : 'none');
    u(a, null, 'processing', [
      a,
      b
    ]);
  }
  function rb(a) {
    var b = h(a.nTable);
    b.attr('role', 'grid');
    var c = a.oScroll;
    if ('' === c.sX && '' === c.sY)
      return a.nTable;
    var d = c.sX, e = c.sY, f = a.oClasses, g = b.children('caption'), j = g.length ? g[0]._captionSide : null, i = h(b[0].cloneNode(!1)), n = h(b[0].cloneNode(!1)), l = b.children('tfoot');
    l.length || (l = null);
    i = h('<div/>', { 'class': f.sScrollWrapper }).append(h('<div/>', { 'class': f.sScrollHead }).css({
      overflow: 'hidden',
      position: 'relative',
      border: 0,
      width: d ? !d ? null : x(d) : '100%'
    }).append(h('<div/>', { 'class': f.sScrollHeadInner }).css({
      'box-sizing': 'content-box',
      width: c.sXInner || '100%'
    }).append(i.removeAttr('id').css('margin-left', 0).append('top' === j ? g : null).append(b.children('thead'))))).append(h('<div/>', { 'class': f.sScrollBody }).css({
      position: 'relative',
      overflow: 'auto',
      width: !d ? null : x(d)
    }).append(b));
    l && i.append(h('<div/>', { 'class': f.sScrollFoot }).css({
      overflow: 'hidden',
      border: 0,
      width: d ? !d ? null : x(d) : '100%'
    }).append(h('<div/>', { 'class': f.sScrollFootInner }).append(n.removeAttr('id').css('margin-left', 0).append('bottom' === j ? g : null).append(b.children('tfoot')))));
    var b = i.children(), k = b[0], f = b[1], t = l ? b[2] : null;
    if (d)
      h(f).on('scroll.DT', function () {
        var a = this.scrollLeft;
        k.scrollLeft = a;
        l && (t.scrollLeft = a);
      });
    h(f).css(e && c.bCollapse ? 'max-height' : 'height', e);
    a.nScrollHead = k;
    a.nScrollBody = f;
    a.nScrollFoot = t;
    a.aoDrawCallback.push({
      fn: ka,
      sName: 'scrolling'
    });
    return i[0];
  }
  function ka(a) {
    var b = a.oScroll, c = b.sX, d = b.sXInner, e = b.sY, b = b.iBarWidth, f = h(a.nScrollHead), g = f[0].style, j = f.children('div'), i = j[0].style, n = j.children('table'), j = a.nScrollBody, l = h(j), q = j.style, t = h(a.nScrollFoot).children('div'), m = t.children('table'), o = h(a.nTHead), F = h(a.nTable), p = F[0], r = p.style, u = a.nTFoot ? h(a.nTFoot) : null, Eb = a.oBrowser, Ua = Eb.bScrollOversize, s = G(a.aoColumns, 'nTh'), P, v, w, y, z = [], A = [], B = [], C = [], D, E = function (a) {
        a = a.style;
        a.paddingTop = '0';
        a.paddingBottom = '0';
        a.borderTopWidth = '0';
        a.borderBottomWidth = '0';
        a.height = 0;
      };
    v = j.scrollHeight > j.clientHeight;
    if (a.scrollBarVis !== v && a.scrollBarVis !== k)
      a.scrollBarVis = v, Y(a);
    else {
      a.scrollBarVis = v;
      F.children('thead, tfoot').remove();
      u && (w = u.clone().prependTo(F), P = u.find('tr'), w = w.find('tr'));
      y = o.clone().prependTo(F);
      o = o.find('tr');
      v = y.find('tr');
      y.find('th, td').removeAttr('tabindex');
      c || (q.width = '100%', f[0].style.width = '100%');
      h.each(qa(a, y), function (b, c) {
        D = Z(a, b);
        c.style.width = a.aoColumns[D].sWidth;
      });
      u && J(function (a) {
        a.style.width = '';
      }, w);
      f = F.outerWidth();
      if ('' === c) {
        r.width = '100%';
        if (Ua && (F.find('tbody').height() > j.offsetHeight || 'scroll' == l.css('overflow-y')))
          r.width = x(F.outerWidth() - b);
        f = F.outerWidth();
      } else
        '' !== d && (r.width = x(d), f = F.outerWidth());
      J(E, v);
      J(function (a) {
        B.push(a.innerHTML);
        z.push(x(h(a).css('width')));
      }, v);
      J(function (a, b) {
        if (h.inArray(a, s) !== -1)
          a.style.width = z[b];
      }, o);
      h(v).height(0);
      u && (J(E, w), J(function (a) {
        C.push(a.innerHTML);
        A.push(x(h(a).css('width')));
      }, w), J(function (a, b) {
        a.style.width = A[b];
      }, P), h(w).height(0));
      J(function (a, b) {
        a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + B[b] + '</div>';
        a.style.width = z[b];
      }, v);
      u && J(function (a, b) {
        a.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + C[b] + '</div>';
        a.style.width = A[b];
      }, w);
      if (F.outerWidth() < f) {
        P = j.scrollHeight > j.offsetHeight || 'scroll' == l.css('overflow-y') ? f + b : f;
        if (Ua && (j.scrollHeight > j.offsetHeight || 'scroll' == l.css('overflow-y')))
          r.width = x(P - b);
        ('' === c || '' !== d) && L(a, 1, 'Possible column misalignment', 6);
      } else
        P = '100%';
      q.width = x(P);
      g.width = x(P);
      u && (a.nScrollFoot.style.width = x(P));
      !e && Ua && (q.height = x(p.offsetHeight + b));
      c = F.outerWidth();
      n[0].style.width = x(c);
      i.width = x(c);
      d = F.height() > j.clientHeight || 'scroll' == l.css('overflow-y');
      e = 'padding' + (Eb.bScrollbarLeft ? 'Left' : 'Right');
      i[e] = d ? b + 'px' : '0px';
      u && (m[0].style.width = x(c), t[0].style.width = x(c), t[0].style[e] = d ? b + 'px' : '0px');
      F.children('colgroup').insertBefore(F.children('thead'));
      l.scroll();
      if ((a.bSorted || a.bFiltered) && !a._drawHold)
        j.scrollTop = 0;
    }
  }
  function J(a, b, c) {
    for (var d = 0, e = 0, f = b.length, g, j; e < f;) {
      g = b[e].firstChild;
      for (j = c ? c[e].firstChild : null; g;)
        1 === g.nodeType && (c ? a(g, j, d) : a(g, d), d++), g = g.nextSibling, j = c ? j.nextSibling : null;
      e++;
    }
  }
  function Fa(a) {
    var b = a.nTable, c = a.aoColumns, d = a.oScroll, e = d.sY, f = d.sX, g = d.sXInner, j = c.length, i = la(a, 'bVisible'), n = h('th', a.nTHead), l = b.getAttribute('width'), k = b.parentNode, t = !1, m, o, p = a.oBrowser, d = p.bScrollOversize;
    (m = b.style.width) && -1 !== m.indexOf('%') && (l = m);
    for (m = 0; m < i.length; m++)
      o = c[i[m]], null !== o.sWidth && (o.sWidth = Fb(o.sWidthOrig, k), t = !0);
    if (d || !t && !f && !e && j == aa(a) && j == n.length)
      for (m = 0; m < j; m++)
        i = Z(a, m), null !== i && (c[i].sWidth = x(n.eq(m).width()));
    else {
      j = h(b).clone().css('visibility', 'hidden').removeAttr('id');
      j.find('tbody tr').remove();
      var r = h('<tr/>').appendTo(j.find('tbody'));
      j.find('thead, tfoot').remove();
      j.append(h(a.nTHead).clone()).append(h(a.nTFoot).clone());
      j.find('tfoot th, tfoot td').css('width', '');
      n = qa(a, j.find('thead')[0]);
      for (m = 0; m < i.length; m++)
        o = c[i[m]], n[m].style.width = null !== o.sWidthOrig && '' !== o.sWidthOrig ? x(o.sWidthOrig) : '', o.sWidthOrig && f && h(n[m]).append(h('<div/>').css({
          width: o.sWidthOrig,
          margin: 0,
          padding: 0,
          border: 0,
          height: 1
        }));
      if (a.aoData.length)
        for (m = 0; m < i.length; m++)
          t = i[m], o = c[t], h(Gb(a, t)).clone(!1).append(o.sContentPadding).appendTo(r);
      h('[name]', j).removeAttr('name');
      o = h('<div/>').css(f || e ? {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 1,
        right: 0,
        overflow: 'hidden'
      } : {}).append(j).appendTo(k);
      f && g ? j.width(g) : f ? (j.css('width', 'auto'), j.removeAttr('width'), j.width() < k.clientWidth && l && j.width(k.clientWidth)) : e ? j.width(k.clientWidth) : l && j.width(l);
      for (m = e = 0; m < i.length; m++)
        k = h(n[m]), g = k.outerWidth() - k.width(), k = p.bBounding ? Math.ceil(n[m].getBoundingClientRect().width) : k.outerWidth(), e += k, c[i[m]].sWidth = x(k - g);
      b.style.width = x(e);
      o.remove();
    }
    l && (b.style.width = x(l));
    if ((l || f) && !a._reszEvt)
      b = function () {
        h(D).bind('resize.DT-' + a.sInstance, Oa(function () {
          Y(a);
        }));
      }, d ? setTimeout(b, 1000) : b(), a._reszEvt = !0;
  }
  function Fb(a, b) {
    if (!a)
      return 0;
    var c = h('<div/>').css('width', x(a)).appendTo(b || I.body), d = c[0].offsetWidth;
    c.remove();
    return d;
  }
  function Gb(a, b) {
    var c = Hb(a, b);
    if (0 > c)
      return null;
    var d = a.aoData[c];
    return !d.nTr ? h('<td/>').html(B(a, c, b, 'display'))[0] : d.anCells[b];
  }
  function Hb(a, b) {
    for (var c, d = -1, e = -1, f = 0, g = a.aoData.length; f < g; f++)
      c = B(a, f, b, 'display') + '', c = c.replace($b, ''), c = c.replace(/&nbsp;/g, ' '), c.length > d && (d = c.length, e = f);
    return e;
  }
  function x(a) {
    return null === a ? '0px' : 'number' == typeof a ? 0 > a ? '0px' : a + 'px' : a.match(/\d$/) ? a + 'px' : a;
  }
  function V(a) {
    var b, c, d = [], e = a.aoColumns, f, g, j, i;
    b = a.aaSortingFixed;
    c = h.isPlainObject(b);
    var n = [];
    f = function (a) {
      a.length && !h.isArray(a[0]) ? n.push(a) : h.merge(n, a);
    };
    h.isArray(b) && f(b);
    c && b.pre && f(b.pre);
    f(a.aaSorting);
    c && b.post && f(b.post);
    for (a = 0; a < n.length; a++) {
      i = n[a][0];
      f = e[i].aDataSort;
      b = 0;
      for (c = f.length; b < c; b++)
        g = f[b], j = e[g].sType || 'string', n[a]._idx === k && (n[a]._idx = h.inArray(n[a][1], e[g].asSorting)), d.push({
          src: i,
          col: g,
          dir: n[a][1],
          index: n[a]._idx,
          type: j,
          formatter: m.ext.type.order[j + '-pre']
        });
    }
    return d;
  }
  function mb(a) {
    var b, c, d = [], e = m.ext.type.order, f = a.aoData, g = 0, j, i = a.aiDisplayMaster, h;
    Ga(a);
    h = V(a);
    b = 0;
    for (c = h.length; b < c; b++)
      j = h[b], j.formatter && g++, Ib(a, j.col);
    if ('ssp' != y(a) && 0 !== h.length) {
      b = 0;
      for (c = i.length; b < c; b++)
        d[i[b]] = b;
      g === h.length ? i.sort(function (a, b) {
        var c, e, g, j, i = h.length, k = f[a]._aSortData, m = f[b]._aSortData;
        for (g = 0; g < i; g++)
          if (j = h[g], c = k[j.col], e = m[j.col], c = c < e ? -1 : c > e ? 1 : 0, 0 !== c)
            return 'asc' === j.dir ? c : -c;
        c = d[a];
        e = d[b];
        return c < e ? -1 : c > e ? 1 : 0;
      }) : i.sort(function (a, b) {
        var c, g, j, i, k = h.length, m = f[a]._aSortData, p = f[b]._aSortData;
        for (j = 0; j < k; j++)
          if (i = h[j], c = m[i.col], g = p[i.col], i = e[i.type + '-' + i.dir] || e['string-' + i.dir], c = i(c, g), 0 !== c)
            return c;
        c = d[a];
        g = d[b];
        return c < g ? -1 : c > g ? 1 : 0;
      });
    }
    a.bSorted = !0;
  }
  function Jb(a) {
    for (var b, c, d = a.aoColumns, e = V(a), a = a.oLanguage.oAria, f = 0, g = d.length; f < g; f++) {
      c = d[f];
      var j = c.asSorting;
      b = c.sTitle.replace(/<.*?>/g, '');
      var i = c.nTh;
      i.removeAttribute('aria-sort');
      c.bSortable && (0 < e.length && e[0].col == f ? (i.setAttribute('aria-sort', 'asc' == e[0].dir ? 'ascending' : 'descending'), c = j[e[0].index + 1] || j[0]) : c = j[0], b += 'asc' === c ? a.sSortAscending : a.sSortDescending);
      i.setAttribute('aria-label', b);
    }
  }
  function Va(a, b, c, d) {
    var e = a.aaSorting, f = a.aoColumns[b].asSorting, g = function (a, b) {
        var c = a._idx;
        c === k && (c = h.inArray(a[1], f));
        return c + 1 < f.length ? c + 1 : b ? null : 0;
      };
    'number' === typeof e[0] && (e = a.aaSorting = [e]);
    c && a.oFeatures.bSortMulti ? (c = h.inArray(b, G(e, '0')), -1 !== c ? (b = g(e[c], !0), null === b && 1 === e.length && (b = 0), null === b ? e.splice(c, 1) : (e[c][1] = f[b], e[c]._idx = b)) : (e.push([
      b,
      f[0],
      0
    ]), e[e.length - 1]._idx = 0)) : e.length && e[0][0] == b ? (b = g(e[0]), e.length = 1, e[0][1] = f[b], e[0]._idx = b) : (e.length = 0, e.push([
      b,
      f[0]
    ]), e[0]._idx = 0);
    T(a);
    'function' == typeof d && d(a);
  }
  function Ma(a, b, c, d) {
    var e = a.aoColumns[c];
    Wa(b, {}, function (b) {
      !1 !== e.bSortable && (a.oFeatures.bProcessing ? (C(a, !0), setTimeout(function () {
        Va(a, c, b.shiftKey, d);
        'ssp' !== y(a) && C(a, !1);
      }, 0)) : Va(a, c, b.shiftKey, d));
    });
  }
  function va(a) {
    var b = a.aLastSort, c = a.oClasses.sSortColumn, d = V(a), e = a.oFeatures, f, g;
    if (e.bSort && e.bSortClasses) {
      e = 0;
      for (f = b.length; e < f; e++)
        g = b[e].src, h(G(a.aoData, 'anCells', g)).removeClass(c + (2 > e ? e + 1 : 3));
      e = 0;
      for (f = d.length; e < f; e++)
        g = d[e].src, h(G(a.aoData, 'anCells', g)).addClass(c + (2 > e ? e + 1 : 3));
    }
    a.aLastSort = d;
  }
  function Ib(a, b) {
    var c = a.aoColumns[b], d = m.ext.order[c.sSortDataType], e;
    d && (e = d.call(a.oInstance, a, b, $(a, b)));
    for (var f, g = m.ext.type.order[c.sType + '-pre'], j = 0, i = a.aoData.length; j < i; j++)
      if (c = a.aoData[j], c._aSortData || (c._aSortData = []), !c._aSortData[b] || d)
        f = d ? e[j] : B(a, j, b, 'sort'), c._aSortData[b] = g ? g(f) : f;
  }
  function wa(a) {
    if (a.oFeatures.bStateSave && !a.bDestroying) {
      var b = {
          time: +new Date(),
          start: a._iDisplayStart,
          length: a._iDisplayLength,
          order: h.extend(!0, [], a.aaSorting),
          search: Ab(a.oPreviousSearch),
          columns: h.map(a.aoColumns, function (b, d) {
            return {
              visible: b.bVisible,
              search: Ab(a.aoPreSearchCols[d])
            };
          })
        };
      u(a, 'aoStateSaveParams', 'stateSaveParams', [
        a,
        b
      ]);
      a.oSavedState = b;
      a.fnStateSaveCallback.call(a.oInstance, a, b);
    }
  }
  function Kb(a) {
    var b, c, d = a.aoColumns;
    if (a.oFeatures.bStateSave) {
      var e = a.fnStateLoadCallback.call(a.oInstance, a);
      if (e && e.time && (b = u(a, 'aoStateLoadParams', 'stateLoadParams', [
          a,
          e
        ]), -1 === h.inArray(!1, b) && (b = a.iStateDuration, !(0 < b && e.time < +new Date() - 1000 * b) && d.length === e.columns.length))) {
        a.oLoadedState = h.extend(!0, {}, e);
        e.start !== k && (a._iDisplayStart = e.start, a.iInitDisplayStart = e.start);
        e.length !== k && (a._iDisplayLength = e.length);
        e.order !== k && (a.aaSorting = [], h.each(e.order, function (b, c) {
          a.aaSorting.push(c[0] >= d.length ? [
            0,
            c[1]
          ] : c);
        }));
        e.search !== k && h.extend(a.oPreviousSearch, Bb(e.search));
        b = 0;
        for (c = e.columns.length; b < c; b++) {
          var f = e.columns[b];
          f.visible !== k && (d[b].bVisible = f.visible);
          f.search !== k && h.extend(a.aoPreSearchCols[b], Bb(f.search));
        }
        u(a, 'aoStateLoaded', 'stateLoaded', [
          a,
          e
        ]);
      }
    }
  }
  function xa(a) {
    var b = m.settings, a = h.inArray(a, G(b, 'nTable'));
    return -1 !== a ? b[a] : null;
  }
  function L(a, b, c, d) {
    c = 'DataTables warning: ' + (a ? 'table id=' + a.sTableId + ' - ' : '') + c;
    d && (c += '. For more information about this error, please see http://datatables.net/tn/' + d);
    if (b)
      D.console && console.log && console.log(c);
    else if (b = m.ext, b = b.sErrMode || b.errMode, a && u(a, null, 'error', [
        a,
        d,
        c
      ]), 'alert' == b)
      alert(c);
    else {
      if ('throw' == b)
        throw Error(c);
      'function' == typeof b && b(a, d, c);
    }
  }
  function E(a, b, c, d) {
    h.isArray(c) ? h.each(c, function (c, d) {
      h.isArray(d) ? E(a, b, d[0], d[1]) : E(a, b, d);
    }) : (d === k && (d = c), b[c] !== k && (a[d] = b[c]));
  }
  function Lb(a, b, c) {
    var d, e;
    for (e in b)
      b.hasOwnProperty(e) && (d = b[e], h.isPlainObject(d) ? (h.isPlainObject(a[e]) || (a[e] = {}), h.extend(!0, a[e], d)) : a[e] = c && 'data' !== e && 'aaData' !== e && h.isArray(d) ? d.slice() : d);
    return a;
  }
  function Wa(a, b, c) {
    h(a).bind('click.DT', b, function (b) {
      a.blur();
      c(b);
    }).bind('keypress.DT', b, function (a) {
      13 === a.which && (a.preventDefault(), c(a));
    }).bind('selectstart.DT', function () {
      return !1;
    });
  }
  function z(a, b, c, d) {
    c && a[b].push({
      fn: c,
      sName: d
    });
  }
  function u(a, b, c, d) {
    var e = [];
    b && (e = h.map(a[b].slice().reverse(), function (b) {
      return b.fn.apply(a.oInstance, d);
    }));
    null !== c && (b = h.Event(c + '.dt'), h(a.nTable).trigger(b, d), e.push(b.result));
    return e;
  }
  function Sa(a) {
    var b = a._iDisplayStart, c = a.fnDisplayEnd(), d = a._iDisplayLength;
    b >= c && (b = c - d);
    b -= b % d;
    if (-1 === d || 0 > b)
      b = 0;
    a._iDisplayStart = b;
  }
  function Na(a, b) {
    var c = a.renderer, d = m.ext.renderer[b];
    return h.isPlainObject(c) && c[b] ? d[c[b]] || d._ : 'string' === typeof c ? d[c] || d._ : d._;
  }
  function y(a) {
    return a.oFeatures.bServerSide ? 'ssp' : a.ajax || a.sAjaxSource ? 'ajax' : 'dom';
  }
  function ya(a, b) {
    var c = [], c = Mb.numbers_length, d = Math.floor(c / 2);
    b <= c ? c = W(0, b) : a <= d ? (c = W(0, c - 2), c.push('ellipsis'), c.push(b - 1)) : (a >= b - 1 - d ? c = W(b - (c - 2), b) : (c = W(a - d + 2, a + d - 1), c.push('ellipsis'), c.push(b - 1)), c.splice(0, 0, 'ellipsis'), c.splice(0, 0, 0));
    c.DT_el = 'span';
    return c;
  }
  function db(a) {
    h.each({
      num: function (b) {
        return za(b, a);
      },
      'num-fmt': function (b) {
        return za(b, a, Xa);
      },
      'html-num': function (b) {
        return za(b, a, Aa);
      },
      'html-num-fmt': function (b) {
        return za(b, a, Aa, Xa);
      }
    }, function (b, c) {
      v.type.order[b + a + '-pre'] = c;
      b.match(/^html\-/) && (v.type.search[b + a] = v.type.search.html);
    });
  }
  function Nb(a) {
    return function () {
      var b = [xa(this[m.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
      return m.ext.internal[a].apply(this, b);
    };
  }
  var m = function (a) {
      this.$ = function (a, b) {
        return this.api(!0).$(a, b);
      };
      this._ = function (a, b) {
        return this.api(!0).rows(a, b).data();
      };
      this.api = function (a) {
        return a ? new r(xa(this[v.iApiIndex])) : new r(this);
      };
      this.fnAddData = function (a, b) {
        var c = this.api(!0), d = h.isArray(a) && (h.isArray(a[0]) || h.isPlainObject(a[0])) ? c.rows.add(a) : c.row.add(a);
        (b === k || b) && c.draw();
        return d.flatten().toArray();
      };
      this.fnAdjustColumnSizing = function (a) {
        var b = this.api(!0).columns.adjust(), c = b.settings()[0], d = c.oScroll;
        a === k || a ? b.draw(!1) : ('' !== d.sX || '' !== d.sY) && ka(c);
      };
      this.fnClearTable = function (a) {
        var b = this.api(!0).clear();
        (a === k || a) && b.draw();
      };
      this.fnClose = function (a) {
        this.api(!0).row(a).child.hide();
      };
      this.fnDeleteRow = function (a, b, c) {
        var d = this.api(!0), a = d.rows(a), e = a.settings()[0], h = e.aoData[a[0][0]];
        a.remove();
        b && b.call(this, e, h);
        (c === k || c) && d.draw();
        return h;
      };
      this.fnDestroy = function (a) {
        this.api(!0).destroy(a);
      };
      this.fnDraw = function (a) {
        this.api(!0).draw(a);
      };
      this.fnFilter = function (a, b, c, d, e, h) {
        e = this.api(!0);
        null === b || b === k ? e.search(a, c, d, h) : e.column(b).search(a, c, d, h);
        e.draw();
      };
      this.fnGetData = function (a, b) {
        var c = this.api(!0);
        if (a !== k) {
          var d = a.nodeName ? a.nodeName.toLowerCase() : '';
          return b !== k || 'td' == d || 'th' == d ? c.cell(a, b).data() : c.row(a).data() || null;
        }
        return c.data().toArray();
      };
      this.fnGetNodes = function (a) {
        var b = this.api(!0);
        return a !== k ? b.row(a).node() : b.rows().nodes().flatten().toArray();
      };
      this.fnGetPosition = function (a) {
        var b = this.api(!0), c = a.nodeName.toUpperCase();
        return 'TR' == c ? b.row(a).index() : 'TD' == c || 'TH' == c ? (a = b.cell(a).index(), [
          a.row,
          a.columnVisible,
          a.column
        ]) : null;
      };
      this.fnIsOpen = function (a) {
        return this.api(!0).row(a).child.isShown();
      };
      this.fnOpen = function (a, b, c) {
        return this.api(!0).row(a).child(b, c).show().child()[0];
      };
      this.fnPageChange = function (a, b) {
        var c = this.api(!0).page(a);
        (b === k || b) && c.draw(!1);
      };
      this.fnSetColumnVis = function (a, b, c) {
        a = this.api(!0).column(a).visible(b);
        (c === k || c) && a.columns.adjust().draw();
      };
      this.fnSettings = function () {
        return xa(this[v.iApiIndex]);
      };
      this.fnSort = function (a) {
        this.api(!0).order(a).draw();
      };
      this.fnSortListener = function (a, b, c) {
        this.api(!0).order.listener(a, b, c);
      };
      this.fnUpdate = function (a, b, c, d, e) {
        var h = this.api(!0);
        c === k || null === c ? h.row(b).data(a) : h.cell(b, c).data(a);
        (e === k || e) && h.columns.adjust();
        (d === k || d) && h.draw();
        return 0;
      };
      this.fnVersionCheck = v.fnVersionCheck;
      var b = this, c = a === k, d = this.length;
      c && (a = {});
      this.oApi = this.internal = v.internal;
      for (var e in m.ext.internal)
        e && (this[e] = Nb(e));
      this.each(function () {
        var e = {}, e = 1 < d ? Lb(e, a, !0) : a, g = 0, j, i = this.getAttribute('id'), n = !1, l = m.defaults, q = h(this);
        if ('table' != this.nodeName.toLowerCase())
          L(null, 0, 'Non-table node initialisation (' + this.nodeName + ')', 2);
        else {
          eb(l);
          fb(l.column);
          K(l, l, !0);
          K(l.column, l.column, !0);
          K(l, h.extend(e, q.data()));
          var t = m.settings, g = 0;
          for (j = t.length; g < j; g++) {
            var p = t[g];
            if (p.nTable == this || p.nTHead.parentNode == this || p.nTFoot && p.nTFoot.parentNode == this) {
              g = e.bRetrieve !== k ? e.bRetrieve : l.bRetrieve;
              if (c || g)
                return p.oInstance;
              if (e.bDestroy !== k ? e.bDestroy : l.bDestroy) {
                p.oInstance.fnDestroy();
                break;
              } else {
                L(p, 0, 'Cannot reinitialise DataTable', 3);
                return;
              }
            }
            if (p.sTableId == this.id) {
              t.splice(g, 1);
              break;
            }
          }
          if (null === i || '' === i)
            this.id = i = 'DataTables_Table_' + m.ext._unique++;
          var o = h.extend(!0, {}, m.models.oSettings, {
              sDestroyWidth: q[0].style.width,
              sInstance: i,
              sTableId: i
            });
          o.nTable = this;
          o.oApi = b.internal;
          o.oInit = e;
          t.push(o);
          o.oInstance = 1 === b.length ? b : q.dataTable();
          eb(e);
          e.oLanguage && Da(e.oLanguage);
          e.aLengthMenu && !e.iDisplayLength && (e.iDisplayLength = h.isArray(e.aLengthMenu[0]) ? e.aLengthMenu[0][0] : e.aLengthMenu[0]);
          e = Lb(h.extend(!0, {}, l), e);
          E(o.oFeatures, e, 'bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender'.split(' '));
          E(o, e, [
            'asStripeClasses',
            'ajax',
            'fnServerData',
            'fnFormatNumber',
            'sServerMethod',
            'aaSorting',
            'aaSortingFixed',
            'aLengthMenu',
            'sPaginationType',
            'sAjaxSource',
            'sAjaxDataProp',
            'iStateDuration',
            'sDom',
            'bSortCellsTop',
            'iTabIndex',
            'fnStateLoadCallback',
            'fnStateSaveCallback',
            'renderer',
            'searchDelay',
            'rowId',
            [
              'iCookieDuration',
              'iStateDuration'
            ],
            [
              'oSearch',
              'oPreviousSearch'
            ],
            [
              'aoSearchCols',
              'aoPreSearchCols'
            ],
            [
              'iDisplayLength',
              '_iDisplayLength'
            ],
            [
              'bJQueryUI',
              'bJUI'
            ]
          ]);
          E(o.oScroll, e, [
            [
              'sScrollX',
              'sX'
            ],
            [
              'sScrollXInner',
              'sXInner'
            ],
            [
              'sScrollY',
              'sY'
            ],
            [
              'bScrollCollapse',
              'bCollapse'
            ]
          ]);
          E(o.oLanguage, e, 'fnInfoCallback');
          z(o, 'aoDrawCallback', e.fnDrawCallback, 'user');
          z(o, 'aoServerParams', e.fnServerParams, 'user');
          z(o, 'aoStateSaveParams', e.fnStateSaveParams, 'user');
          z(o, 'aoStateLoadParams', e.fnStateLoadParams, 'user');
          z(o, 'aoStateLoaded', e.fnStateLoaded, 'user');
          z(o, 'aoRowCallback', e.fnRowCallback, 'user');
          z(o, 'aoRowCreatedCallback', e.fnCreatedRow, 'user');
          z(o, 'aoHeaderCallback', e.fnHeaderCallback, 'user');
          z(o, 'aoFooterCallback', e.fnFooterCallback, 'user');
          z(o, 'aoInitComplete', e.fnInitComplete, 'user');
          z(o, 'aoPreDrawCallback', e.fnPreDrawCallback, 'user');
          o.rowIdFn = Q(e.rowId);
          gb(o);
          i = o.oClasses;
          e.bJQueryUI ? (h.extend(i, m.ext.oJUIClasses, e.oClasses), e.sDom === l.sDom && 'lfrtip' === l.sDom && (o.sDom = '<"H"lfr>t<"F"ip>'), o.renderer) ? h.isPlainObject(o.renderer) && !o.renderer.header && (o.renderer.header = 'jqueryui') : o.renderer = 'jqueryui' : h.extend(i, m.ext.classes, e.oClasses);
          q.addClass(i.sTable);
          o.iInitDisplayStart === k && (o.iInitDisplayStart = e.iDisplayStart, o._iDisplayStart = e.iDisplayStart);
          null !== e.iDeferLoading && (o.bDeferLoading = !0, g = h.isArray(e.iDeferLoading), o._iRecordsDisplay = g ? e.iDeferLoading[0] : e.iDeferLoading, o._iRecordsTotal = g ? e.iDeferLoading[1] : e.iDeferLoading);
          var r = o.oLanguage;
          h.extend(!0, r, e.oLanguage);
          '' !== r.sUrl && (h.ajax({
            dataType: 'json',
            url: r.sUrl,
            success: function (a) {
              Da(a);
              K(l.oLanguage, a);
              h.extend(true, r, a);
              ga(o);
            },
            error: function () {
              ga(o);
            }
          }), n = !0);
          null === e.asStripeClasses && (o.asStripeClasses = [
            i.sStripeOdd,
            i.sStripeEven
          ]);
          var g = o.asStripeClasses, v = q.children('tbody').find('tr').eq(0);
          -1 !== h.inArray(!0, h.map(g, function (a) {
            return v.hasClass(a);
          })) && (h('tbody tr', this).removeClass(g.join(' ')), o.asDestroyStripes = g.slice());
          t = [];
          g = this.getElementsByTagName('thead');
          0 !== g.length && (da(o.aoHeader, g[0]), t = qa(o));
          if (null === e.aoColumns) {
            p = [];
            g = 0;
            for (j = t.length; g < j; g++)
              p.push(null);
          } else
            p = e.aoColumns;
          g = 0;
          for (j = p.length; g < j; g++)
            Ea(o, t ? t[g] : null);
          ib(o, e.aoColumnDefs, p, function (a, b) {
            ja(o, a, b);
          });
          if (v.length) {
            var s = function (a, b) {
              return a.getAttribute('data-' + b) !== null ? b : null;
            };
            h(v[0]).children('th, td').each(function (a, b) {
              var c = o.aoColumns[a];
              if (c.mData === a) {
                var d = s(b, 'sort') || s(b, 'order'), e = s(b, 'filter') || s(b, 'search');
                if (d !== null || e !== null) {
                  c.mData = {
                    _: a + '.display',
                    sort: d !== null ? a + '.@data-' + d : k,
                    type: d !== null ? a + '.@data-' + d : k,
                    filter: e !== null ? a + '.@data-' + e : k
                  };
                  ja(o, a);
                }
              }
            });
          }
          var w = o.oFeatures;
          e.bStateSave && (w.bStateSave = !0, Kb(o, e), z(o, 'aoDrawCallback', wa, 'state_save'));
          if (e.aaSorting === k) {
            t = o.aaSorting;
            g = 0;
            for (j = t.length; g < j; g++)
              t[g][1] = o.aoColumns[g].asSorting[0];
          }
          va(o);
          w.bSort && z(o, 'aoDrawCallback', function () {
            if (o.bSorted) {
              var a = V(o), b = {};
              h.each(a, function (a, c) {
                b[c.src] = c.dir;
              });
              u(o, null, 'order', [
                o,
                a,
                b
              ]);
              Jb(o);
            }
          });
          z(o, 'aoDrawCallback', function () {
            (o.bSorted || y(o) === 'ssp' || w.bDeferRender) && va(o);
          }, 'sc');
          g = q.children('caption').each(function () {
            this._captionSide = q.css('caption-side');
          });
          j = q.children('thead');
          0 === j.length && (j = h('<thead/>').appendTo(this));
          o.nTHead = j[0];
          j = q.children('tbody');
          0 === j.length && (j = h('<tbody/>').appendTo(this));
          o.nTBody = j[0];
          j = q.children('tfoot');
          if (0 === j.length && 0 < g.length && ('' !== o.oScroll.sX || '' !== o.oScroll.sY))
            j = h('<tfoot/>').appendTo(this);
          0 === j.length || 0 === j.children().length ? q.addClass(i.sNoFooter) : 0 < j.length && (o.nTFoot = j[0], da(o.aoFooter, o.nTFoot));
          if (e.aaData)
            for (g = 0; g < e.aaData.length; g++)
              N(o, e.aaData[g]);
          else
            (o.bDeferLoading || 'dom' == y(o)) && ma(o, h(o.nTBody).children('tr'));
          o.aiDisplay = o.aiDisplayMaster.slice();
          o.bInitialised = !0;
          !1 === n && ga(o);
        }
      });
      b = null;
      return this;
    }, v, r, p, s, Ya = {}, Ob = /[\r\n]/g, Aa = /<.*?>/g, ac = /^[\w\+\-]/, bc = /[\w\+\-]$/, cc = RegExp('(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)', 'g'), Xa = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi, M = function (a) {
      return !a || !0 === a || '-' === a ? !0 : !1;
    }, Pb = function (a) {
      var b = parseInt(a, 10);
      return !isNaN(b) && isFinite(a) ? b : null;
    }, Qb = function (a, b) {
      Ya[b] || (Ya[b] = RegExp(Qa(b), 'g'));
      return 'string' === typeof a && '.' !== b ? a.replace(/\./g, '').replace(Ya[b], '.') : a;
    }, Za = function (a, b, c) {
      var d = 'string' === typeof a;
      if (M(a))
        return !0;
      b && d && (a = Qb(a, b));
      c && d && (a = a.replace(Xa, ''));
      return !isNaN(parseFloat(a)) && isFinite(a);
    }, Rb = function (a, b, c) {
      return M(a) ? !0 : !(M(a) || 'string' === typeof a) ? null : Za(a.replace(Aa, ''), b, c) ? !0 : null;
    }, G = function (a, b, c) {
      var d = [], e = 0, f = a.length;
      if (c !== k)
        for (; e < f; e++)
          a[e] && a[e][b] && d.push(a[e][b][c]);
      else
        for (; e < f; e++)
          a[e] && d.push(a[e][b]);
      return d;
    }, ha = function (a, b, c, d) {
      var e = [], f = 0, g = b.length;
      if (d !== k)
        for (; f < g; f++)
          a[b[f]][c] && e.push(a[b[f]][c][d]);
      else
        for (; f < g; f++)
          e.push(a[b[f]][c]);
      return e;
    }, W = function (a, b) {
      var c = [], d;
      b === k ? (b = 0, d = a) : (d = b, b = a);
      for (var e = b; e < d; e++)
        c.push(e);
      return c;
    }, Sb = function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c++)
        a[c] && b.push(a[c]);
      return b;
    }, pa = function (a) {
      var b = [], c, d, e = a.length, f, g = 0;
      d = 0;
      a:
        for (; d < e; d++) {
          c = a[d];
          for (f = 0; f < g; f++)
            if (b[f] === c)
              continue a;
          b.push(c);
          g++;
        }
      return b;
    };
  m.util = {
    throttle: function (a, b) {
      var c = b !== k ? b : 200, d, e;
      return function () {
        var b = this, g = +new Date(), h = arguments;
        d && g < d + c ? (clearTimeout(e), e = setTimeout(function () {
          d = k;
          a.apply(b, h);
        }, c)) : (d = g, a.apply(b, h));
      };
    },
    escapeRegex: function (a) {
      return a.replace(cc, '\\$1');
    }
  };
  var A = function (a, b, c) {
      a[b] !== k && (a[c] = a[b]);
    }, ba = /\[.*?\]$/, U = /\(\)$/, Qa = m.util.escapeRegex, ua = h('<div>')[0], Zb = ua.textContent !== k, $b = /<.*?>/g, Oa = m.util.throttle, Tb = [], w = Array.prototype, dc = function (a) {
      var b, c, d = m.settings, e = h.map(d, function (a) {
          return a.nTable;
        });
      if (a) {
        if (a.nTable && a.oApi)
          return [a];
        if (a.nodeName && 'table' === a.nodeName.toLowerCase())
          return b = h.inArray(a, e), -1 !== b ? [d[b]] : null;
        if (a && 'function' === typeof a.settings)
          return a.settings().toArray();
        'string' === typeof a ? c = h(a) : a instanceof h && (c = a);
      } else
        return [];
      if (c)
        return c.map(function () {
          b = h.inArray(this, e);
          return -1 !== b ? d[b] : null;
        }).toArray();
    };
  r = function (a, b) {
    if (!(this instanceof r))
      return new r(a, b);
    var c = [], d = function (a) {
        (a = dc(a)) && (c = c.concat(a));
      };
    if (h.isArray(a))
      for (var e = 0, f = a.length; e < f; e++)
        d(a[e]);
    else
      d(a);
    this.context = pa(c);
    b && h.merge(this, b);
    this.selector = {
      rows: null,
      cols: null,
      opts: null
    };
    r.extend(this, this, Tb);
  };
  m.Api = r;
  h.extend(r.prototype, {
    any: function () {
      return 0 !== this.count();
    },
    concat: w.concat,
    context: [],
    count: function () {
      return this.flatten().length;
    },
    each: function (a) {
      for (var b = 0, c = this.length; b < c; b++)
        a.call(this, this[b], b, this);
      return this;
    },
    eq: function (a) {
      var b = this.context;
      return b.length > a ? new r(b[a], this[a]) : null;
    },
    filter: function (a) {
      var b = [];
      if (w.filter)
        b = w.filter.call(this, a, this);
      else
        for (var c = 0, d = this.length; c < d; c++)
          a.call(this, this[c], c, this) && b.push(this[c]);
      return new r(this.context, b);
    },
    flatten: function () {
      var a = [];
      return new r(this.context, a.concat.apply(a, this.toArray()));
    },
    join: w.join,
    indexOf: w.indexOf || function (a, b) {
      for (var c = b || 0, d = this.length; c < d; c++)
        if (this[c] === a)
          return c;
      return -1;
    },
    iterator: function (a, b, c, d) {
      var e = [], f, g, h, i, n, l = this.context, m, t, p = this.selector;
      'string' === typeof a && (d = c, c = b, b = a, a = !1);
      g = 0;
      for (h = l.length; g < h; g++) {
        var o = new r(l[g]);
        if ('table' === b)
          f = c.call(o, l[g], g), f !== k && e.push(f);
        else if ('columns' === b || 'rows' === b)
          f = c.call(o, l[g], this[g], g), f !== k && e.push(f);
        else if ('column' === b || 'column-rows' === b || 'row' === b || 'cell' === b) {
          t = this[g];
          'column-rows' === b && (m = Ba(l[g], p.opts));
          i = 0;
          for (n = t.length; i < n; i++)
            f = t[i], f = 'cell' === b ? c.call(o, l[g], f.row, f.column, g, i) : c.call(o, l[g], f, g, i, m), f !== k && e.push(f);
        }
      }
      return e.length || d ? (a = new r(l, a ? e.concat.apply([], e) : e), b = a.selector, b.rows = p.rows, b.cols = p.cols, b.opts = p.opts, a) : this;
    },
    lastIndexOf: w.lastIndexOf || function (a, b) {
      return this.indexOf.apply(this.toArray.reverse(), arguments);
    },
    length: 0,
    map: function (a) {
      var b = [];
      if (w.map)
        b = w.map.call(this, a, this);
      else
        for (var c = 0, d = this.length; c < d; c++)
          b.push(a.call(this, this[c], c));
      return new r(this.context, b);
    },
    pluck: function (a) {
      return this.map(function (b) {
        return b[a];
      });
    },
    pop: w.pop,
    push: w.push,
    reduce: w.reduce || function (a, b) {
      return hb(this, a, b, 0, this.length, 1);
    },
    reduceRight: w.reduceRight || function (a, b) {
      return hb(this, a, b, this.length - 1, -1, -1);
    },
    reverse: w.reverse,
    selector: null,
    shift: w.shift,
    sort: w.sort,
    splice: w.splice,
    toArray: function () {
      return w.slice.call(this);
    },
    to$: function () {
      return h(this);
    },
    toJQuery: function () {
      return h(this);
    },
    unique: function () {
      return new r(this.context, pa(this));
    },
    unshift: w.unshift
  });
  r.extend = function (a, b, c) {
    if (c.length && b && (b instanceof r || b.__dt_wrapper)) {
      var d, e, f, g = function (a, b, c) {
          return function () {
            var d = b.apply(a, arguments);
            r.extend(d, d, c.methodExt);
            return d;
          };
        };
      d = 0;
      for (e = c.length; d < e; d++)
        f = c[d], b[f.name] = 'function' === typeof f.val ? g(a, f.val, f) : h.isPlainObject(f.val) ? {} : f.val, b[f.name].__dt_wrapper = !0, r.extend(a, b[f.name], f.propExt);
    }
  };
  r.register = p = function (a, b) {
    if (h.isArray(a))
      for (var c = 0, d = a.length; c < d; c++)
        r.register(a[c], b);
    else
      for (var e = a.split('.'), f = Tb, g, j, c = 0, d = e.length; c < d; c++) {
        g = (j = -1 !== e[c].indexOf('()')) ? e[c].replace('()', '') : e[c];
        var i;
        a: {
          i = 0;
          for (var n = f.length; i < n; i++)
            if (f[i].name === g) {
              i = f[i];
              break a;
            }
          i = null;
        }
        i || (i = {
          name: g,
          val: {},
          methodExt: [],
          propExt: []
        }, f.push(i));
        c === d - 1 ? i.val = b : f = j ? i.methodExt : i.propExt;
      }
  };
  r.registerPlural = s = function (a, b, c) {
    r.register(a, c);
    r.register(b, function () {
      var a = c.apply(this, arguments);
      return a === this ? this : a instanceof r ? a.length ? h.isArray(a[0]) ? new r(a.context, a[0]) : a[0] : k : a;
    });
  };
  p('tables()', function (a) {
    var b;
    if (a) {
      b = r;
      var c = this.context;
      if ('number' === typeof a)
        a = [c[a]];
      else
        var d = h.map(c, function (a) {
            return a.nTable;
          }), a = h(d).filter(a).map(function () {
            var a = h.inArray(this, d);
            return c[a];
          }).toArray();
      b = new b(a);
    } else
      b = this;
    return b;
  });
  p('table()', function (a) {
    var a = this.tables(a), b = a.context;
    return b.length ? new r(b[0]) : a;
  });
  s('tables().nodes()', 'table().node()', function () {
    return this.iterator('table', function (a) {
      return a.nTable;
    }, 1);
  });
  s('tables().body()', 'table().body()', function () {
    return this.iterator('table', function (a) {
      return a.nTBody;
    }, 1);
  });
  s('tables().header()', 'table().header()', function () {
    return this.iterator('table', function (a) {
      return a.nTHead;
    }, 1);
  });
  s('tables().footer()', 'table().footer()', function () {
    return this.iterator('table', function (a) {
      return a.nTFoot;
    }, 1);
  });
  s('tables().containers()', 'table().container()', function () {
    return this.iterator('table', function (a) {
      return a.nTableWrapper;
    }, 1);
  });
  p('draw()', function (a) {
    return this.iterator('table', function (b) {
      'page' === a ? O(b) : ('string' === typeof a && (a = 'full-hold' === a ? !1 : !0), T(b, !1 === a));
    });
  });
  p('page()', function (a) {
    return a === k ? this.page.info().page : this.iterator('table', function (b) {
      Ta(b, a);
    });
  });
  p('page.info()', function () {
    if (0 === this.context.length)
      return k;
    var a = this.context[0], b = a._iDisplayStart, c = a.oFeatures.bPaginate ? a._iDisplayLength : -1, d = a.fnRecordsDisplay(), e = -1 === c;
    return {
      page: e ? 0 : Math.floor(b / c),
      pages: e ? 1 : Math.ceil(d / c),
      start: b,
      end: a.fnDisplayEnd(),
      length: c,
      recordsTotal: a.fnRecordsTotal(),
      recordsDisplay: d,
      serverSide: 'ssp' === y(a)
    };
  });
  p('page.len()', function (a) {
    return a === k ? 0 !== this.context.length ? this.context[0]._iDisplayLength : k : this.iterator('table', function (b) {
      Ra(b, a);
    });
  });
  var Ub = function (a, b, c) {
    if (c) {
      var d = new r(a);
      d.one('draw', function () {
        c(d.ajax.json());
      });
    }
    if ('ssp' == y(a))
      T(a, b);
    else {
      C(a, !0);
      var e = a.jqXHR;
      e && 4 !== e.readyState && e.abort();
      ra(a, [], function (c) {
        na(a);
        for (var c = sa(a, c), d = 0, e = c.length; d < e; d++)
          N(a, c[d]);
        T(a, b);
        C(a, !1);
      });
    }
  };
  p('ajax.json()', function () {
    var a = this.context;
    if (0 < a.length)
      return a[0].json;
  });
  p('ajax.params()', function () {
    var a = this.context;
    if (0 < a.length)
      return a[0].oAjaxData;
  });
  p('ajax.reload()', function (a, b) {
    return this.iterator('table', function (c) {
      Ub(c, !1 === b, a);
    });
  });
  p('ajax.url()', function (a) {
    var b = this.context;
    if (a === k) {
      if (0 === b.length)
        return k;
      b = b[0];
      return b.ajax ? h.isPlainObject(b.ajax) ? b.ajax.url : b.ajax : b.sAjaxSource;
    }
    return this.iterator('table', function (b) {
      h.isPlainObject(b.ajax) ? b.ajax.url = a : b.ajax = a;
    });
  });
  p('ajax.url().load()', function (a, b) {
    return this.iterator('table', function (c) {
      Ub(c, !1 === b, a);
    });
  });
  var $a = function (a, b, c, d, e) {
      var f = [], g, j, i, n, l, m;
      i = typeof b;
      if (!b || 'string' === i || 'function' === i || b.length === k)
        b = [b];
      i = 0;
      for (n = b.length; i < n; i++) {
        j = b[i] && b[i].split ? b[i].split(',') : [b[i]];
        l = 0;
        for (m = j.length; l < m; l++)
          (g = c('string' === typeof j[l] ? h.trim(j[l]) : j[l])) && g.length && (f = f.concat(g));
      }
      a = v.selector[a];
      if (a.length) {
        i = 0;
        for (n = a.length; i < n; i++)
          f = a[i](d, e, f);
      }
      return pa(f);
    }, ab = function (a) {
      a || (a = {});
      a.filter && a.search === k && (a.search = a.filter);
      return h.extend({
        search: 'none',
        order: 'current',
        page: 'all'
      }, a);
    }, bb = function (a) {
      for (var b = 0, c = a.length; b < c; b++)
        if (0 < a[b].length)
          return a[0] = a[b], a[0].length = 1, a.length = 1, a.context = [a.context[b]], a;
      a.length = 0;
      return a;
    }, Ba = function (a, b) {
      var c, d, e, f = [], g = a.aiDisplay;
      c = a.aiDisplayMaster;
      var j = b.search;
      d = b.order;
      e = b.page;
      if ('ssp' == y(a))
        return 'removed' === j ? [] : W(0, c.length);
      if ('current' == e) {
        c = a._iDisplayStart;
        for (d = a.fnDisplayEnd(); c < d; c++)
          f.push(g[c]);
      } else if ('current' == d || 'applied' == d)
        f = 'none' == j ? c.slice() : 'applied' == j ? g.slice() : h.map(c, function (a) {
          return -1 === h.inArray(a, g) ? a : null;
        });
      else if ('index' == d || 'original' == d) {
        c = 0;
        for (d = a.aoData.length; c < d; c++)
          'none' == j ? f.push(c) : (e = h.inArray(c, g), (-1 === e && 'removed' == j || 0 <= e && 'applied' == j) && f.push(c));
      }
      return f;
    };
  p('rows()', function (a, b) {
    a === k ? a = '' : h.isPlainObject(a) && (b = a, a = '');
    var b = ab(b), c = this.iterator('table', function (c) {
        var e = b;
        return $a('row', a, function (a) {
          var b = Pb(a);
          if (b !== null && !e)
            return [b];
          var j = Ba(c, e);
          if (b !== null && h.inArray(b, j) !== -1)
            return [b];
          if (!a)
            return j;
          if (typeof a === 'function')
            return h.map(j, function (b) {
              var e = c.aoData[b];
              return a(b, e._aData, e.nTr) ? b : null;
            });
          b = Sb(ha(c.aoData, j, 'nTr'));
          if (a.nodeName) {
            if (a._DT_RowIndex !== k)
              return [a._DT_RowIndex];
            if (a._DT_CellIndex)
              return [a._DT_CellIndex.row];
            b = h(a).closest('*[data-dt-row]');
            return b.length ? [b.data('dt-row')] : [];
          }
          if (typeof a === 'string' && a.charAt(0) === '#') {
            j = c.aIds[a.replace(/^#/, '')];
            if (j !== k)
              return [j.idx];
          }
          return h(b).filter(a).map(function () {
            return this._DT_RowIndex;
          }).toArray();
        }, c, e);
      }, 1);
    c.selector.rows = a;
    c.selector.opts = b;
    return c;
  });
  p('rows().nodes()', function () {
    return this.iterator('row', function (a, b) {
      return a.aoData[b].nTr || k;
    }, 1);
  });
  p('rows().data()', function () {
    return this.iterator(!0, 'rows', function (a, b) {
      return ha(a.aoData, b, '_aData');
    }, 1);
  });
  s('rows().cache()', 'row().cache()', function (a) {
    return this.iterator('row', function (b, c) {
      var d = b.aoData[c];
      return 'search' === a ? d._aFilterData : d._aSortData;
    }, 1);
  });
  s('rows().invalidate()', 'row().invalidate()', function (a) {
    return this.iterator('row', function (b, c) {
      ca(b, c, a);
    });
  });
  s('rows().indexes()', 'row().index()', function () {
    return this.iterator('row', function (a, b) {
      return b;
    }, 1);
  });
  s('rows().ids()', 'row().id()', function (a) {
    for (var b = [], c = this.context, d = 0, e = c.length; d < e; d++)
      for (var f = 0, g = this[d].length; f < g; f++) {
        var h = c[d].rowIdFn(c[d].aoData[this[d][f]]._aData);
        b.push((!0 === a ? '#' : '') + h);
      }
    return new r(c, b);
  });
  s('rows().remove()', 'row().remove()', function () {
    var a = this;
    this.iterator('row', function (b, c, d) {
      var e = b.aoData, f = e[c], g, h, i, n, l;
      e.splice(c, 1);
      g = 0;
      for (h = e.length; g < h; g++)
        if (i = e[g], l = i.anCells, null !== i.nTr && (i.nTr._DT_RowIndex = g), null !== l) {
          i = 0;
          for (n = l.length; i < n; i++)
            l[i]._DT_CellIndex.row = g;
        }
      oa(b.aiDisplayMaster, c);
      oa(b.aiDisplay, c);
      oa(a[d], c, !1);
      Sa(b);
      c = b.rowIdFn(f._aData);
      c !== k && delete b.aIds[c];
    });
    this.iterator('table', function (a) {
      for (var c = 0, d = a.aoData.length; c < d; c++)
        a.aoData[c].idx = c;
    });
    return this;
  });
  p('rows.add()', function (a) {
    var b = this.iterator('table', function (b) {
        var c, f, g, h = [];
        f = 0;
        for (g = a.length; f < g; f++)
          c = a[f], c.nodeName && 'TR' === c.nodeName.toUpperCase() ? h.push(ma(b, c)[0]) : h.push(N(b, c));
        return h;
      }, 1), c = this.rows(-1);
    c.pop();
    h.merge(c, b);
    return c;
  });
  p('row()', function (a, b) {
    return bb(this.rows(a, b));
  });
  p('row().data()', function (a) {
    var b = this.context;
    if (a === k)
      return b.length && this.length ? b[0].aoData[this[0]]._aData : k;
    b[0].aoData[this[0]]._aData = a;
    ca(b[0], this[0], 'data');
    return this;
  });
  p('row().node()', function () {
    var a = this.context;
    return a.length && this.length ? a[0].aoData[this[0]].nTr || null : null;
  });
  p('row.add()', function (a) {
    a instanceof h && a.length && (a = a[0]);
    var b = this.iterator('table', function (b) {
        return a.nodeName && 'TR' === a.nodeName.toUpperCase() ? ma(b, a)[0] : N(b, a);
      });
    return this.row(b[0]);
  });
  var cb = function (a, b) {
      var c = a.context;
      if (c.length && (c = c[0].aoData[b !== k ? b : a[0]]) && c._details)
        c._details.remove(), c._detailsShow = k, c._details = k;
    }, Vb = function (a, b) {
      var c = a.context;
      if (c.length && a.length) {
        var d = c[0].aoData[a[0]];
        if (d._details) {
          (d._detailsShow = b) ? d._details.insertAfter(d.nTr) : d._details.detach();
          var e = c[0], f = new r(e), g = e.aoData;
          f.off('draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details');
          0 < G(g, '_details').length && (f.on('draw.dt.DT_details', function (a, b) {
            e === b && f.rows({ page: 'current' }).eq(0).each(function (a) {
              a = g[a];
              a._detailsShow && a._details.insertAfter(a.nTr);
            });
          }), f.on('column-visibility.dt.DT_details', function (a, b) {
            if (e === b)
              for (var c, d = aa(b), f = 0, h = g.length; f < h; f++)
                c = g[f], c._details && c._details.children('td[colspan]').attr('colspan', d);
          }), f.on('destroy.dt.DT_details', function (a, b) {
            if (e === b)
              for (var c = 0, d = g.length; c < d; c++)
                g[c]._details && cb(f, c);
          }));
        }
      }
    };
  p('row().child()', function (a, b) {
    var c = this.context;
    if (a === k)
      return c.length && this.length ? c[0].aoData[this[0]]._details : k;
    if (!0 === a)
      this.child.show();
    else if (!1 === a)
      cb(this);
    else if (c.length && this.length) {
      var d = c[0], c = c[0].aoData[this[0]], e = [], f = function (a, b) {
          if (h.isArray(a) || a instanceof h)
            for (var c = 0, k = a.length; c < k; c++)
              f(a[c], b);
          else
            a.nodeName && 'tr' === a.nodeName.toLowerCase() ? e.push(a) : (c = h('<tr><td/></tr>').addClass(b), h('td', c).addClass(b).html(a)[0].colSpan = aa(d), e.push(c[0]));
        };
      f(a, b);
      c._details && c._details.remove();
      c._details = h(e);
      c._detailsShow && c._details.insertAfter(c.nTr);
    }
    return this;
  });
  p([
    'row().child.show()',
    'row().child().show()'
  ], function () {
    Vb(this, !0);
    return this;
  });
  p([
    'row().child.hide()',
    'row().child().hide()'
  ], function () {
    Vb(this, !1);
    return this;
  });
  p([
    'row().child.remove()',
    'row().child().remove()'
  ], function () {
    cb(this);
    return this;
  });
  p('row().child.isShown()', function () {
    var a = this.context;
    return a.length && this.length ? a[0].aoData[this[0]]._detailsShow || !1 : !1;
  });
  var ec = /^(.+):(name|visIdx|visible)$/, Wb = function (a, b, c, d, e) {
      for (var c = [], d = 0, f = e.length; d < f; d++)
        c.push(B(a, e[d], b));
      return c;
    };
  p('columns()', function (a, b) {
    a === k ? a = '' : h.isPlainObject(a) && (b = a, a = '');
    var b = ab(b), c = this.iterator('table', function (c) {
        var e = a, f = b, g = c.aoColumns, j = G(g, 'sName'), i = G(g, 'nTh');
        return $a('column', e, function (a) {
          var b = Pb(a);
          if (a === '')
            return W(g.length);
          if (b !== null)
            return [b >= 0 ? b : g.length + b];
          if (typeof a === 'function') {
            var e = Ba(c, f);
            return h.map(g, function (b, f) {
              return a(f, Wb(c, f, 0, 0, e), i[f]) ? f : null;
            });
          }
          var k = typeof a === 'string' ? a.match(ec) : '';
          if (k)
            switch (k[2]) {
            case 'visIdx':
            case 'visible':
              b = parseInt(k[1], 10);
              if (b < 0) {
                var m = h.map(g, function (a, b) {
                    return a.bVisible ? b : null;
                  });
                return [m[m.length + b]];
              }
              return [Z(c, b)];
            case 'name':
              return h.map(j, function (a, b) {
                return a === k[1] ? b : null;
              });
            default:
              return [];
            }
          if (a.nodeName && a._DT_CellIndex)
            return [a._DT_CellIndex.column];
          b = h(i).filter(a).map(function () {
            return h.inArray(this, i);
          }).toArray();
          if (b.length || !a.nodeName)
            return b;
          b = h(a).closest('*[data-dt-column]');
          return b.length ? [b.data('dt-column')] : [];
        }, c, f);
      }, 1);
    c.selector.cols = a;
    c.selector.opts = b;
    return c;
  });
  s('columns().header()', 'column().header()', function () {
    return this.iterator('column', function (a, b) {
      return a.aoColumns[b].nTh;
    }, 1);
  });
  s('columns().footer()', 'column().footer()', function () {
    return this.iterator('column', function (a, b) {
      return a.aoColumns[b].nTf;
    }, 1);
  });
  s('columns().data()', 'column().data()', function () {
    return this.iterator('column-rows', Wb, 1);
  });
  s('columns().dataSrc()', 'column().dataSrc()', function () {
    return this.iterator('column', function (a, b) {
      return a.aoColumns[b].mData;
    }, 1);
  });
  s('columns().cache()', 'column().cache()', function (a) {
    return this.iterator('column-rows', function (b, c, d, e, f) {
      return ha(b.aoData, f, 'search' === a ? '_aFilterData' : '_aSortData', c);
    }, 1);
  });
  s('columns().nodes()', 'column().nodes()', function () {
    return this.iterator('column-rows', function (a, b, c, d, e) {
      return ha(a.aoData, e, 'anCells', b);
    }, 1);
  });
  s('columns().visible()', 'column().visible()', function (a, b) {
    var c = this.iterator('column', function (b, c) {
        if (a === k)
          return b.aoColumns[c].bVisible;
        var f = b.aoColumns, g = f[c], j = b.aoData, i, n, l;
        if (a !== k && g.bVisible !== a) {
          if (a) {
            var m = h.inArray(!0, G(f, 'bVisible'), c + 1);
            i = 0;
            for (n = j.length; i < n; i++)
              l = j[i].nTr, f = j[i].anCells, l && l.insertBefore(f[c], f[m] || null);
          } else
            h(G(b.aoData, 'anCells', c)).detach();
          g.bVisible = a;
          ea(b, b.aoHeader);
          ea(b, b.aoFooter);
          wa(b);
        }
      });
    a !== k && (this.iterator('column', function (c, e) {
      u(c, null, 'column-visibility', [
        c,
        e,
        a,
        b
      ]);
    }), (b === k || b) && this.columns.adjust());
    return c;
  });
  s('columns().indexes()', 'column().index()', function (a) {
    return this.iterator('column', function (b, c) {
      return 'visible' === a ? $(b, c) : c;
    }, 1);
  });
  p('columns.adjust()', function () {
    return this.iterator('table', function (a) {
      Y(a);
    }, 1);
  });
  p('column.index()', function (a, b) {
    if (0 !== this.context.length) {
      var c = this.context[0];
      if ('fromVisible' === a || 'toData' === a)
        return Z(c, b);
      if ('fromData' === a || 'toVisible' === a)
        return $(c, b);
    }
  });
  p('column()', function (a, b) {
    return bb(this.columns(a, b));
  });
  p('cells()', function (a, b, c) {
    h.isPlainObject(a) && (a.row === k ? (c = a, a = null) : (c = b, b = null));
    h.isPlainObject(b) && (c = b, b = null);
    if (null === b || b === k)
      return this.iterator('table', function (b) {
        var d = a, e = ab(c), f = b.aoData, g = Ba(b, e), j = Sb(ha(f, g, 'anCells')), i = h([].concat.apply([], j)), l, n = b.aoColumns.length, m, p, r, u, v, s;
        return $a('cell', d, function (a) {
          var c = typeof a === 'function';
          if (a === null || a === k || c) {
            m = [];
            p = 0;
            for (r = g.length; p < r; p++) {
              l = g[p];
              for (u = 0; u < n; u++) {
                v = {
                  row: l,
                  column: u
                };
                if (c) {
                  s = f[l];
                  a(v, B(b, l, u), s.anCells ? s.anCells[u] : null) && m.push(v);
                } else
                  m.push(v);
              }
            }
            return m;
          }
          if (h.isPlainObject(a))
            return [a];
          c = i.filter(a).map(function (a, b) {
            return {
              row: b._DT_CellIndex.row,
              column: b._DT_CellIndex.column
            };
          }).toArray();
          if (c.length || !a.nodeName)
            return c;
          s = h(a).closest('*[data-dt-row]');
          return s.length ? [{
              row: s.data('dt-row'),
              column: s.data('dt-column')
            }] : [];
        }, b, e);
      });
    var d = this.columns(b, c), e = this.rows(a, c), f, g, j, i, n, l = this.iterator('table', function (a, b) {
        f = [];
        g = 0;
        for (j = e[b].length; g < j; g++) {
          i = 0;
          for (n = d[b].length; i < n; i++)
            f.push({
              row: e[b][g],
              column: d[b][i]
            });
        }
        return f;
      }, 1);
    h.extend(l.selector, {
      cols: b,
      rows: a,
      opts: c
    });
    return l;
  });
  s('cells().nodes()', 'cell().node()', function () {
    return this.iterator('cell', function (a, b, c) {
      return (a = a.aoData[b]) && a.anCells ? a.anCells[c] : k;
    }, 1);
  });
  p('cells().data()', function () {
    return this.iterator('cell', function (a, b, c) {
      return B(a, b, c);
    }, 1);
  });
  s('cells().cache()', 'cell().cache()', function (a) {
    a = 'search' === a ? '_aFilterData' : '_aSortData';
    return this.iterator('cell', function (b, c, d) {
      return b.aoData[c][a][d];
    }, 1);
  });
  s('cells().render()', 'cell().render()', function (a) {
    return this.iterator('cell', function (b, c, d) {
      return B(b, c, d, a);
    }, 1);
  });
  s('cells().indexes()', 'cell().index()', function () {
    return this.iterator('cell', function (a, b, c) {
      return {
        row: b,
        column: c,
        columnVisible: $(a, c)
      };
    }, 1);
  });
  s('cells().invalidate()', 'cell().invalidate()', function (a) {
    return this.iterator('cell', function (b, c, d) {
      ca(b, c, a, d);
    });
  });
  p('cell()', function (a, b, c) {
    return bb(this.cells(a, b, c));
  });
  p('cell().data()', function (a) {
    var b = this.context, c = this[0];
    if (a === k)
      return b.length && c.length ? B(b[0], c[0].row, c[0].column) : k;
    jb(b[0], c[0].row, c[0].column, a);
    ca(b[0], c[0].row, 'data', c[0].column);
    return this;
  });
  p('order()', function (a, b) {
    var c = this.context;
    if (a === k)
      return 0 !== c.length ? c[0].aaSorting : k;
    'number' === typeof a ? a = [[
        a,
        b
      ]] : a.length && !h.isArray(a[0]) && (a = Array.prototype.slice.call(arguments));
    return this.iterator('table', function (b) {
      b.aaSorting = a.slice();
    });
  });
  p('order.listener()', function (a, b, c) {
    return this.iterator('table', function (d) {
      Ma(d, a, b, c);
    });
  });
  p('order.fixed()', function (a) {
    if (!a) {
      var b = this.context, b = b.length ? b[0].aaSortingFixed : k;
      return h.isArray(b) ? { pre: b } : b;
    }
    return this.iterator('table', function (b) {
      b.aaSortingFixed = h.extend(!0, {}, a);
    });
  });
  p([
    'columns().order()',
    'column().order()'
  ], function (a) {
    var b = this;
    return this.iterator('table', function (c, d) {
      var e = [];
      h.each(b[d], function (b, c) {
        e.push([
          c,
          a
        ]);
      });
      c.aaSorting = e;
    });
  });
  p('search()', function (a, b, c, d) {
    var e = this.context;
    return a === k ? 0 !== e.length ? e[0].oPreviousSearch.sSearch : k : this.iterator('table', function (e) {
      e.oFeatures.bFilter && fa(e, h.extend({}, e.oPreviousSearch, {
        sSearch: a + '',
        bRegex: null === b ? !1 : b,
        bSmart: null === c ? !0 : c,
        bCaseInsensitive: null === d ? !0 : d
      }), 1);
    });
  });
  s('columns().search()', 'column().search()', function (a, b, c, d) {
    return this.iterator('column', function (e, f) {
      var g = e.aoPreSearchCols;
      if (a === k)
        return g[f].sSearch;
      e.oFeatures.bFilter && (h.extend(g[f], {
        sSearch: a + '',
        bRegex: null === b ? !1 : b,
        bSmart: null === c ? !0 : c,
        bCaseInsensitive: null === d ? !0 : d
      }), fa(e, e.oPreviousSearch, 1));
    });
  });
  p('state()', function () {
    return this.context.length ? this.context[0].oSavedState : null;
  });
  p('state.clear()', function () {
    return this.iterator('table', function (a) {
      a.fnStateSaveCallback.call(a.oInstance, a, {});
    });
  });
  p('state.loaded()', function () {
    return this.context.length ? this.context[0].oLoadedState : null;
  });
  p('state.save()', function () {
    return this.iterator('table', function (a) {
      wa(a);
    });
  });
  m.versionCheck = m.fnVersionCheck = function (a) {
    for (var b = m.version.split('.'), a = a.split('.'), c, d, e = 0, f = a.length; e < f; e++)
      if (c = parseInt(b[e], 10) || 0, d = parseInt(a[e], 10) || 0, c !== d)
        return c > d;
    return !0;
  };
  m.isDataTable = m.fnIsDataTable = function (a) {
    var b = h(a).get(0), c = !1;
    h.each(m.settings, function (a, e) {
      var f = e.nScrollHead ? h('table', e.nScrollHead)[0] : null, g = e.nScrollFoot ? h('table', e.nScrollFoot)[0] : null;
      if (e.nTable === b || f === b || g === b)
        c = !0;
    });
    return c;
  };
  m.tables = m.fnTables = function (a) {
    var b = !1;
    h.isPlainObject(a) && (b = a.api, a = a.visible);
    var c = h.map(m.settings, function (b) {
        if (!a || a && h(b.nTable).is(':visible'))
          return b.nTable;
      });
    return b ? new r(c) : c;
  };
  m.camelToHungarian = K;
  p('$()', function (a, b) {
    var c = this.rows(b).nodes(), c = h(c);
    return h([].concat(c.filter(a).toArray(), c.find(a).toArray()));
  });
  h.each([
    'on',
    'one',
    'off'
  ], function (a, b) {
    p(b + '()', function () {
      var a = Array.prototype.slice.call(arguments);
      a[0].match(/\.dt\b/) || (a[0] += '.dt');
      var d = h(this.tables().nodes());
      d[b].apply(d, a);
      return this;
    });
  });
  p('clear()', function () {
    return this.iterator('table', function (a) {
      na(a);
    });
  });
  p('settings()', function () {
    return new r(this.context, this.context);
  });
  p('init()', function () {
    var a = this.context;
    return a.length ? a[0].oInit : null;
  });
  p('data()', function () {
    return this.iterator('table', function (a) {
      return G(a.aoData, '_aData');
    }).flatten();
  });
  p('destroy()', function (a) {
    a = a || !1;
    return this.iterator('table', function (b) {
      var c = b.nTableWrapper.parentNode, d = b.oClasses, e = b.nTable, f = b.nTBody, g = b.nTHead, j = b.nTFoot, i = h(e), f = h(f), k = h(b.nTableWrapper), l = h.map(b.aoData, function (a) {
          return a.nTr;
        }), p;
      b.bDestroying = !0;
      u(b, 'aoDestroyCallback', 'destroy', [b]);
      a || new r(b).columns().visible(!0);
      k.unbind('.DT').find(':not(tbody *)').unbind('.DT');
      h(D).unbind('.DT-' + b.sInstance);
      e != g.parentNode && (i.children('thead').detach(), i.append(g));
      j && e != j.parentNode && (i.children('tfoot').detach(), i.append(j));
      b.aaSorting = [];
      b.aaSortingFixed = [];
      va(b);
      h(l).removeClass(b.asStripeClasses.join(' '));
      h('th, td', g).removeClass(d.sSortable + ' ' + d.sSortableAsc + ' ' + d.sSortableDesc + ' ' + d.sSortableNone);
      b.bJUI && (h('th span.' + d.sSortIcon + ', td span.' + d.sSortIcon, g).detach(), h('th, td', g).each(function () {
        var a = h('div.' + d.sSortJUIWrapper, this);
        h(this).append(a.contents());
        a.detach();
      }));
      f.children().detach();
      f.append(l);
      g = a ? 'remove' : 'detach';
      i[g]();
      k[g]();
      !a && c && (c.insertBefore(e, b.nTableReinsertBefore), i.css('width', b.sDestroyWidth).removeClass(d.sTable), (p = b.asDestroyStripes.length) && f.children().each(function (a) {
        h(this).addClass(b.asDestroyStripes[a % p]);
      }));
      c = h.inArray(b, m.settings);
      -1 !== c && m.settings.splice(c, 1);
    });
  });
  h.each([
    'column',
    'row',
    'cell'
  ], function (a, b) {
    p(b + 's().every()', function (a) {
      var d = this.selector.opts, e = this;
      return this.iterator(b, function (f, g, h, i, n) {
        a.call(e[b](g, 'cell' === b ? h : d, 'cell' === b ? d : k), g, h, i, n);
      });
    });
  });
  p('i18n()', function (a, b, c) {
    var d = this.context[0], a = Q(a)(d.oLanguage);
    a === k && (a = b);
    c !== k && h.isPlainObject(a) && (a = a[c] !== k ? a[c] : a._);
    return a.replace('%d', c);
  });
  m.version = '1.10.12';
  m.settings = [];
  m.models = {};
  m.models.oSearch = {
    bCaseInsensitive: !0,
    sSearch: '',
    bRegex: !1,
    bSmart: !0
  };
  m.models.oRow = {
    nTr: null,
    anCells: null,
    _aData: [],
    _aSortData: null,
    _aFilterData: null,
    _sFilterRow: null,
    _sRowStripe: '',
    src: null,
    idx: -1
  };
  m.models.oColumn = {
    idx: null,
    aDataSort: null,
    asSorting: null,
    bSearchable: null,
    bSortable: null,
    bVisible: null,
    _sManualType: null,
    _bAttrSrc: !1,
    fnCreatedCell: null,
    fnGetData: null,
    fnSetData: null,
    mData: null,
    mRender: null,
    nTh: null,
    nTf: null,
    sClass: null,
    sContentPadding: null,
    sDefaultContent: null,
    sName: null,
    sSortDataType: 'std',
    sSortingClass: null,
    sSortingClassJUI: null,
    sTitle: null,
    sType: null,
    sWidth: null,
    sWidthOrig: null
  };
  m.defaults = {
    aaData: null,
    aaSorting: [[
        0,
        'asc'
      ]],
    aaSortingFixed: [],
    ajax: null,
    aLengthMenu: [
      10,
      25,
      50,
      100
    ],
    aoColumns: null,
    aoColumnDefs: null,
    aoSearchCols: [],
    asStripeClasses: null,
    bAutoWidth: !0,
    bDeferRender: !1,
    bDestroy: !1,
    bFilter: !0,
    bInfo: !0,
    bJQueryUI: !1,
    bLengthChange: !0,
    bPaginate: !0,
    bProcessing: !1,
    bRetrieve: !1,
    bScrollCollapse: !1,
    bServerSide: !1,
    bSort: !0,
    bSortMulti: !0,
    bSortCellsTop: !1,
    bSortClasses: !0,
    bStateSave: !1,
    fnCreatedRow: null,
    fnDrawCallback: null,
    fnFooterCallback: null,
    fnFormatNumber: function (a) {
      return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
    },
    fnHeaderCallback: null,
    fnInfoCallback: null,
    fnInitComplete: null,
    fnPreDrawCallback: null,
    fnRowCallback: null,
    fnServerData: null,
    fnServerParams: null,
    fnStateLoadCallback: function (a) {
      try {
        return JSON.parse((-1 === a.iStateDuration ? sessionStorage : localStorage).getItem('DataTables_' + a.sInstance + '_' + location.pathname));
      } catch (b) {
      }
    },
    fnStateLoadParams: null,
    fnStateLoaded: null,
    fnStateSaveCallback: function (a, b) {
      try {
        (-1 === a.iStateDuration ? sessionStorage : localStorage).setItem('DataTables_' + a.sInstance + '_' + location.pathname, JSON.stringify(b));
      } catch (c) {
      }
    },
    fnStateSaveParams: null,
    iStateDuration: 7200,
    iDeferLoading: null,
    iDisplayLength: 10,
    iDisplayStart: 0,
    iTabIndex: 0,
    oClasses: {},
    oLanguage: {
      oAria: {
        sSortAscending: ': activate to sort column ascending',
        sSortDescending: ': activate to sort column descending'
      },
      oPaginate: {
        sFirst: 'First',
        sLast: 'Last',
        sNext: 'Next',
        sPrevious: 'Previous'
      },
      sEmptyTable: 'No data available in table',
      sInfo: 'Showing _START_ to _END_ of _TOTAL_ entries',
      sInfoEmpty: 'Showing 0 to 0 of 0 entries',
      sInfoFiltered: '(filtered from _MAX_ total entries)',
      sInfoPostFix: '',
      sDecimal: '',
      sThousands: ',',
      sLengthMenu: 'Show _MENU_ entries',
      sLoadingRecords: 'Loading...',
      sProcessing: 'Processing...',
      sSearch: 'Search:',
      sSearchPlaceholder: '',
      sUrl: '',
      sZeroRecords: 'No matching records found'
    },
    oSearch: h.extend({}, m.models.oSearch),
    sAjaxDataProp: 'data',
    sAjaxSource: null,
    sDom: 'lfrtip',
    searchDelay: null,
    sPaginationType: 'simple_numbers',
    sScrollX: '',
    sScrollXInner: '',
    sScrollY: '',
    sServerMethod: 'GET',
    renderer: null,
    rowId: 'DT_RowId'
  };
  X(m.defaults);
  m.defaults.column = {
    aDataSort: null,
    iDataSort: -1,
    asSorting: [
      'asc',
      'desc'
    ],
    bSearchable: !0,
    bSortable: !0,
    bVisible: !0,
    fnCreatedCell: null,
    mData: null,
    mRender: null,
    sCellType: 'td',
    sClass: '',
    sContentPadding: '',
    sDefaultContent: null,
    sName: '',
    sSortDataType: 'std',
    sTitle: null,
    sType: null,
    sWidth: null
  };
  X(m.defaults.column);
  m.models.oSettings = {
    oFeatures: {
      bAutoWidth: null,
      bDeferRender: null,
      bFilter: null,
      bInfo: null,
      bLengthChange: null,
      bPaginate: null,
      bProcessing: null,
      bServerSide: null,
      bSort: null,
      bSortMulti: null,
      bSortClasses: null,
      bStateSave: null
    },
    oScroll: {
      bCollapse: null,
      iBarWidth: 0,
      sX: null,
      sXInner: null,
      sY: null
    },
    oLanguage: { fnInfoCallback: null },
    oBrowser: {
      bScrollOversize: !1,
      bScrollbarLeft: !1,
      bBounding: !1,
      barWidth: 0
    },
    ajax: null,
    aanFeatures: [],
    aoData: [],
    aiDisplay: [],
    aiDisplayMaster: [],
    aIds: {},
    aoColumns: [],
    aoHeader: [],
    aoFooter: [],
    oPreviousSearch: {},
    aoPreSearchCols: [],
    aaSorting: null,
    aaSortingFixed: [],
    asStripeClasses: null,
    asDestroyStripes: [],
    sDestroyWidth: 0,
    aoRowCallback: [],
    aoHeaderCallback: [],
    aoFooterCallback: [],
    aoDrawCallback: [],
    aoRowCreatedCallback: [],
    aoPreDrawCallback: [],
    aoInitComplete: [],
    aoStateSaveParams: [],
    aoStateLoadParams: [],
    aoStateLoaded: [],
    sTableId: '',
    nTable: null,
    nTHead: null,
    nTFoot: null,
    nTBody: null,
    nTableWrapper: null,
    bDeferLoading: !1,
    bInitialised: !1,
    aoOpenRows: [],
    sDom: null,
    searchDelay: null,
    sPaginationType: 'two_button',
    iStateDuration: 0,
    aoStateSave: [],
    aoStateLoad: [],
    oSavedState: null,
    oLoadedState: null,
    sAjaxSource: null,
    sAjaxDataProp: null,
    bAjaxDataGet: !0,
    jqXHR: null,
    json: k,
    oAjaxData: k,
    fnServerData: null,
    aoServerParams: [],
    sServerMethod: null,
    fnFormatNumber: null,
    aLengthMenu: null,
    iDraw: 0,
    bDrawing: !1,
    iDrawError: -1,
    _iDisplayLength: 10,
    _iDisplayStart: 0,
    _iRecordsTotal: 0,
    _iRecordsDisplay: 0,
    bJUI: null,
    oClasses: {},
    bFiltered: !1,
    bSorted: !1,
    bSortCellsTop: null,
    oInit: null,
    aoDestroyCallback: [],
    fnRecordsTotal: function () {
      return 'ssp' == y(this) ? 1 * this._iRecordsTotal : this.aiDisplayMaster.length;
    },
    fnRecordsDisplay: function () {
      return 'ssp' == y(this) ? 1 * this._iRecordsDisplay : this.aiDisplay.length;
    },
    fnDisplayEnd: function () {
      var a = this._iDisplayLength, b = this._iDisplayStart, c = b + a, d = this.aiDisplay.length, e = this.oFeatures, f = e.bPaginate;
      return e.bServerSide ? !1 === f || -1 === a ? b + d : Math.min(b + a, this._iRecordsDisplay) : !f || c > d || -1 === a ? d : c;
    },
    oInstance: null,
    sInstance: null,
    iTabIndex: 0,
    nScrollHead: null,
    nScrollFoot: null,
    aLastSort: [],
    oPlugins: {},
    rowIdFn: null,
    rowId: null
  };
  m.ext = v = {
    buttons: {},
    classes: {},
    builder: '-source-',
    errMode: 'alert',
    feature: [],
    search: [],
    selector: {
      cell: [],
      column: [],
      row: []
    },
    internal: {},
    legacy: { ajax: null },
    pager: {},
    renderer: {
      pageButton: {},
      header: {}
    },
    order: {},
    type: {
      detect: [],
      search: {},
      order: {}
    },
    _unique: 0,
    fnVersionCheck: m.fnVersionCheck,
    iApiIndex: 0,
    oJUIClasses: {},
    sVersion: m.version
  };
  h.extend(v, {
    afnFiltering: v.search,
    aTypes: v.type.detect,
    ofnSearch: v.type.search,
    oSort: v.type.order,
    afnSortData: v.order,
    aoFeatures: v.feature,
    oApi: v.internal,
    oStdClasses: v.classes,
    oPagination: v.pager
  });
  h.extend(m.ext.classes, {
    sTable: 'dataTable',
    sNoFooter: 'no-footer',
    sPageButton: 'paginate_button',
    sPageButtonActive: 'current',
    sPageButtonDisabled: 'disabled',
    sStripeOdd: 'odd',
    sStripeEven: 'even',
    sRowEmpty: 'dataTables_empty',
    sWrapper: 'dataTables_wrapper',
    sFilter: 'dataTables_filter',
    sInfo: 'dataTables_info',
    sPaging: 'dataTables_paginate paging_',
    sLength: 'dataTables_length',
    sProcessing: 'dataTables_processing',
    sSortAsc: 'sorting_asc',
    sSortDesc: 'sorting_desc',
    sSortable: 'sorting',
    sSortableAsc: 'sorting_asc_disabled',
    sSortableDesc: 'sorting_desc_disabled',
    sSortableNone: 'sorting_disabled',
    sSortColumn: 'sorting_',
    sFilterInput: '',
    sLengthSelect: '',
    sScrollWrapper: 'dataTables_scroll',
    sScrollHead: 'dataTables_scrollHead',
    sScrollHeadInner: 'dataTables_scrollHeadInner',
    sScrollBody: 'dataTables_scrollBody',
    sScrollFoot: 'dataTables_scrollFoot',
    sScrollFootInner: 'dataTables_scrollFootInner',
    sHeaderTH: '',
    sFooterTH: '',
    sSortJUIAsc: '',
    sSortJUIDesc: '',
    sSortJUI: '',
    sSortJUIAscAllowed: '',
    sSortJUIDescAllowed: '',
    sSortJUIWrapper: '',
    sSortIcon: '',
    sJUIHeader: '',
    sJUIFooter: ''
  });
  var Ca = '', Ca = '', H = Ca + 'ui-state-default', ia = Ca + 'css_right ui-icon ui-icon-', Xb = Ca + 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix';
  h.extend(m.ext.oJUIClasses, m.ext.classes, {
    sPageButton: 'fg-button ui-button ' + H,
    sPageButtonActive: 'ui-state-disabled',
    sPageButtonDisabled: 'ui-state-disabled',
    sPaging: 'dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_',
    sSortAsc: H + ' sorting_asc',
    sSortDesc: H + ' sorting_desc',
    sSortable: H + ' sorting',
    sSortableAsc: H + ' sorting_asc_disabled',
    sSortableDesc: H + ' sorting_desc_disabled',
    sSortableNone: H + ' sorting_disabled',
    sSortJUIAsc: ia + 'triangle-1-n',
    sSortJUIDesc: ia + 'triangle-1-s',
    sSortJUI: ia + 'carat-2-n-s',
    sSortJUIAscAllowed: ia + 'carat-1-n',
    sSortJUIDescAllowed: ia + 'carat-1-s',
    sSortJUIWrapper: 'DataTables_sort_wrapper',
    sSortIcon: 'DataTables_sort_icon',
    sScrollHead: 'dataTables_scrollHead ' + H,
    sScrollFoot: 'dataTables_scrollFoot ' + H,
    sHeaderTH: H,
    sFooterTH: H,
    sJUIHeader: Xb + ' ui-corner-tl ui-corner-tr',
    sJUIFooter: Xb + ' ui-corner-bl ui-corner-br'
  });
  var Mb = m.ext.pager;
  h.extend(Mb, {
    simple: function () {
      return [
        'previous',
        'next'
      ];
    },
    full: function () {
      return [
        'first',
        'previous',
        'next',
        'last'
      ];
    },
    numbers: function (a, b) {
      return [ya(a, b)];
    },
    simple_numbers: function (a, b) {
      return [
        'previous',
        ya(a, b),
        'next'
      ];
    },
    full_numbers: function (a, b) {
      return [
        'first',
        'previous',
        ya(a, b),
        'next',
        'last'
      ];
    },
    _numbers: ya,
    numbers_length: 7
  });
  h.extend(!0, m.ext.renderer, {
    pageButton: {
      _: function (a, b, c, d, e, f) {
        var g = a.oClasses, j = a.oLanguage.oPaginate, i = a.oLanguage.oAria.paginate || {}, k, l, m = 0, p = function (b, d) {
            var o, r, u, s, v = function (b) {
                Ta(a, b.data.action, true);
              };
            o = 0;
            for (r = d.length; o < r; o++) {
              s = d[o];
              if (h.isArray(s)) {
                u = h('<' + (s.DT_el || 'div') + '/>').appendTo(b);
                p(u, s);
              } else {
                k = null;
                l = '';
                switch (s) {
                case 'ellipsis':
                  b.append('<span class="ellipsis">&#x2026;</span>');
                  break;
                case 'first':
                  k = j.sFirst;
                  l = s + (e > 0 ? '' : ' ' + g.sPageButtonDisabled);
                  break;
                case 'previous':
                  k = j.sPrevious;
                  l = s + (e > 0 ? '' : ' ' + g.sPageButtonDisabled);
                  break;
                case 'next':
                  k = j.sNext;
                  l = s + (e < f - 1 ? '' : ' ' + g.sPageButtonDisabled);
                  break;
                case 'last':
                  k = j.sLast;
                  l = s + (e < f - 1 ? '' : ' ' + g.sPageButtonDisabled);
                  break;
                default:
                  k = s + 1;
                  l = e === s ? g.sPageButtonActive : '';
                }
                if (k !== null) {
                  u = h('<a>', {
                    'class': g.sPageButton + ' ' + l,
                    'aria-controls': a.sTableId,
                    'aria-label': i[s],
                    'data-dt-idx': m,
                    tabindex: a.iTabIndex,
                    id: c === 0 && typeof s === 'string' ? a.sTableId + '_' + s : null
                  }).html(k).appendTo(b);
                  Wa(u, { action: s }, v);
                  m++;
                }
              }
            }
          }, r;
        try {
          r = h(b).find(I.activeElement).data('dt-idx');
        } catch (o) {
        }
        p(h(b).empty(), d);
        r && h(b).find('[data-dt-idx=' + r + ']').focus();
      }
    }
  });
  h.extend(m.ext.type.detect, [
    function (a, b) {
      var c = b.oLanguage.sDecimal;
      return Za(a, c) ? 'num' + c : null;
    },
    function (a) {
      if (a && !(a instanceof Date) && (!ac.test(a) || !bc.test(a)))
        return null;
      var b = Date.parse(a);
      return null !== b && !isNaN(b) || M(a) ? 'date' : null;
    },
    function (a, b) {
      var c = b.oLanguage.sDecimal;
      return Za(a, c, !0) ? 'num-fmt' + c : null;
    },
    function (a, b) {
      var c = b.oLanguage.sDecimal;
      return Rb(a, c) ? 'html-num' + c : null;
    },
    function (a, b) {
      var c = b.oLanguage.sDecimal;
      return Rb(a, c, !0) ? 'html-num-fmt' + c : null;
    },
    function (a) {
      return M(a) || 'string' === typeof a && -1 !== a.indexOf('<') ? 'html' : null;
    }
  ]);
  h.extend(m.ext.type.search, {
    html: function (a) {
      return M(a) ? a : 'string' === typeof a ? a.replace(Ob, ' ').replace(Aa, '') : '';
    },
    string: function (a) {
      return M(a) ? a : 'string' === typeof a ? a.replace(Ob, ' ') : a;
    }
  });
  var za = function (a, b, c, d) {
    if (0 !== a && (!a || '-' === a))
      return -Infinity;
    b && (a = Qb(a, b));
    a.replace && (c && (a = a.replace(c, '')), d && (a = a.replace(d, '')));
    return 1 * a;
  };
  h.extend(v.type.order, {
    'date-pre': function (a) {
      return Date.parse(a) || 0;
    },
    'html-pre': function (a) {
      return M(a) ? '' : a.replace ? a.replace(/<.*?>/g, '').toLowerCase() : a + '';
    },
    'string-pre': function (a) {
      return M(a) ? '' : 'string' === typeof a ? a.toLowerCase() : !a.toString ? '' : a.toString();
    },
    'string-asc': function (a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    },
    'string-desc': function (a, b) {
      return a < b ? 1 : a > b ? -1 : 0;
    }
  });
  db('');
  h.extend(!0, m.ext.renderer, {
    header: {
      _: function (a, b, c, d) {
        h(a.nTable).on('order.dt.DT', function (e, f, g, h) {
          if (a === f) {
            e = c.idx;
            b.removeClass(c.sSortingClass + ' ' + d.sSortAsc + ' ' + d.sSortDesc).addClass(h[e] == 'asc' ? d.sSortAsc : h[e] == 'desc' ? d.sSortDesc : c.sSortingClass);
          }
        });
      },
      jqueryui: function (a, b, c, d) {
        h('<div/>').addClass(d.sSortJUIWrapper).append(b.contents()).append(h('<span/>').addClass(d.sSortIcon + ' ' + c.sSortingClassJUI)).appendTo(b);
        h(a.nTable).on('order.dt.DT', function (e, f, g, h) {
          if (a === f) {
            e = c.idx;
            b.removeClass(d.sSortAsc + ' ' + d.sSortDesc).addClass(h[e] == 'asc' ? d.sSortAsc : h[e] == 'desc' ? d.sSortDesc : c.sSortingClass);
            b.find('span.' + d.sSortIcon).removeClass(d.sSortJUIAsc + ' ' + d.sSortJUIDesc + ' ' + d.sSortJUI + ' ' + d.sSortJUIAscAllowed + ' ' + d.sSortJUIDescAllowed).addClass(h[e] == 'asc' ? d.sSortJUIAsc : h[e] == 'desc' ? d.sSortJUIDesc : c.sSortingClassJUI);
          }
        });
      }
    }
  });
  var Yb = function (a) {
    return 'string' === typeof a ? a.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') : a;
  };
  m.render = {
    number: function (a, b, c, d, e) {
      return {
        display: function (f) {
          if ('number' !== typeof f && 'string' !== typeof f)
            return f;
          var g = 0 > f ? '-' : '', h = parseFloat(f);
          if (isNaN(h))
            return Yb(f);
          f = Math.abs(h);
          h = parseInt(f, 10);
          f = c ? b + (f - h).toFixed(c).substring(2) : '';
          return g + (d || '') + h.toString().replace(/\B(?=(\d{3})+(?!\d))/g, a) + f + (e || '');
        }
      };
    },
    text: function () {
      return { display: Yb };
    }
  };
  h.extend(m.ext.internal, {
    _fnExternApiFunc: Nb,
    _fnBuildAjax: ra,
    _fnAjaxUpdate: lb,
    _fnAjaxParameters: ub,
    _fnAjaxUpdateDraw: vb,
    _fnAjaxDataSrc: sa,
    _fnAddColumn: Ea,
    _fnColumnOptions: ja,
    _fnAdjustColumnSizing: Y,
    _fnVisibleToColumnIndex: Z,
    _fnColumnIndexToVisible: $,
    _fnVisbleColumns: aa,
    _fnGetColumns: la,
    _fnColumnTypes: Ga,
    _fnApplyColumnDefs: ib,
    _fnHungarianMap: X,
    _fnCamelToHungarian: K,
    _fnLanguageCompat: Da,
    _fnBrowserDetect: gb,
    _fnAddData: N,
    _fnAddTr: ma,
    _fnNodeToDataIndex: function (a, b) {
      return b._DT_RowIndex !== k ? b._DT_RowIndex : null;
    },
    _fnNodeToColumnIndex: function (a, b, c) {
      return h.inArray(c, a.aoData[b].anCells);
    },
    _fnGetCellData: B,
    _fnSetCellData: jb,
    _fnSplitObjNotation: Ja,
    _fnGetObjectDataFn: Q,
    _fnSetObjectDataFn: R,
    _fnGetDataMaster: Ka,
    _fnClearTable: na,
    _fnDeleteIndex: oa,
    _fnInvalidate: ca,
    _fnGetRowElements: Ia,
    _fnCreateTr: Ha,
    _fnBuildHead: kb,
    _fnDrawHead: ea,
    _fnDraw: O,
    _fnReDraw: T,
    _fnAddOptionsHtml: nb,
    _fnDetectHeader: da,
    _fnGetUniqueThs: qa,
    _fnFeatureHtmlFilter: pb,
    _fnFilterComplete: fa,
    _fnFilterCustom: yb,
    _fnFilterColumn: xb,
    _fnFilter: wb,
    _fnFilterCreateSearch: Pa,
    _fnEscapeRegex: Qa,
    _fnFilterData: zb,
    _fnFeatureHtmlInfo: sb,
    _fnUpdateInfo: Cb,
    _fnInfoMacros: Db,
    _fnInitialise: ga,
    _fnInitComplete: ta,
    _fnLengthChange: Ra,
    _fnFeatureHtmlLength: ob,
    _fnFeatureHtmlPaginate: tb,
    _fnPageChange: Ta,
    _fnFeatureHtmlProcessing: qb,
    _fnProcessingDisplay: C,
    _fnFeatureHtmlTable: rb,
    _fnScrollDraw: ka,
    _fnApplyToChildren: J,
    _fnCalculateColumnWidths: Fa,
    _fnThrottle: Oa,
    _fnConvertToWidth: Fb,
    _fnGetWidestNode: Gb,
    _fnGetMaxLenString: Hb,
    _fnStringToCss: x,
    _fnSortFlatten: V,
    _fnSort: mb,
    _fnSortAria: Jb,
    _fnSortListener: Va,
    _fnSortAttachListener: Ma,
    _fnSortingClasses: va,
    _fnSortData: Ib,
    _fnSaveState: wa,
    _fnLoadState: Kb,
    _fnSettingsFromNode: xa,
    _fnLog: L,
    _fnMap: E,
    _fnBindAction: Wa,
    _fnCallbackReg: z,
    _fnCallbackFire: u,
    _fnLengthOverflow: Sa,
    _fnRenderer: Na,
    _fnDataSource: y,
    _fnRowAttributes: La,
    _fnCalculateEnd: function () {
    }
  });
  h.fn.dataTable = m;
  m.$ = h;
  h.fn.dataTableSettings = m.settings;
  h.fn.dataTableExt = m.ext;
  h.fn.DataTable = function (a) {
    return h(this).dataTable(a).api();
  };
  h.each(m, function (a, b) {
    h.fn.DataTable[a] = b;
  });
  return h.fn.dataTable;
}));
/*! DataTables Bootstrap 3 integration
 * ©2011-2015 SpryMedia Ltd - datatables.net/license
 */
/**
 * DataTables integration for Bootstrap 3. This requires Bootstrap 3 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([
      'jquery',
      'datatables.net'
    ], function ($) {
      return factory($, window, document);
    });
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = function (root, $) {
      if (!root) {
        root = window;
      }
      if (!$ || !$.fn.dataTable) {
        // Require DataTables, which attaches to jQuery, including
        // jQuery if needed and have a $ property so we can access the
        // jQuery object that is used
        $ = require('datatables.net')(root, $).$;
      }
      return factory($, root, root.document);
    };
  } else {
    // Browser
    factory(jQuery, window, document);
  }
}(function ($, window, document, undefined) {
  'use strict';
  var DataTable = $.fn.dataTable;
  /* Set the defaults for DataTables initialisation */
  $.extend(true, DataTable.defaults, {
    dom: '<\'row\'<\'col-md-6\'l><\'col-md-6\'f>>' + '<\'row\'<\'col-md-12\'tr>>' + '<\'row\'<\'col-md-5\'i><\'col-md-7\'p>>',
    renderer: 'bootstrap'
  });
  /* Default class modification */
  $.extend(DataTable.ext.classes, {
    sWrapper: 'dataTables_wrapper form-inline dt-bootstrap4',
    sFilterInput: 'form-control input-sm',
    sLengthSelect: 'form-control input-sm',
    sProcessing: 'dataTables_processing panel panel-default',
    sPageButton: 'paginate_button page-item'
  });
  /* Bootstrap paging button renderer */
  DataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
    var api = new DataTable.Api(settings);
    var classes = settings.oClasses;
    var lang = settings.oLanguage.oPaginate;
    var aria = settings.oLanguage.oAria.paginate || {};
    var btnDisplay, btnClass, counter = 0;
    var attach = function (container, buttons) {
      var i, ien, node, button;
      var clickHandler = function (e) {
        e.preventDefault();
        if (!$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action) {
          api.page(e.data.action).draw('page');
        }
      };
      for (i = 0, ien = buttons.length; i < ien; i++) {
        button = buttons[i];
        if ($.isArray(button)) {
          attach(container, button);
        } else {
          btnDisplay = '';
          btnClass = '';
          switch (button) {
          case 'ellipsis':
            btnDisplay = '&#x2026;';
            btnClass = 'disabled';
            break;
          case 'first':
            btnDisplay = lang.sFirst;
            btnClass = button + (page > 0 ? '' : ' disabled');
            break;
          case 'previous':
            btnDisplay = lang.sPrevious;
            btnClass = button + (page > 0 ? '' : ' disabled');
            break;
          case 'next':
            btnDisplay = lang.sNext;
            btnClass = button + (page < pages - 1 ? '' : ' disabled');
            break;
          case 'last':
            btnDisplay = lang.sLast;
            btnClass = button + (page < pages - 1 ? '' : ' disabled');
            break;
          default:
            btnDisplay = button + 1;
            btnClass = page === button ? 'active' : '';
            break;
          }
          if (btnDisplay) {
            node = $('<li>', {
              'class': classes.sPageButton + ' ' + btnClass,
              'id': idx === 0 && typeof button === 'string' ? settings.sTableId + '_' + button : null
            }).append($('<a>', {
              'href': '#',
              'aria-controls': settings.sTableId,
              'aria-label': aria[button],
              'data-dt-idx': counter,
              'tabindex': settings.iTabIndex,
              'class': 'page-link'
            }).html(btnDisplay)).appendTo(container);
            settings.oApi._fnBindAction(node, { action: button }, clickHandler);
            counter++;
          }
        }
      }
    };
    // IE9 throws an 'unknown error' if document.activeElement is used
    // inside an iframe or frame. 
    var activeEl;
    try {
      // Because this approach is destroying and recreating the paging
      // elements, focus is lost on the select button which is bad for
      // accessibility. So we want to restore focus once the draw has
      // completed
      activeEl = $(host).find(document.activeElement).data('dt-idx');
    } catch (e) {
    }
    attach($(host).empty().html('<ul class="pagination"/>').children('ul'), buttons);
    if (activeEl) {
      $(host).find('[data-dt-idx=' + activeEl + ']').focus();
    }
  };
  return DataTable;
}));
/*!
 FixedHeader 3.1.2
 ©2009-2016 SpryMedia Ltd - datatables.net/license
*/
(function (d) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net'
  ], function (g) {
    return d(g, window, document);
  }) : 'object' === typeof exports ? module.exports = function (g, h) {
    g || (g = window);
    if (!h || !h.fn.dataTable)
      h = require('datatables.net')(g, h).$;
    return d(h, g, g.document);
  } : d(jQuery, window, document);
}(function (d, g, h, k) {
  var j = d.fn.dataTable, l = 0, i = function (b, a) {
      if (!(this instanceof i))
        throw 'FixedHeader must be initialised with the \'new\' keyword.';
      !0 === a && (a = {});
      b = new j.Api(b);
      this.c = d.extend(!0, {}, i.defaults, a);
      this.s = {
        dt: b,
        position: {
          theadTop: 0,
          tbodyTop: 0,
          tfootTop: 0,
          tfootBottom: 0,
          width: 0,
          left: 0,
          tfootHeight: 0,
          theadHeight: 0,
          windowHeight: d(g).height(),
          visible: !0
        },
        headerMode: null,
        footerMode: null,
        autoWidth: b.settings()[0].oFeatures.bAutoWidth,
        namespace: '.dtfc' + l++,
        scrollLeft: {
          header: -1,
          footer: -1
        },
        enable: !0
      };
      this.dom = {
        floatingHeader: null,
        thead: d(b.table().header()),
        tbody: d(b.table().body()),
        tfoot: d(b.table().footer()),
        header: {
          host: null,
          floating: null,
          placeholder: null
        },
        footer: {
          host: null,
          floating: null,
          placeholder: null
        }
      };
      this.dom.header.host = this.dom.thead.parent();
      this.dom.footer.host = this.dom.tfoot.parent();
      var e = b.settings()[0];
      if (e._fixedHeader)
        throw 'FixedHeader already initialised on table ' + e.nTable.id;
      e._fixedHeader = this;
      this._constructor();
    };
  d.extend(i.prototype, {
    enable: function (b) {
      this.s.enable = b;
      this.c.header && this._modeChange('in-place', 'header', !0);
      this.c.footer && this.dom.tfoot.length && this._modeChange('in-place', 'footer', !0);
      this.update();
    },
    headerOffset: function (b) {
      b !== k && (this.c.headerOffset = b, this.update());
      return this.c.headerOffset;
    },
    footerOffset: function (b) {
      b !== k && (this.c.footerOffset = b, this.update());
      return this.c.footerOffset;
    },
    update: function () {
      this._positions();
      this._scroll(!0);
    },
    _constructor: function () {
      var b = this, a = this.s.dt;
      d(g).on('scroll' + this.s.namespace, function () {
        b._scroll();
      }).on('resize' + this.s.namespace, function () {
        b.s.position.windowHeight = d(g).height();
        b.update();
      });
      var e = d('.fh-fixedHeader');
      !this.c.headerOffset && e.length && (this.c.headerOffset = e.outerHeight());
      e = d('.fh-fixedFooter');
      !this.c.footerOffset && e.length && (this.c.footerOffset = e.outerHeight());
      a.on('column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc column-sizing.dt.dtfc', function () {
        b.update();
      });
      a.on('destroy.dtfc', function () {
        a.off('.dtfc');
        d(g).off(b.s.namespace);
      });
      this._positions();
      this._scroll();
    },
    _clone: function (b, a) {
      var e = this.s.dt, c = this.dom[b], f = 'header' === b ? this.dom.thead : this.dom.tfoot;
      !a && c.floating ? c.floating.removeClass('fixedHeader-floating fixedHeader-locked') : (c.floating && (c.placeholder.remove(), this._unsize(b), c.floating.children().detach(), c.floating.remove()), c.floating = d(e.table().node().cloneNode(!1)).css('table-layout', 'fixed').removeAttr('id').append(f).appendTo('body'), c.placeholder = f.clone(!1), c.host.prepend(c.placeholder), this._matchWidths(c.placeholder, c.floating));
    },
    _matchWidths: function (b, a) {
      var e = function (a) {
          return d(a, b).map(function () {
            return d(this).width();
          }).toArray();
        }, c = function (b, c) {
          d(b, a).each(function (a) {
            d(this).css({
              width: c[a],
              minWidth: c[a]
            });
          });
        }, f = e('th'), e = e('td');
      c('th', f);
      c('td', e);
    },
    _unsize: function (b) {
      var a = this.dom[b].floating;
      a && ('footer' === b || 'header' === b && !this.s.autoWidth) ? d('th, td', a).css({
        width: '',
        minWidth: ''
      }) : a && 'header' === b && d('th, td', a).css('min-width', '');
    },
    _horizontal: function (b, a) {
      var e = this.dom[b], c = this.s.position, d = this.s.scrollLeft;
      e.floating && d[b] !== a && (e.floating.css('left', c.left - a), d[b] = a);
    },
    _modeChange: function (b, a, e) {
      var c = this.dom[a], f = this.s.position, g = d.contains(this.dom['footer' === a ? 'tfoot' : 'thead'][0], h.activeElement) ? h.activeElement : null;
      if ('in-place' === b) {
        if (c.placeholder && (c.placeholder.remove(), c.placeholder = null), this._unsize(a), 'header' === a ? c.host.prepend(this.dom.thead) : c.host.append(this.dom.tfoot), c.floating)
          c.floating.remove(), c.floating = null;
      } else
        'in' === b ? (this._clone(a, e), c.floating.addClass('fixedHeader-floating').css('header' === a ? 'top' : 'bottom', this.c[a + 'Offset']).css('left', f.left + 'px').css('width', f.width + 'px'), 'footer' === a && c.floating.css('top', '')) : 'below' === b ? (this._clone(a, e), c.floating.addClass('fixedHeader-locked').css('top', f.tfootTop - f.theadHeight).css('left', f.left + 'px').css('width', f.width + 'px')) : 'above' === b && (this._clone(a, e), c.floating.addClass('fixedHeader-locked').css('top', f.tbodyTop).css('left', f.left + 'px').css('width', f.width + 'px'));
      g && g !== h.activeElement && g.focus();
      this.s.scrollLeft.header = -1;
      this.s.scrollLeft.footer = -1;
      this.s[a + 'Mode'] = b;
    },
    _positions: function () {
      var b = this.s.dt.table(), a = this.s.position, e = this.dom, b = d(b.node()), c = b.children('thead'), f = b.children('tfoot'), e = e.tbody;
      a.visible = b.is(':visible');
      a.width = b.outerWidth();
      a.left = b.offset().left;
      a.theadTop = c.offset().top;
      a.tbodyTop = e.offset().top;
      a.theadHeight = a.tbodyTop - a.theadTop;
      f.length ? (a.tfootTop = f.offset().top, a.tfootBottom = a.tfootTop + f.outerHeight(), a.tfootHeight = a.tfootBottom - a.tfootTop) : (a.tfootTop = a.tbodyTop + e.outerHeight(), a.tfootBottom = a.tfootTop, a.tfootHeight = a.tfootTop);
    },
    _scroll: function (b) {
      var a = d(h).scrollTop(), e = d(h).scrollLeft(), c = this.s.position, f;
      if (this.s.enable && (this.c.header && (f = !c.visible || a <= c.theadTop - this.c.headerOffset ? 'in-place' : a <= c.tfootTop - c.theadHeight - this.c.headerOffset ? 'in' : 'below', (b || f !== this.s.headerMode) && this._modeChange(f, 'header', b), this._horizontal('header', e)), this.c.footer && this.dom.tfoot.length))
        a = !c.visible || a + c.windowHeight >= c.tfootBottom + this.c.footerOffset ? 'in-place' : c.windowHeight + a > c.tbodyTop + c.tfootHeight + this.c.footerOffset ? 'in' : 'above', (b || a !== this.s.footerMode) && this._modeChange(a, 'footer', b), this._horizontal('footer', e);
    }
  });
  i.version = '3.1.2';
  i.defaults = {
    header: !0,
    footer: !1,
    headerOffset: 0,
    footerOffset: 0
  };
  d.fn.dataTable.FixedHeader = i;
  d.fn.DataTable.FixedHeader = i;
  d(h).on('init.dt.dtfh', function (b, a) {
    if ('dt' === b.namespace) {
      var e = a.oInit.fixedHeader, c = j.defaults.fixedHeader;
      if ((e || c) && !a._fixedHeader)
        c = d.extend({}, c, e), !1 !== e && new i(a, c);
    }
  });
  j.Api.register('fixedHeader()', function () {
  });
  j.Api.register('fixedHeader.adjust()', function () {
    return this.iterator('table', function (b) {
      (b = b._fixedHeader) && b.update();
    });
  });
  j.Api.register('fixedHeader.enable()', function (b) {
    return this.iterator('table', function (a) {
      (a = a._fixedHeader) && a.enable(b !== k ? b : !0);
    });
  });
  j.Api.register('fixedHeader.disable()', function () {
    return this.iterator('table', function (b) {
      (b = b._fixedHeader) && b.enable(!1);
    });
  });
  d.each([
    'header',
    'footer'
  ], function (b, a) {
    j.Api.register('fixedHeader.' + a + 'Offset()', function (b) {
      var c = this.context;
      return b === k ? c.length && c[0]._fixedHeader ? c[0]._fixedHeader[a + 'Offset']() : k : this.iterator('table', function (c) {
        if (c = c._fixedHeader)
          c[a + 'Offset'](b);
      });
    });
  });
  return i;
}));
/*!
 FixedColumns 3.2.2
 ©2010-2016 SpryMedia Ltd - datatables.net/license
*/
(function (d) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net'
  ], function (q) {
    return d(q, window, document);
  }) : 'object' === typeof exports ? module.exports = function (q, r) {
    q || (q = window);
    if (!r || !r.fn.dataTable)
      r = require('datatables.net')(q, r).$;
    return d(r, q, q.document);
  } : d(jQuery, window, document);
}(function (d, q, r, t) {
  var s = d.fn.dataTable, u, m = function (a, b) {
      var c = this;
      if (this instanceof m) {
        if (b === t || !0 === b)
          b = {};
        var e = d.fn.dataTable.camelToHungarian;
        e && (e(m.defaults, m.defaults, !0), e(m.defaults, b));
        e = new d.fn.dataTable.Api(a).settings()[0];
        this.s = {
          dt: e,
          iTableColumns: e.aoColumns.length,
          aiOuterWidths: [],
          aiInnerWidths: [],
          rtl: 'rtl' === d(e.nTable).css('direction')
        };
        this.dom = {
          scroller: null,
          header: null,
          body: null,
          footer: null,
          grid: {
            wrapper: null,
            dt: null,
            left: {
              wrapper: null,
              head: null,
              body: null,
              foot: null
            },
            right: {
              wrapper: null,
              head: null,
              body: null,
              foot: null
            }
          },
          clone: {
            left: {
              header: null,
              body: null,
              footer: null
            },
            right: {
              header: null,
              body: null,
              footer: null
            }
          }
        };
        if (e._oFixedColumns)
          throw 'FixedColumns already initialised on this table';
        e._oFixedColumns = this;
        e._bInitComplete ? this._fnConstruct(b) : e.oApi._fnCallbackReg(e, 'aoInitComplete', function () {
          c._fnConstruct(b);
        }, 'FixedColumns');
      } else
        alert('FixedColumns warning: FixedColumns must be initialised with the \'new\' keyword.');
    };
  d.extend(m.prototype, {
    fnUpdate: function () {
      this._fnDraw(!0);
    },
    fnRedrawLayout: function () {
      this._fnColCalc();
      this._fnGridLayout();
      this.fnUpdate();
    },
    fnRecalculateHeight: function (a) {
      delete a._DTTC_iHeight;
      a.style.height = 'auto';
    },
    fnSetRowHeight: function (a, b) {
      a.style.height = b + 'px';
    },
    fnGetPosition: function (a) {
      var b = this.s.dt.oInstance;
      if (d(a).parents('.DTFC_Cloned').length) {
        if ('tr' === a.nodeName.toLowerCase())
          return a = d(a).index(), b.fnGetPosition(d('tr', this.s.dt.nTBody)[a]);
        var c = d(a).index(), a = d(a.parentNode).index();
        return [
          b.fnGetPosition(d('tr', this.s.dt.nTBody)[a]),
          c,
          b.oApi._fnVisibleToColumnIndex(this.s.dt, c)
        ];
      }
      return b.fnGetPosition(a);
    },
    _fnConstruct: function (a) {
      var b = this;
      if ('function' != typeof this.s.dt.oInstance.fnVersionCheck || !0 !== this.s.dt.oInstance.fnVersionCheck('1.8.0'))
        alert('FixedColumns ' + m.VERSION + ' required DataTables 1.8.0 or later. Please upgrade your DataTables installation');
      else if ('' === this.s.dt.oScroll.sX)
        this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, 'FixedColumns is not needed (no x-scrolling in DataTables enabled), so no action will be taken. Use \'FixedHeader\' for column fixing when scrolling is not enabled');
      else {
        this.s = d.extend(!0, this.s, m.defaults, a);
        a = this.s.dt.oClasses;
        this.dom.grid.dt = d(this.s.dt.nTable).parents('div.' + a.sScrollWrapper)[0];
        this.dom.scroller = d('div.' + a.sScrollBody, this.dom.grid.dt)[0];
        this._fnColCalc();
        this._fnGridSetup();
        var c, e = !1;
        d(this.s.dt.nTableWrapper).on('mousedown.DTFC', function () {
          e = !0;
          d(r).one('mouseup', function () {
            e = !1;
          });
        });
        d(this.dom.scroller).on('mouseover.DTFC touchstart.DTFC', function () {
          e || (c = 'main');
        }).on('scroll.DTFC', function (a) {
          !c && a.originalEvent && (c = 'main');
          if ('main' === c && (0 < b.s.iLeftColumns && (b.dom.grid.left.liner.scrollTop = b.dom.scroller.scrollTop), 0 < b.s.iRightColumns))
            b.dom.grid.right.liner.scrollTop = b.dom.scroller.scrollTop;
        });
        var f = 'onwheel' in r.createElement('div') ? 'wheel.DTFC' : 'mousewheel.DTFC';
        if (0 < b.s.iLeftColumns)
          d(b.dom.grid.left.liner).on('mouseover.DTFC touchstart.DTFC', function () {
            e || (c = 'left');
          }).on('scroll.DTFC', function (a) {
            !c && a.originalEvent && (c = 'left');
            'left' === c && (b.dom.scroller.scrollTop = b.dom.grid.left.liner.scrollTop, 0 < b.s.iRightColumns && (b.dom.grid.right.liner.scrollTop = b.dom.grid.left.liner.scrollTop));
          }).on(f, function (a) {
            b.dom.scroller.scrollLeft -= 'wheel' === a.type ? -a.originalEvent.deltaX : a.originalEvent.wheelDeltaX;
          });
        if (0 < b.s.iRightColumns)
          d(b.dom.grid.right.liner).on('mouseover.DTFC touchstart.DTFC', function () {
            e || (c = 'right');
          }).on('scroll.DTFC', function (a) {
            !c && a.originalEvent && (c = 'right');
            'right' === c && (b.dom.scroller.scrollTop = b.dom.grid.right.liner.scrollTop, 0 < b.s.iLeftColumns && (b.dom.grid.left.liner.scrollTop = b.dom.grid.right.liner.scrollTop));
          }).on(f, function (a) {
            b.dom.scroller.scrollLeft -= 'wheel' === a.type ? -a.originalEvent.deltaX : a.originalEvent.wheelDeltaX;
          });
        d(q).on('resize.DTFC', function () {
          b._fnGridLayout.call(b);
        });
        var g = !0, h = d(this.s.dt.nTable);
        h.on('draw.dt.DTFC', function () {
          b._fnColCalc();
          b._fnDraw.call(b, g);
          g = !1;
        }).on('column-sizing.dt.DTFC', function () {
          b._fnColCalc();
          b._fnGridLayout(b);
        }).on('column-visibility.dt.DTFC', function (a, c, d, e, f) {
          if (f === t || f)
            b._fnColCalc(), b._fnGridLayout(b), b._fnDraw(!0);
        }).on('select.dt.DTFC deselect.dt.DTFC', function (a) {
          'dt' === a.namespace && b._fnDraw(!1);
        }).on('destroy.dt.DTFC', function () {
          h.off('.DTFC');
          d(b.dom.scroller).off('.DTFC');
          d(q).off('.DTFC');
          d(b.s.dt.nTableWrapper).off('.DTFC');
          d(b.dom.grid.left.liner).off('.DTFC ' + f);
          d(b.dom.grid.left.wrapper).remove();
          d(b.dom.grid.right.liner).off('.DTFC ' + f);
          d(b.dom.grid.right.wrapper).remove();
        });
        this._fnGridLayout();
        this.s.dt.oInstance.fnDraw(!1);
      }
    },
    _fnColCalc: function () {
      var a = this, b = 0, c = 0;
      this.s.aiInnerWidths = [];
      this.s.aiOuterWidths = [];
      d.each(this.s.dt.aoColumns, function (e, f) {
        var g = d(f.nTh), h;
        if (g.filter(':visible').length) {
          var i = g.outerWidth();
          0 === a.s.aiOuterWidths.length && (h = d(a.s.dt.nTable).css('border-left-width'), i += 'string' === typeof h ? 1 : parseInt(h, 10));
          a.s.aiOuterWidths.length === a.s.dt.aoColumns.length - 1 && (h = d(a.s.dt.nTable).css('border-right-width'), i += 'string' === typeof h ? 1 : parseInt(h, 10));
          a.s.aiOuterWidths.push(i);
          a.s.aiInnerWidths.push(g.width());
          e < a.s.iLeftColumns && (b += i);
          a.s.iTableColumns - a.s.iRightColumns <= e && (c += i);
        } else
          a.s.aiInnerWidths.push(0), a.s.aiOuterWidths.push(0);
      });
      this.s.iLeftWidth = b;
      this.s.iRightWidth = c;
    },
    _fnGridSetup: function () {
      var a = this._fnDTOverflow(), b;
      this.dom.body = this.s.dt.nTable;
      this.dom.header = this.s.dt.nTHead.parentNode;
      this.dom.header.parentNode.parentNode.style.position = 'relative';
      var c = d('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;"><div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;"><div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div><div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_LeftBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div></div><div class="DTFC_RightWrapper" style="position:absolute; top:0; right:0;"><div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightHeadBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div><div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;"><div class="DTFC_RightBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div></div><div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0;"><div class="DTFC_RightFootBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div></div></div></div>')[0], e = c.childNodes[0], f = c.childNodes[1];
      this.dom.grid.dt.parentNode.insertBefore(c, this.dom.grid.dt);
      c.appendChild(this.dom.grid.dt);
      this.dom.grid.wrapper = c;
      0 < this.s.iLeftColumns && (this.dom.grid.left.wrapper = e, this.dom.grid.left.head = e.childNodes[0], this.dom.grid.left.body = e.childNodes[1], this.dom.grid.left.liner = d('div.DTFC_LeftBodyLiner', c)[0], c.appendChild(e));
      0 < this.s.iRightColumns && (this.dom.grid.right.wrapper = f, this.dom.grid.right.head = f.childNodes[0], this.dom.grid.right.body = f.childNodes[1], this.dom.grid.right.liner = d('div.DTFC_RightBodyLiner', c)[0], f.style.right = a.bar + 'px', b = d('div.DTFC_RightHeadBlocker', c)[0], b.style.width = a.bar + 'px', b.style.right = -a.bar + 'px', this.dom.grid.right.headBlock = b, b = d('div.DTFC_RightFootBlocker', c)[0], b.style.width = a.bar + 'px', b.style.right = -a.bar + 'px', this.dom.grid.right.footBlock = b, c.appendChild(f));
      if (this.s.dt.nTFoot && (this.dom.footer = this.s.dt.nTFoot.parentNode, 0 < this.s.iLeftColumns && (this.dom.grid.left.foot = e.childNodes[2]), 0 < this.s.iRightColumns))
        this.dom.grid.right.foot = f.childNodes[2];
      this.s.rtl && d('div.DTFC_RightHeadBlocker', c).css({
        left: -a.bar + 'px',
        right: ''
      });
    },
    _fnGridLayout: function () {
      var a = this, b = this.dom.grid;
      d(b.wrapper).width();
      var c = d(this.s.dt.nTable.parentNode).outerHeight(), e = d(this.s.dt.nTable.parentNode.parentNode).outerHeight(), f = this._fnDTOverflow(), g = this.s.iLeftWidth, h = this.s.iRightWidth, i = 'rtl' === d(this.dom.body).css('direction'), j = function (b, c) {
          f.bar ? a._firefoxScrollError() ? 34 < d(b).height() && (b.style.width = c + f.bar + 'px') : b.style.width = c + f.bar + 'px' : (b.style.width = c + 20 + 'px', b.style.paddingRight = '20px', b.style.boxSizing = 'border-box');
        };
      f.x && (c -= f.bar);
      b.wrapper.style.height = e + 'px';
      0 < this.s.iLeftColumns && (e = b.left.wrapper, e.style.width = g + 'px', e.style.height = '1px', i ? (e.style.left = '', e.style.right = 0) : (e.style.left = 0, e.style.right = ''), b.left.body.style.height = c + 'px', b.left.foot && (b.left.foot.style.top = (f.x ? f.bar : 0) + 'px'), j(b.left.liner, g), b.left.liner.style.height = c + 'px');
      0 < this.s.iRightColumns && (e = b.right.wrapper, e.style.width = h + 'px', e.style.height = '1px', this.s.rtl ? (e.style.left = f.y ? f.bar + 'px' : 0, e.style.right = '') : (e.style.left = '', e.style.right = f.y ? f.bar + 'px' : 0), b.right.body.style.height = c + 'px', b.right.foot && (b.right.foot.style.top = (f.x ? f.bar : 0) + 'px'), j(b.right.liner, h), b.right.liner.style.height = c + 'px', b.right.headBlock.style.display = f.y ? 'block' : 'none', b.right.footBlock.style.display = f.y ? 'block' : 'none');
    },
    _fnDTOverflow: function () {
      var a = this.s.dt.nTable, b = a.parentNode, c = {
          x: !1,
          y: !1,
          bar: this.s.dt.oScroll.iBarWidth
        };
      a.offsetWidth > b.clientWidth && (c.x = !0);
      a.offsetHeight > b.clientHeight && (c.y = !0);
      return c;
    },
    _fnDraw: function (a) {
      this._fnGridLayout();
      this._fnCloneLeft(a);
      this._fnCloneRight(a);
      null !== this.s.fnDrawCallback && this.s.fnDrawCallback.call(this, this.dom.clone.left, this.dom.clone.right);
      d(this).trigger('draw.dtfc', {
        leftClone: this.dom.clone.left,
        rightClone: this.dom.clone.right
      });
    },
    _fnCloneRight: function (a) {
      if (!(0 >= this.s.iRightColumns)) {
        var b, c = [];
        for (b = this.s.iTableColumns - this.s.iRightColumns; b < this.s.iTableColumns; b++)
          this.s.dt.aoColumns[b].bVisible && c.push(b);
        this._fnClone(this.dom.clone.right, this.dom.grid.right, c, a);
      }
    },
    _fnCloneLeft: function (a) {
      if (!(0 >= this.s.iLeftColumns)) {
        var b, c = [];
        for (b = 0; b < this.s.iLeftColumns; b++)
          this.s.dt.aoColumns[b].bVisible && c.push(b);
        this._fnClone(this.dom.clone.left, this.dom.grid.left, c, a);
      }
    },
    _fnCopyLayout: function (a, b, c) {
      for (var e = [], f = [], g = [], h = 0, i = a.length; h < i; h++) {
        var j = [];
        j.nTr = d(a[h].nTr).clone(c, !1)[0];
        for (var l = 0, o = this.s.iTableColumns; l < o; l++)
          if (-1 !== d.inArray(l, b)) {
            var p = d.inArray(a[h][l].cell, g);
            -1 === p ? (p = d(a[h][l].cell).clone(c, !1)[0], f.push(p), g.push(a[h][l].cell), j.push({
              cell: p,
              unique: a[h][l].unique
            })) : j.push({
              cell: f[p],
              unique: a[h][l].unique
            });
          }
        e.push(j);
      }
      return e;
    },
    _fnClone: function (a, b, c, e) {
      var f = this, g, h, i, j, l, o, p, n, m, k = this.s.dt;
      if (e) {
        d(a.header).remove();
        a.header = d(this.dom.header).clone(!0, !1)[0];
        a.header.className += ' DTFC_Cloned';
        a.header.style.width = '100%';
        b.head.appendChild(a.header);
        n = this._fnCopyLayout(k.aoHeader, c, !0);
        j = d('>thead', a.header);
        j.empty();
        g = 0;
        for (h = n.length; g < h; g++)
          j[0].appendChild(n[g].nTr);
        k.oApi._fnDrawHead(k, n, !0);
      } else {
        n = this._fnCopyLayout(k.aoHeader, c, !1);
        m = [];
        k.oApi._fnDetectHeader(m, d('>thead', a.header)[0]);
        g = 0;
        for (h = n.length; g < h; g++) {
          i = 0;
          for (j = n[g].length; i < j; i++)
            m[g][i].cell.className = n[g][i].cell.className, d('span.DataTables_sort_icon', m[g][i].cell).each(function () {
              this.className = d('span.DataTables_sort_icon', n[g][i].cell)[0].className;
            });
        }
      }
      this._fnEqualiseHeights('thead', this.dom.header, a.header);
      'auto' == this.s.sHeightMatch && d('>tbody>tr', f.dom.body).css('height', 'auto');
      null !== a.body && (d(a.body).remove(), a.body = null);
      a.body = d(this.dom.body).clone(!0)[0];
      a.body.className += ' DTFC_Cloned';
      a.body.style.paddingBottom = k.oScroll.iBarWidth + 'px';
      a.body.style.marginBottom = 2 * k.oScroll.iBarWidth + 'px';
      null !== a.body.getAttribute('id') && a.body.removeAttribute('id');
      d('>thead>tr', a.body).empty();
      d('>tfoot', a.body).remove();
      var q = d('tbody', a.body)[0];
      d(q).empty();
      if (0 < k.aiDisplay.length) {
        h = d('>thead>tr', a.body)[0];
        for (p = 0; p < c.length; p++)
          l = c[p], o = d(k.aoColumns[l].nTh).clone(!0)[0], o.innerHTML = '', j = o.style, j.paddingTop = '0', j.paddingBottom = '0', j.borderTopWidth = '0', j.borderBottomWidth = '0', j.height = 0, j.width = f.s.aiInnerWidths[l] + 'px', h.appendChild(o);
        d('>tbody>tr', f.dom.body).each(function (a) {
          var a = f.s.dt.oFeatures.bServerSide === false ? f.s.dt.aiDisplay[f.s.dt._iDisplayStart + a] : a, b = f.s.dt.aoData[a].anCells || d(this).children('td, th'), e = this.cloneNode(false);
          e.removeAttribute('id');
          e.setAttribute('data-dt-row', a);
          for (p = 0; p < c.length; p++) {
            l = c[p];
            if (b.length > 0) {
              o = d(b[l]).clone(true, true)[0];
              o.setAttribute('data-dt-row', a);
              o.setAttribute('data-dt-column', p);
              e.appendChild(o);
            }
          }
          q.appendChild(e);
        });
      } else
        d('>tbody>tr', f.dom.body).each(function () {
          o = this.cloneNode(true);
          o.className = o.className + ' DTFC_NoData';
          d('td', o).html('');
          q.appendChild(o);
        });
      a.body.style.width = '100%';
      a.body.style.margin = '0';
      a.body.style.padding = '0';
      k.oScroller !== t && (h = k.oScroller.dom.force, b.forcer ? b.forcer.style.height = h.style.height : (b.forcer = h.cloneNode(!0), b.liner.appendChild(b.forcer)));
      b.liner.appendChild(a.body);
      this._fnEqualiseHeights('tbody', f.dom.body, a.body);
      if (null !== k.nTFoot) {
        if (e) {
          null !== a.footer && a.footer.parentNode.removeChild(a.footer);
          a.footer = d(this.dom.footer).clone(!0, !0)[0];
          a.footer.className += ' DTFC_Cloned';
          a.footer.style.width = '100%';
          b.foot.appendChild(a.footer);
          n = this._fnCopyLayout(k.aoFooter, c, !0);
          b = d('>tfoot', a.footer);
          b.empty();
          g = 0;
          for (h = n.length; g < h; g++)
            b[0].appendChild(n[g].nTr);
          k.oApi._fnDrawHead(k, n, !0);
        } else {
          n = this._fnCopyLayout(k.aoFooter, c, !1);
          b = [];
          k.oApi._fnDetectHeader(b, d('>tfoot', a.footer)[0]);
          g = 0;
          for (h = n.length; g < h; g++) {
            i = 0;
            for (j = n[g].length; i < j; i++)
              b[g][i].cell.className = n[g][i].cell.className;
          }
        }
        this._fnEqualiseHeights('tfoot', this.dom.footer, a.footer);
      }
      b = k.oApi._fnGetUniqueThs(k, d('>thead', a.header)[0]);
      d(b).each(function (a) {
        l = c[a];
        this.style.width = f.s.aiInnerWidths[l] + 'px';
      });
      null !== f.s.dt.nTFoot && (b = k.oApi._fnGetUniqueThs(k, d('>tfoot', a.footer)[0]), d(b).each(function (a) {
        l = c[a];
        this.style.width = f.s.aiInnerWidths[l] + 'px';
      }));
    },
    _fnGetTrNodes: function (a) {
      for (var b = [], c = 0, d = a.childNodes.length; c < d; c++)
        'TR' == a.childNodes[c].nodeName.toUpperCase() && b.push(a.childNodes[c]);
      return b;
    },
    _fnEqualiseHeights: function (a, b, c) {
      if (!('none' == this.s.sHeightMatch && 'thead' !== a && 'tfoot' !== a)) {
        var e, f, g = b.getElementsByTagName(a)[0], c = c.getElementsByTagName(a)[0], a = d('>' + a + '>tr:eq(0)', b).children(':first');
        a.outerHeight();
        a.height();
        for (var g = this._fnGetTrNodes(g), b = this._fnGetTrNodes(c), h = [], c = 0, a = b.length; c < a; c++)
          e = g[c].offsetHeight, f = b[c].offsetHeight, e = f > e ? f : e, 'semiauto' == this.s.sHeightMatch && (g[c]._DTTC_iHeight = e), h.push(e);
        c = 0;
        for (a = b.length; c < a; c++)
          b[c].style.height = h[c] + 'px', g[c].style.height = h[c] + 'px';
      }
    },
    _firefoxScrollError: function () {
      if (u === t) {
        var a = d('<div/>').css({
            position: 'absolute',
            top: 0,
            left: 0,
            height: 10,
            width: 50,
            overflow: 'scroll'
          }).appendTo('body');
        u = a[0].clientWidth === a[0].offsetWidth && 0 !== this._fnDTOverflow().bar;
        a.remove();
      }
      return u;
    }
  });
  m.defaults = {
    iLeftColumns: 1,
    iRightColumns: 0,
    fnDrawCallback: null,
    sHeightMatch: 'semiauto'
  };
  m.version = '3.2.2';
  s.Api.register('fixedColumns()', function () {
    return this;
  });
  s.Api.register('fixedColumns().update()', function () {
    return this.iterator('table', function (a) {
      a._oFixedColumns && a._oFixedColumns.fnUpdate();
    });
  });
  s.Api.register('fixedColumns().relayout()', function () {
    return this.iterator('table', function (a) {
      a._oFixedColumns && a._oFixedColumns.fnRedrawLayout();
    });
  });
  s.Api.register('rows().recalcHeight()', function () {
    return this.iterator('row', function (a, b) {
      a._oFixedColumns && a._oFixedColumns.fnRecalculateHeight(this.row(b).node());
    });
  });
  s.Api.register('fixedColumns().rowIndex()', function (a) {
    a = d(a);
    return a.parents('.DTFC_Cloned').length ? this.rows({ page: 'current' }).indexes()[a.index()] : this.row(a).index();
  });
  s.Api.register('fixedColumns().cellIndex()', function (a) {
    a = d(a);
    if (a.parents('.DTFC_Cloned').length) {
      var b = a.parent().index(), b = this.rows({ page: 'current' }).indexes()[b], a = a.parents('.DTFC_LeftWrapper').length ? a.index() : this.columns().flatten().length - this.context[0]._oFixedColumns.s.iRightColumns + a.index();
      return {
        row: b,
        column: this.column.index('toData', a),
        columnVisible: a
      };
    }
    return this.cell(a).index();
  });
  d(r).on('init.dt.fixedColumns', function (a, b) {
    if ('dt' === a.namespace) {
      var c = b.oInit.fixedColumns, e = s.defaults.fixedColumns;
      if (c || e)
        e = d.extend({}, c, e), !1 !== c && new m(b, e);
    }
  });
  d.fn.dataTable.FixedColumns = m;
  return d.fn.DataTable.FixedColumns = m;
}));
/*!
 Bootstrap 4 integration for DataTables' Responsive
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function (c) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net-bs4',
    'datatables.net-responsive'
  ], function (a) {
    return c(a, window, document);
  }) : 'object' === typeof exports ? module.exports = function (a, b) {
    a || (a = window);
    if (!b || !b.fn.dataTable)
      b = require('datatables.net-bs4')(a, b).$;
    b.fn.dataTable.Responsive || require('datatables.net-responsive')(a, b);
    return c(b, a, a.document);
  } : c(jQuery, window, document);
}(function (c) {
  var a = c.fn.dataTable, b = a.Responsive.display, g = b.modal, d = c('<div class="modal fade dtr-bs-modal" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"/></div></div></div>');
  b.modal = function (a) {
    return function (b, e, f) {
      c.fn.modal ? e || (a && a.header && d.find('div.modal-header').empty().append('<h4 class="modal-title">' + a.header(b) + '</h4>'), d.find('div.modal-body').empty().append(f()), d.appendTo('body').modal()) : g(b, e, f);
    };
  };
  return a.Responsive;
}));
/*!
 Bootstrap integration for DataTables' Buttons
 ©2016 SpryMedia Ltd - datatables.net/license
*/
(function (c) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net-bs4',
    'datatables.net-buttons'
  ], function (a) {
    return c(a, window, document);
  }) : 'object' === typeof exports ? module.exports = function (a, b) {
    a || (a = window);
    if (!b || !b.fn.dataTable)
      b = require('datatables.net-bs4')(a, b).$;
    b.fn.dataTable.Buttons || require('datatables.net-buttons')(a, b);
    return c(b, a, a.document);
  } : c(jQuery, window, document);
}(function (c) {
  var a = c.fn.dataTable;
  c.extend(!0, a.Buttons.defaults, {
    dom: {
      container: { className: 'dt-buttons btn-group' },
      button: { className: 'btn btn-secondary' },
      collection: {
        tag: 'div',
        className: 'dt-button-collection dropdown-menu',
        button: {
          tag: 'a',
          className: 'dt-button dropdown-item'
        }
      }
    }
  });
  a.ext.buttons.collection.className += ' dropdown-toggle';
  return a.Buttons;
}));
/*!
 Select for DataTables 1.2.0
 2015-2016 SpryMedia Ltd - datatables.net/license/mit
*/
(function (e) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net'
  ], function (i) {
    return e(i, window, document);
  }) : 'object' === typeof exports ? module.exports = function (i, l) {
    i || (i = window);
    if (!l || !l.fn.dataTable)
      l = require('datatables.net')(i, l).$;
    return e(l, i, i.document);
  } : e(jQuery, window, document);
}(function (e, i, l, h) {
  function t(b, a, c) {
    var d;
    d = function (c, a) {
      if (c > a)
        var d = a, a = c, c = d;
      var f = !1;
      return b.columns(':visible').indexes().filter(function (b) {
        b === c && (f = !0);
        return b === a ? (f = !1, !0) : f;
      });
    };
    var f = function (c, a) {
      var d = b.rows({ search: 'applied' }).indexes();
      if (d.indexOf(c) > d.indexOf(a))
        var f = a, a = c, c = f;
      var e = !1;
      return d.filter(function (b) {
        b === c && (e = !0);
        return b === a ? (e = !1, !0) : e;
      });
    };
    !b.cells({ selected: !0 }).any() && !c ? (d = d(0, a.column), c = f(0, a.row)) : (d = d(c.column, a.column), c = f(c.row, a.row));
    c = b.cells(c, d).flatten();
    b.cells(a, { selected: !0 }).any() ? b.cells(c).deselect() : b.cells(c).select();
  }
  function r(b) {
    var a = b.settings()[0]._select.selector;
    e(b.table().body()).off('mousedown.dtSelect', a).off('mouseup.dtSelect', a).off('click.dtSelect', a);
    e('body').off('click.dtSelect');
  }
  function v(b) {
    var a = e(b.table().body()), c = b.settings()[0], d = c._select.selector;
    a.on('mousedown.dtSelect', d, function (c) {
      if (c.shiftKey || c.metaKey || c.ctrlKey)
        a.css('-moz-user-select', 'none').one('selectstart.dtSelect', d, function () {
          return !1;
        });
    }).on('mouseup.dtSelect', d, function () {
      a.css('-moz-user-select', '');
    }).on('click.dtSelect', d, function (c) {
      var a = b.select.items();
      if (!i.getSelection || !i.getSelection().toString()) {
        var d = b.settings()[0];
        if (e(c.target).closest('div.dataTables_wrapper')[0] == b.table().container()) {
          var g = b.cell(e(c.target).closest('td, th'));
          if (g.any()) {
            var h = e.Event('user-select.dt');
            k(b, h, [
              a,
              g,
              c
            ]);
            h.isDefaultPrevented() || (h = g.index(), 'row' === a ? (a = h.row, s(c, b, d, 'row', a)) : 'column' === a ? (a = g.index().column, s(c, b, d, 'column', a)) : 'cell' === a && (a = g.index(), s(c, b, d, 'cell', a)), d._select_lastCell = h);
          }
        }
      }
    });
    e('body').on('click.dtSelect', function (a) {
      c._select.blurable && !e(a.target).parents().filter(b.table().container()).length && (e(a.target).parents('div.DTE').length || p(c, !0));
    });
  }
  function k(b, a, c, d) {
    if (!d || b.flatten().length)
      'string' === typeof a && (a += '.dt'), c.unshift(b), e(b.table().node()).triggerHandler(a, c);
  }
  function w(b) {
    var a = b.settings()[0];
    if (a._select.info && a.aanFeatures.i) {
      var c = e('<span class="select-info"/>'), d = function (a, d) {
          c.append(e('<span class="select-item"/>').append(b.i18n('select.' + a + 's', {
            _: '%d ' + a + 's selected',
            '0': '',
            1: '1 ' + a + ' selected'
          }, d)));
        };
      d('row', b.rows({ selected: !0 }).flatten().length);
      d('column', b.columns({ selected: !0 }).flatten().length);
      d('cell', b.cells({ selected: !0 }).flatten().length);
      e.each(a.aanFeatures.i, function (a, b) {
        var b = e(b), d = b.children('span.select-info');
        d.length && d.remove();
        '' !== c.text() && b.append(c);
      });
    }
  }
  function x(b, a, c, d) {
    var f = b[a + 's']({ search: 'applied' }).indexes(), d = e.inArray(d, f), m = e.inArray(c, f);
    if (!b[a + 's']({ selected: !0 }).any() && -1 === d)
      f.splice(e.inArray(c, f) + 1, f.length);
    else {
      if (d > m)
        var j = m, m = d, d = j;
      f.splice(m + 1, f.length);
      f.splice(0, d);
    }
    b[a](c, { selected: !0 }).any() ? (f.splice(e.inArray(c, f), 1), b[a + 's'](f).deselect()) : b[a + 's'](f).select();
  }
  function p(b, a) {
    if (a || 'single' === b._select.style) {
      var c = new g.Api(b);
      c.rows({ selected: !0 }).deselect();
      c.columns({ selected: !0 }).deselect();
      c.cells({ selected: !0 }).deselect();
    }
  }
  function s(b, a, c, d, f) {
    var e = a.select.style(), j = a[d](f, { selected: !0 }).any();
    'os' === e ? b.ctrlKey || b.metaKey ? a[d](f).select(!j) : b.shiftKey ? 'cell' === d ? t(a, f, c._select_lastCell || null) : x(a, d, f, c._select_lastCell ? c._select_lastCell[d] : null) : (b = a[d + 's']({ selected: !0 }), j && 1 === b.flatten().length ? a[d](f).deselect() : (b.deselect(), a[d](f).select())) : 'multi+shift' == e ? b.shiftKey ? 'cell' === d ? t(a, f, c._select_lastCell || null) : x(a, d, f, c._select_lastCell ? c._select_lastCell[d] : null) : a[d](f).select(!j) : a[d](f).select(!j);
  }
  function q(b, a) {
    return function (c) {
      return c.i18n('buttons.' + b, a);
    };
  }
  var g = e.fn.dataTable;
  g.select = {};
  g.select.version = '1.2.0';
  g.select.init = function (b) {
    var a = b.settings()[0], c = a.oInit.select, d = g.defaults.select, c = c === h ? d : c, d = 'row', f = 'api', m = !1, j = !0, u = 'td, th', i = 'selected';
    a._select = {};
    if (!0 === c)
      f = 'os';
    else if ('string' === typeof c)
      f = c;
    else if (e.isPlainObject(c) && (c.blurable !== h && (m = c.blurable), c.info !== h && (j = c.info), c.items !== h && (d = c.items), c.style !== h && (f = c.style), c.selector !== h && (u = c.selector), c.className !== h))
      i = c.className;
    b.select.selector(u);
    b.select.items(d);
    b.select.style(f);
    b.select.blurable(m);
    b.select.info(j);
    a._select.className = i;
    e.fn.dataTable.ext.order['select-checkbox'] = function (a, c) {
      return this.api().column(c, { order: 'index' }).nodes().map(function (c) {
        return 'row' === a._select.items ? e(c).parent().hasClass(a._select.className) : 'cell' === a._select.items ? e(c).hasClass(a._select.className) : !1;
      });
    };
    e(b.table().node()).hasClass('selectable') && b.select.style('os');
  };
  e.each([
    {
      type: 'row',
      prop: 'aoData'
    },
    {
      type: 'column',
      prop: 'aoColumns'
    }
  ], function (b, a) {
    g.ext.selector[a.type].push(function (c, b, f) {
      var b = b.selected, e, j = [];
      if (b === h)
        return f;
      for (var g = 0, i = f.length; g < i; g++)
        e = c[a.prop][f[g]], (!0 === b && !0 === e._select_selected || !1 === b && !e._select_selected) && j.push(f[g]);
      return j;
    });
  });
  g.ext.selector.cell.push(function (b, a, c) {
    var a = a.selected, d, f = [];
    if (a === h)
      return c;
    for (var e = 0, g = c.length; e < g; e++)
      d = b.aoData[c[e].row], (!0 === a && d._selected_cells && !0 === d._selected_cells[c[e].column] || !1 === a && (!d._selected_cells || !d._selected_cells[c[e].column])) && f.push(c[e]);
    return f;
  });
  var n = g.Api.register, o = g.Api.registerPlural;
  n('select()', function () {
    return this.iterator('table', function (b) {
      g.select.init(new g.Api(b));
    });
  });
  n('select.blurable()', function (b) {
    return b === h ? this.context[0]._select.blurable : this.iterator('table', function (a) {
      a._select.blurable = b;
    });
  });
  n('select.info()', function (b) {
    return w === h ? this.context[0]._select.info : this.iterator('table', function (a) {
      a._select.info = b;
    });
  });
  n('select.items()', function (b) {
    return b === h ? this.context[0]._select.items : this.iterator('table', function (a) {
      a._select.items = b;
      k(new g.Api(a), 'selectItems', [b]);
    });
  });
  n('select.style()', function (b) {
    return b === h ? this.context[0]._select.style : this.iterator('table', function (a) {
      a._select.style = b;
      if (!a._select_init) {
        var c = new g.Api(a);
        a.aoRowCreatedCallback.push({
          fn: function (c, b, d) {
            b = a.aoData[d];
            b._select_selected && e(c).addClass(a._select.className);
            c = 0;
            for (d = a.aoColumns.length; c < d; c++)
              (a.aoColumns[c]._select_selected || b._selected_cells && b._selected_cells[c]) && e(b.anCells[c]).addClass(a._select.className);
          },
          sName: 'select-deferRender'
        });
        c.on('preXhr.dt.dtSelect', function () {
          var a = c.rows({ selected: !0 }).ids(!0).filter(function (c) {
              return c !== h;
            }), b = c.cells({ selected: !0 }).eq(0).map(function (a) {
              var b = c.row(a.row).id(!0);
              return b ? {
                row: b,
                column: a.column
              } : h;
            }).filter(function (c) {
              return c !== h;
            });
          c.one('draw.dt.dtSelect', function () {
            c.rows(a).select();
            b.any() && b.each(function (a) {
              c.cells(a.row, a.column).select();
            });
          });
        });
        c.on('draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt info.dt', function () {
          w(c);
        });
        c.on('destroy.dtSelect', function () {
          r(c);
          c.off('.dtSelect');
        });
      }
      var d = new g.Api(a);
      r(d);
      'api' !== b && v(d);
      k(new g.Api(a), 'selectStyle', [b]);
    });
  });
  n('select.selector()', function (b) {
    return b === h ? this.context[0]._select.selector : this.iterator('table', function (a) {
      r(new g.Api(a));
      a._select.selector = b;
      'api' !== a._select.style && v(new g.Api(a));
    });
  });
  o('rows().select()', 'row().select()', function (b) {
    var a = this;
    if (!1 === b)
      return this.deselect();
    this.iterator('row', function (c, a) {
      p(c);
      c.aoData[a]._select_selected = !0;
      e(c.aoData[a].nTr).addClass(c._select.className);
    });
    this.iterator('table', function (c, b) {
      k(a, 'select', [
        'row',
        a[b]
      ], !0);
    });
    return this;
  });
  o('columns().select()', 'column().select()', function (b) {
    var a = this;
    if (!1 === b)
      return this.deselect();
    this.iterator('column', function (a, b) {
      p(a);
      a.aoColumns[b]._select_selected = !0;
      var f = new g.Api(a).column(b);
      e(f.header()).addClass(a._select.className);
      e(f.footer()).addClass(a._select.className);
      f.nodes().to$().addClass(a._select.className);
    });
    this.iterator('table', function (c, b) {
      k(a, 'select', [
        'column',
        a[b]
      ], !0);
    });
    return this;
  });
  o('cells().select()', 'cell().select()', function (b) {
    var a = this;
    if (!1 === b)
      return this.deselect();
    this.iterator('cell', function (a, b, f) {
      p(a);
      b = a.aoData[b];
      b._selected_cells === h && (b._selected_cells = []);
      b._selected_cells[f] = !0;
      b.anCells && e(b.anCells[f]).addClass(a._select.className);
    });
    this.iterator('table', function (b, d) {
      k(a, 'select', [
        'cell',
        a[d]
      ], !0);
    });
    return this;
  });
  o('rows().deselect()', 'row().deselect()', function () {
    var b = this;
    this.iterator('row', function (a, b) {
      a.aoData[b]._select_selected = !1;
      e(a.aoData[b].nTr).removeClass(a._select.className);
    });
    this.iterator('table', function (a, c) {
      k(b, 'deselect', [
        'row',
        b[c]
      ], !0);
    });
    return this;
  });
  o('columns().deselect()', 'column().deselect()', function () {
    var b = this;
    this.iterator('column', function (a, b) {
      a.aoColumns[b]._select_selected = !1;
      var d = new g.Api(a), f = d.column(b);
      e(f.header()).removeClass(a._select.className);
      e(f.footer()).removeClass(a._select.className);
      d.cells(null, b).indexes().each(function (b) {
        var c = a.aoData[b.row], d = c._selected_cells;
        c.anCells && (!d || !d[b.column]) && e(c.anCells[b.column]).removeClass(a._select.className);
      });
    });
    this.iterator('table', function (a, c) {
      k(b, 'deselect', [
        'column',
        b[c]
      ], !0);
    });
    return this;
  });
  o('cells().deselect()', 'cell().deselect()', function () {
    var b = this;
    this.iterator('cell', function (a, b, d) {
      b = a.aoData[b];
      b._selected_cells[d] = !1;
      b.anCells && !a.aoColumns[d]._select_selected && e(b.anCells[d]).removeClass(a._select.className);
    });
    this.iterator('table', function (a, c) {
      k(b, 'deselect', [
        'cell',
        b[c]
      ], !0);
    });
    return this;
  });
  e.extend(g.ext.buttons, {
    selected: {
      text: q('selected', 'Selected'),
      className: 'buttons-selected',
      init: function (b) {
        var a = this;
        b.on('draw.dt.DT select.dt.DT deselect.dt.DT', function () {
          var b = a.rows({ selected: !0 }).any() || a.columns({ selected: !0 }).any() || a.cells({ selected: !0 }).any();
          a.enable(b);
        });
        this.disable();
      }
    },
    selectedSingle: {
      text: q('selectedSingle', 'Selected single'),
      className: 'buttons-selected-single',
      init: function (b) {
        var a = this;
        b.on('draw.dt.DT select.dt.DT deselect.dt.DT', function () {
          var c = b.rows({ selected: !0 }).flatten().length + b.columns({ selected: !0 }).flatten().length + b.cells({ selected: !0 }).flatten().length;
          a.enable(1 === c);
        });
        this.disable();
      }
    },
    selectAll: {
      text: q('selectAll', 'Select all'),
      className: 'buttons-select-all',
      action: function () {
        this[this.select.items() + 's']().select();
      }
    },
    selectNone: {
      text: q('selectNone', 'Deselect all'),
      className: 'buttons-select-none',
      action: function () {
        p(this.settings()[0], !0);
      },
      init: function (b) {
        var a = this;
        b.on('draw.dt.DT select.dt.DT deselect.dt.DT', function () {
          var c = b.rows({ selected: !0 }).flatten().length + b.columns({ selected: !0 }).flatten().length + b.cells({ selected: !0 }).flatten().length;
          a.enable(0 < c);
        });
        this.disable();
      }
    }
  });
  e.each([
    'Row',
    'Column',
    'Cell'
  ], function (b, a) {
    var c = a.toLowerCase();
    g.ext.buttons['select' + a + 's'] = {
      text: q('select' + a + 's', 'Select ' + c + 's'),
      className: 'buttons-select-' + c + 's',
      action: function () {
        this.select.items(c);
      },
      init: function (a) {
        var b = this;
        a.on('selectItems.dt.DT', function (a, d, e) {
          b.active(e === c);
        });
      }
    };
  });
  e(l).on('preInit.dt.dtSelect', function (b, a) {
    'dt' === b.namespace && g.select.init(new g.Api(a));
  });
  return g.select;
}));
/*!
 KeyTable 2.1.2
 ©2009-2016 SpryMedia Ltd - datatables.net/license
*/
(function (e) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net'
  ], function (k) {
    return e(k, window, document);
  }) : 'object' === typeof exports ? module.exports = function (k, g) {
    k || (k = window);
    if (!g || !g.fn.dataTable)
      g = require('datatables.net')(k, g).$;
    return e(g, k, k.document);
  } : e(jQuery, window, document);
}(function (e, k, g, n) {
  var h = e.fn.dataTable, l = function (a, b) {
      if (!h.versionCheck || !h.versionCheck('1.10.8'))
        throw 'KeyTable requires DataTables 1.10.8 or newer';
      this.c = e.extend(!0, {}, h.defaults.keyTable, l.defaults, b);
      this.s = {
        dt: new h.Api(a),
        enable: !0,
        focusDraw: !1
      };
      this.dom = {};
      var d = this.s.dt.settings()[0], c = d.keytable;
      if (c)
        return c;
      d.keytable = this;
      this._constructor();
    };
  e.extend(l.prototype, {
    blur: function () {
      this._blur();
    },
    enable: function (a) {
      this.s.enable = a;
    },
    focus: function (a, b) {
      this._focus(this.s.dt.cell(a, b));
    },
    focused: function (a) {
      if (!this.s.lastFocus)
        return !1;
      var b = this.s.lastFocus.index();
      return a.row === b.row && a.column === b.column;
    },
    _constructor: function () {
      this._tabInput();
      var a = this, b = this.s.dt, d = e(b.table().node());
      'static' === d.css('position') && d.css('position', 'relative');
      e(b.table().body()).on('click.keyTable', 'th, td', function () {
        if (!1 !== a.s.enable) {
          var c = b.cell(this);
          c.any() && a._focus(c, null, !1);
        }
      });
      e(g).on('keydown.keyTable', function (b) {
        a._key(b);
      });
      if (this.c.blurable)
        e(g).on('click.keyTable', function (c) {
          e(c.target).parents('.dataTables_filter').length && a._blur();
          e(c.target).parents().filter(b.table().container()).length || e(c.target).parents('div.DTE').length || a._blur();
        });
      if (this.c.editor)
        b.on('key.keyTable', function (b, c, d, e, g) {
          a._editor(d, g);
        });
      if (b.settings()[0].oFeatures.bStateSave)
        b.on('stateSaveParams.keyTable', function (b, c, d) {
          d.keyTable = a.s.lastFocus ? a.s.lastFocus.index() : null;
        });
      b.on('xhr.keyTable', function () {
        if (!a.s.focusDraw) {
          var c = a.s.lastFocus;
          c && (a.s.lastFocus = null, b.one('draw', function () {
            a._focus(c);
          }));
        }
      });
      b.on('destroy.keyTable', function () {
        b.off('.keyTable');
        e(b.table().body()).off('click.keyTable', 'th, td');
        e(g.body).off('keydown.keyTable').off('click.keyTable');
      });
      var c = b.state.loaded();
      if (c && c.keyTable)
        b.one('init', function () {
          var a = b.cell(c.keyTable);
          a.any() && a.focus();
        });
      else
        this.c.focus && b.cell(this.c.focus).focus();
    },
    _blur: function () {
      if (this.s.enable && this.s.lastFocus) {
        var a = this.s.lastFocus;
        e(a.node()).removeClass(this.c.className);
        this.s.lastFocus = null;
        this._emitEvent('key-blur', [
          this.s.dt,
          a
        ]);
      }
    },
    _columns: function () {
      var a = this.s.dt, b = a.columns(this.c.columns).indexes(), d = [];
      a.columns(':visible').every(function (a) {
        -1 !== b.indexOf(a) && d.push(a);
      });
      return d;
    },
    _editor: function (a, b) {
      var d = this.s.dt, c = this.c.editor;
      b.stopPropagation();
      13 === a && b.preventDefault();
      c.inline(this.s.lastFocus.index());
      var f = e('div.DTE input, div.DTE textarea');
      f.length && f[0].select();
      d.keys.enable('navigation-only');
      d.one('key-blur.editor', function () {
        c.displayed() && c.submit();
      });
      c.one('close', function () {
        d.keys.enable(!0);
        d.off('key-blur.editor');
      });
    },
    _emitEvent: function (a, b) {
      this.s.dt.iterator('table', function (d) {
        e(d.nTable).triggerHandler(a, b);
      });
    },
    _focus: function (a, b, d) {
      var c = this, f = this.s.dt, i = f.page.info(), m = this.s.lastFocus;
      if (this.s.enable) {
        if ('number' !== typeof a) {
          var j = a.index(), b = j.column, a = f.rows({
              filter: 'applied',
              order: 'applied'
            }).indexes().indexOf(j.row);
          i.serverSide && (a += i.start);
        }
        if (-1 !== i.length && (a < i.start || a >= i.start + i.length))
          this.s.focusDraw = !0, f.one('draw', function () {
            c.s.focusDraw = !1;
            c._focus(a, b);
          }).page(Math.floor(a / i.length)).draw(!1);
        else if (-1 !== e.inArray(b, this._columns())) {
          i.serverSide && (a -= i.start);
          i = f.cell(':eq(' + a + ')', b, { search: 'applied' });
          if (m) {
            if (m.node() === i.node())
              return;
            this._blur();
          }
          m = e(i.node());
          m.addClass(this.c.className);
          if (d === n || !0 === d)
            this._scroll(e(k), e(g.body), m, 'offset'), d = f.table().body().parentNode, d !== f.table().header().parentNode && (d = e(d.parentNode), this._scroll(d, d, m, 'position'));
          this.s.lastFocus = i;
          this._emitEvent('key-focus', [
            this.s.dt,
            i
          ]);
          f.state.save();
        }
      }
    },
    _key: function (a) {
      if (this.s.enable && !(0 === a.keyCode || a.ctrlKey || a.metaKey || a.altKey)) {
        var b = this.s.lastFocus;
        if (b) {
          var d = this, c = this.s.dt;
          if (!(this.c.keys && -1 === e.inArray(a.keyCode, this.c.keys)))
            switch (a.keyCode) {
            case 9:
              this._shift(a, a.shiftKey ? 'left' : 'right', !0);
              break;
            case 27:
              this.s.blurable && !0 === this.s.enable && this._blur();
              break;
            case 33:
            case 34:
              a.preventDefault();
              var f = c.cells({ page: 'current' }).nodes().indexOf(b.node());
              c.one('draw', function () {
                var a = c.cells({ page: 'current' }).nodes();
                d._focus(c.cell(f < a.length ? a[f] : a[a.length - 1]));
              }).page(33 === a.keyCode ? 'previous' : 'next').draw(!1);
              break;
            case 35:
            case 36:
              a.preventDefault();
              b = c.cells({ page: 'current' }).indexes();
              this._focus(c.cell(b[35 === a.keyCode ? b.length - 1 : 0]));
              break;
            case 37:
              this._shift(a, 'left');
              break;
            case 38:
              this._shift(a, 'up');
              break;
            case 39:
              this._shift(a, 'right');
              break;
            case 40:
              this._shift(a, 'down');
              break;
            default:
              !0 === this.s.enable && this._emitEvent('key', [
                c,
                a.keyCode,
                this.s.lastFocus,
                a
              ]);
            }
        }
      }
    },
    _scroll: function (a, b, d, c) {
      var c = d[c](), f = d.outerHeight(), d = d.outerWidth(), e = b.scrollTop(), g = b.scrollLeft(), j = a.height(), a = a.width();
      c.top < e && b.scrollTop(c.top);
      c.left < g && b.scrollLeft(c.left);
      c.top + f > e + j && f < j && b.scrollTop(c.top + f - j);
      c.left + d > g + a && d < a && b.scrollLeft(c.left + d - a);
    },
    _shift: function (a, b, d) {
      var c = this.s.dt, f = c.page.info(), i = f.recordsDisplay, g = this.s.lastFocus, j = this._columns();
      if (g) {
        var h = c.rows({
            filter: 'applied',
            order: 'applied'
          }).indexes().indexOf(g.index().row);
        f.serverSide && (h += f.start);
        c = c.columns(j).indexes().indexOf(g.index().column);
        f = j[c];
        'right' === b ? c >= j.length - 1 ? (h++, f = j[0]) : f = j[c + 1] : 'left' === b ? 0 === c ? (h--, f = j[j.length - 1]) : f = j[c - 1] : 'up' === b ? h-- : 'down' === b && h++;
        0 <= h && h < i && -1 !== e.inArray(f, j) ? (a.preventDefault(), this._focus(h, f)) : !d || !this.c.blurable ? a.preventDefault() : this._blur();
      }
    },
    _tabInput: function () {
      var a = this, b = this.s.dt, d = null !== this.c.tabIndex ? this.c.tabIndex : b.settings()[0].iTabIndex;
      if (-1 != d)
        e('<div><input type="text" tabindex="' + d + '"/></div>').css({
          position: 'absolute',
          height: 1,
          width: 0,
          overflow: 'hidden'
        }).insertBefore(b.table().node()).children().on('focus', function () {
          a._focus(b.cell(':eq(0)', '0:visible', { page: 'current' }));
        });
    }
  });
  l.defaults = {
    blurable: !0,
    className: 'focus',
    columns: '',
    editor: null,
    focus: null,
    keys: null,
    tabIndex: null
  };
  l.version = '2.1.2';
  e.fn.dataTable.KeyTable = l;
  e.fn.DataTable.KeyTable = l;
  h.Api.register('cell.blur()', function () {
    return this.iterator('table', function (a) {
      a.keytable && a.keytable.blur();
    });
  });
  h.Api.register('cell().focus()', function () {
    return this.iterator('cell', function (a, b, d) {
      a.keytable && a.keytable.focus(b, d);
    });
  });
  h.Api.register('keys.disable()', function () {
    return this.iterator('table', function (a) {
      a.keytable && a.keytable.enable(!1);
    });
  });
  h.Api.register('keys.enable()', function (a) {
    return this.iterator('table', function (b) {
      b.keytable && b.keytable.enable(a === n ? !0 : a);
    });
  });
  h.ext.selector.cell.push(function (a, b, d) {
    var b = b.focused, a = a.keytable, c = [];
    if (!a || b === n)
      return d;
    for (var e = 0, g = d.length; e < g; e++)
      (!0 === b && a.focused(d[e]) || !1 === b && !a.focused(d[e])) && c.push(d[e]);
    return c;
  });
  e(g).on('preInit.dt.dtk', function (a, b) {
    if ('dt' === a.namespace) {
      var d = b.oInit.keys, c = h.defaults.keys;
      if (d || c)
        c = e.extend({}, d, c), !1 !== d && new l(b, c);
    }
  });
  return l;
}));
/*!
 ColReorder 1.3.2
 ©2010-2015 SpryMedia Ltd - datatables.net/license
*/
(function (f) {
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables.net'
  ], function (o) {
    return f(o, window, document);
  }) : 'object' === typeof exports ? module.exports = function (o, l) {
    o || (o = window);
    if (!l || !l.fn.dataTable)
      l = require('datatables.net')(o, l).$;
    return f(l, o, o.document);
  } : f(jQuery, window, document);
}(function (f, o, l, r) {
  function q(a) {
    for (var b = [], d = 0, e = a.length; d < e; d++)
      b[a[d]] = d;
    return b;
  }
  function p(a, b, d) {
    b = a.splice(b, 1)[0];
    a.splice(d, 0, b);
  }
  function s(a, b, d) {
    for (var e = [], f = 0, c = a.childNodes.length; f < c; f++)
      1 == a.childNodes[f].nodeType && e.push(a.childNodes[f]);
    b = e[b];
    null !== d ? a.insertBefore(b, e[d]) : a.appendChild(b);
  }
  var t = f.fn.dataTable;
  f.fn.dataTableExt.oApi.fnColReorder = function (a, b, d, e, g) {
    var c, h, j, m, i, l = a.aoColumns.length, k;
    i = function (a, b, c) {
      if (a[b] && 'function' !== typeof a[b]) {
        var d = a[b].split('.'), e = d.shift();
        isNaN(1 * e) || (a[b] = c[1 * e] + '.' + d.join('.'));
      }
    };
    if (b != d)
      if (0 > b || b >= l)
        this.oApi._fnLog(a, 1, 'ColReorder \'from\' index is out of bounds: ' + b);
      else if (0 > d || d >= l)
        this.oApi._fnLog(a, 1, 'ColReorder \'to\' index is out of bounds: ' + d);
      else {
        j = [];
        c = 0;
        for (h = l; c < h; c++)
          j[c] = c;
        p(j, b, d);
        var n = q(j);
        c = 0;
        for (h = a.aaSorting.length; c < h; c++)
          a.aaSorting[c][0] = n[a.aaSorting[c][0]];
        if (null !== a.aaSortingFixed) {
          c = 0;
          for (h = a.aaSortingFixed.length; c < h; c++)
            a.aaSortingFixed[c][0] = n[a.aaSortingFixed[c][0]];
        }
        c = 0;
        for (h = l; c < h; c++) {
          k = a.aoColumns[c];
          j = 0;
          for (m = k.aDataSort.length; j < m; j++)
            k.aDataSort[j] = n[k.aDataSort[j]];
          k.idx = n[k.idx];
        }
        f.each(a.aLastSort, function (b, c) {
          a.aLastSort[b].src = n[c.src];
        });
        c = 0;
        for (h = l; c < h; c++)
          k = a.aoColumns[c], 'number' == typeof k.mData ? k.mData = n[k.mData] : f.isPlainObject(k.mData) && (i(k.mData, '_', n), i(k.mData, 'filter', n), i(k.mData, 'sort', n), i(k.mData, 'type', n));
        if (a.aoColumns[b].bVisible) {
          i = this.oApi._fnColumnIndexToVisible(a, b);
          m = null;
          for (c = d < b ? d : d + 1; null === m && c < l;)
            m = this.oApi._fnColumnIndexToVisible(a, c), c++;
          j = a.nTHead.getElementsByTagName('tr');
          c = 0;
          for (h = j.length; c < h; c++)
            s(j[c], i, m);
          if (null !== a.nTFoot) {
            j = a.nTFoot.getElementsByTagName('tr');
            c = 0;
            for (h = j.length; c < h; c++)
              s(j[c], i, m);
          }
          c = 0;
          for (h = a.aoData.length; c < h; c++)
            null !== a.aoData[c].nTr && s(a.aoData[c].nTr, i, m);
        }
        p(a.aoColumns, b, d);
        c = 0;
        for (h = l; c < h; c++)
          a.oApi._fnColumnOptions(a, c, {});
        p(a.aoPreSearchCols, b, d);
        c = 0;
        for (h = a.aoData.length; c < h; c++) {
          m = a.aoData[c];
          if (k = m.anCells) {
            p(k, b, d);
            j = 0;
            for (i = k.length; j < i; j++)
              k[j] && k[j]._DT_CellIndex && (k[j]._DT_CellIndex.column = j);
          }
          'dom' !== m.src && f.isArray(m._aData) && p(m._aData, b, d);
        }
        c = 0;
        for (h = a.aoHeader.length; c < h; c++)
          p(a.aoHeader[c], b, d);
        if (null !== a.aoFooter) {
          c = 0;
          for (h = a.aoFooter.length; c < h; c++)
            p(a.aoFooter[c], b, d);
        }
        (g || g === r) && f.fn.dataTable.Api(a).rows().invalidate();
        c = 0;
        for (h = l; c < h; c++)
          f(a.aoColumns[c].nTh).off('click.DT'), this.oApi._fnSortAttachListener(a, a.aoColumns[c].nTh, c);
        f(a.oInstance).trigger('column-reorder.dt', [
          a,
          {
            from: b,
            to: d,
            mapping: n,
            drop: e,
            iFrom: b,
            iTo: d,
            aiInvertMapping: n
          }
        ]);
      }
  };
  var i = function (a, b) {
    var d = new f.fn.dataTable.Api(a).settings()[0];
    if (d._colReorder)
      return d._colReorder;
    !0 === b && (b = {});
    var e = f.fn.dataTable.camelToHungarian;
    e && (e(i.defaults, i.defaults, !0), e(i.defaults, b || {}));
    this.s = {
      dt: null,
      init: f.extend(!0, {}, i.defaults, b),
      fixed: 0,
      fixedRight: 0,
      reorderCallback: null,
      mouse: {
        startX: -1,
        startY: -1,
        offsetX: -1,
        offsetY: -1,
        target: -1,
        targetIndex: -1,
        fromIndex: -1
      },
      aoTargets: []
    };
    this.dom = {
      drag: null,
      pointer: null
    };
    this.s.dt = d;
    this.s.dt._colReorder = this;
    this._fnConstruct();
    return this;
  };
  f.extend(i.prototype, {
    fnReset: function () {
      this._fnOrderColumns(this.fnOrder());
      return this;
    },
    fnGetCurrentOrder: function () {
      return this.fnOrder();
    },
    fnOrder: function (a, b) {
      var d = [], e, g, c = this.s.dt.aoColumns;
      if (a === r) {
        e = 0;
        for (g = c.length; e < g; e++)
          d.push(c[e]._ColReorder_iOrigCol);
        return d;
      }
      if (b) {
        c = this.fnOrder();
        e = 0;
        for (g = a.length; e < g; e++)
          d.push(f.inArray(a[e], c));
        a = d;
      }
      this._fnOrderColumns(q(a));
      return this;
    },
    fnTranspose: function (a, b) {
      b || (b = 'toCurrent');
      var d = this.fnOrder(), e = this.s.dt.aoColumns;
      return 'toCurrent' === b ? !f.isArray(a) ? f.inArray(a, d) : f.map(a, function (a) {
        return f.inArray(a, d);
      }) : !f.isArray(a) ? e[a]._ColReorder_iOrigCol : f.map(a, function (a) {
        return e[a]._ColReorder_iOrigCol;
      });
    },
    _fnConstruct: function () {
      var a = this, b = this.s.dt.aoColumns.length, d = this.s.dt.nTable, e;
      this.s.init.iFixedColumns && (this.s.fixed = this.s.init.iFixedColumns);
      this.s.init.iFixedColumnsLeft && (this.s.fixed = this.s.init.iFixedColumnsLeft);
      this.s.fixedRight = this.s.init.iFixedColumnsRight ? this.s.init.iFixedColumnsRight : 0;
      this.s.init.fnReorderCallback && (this.s.reorderCallback = this.s.init.fnReorderCallback);
      for (e = 0; e < b; e++)
        e > this.s.fixed - 1 && e < b - this.s.fixedRight && this._fnMouseListener(e, this.s.dt.aoColumns[e].nTh), this.s.dt.aoColumns[e]._ColReorder_iOrigCol = e;
      this.s.dt.oApi._fnCallbackReg(this.s.dt, 'aoStateSaveParams', function (b, c) {
        a._fnStateSave.call(a, c);
      }, 'ColReorder_State');
      var g = null;
      this.s.init.aiOrder && (g = this.s.init.aiOrder.slice());
      this.s.dt.oLoadedState && ('undefined' != typeof this.s.dt.oLoadedState.ColReorder && this.s.dt.oLoadedState.ColReorder.length == this.s.dt.aoColumns.length) && (g = this.s.dt.oLoadedState.ColReorder);
      if (g)
        if (a.s.dt._bInitComplete)
          b = q(g), a._fnOrderColumns.call(a, b);
        else {
          var c = !1;
          f(d).on('draw.dt.colReorder', function () {
            if (!a.s.dt._bInitComplete && !c) {
              c = true;
              var b = q(g);
              a._fnOrderColumns.call(a, b);
            }
          });
        }
      else
        this._fnSetColumnIndexes();
      f(d).on('destroy.dt.colReorder', function () {
        f(d).off('destroy.dt.colReorder draw.dt.colReorder');
        f(a.s.dt.nTHead).find('*').off('.ColReorder');
        f.each(a.s.dt.aoColumns, function (a, b) {
          f(b.nTh).removeAttr('data-column-index');
        });
        a.s.dt._colReorder = null;
        a.s = null;
      });
    },
    _fnOrderColumns: function (a) {
      var b = !1;
      if (a.length != this.s.dt.aoColumns.length)
        this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, 'ColReorder - array reorder does not match known number of columns. Skipping.');
      else {
        for (var d = 0, e = a.length; d < e; d++) {
          var g = f.inArray(d, a);
          d != g && (p(a, g, d), this.s.dt.oInstance.fnColReorder(g, d, !0, !1), b = !0);
        }
        f.fn.dataTable.Api(this.s.dt).rows().invalidate();
        this._fnSetColumnIndexes();
        b && (('' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY) && this.s.dt.oInstance.fnAdjustColumnSizing(!1), this.s.dt.oInstance.oApi._fnSaveState(this.s.dt), null !== this.s.reorderCallback && this.s.reorderCallback.call(this));
      }
    },
    _fnStateSave: function (a) {
      var b, d, e, g = this.s.dt.aoColumns;
      a.ColReorder = [];
      if (a.aaSorting) {
        for (b = 0; b < a.aaSorting.length; b++)
          a.aaSorting[b][0] = g[a.aaSorting[b][0]]._ColReorder_iOrigCol;
        var c = f.extend(!0, [], a.aoSearchCols);
        b = 0;
        for (d = g.length; b < d; b++)
          e = g[b]._ColReorder_iOrigCol, a.aoSearchCols[e] = c[b], a.abVisCols[e] = g[b].bVisible, a.ColReorder.push(e);
      } else if (a.order) {
        for (b = 0; b < a.order.length; b++)
          a.order[b][0] = g[a.order[b][0]]._ColReorder_iOrigCol;
        c = f.extend(!0, [], a.columns);
        b = 0;
        for (d = g.length; b < d; b++)
          e = g[b]._ColReorder_iOrigCol, a.columns[e] = c[b], a.ColReorder.push(e);
      }
    },
    _fnMouseListener: function (a, b) {
      var d = this;
      f(b).on('mousedown.ColReorder', function (a) {
        a.preventDefault();
        d._fnMouseDown.call(d, a, b);
      });
    },
    _fnMouseDown: function (a, b) {
      var d = this, e = f(a.target).closest('th, td').offset(), g = parseInt(f(b).attr('data-column-index'), 10);
      g !== r && (this.s.mouse.startX = a.pageX, this.s.mouse.startY = a.pageY, this.s.mouse.offsetX = a.pageX - e.left, this.s.mouse.offsetY = a.pageY - e.top, this.s.mouse.target = this.s.dt.aoColumns[g].nTh, this.s.mouse.targetIndex = g, this.s.mouse.fromIndex = g, this._fnRegions(), f(l).on('mousemove.ColReorder', function (a) {
        d._fnMouseMove.call(d, a);
      }).on('mouseup.ColReorder', function (a) {
        d._fnMouseUp.call(d, a);
      }));
    },
    _fnMouseMove: function (a) {
      if (null === this.dom.drag) {
        if (5 > Math.pow(Math.pow(a.pageX - this.s.mouse.startX, 2) + Math.pow(a.pageY - this.s.mouse.startY, 2), 0.5))
          return;
        this._fnCreateDragNode();
      }
      this.dom.drag.css({
        left: a.pageX - this.s.mouse.offsetX,
        top: a.pageY - this.s.mouse.offsetY
      });
      for (var b = !1, d = this.s.mouse.toIndex, e = 1, f = this.s.aoTargets.length; e < f; e++)
        if (a.pageX < this.s.aoTargets[e - 1].x + (this.s.aoTargets[e].x - this.s.aoTargets[e - 1].x) / 2) {
          this.dom.pointer.css('left', this.s.aoTargets[e - 1].x);
          this.s.mouse.toIndex = this.s.aoTargets[e - 1].to;
          b = !0;
          break;
        }
      b || (this.dom.pointer.css('left', this.s.aoTargets[this.s.aoTargets.length - 1].x), this.s.mouse.toIndex = this.s.aoTargets[this.s.aoTargets.length - 1].to);
      this.s.init.bRealtime && d !== this.s.mouse.toIndex && (this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex, !1), this.s.mouse.fromIndex = this.s.mouse.toIndex, this._fnRegions());
    },
    _fnMouseUp: function () {
      f(l).off('mousemove.ColReorder mouseup.ColReorder');
      null !== this.dom.drag && (this.dom.drag.remove(), this.dom.pointer.remove(), this.dom.drag = null, this.dom.pointer = null, this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex, !0), this._fnSetColumnIndexes(), ('' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY) && this.s.dt.oInstance.fnAdjustColumnSizing(!1), this.s.dt.oInstance.oApi._fnSaveState(this.s.dt), null !== this.s.reorderCallback && this.s.reorderCallback.call(this));
    },
    _fnRegions: function () {
      var a = this.s.dt.aoColumns;
      this.s.aoTargets.splice(0, this.s.aoTargets.length);
      this.s.aoTargets.push({
        x: f(this.s.dt.nTable).offset().left,
        to: 0
      });
      for (var b = 0, d = this.s.aoTargets[0].x, e = 0, g = a.length; e < g; e++)
        e != this.s.mouse.fromIndex && b++, a[e].bVisible && 'none' !== a[e].nTh.style.display && (d += f(a[e].nTh).outerWidth(), this.s.aoTargets.push({
          x: d,
          to: b
        }));
      0 !== this.s.fixedRight && this.s.aoTargets.splice(this.s.aoTargets.length - this.s.fixedRight);
      0 !== this.s.fixed && this.s.aoTargets.splice(0, this.s.fixed);
    },
    _fnCreateDragNode: function () {
      var a = '' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY, b = this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh, d = b.parentNode, e = d.parentNode, g = e.parentNode, c = f(b).clone();
      this.dom.drag = f(g.cloneNode(!1)).addClass('DTCR_clonedTable').append(f(e.cloneNode(!1)).append(f(d.cloneNode(!1)).append(c[0]))).css({
        position: 'absolute',
        top: 0,
        left: 0,
        width: f(b).outerWidth(),
        height: f(b).outerHeight()
      }).appendTo('body');
      this.dom.pointer = f('<div></div>').addClass('DTCR_pointer').css({
        position: 'absolute',
        top: a ? f('div.dataTables_scroll', this.s.dt.nTableWrapper).offset().top : f(this.s.dt.nTable).offset().top,
        height: a ? f('div.dataTables_scroll', this.s.dt.nTableWrapper).height() : f(this.s.dt.nTable).height()
      }).appendTo('body');
    },
    _fnSetColumnIndexes: function () {
      f.each(this.s.dt.aoColumns, function (a, b) {
        f(b.nTh).attr('data-column-index', a);
      });
    }
  });
  i.defaults = {
    aiOrder: null,
    bRealtime: !0,
    iFixedColumnsLeft: 0,
    iFixedColumnsRight: 0,
    fnReorderCallback: null
  };
  i.version = '1.3.2';
  f.fn.dataTable.ColReorder = i;
  f.fn.DataTable.ColReorder = i;
  'function' == typeof f.fn.dataTable && 'function' == typeof f.fn.dataTableExt.fnVersionCheck && f.fn.dataTableExt.fnVersionCheck('1.10.8') ? f.fn.dataTableExt.aoFeatures.push({
    fnInit: function (a) {
      var b = a.oInstance;
      a._colReorder ? b.oApi._fnLog(a, 1, 'ColReorder attempted to initialise twice. Ignoring second') : (b = a.oInit, new i(a, b.colReorder || b.oColReorder || {}));
      return null;
    },
    cFeature: 'R',
    sFeature: 'ColReorder'
  }) : alert('Warning: ColReorder requires DataTables 1.10.8 or greater - www.datatables.net/download');
  f(l).on('preInit.dt.colReorder', function (a, b) {
    if ('dt' === a.namespace) {
      var d = b.oInit.colReorder, e = t.defaults.colReorder;
      if (d || e)
        e = f.extend({}, d, e), !1 !== d && new i(b, e);
    }
  });
  f.fn.dataTable.Api.register('colReorder.reset()', function () {
    return this.iterator('table', function (a) {
      a._colReorder.fnReset();
    });
  });
  f.fn.dataTable.Api.register('colReorder.order()', function (a, b) {
    return a ? this.iterator('table', function (d) {
      d._colReorder.fnOrder(a, b);
    }) : this.context.length ? this.context[0]._colReorder.fnOrder() : null;
  });
  f.fn.dataTable.Api.register('colReorder.transpose()', function (a, b) {
    return this.context.length && this.context[0]._colReorder ? this.context[0]._colReorder.fnTranspose(a, b) : a;
  });
  return i;
}));
angular.module('dellUiComponents', []);
angular.module('dellUiComponents').config(function () {
}).run([
  '$rootScope',
  function ($rootScope) {
    $rootScope.safeApply = function (fn) {
      var phase = $rootScope.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && typeof fn === 'function') {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
    function calculateBreakPointStatus() {
      var window_size = $(window).width();
      $rootScope.bp = {
        isXS: false,
        isSM: false,
        isMD: false,
        isLG: false
      };
      switch (true) {
      case window_size < 750:
        $rootScope.bp.isXS = true;
        break;
      case window_size > 751 && window_size < 975:
        $rootScope.bp.isSM = true;
        break;
      case window_size > 974 && window_size < 1141:
        $rootScope.bp.isMD = true;
        break;
      default:
        $rootScope.bp.isLG = true;
        break;
      }
    }
    calculateBreakPointStatus();
    $(window).resize(function () {
      calculateBreakPointStatus();
      $rootScope.safeApply();
    });
  }
]);
(function ($) {
  $.dellUIoverflowTab = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // Add a reverse reference to the DOM object
    base.$el.data('dellUIoverflowTab', base);
  };
  $.dellUIoverflowTab.defaultOptions = {
    defaultHeight: 42,
    pagerWidth: 29,
    xsMax: 750,
    smMin: 751,
    smMax: 975,
    mdMin: 974,
    mdMax: 1141,
    iconClasses: {
      left: 'glyphicon glyphicon-menu-left',
      right: 'glyphicon glyphicon-menu-right'
    }
  };
  $.fn.dellUIoverflowTab = function (options) {
    if (options) {
      $.dellUIoverflowTab.defaultOptions = $.extend($.dellUIoverflowTab.defaultOptions, options);
    }
    return this.each(function () {
      new $.dellUIoverflowTab(this);
      var options = $.dellUIoverflowTab.defaultOptions, element = $(this), containerWidth = element.parent().width(), tabObjs = element.find('> li'), tabs = [], totalWidth = 0, widthLeftToTheRight, homePosition = options.pagerWidth, offsetTotal = options.pagerWidth, leftPosition = options.pagerWidth, isHome = false, isTooFar = false, leftMostTab = {}, nextTab, maxTabHeight = options.defaultHeight, changeHeight, breakpoint = function () {
          var window_size = $(window).width(), breakpoint = {
              isXS: false,
              isSM: false,
              isMD: false,
              isLG: false
            };
          switch (true) {
          case window_size < options.xsMax:
            breakpoint.isXS = true;
            break;
          case window_size > options.smMin && window_size < options.smMax:
            breakpoint.isSM = true;
            break;
          case window_size > options.mdMin && window_size < options.mdMax:
            breakpoint.isMD = true;
            break;
          default:
            breakpoint.isLG = true;
            break;
          }
          return breakpoint;
        }, isOverflow = false, initTabs = function () {
          _.each(tabObjs, function (t, index) {
            totalWidth = totalWidth + $(t).width() + 1;
            var tObj = {
                index: index,
                offset: offsetTotal,
                width: $(t).width(),
                height: $(t).height(),
                visibility: 1
              };
            //visibility = 0: none 1: fully visible 2: partially visible
            if (tabObjs.length === index + 1) {
            } else {
              offsetTotal = offsetTotal - tObj.width - 1;
            }
            if (tObj.height > maxTabHeight) {
              maxTabHeight = tObj.height;
            }
            tabs.push(tObj);
          });
          leftMostTab = tabs[0];
          isOverflow = totalWidth > containerWidth;
        }, slideIt = function (backDirection, tabInContext) {
          var indexOffset = 1, isToofar;
          if (backDirection) {
            indexOffset = -1;
          } else if (!tabInContext) {
          }
          leftPosition = parseInt(element.css('left'));
          if (!leftMostTab) {
            leftMostTab = tabs[0];
          }
          isHome = homePosition === leftPosition;
          if (backDirection) {
            leftMostTab.visibility = 1;
          } else {
            leftMostTab.visibility = 0;
          }
          leftMostTab = tabs[leftMostTab.index + indexOffset];
          widthLeftToTheRight = _.reduce(_.pluck(_.filter(tabs, function (tb) {
            return tb.visibility === 1;
          }), 'width'), function (memo, num) {
            return memo + num;
          }, 0);
          if (isToofar) {
            isToofar = false;
          } else if (tabInContext) {
            if (tabInContext.lastTab) {
              isToofar = true;
            }
          } else {
            isToofar = widthLeftToTheRight < containerWidth;
          }
          if (leftMostTab) {
            if (isToofar) {
              leftPosition = containerWidth - totalWidth - homePosition;
              element.parent().find('> .next').addClass('disabled');
            } else {
              element.parent().find('> .next').removeClass('disabled');
              leftPosition = leftMostTab.offset;
            }
            if (tabInContext && !isToofar) {
              //if this the last tab on the right do nothing different
              if (tabInContext.index !== tabs.length - 1) {
                //not the last tab on the right need to adjust the left offset
                leftPosition = tabInContext.tabContainerWidth - tabInContext.rightMostPoint - 60;
              }
            }
            if (!breakpoint().isXS) {
              element.css('left', leftPosition + 'px');
            }
          } else {
            isHome = true;
          }
          if (isHome) {
            element.parent().find('> .prev').addClass('disabled');
          } else {
            element.parent().find('> .prev').removeClass('disabled');
          }
        };
      initTabs();
      if (isOverflow) {
        //this should already be overflow but in case it wasn't checked before it got fired
        element.width(totalWidth + 1);
        //add 1 so that it doesn't drop the last tab to a second line
        element.css('left', homePosition + 'px');
        //compensates for the left arrow that will be added
        element.parent().addClass('nav-tabs-overflow-container');
        //css wrapper for styling
        element.before('<div class="prev disabled"><a href="javascript:;"><i class="' + options.iconClasses.left + '"></i></a></div>');
        //left arrow
        element.after('<div class="next"><a href="javascript:;"><i class="' + options.iconClasses.right + '"></i></a></div>');
        //right arrow
        changeHeight = function (h) {
          if (h) {
            element.css('height', h + 2 + 'px');
            //2 pixels account for top and bottom border
            element.find('> li').find('a').css('height', h + 'px');
            element.parent().find('.prev,.next').find('a').css('height', h + 'px');
            element.parent().find('.prev,.next').find('a').css('padding-top', h / 2 - 8 + 'px');  //moves the arrow to center when the content pushes the height beyond default (42px)
          } else {
            //if no height is provided everything is reset.
            element.removeAttr('style').width(totalWidth + 200);
            //removes height and resets width
            element.find('> li').find('a').removeAttr('style');
            //removes height
            element.parent().find('.prev,.next').find('a').removeAttr('style');  //removes height
          }
        };
        if (maxTabHeight > options.defaultHeight && !breakpoint().isXS) {
          //$rootScope.bp is part of dell-ui-components angular module
          changeHeight(maxTabHeight);
        } else {
          changeHeight();
        }
        //set up a window change watch here
        $(window).resize(function () {
          if (breakpoint().isXS) {
            changeHeight();  //if it is mobile (xs) clear all height values
          } else {
            changeHeight(maxTabHeight);
          }
        });
        tabObjs.on('click', function (e) {
          var t = {
              rightMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth,
              leftMostPoint: e.currentTarget.offsetLeft + e.currentTarget.offsetWidth - $(e.currentTarget).width() - 2,
              tabContainerWidth: $(e.currentTarget).parents('.nav-tabs-overflow-container').width(),
              tabContainerOffset: $(e.currentTarget).parent()[0].offsetLeft,
              index: $(e.currentTarget).index()
            };
          if (t.tabContainerWidth - t.rightMostPoint - t.tabContainerOffset < options.pagerWidth + 1) {
            if (t.index === tabs.length - 1) {
              // last tab, make sure it is not already at the end
              if (t.rightMostPoint + t.tabContainerOffset + options.pagerWidth - 1 < t.tabContainerWidth) {
                slideIt(false, t);  //false sets it as a forward move with the tab in context
              } else if (t.rightMostPoint + t.tabContainerOffset + options.pagerWidth - 1 > t.tabContainerWidth) {
                t.lastTab = true;
                //let slide function that it is the last tab
                slideIt(false, t);  //false sets it as a forward move with the tab in context
              }  //otherwise if it is right on the last spot dont slide it
            } else {
              slideIt(false, t);  //false sets it as a forward move with the tab in context
            }
          } else if (t.leftMostPoint + t.tabContainerOffset < 0) {
            slideIt(true);  //true sets it as a backward move
          }
        });
        element.parent().find('> .prev').on('click', function (e) {
          if (!$(e.currentTarget).hasClass('disabled')) {
            slideIt(true);  //true sets it as a backward move
          }
        });
        element.parent().find('> .next').on('click', function (e) {
          if (!$(e.currentTarget).hasClass('disabled')) {
            slideIt();  //no argument (false) sets it as a forward move
          }
        });
      }
    });
  };
}(jQuery));
(function ($) {
  $.dellUIloadMore = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // Add a reverse reference to the DOM object
    base.$el.data('dellUIloadMore', base);
  };
  $.dellUIloadMore.defaultOptions = {
    lazyLoad: false,
    scrollTarget: window,
    fadeIn: true,
    loadMoreButtonText: 'Load more',
    loadMoreIncrement: 5
  };
  $.fn.dellUIloadMore = function (options) {
    if (options) {
      $.dellUIloadMore.defaultOptions = $.extend($.dellUIloadMore.defaultOptions, options);
    }
    return this.each(function () {
      new $.dellUIloadMore(this);
      var options = $.dellUIloadMore.defaultOptions, element = $(this), visibleCount = 0, items = element.find('li'), elementId = typeof $(this).attr('id') !== 'undefined' ? $(this).attr('id') : Math.random(1 + Math.random() * 100000000000), button = '<p><button id="load-more-button-' + elementId + '" rel="' + elementId + '" type="button" class="btn btn-block">' + options.loadMoreButtonText + '</button></p>', loadMore = function () {
          visibleCount = visibleCount + options.loadMoreIncrement;
          items = element.find('li');
          items.each(function (index) {
            if (index < visibleCount && $(items[index]).is(':hidden')) {
              $(this).addClass('in');
              if (index + 1 === items.length) {
                $('#load-more-button-' + elementId).remove();
              }
            }
          });
        }, initPagination = function () {
          if (element.hasClass('load-more-lazy')) {
            options.lazyLoad = true;
          }
          if (options.fadeIn) {
            items.addClass('fade');
          }
          loadMore();
          if (!options.lazyLoad) {
            element.after(button);
            $('#load-more-button-' + elementId).click(function () {
              loadMore();
            });
          } else {
            if (options.scrollTarget === window) {
              $(options.scrollTarget).scroll(function () {
                if ($(options.scrollTarget).scrollTop() + $(options.scrollTarget).height() === $(document).height()) {
                  loadMore();
                }
              });
            } else {
              $(options.scrollTarget).scroll(function () {
                if ($(this).scrollTop() + $(this).height() === $(this)[0].scrollHeight) {
                  loadMore();
                }
              });
            }
          }
        };
      initPagination();
    });
  };
}(jQuery));
(function ($) {
  $.dellUIcontentGallery = function (el) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // Add a reverse reference to the DOM object
    base.$el.data('dellUIcontentGallery', base);
  };
  $.fn.dellUIcontentGallery = function () {
    return this.each(function () {
      new $.dellUIcontentGallery(this);
      var element = $(this), allListItems = element.find('li'), showMoreToggle = element.find('.content-gallery-show-more'), initGallery = function () {
          showMoreToggle.on('click', function (e) {
            var parentLi = $($(e.currentTarget).parents('li')[0]), rowWidth = 0, rowMaxWidth = Math.abs(element.parent().innerWidth() - element.parent().css('padding-left').replace(/px/, '') - element.parent().css('padding-right').replace(/px/, '')), targetFound, targetIndex, done, content;
            if (parentLi.hasClass('open')) {
              element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function () {
                $(this).remove();
              });
              element.find('.open').removeClass('open');
            } else {
              element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function () {
                $(this).remove();
              });
              element.find('.open').removeClass('open');
              setTimeout(function () {
                parentLi.addClass('open');
                $.each(allListItems, function (index, i) {
                  if (!done) {
                    var itemWidth = $(i).outerWidth();
                    if (!targetFound) {
                      targetFound = $(i).hasClass('open');
                      targetIndex = index;
                      content = '<li class="col-xs-12 details-container"><div class="gallery"><span class="close"><button type="button" class="close">\xd7</button></span>' + $(i).find('.content-gallery-details').html() + '</div></li>';
                    }
                    rowWidth = rowWidth + itemWidth;
                    if (rowWidth >= rowMaxWidth || index === allListItems.length - 1) {
                      if (targetFound) {
                        $(i).after(content);
                        element.find('.details-container').attr('display', 'block').slideDown(450);
                        element.find('.details-container .close').on('click', function (e) {
                          e.preventDefault();
                          element.find('li.details-container').attr('display', 'none').slideUp(450).delay(500).queue(function () {
                            $(this).remove();
                          });
                          element.find('.open').removeClass('open');
                        });
                        element.find('.details-container').on('click', function (e) {
                          e.stopPropagation();
                        });
                        done = true;
                      } else {
                        rowWidth = 0;
                      }
                    }
                  }
                });
              }, 100);
            }
          });
        };
      initGallery();
    });
  };
}(jQuery));
(function ($) {
  $.dellUIuniversalFooter = function (el, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    // Access to jQuery and DOM versions of element
    base.$el = $(el);
    base.el = el;
    // Add a reverse reference to the DOM object
    base.$el.data('dellUIuniversalFooter', base);
  };
  $.dellUIuniversalFooter.defaultOptions = {
    xsMax: 750,
    smMin: 751,
    smMax: 975,
    mdMin: 974,
    mdMax: 1141,
    dosomething: ''
  };
  $.fn.dellUIuniversalFooter = function (options) {
    if (options) {
      $.dellUIuniversalFooter.defaultOptions = $.extend($.dellUIuniversalFooter.defaultOptions, options);
    }
    return this.each(function () {
      new $.dellUIuniversalFooter(this);
      var options = $.dellUIuniversalFooter.defaultOptions, breakpoint = function () {
          var window_size = $(window).width(), breakpoint = {
              isXS: false,
              isSM: false,
              isMD: false,
              isLG: false
            };
          switch (true) {
          case window_size < options.xsMax:
            breakpoint.isXS = true;
            break;
          case window_size > options.smMin && window_size < options.smMax:
            breakpoint.isSM = true;
            break;
          case window_size > options.mdMin && window_size < options.mdMax:
            breakpoint.isMD = true;
            break;
          default:
            breakpoint.isLG = true;
            break;
          }
          return breakpoint;
        }, responsiveElements = function () {
          if (breakpoint().isXS) {
            $('.footer-gallery').css('display', 'none');
            $('.gallery-shadow-section').css('display', 'none');
          } else {
            $('.footer-gallery').css('display', 'block');
            $('.gallery-shadow-section').css('display', 'block');
          }
        }, equalizeRows = function () {
          setTimeout(function () {
            $('.gallery-item').removeAttr('style');
            var eObj = {
                highest: 0,
                columns: $('.gallery-item')
              };
            eObj.columns.each(function () {
              var currColumnHeight = $(this).outerHeight();
              if (currColumnHeight > eObj.highest) {
                eObj.highest = currColumnHeight;
              }
            });
            eObj.columns.height(eObj.highest);
          }, 800);
        }, importJson = function () {
          if (!options.datafile) {
            options.datafile = 'components/footer/footerData.json';
          }
          $.getJSON(options.datafile, function (data) {
            var items = [];
            //console.log("data", data);
            $.each(data, function () {
              var countryData = data;
              $.each(countryData.countries, function (key, value) {
                var countryInfo = value;
                items.push('<li><a href=\'javascript;\'>' + countryInfo.label + '</a></li>');
              });
            });
            $('.country-names').append(items);
          });
        };
      importJson();
      equalizeRows();
      responsiveElements();
      $(window).resize(function () {
        equalizeRows();
        responsiveElements();
      });
    });
  };
}(jQuery));
angular.module('dellUiComponents').directive('toggle', [
  '$rootScope',
  '$timeout',
  '$compile',
  function ($rootScope, $timeout, $compile) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs, controller) {
        switch ($attrs.toggle) {
        case 'popover':
          var hidePopover = function () {
            $element.popover('hide');
            $element.blur();
          };
          if ($attrs.trigger === 'hover') {
            $element.popover({ trigger: 'hover' });
          } else {
            $element.popover({ trigger: 'manual' });
            $element.on('click', function () {
              $element.popover('toggle');
            });
            $element.on('shown.bs.popover', function () {
              $element.next().off('click');
              $element.next().on('click', function () {
                $element.focus();
              });
              $('[data-dismiss="popover"]').on('click', function () {
                $timeout(function () {
                  $element.blur();
                }, 300);
              });
              $element.off('blur');
              $element.on('blur', function () {
                $timeout(function () {
                  if (!$element.is(':focus')) {
                    hidePopover();
                  }
                }, 500);
              });
              $compile($element.next().contents())($scope);
            });
            $element.on('hidden.bs.popover', function () {
              $element.on('click', function () {
                $element.popover('show');
              });
            });
          }
          break;
        case 'tooltip':
          $element.tooltip();
          $element.on('click', function () {
            if ($rootScope.bp.isXS) {
              $element.tooltip('show');
            }
          });
          $element.on('mouseenter', function () {
            if ($rootScope.bp.isXS) {
              $element.tooltip('hide');
            }
          });
          break;
        case 'offcanvas':
          $element.on('click', function (event) {
            event.preventDefault();
            $element.parents('.row-offcanvas').find('.tab-content').removeClass('active');
            $element.parents('.row-offcanvas').removeClass('active');
          });
          break;
        case 'tab':
          $element.on('click', function (event) {
            event.preventDefault();
            $(this).tab('show');
            $(this).parents('.row-offcanvas').find('.tab-content').addClass('active');
            $(this).parents('.row-offcanvas').addClass('active');
          });
          break;
        case 'collapse':
          $element.on('click', function (event) {
            event.preventDefault();
          });
          break;
        case 'load-more':
          var selector = $attrs.target, size_li = $(selector + ' li').size(), x = 3;
          if (!selector) {
            console.error('You must use data-target when using data-toggle="load-more". ');
          }
          $(selector + ' li:lt(' + x + ')').show();
          $element.click(function () {
            x = x + 5 <= size_li ? x + 5 : size_li;
            $(selector + ' li:lt(' + x + ')').fadeIn(1500);
            if ($(selector + ' li:visible').size() === size_li) {
              $element.hide();
            }
            var $this = $(this);
            $this.button('loading');
            setTimeout(function () {
              $this.button('reset');
            }, 1500);
          });
          break;
        case 'list-truncated':
          var target = $attrs.target;
          if (!target) {
            target = $element.prev();
          }
          if ($(target).find('li').length <= 5) {
            $element.hide();
          } else {
            var maxHeight = 0, minHeight = 0;
            _.each($(target).find('li'), function (listItem, index) {
              if (index < 5) {
                minHeight = minHeight + $(listItem).height();
              }
              maxHeight = maxHeight + $(listItem).height();
            });
            $(target).height(minHeight);
            $element.on('click', function () {
              var height = minHeight;
              if ($element.hasClass('collapsed')) {
                height = maxHeight;
              }
              $element.toggleClass('collapsed');
              $(target).animate({ height: height }, {
                duration: 300,
                specialEasing: { height: 'swing' }
              });
            });
          }
          break;
        }
      }
    };
  }
]);
angular.module('dellUiComponents').directive('navTabs', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, iAttrs, controller) {
      var containerWidth = $element.parent().width(), tabObjs = $element.find('> li'), totalWidth = 0;
      _.each(tabObjs, function (t, index) {
        totalWidth = totalWidth + $(t).width() + 1;
      });
      if (totalWidth > containerWidth) {
        $element.dellUIoverflowTab({
          iconClasses: {
            left: 'icon-ui-arrowleft',
            right: 'icon-ui-arrowright'
          }
        });
      }
    }
  };
});
angular.module('dellUiComponents').directive('defaultFooter', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, $attributes, controller) {
      var options = {};
      if ($attributes.datafile) {
        options.datafile = $attributes.datafile;
      }
      if ($(window).resize) {
        $element.dellUIuniversalFooter(options);
      }
    }
  };
});
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
                infinite: true
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
/*
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
}).directive('showHidePassword', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, $attrs, controller) {
      $element.find('.checkbox input[type=checkbox]').on('click', function () {
        if ($element.find('.checkbox input[type=checkbox]').is(':checked')) {
          $($element).find('input[type=password]').attr('type', 'text');
        } else {
          $($element).find('input[type=text]').attr('type', 'password');
        }
      });
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
    restrict: 'C',
    link: function ($scope, $element, $attrs, controller) {
      // Angular implementation for Boostrap Slider: http://seiyria.com/bootstrap-slider/
      var options = {};
      if ($attrs.sliderLabel) {
        options.formatter = function (value) {
          return $attrs.sliderLabel + value;
        };
      }
      $element.slider(options);
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
      $scope.emptyName = $attributes.emptyName || 'State';
    }
  };
}).directive('dateSelector', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, $attrs) {
        var inputField = $element.find('input'), calendarIcon = $element.find('.icon-small-calendar'), calendarWidget, inputFieldWidth = inputField.width(), inputFieldOffset = inputField.offset(), viewPortWidth = $(window).width(), viewPortHeight = $(window).height(), dateSelectorConfig = {
            icons: {
              time: 'icon-small-clock',
              date: 'icon-small-calendar',
              up: 'glyphicon glyphicon-chevron-up',
              down: 'glyphicon glyphicon-chevron-down',
              previous: 'glyphicon glyphicon-chevron-left',
              next: 'glyphicon glyphicon-chevron-right',
              today: 'icon-small-software',
              clear: 'icon-small-trash',
              close: 'icon-ui-close'
            },
            keepOpen: true,
            widgetPositioning: {
              horizontal: 'right',
              vertical: typeof $attrs.position !== 'undefined' ? $attrs.position : 'bottom'
            },
            format: typeof $attrs.format !== 'undefined' ? $attrs.format : 'MM/DD/YYYY'
          };
        //TODO, check to see if the field is at the bottom of the viewport and position it on top
        inputField.datetimepicker(dateSelectorConfig);
        inputField.on('dp.show', function (e) {
          viewPortWidth = $(window).width();
          viewPortHeight = $(window).height();
          inputFieldWidth = inputField.width();
          inputFieldOffset = inputField.offset();
          calendarWidget = $element.find('.bootstrap-datetimepicker-widget');
          //have to repeat this because it is destroyed everytime focus is gone
          //check to see if the right side is big enough for the widget
          if (inputFieldOffset.left + inputFieldWidth + 215 > viewPortWidth) {
            calendarWidget.removeClass('pull-right');
            calendarWidget.addClass('pull-left');
          } else {
            calendarWidget.removeClass('pull-left');
            calendarWidget.addClass('pull-right');
          }
          //check to see if the bottom side is big enough for the widget
          if (inputFieldOffset.top - window.pageYOffset + 255 > viewPortHeight) {
            //dateSelectorConfig.widgetPositioning.vertical = "top";
            calendarWidget.removeClass('bottom').addClass('top');
          } else {
            calendarWidget.removeClass('bottom, top').addClass(dateSelectorConfig.widgetPositioning.vertical);
          }
          calendarWidget.find('.datepicker tr > td.day').on('click', function () {
            $timeout(function () {
              inputField.data('DateTimePicker').hide();
            });
          });
        });
        calendarIcon.on('click', function (e) {
          inputField.focus();
        });
      }
    };
  }
]);
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
angular.module('dellUiComponents').directive('tableResponsive', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'AC',
      link: function ($scope, $element, $attrs, controller) {
        $element.rtResponsiveTables({ containerBreakPoint: 300 });
      }
    };
  }
]);
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
}).directive('loadMore', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, attrs) {
      var options = {
          lazyLoad: typeof attrs.lazyLoad !== 'undefined' ? attrs.lazyLoad === 'true' : false,
          scrollTarget: typeof attrs.scrollTarget !== 'undefined' ? attrs.scrollTarget : window,
          fadeIn: typeof attrs.fadeIn !== 'undefined' ? attrs.fadeIn === 'true' : true,
          loadMoreButtonText: typeof attrs.loadMoreButtonText !== 'undefined' ? attrs.loadMoreButtonText : 'Load more',
          loadMoreIncrement: typeof attrs.loadMoreIncrement !== 'undefined' ? parseInt(attrs.loadMoreIncrement) : 5
        };
      $element.dellUIloadMore(options);
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
              //console.log($scope.fakeAnimationValue,$scope.fakeAnimationSteps);
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
        //console.log('hello timeout');
        $scope.resetFakeAnimation = function () {
          $scope.fakeAnimationValue = 0;
          $scope.fakeAnimation();
          $scope.stripeAnimate = 'active';
        };
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
            $(selector).matchHeight({ property: 'min-height' });
          }, 500);
        } else {
          console.error('equalize-height usage error. Must include css selector to identify objects to equalize. Example: cequalize-height=".classname"');
        }
      }
    };
  }
]);
/* globals: jQuery, Eve */
/* ======================================================================================
 * Dell-UI-Components: contact-drawer.js
 * http://www.delldesignlibrary.com/components/contact-drawer/
 * ======================================================================================
 * Copyright 2015 Dell, Inc.
 * Licensed under MIT (https://github.com/DellGDC/dell-ui-components/blob/master/LICENSE)
 * ======================================================================================
 */
//Requires jQuery and Eve.js
(function ($, Eve) {
  Eve.scope('.contact-drawer', function () {
    this.listen('.contact-drawer-cta', 'click', function (e) {
      $(e.currentTarget).parent().toggleClass('open');
    });
  });
}(jQuery, Eve));
angular.module('dellUiComponents').directive('contentGallery', [
  '$timeout',
  '$rootScope',
  function ($timeout, $rootScope) {
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $element.dellUIcontentGallery();
      }
    };
  }
]);
/**
 * Created by Clint_Batte on 5/18/2015.
 */
angular.module('dellUiComponents').directive('navAnchored', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'CA',
      link: function ($scope, $element, iAttrs, controller) {
        function fixWidth() {
          $element.css('width', $element.parent().width() + 1).css('left', $element.parent().offset().left + 1 / 2);
        }
        fixWidth();
        $(window).resize(function () {
          fixWidth();
        });
        var sticky = new Waypoint.Sticky({
            element: $element,
            stuckClass: 'affix',
            wrapper: 'nav-tabs-affix'
          }), waypointObjs = $element.find('> li > a[href^=#]'), waypoints = [], triggerClicked = false, offsetHeight = $element.height() + 5;
        //console.log(waypointObjs);
        function clearActiveTab() {
          $element.find('> li').removeClass('active');
        }
        if (waypointObjs) {
          $(waypointObjs).on('click', function (e) {
            //Setting up a click listener on each tab
            e.preventDefault();
            var target = $($(e.currentTarget).attr('href'));
            $('html, body').stop().animate({ 'scrollTop': target.offset().top - offsetHeight }, 900, 'swing');
            if ($element.find('> li').hasClass('active')) {
              clearActiveTab();
              $(e.currentTarget).parent().addClass('active');
              triggerClicked = true;
            }
          });
          _.each(waypointObjs, function (w, index) {
            var target = $($(w).attr('href')), targetWaypoint = new Waypoint.Inview({
                element: target,
                entered: function (direction) {
                  if (direction === 'up' && !triggerClicked) {
                    clearActiveTab();
                    $('[href=' + this.element.selector + ']').parent().addClass('active');
                  } else {
                    $timeout(function () {
                      triggerClicked = false;
                    }, 900);  //wait for the annimation to be done
                  }
                },
                exited: function (direction) {
                  if (direction === 'down' && !triggerClicked) {
                    clearActiveTab();
                    $('[href=' + this.element.selector + ']').parent().next().addClass('active');
                  } else {
                    $timeout(function () {
                      triggerClicked = false;
                    }, 900);  //wait for the annimation to be done
                  }
                }
              });
          });
        }
      }
    };
  }
]);
/**
 * Created by Clint_Batte on 7/14/2015.
 */
/* ======================================================================================
 * Dell-UI-Components: tables.js
 * http://www.delldesignlibrary.com/components/tables/
 * ======================================================================================
 * Copyright 2015 Dell, Inc.
 * Licensed under MIT (https://github.com/DellGDC/dell-ui-components/blob/master/LICENSE)
 * ======================================================================================
 */
angular.module('dellUiComponents').directive('tableFixedHeader', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $(document).ready(function () {
          var table = $('.table-sort').DataTable({
              'pagingType': 'simple',
              'language': {
                'paginate': {
                  'next': 'Next&nbsp;<span aria-hidden="true" class="icon-ui-arrowright"></span>',
                  'previous': '<span aria-hidden="true" class="icon-ui-arrowleft"></span>&nbsp;Previous'
                }
              }
            });
          new $.fn.dataTable.FixedHeader(table);
        });
      }
    };
  }
]).directive('tableFixedColumn', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        var table = $('.table-column').DataTable({
            scrollY: '300px',
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            'oLanguage': { 'sSearch': '<i class="icon-small-magnifying-glass text-blue"></i>' }
          });
        //change the position of the sorting toggle arrows
        table.columns().iterator('column', function (ctx, idx) {
          $(table.column(idx).header()).append('<span class="sort-icon"/>');
        });
        new $.fn.dataTable.FixedColumns(table);
        // change positioning of search bar
        $element.each(function () {
          var datatable = $(this);
          // find the search label
          var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
          search_label.addClass('hide-text');
          // SEARCH - Add the placeholder for Search and Turn this into in-line form control
          var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
          search_input.attr('placeholder', 'Search');
          search_input.addClass('form-control col-xs-12 col-sm-4');
          // LENGTH - Inline-Form control
          // code below for select
          var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
          length_sel.addClass('form-control');
        });
      }
    };
  }
]).directive('responsiveDataTable', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        var table = $('table.responsive-data-table').DataTable({
            dom: 'C<"clear">lfrtip',
            displayLength: 5,
            paging: false,
            scrollY: '300px',
            scrollX: true,
            'oLanguage': { 'sSearch': '<i class="icon-small-magnifying-glass text-blue"></i>' }
          });
        //change the position of the sorting toggle arrows
        table.columns().iterator('column', function (ctx, idx) {
          $(table.column(idx).header()).append('<span class="sort-icon"/>');
        });
        // change positioning of search bar
        $element.each(function () {
          var datatable = $(this);
          // find the search label
          var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
          search_label.addClass('hide-text');
          // SEARCH - Add the placeholder for Search and Turn this into in-line form control
          var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
          search_input.attr('placeholder', 'Search');
          search_input.addClass('form-control col-xs-12 col-sm-4');
          // LENGTH - Inline-Form control
          // code below for select
          var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
          length_sel.addClass('form-control');
        });
      }
    };
  }
]).directive('tableComplex', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        /* Formatting function for row details - modify as you need */
        function format(d) {
          // `d` is the original data object for the row
          return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' + '<tr>' + '<td>Full name:</td>' + '<td>' + d.name + '</td>' + '</tr>' + '<tr>' + '<td>Extension number:</td>' + '<td>' + d.extn + '</td>' + '</tr>' + '<tr>' + '<td>Extra info:</td>' + '<td>And any further details here (images etc)...</td>' + '</tr>' + '</table>';
        }
        var table = $('table.table-complex').DataTable({
            'ajax': '../components/tables/data.json',
            'columns': [
              {
                'className': 'details-control',
                'orderable': false,
                'data': null,
                'defaultContent': ''
              },
              { 'data': 'name' },
              { 'data': 'position' },
              { 'data': 'office' },
              { 'data': 'salary' }
            ],
            'order': [[
                1,
                'asc'
              ]],
            dom: 'C<"clear">lfrtip',
            displayLength: 5,
            paging: false,
            scrollY: '300px',
            scrollX: true,
            'oLanguage': { 'sSearch': '<i class="icon-small-magnifying-glass text-blue"></i>' }
          });
        //change the position of the sorting toggle arrows
        table.columns().iterator('column', function (ctx, idx) {
          $(table.column(idx).header()).append('<span class="sort-icon"/>');
        });
        // Add event listener for opening and closing details
        $('.table-complex tbody').on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);
          if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
          } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
          }
        });
        // change positioning of search bar
        $element.each(function () {
          var datatable = $(this);
          // find the search label
          var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
          search_label.addClass('hide-text');
          // SEARCH - Add the placeholder for Search and Turn this into in-line form control
          var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
          search_input.attr('placeholder', 'Search');
          search_input.addClass('form-control col-xs-12 col-sm-4');
          // LENGTH - Inline-Form control
          // code below for select
          var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
          length_sel.addClass('form-control');
        });
      }
    };
  }
]).directive('responsiveDataItem', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $(document).ready(function () {
          $('table.responsive-data-table').DataTable({
            dom: 'C<"clear">lfrtip',
            displayLength: 5,
            paging: false,
            scrollY: '300px',
            scrollX: true
          });
        });
      }
    };
  }
]);
/**
 * Created by Clint_Batte on 9/9/2015.
 */
/* ======================================================================================
 * Dell-UI-Components: tables.js
 * http://www.delldesignlibrary.com/components/tables/
 * ======================================================================================
 * Copyright 2015 Dell, Inc.
 * Licensed under MIT (https://github.com/DellGDC/dell-ui-components/blob/master/LICENSE)
 * ======================================================================================
 */
angular.module('dellUiComponents').directive('tableExpandableRow', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, $attributes, controller) {
        var datafile = 'components/tables-uber/data-responsive.json';
        //TODO need to redo sample json file so that includes configuration for columns
        if ($attributes.datafile) {
          datafile = $attributes.datafile;
        }
        function updateDataTableSelectAllCtrl(table) {
          var $table = table.table().node();
          var $chkbox_all = $('tbody input[type="checkbox"]', $table);
          var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
          var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);
          // If none of the checkboxes are checked
          if ($chkbox_checked.length === 0) {
            chkbox_select_all.checked = false;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = false;
            }  // If all of the checkboxes are checked
          } else if ($chkbox_checked.length === $chkbox_all.length) {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = false;
            }  // If some of the checkboxes are checked
          } else {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = true;
            }
          }
        }
        /* Formatting function for row details - modify as you need */
        function format(d) {
          // `d` is the original data object for the row
          //TODO we can't really do this. We can't hard code labels like "Company Name". The column names need to come from a configuration file. The HTML also needs to come from a template file.
          return '<row>' + '<div class="row">' + '<div class="col-xs-12">' + '<div class="col-xs-6 col-sm-3 visible-xs-block">' + '<p class="text-gray-medium small">Company Name</p>' + '<p>' + d.Company_name + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3 visible-xs-block">' + '<p class="text-gray-medium small">Solution ID</p>' + '<p><a href="javascript:;" class="btn-link">' + d.Solution_ID + '</a></p>' + '</div>' + '<div class="col-xs-6 col-sm-3 visible-xs-block">' + '<p class="text-gray-medium small">List Price</p>' + '<p>' + d.List_price + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3 visible-xs-block">' + '<p class="text-gray-medium small">Quote Number</p>' + '<p><a href="javascript:;" class="btn-link">' + d.Quote_number + '</a></p>' + '</div>' + '<div class="row">' + '<div class="col-xs-12 visible-xs-block">' + '<hr class="hr-gray top-offset-10">' + '</div>' + '</div>' + '<div class="col-xs-12">' + '<h3 class="text-blue">Account Details</h3>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Contact Number</p>' + '<p>' + d.Contact_number + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Extension</p>' + '<p>' + d.Extension + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Customer Since</p>' + '<p>' + d.Customer_since + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Location</p>' + '<p>' + d.Location + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Owner</p>' + '<p><a href="javascript:;" class="btn-link">' + d.Owner + '</a></p>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Last Edited</p>' + '<p>' + d.Last_edited + '</p>' + '</div>' + '<div class="col-xs-6 col-sm-3">' + '<p class="text-gray-medium small">Customer Number</p>' + '<p><a href="javascript:;" class="btn-link">' + d.Customer_number + '</a></p>' + '</div>' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-xs-12">' + '<hr class="hr-gray top-offset-10">' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-xs-12">' + '<h3 class="text-blue col-xs-12">Additional Notes</h3>' + '</div>' + '<div class="col-xs-12">' + '<div class="col-xs-6">' + '<p class="text-gray-medium small">Purchase Details</p>' + '<p>' + d.Purchase_details + '</p>' + '</div>' + '<div class="col-xs-6">' + '<p class=" text-gray-medium small">Sales Notes</p>' + '<p>' + d.Sales_notes + '</p>' + '</div>' + '</div>' + '</div>' + '</row>';
        }
        // Array holding selected row IDs
        var rows_selected = [];
        var tableData;
        var table = $element.DataTable({
            'ajax': datafile,
            'columnDefs': [{
                'targets': 0,
                'searchable': true,
                'orderable': true,
                'stateSave': true,
                'className': 'details-control',
                'render': function (data, type, full, meta) {
                  return '<input type="checkbox">';
                }
              }],
            responsive: { details: false },
            'columns': [
              { 'data': '' },
              {
                'data': 'Company_name',
                'sClass': 'editable'
              },
              {
                'data': 'Solution_ID',
                'sClass': 'editable'
              },
              {
                'data': 'List_price',
                'sClass': 'editable'
              },
              {
                'data': 'Quote_number',
                'sClass': 'editable'
              }
            ],
            'order': [
              1,
              'asc'
            ],
            'dom': 'C<"clear">lfrtip',
            'pagingType': 'simple',
            'language': {
              'paginate': {
                'next': 'Next&nbsp;<span aria-hidden="true" class="icon-ui-arrowright"></span>',
                'previous': '<span aria-hidden="true" class="icon-ui-arrowleft"></span>&nbsp;Previous'
              }
            },
            'fnDrawCallback': function () {
              //bind the click handler script to the newly created elements held in the table
              $('ul.pagination a').bind('click', dataReloadClick);
              //console.log('i was clicked');
              $('th.editable.sorting_asc' || 'th.editable.sorting_desc').bind('click', dataReloadClick);  //console.log('i was sorted');
            },
            'oLanguage': { 'sSearch': '<i class="icon-small-magnifying-glass text-blue"></i>' }
          });
        //change the position of the sorting toggle arrows
        table.columns().iterator('column', function (ctx, idx) {
          $(table.column(idx).header()).append('<span class="sort-icon"/>');
        });
        // Handle click on checkbox
        $element.find('tbody').on('click', 'input[type="checkbox"]', function (e) {
          var $row = $(this).closest('tr');
          // Get row data
          var data = table.row($row).data();
          // Get row ID
          var rowId = data[0];
          // Determine whether row ID is in the list of selected row IDs
          var index = $.inArray(rowId, rows_selected);
          // If checkbox is checked and row ID is not in list of selected row IDs
          if (this.checked && index === -1) {
            rows_selected.push(rowId);  // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
          } else if (!this.checked && index !== -1) {
            rows_selected.splice(index, 1);
          }
          if (this.checked) {
            $row.addClass('selected');
          } else {
            $row.removeClass('selected');
          }
          // Update state of "Select all" control
          updateDataTableSelectAllCtrl(table);
          //Prevent click event from propagating to parent
          e.stopPropagation();
        });
        // Handle click on "Select all" control
        $element.find('thead input[name="select_all"]').on('click', function (e) {
          if (this.checked) {
            $element.find('tbody input[type="checkbox"]:not(:checked)').trigger('click');
          } else {
            $element.find('tbody input[type="checkbox"]:checked').trigger('click');
          }
          // Prevent click event from propagating to parent
          e.stopPropagation();
        });
        // Handle table draw event
        table.on('draw', function () {
          // Update state of "Select all" control
          updateDataTableSelectAllCtrl(table);
        });
        // Handle form submission event
        $('#frm-table-uber').on('submit', function (e) {
          var form = this;
          // Iterate over all selected checkboxes
          $.each(rows_selected, function (index, rowId) {
            // Create a hidden element
            $(form).append($('<input>').attr('type', 'hidden').attr('name', 'id[]').val(rowId));
          });
        });
        var inputTable = $element.DataTable(tableData);
        if ($element.hasClass('table-editable')) {
          $timeout(function () {
            //console.log("editable table here");
            $element.find('td.editable').attr('contenteditable', true);
            $element.find('td.editable').on('blur', function (e) {
              var newData = $(e.currentTarget).text(), data = inputTable.cell(this).data();
              if (data !== newData) {
              }
            });
          }, 100);
        }
        //onClick handler function
        function dataReloadClick(e) {
          e.preventDefault();
          //$(this).load('components/tables-uber/dataColumn.json');
          $timeout(function () {
            //console.log("editable table here");
            $element.find('td.editable').attr('contenteditable', true);
            $element.find('td.editable').on('blur', function (e) {
              var newData = $(e.currentTarget).text(), data = inputTable.cell(this).data();
              if (data !== newData) {
              }
            });
          }, 100);
        }
        // Add event listener for opening and closing details
        $element.find('tbody').on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);
          if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
          } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
          }
        });
        // change positioning of search bar
        $element.each(function () {
          var datatable = $(this);
          // find the search label
          var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
          search_label.addClass('hide-text');
          // SEARCH - Add the placeholder for Search and Turn this into in-line form control
          var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
          search_input.attr('placeholder', 'Search');
          search_input.addClass('form-control col-xs-12 col-sm-4');
          // LENGTH - Inline-Form control
          // code below for select
          var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
          length_sel.addClass('form-control');
        });
      }
    };
  }
]).directive('tableResponsiveColumns', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, $attributes, controller) {
        var datafile = 'components/tables-uber/dataColumn.json';
        //TODO need to redo sample json file so that includes configuration for columns
        if ($attributes.datafile) {
          datafile = $attributes.datafile;
        }
        function updateDataTableSelectAllCtrl(table) {
          var $table = table.table().node();
          var $chkbox_all = $('tbody input[type="checkbox"]', $table);
          var $chkbox_checked = $('tbody input[type="checkbox"]:checked', $table);
          var chkbox_select_all = $('thead input[name="select_all"]', $table).get(0);
          // If none of the checkboxes are checked
          if ($chkbox_checked.length === 0) {
            chkbox_select_all.checked = false;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = false;
            }  // If all of the checkboxes are checked
          } else if ($chkbox_checked.length === $chkbox_all.length) {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = false;
            }  // If some of the checkboxes are checked
          } else {
            chkbox_select_all.checked = true;
            if ('indeterminate' in chkbox_select_all) {
              chkbox_select_all.indeterminate = true;
            }
          }
        }
        // Array holding selected row IDs
        var rows_selected = [];
        var tableData;
        var table = $element.DataTable({
            'ajax': datafile,
            'columnDefs': [{
                'targets': 0,
                'searchable': true,
                'orderable': false,
                'stateSave': true,
                'className': 'dt-body-center',
                'render': function (data, type, full, meta) {
                  return '<input type="checkbox">';
                }
              }],
            'columns': [
              { 'data': '' },
              {
                'data': 'Company_name',
                'sClass': 'editable'
              },
              {
                'data': 'Solution_name',
                'sClass': 'editable'
              },
              {
                'data': 'Solution_ID',
                'sClass': 'editable'
              },
              {
                'data': 'Owner',
                'sClass': 'editable'
              },
              {
                'data': 'Last_edited',
                'sClass': 'editable'
              },
              {
                'data': 'List_price',
                'sClass': 'editable'
              },
              {
                'data': 'Customer_number',
                'sClass': 'editable'
              },
              {
                'data': 'Quote_number',
                'sClass': 'editable'
              },
              {
                'data': 'Status',
                'sClass': ''
              }
            ],
            'order': [
              1,
              'asc'
            ],
            dom: 'Rlfrtip',
            'pagingType': 'simple',
            'language': {
              'paginate': {
                'next': 'Next&nbsp;<span aria-hidden="true" class="icon-ui-arrowright"></span>',
                'previous': '<span aria-hidden="true" class="icon-ui-arrowleft"></span>&nbsp;Previous'
              }
            },
            'fnDrawCallback': function () {
              //bind the click handler script to the newly created elements held in the table
              $('ul.pagination a').bind('click', dataReloadClick);
              //console.log('i was clicked');
              $('th.editable.sorting_asc' || 'th.editable.sorting_desc').bind('click', dataReloadClick);  //console.log('i was sorted');
            },
            'responsive': true,
            'oLanguage': { 'sSearch': '<i class="icon-small-magnifying-glass text-blue"></i>' }
          });
        //change the position of the sorting toggle arrows
        table.columns().iterator('column', function (ctx, idx) {
          $(table.column(idx).header()).append('<span class="sort-icon"/>');
        });
        // Handle click on checkbox
        $element.find('tbody').on('click', 'input[type="checkbox"]', function (e) {
          var $row = $(this).closest('tr');
          // Get row data
          var data = table.row($row).data();
          // Get row ID
          var rowId = data[0];
          // Determine whether row ID is in the list of selected row IDs
          var index = $.inArray(rowId, rows_selected);
          // If checkbox is checked and row ID is not in list of selected row IDs
          if (this.checked && index === -1) {
            rows_selected.push(rowId);  // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
          } else if (!this.checked && index !== -1) {
            rows_selected.splice(index, 1);
          }
          if (this.checked) {
            $row.addClass('selected');
          } else {
            $row.removeClass('selected');
          }
          // Update state of "Select all" control
          updateDataTableSelectAllCtrl(table);
          //Prevent click event from propagating to parent
          e.stopPropagation();
        });
        // Handle click on "Select all" control
        $element.find('thead input[name="select_all"]').on('click', function (e) {
          if (this.checked) {
            $element.find('tbody input[type="checkbox"]:not(:checked)').trigger('click');
          } else {
            $element.find('tbody input[type="checkbox"]:checked').trigger('click');
          }
          // Prevent click event from propagating to parent
          e.stopPropagation();
        });
        // Handle table draw event
        table.on('draw', function () {
          // Update state of "Select all" control
          updateDataTableSelectAllCtrl(table);
        });
        // Handle form submission event
        $('#frm-table-uber').on('submit', function (e) {
          var form = this;
          // Iterate over all selected checkboxes
          $.each(rows_selected, function (index, rowId) {
            // Create a hidden element
            $(form).append($('<input>').attr('type', 'hidden').attr('name', 'id[]').val(rowId));
          });
        });
        var inputTable = $element.DataTable(tableData);
        if ($element.hasClass('table-editable')) {
          $timeout(function () {
            //console.log("editable table here");
            $element.find('td.editable').attr('contenteditable', true);
            $element.find('td.editable .btn').attr('contenteditable', false);
            $element.find('td.editable').on('blur', function (e) {
              var newData = $(e.currentTarget).text(), data = inputTable.cell(this).data();
              if (data !== newData) {
              }
            });
          }, 100);
        }
        //onClick handler function
        function dataReloadClick(e) {
          e.preventDefault();
          //$(this).load('components/tables-uber/dataColumn.json');
          $timeout(function () {
            //console.log("editable table here");
            $element.find('td.editable').attr('contenteditable', true);
            $element.find('td.editable').on('blur', function (e) {
              var newData = $(e.currentTarget).text(), data = inputTable.cell(this).data();
              if (data !== newData) {
              }
            });
          }, 100);
        }
        // Add event listener for opening and closing details
        $element.find('tbody').on('click', 'td.details-control', function () {
          var tr = $(this).closest('tr');
          var row = table.row(tr);
          var format = format;
          if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
          } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
          }
        });
        // change positioning of search bar
        $element.each(function () {
          var datatable = $(this);
          // find the search label
          var search_label = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] label');
          search_label.addClass('hide-text');
          // SEARCH - Add the placeholder for Search and Turn this into in-line form control
          var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
          search_input.attr('placeholder', 'Search');
          search_input.addClass('form-control col-xs-12 col-sm-4');
          // LENGTH - Inline-Form control
          // code below for select
          var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
          length_sel.addClass('form-control');
        });
      }
    };
  }
]);
angular.module('dellUiComponents').directive('scroll', function () {
  return {
    restrict: 'C',
    link: function ($scope, $element, $attr, fn) {
      $element.click(function (event) {
        event.preventDefault();
        $.scrollTo($attr.href, 300, { axis: 'y' });
      });
    }
  };
});