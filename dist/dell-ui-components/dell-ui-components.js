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
/*! DataTables 1.10.7
 * ©2008-2014 SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.7
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2008-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnScrollingWidthAdjust,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnScrollBarWidth,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/
(function (window, document, undefined) {
  (function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
      // Define as an AMD module if possible
      define('datatables', ['../../../jquery/jquery'], factory);
    } else if (typeof exports === 'object') {
      // Node/CommonJS
      module.exports = factory(require('jquery'));
    } else if (jQuery && !jQuery.fn.dataTable) {
      // Define using browser globals otherwise
      // Prevent multiple instantiations if the script is loaded twice
      factory(jQuery);
    }
  }(function ($) {
    'use strict';
    /**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
    var DataTable;
    /*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */
    // Defined else where
    //  _selector_run
    //  _selector_opts
    //  _selector_first
    //  _selector_row_indexes
    var _ext;
    // DataTable.ext
    var _Api;
    // DataTable.Api
    var _api_register;
    // DataTable.Api.register
    var _api_registerPlural;
    // DataTable.Api.registerPlural
    var _re_dic = {};
    var _re_new_lines = /[\r\n]/g;
    var _re_html = /<.*?>/g;
    var _re_date_start = /^[\w\+\-]/;
    var _re_date_end = /[\w\+\-]$/;
    // Escape regular expression special characters
    var _re_escape_regex = new RegExp('(\\' + [
        '/',
        '.',
        '*',
        '+',
        '?',
        '|',
        '(',
        ')',
        '[',
        ']',
        '{',
        '}',
        '\\',
        '$',
        '^',
        '-'
      ].join('|\\') + ')', 'g');
    // http://en.wikipedia.org/wiki/Foreign_exchange_market
    // - \u20BD - Russian ruble.
    // - \u20a9 - South Korean Won
    // - \u20BA - Turkish Lira
    // - \u20B9 - Indian Rupee
    // - R - Brazil (R$) and South Africa
    // - fr - Swiss Franc
    // - kr - Swedish krona, Norwegian krone and Danish krone
    // - \u2009 is thin space and \u202F is narrow no-break space, both used in many
    //   standards as thousands separators.
    var _re_formatted_numeric = /[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfk]/gi;
    var _empty = function (d) {
      return !d || d === true || d === '-' ? true : false;
    };
    var _intVal = function (s) {
      var integer = parseInt(s, 10);
      return !isNaN(integer) && isFinite(s) ? integer : null;
    };
    // Convert from a formatted number with characters other than `.` as the
    // decimal place, to a Javascript number
    var _numToDecimal = function (num, decimalPoint) {
      // Cache created regular expressions for speed as this function is called often
      if (!_re_dic[decimalPoint]) {
        _re_dic[decimalPoint] = new RegExp(_fnEscapeRegex(decimalPoint), 'g');
      }
      return typeof num === 'string' && decimalPoint !== '.' ? num.replace(/\./g, '').replace(_re_dic[decimalPoint], '.') : num;
    };
    var _isNumber = function (d, decimalPoint, formatted) {
      var strType = typeof d === 'string';
      // If empty return immediately so there must be a number if it is a
      // formatted string (this stops the string "k", or "kr", etc being detected
      // as a formatted number for currency
      if (_empty(d)) {
        return true;
      }
      if (decimalPoint && strType) {
        d = _numToDecimal(d, decimalPoint);
      }
      if (formatted && strType) {
        d = d.replace(_re_formatted_numeric, '');
      }
      return !isNaN(parseFloat(d)) && isFinite(d);
    };
    // A string without HTML in it can be considered to be HTML still
    var _isHtml = function (d) {
      return _empty(d) || typeof d === 'string';
    };
    var _htmlNumeric = function (d, decimalPoint, formatted) {
      if (_empty(d)) {
        return true;
      }
      var html = _isHtml(d);
      return !html ? null : _isNumber(_stripHtml(d), decimalPoint, formatted) ? true : null;
    };
    var _pluck = function (a, prop, prop2) {
      var out = [];
      var i = 0, ien = a.length;
      // Could have the test in the loop for slightly smaller code, but speed
      // is essential here
      if (prop2 !== undefined) {
        for (; i < ien; i++) {
          if (a[i] && a[i][prop]) {
            out.push(a[i][prop][prop2]);
          }
        }
      } else {
        for (; i < ien; i++) {
          if (a[i]) {
            out.push(a[i][prop]);
          }
        }
      }
      return out;
    };
    // Basically the same as _pluck, but rather than looping over `a` we use `order`
    // as the indexes to pick from `a`
    var _pluck_order = function (a, order, prop, prop2) {
      var out = [];
      var i = 0, ien = order.length;
      // Could have the test in the loop for slightly smaller code, but speed
      // is essential here
      if (prop2 !== undefined) {
        for (; i < ien; i++) {
          if (a[order[i]][prop]) {
            out.push(a[order[i]][prop][prop2]);
          }
        }
      } else {
        for (; i < ien; i++) {
          out.push(a[order[i]][prop]);
        }
      }
      return out;
    };
    var _range = function (len, start) {
      var out = [];
      var end;
      if (start === undefined) {
        start = 0;
        end = len;
      } else {
        end = start;
        start = len;
      }
      for (var i = start; i < end; i++) {
        out.push(i);
      }
      return out;
    };
    var _removeEmpty = function (a) {
      var out = [];
      for (var i = 0, ien = a.length; i < ien; i++) {
        if (a[i]) {
          // careful - will remove all falsy values!
          out.push(a[i]);
        }
      }
      return out;
    };
    var _stripHtml = function (d) {
      return d.replace(_re_html, '');
    };
    /**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
    var _unique = function (src) {
      // A faster unique method is to use object keys to identify used values,
      // but this doesn't work with arrays or objects, which we must also
      // consider. See jsperf.com/compare-array-unique-versions/4 for more
      // information.
      var out = [], val, i, ien = src.length, j, k = 0;
      again:
        for (i = 0; i < ien; i++) {
          val = src[i];
          for (j = 0; j < k; j++) {
            if (out[j] === val) {
              continue again;
            }
          }
          out.push(val);
          k++;
        }
      return out;
    };
    /**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
    function _fnHungarianMap(o) {
      var hungarian = 'a aa ai ao as b fn i m o s ', match, newKey, map = {};
      $.each(o, function (key, val) {
        match = key.match(/^([^A-Z]+?)([A-Z])/);
        if (match && hungarian.indexOf(match[1] + ' ') !== -1) {
          newKey = key.replace(match[0], match[2].toLowerCase());
          map[newKey] = key;
          if (match[1] === 'o') {
            _fnHungarianMap(o[key]);
          }
        }
      });
      o._hungarianMap = map;
    }
    /**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
    function _fnCamelToHungarian(src, user, force) {
      if (!src._hungarianMap) {
        _fnHungarianMap(src);
      }
      var hungarianKey;
      $.each(user, function (key, val) {
        hungarianKey = src._hungarianMap[key];
        if (hungarianKey !== undefined && (force || user[hungarianKey] === undefined)) {
          // For objects, we need to buzz down into the object to copy parameters
          if (hungarianKey.charAt(0) === 'o') {
            // Copy the camelCase options over to the hungarian
            if (!user[hungarianKey]) {
              user[hungarianKey] = {};
            }
            $.extend(true, user[hungarianKey], user[key]);
            _fnCamelToHungarian(src[hungarianKey], user[hungarianKey], force);
          } else {
            user[hungarianKey] = user[key];
          }
        }
      });
    }
    /**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnLanguageCompat(lang) {
      var defaults = DataTable.defaults.oLanguage;
      var zeroRecords = lang.sZeroRecords;
      /* Backwards compatibility - if there is no sEmptyTable given, then use the same as
		 * sZeroRecords - assuming that is given.
		 */
      if (!lang.sEmptyTable && zeroRecords && defaults.sEmptyTable === 'No data available in table') {
        _fnMap(lang, lang, 'sZeroRecords', 'sEmptyTable');
      }
      /* Likewise with loading records */
      if (!lang.sLoadingRecords && zeroRecords && defaults.sLoadingRecords === 'Loading...') {
        _fnMap(lang, lang, 'sZeroRecords', 'sLoadingRecords');
      }
      // Old parameter name of the thousands separator mapped onto the new
      if (lang.sInfoThousands) {
        lang.sThousands = lang.sInfoThousands;
      }
      var decimal = lang.sDecimal;
      if (decimal) {
        _addNumericSort(decimal);
      }
    }
    /**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
    var _fnCompatMap = function (o, knew, old) {
      if (o[knew] !== undefined) {
        o[old] = o[knew];
      }
    };
    /**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
    function _fnCompatOpts(init) {
      _fnCompatMap(init, 'ordering', 'bSort');
      _fnCompatMap(init, 'orderMulti', 'bSortMulti');
      _fnCompatMap(init, 'orderClasses', 'bSortClasses');
      _fnCompatMap(init, 'orderCellsTop', 'bSortCellsTop');
      _fnCompatMap(init, 'order', 'aaSorting');
      _fnCompatMap(init, 'orderFixed', 'aaSortingFixed');
      _fnCompatMap(init, 'paging', 'bPaginate');
      _fnCompatMap(init, 'pagingType', 'sPaginationType');
      _fnCompatMap(init, 'pageLength', 'iDisplayLength');
      _fnCompatMap(init, 'searching', 'bFilter');
      // Column search objects are in an array, so it needs to be converted
      // element by element
      var searchCols = init.aoSearchCols;
      if (searchCols) {
        for (var i = 0, ien = searchCols.length; i < ien; i++) {
          if (searchCols[i]) {
            _fnCamelToHungarian(DataTable.models.oSearch, searchCols[i]);
          }
        }
      }
    }
    /**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
    function _fnCompatCols(init) {
      _fnCompatMap(init, 'orderable', 'bSortable');
      _fnCompatMap(init, 'orderData', 'aDataSort');
      _fnCompatMap(init, 'orderSequence', 'asSorting');
      _fnCompatMap(init, 'orderDataType', 'sortDataType');
      // orderData can be given as an integer
      var dataSort = init.aDataSort;
      if (dataSort && !$.isArray(dataSort)) {
        init.aDataSort = [dataSort];
      }
    }
    /**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnBrowserDetect(settings) {
      var browser = settings.oBrowser;
      // Scrolling feature / quirks detection
      var n = $('<div/>').css({
          position: 'absolute',
          top: 0,
          left: 0,
          height: 1,
          width: 1,
          overflow: 'hidden'
        }).append($('<div/>').css({
          position: 'absolute',
          top: 1,
          left: 1,
          width: 100,
          overflow: 'scroll'
        }).append($('<div class="test"/>').css({
          width: '100%',
          height: 10
        }))).appendTo('body');
      var test = n.find('.test');
      // IE6/7 will oversize a width 100% element inside a scrolling element, to
      // include the width of the scrollbar, while other browsers ensure the inner
      // element is contained without forcing scrolling
      browser.bScrollOversize = test[0].offsetWidth === 100;
      // In rtl text layout, some browsers (most, but not all) will place the
      // scrollbar on the left, rather than the right.
      browser.bScrollbarLeft = Math.round(test.offset().left) !== 1;
      n.remove();
    }
    /**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnReduce(that, fn, init, start, end, inc) {
      var i = start, value, isSet = false;
      if (init !== undefined) {
        value = init;
        isSet = true;
      }
      while (i !== end) {
        if (!that.hasOwnProperty(i)) {
          continue;
        }
        value = isSet ? fn(value, that[i], i, that) : that[i];
        isSet = true;
        i += inc;
      }
      return value;
    }
    /**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
    function _fnAddColumn(oSettings, nTh) {
      // Add column to aoColumns array
      var oDefaults = DataTable.defaults.column;
      var iCol = oSettings.aoColumns.length;
      var oCol = $.extend({}, DataTable.models.oColumn, oDefaults, {
          'nTh': nTh ? nTh : document.createElement('th'),
          'sTitle': oDefaults.sTitle ? oDefaults.sTitle : nTh ? nTh.innerHTML : '',
          'aDataSort': oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
          'mData': oDefaults.mData ? oDefaults.mData : iCol,
          idx: iCol
        });
      oSettings.aoColumns.push(oCol);
      // Add search object for column specific search. Note that the `searchCols[ iCol ]`
      // passed into extend can be undefined. This allows the user to give a default
      // with only some of the parameters defined, and also not give a default
      var searchCols = oSettings.aoPreSearchCols;
      searchCols[iCol] = $.extend({}, DataTable.models.oSearch, searchCols[iCol]);
      // Use the default column options function to initialise classes etc
      _fnColumnOptions(oSettings, iCol, $(nTh).data());
    }
    /**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
    function _fnColumnOptions(oSettings, iCol, oOptions) {
      var oCol = oSettings.aoColumns[iCol];
      var oClasses = oSettings.oClasses;
      var th = $(oCol.nTh);
      // Try to get width information from the DOM. We can't get it from CSS
      // as we'd need to parse the CSS stylesheet. `width` option can override
      if (!oCol.sWidthOrig) {
        // Width attribute
        oCol.sWidthOrig = th.attr('width') || null;
        // Style attribute
        var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
        if (t) {
          oCol.sWidthOrig = t[1];
        }
      }
      /* User specified column options */
      if (oOptions !== undefined && oOptions !== null) {
        // Backwards compatibility
        _fnCompatCols(oOptions);
        // Map camel case parameters to their Hungarian counterparts
        _fnCamelToHungarian(DataTable.defaults.column, oOptions);
        /* Backwards compatibility for mDataProp */
        if (oOptions.mDataProp !== undefined && !oOptions.mData) {
          oOptions.mData = oOptions.mDataProp;
        }
        if (oOptions.sType) {
          oCol._sManualType = oOptions.sType;
        }
        // `class` is a reserved word in Javascript, so we need to provide
        // the ability to use a valid name for the camel case input
        if (oOptions.className && !oOptions.sClass) {
          oOptions.sClass = oOptions.className;
        }
        $.extend(oCol, oOptions);
        _fnMap(oCol, oOptions, 'sWidth', 'sWidthOrig');
        /* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
        if (oOptions.iDataSort !== undefined) {
          oCol.aDataSort = [oOptions.iDataSort];
        }
        _fnMap(oCol, oOptions, 'aDataSort');
      }
      /* Cache the data get and set functions for speed */
      var mDataSrc = oCol.mData;
      var mData = _fnGetObjectDataFn(mDataSrc);
      var mRender = oCol.mRender ? _fnGetObjectDataFn(oCol.mRender) : null;
      var attrTest = function (src) {
        return typeof src === 'string' && src.indexOf('@') !== -1;
      };
      oCol._bAttrSrc = $.isPlainObject(mDataSrc) && (attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter));
      oCol.fnGetData = function (rowData, type, meta) {
        var innerData = mData(rowData, type, undefined, meta);
        return mRender && type ? mRender(innerData, type, rowData, meta) : innerData;
      };
      oCol.fnSetData = function (rowData, val, meta) {
        return _fnSetObjectDataFn(mDataSrc)(rowData, val, meta);
      };
      // Indicate if DataTables should read DOM data as an object or array
      // Used in _fnGetRowElements
      if (typeof mDataSrc !== 'number') {
        oSettings._rowReadObject = true;
      }
      /* Feature sorting overrides column specific when off */
      if (!oSettings.oFeatures.bSort) {
        oCol.bSortable = false;
        th.addClass(oClasses.sSortableNone);  // Have to add class here as order event isn't called
      }
      /* Check that the class assignment is correct for sorting */
      var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
      var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
      if (!oCol.bSortable || !bAsc && !bDesc) {
        oCol.sSortingClass = oClasses.sSortableNone;
        oCol.sSortingClassJUI = '';
      } else if (bAsc && !bDesc) {
        oCol.sSortingClass = oClasses.sSortableAsc;
        oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
      } else if (!bAsc && bDesc) {
        oCol.sSortingClass = oClasses.sSortableDesc;
        oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
      } else {
        oCol.sSortingClass = oClasses.sSortable;
        oCol.sSortingClassJUI = oClasses.sSortJUI;
      }
    }
    /**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnAdjustColumnSizing(settings) {
      /* Not interested in doing column width calculation if auto-width is disabled */
      if (settings.oFeatures.bAutoWidth !== false) {
        var columns = settings.aoColumns;
        _fnCalculateColumnWidths(settings);
        for (var i = 0, iLen = columns.length; i < iLen; i++) {
          columns[i].nTh.style.width = columns[i].sWidth;
        }
      }
      var scroll = settings.oScroll;
      if (scroll.sY !== '' || scroll.sX !== '') {
        _fnScrollDraw(settings);
      }
      _fnCallbackFire(settings, null, 'column-sizing', [settings]);
    }
    /**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
    function _fnVisibleToColumnIndex(oSettings, iMatch) {
      var aiVis = _fnGetColumns(oSettings, 'bVisible');
      return typeof aiVis[iMatch] === 'number' ? aiVis[iMatch] : null;
    }
    /**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
    function _fnColumnIndexToVisible(oSettings, iMatch) {
      var aiVis = _fnGetColumns(oSettings, 'bVisible');
      var iPos = $.inArray(iMatch, aiVis);
      return iPos !== -1 ? iPos : null;
    }
    /**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
    function _fnVisbleColumns(oSettings) {
      return _fnGetColumns(oSettings, 'bVisible').length;
    }
    /**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
    function _fnGetColumns(oSettings, sParam) {
      var a = [];
      $.map(oSettings.aoColumns, function (val, i) {
        if (val[sParam]) {
          a.push(i);
        }
      });
      return a;
    }
    /**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnColumnTypes(settings) {
      var columns = settings.aoColumns;
      var data = settings.aoData;
      var types = DataTable.ext.type.detect;
      var i, ien, j, jen, k, ken;
      var col, cell, detectedType, cache;
      // For each column, spin over the
      for (i = 0, ien = columns.length; i < ien; i++) {
        col = columns[i];
        cache = [];
        if (!col.sType && col._sManualType) {
          col.sType = col._sManualType;
        } else if (!col.sType) {
          for (j = 0, jen = types.length; j < jen; j++) {
            for (k = 0, ken = data.length; k < ken; k++) {
              // Use a cache array so we only need to get the type data
              // from the formatter once (when using multiple detectors)
              if (cache[k] === undefined) {
                cache[k] = _fnGetCellData(settings, k, i, 'type');
              }
              detectedType = types[j](cache[k], settings);
              // If null, then this type can't apply to this column, so
              // rather than testing all cells, break out. There is an
              // exception for the last type which is `html`. We need to
              // scan all rows since it is possible to mix string and HTML
              // types
              if (!detectedType && j !== types.length - 1) {
                break;
              }
              // Only a single match is needed for html type since it is
              // bottom of the pile and very similar to string
              if (detectedType === 'html') {
                break;
              }
            }
            // Type is valid for all data points in the column - use this
            // type
            if (detectedType) {
              col.sType = detectedType;
              break;
            }
          }
          // Fall back - if no type was detected, always use string
          if (!col.sType) {
            col.sType = 'string';
          }
        }
      }
    }
    /**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
    function _fnApplyColumnDefs(oSettings, aoColDefs, aoCols, fn) {
      var i, iLen, j, jLen, k, kLen, def;
      var columns = oSettings.aoColumns;
      // Column definitions with aTargets
      if (aoColDefs) {
        /* Loop over the definitions array - loop in reverse so first instance has priority */
        for (i = aoColDefs.length - 1; i >= 0; i--) {
          def = aoColDefs[i];
          /* Each definition can target multiple columns, as it is an array */
          var aTargets = def.targets !== undefined ? def.targets : def.aTargets;
          if (!$.isArray(aTargets)) {
            aTargets = [aTargets];
          }
          for (j = 0, jLen = aTargets.length; j < jLen; j++) {
            if (typeof aTargets[j] === 'number' && aTargets[j] >= 0) {
              /* Add columns that we don't yet know about */
              while (columns.length <= aTargets[j]) {
                _fnAddColumn(oSettings);
              }
              /* Integer, basic index */
              fn(aTargets[j], def);
            } else if (typeof aTargets[j] === 'number' && aTargets[j] < 0) {
              /* Negative integer, right to left column counting */
              fn(columns.length + aTargets[j], def);
            } else if (typeof aTargets[j] === 'string') {
              /* Class name matching on TH element */
              for (k = 0, kLen = columns.length; k < kLen; k++) {
                if (aTargets[j] == '_all' || $(columns[k].nTh).hasClass(aTargets[j])) {
                  fn(k, def);
                }
              }
            }
          }
        }
      }
      // Statically defined columns array
      if (aoCols) {
        for (i = 0, iLen = aoCols.length; i < iLen; i++) {
          fn(i, aoCols[i]);
        }
      }
    }
    /**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
    function _fnAddData(oSettings, aDataIn, nTr, anTds) {
      /* Create the object for storing information about this new row */
      var iRow = oSettings.aoData.length;
      var oData = $.extend(true, {}, DataTable.models.oRow, { src: nTr ? 'dom' : 'data' });
      oData._aData = aDataIn;
      oSettings.aoData.push(oData);
      /* Create the cells */
      var nTd, sThisType;
      var columns = oSettings.aoColumns;
      for (var i = 0, iLen = columns.length; i < iLen; i++) {
        // When working with a row, the data source object must be populated. In
        // all other cases, the data source object is already populated, so we
        // don't overwrite it, which might break bindings etc
        if (nTr) {
          _fnSetCellData(oSettings, iRow, i, _fnGetCellData(oSettings, iRow, i));
        }
        columns[i].sType = null;
      }
      /* Add to the display array */
      oSettings.aiDisplayMaster.push(iRow);
      /* Create the DOM information, or register it if already present */
      if (nTr || !oSettings.oFeatures.bDeferRender) {
        _fnCreateTr(oSettings, iRow, nTr, anTds);
      }
      return iRow;
    }
    /**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
    function _fnAddTr(settings, trs) {
      var row;
      // Allow an individual node to be passed in
      if (!(trs instanceof $)) {
        trs = $(trs);
      }
      return trs.map(function (i, el) {
        row = _fnGetRowElements(settings, el);
        return _fnAddData(settings, row.data, el, row.cells);
      });
    }
    /**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
    function _fnNodeToDataIndex(oSettings, n) {
      return n._DT_RowIndex !== undefined ? n._DT_RowIndex : null;
    }
    /**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
    function _fnNodeToColumnIndex(oSettings, iRow, n) {
      return $.inArray(n, oSettings.aoData[iRow].anCells);
    }
    /**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
    function _fnGetCellData(settings, rowIdx, colIdx, type) {
      var draw = settings.iDraw;
      var col = settings.aoColumns[colIdx];
      var rowData = settings.aoData[rowIdx]._aData;
      var defaultContent = col.sDefaultContent;
      var cellData = col.fnGetData(rowData, type, {
          settings: settings,
          row: rowIdx,
          col: colIdx
        });
      if (cellData === undefined) {
        if (settings.iDrawError != draw && defaultContent === null) {
          _fnLog(settings, 0, 'Requested unknown parameter ' + (typeof col.mData == 'function' ? '{function}' : '\'' + col.mData + '\'') + ' for row ' + rowIdx, 4);
          settings.iDrawError = draw;
        }
        return defaultContent;
      }
      /* When the data source is null, we can use default column data */
      if ((cellData === rowData || cellData === null) && defaultContent !== null) {
        cellData = defaultContent;
      } else if (typeof cellData === 'function') {
        // If the data source is a function, then we run it and use the return,
        // executing in the scope of the data object (for instances)
        return cellData.call(rowData);
      }
      if (cellData === null && type == 'display') {
        return '';
      }
      return cellData;
    }
    /**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
    function _fnSetCellData(settings, rowIdx, colIdx, val) {
      var col = settings.aoColumns[colIdx];
      var rowData = settings.aoData[rowIdx]._aData;
      col.fnSetData(rowData, val, {
        settings: settings,
        row: rowIdx,
        col: colIdx
      });
    }
    // Private variable that is used to match action syntax in the data property object
    var __reArray = /\[.*?\]$/;
    var __reFn = /\(\)$/;
    /**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
    function _fnSplitObjNotation(str) {
      return $.map(str.match(/(\\.|[^\.])+/g), function (s) {
        return s.replace(/\\./g, '.');
      });
    }
    /**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
    function _fnGetObjectDataFn(mSource) {
      if ($.isPlainObject(mSource)) {
        /* Build an object of get functions, and wrap them in a single call */
        var o = {};
        $.each(mSource, function (key, val) {
          if (val) {
            o[key] = _fnGetObjectDataFn(val);
          }
        });
        return function (data, type, row, meta) {
          var t = o[type] || o._;
          return t !== undefined ? t(data, type, row, meta) : data;
        };
      } else if (mSource === null) {
        /* Give an empty string for rendering / sorting etc */
        return function (data) {
          // type, row and meta also passed, but not used
          return data;
        };
      } else if (typeof mSource === 'function') {
        return function (data, type, row, meta) {
          return mSource(data, type, row, meta);
        };
      } else if (typeof mSource === 'string' && (mSource.indexOf('.') !== -1 || mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1)) {
        /* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
        var fetchData = function (data, type, src) {
          var arrayNotation, funcNotation, out, innerSrc;
          if (src !== '') {
            var a = _fnSplitObjNotation(src);
            for (var i = 0, iLen = a.length; i < iLen; i++) {
              // Check if we are dealing with special notation
              arrayNotation = a[i].match(__reArray);
              funcNotation = a[i].match(__reFn);
              if (arrayNotation) {
                // Array notation
                a[i] = a[i].replace(__reArray, '');
                // Condition allows simply [] to be passed in
                if (a[i] !== '') {
                  data = data[a[i]];
                }
                out = [];
                // Get the remainder of the nested object to get
                a.splice(0, i + 1);
                innerSrc = a.join('.');
                // Traverse each entry in the array getting the properties requested
                for (var j = 0, jLen = data.length; j < jLen; j++) {
                  out.push(fetchData(data[j], type, innerSrc));
                }
                // If a string is given in between the array notation indicators, that
                // is used to join the strings together, otherwise an array is returned
                var join = arrayNotation[0].substring(1, arrayNotation[0].length - 1);
                data = join === '' ? out : out.join(join);
                // The inner call to fetchData has already traversed through the remainder
                // of the source requested, so we exit from the loop
                break;
              } else if (funcNotation) {
                // Function call
                a[i] = a[i].replace(__reFn, '');
                data = data[a[i]]();
                continue;
              }
              if (data === null || data[a[i]] === undefined) {
                return undefined;
              }
              data = data[a[i]];
            }
          }
          return data;
        };
        return function (data, type) {
          // row and meta also passed, but not used
          return fetchData(data, type, mSource);
        };
      } else {
        /* Array or flat object mapping */
        return function (data, type) {
          // row and meta also passed, but not used
          return data[mSource];
        };
      }
    }
    /**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
    function _fnSetObjectDataFn(mSource) {
      if ($.isPlainObject(mSource)) {
        /* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
        return _fnSetObjectDataFn(mSource._);
      } else if (mSource === null) {
        /* Nothing to do when the data source is null */
        return function () {
        };
      } else if (typeof mSource === 'function') {
        return function (data, val, meta) {
          mSource(data, 'set', val, meta);
        };
      } else if (typeof mSource === 'string' && (mSource.indexOf('.') !== -1 || mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1)) {
        /* Like the get, we need to get data from a nested object */
        var setData = function (data, val, src) {
          var a = _fnSplitObjNotation(src), b;
          var aLast = a[a.length - 1];
          var arrayNotation, funcNotation, o, innerSrc;
          for (var i = 0, iLen = a.length - 1; i < iLen; i++) {
            // Check if we are dealing with an array notation request
            arrayNotation = a[i].match(__reArray);
            funcNotation = a[i].match(__reFn);
            if (arrayNotation) {
              a[i] = a[i].replace(__reArray, '');
              data[a[i]] = [];
              // Get the remainder of the nested object to set so we can recurse
              b = a.slice();
              b.splice(0, i + 1);
              innerSrc = b.join('.');
              // Traverse each entry in the array setting the properties requested
              for (var j = 0, jLen = val.length; j < jLen; j++) {
                o = {};
                setData(o, val[j], innerSrc);
                data[a[i]].push(o);
              }
              // The inner call to setData has already traversed through the remainder
              // of the source and has set the data, thus we can exit here
              return;
            } else if (funcNotation) {
              // Function call
              a[i] = a[i].replace(__reFn, '');
              data = data[a[i]](val);
            }
            // If the nested object doesn't currently exist - since we are
            // trying to set the value - create it
            if (data[a[i]] === null || data[a[i]] === undefined) {
              data[a[i]] = {};
            }
            data = data[a[i]];
          }
          // Last item in the input - i.e, the actual set
          if (aLast.match(__reFn)) {
            // Function call
            data = data[aLast.replace(__reFn, '')](val);
          } else {
            // If array notation is used, we just want to strip it and use the property name
            // and assign the value. If it isn't used, then we get the result we want anyway
            data[aLast.replace(__reArray, '')] = val;
          }
        };
        return function (data, val) {
          // meta is also passed in, but not used
          return setData(data, val, mSource);
        };
      } else {
        /* Array or flat object mapping */
        return function (data, val) {
          // meta is also passed in, but not used
          data[mSource] = val;
        };
      }
    }
    /**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
    function _fnGetDataMaster(settings) {
      return _pluck(settings.aoData, '_aData');
    }
    /**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnClearTable(settings) {
      settings.aoData.length = 0;
      settings.aiDisplayMaster.length = 0;
      settings.aiDisplay.length = 0;
    }
    /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
    function _fnDeleteIndex(a, iTarget, splice) {
      var iTargetIndex = -1;
      for (var i = 0, iLen = a.length; i < iLen; i++) {
        if (a[i] == iTarget) {
          iTargetIndex = i;
        } else if (a[i] > iTarget) {
          a[i]--;
        }
      }
      if (iTargetIndex != -1 && splice === undefined) {
        a.splice(iTargetIndex, 1);
      }
    }
    /**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
    function _fnInvalidate(settings, rowIdx, src, colIdx) {
      var row = settings.aoData[rowIdx];
      var i, ien;
      var cellWrite = function (cell, col) {
        // This is very frustrating, but in IE if you just write directly
        // to innerHTML, and elements that are overwritten are GC'ed,
        // even if there is a reference to them elsewhere
        while (cell.childNodes.length) {
          cell.removeChild(cell.firstChild);
        }
        cell.innerHTML = _fnGetCellData(settings, rowIdx, col, 'display');
      };
      // Are we reading last data from DOM or the data object?
      if (src === 'dom' || (!src || src === 'auto') && row.src === 'dom') {
        // Read the data from the DOM
        row._aData = _fnGetRowElements(settings, row, colIdx, colIdx === undefined ? undefined : row._aData).data;
      } else {
        // Reading from data object, update the DOM
        var cells = row.anCells;
        if (cells) {
          if (colIdx !== undefined) {
            cellWrite(cells[colIdx], colIdx);
          } else {
            for (i = 0, ien = cells.length; i < ien; i++) {
              cellWrite(cells[i], i);
            }
          }
        }
      }
      // For both row and cell invalidation, the cached data for sorting and
      // filtering is nulled out
      row._aSortData = null;
      row._aFilterData = null;
      // Invalidate the type for a specific column (if given) or all columns since
      // the data might have changed
      var cols = settings.aoColumns;
      if (colIdx !== undefined) {
        cols[colIdx].sType = null;
      } else {
        for (i = 0, ien = cols.length; i < ien; i++) {
          cols[i].sType = null;
        }
        // Update DataTables special `DT_*` attributes for the row
        _fnRowAttributes(row);
      }
    }
    /**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
    function _fnGetRowElements(settings, row, colIdx, d) {
      var tds = [], td = row.firstChild, name, col, o, i = 0, contents, columns = settings.aoColumns, objectRead = settings._rowReadObject;
      // Allow the data object to be passed in, or construct
      d = d || objectRead ? {} : [];
      var attr = function (str, td) {
        if (typeof str === 'string') {
          var idx = str.indexOf('@');
          if (idx !== -1) {
            var attr = str.substring(idx + 1);
            var setter = _fnSetObjectDataFn(str);
            setter(d, td.getAttribute(attr));
          }
        }
      };
      // Read data from a cell and store into the data object
      var cellProcess = function (cell) {
        if (colIdx === undefined || colIdx === i) {
          col = columns[i];
          contents = $.trim(cell.innerHTML);
          if (col && col._bAttrSrc) {
            var setter = _fnSetObjectDataFn(col.mData._);
            setter(d, contents);
            attr(col.mData.sort, cell);
            attr(col.mData.type, cell);
            attr(col.mData.filter, cell);
          } else {
            // Depending on the `data` option for the columns the data can
            // be read to either an object or an array.
            if (objectRead) {
              if (!col._setter) {
                // Cache the setter function
                col._setter = _fnSetObjectDataFn(col.mData);
              }
              col._setter(d, contents);
            } else {
              d[i] = contents;
            }
          }
        }
        i++;
      };
      if (td) {
        // `tr` element was passed in
        while (td) {
          name = td.nodeName.toUpperCase();
          if (name == 'TD' || name == 'TH') {
            cellProcess(td);
            tds.push(td);
          }
          td = td.nextSibling;
        }
      } else {
        // Existing row object passed in
        tds = row.anCells;
        for (var j = 0, jen = tds.length; j < jen; j++) {
          cellProcess(tds[j]);
        }
      }
      return {
        data: d,
        cells: tds
      };
    }
    /**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
    function _fnCreateTr(oSettings, iRow, nTrIn, anTds) {
      var row = oSettings.aoData[iRow], rowData = row._aData, cells = [], nTr, nTd, oCol, i, iLen;
      if (row.nTr === null) {
        nTr = nTrIn || document.createElement('tr');
        row.nTr = nTr;
        row.anCells = cells;
        /* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
        nTr._DT_RowIndex = iRow;
        /* Special parameters can be given by the data source to be used on the row */
        _fnRowAttributes(row);
        /* Process each column */
        for (i = 0, iLen = oSettings.aoColumns.length; i < iLen; i++) {
          oCol = oSettings.aoColumns[i];
          nTd = nTrIn ? anTds[i] : document.createElement(oCol.sCellType);
          cells.push(nTd);
          // Need to create the HTML if new, or if a rendering function is defined
          if (!nTrIn || oCol.mRender || oCol.mData !== i) {
            nTd.innerHTML = _fnGetCellData(oSettings, iRow, i, 'display');
          }
          /* Add user defined class */
          if (oCol.sClass) {
            nTd.className += ' ' + oCol.sClass;
          }
          // Visibility - add or remove as required
          if (oCol.bVisible && !nTrIn) {
            nTr.appendChild(nTd);
          } else if (!oCol.bVisible && nTrIn) {
            nTd.parentNode.removeChild(nTd);
          }
          if (oCol.fnCreatedCell) {
            oCol.fnCreatedCell.call(oSettings.oInstance, nTd, _fnGetCellData(oSettings, iRow, i), rowData, iRow, i);
          }
        }
        _fnCallbackFire(oSettings, 'aoRowCreatedCallback', null, [
          nTr,
          rowData,
          iRow
        ]);
      }
      // Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
      // and deployed
      row.nTr.setAttribute('role', 'row');
    }
    /**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
    function _fnRowAttributes(row) {
      var tr = row.nTr;
      var data = row._aData;
      if (tr) {
        if (data.DT_RowId) {
          tr.id = data.DT_RowId;
        }
        if (data.DT_RowClass) {
          // Remove any classes added by DT_RowClass before
          var a = data.DT_RowClass.split(' ');
          row.__rowc = row.__rowc ? _unique(row.__rowc.concat(a)) : a;
          $(tr).removeClass(row.__rowc.join(' ')).addClass(data.DT_RowClass);
        }
        if (data.DT_RowAttr) {
          $(tr).attr(data.DT_RowAttr);
        }
        if (data.DT_RowData) {
          $(tr).data(data.DT_RowData);
        }
      }
    }
    /**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnBuildHead(oSettings) {
      var i, ien, cell, row, column;
      var thead = oSettings.nTHead;
      var tfoot = oSettings.nTFoot;
      var createHeader = $('th, td', thead).length === 0;
      var classes = oSettings.oClasses;
      var columns = oSettings.aoColumns;
      if (createHeader) {
        row = $('<tr/>').appendTo(thead);
      }
      for (i = 0, ien = columns.length; i < ien; i++) {
        column = columns[i];
        cell = $(column.nTh).addClass(column.sClass);
        if (createHeader) {
          cell.appendTo(row);
        }
        // 1.11 move into sorting
        if (oSettings.oFeatures.bSort) {
          cell.addClass(column.sSortingClass);
          if (column.bSortable !== false) {
            cell.attr('tabindex', oSettings.iTabIndex).attr('aria-controls', oSettings.sTableId);
            _fnSortAttachListener(oSettings, column.nTh, i);
          }
        }
        if (column.sTitle != cell.html()) {
          cell.html(column.sTitle);
        }
        _fnRenderer(oSettings, 'header')(oSettings, cell, column, classes);
      }
      if (createHeader) {
        _fnDetectHeader(oSettings.aoHeader, thead);
      }
      /* ARIA role for the rows */
      $(thead).find('>tr').attr('role', 'row');
      /* Deal with the footer - add classes if required */
      $(thead).find('>tr>th, >tr>td').addClass(classes.sHeaderTH);
      $(tfoot).find('>tr>th, >tr>td').addClass(classes.sFooterTH);
      // Cache the footer cells. Note that we only take the cells from the first
      // row in the footer. If there is more than one row the user wants to
      // interact with, they need to use the table().foot() method. Note also this
      // allows cells to be used for multiple columns using colspan
      if (tfoot !== null) {
        var cells = oSettings.aoFooter[0];
        for (i = 0, ien = cells.length; i < ien; i++) {
          column = columns[i];
          column.nTf = cells[i].cell;
          if (column.sClass) {
            $(column.nTf).addClass(column.sClass);
          }
        }
      }
    }
    /**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
    function _fnDrawHead(oSettings, aoSource, bIncludeHidden) {
      var i, iLen, j, jLen, k, kLen, n, nLocalTr;
      var aoLocal = [];
      var aApplied = [];
      var iColumns = oSettings.aoColumns.length;
      var iRowspan, iColspan;
      if (!aoSource) {
        return;
      }
      if (bIncludeHidden === undefined) {
        bIncludeHidden = false;
      }
      /* Make a copy of the master layout array, but without the visible columns in it */
      for (i = 0, iLen = aoSource.length; i < iLen; i++) {
        aoLocal[i] = aoSource[i].slice();
        aoLocal[i].nTr = aoSource[i].nTr;
        /* Remove any columns which are currently hidden */
        for (j = iColumns - 1; j >= 0; j--) {
          if (!oSettings.aoColumns[j].bVisible && !bIncludeHidden) {
            aoLocal[i].splice(j, 1);
          }
        }
        /* Prep the applied array - it needs an element for each row */
        aApplied.push([]);
      }
      for (i = 0, iLen = aoLocal.length; i < iLen; i++) {
        nLocalTr = aoLocal[i].nTr;
        /* All cells are going to be replaced, so empty out the row */
        if (nLocalTr) {
          while (n = nLocalTr.firstChild) {
            nLocalTr.removeChild(n);
          }
        }
        for (j = 0, jLen = aoLocal[i].length; j < jLen; j++) {
          iRowspan = 1;
          iColspan = 1;
          /* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
          if (aApplied[i][j] === undefined) {
            nLocalTr.appendChild(aoLocal[i][j].cell);
            aApplied[i][j] = 1;
            /* Expand the cell to cover as many rows as needed */
            while (aoLocal[i + iRowspan] !== undefined && aoLocal[i][j].cell == aoLocal[i + iRowspan][j].cell) {
              aApplied[i + iRowspan][j] = 1;
              iRowspan++;
            }
            /* Expand the cell to cover as many columns as needed */
            while (aoLocal[i][j + iColspan] !== undefined && aoLocal[i][j].cell == aoLocal[i][j + iColspan].cell) {
              /* Must update the applied array over the rows for the columns */
              for (k = 0; k < iRowspan; k++) {
                aApplied[i + k][j + iColspan] = 1;
              }
              iColspan++;
            }
            /* Do the actual expansion in the DOM */
            $(aoLocal[i][j].cell).attr('rowspan', iRowspan).attr('colspan', iColspan);
          }
        }
      }
    }
    /**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnDraw(oSettings) {
      /* Provide a pre-callback function which can be used to cancel the draw is false is returned */
      var aPreDraw = _fnCallbackFire(oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings]);
      if ($.inArray(false, aPreDraw) !== -1) {
        _fnProcessingDisplay(oSettings, false);
        return;
      }
      var i, iLen, n;
      var anRows = [];
      var iRowCount = 0;
      var asStripeClasses = oSettings.asStripeClasses;
      var iStripes = asStripeClasses.length;
      var iOpenRows = oSettings.aoOpenRows.length;
      var oLang = oSettings.oLanguage;
      var iInitDisplayStart = oSettings.iInitDisplayStart;
      var bServerSide = _fnDataSource(oSettings) == 'ssp';
      var aiDisplay = oSettings.aiDisplay;
      oSettings.bDrawing = true;
      /* Check and see if we have an initial draw position from state saving */
      if (iInitDisplayStart !== undefined && iInitDisplayStart !== -1) {
        oSettings._iDisplayStart = bServerSide ? iInitDisplayStart : iInitDisplayStart >= oSettings.fnRecordsDisplay() ? 0 : iInitDisplayStart;
        oSettings.iInitDisplayStart = -1;
      }
      var iDisplayStart = oSettings._iDisplayStart;
      var iDisplayEnd = oSettings.fnDisplayEnd();
      /* Server-side processing draw intercept */
      if (oSettings.bDeferLoading) {
        oSettings.bDeferLoading = false;
        oSettings.iDraw++;
        _fnProcessingDisplay(oSettings, false);
      } else if (!bServerSide) {
        oSettings.iDraw++;
      } else if (!oSettings.bDestroying && !_fnAjaxUpdate(oSettings)) {
        return;
      }
      if (aiDisplay.length !== 0) {
        var iStart = bServerSide ? 0 : iDisplayStart;
        var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;
        for (var j = iStart; j < iEnd; j++) {
          var iDataIndex = aiDisplay[j];
          var aoData = oSettings.aoData[iDataIndex];
          if (aoData.nTr === null) {
            _fnCreateTr(oSettings, iDataIndex);
          }
          var nRow = aoData.nTr;
          /* Remove the old striping classes and then add the new one */
          if (iStripes !== 0) {
            var sStripe = asStripeClasses[iRowCount % iStripes];
            if (aoData._sRowStripe != sStripe) {
              $(nRow).removeClass(aoData._sRowStripe).addClass(sStripe);
              aoData._sRowStripe = sStripe;
            }
          }
          // Row callback functions - might want to manipulate the row
          // iRowCount and j are not currently documented. Are they at all
          // useful?
          _fnCallbackFire(oSettings, 'aoRowCallback', null, [
            nRow,
            aoData._aData,
            iRowCount,
            j
          ]);
          anRows.push(nRow);
          iRowCount++;
        }
      } else {
        /* Table is empty - create a row with an empty message in it */
        var sZero = oLang.sZeroRecords;
        if (oSettings.iDraw == 1 && _fnDataSource(oSettings) == 'ajax') {
          sZero = oLang.sLoadingRecords;
        } else if (oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0) {
          sZero = oLang.sEmptyTable;
        }
        anRows[0] = $('<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' }).append($('<td />', {
          'valign': 'top',
          'colSpan': _fnVisbleColumns(oSettings),
          'class': oSettings.oClasses.sRowEmpty
        }).html(sZero))[0];
      }
      /* Header and footer callbacks */
      _fnCallbackFire(oSettings, 'aoHeaderCallback', 'header', [
        $(oSettings.nTHead).children('tr')[0],
        _fnGetDataMaster(oSettings),
        iDisplayStart,
        iDisplayEnd,
        aiDisplay
      ]);
      _fnCallbackFire(oSettings, 'aoFooterCallback', 'footer', [
        $(oSettings.nTFoot).children('tr')[0],
        _fnGetDataMaster(oSettings),
        iDisplayStart,
        iDisplayEnd,
        aiDisplay
      ]);
      var body = $(oSettings.nTBody);
      body.children().detach();
      body.append($(anRows));
      /* Call all required callback functions for the end of a draw */
      _fnCallbackFire(oSettings, 'aoDrawCallback', 'draw', [oSettings]);
      /* Draw is complete, sorting and filtering must be as well */
      oSettings.bSorted = false;
      oSettings.bFiltered = false;
      oSettings.bDrawing = false;
    }
    /**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
    function _fnReDraw(settings, holdPosition) {
      var features = settings.oFeatures, sort = features.bSort, filter = features.bFilter;
      if (sort) {
        _fnSort(settings);
      }
      if (filter) {
        _fnFilterComplete(settings, settings.oPreviousSearch);
      } else {
        // No filtering, so we want to just use the display master
        settings.aiDisplay = settings.aiDisplayMaster.slice();
      }
      if (holdPosition !== true) {
        settings._iDisplayStart = 0;
      }
      // Let any modules know about the draw hold position state (used by
      // scrolling internally)
      settings._drawHold = holdPosition;
      _fnDraw(settings);
      settings._drawHold = false;
    }
    /**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnAddOptionsHtml(oSettings) {
      var classes = oSettings.oClasses;
      var table = $(oSettings.nTable);
      var holding = $('<div/>').insertBefore(table);
      // Holding element for speed
      var features = oSettings.oFeatures;
      // All DataTables are wrapped in a div
      var insert = $('<div/>', {
          id: oSettings.sTableId + '_wrapper',
          'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' ' + classes.sNoFooter)
        });
      oSettings.nHolding = holding[0];
      oSettings.nTableWrapper = insert[0];
      oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;
      /* Loop over the user set positioning and place the elements as needed */
      var aDom = oSettings.sDom.split('');
      var featureNode, cOption, nNewNode, cNext, sAttr, j;
      for (var i = 0; i < aDom.length; i++) {
        featureNode = null;
        cOption = aDom[i];
        if (cOption == '<') {
          /* New container div */
          nNewNode = $('<div/>')[0];
          /* Check to see if we should append an id and/or a class name to the container */
          cNext = aDom[i + 1];
          if (cNext == '\'' || cNext == '"') {
            sAttr = '';
            j = 2;
            while (aDom[i + j] != cNext) {
              sAttr += aDom[i + j];
              j++;
            }
            /* Replace jQuery UI constants @todo depreciated */
            if (sAttr == 'H') {
              sAttr = classes.sJUIHeader;
            } else if (sAttr == 'F') {
              sAttr = classes.sJUIFooter;
            }
            /* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
            if (sAttr.indexOf('.') != -1) {
              var aSplit = sAttr.split('.');
              nNewNode.id = aSplit[0].substr(1, aSplit[0].length - 1);
              nNewNode.className = aSplit[1];
            } else if (sAttr.charAt(0) == '#') {
              nNewNode.id = sAttr.substr(1, sAttr.length - 1);
            } else {
              nNewNode.className = sAttr;
            }
            i += j;  /* Move along the position array */
          }
          insert.append(nNewNode);
          insert = $(nNewNode);
        } else if (cOption == '>') {
          /* End container div */
          insert = insert.parent();
        }  // @todo Move options into their own plugins?
        else if (cOption == 'l' && features.bPaginate && features.bLengthChange) {
          /* Length */
          featureNode = _fnFeatureHtmlLength(oSettings);
        } else if (cOption == 'f' && features.bFilter) {
          /* Filter */
          featureNode = _fnFeatureHtmlFilter(oSettings);
        } else if (cOption == 'r' && features.bProcessing) {
          /* pRocessing */
          featureNode = _fnFeatureHtmlProcessing(oSettings);
        } else if (cOption == 't') {
          /* Table */
          featureNode = _fnFeatureHtmlTable(oSettings);
        } else if (cOption == 'i' && features.bInfo) {
          /* Info */
          featureNode = _fnFeatureHtmlInfo(oSettings);
        } else if (cOption == 'p' && features.bPaginate) {
          /* Pagination */
          featureNode = _fnFeatureHtmlPaginate(oSettings);
        } else if (DataTable.ext.feature.length !== 0) {
          /* Plug-in features */
          var aoFeatures = DataTable.ext.feature;
          for (var k = 0, kLen = aoFeatures.length; k < kLen; k++) {
            if (cOption == aoFeatures[k].cFeature) {
              featureNode = aoFeatures[k].fnInit(oSettings);
              break;
            }
          }
        }
        /* Add to the 2D features array */
        if (featureNode) {
          var aanFeatures = oSettings.aanFeatures;
          if (!aanFeatures[cOption]) {
            aanFeatures[cOption] = [];
          }
          aanFeatures[cOption].push(featureNode);
          insert.append(featureNode);
        }
      }
      /* Built our DOM structure - replace the holding div with what we want */
      holding.replaceWith(insert);
    }
    /**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
    function _fnDetectHeader(aLayout, nThead) {
      var nTrs = $(nThead).children('tr');
      var nTr, nCell;
      var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
      var bUnique;
      var fnShiftCol = function (a, i, j) {
        var k = a[i];
        while (k[j]) {
          j++;
        }
        return j;
      };
      aLayout.splice(0, aLayout.length);
      /* We know how many rows there are in the layout - so prep it */
      for (i = 0, iLen = nTrs.length; i < iLen; i++) {
        aLayout.push([]);
      }
      /* Calculate a layout array */
      for (i = 0, iLen = nTrs.length; i < iLen; i++) {
        nTr = nTrs[i];
        iColumn = 0;
        /* For every cell in the row... */
        nCell = nTr.firstChild;
        while (nCell) {
          if (nCell.nodeName.toUpperCase() == 'TD' || nCell.nodeName.toUpperCase() == 'TH') {
            /* Get the col and rowspan attributes from the DOM and sanitise them */
            iColspan = nCell.getAttribute('colspan') * 1;
            iRowspan = nCell.getAttribute('rowspan') * 1;
            iColspan = !iColspan || iColspan === 0 || iColspan === 1 ? 1 : iColspan;
            iRowspan = !iRowspan || iRowspan === 0 || iRowspan === 1 ? 1 : iRowspan;
            /* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
            iColShifted = fnShiftCol(aLayout, i, iColumn);
            /* Cache calculation for unique columns */
            bUnique = iColspan === 1 ? true : false;
            /* If there is col / rowspan, copy the information into the layout grid */
            for (l = 0; l < iColspan; l++) {
              for (k = 0; k < iRowspan; k++) {
                aLayout[i + k][iColShifted + l] = {
                  'cell': nCell,
                  'unique': bUnique
                };
                aLayout[i + k].nTr = nTr;
              }
            }
          }
          nCell = nCell.nextSibling;
        }
      }
    }
    /**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
    function _fnGetUniqueThs(oSettings, nHeader, aLayout) {
      var aReturn = [];
      if (!aLayout) {
        aLayout = oSettings.aoHeader;
        if (nHeader) {
          aLayout = [];
          _fnDetectHeader(aLayout, nHeader);
        }
      }
      for (var i = 0, iLen = aLayout.length; i < iLen; i++) {
        for (var j = 0, jLen = aLayout[i].length; j < jLen; j++) {
          if (aLayout[i][j].unique && (!aReturn[j] || !oSettings.bSortCellsTop)) {
            aReturn[j] = aLayout[i][j].cell;
          }
        }
      }
      return aReturn;
    }
    /**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
    function _fnBuildAjax(oSettings, data, fn) {
      // Compatibility with 1.9-, allow fnServerData and event to manipulate
      _fnCallbackFire(oSettings, 'aoServerParams', 'serverParams', [data]);
      // Convert to object based for 1.10+ if using the old array scheme which can
      // come from server-side processing or serverParams
      if (data && $.isArray(data)) {
        var tmp = {};
        var rbracket = /(.*?)\[\]$/;
        $.each(data, function (key, val) {
          var match = val.name.match(rbracket);
          if (match) {
            // Support for arrays
            var name = match[0];
            if (!tmp[name]) {
              tmp[name] = [];
            }
            tmp[name].push(val.value);
          } else {
            tmp[val.name] = val.value;
          }
        });
        data = tmp;
      }
      var ajaxData;
      var ajax = oSettings.ajax;
      var instance = oSettings.oInstance;
      var callback = function (json) {
        _fnCallbackFire(oSettings, null, 'xhr', [
          oSettings,
          json,
          oSettings.jqXHR
        ]);
        fn(json);
      };
      if ($.isPlainObject(ajax) && ajax.data) {
        ajaxData = ajax.data;
        var newData = $.isFunction(ajaxData) ? ajaxData(data, oSettings) : ajaxData;
        // an object object or array to merge
        // If the function returned something, use that alone
        data = $.isFunction(ajaxData) && newData ? newData : $.extend(true, data, newData);
        // Remove the data property as we've resolved it already and don't want
        // jQuery to do it again (it is restored at the end of the function)
        delete ajax.data;
      }
      var baseAjax = {
          'data': data,
          'success': function (json) {
            var error = json.error || json.sError;
            if (error) {
              _fnLog(oSettings, 0, error);
            }
            oSettings.json = json;
            callback(json);
          },
          'dataType': 'json',
          'cache': false,
          'type': oSettings.sServerMethod,
          'error': function (xhr, error, thrown) {
            var ret = _fnCallbackFire(oSettings, null, 'xhr', [
                oSettings,
                null,
                oSettings.jqXHR
              ]);
            if ($.inArray(true, ret) === -1) {
              if (error == 'parsererror') {
                _fnLog(oSettings, 0, 'Invalid JSON response', 1);
              } else if (xhr.readyState === 4) {
                _fnLog(oSettings, 0, 'Ajax error', 7);
              }
            }
            _fnProcessingDisplay(oSettings, false);
          }
        };
      // Store the data submitted for the API
      oSettings.oAjaxData = data;
      // Allow plug-ins and external processes to modify the data
      _fnCallbackFire(oSettings, null, 'preXhr', [
        oSettings,
        data
      ]);
      if (oSettings.fnServerData) {
        // DataTables 1.9- compatibility
        oSettings.fnServerData.call(instance, oSettings.sAjaxSource, $.map(data, function (val, key) {
          // Need to convert back to 1.9 trad format
          return {
            name: key,
            value: val
          };
        }), callback, oSettings);
      } else if (oSettings.sAjaxSource || typeof ajax === 'string') {
        // DataTables 1.9- compatibility
        oSettings.jqXHR = $.ajax($.extend(baseAjax, { url: ajax || oSettings.sAjaxSource }));
      } else if ($.isFunction(ajax)) {
        // Is a function - let the caller define what needs to be done
        oSettings.jqXHR = ajax.call(instance, data, callback, oSettings);
      } else {
        // Object to extend the base settings
        oSettings.jqXHR = $.ajax($.extend(baseAjax, ajax));
        // Restore for next time around
        ajax.data = ajaxData;
      }
    }
    /**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
    function _fnAjaxUpdate(settings) {
      if (settings.bAjaxDataGet) {
        settings.iDraw++;
        _fnProcessingDisplay(settings, true);
        _fnBuildAjax(settings, _fnAjaxParameters(settings), function (json) {
          _fnAjaxUpdateDraw(settings, json);
        });
        return false;
      }
      return true;
    }
    /**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
    function _fnAjaxParameters(settings) {
      var columns = settings.aoColumns, columnCount = columns.length, features = settings.oFeatures, preSearch = settings.oPreviousSearch, preColSearch = settings.aoPreSearchCols, i, data = [], dataProp, column, columnSearch, sort = _fnSortFlatten(settings), displayStart = settings._iDisplayStart, displayLength = features.bPaginate !== false ? settings._iDisplayLength : -1;
      var param = function (name, value) {
        data.push({
          'name': name,
          'value': value
        });
      };
      // DataTables 1.9- compatible method
      param('sEcho', settings.iDraw);
      param('iColumns', columnCount);
      param('sColumns', _pluck(columns, 'sName').join(','));
      param('iDisplayStart', displayStart);
      param('iDisplayLength', displayLength);
      // DataTables 1.10+ method
      var d = {
          draw: settings.iDraw,
          columns: [],
          order: [],
          start: displayStart,
          length: displayLength,
          search: {
            value: preSearch.sSearch,
            regex: preSearch.bRegex
          }
        };
      for (i = 0; i < columnCount; i++) {
        column = columns[i];
        columnSearch = preColSearch[i];
        dataProp = typeof column.mData == 'function' ? 'function' : column.mData;
        d.columns.push({
          data: dataProp,
          name: column.sName,
          searchable: column.bSearchable,
          orderable: column.bSortable,
          search: {
            value: columnSearch.sSearch,
            regex: columnSearch.bRegex
          }
        });
        param('mDataProp_' + i, dataProp);
        if (features.bFilter) {
          param('sSearch_' + i, columnSearch.sSearch);
          param('bRegex_' + i, columnSearch.bRegex);
          param('bSearchable_' + i, column.bSearchable);
        }
        if (features.bSort) {
          param('bSortable_' + i, column.bSortable);
        }
      }
      if (features.bFilter) {
        param('sSearch', preSearch.sSearch);
        param('bRegex', preSearch.bRegex);
      }
      if (features.bSort) {
        $.each(sort, function (i, val) {
          d.order.push({
            column: val.col,
            dir: val.dir
          });
          param('iSortCol_' + i, val.col);
          param('sSortDir_' + i, val.dir);
        });
        param('iSortingCols', sort.length);
      }
      // If the legacy.ajax parameter is null, then we automatically decide which
      // form to use, based on sAjaxSource
      var legacy = DataTable.ext.legacy.ajax;
      if (legacy === null) {
        return settings.sAjaxSource ? data : d;
      }
      // Otherwise, if legacy has been specified then we use that to decide on the
      // form
      return legacy ? data : d;
    }
    /**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
    function _fnAjaxUpdateDraw(settings, json) {
      // v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
      // Support both
      var compat = function (old, modern) {
        return json[old] !== undefined ? json[old] : json[modern];
      };
      var data = _fnAjaxDataSrc(settings, json);
      var draw = compat('sEcho', 'draw');
      var recordsTotal = compat('iTotalRecords', 'recordsTotal');
      var recordsFiltered = compat('iTotalDisplayRecords', 'recordsFiltered');
      if (draw) {
        // Protect against out of sequence returns
        if (draw * 1 < settings.iDraw) {
          return;
        }
        settings.iDraw = draw * 1;
      }
      _fnClearTable(settings);
      settings._iRecordsTotal = parseInt(recordsTotal, 10);
      settings._iRecordsDisplay = parseInt(recordsFiltered, 10);
      for (var i = 0, ien = data.length; i < ien; i++) {
        _fnAddData(settings, data[i]);
      }
      settings.aiDisplay = settings.aiDisplayMaster.slice();
      settings.bAjaxDataGet = false;
      _fnDraw(settings);
      if (!settings._bInitComplete) {
        _fnInitComplete(settings, json);
      }
      settings.bAjaxDataGet = true;
      _fnProcessingDisplay(settings, false);
    }
    /**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
    function _fnAjaxDataSrc(oSettings, json) {
      var dataSrc = $.isPlainObject(oSettings.ajax) && oSettings.ajax.dataSrc !== undefined ? oSettings.ajax.dataSrc : oSettings.sAjaxDataProp;
      // Compatibility with 1.9-.
      // Compatibility with 1.9-. In order to read from aaData, check if the
      // default has been changed, if not, check for aaData
      if (dataSrc === 'data') {
        return json.aaData || json[dataSrc];
      }
      return dataSrc !== '' ? _fnGetObjectDataFn(dataSrc)(json) : json;
    }
    /**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnFeatureHtmlFilter(settings) {
      var classes = settings.oClasses;
      var tableId = settings.sTableId;
      var language = settings.oLanguage;
      var previousSearch = settings.oPreviousSearch;
      var features = settings.aanFeatures;
      var input = '<input type="search" class="' + classes.sFilterInput + '"/>';
      var str = language.sSearch;
      str = str.match(/_INPUT_/) ? str.replace('_INPUT_', input) : str + input;
      var filter = $('<div/>', {
          'id': !features.f ? tableId + '_filter' : null,
          'class': classes.sFilter
        }).append($('<label/>').append(str));
      var searchFn = function () {
        /* Update all other filter input elements for the new display */
        var n = features.f;
        var val = !this.value ? '' : this.value;
        // mental IE8 fix :-(
        /* Now do the filter */
        if (val != previousSearch.sSearch) {
          _fnFilterComplete(settings, {
            'sSearch': val,
            'bRegex': previousSearch.bRegex,
            'bSmart': previousSearch.bSmart,
            'bCaseInsensitive': previousSearch.bCaseInsensitive
          });
          // Need to redraw, without resorting
          settings._iDisplayStart = 0;
          _fnDraw(settings);
        }
      };
      var searchDelay = settings.searchDelay !== null ? settings.searchDelay : _fnDataSource(settings) === 'ssp' ? 400 : 0;
      var jqFilter = $('input', filter).val(previousSearch.sSearch).attr('placeholder', language.sSearchPlaceholder).bind('keyup.DT search.DT input.DT paste.DT cut.DT', searchDelay ? _fnThrottle(searchFn, searchDelay) : searchFn).bind('keypress.DT', function (e) {
          /* Prevent form submission */
          if (e.keyCode == 13) {
            return false;
          }
        }).attr('aria-controls', tableId);
      // Update the input elements whenever the table is filtered
      $(settings.nTable).on('search.dt.DT', function (ev, s) {
        if (settings === s) {
          // IE9 throws an 'unknown error' if document.activeElement is used
          // inside an iframe or frame...
          try {
            if (jqFilter[0] !== document.activeElement) {
              jqFilter.val(previousSearch.sSearch);
            }
          } catch (e) {
          }
        }
      });
      return filter[0];
    }
    /**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
    function _fnFilterComplete(oSettings, oInput, iForce) {
      var oPrevSearch = oSettings.oPreviousSearch;
      var aoPrevSearch = oSettings.aoPreSearchCols;
      var fnSaveFilter = function (oFilter) {
        /* Save the filtering values */
        oPrevSearch.sSearch = oFilter.sSearch;
        oPrevSearch.bRegex = oFilter.bRegex;
        oPrevSearch.bSmart = oFilter.bSmart;
        oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
      };
      var fnRegex = function (o) {
        // Backwards compatibility with the bEscapeRegex option
        return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
      };
      // Resolve any column types that are unknown due to addition or invalidation
      // @todo As per sort - can this be moved into an event handler?
      _fnColumnTypes(oSettings);
      /* In server-side processing all filtering is done by the server, so no point hanging around here */
      if (_fnDataSource(oSettings) != 'ssp') {
        /* Global filter */
        _fnFilter(oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive);
        fnSaveFilter(oInput);
        /* Now do the individual column filter */
        for (var i = 0; i < aoPrevSearch.length; i++) {
          _fnFilterColumn(oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]), aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive);
        }
        /* Custom filtering */
        _fnFilterCustom(oSettings);
      } else {
        fnSaveFilter(oInput);
      }
      /* Tell the draw function we have been filtering */
      oSettings.bFiltered = true;
      _fnCallbackFire(oSettings, null, 'search', [oSettings]);
    }
    /**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnFilterCustom(settings) {
      var filters = DataTable.ext.search;
      var displayRows = settings.aiDisplay;
      var row, rowIdx;
      for (var i = 0, ien = filters.length; i < ien; i++) {
        var rows = [];
        // Loop over each row and see if it should be included
        for (var j = 0, jen = displayRows.length; j < jen; j++) {
          rowIdx = displayRows[j];
          row = settings.aoData[rowIdx];
          if (filters[i](settings, row._aFilterData, rowIdx, row._aData, j)) {
            rows.push(rowIdx);
          }
        }
        // So the array reference doesn't break set the results into the
        // existing array
        displayRows.length = 0;
        displayRows.push.apply(displayRows, rows);
      }
    }
    /**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
    function _fnFilterColumn(settings, searchStr, colIdx, regex, smart, caseInsensitive) {
      if (searchStr === '') {
        return;
      }
      var data;
      var display = settings.aiDisplay;
      var rpSearch = _fnFilterCreateSearch(searchStr, regex, smart, caseInsensitive);
      for (var i = display.length - 1; i >= 0; i--) {
        data = settings.aoData[display[i]]._aFilterData[colIdx];
        if (!rpSearch.test(data)) {
          display.splice(i, 1);
        }
      }
    }
    /**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
    function _fnFilter(settings, input, force, regex, smart, caseInsensitive) {
      var rpSearch = _fnFilterCreateSearch(input, regex, smart, caseInsensitive);
      var prevSearch = settings.oPreviousSearch.sSearch;
      var displayMaster = settings.aiDisplayMaster;
      var display, invalidated, i;
      // Need to take account of custom filtering functions - always filter
      if (DataTable.ext.search.length !== 0) {
        force = true;
      }
      // Check if any of the rows were invalidated
      invalidated = _fnFilterData(settings);
      // If the input is blank - we just want the full data set
      if (input.length <= 0) {
        settings.aiDisplay = displayMaster.slice();
      } else {
        // New search - start from the master array
        if (invalidated || force || prevSearch.length > input.length || input.indexOf(prevSearch) !== 0 || settings.bSorted) {
          settings.aiDisplay = displayMaster.slice();
        }
        // Search the display array
        display = settings.aiDisplay;
        for (i = display.length - 1; i >= 0; i--) {
          if (!rpSearch.test(settings.aoData[display[i]]._sFilterRow)) {
            display.splice(i, 1);
          }
        }
      }
    }
    /**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
    function _fnFilterCreateSearch(search, regex, smart, caseInsensitive) {
      search = regex ? search : _fnEscapeRegex(search);
      if (smart) {
        /* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 *
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
        var a = $.map(search.match(/"[^"]+"|[^ ]+/g) || [''], function (word) {
            if (word.charAt(0) === '"') {
              var m = word.match(/^"(.*)"$/);
              word = m ? m[1] : word;
            }
            return word.replace('"', '');
          });
        search = '^(?=.*?' + a.join(')(?=.*?') + ').*$';
      }
      return new RegExp(search, caseInsensitive ? 'i' : '');
    }
    /**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
    function _fnEscapeRegex(sVal) {
      return sVal.replace(_re_escape_regex, '\\$1');
    }
    var __filter_div = $('<div>')[0];
    var __filter_div_textContent = __filter_div.textContent !== undefined;
    // Update the filtering data for each row if needed (by invalidation or first run)
    function _fnFilterData(settings) {
      var columns = settings.aoColumns;
      var column;
      var i, j, ien, jen, filterData, cellData, row;
      var fomatters = DataTable.ext.type.search;
      var wasInvalidated = false;
      for (i = 0, ien = settings.aoData.length; i < ien; i++) {
        row = settings.aoData[i];
        if (!row._aFilterData) {
          filterData = [];
          for (j = 0, jen = columns.length; j < jen; j++) {
            column = columns[j];
            if (column.bSearchable) {
              cellData = _fnGetCellData(settings, i, j, 'filter');
              if (fomatters[column.sType]) {
                cellData = fomatters[column.sType](cellData);
              }
              // Search in DataTables 1.10 is string based. In 1.11 this
              // should be altered to also allow strict type checking.
              if (cellData === null) {
                cellData = '';
              }
              if (typeof cellData !== 'string' && cellData.toString) {
                cellData = cellData.toString();
              }
            } else {
              cellData = '';
            }
            // If it looks like there is an HTML entity in the string,
            // attempt to decode it so sorting works as expected. Note that
            // we could use a single line of jQuery to do this, but the DOM
            // method used here is much faster http://jsperf.com/html-decode
            if (cellData.indexOf && cellData.indexOf('&') !== -1) {
              __filter_div.innerHTML = cellData;
              cellData = __filter_div_textContent ? __filter_div.textContent : __filter_div.innerText;
            }
            if (cellData.replace) {
              cellData = cellData.replace(/[\r\n]/g, '');
            }
            filterData.push(cellData);
          }
          row._aFilterData = filterData;
          row._sFilterRow = filterData.join('  ');
          wasInvalidated = true;
        }
      }
      return wasInvalidated;
    }
    /**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
    function _fnSearchToCamel(obj) {
      return {
        search: obj.sSearch,
        smart: obj.bSmart,
        regex: obj.bRegex,
        caseInsensitive: obj.bCaseInsensitive
      };
    }
    /**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
    function _fnSearchToHung(obj) {
      return {
        sSearch: obj.search,
        bSmart: obj.smart,
        bRegex: obj.regex,
        bCaseInsensitive: obj.caseInsensitive
      };
    }
    /**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
    function _fnFeatureHtmlInfo(settings) {
      var tid = settings.sTableId, nodes = settings.aanFeatures.i, n = $('<div/>', {
          'class': settings.oClasses.sInfo,
          'id': !nodes ? tid + '_info' : null
        });
      if (!nodes) {
        // Update display on each draw
        settings.aoDrawCallback.push({
          'fn': _fnUpdateInfo,
          'sName': 'information'
        });
        n.attr('role', 'status').attr('aria-live', 'polite');
        // Table is described by our info div
        $(settings.nTable).attr('aria-describedby', tid + '_info');
      }
      return n[0];
    }
    /**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnUpdateInfo(settings) {
      /* Show information about the table */
      var nodes = settings.aanFeatures.i;
      if (nodes.length === 0) {
        return;
      }
      var lang = settings.oLanguage, start = settings._iDisplayStart + 1, end = settings.fnDisplayEnd(), max = settings.fnRecordsTotal(), total = settings.fnRecordsDisplay(), out = total ? lang.sInfo : lang.sInfoEmpty;
      if (total !== max) {
        /* Record set after filtering */
        out += ' ' + lang.sInfoFiltered;
      }
      // Convert the macros
      out += lang.sInfoPostFix;
      out = _fnInfoMacros(settings, out);
      var callback = lang.fnInfoCallback;
      if (callback !== null) {
        out = callback.call(settings.oInstance, settings, start, end, max, total, out);
      }
      $(nodes).html(out);
    }
    function _fnInfoMacros(settings, str) {
      // When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
      // internally
      var formatter = settings.fnFormatNumber, start = settings._iDisplayStart + 1, len = settings._iDisplayLength, vis = settings.fnRecordsDisplay(), all = len === -1;
      return str.replace(/_START_/g, formatter.call(settings, start)).replace(/_END_/g, formatter.call(settings, settings.fnDisplayEnd())).replace(/_MAX_/g, formatter.call(settings, settings.fnRecordsTotal())).replace(/_TOTAL_/g, formatter.call(settings, vis)).replace(/_PAGE_/g, formatter.call(settings, all ? 1 : Math.ceil(start / len))).replace(/_PAGES_/g, formatter.call(settings, all ? 1 : Math.ceil(vis / len)));
    }
    /**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnInitialise(settings) {
      var i, iLen, iAjaxStart = settings.iInitDisplayStart;
      var columns = settings.aoColumns, column;
      var features = settings.oFeatures;
      /* Ensure that the table data is fully initialised */
      if (!settings.bInitialised) {
        setTimeout(function () {
          _fnInitialise(settings);
        }, 200);
        return;
      }
      /* Show the display HTML options */
      _fnAddOptionsHtml(settings);
      /* Build and draw the header / footer for the table */
      _fnBuildHead(settings);
      _fnDrawHead(settings, settings.aoHeader);
      _fnDrawHead(settings, settings.aoFooter);
      /* Okay to show that something is going on now */
      _fnProcessingDisplay(settings, true);
      /* Calculate sizes for columns */
      if (features.bAutoWidth) {
        _fnCalculateColumnWidths(settings);
      }
      for (i = 0, iLen = columns.length; i < iLen; i++) {
        column = columns[i];
        if (column.sWidth) {
          column.nTh.style.width = _fnStringToCss(column.sWidth);
        }
      }
      // If there is default sorting required - let's do it. The sort function
      // will do the drawing for us. Otherwise we draw the table regardless of the
      // Ajax source - this allows the table to look initialised for Ajax sourcing
      // data (show 'loading' message possibly)
      _fnReDraw(settings);
      // Server-side processing init complete is done by _fnAjaxUpdateDraw
      var dataSrc = _fnDataSource(settings);
      if (dataSrc != 'ssp') {
        // if there is an ajax source load the data
        if (dataSrc == 'ajax') {
          _fnBuildAjax(settings, [], function (json) {
            var aData = _fnAjaxDataSrc(settings, json);
            // Got the data - add it to the table
            for (i = 0; i < aData.length; i++) {
              _fnAddData(settings, aData[i]);
            }
            // Reset the init display for cookie saving. We've already done
            // a filter, and therefore cleared it before. So we need to make
            // it appear 'fresh'
            settings.iInitDisplayStart = iAjaxStart;
            _fnReDraw(settings);
            _fnProcessingDisplay(settings, false);
            _fnInitComplete(settings, json);
          }, settings);
        } else {
          _fnProcessingDisplay(settings, false);
          _fnInitComplete(settings);
        }
      }
    }
    /**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
    function _fnInitComplete(settings, json) {
      settings._bInitComplete = true;
      // On an Ajax load we now have data and therefore want to apply the column
      // sizing
      if (json) {
        _fnAdjustColumnSizing(settings);
      }
      _fnCallbackFire(settings, 'aoInitComplete', 'init', [
        settings,
        json
      ]);
    }
    function _fnLengthChange(settings, val) {
      var len = parseInt(val, 10);
      settings._iDisplayLength = len;
      _fnLengthOverflow(settings);
      // Fire length change event
      _fnCallbackFire(settings, null, 'length', [
        settings,
        len
      ]);
    }
    /**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
    function _fnFeatureHtmlLength(settings) {
      var classes = settings.oClasses, tableId = settings.sTableId, menu = settings.aLengthMenu, d2 = $.isArray(menu[0]), lengths = d2 ? menu[0] : menu, language = d2 ? menu[1] : menu;
      var select = $('<select/>', {
          'name': tableId + '_length',
          'aria-controls': tableId,
          'class': classes.sLengthSelect
        });
      for (var i = 0, ien = lengths.length; i < ien; i++) {
        select[0][i] = new Option(language[i], lengths[i]);
      }
      var div = $('<div><label/></div>').addClass(classes.sLength);
      if (!settings.aanFeatures.l) {
        div[0].id = tableId + '_length';
      }
      div.children().append(settings.oLanguage.sLengthMenu.replace('_MENU_', select[0].outerHTML));
      // Can't use `select` variable as user might provide their own and the
      // reference is broken by the use of outerHTML
      $('select', div).val(settings._iDisplayLength).bind('change.DT', function (e) {
        _fnLengthChange(settings, $(this).val());
        _fnDraw(settings);
      });
      // Update node value whenever anything changes the table's length
      $(settings.nTable).bind('length.dt.DT', function (e, s, len) {
        if (settings === s) {
          $('select', div).val(len);
        }
      });
      return div[0];
    }
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */
    /**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
    function _fnFeatureHtmlPaginate(settings) {
      var type = settings.sPaginationType, plugin = DataTable.ext.pager[type], modern = typeof plugin === 'function', redraw = function (settings) {
          _fnDraw(settings);
        }, node = $('<div/>').addClass(settings.oClasses.sPaging + type)[0], features = settings.aanFeatures;
      if (!modern) {
        plugin.fnInit(settings, node, redraw);
      }
      /* Add a draw callback for the pagination on first instance, to update the paging display */
      if (!features.p) {
        node.id = settings.sTableId + '_paginate';
        settings.aoDrawCallback.push({
          'fn': function (settings) {
            if (modern) {
              var start = settings._iDisplayStart, len = settings._iDisplayLength, visRecords = settings.fnRecordsDisplay(), all = len === -1, page = all ? 0 : Math.ceil(start / len), pages = all ? 1 : Math.ceil(visRecords / len), buttons = plugin(page, pages), i, ien;
              for (i = 0, ien = features.p.length; i < ien; i++) {
                _fnRenderer(settings, 'pageButton')(settings, features.p[i], i, buttons, page, pages);
              }
            } else {
              plugin.fnUpdate(settings, redraw);
            }
          },
          'sName': 'pagination'
        });
      }
      return node;
    }
    /**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
    function _fnPageChange(settings, action, redraw) {
      var start = settings._iDisplayStart, len = settings._iDisplayLength, records = settings.fnRecordsDisplay();
      if (records === 0 || len === -1) {
        start = 0;
      } else if (typeof action === 'number') {
        start = action * len;
        if (start > records) {
          start = 0;
        }
      } else if (action == 'first') {
        start = 0;
      } else if (action == 'previous') {
        start = len >= 0 ? start - len : 0;
        if (start < 0) {
          start = 0;
        }
      } else if (action == 'next') {
        if (start + len < records) {
          start += len;
        }
      } else if (action == 'last') {
        start = Math.floor((records - 1) / len) * len;
      } else {
        _fnLog(settings, 0, 'Unknown paging action: ' + action, 5);
      }
      var changed = settings._iDisplayStart !== start;
      settings._iDisplayStart = start;
      if (changed) {
        _fnCallbackFire(settings, null, 'page', [settings]);
        if (redraw) {
          _fnDraw(settings);
        }
      }
      return changed;
    }
    /**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
    function _fnFeatureHtmlProcessing(settings) {
      return $('<div/>', {
        'id': !settings.aanFeatures.r ? settings.sTableId + '_processing' : null,
        'class': settings.oClasses.sProcessing
      }).html(settings.oLanguage.sProcessing).insertBefore(settings.nTable)[0];
    }
    /**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
    function _fnProcessingDisplay(settings, show) {
      if (settings.oFeatures.bProcessing) {
        $(settings.aanFeatures.r).css('display', show ? 'block' : 'none');
      }
      _fnCallbackFire(settings, null, 'processing', [
        settings,
        show
      ]);
    }
    /**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
    function _fnFeatureHtmlTable(settings) {
      var table = $(settings.nTable);
      // Add the ARIA grid role to the table
      table.attr('role', 'grid');
      // Scrolling from here on in
      var scroll = settings.oScroll;
      if (scroll.sX === '' && scroll.sY === '') {
        return settings.nTable;
      }
      var scrollX = scroll.sX;
      var scrollY = scroll.sY;
      var classes = settings.oClasses;
      var caption = table.children('caption');
      var captionSide = caption.length ? caption[0]._captionSide : null;
      var headerClone = $(table[0].cloneNode(false));
      var footerClone = $(table[0].cloneNode(false));
      var footer = table.children('tfoot');
      var _div = '<div/>';
      var size = function (s) {
        return !s ? null : _fnStringToCss(s);
      };
      // This is fairly messy, but with x scrolling enabled, if the table has a
      // width attribute, regardless of any width applied using the column width
      // options, the browser will shrink or grow the table as needed to fit into
      // that 100%. That would make the width options useless. So we remove it.
      // This is okay, under the assumption that width:100% is applied to the
      // table in CSS (it is in the default stylesheet) which will set the table
      // width as appropriate (the attribute and css behave differently...)
      if (scroll.sX && table.attr('width') === '100%') {
        table.removeAttr('width');
      }
      if (!footer.length) {
        footer = null;
      }
      /*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
      var scroller = $(_div, { 'class': classes.sScrollWrapper }).append($(_div, { 'class': classes.sScrollHead }).css({
          overflow: 'hidden',
          position: 'relative',
          border: 0,
          width: scrollX ? size(scrollX) : '100%'
        }).append($(_div, { 'class': classes.sScrollHeadInner }).css({
          'box-sizing': 'content-box',
          width: scroll.sXInner || '100%'
        }).append(headerClone.removeAttr('id').css('margin-left', 0).append(captionSide === 'top' ? caption : null).append(table.children('thead'))))).append($(_div, { 'class': classes.sScrollBody }).css({
          overflow: 'auto',
          height: size(scrollY),
          width: size(scrollX)
        }).append(table));
      if (footer) {
        scroller.append($(_div, { 'class': classes.sScrollFoot }).css({
          overflow: 'hidden',
          border: 0,
          width: scrollX ? size(scrollX) : '100%'
        }).append($(_div, { 'class': classes.sScrollFootInner }).append(footerClone.removeAttr('id').css('margin-left', 0).append(captionSide === 'bottom' ? caption : null).append(table.children('tfoot')))));
      }
      var children = scroller.children();
      var scrollHead = children[0];
      var scrollBody = children[1];
      var scrollFoot = footer ? children[2] : null;
      // When the body is scrolled, then we also want to scroll the headers
      if (scrollX) {
        $(scrollBody).on('scroll.DT', function (e) {
          var scrollLeft = this.scrollLeft;
          scrollHead.scrollLeft = scrollLeft;
          if (footer) {
            scrollFoot.scrollLeft = scrollLeft;
          }
        });
      }
      settings.nScrollHead = scrollHead;
      settings.nScrollBody = scrollBody;
      settings.nScrollFoot = scrollFoot;
      // On redraw - align columns
      settings.aoDrawCallback.push({
        'fn': _fnScrollDraw,
        'sName': 'scrolling'
      });
      return scroller[0];
    }
    /**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnScrollDraw(settings) {
      // Given that this is such a monster function, a lot of variables are use
      // to try and keep the minimised size as small as possible
      var scroll = settings.oScroll, scrollX = scroll.sX, scrollXInner = scroll.sXInner, scrollY = scroll.sY, barWidth = scroll.iBarWidth, divHeader = $(settings.nScrollHead), divHeaderStyle = divHeader[0].style, divHeaderInner = divHeader.children('div'), divHeaderInnerStyle = divHeaderInner[0].style, divHeaderTable = divHeaderInner.children('table'), divBodyEl = settings.nScrollBody, divBody = $(divBodyEl), divBodyStyle = divBodyEl.style, divFooter = $(settings.nScrollFoot), divFooterInner = divFooter.children('div'), divFooterTable = divFooterInner.children('table'), header = $(settings.nTHead), table = $(settings.nTable), tableEl = table[0], tableStyle = tableEl.style, footer = settings.nTFoot ? $(settings.nTFoot) : null, browser = settings.oBrowser, ie67 = browser.bScrollOversize, headerTrgEls, footerTrgEls, headerSrcEls, footerSrcEls, headerCopy, footerCopy, headerWidths = [], footerWidths = [], headerContent = [], idx, correction, sanityWidth, zeroOut = function (nSizer) {
          var style = nSizer.style;
          style.paddingTop = '0';
          style.paddingBottom = '0';
          style.borderTopWidth = '0';
          style.borderBottomWidth = '0';
          style.height = 0;
        };
      /*
		 * 1. Re-create the table inside the scrolling div
		 */
      // Remove the old minimised thead and tfoot elements in the inner table
      table.children('thead, tfoot').remove();
      // Clone the current header and footer elements and then place it into the inner table
      headerCopy = header.clone().prependTo(table);
      headerTrgEls = header.find('tr');
      // original header is in its own table
      headerSrcEls = headerCopy.find('tr');
      headerCopy.find('th, td').removeAttr('tabindex');
      if (footer) {
        footerCopy = footer.clone().prependTo(table);
        footerTrgEls = footer.find('tr');
        // the original tfoot is in its own table and must be sized
        footerSrcEls = footerCopy.find('tr');
      }
      /*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */
      // Remove old sizing and apply the calculated column widths
      // Get the unique column headers in the newly created (cloned) header. We want to apply the
      // calculated sizes to this header
      if (!scrollX) {
        divBodyStyle.width = '100%';
        divHeader[0].style.width = '100%';
      }
      $.each(_fnGetUniqueThs(settings, headerCopy), function (i, el) {
        idx = _fnVisibleToColumnIndex(settings, i);
        el.style.width = settings.aoColumns[idx].sWidth;
      });
      if (footer) {
        _fnApplyToChildren(function (n) {
          n.style.width = '';
        }, footerSrcEls);
      }
      // If scroll collapse is enabled, when we put the headers back into the body for sizing, we
      // will end up forcing the scrollbar to appear, making our measurements wrong for when we
      // then hide it (end of this function), so add the header height to the body scroller.
      if (scroll.bCollapse && scrollY !== '') {
        divBodyStyle.height = divBody[0].offsetHeight + header[0].offsetHeight + 'px';
      }
      // Size the table as a whole
      sanityWidth = table.outerWidth();
      if (scrollX === '') {
        // No x scrolling
        tableStyle.width = '100%';
        // IE7 will make the width of the table when 100% include the scrollbar
        // - which is shouldn't. When there is a scrollbar we need to take this
        // into account.
        if (ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight || divBody.css('overflow-y') == 'scroll')) {
          tableStyle.width = _fnStringToCss(table.outerWidth() - barWidth);
        }
      } else {
        // x scrolling
        if (scrollXInner !== '') {
          // x scroll inner has been given - use it
          tableStyle.width = _fnStringToCss(scrollXInner);
        } else if (sanityWidth == divBody.width() && divBody.height() < table.height()) {
          // There is y-scrolling - try to take account of the y scroll bar
          tableStyle.width = _fnStringToCss(sanityWidth - barWidth);
          if (table.outerWidth() > sanityWidth - barWidth) {
            // Not possible to take account of it
            tableStyle.width = _fnStringToCss(sanityWidth);
          }
        } else {
          // When all else fails
          tableStyle.width = _fnStringToCss(sanityWidth);
        }
      }
      // Recalculate the sanity width - now that we've applied the required width,
      // before it was a temporary variable. This is required because the column
      // width calculation is done before this table DOM is created.
      sanityWidth = table.outerWidth();
      // Hidden header should have zero height, so remove padding and borders. Then
      // set the width based on the real headers
      // Apply all styles in one pass
      _fnApplyToChildren(zeroOut, headerSrcEls);
      // Read all widths in next pass
      _fnApplyToChildren(function (nSizer) {
        headerContent.push(nSizer.innerHTML);
        headerWidths.push(_fnStringToCss($(nSizer).css('width')));
      }, headerSrcEls);
      // Apply all widths in final pass
      _fnApplyToChildren(function (nToSize, i) {
        nToSize.style.width = headerWidths[i];
      }, headerTrgEls);
      $(headerSrcEls).height(0);
      /* Same again with the footer if we have one */
      if (footer) {
        _fnApplyToChildren(zeroOut, footerSrcEls);
        _fnApplyToChildren(function (nSizer) {
          footerWidths.push(_fnStringToCss($(nSizer).css('width')));
        }, footerSrcEls);
        _fnApplyToChildren(function (nToSize, i) {
          nToSize.style.width = footerWidths[i];
        }, footerTrgEls);
        $(footerSrcEls).height(0);
      }
      /*
		 * 3. Apply the measurements
		 */
      // "Hide" the header and footer that we used for the sizing. We need to keep
      // the content of the cell so that the width applied to the header and body
      // both match, but we want to hide it completely. We want to also fix their
      // width to what they currently are
      _fnApplyToChildren(function (nSizer, i) {
        nSizer.innerHTML = '<div class="dataTables_sizing" style="height:0;overflow:hidden;">' + headerContent[i] + '</div>';
        nSizer.style.width = headerWidths[i];
      }, headerSrcEls);
      if (footer) {
        _fnApplyToChildren(function (nSizer, i) {
          nSizer.innerHTML = '';
          nSizer.style.width = footerWidths[i];
        }, footerSrcEls);
      }
      // Sanity check that the table is of a sensible width. If not then we are going to get
      // misalignment - try to prevent this by not allowing the table to shrink below its min width
      if (table.outerWidth() < sanityWidth) {
        // The min width depends upon if we have a vertical scrollbar visible or not */
        correction = divBodyEl.scrollHeight > divBodyEl.offsetHeight || divBody.css('overflow-y') == 'scroll' ? sanityWidth + barWidth : sanityWidth;
        // IE6/7 are a law unto themselves...
        if (ie67 && (divBodyEl.scrollHeight > divBodyEl.offsetHeight || divBody.css('overflow-y') == 'scroll')) {
          tableStyle.width = _fnStringToCss(correction - barWidth);
        }
        // And give the user a warning that we've stopped the table getting too small
        if (scrollX === '' || scrollXInner !== '') {
          _fnLog(settings, 1, 'Possible column misalignment', 6);
        }
      } else {
        correction = '100%';
      }
      // Apply to the container elements
      divBodyStyle.width = _fnStringToCss(correction);
      divHeaderStyle.width = _fnStringToCss(correction);
      if (footer) {
        settings.nScrollFoot.style.width = _fnStringToCss(correction);
      }
      /*
		 * 4. Clean up
		 */
      if (!scrollY) {
        /* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
        if (ie67) {
          divBodyStyle.height = _fnStringToCss(tableEl.offsetHeight + barWidth);
        }
      }
      if (scrollY && scroll.bCollapse) {
        divBodyStyle.height = _fnStringToCss(scrollY);
        var iExtra = scrollX && tableEl.offsetWidth > divBodyEl.offsetWidth ? barWidth : 0;
        if (tableEl.offsetHeight < divBodyEl.offsetHeight) {
          divBodyStyle.height = _fnStringToCss(tableEl.offsetHeight + iExtra);
        }
      }
      /* Finally set the width's of the header and footer tables */
      var iOuterWidth = table.outerWidth();
      divHeaderTable[0].style.width = _fnStringToCss(iOuterWidth);
      divHeaderInnerStyle.width = _fnStringToCss(iOuterWidth);
      // Figure out if there are scrollbar present - if so then we need a the header and footer to
      // provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
      var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == 'scroll';
      var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right');
      divHeaderInnerStyle[padding] = bScrolling ? barWidth + 'px' : '0px';
      if (footer) {
        divFooterTable[0].style.width = _fnStringToCss(iOuterWidth);
        divFooterInner[0].style.width = _fnStringToCss(iOuterWidth);
        divFooterInner[0].style[padding] = bScrolling ? barWidth + 'px' : '0px';
      }
      /* Adjust the position of the header in case we loose the y-scrollbar */
      divBody.scroll();
      // If sorting or filtering has occurred, jump the scrolling back to the top
      // only if we aren't holding the position
      if ((settings.bSorted || settings.bFiltered) && !settings._drawHold) {
        divBodyEl.scrollTop = 0;
      }
    }
    /**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
    function _fnApplyToChildren(fn, an1, an2) {
      var index = 0, i = 0, iLen = an1.length;
      var nNode1, nNode2;
      while (i < iLen) {
        nNode1 = an1[i].firstChild;
        nNode2 = an2 ? an2[i].firstChild : null;
        while (nNode1) {
          if (nNode1.nodeType === 1) {
            if (an2) {
              fn(nNode1, nNode2, index);
            } else {
              fn(nNode1, index);
            }
            index++;
          }
          nNode1 = nNode1.nextSibling;
          nNode2 = an2 ? nNode2.nextSibling : null;
        }
        i++;
      }
    }
    var __re_html_remove = /<.*?>/g;
    /**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnCalculateColumnWidths(oSettings) {
      var table = oSettings.nTable, columns = oSettings.aoColumns, scroll = oSettings.oScroll, scrollY = scroll.sY, scrollX = scroll.sX, scrollXInner = scroll.sXInner, columnCount = columns.length, visibleColumns = _fnGetColumns(oSettings, 'bVisible'), headerCells = $('th', oSettings.nTHead), tableWidthAttr = table.getAttribute('width'),
        // from DOM element
        tableContainer = table.parentNode, userInputs = false, i, column, columnIdx, width, outerWidth;
      var styleWidth = table.style.width;
      if (styleWidth && styleWidth.indexOf('%') !== -1) {
        tableWidthAttr = styleWidth;
      }
      /* Convert any user input sizes into pixel sizes */
      for (i = 0; i < visibleColumns.length; i++) {
        column = columns[visibleColumns[i]];
        if (column.sWidth !== null) {
          column.sWidth = _fnConvertToWidth(column.sWidthOrig, tableContainer);
          userInputs = true;
        }
      }
      /* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
      if (!userInputs && !scrollX && !scrollY && columnCount == _fnVisbleColumns(oSettings) && columnCount == headerCells.length) {
        for (i = 0; i < columnCount; i++) {
          columns[i].sWidth = _fnStringToCss(headerCells.eq(i).width());
        }
      } else {
        // Otherwise construct a single row, worst case, table with the widest
        // node in the data, assign any user defined widths, then insert it into
        // the DOM and allow the browser to do all the hard work of calculating
        // table widths
        var tmpTable = $(table).clone().css('visibility', 'hidden').removeAttr('id');
        // Clean up the table body
        tmpTable.find('tbody tr').remove();
        var tr = $('<tr/>').appendTo(tmpTable.find('tbody'));
        // Remove any assigned widths from the footer (from scrolling)
        tmpTable.find('tfoot th, tfoot td').css('width', '');
        // Apply custom sizing to the cloned header
        headerCells = _fnGetUniqueThs(oSettings, tmpTable.find('thead')[0]);
        for (i = 0; i < visibleColumns.length; i++) {
          column = columns[visibleColumns[i]];
          headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ? _fnStringToCss(column.sWidthOrig) : '';
        }
        // Find the widest cell for each column and put it into the table
        if (oSettings.aoData.length) {
          for (i = 0; i < visibleColumns.length; i++) {
            columnIdx = visibleColumns[i];
            column = columns[columnIdx];
            $(_fnGetWidestNode(oSettings, columnIdx)).clone(false).append(column.sContentPadding).appendTo(tr);
          }
        }
        // Table has been built, attach to the document so we can work with it
        tmpTable.appendTo(tableContainer);
        // When scrolling (X or Y) we want to set the width of the table as
        // appropriate. However, when not scrolling leave the table width as it
        // is. This results in slightly different, but I think correct behaviour
        if (scrollX && scrollXInner) {
          tmpTable.width(scrollXInner);
        } else if (scrollX) {
          tmpTable.css('width', 'auto');
          if (tmpTable.width() < tableContainer.offsetWidth) {
            tmpTable.width(tableContainer.offsetWidth);
          }
        } else if (scrollY) {
          tmpTable.width(tableContainer.offsetWidth);
        } else if (tableWidthAttr) {
          tmpTable.width(tableWidthAttr);
        }
        // Take into account the y scrollbar
        _fnScrollingWidthAdjust(oSettings, tmpTable[0]);
        // Browsers need a bit of a hand when a width is assigned to any columns
        // when x-scrolling as they tend to collapse the table to the min-width,
        // even if we sent the column widths. So we need to keep track of what
        // the table width should be by summing the user given values, and the
        // automatic values
        if (scrollX) {
          var total = 0;
          for (i = 0; i < visibleColumns.length; i++) {
            column = columns[visibleColumns[i]];
            outerWidth = $(headerCells[i]).outerWidth();
            total += column.sWidthOrig === null ? outerWidth : parseInt(column.sWidth, 10) + outerWidth - $(headerCells[i]).width();
          }
          tmpTable.width(_fnStringToCss(total));
          table.style.width = _fnStringToCss(total);
        }
        // Get the width of each column in the constructed table
        for (i = 0; i < visibleColumns.length; i++) {
          column = columns[visibleColumns[i]];
          width = $(headerCells[i]).width();
          if (width) {
            column.sWidth = _fnStringToCss(width);
          }
        }
        table.style.width = _fnStringToCss(tmpTable.css('width'));
        // Finished with the table - ditch it
        tmpTable.remove();
      }
      // If there is a width attr, we want to attach an event listener which
      // allows the table sizing to automatically adjust when the window is
      // resized. Use the width attr rather than CSS, since we can't know if the
      // CSS is a relative value or absolute - DOM read is always px.
      if (tableWidthAttr) {
        table.style.width = _fnStringToCss(tableWidthAttr);
      }
      if ((tableWidthAttr || scrollX) && !oSettings._reszEvt) {
        var bindResize = function () {
          $(window).bind('resize.DT-' + oSettings.sInstance, _fnThrottle(function () {
            _fnAdjustColumnSizing(oSettings);
          }));
        };
        // IE6/7 will crash if we bind a resize event handler on page load.
        // To be removed in 1.11 which drops IE6/7 support
        if (oSettings.oBrowser.bScrollOversize) {
          setTimeout(bindResize, 1000);
        } else {
          bindResize();
        }
        oSettings._reszEvt = true;
      }
    }
    /**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
    function _fnThrottle(fn, freq) {
      var frequency = freq !== undefined ? freq : 200, last, timer;
      return function () {
        var that = this, now = +new Date(), args = arguments;
        if (last && now < last + frequency) {
          clearTimeout(timer);
          timer = setTimeout(function () {
            last = undefined;
            fn.apply(that, args);
          }, frequency);
        } else {
          last = now;
          fn.apply(that, args);
        }
      };
    }
    /**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
    function _fnConvertToWidth(width, parent) {
      if (!width) {
        return 0;
      }
      var n = $('<div/>').css('width', _fnStringToCss(width)).appendTo(parent || document.body);
      var val = n[0].offsetWidth;
      n.remove();
      return val;
    }
    /**
	 * Adjust a table's width to take account of vertical scroll bar
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n table node
	 *  @memberof DataTable#oApi
	 */
    function _fnScrollingWidthAdjust(settings, n) {
      var scroll = settings.oScroll;
      if (scroll.sX || scroll.sY) {
        // When y-scrolling only, we want to remove the width of the scroll bar
        // so the table + scroll bar will fit into the area available, otherwise
        // we fix the table at its current size with no adjustment
        var correction = !scroll.sX ? scroll.iBarWidth : 0;
        n.style.width = _fnStringToCss($(n).outerWidth() - correction);
      }
    }
    /**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
    function _fnGetWidestNode(settings, colIdx) {
      var idx = _fnGetMaxLenString(settings, colIdx);
      if (idx < 0) {
        return null;
      }
      var data = settings.aoData[idx];
      return !data.nTr ? $('<td/>').html(_fnGetCellData(settings, idx, colIdx, 'display'))[0] : data.anCells[colIdx];
    }
    /**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
    function _fnGetMaxLenString(settings, colIdx) {
      var s, max = -1, maxIdx = -1;
      for (var i = 0, ien = settings.aoData.length; i < ien; i++) {
        s = _fnGetCellData(settings, i, colIdx, 'display') + '';
        s = s.replace(__re_html_remove, '');
        if (s.length > max) {
          max = s.length;
          maxIdx = i;
        }
      }
      return maxIdx;
    }
    /**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
    function _fnStringToCss(s) {
      if (s === null) {
        return '0px';
      }
      if (typeof s == 'number') {
        return s < 0 ? '0px' : s + 'px';
      }
      // Check it has a unit character already
      return s.match(/\d$/) ? s + 'px' : s;
    }
    /**
	 * Get the width of a scroll bar in this browser being used
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
    function _fnScrollBarWidth() {
      // On first run a static variable is set, since this is only needed once.
      // Subsequent runs will just use the previously calculated value
      var width = DataTable.__scrollbarWidth;
      if (width === undefined) {
        var sizer = $('<p/>').css({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 150,
            padding: 0,
            overflow: 'scroll',
            visibility: 'hidden'
          }).appendTo('body');
        width = sizer[0].offsetWidth - sizer[0].clientWidth;
        DataTable.__scrollbarWidth = width;
        sizer.remove();
      }
      return width;
    }
    function _fnSortFlatten(settings) {
      var i, iLen, k, kLen, aSort = [], aiOrig = [], aoColumns = settings.aoColumns, aDataSort, iCol, sType, srcCol, fixed = settings.aaSortingFixed, fixedObj = $.isPlainObject(fixed), nestedSort = [], add = function (a) {
          if (a.length && !$.isArray(a[0])) {
            // 1D array
            nestedSort.push(a);
          } else {
            // 2D array
            nestedSort.push.apply(nestedSort, a);
          }
        };
      // Build the sort array, with pre-fix and post-fix options if they have been
      // specified
      if ($.isArray(fixed)) {
        add(fixed);
      }
      if (fixedObj && fixed.pre) {
        add(fixed.pre);
      }
      add(settings.aaSorting);
      if (fixedObj && fixed.post) {
        add(fixed.post);
      }
      for (i = 0; i < nestedSort.length; i++) {
        srcCol = nestedSort[i][0];
        aDataSort = aoColumns[srcCol].aDataSort;
        for (k = 0, kLen = aDataSort.length; k < kLen; k++) {
          iCol = aDataSort[k];
          sType = aoColumns[iCol].sType || 'string';
          if (nestedSort[i]._idx === undefined) {
            nestedSort[i]._idx = $.inArray(nestedSort[i][1], aoColumns[iCol].asSorting);
          }
          aSort.push({
            src: srcCol,
            col: iCol,
            dir: nestedSort[i][1],
            index: nestedSort[i]._idx,
            type: sType,
            formatter: DataTable.ext.type.order[sType + '-pre']
          });
        }
      }
      return aSort;
    }
    /**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
    function _fnSort(oSettings) {
      var i, ien, iLen, j, jLen, k, kLen, sDataType, nTh, aiOrig = [], oExtSort = DataTable.ext.type.order, aoData = oSettings.aoData, aoColumns = oSettings.aoColumns, aDataSort, data, iCol, sType, oSort, formatters = 0, sortCol, displayMaster = oSettings.aiDisplayMaster, aSort;
      // Resolve any column types that are unknown due to addition or invalidation
      // @todo Can this be moved into a 'data-ready' handler which is called when
      //   data is going to be used in the table?
      _fnColumnTypes(oSettings);
      aSort = _fnSortFlatten(oSettings);
      for (i = 0, ien = aSort.length; i < ien; i++) {
        sortCol = aSort[i];
        // Track if we can use the fast sort algorithm
        if (sortCol.formatter) {
          formatters++;
        }
        // Load the data needed for the sort, for each cell
        _fnSortData(oSettings, sortCol.col);
      }
      /* No sorting required if server-side or no sorting array */
      if (_fnDataSource(oSettings) != 'ssp' && aSort.length !== 0) {
        // Create a value - key array of the current row positions such that we can use their
        // current position during the sort, if values match, in order to perform stable sorting
        for (i = 0, iLen = displayMaster.length; i < iLen; i++) {
          aiOrig[displayMaster[i]] = i;
        }
        /* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
        if (formatters === aSort.length) {
          // All sort types have formatting functions
          displayMaster.sort(function (a, b) {
            var x, y, k, test, sort, len = aSort.length, dataA = aoData[a]._aSortData, dataB = aoData[b]._aSortData;
            for (k = 0; k < len; k++) {
              sort = aSort[k];
              x = dataA[sort.col];
              y = dataB[sort.col];
              test = x < y ? -1 : x > y ? 1 : 0;
              if (test !== 0) {
                return sort.dir === 'asc' ? test : -test;
              }
            }
            x = aiOrig[a];
            y = aiOrig[b];
            return x < y ? -1 : x > y ? 1 : 0;
          });
        } else {
          // Depreciated - remove in 1.11 (providing a plug-in option)
          // Not all sort types have formatting methods, so we have to call their sorting
          // methods.
          displayMaster.sort(function (a, b) {
            var x, y, k, l, test, sort, fn, len = aSort.length, dataA = aoData[a]._aSortData, dataB = aoData[b]._aSortData;
            for (k = 0; k < len; k++) {
              sort = aSort[k];
              x = dataA[sort.col];
              y = dataB[sort.col];
              fn = oExtSort[sort.type + '-' + sort.dir] || oExtSort['string-' + sort.dir];
              test = fn(x, y);
              if (test !== 0) {
                return test;
              }
            }
            x = aiOrig[a];
            y = aiOrig[b];
            return x < y ? -1 : x > y ? 1 : 0;
          });
        }
      }
      /* Tell the draw function that we have sorted the data */
      oSettings.bSorted = true;
    }
    function _fnSortAria(settings) {
      var label;
      var nextSort;
      var columns = settings.aoColumns;
      var aSort = _fnSortFlatten(settings);
      var oAria = settings.oLanguage.oAria;
      // ARIA attributes - need to loop all columns, to update all (removing old
      // attributes as needed)
      for (var i = 0, iLen = columns.length; i < iLen; i++) {
        var col = columns[i];
        var asSorting = col.asSorting;
        var sTitle = col.sTitle.replace(/<.*?>/g, '');
        var th = col.nTh;
        // IE7 is throwing an error when setting these properties with jQuery's
        // attr() and removeAttr() methods...
        th.removeAttribute('aria-sort');
        /* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
        if (col.bSortable) {
          if (aSort.length > 0 && aSort[0].col == i) {
            th.setAttribute('aria-sort', aSort[0].dir == 'asc' ? 'ascending' : 'descending');
            nextSort = asSorting[aSort[0].index + 1] || asSorting[0];
          } else {
            nextSort = asSorting[0];
          }
          label = sTitle + (nextSort === 'asc' ? oAria.sSortAscending : oAria.sSortDescending);
        } else {
          label = sTitle;
        }
        th.setAttribute('aria-label', label);
      }
    }
    /**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
    function _fnSortListener(settings, colIdx, append, callback) {
      var col = settings.aoColumns[colIdx];
      var sorting = settings.aaSorting;
      var asSorting = col.asSorting;
      var nextSortIdx;
      var next = function (a, overflow) {
        var idx = a._idx;
        if (idx === undefined) {
          idx = $.inArray(a[1], asSorting);
        }
        return idx + 1 < asSorting.length ? idx + 1 : overflow ? null : 0;
      };
      // Convert to 2D array if needed
      if (typeof sorting[0] === 'number') {
        sorting = settings.aaSorting = [sorting];
      }
      // If appending the sort then we are multi-column sorting
      if (append && settings.oFeatures.bSortMulti) {
        // Are we already doing some kind of sort on this column?
        var sortIdx = $.inArray(colIdx, _pluck(sorting, '0'));
        if (sortIdx !== -1) {
          // Yes, modify the sort
          nextSortIdx = next(sorting[sortIdx], true);
          if (nextSortIdx === null && sorting.length === 1) {
            nextSortIdx = 0;  // can't remove sorting completely
          }
          if (nextSortIdx === null) {
            sorting.splice(sortIdx, 1);
          } else {
            sorting[sortIdx][1] = asSorting[nextSortIdx];
            sorting[sortIdx]._idx = nextSortIdx;
          }
        } else {
          // No sort on this column yet
          sorting.push([
            colIdx,
            asSorting[0],
            0
          ]);
          sorting[sorting.length - 1]._idx = 0;
        }
      } else if (sorting.length && sorting[0][0] == colIdx) {
        // Single column - already sorting on this column, modify the sort
        nextSortIdx = next(sorting[0]);
        sorting.length = 1;
        sorting[0][1] = asSorting[nextSortIdx];
        sorting[0]._idx = nextSortIdx;
      } else {
        // Single column - sort only on this column
        sorting.length = 0;
        sorting.push([
          colIdx,
          asSorting[0]
        ]);
        sorting[0]._idx = 0;
      }
      // Run the sort by calling a full redraw
      _fnReDraw(settings);
      // callback used for async user interaction
      if (typeof callback == 'function') {
        callback(settings);
      }
    }
    /**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
    function _fnSortAttachListener(settings, attachTo, colIdx, callback) {
      var col = settings.aoColumns[colIdx];
      _fnBindAction(attachTo, {}, function (e) {
        /* If the column is not sortable - don't to anything */
        if (col.bSortable === false) {
          return;
        }
        // If processing is enabled use a timeout to allow the processing
        // display to be shown - otherwise to it synchronously
        if (settings.oFeatures.bProcessing) {
          _fnProcessingDisplay(settings, true);
          setTimeout(function () {
            _fnSortListener(settings, colIdx, e.shiftKey, callback);
            // In server-side processing, the draw callback will remove the
            // processing display
            if (_fnDataSource(settings) !== 'ssp') {
              _fnProcessingDisplay(settings, false);
            }
          }, 0);
        } else {
          _fnSortListener(settings, colIdx, e.shiftKey, callback);
        }
      });
    }
    /**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnSortingClasses(settings) {
      var oldSort = settings.aLastSort;
      var sortClass = settings.oClasses.sSortColumn;
      var sort = _fnSortFlatten(settings);
      var features = settings.oFeatures;
      var i, ien, colIdx;
      if (features.bSort && features.bSortClasses) {
        // Remove old sorting classes
        for (i = 0, ien = oldSort.length; i < ien; i++) {
          colIdx = oldSort[i].src;
          // Remove column sorting
          $(_pluck(settings.aoData, 'anCells', colIdx)).removeClass(sortClass + (i < 2 ? i + 1 : 3));
        }
        // Add new column sorting
        for (i = 0, ien = sort.length; i < ien; i++) {
          colIdx = sort[i].src;
          $(_pluck(settings.aoData, 'anCells', colIdx)).addClass(sortClass + (i < 2 ? i + 1 : 3));
        }
      }
      settings.aLastSort = sort;
    }
    // Get the data to sort a column, be it from cache, fresh (populating the
    // cache), or from a sort formatter
    function _fnSortData(settings, idx) {
      // Custom sorting function - provided by the sort data type
      var column = settings.aoColumns[idx];
      var customSort = DataTable.ext.order[column.sSortDataType];
      var customData;
      if (customSort) {
        customData = customSort.call(settings.oInstance, settings, idx, _fnColumnIndexToVisible(settings, idx));
      }
      // Use / populate cache
      var row, cellData;
      var formatter = DataTable.ext.type.order[column.sType + '-pre'];
      for (var i = 0, ien = settings.aoData.length; i < ien; i++) {
        row = settings.aoData[i];
        if (!row._aSortData) {
          row._aSortData = [];
        }
        if (!row._aSortData[idx] || customSort) {
          cellData = customSort ? customData[i] : _fnGetCellData(settings, i, idx, 'sort');
          row._aSortData[idx] = formatter ? formatter(cellData) : cellData;
        }
      }
    }
    /**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
    function _fnSaveState(settings) {
      if (!settings.oFeatures.bStateSave || settings.bDestroying) {
        return;
      }
      /* Store the interesting variables */
      var state = {
          time: +new Date(),
          start: settings._iDisplayStart,
          length: settings._iDisplayLength,
          order: $.extend(true, [], settings.aaSorting),
          search: _fnSearchToCamel(settings.oPreviousSearch),
          columns: $.map(settings.aoColumns, function (col, i) {
            return {
              visible: col.bVisible,
              search: _fnSearchToCamel(settings.aoPreSearchCols[i])
            };
          })
        };
      _fnCallbackFire(settings, 'aoStateSaveParams', 'stateSaveParams', [
        settings,
        state
      ]);
      settings.oSavedState = state;
      settings.fnStateSaveCallback.call(settings.oInstance, settings, state);
    }
    /**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @memberof DataTable#oApi
	 */
    function _fnLoadState(settings, oInit) {
      var i, ien;
      var columns = settings.aoColumns;
      if (!settings.oFeatures.bStateSave) {
        return;
      }
      var state = settings.fnStateLoadCallback.call(settings.oInstance, settings);
      if (!state || !state.time) {
        return;
      }
      /* Allow custom and plug-in manipulation functions to alter the saved data set and
		 * cancelling of loading by returning false
		 */
      var abStateLoad = _fnCallbackFire(settings, 'aoStateLoadParams', 'stateLoadParams', [
          settings,
          state
        ]);
      if ($.inArray(false, abStateLoad) !== -1) {
        return;
      }
      /* Reject old data */
      var duration = settings.iStateDuration;
      if (duration > 0 && state.time < +new Date() - duration * 1000) {
        return;
      }
      // Number of columns have changed - all bets are off, no restore of settings
      if (columns.length !== state.columns.length) {
        return;
      }
      // Store the saved state so it might be accessed at any time
      settings.oLoadedState = $.extend(true, {}, state);
      // Restore key features - todo - for 1.11 this needs to be done by
      // subscribed events
      if (state.start !== undefined) {
        settings._iDisplayStart = state.start;
        settings.iInitDisplayStart = state.start;
      }
      if (state.length !== undefined) {
        settings._iDisplayLength = state.length;
      }
      // Order
      if (state.order !== undefined) {
        settings.aaSorting = [];
        $.each(state.order, function (i, col) {
          settings.aaSorting.push(col[0] >= columns.length ? [
            0,
            col[1]
          ] : col);
        });
      }
      // Search
      if (state.search !== undefined) {
        $.extend(settings.oPreviousSearch, _fnSearchToHung(state.search));
      }
      // Columns
      for (i = 0, ien = state.columns.length; i < ien; i++) {
        var col = state.columns[i];
        // Visibility
        if (col.visible !== undefined) {
          columns[i].bVisible = col.visible;
        }
        // Search
        if (col.search !== undefined) {
          $.extend(settings.aoPreSearchCols[i], _fnSearchToHung(col.search));
        }
      }
      _fnCallbackFire(settings, 'aoStateLoaded', 'stateLoaded', [
        settings,
        state
      ]);
    }
    /**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
    function _fnSettingsFromNode(table) {
      var settings = DataTable.settings;
      var idx = $.inArray(table, _pluck(settings, 'nTable'));
      return idx !== -1 ? settings[idx] : null;
    }
    /**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
    function _fnLog(settings, level, msg, tn) {
      msg = 'DataTables warning: ' + (settings !== null ? 'table id=' + settings.sTableId + ' - ' : '') + msg;
      if (tn) {
        msg += '. For more information about this error, please see ' + 'http://datatables.net/tn/' + tn;
      }
      if (!level) {
        // Backwards compatibility pre 1.10
        var ext = DataTable.ext;
        var type = ext.sErrMode || ext.errMode;
        _fnCallbackFire(settings, null, 'error', [
          settings,
          tn,
          msg
        ]);
        if (type == 'alert') {
          alert(msg);
        } else if (type == 'throw') {
          throw new Error(msg);
        } else if (typeof type == 'function') {
          type(settings, tn, msg);
        }
      } else if (window.console && console.log) {
        console.log(msg);
      }
    }
    /**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
    function _fnMap(ret, src, name, mappedName) {
      if ($.isArray(name)) {
        $.each(name, function (i, val) {
          if ($.isArray(val)) {
            _fnMap(ret, src, val[0], val[1]);
          } else {
            _fnMap(ret, src, val);
          }
        });
        return;
      }
      if (mappedName === undefined) {
        mappedName = name;
      }
      if (src[name] !== undefined) {
        ret[mappedName] = src[name];
      }
    }
    /**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
    function _fnExtend(out, extender, breakRefs) {
      var val;
      for (var prop in extender) {
        if (extender.hasOwnProperty(prop)) {
          val = extender[prop];
          if ($.isPlainObject(val)) {
            if (!$.isPlainObject(out[prop])) {
              out[prop] = {};
            }
            $.extend(true, out[prop], val);
          } else if (breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val)) {
            out[prop] = val.slice();
          } else {
            out[prop] = val;
          }
        }
      }
      return out;
    }
    /**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
    function _fnBindAction(n, oData, fn) {
      $(n).bind('click.DT', oData, function (e) {
        n.blur();
        // Remove focus outline for mouse users
        fn(e);
      }).bind('keypress.DT', oData, function (e) {
        if (e.which === 13) {
          e.preventDefault();
          fn(e);
        }
      }).bind('selectstart.DT', function () {
        /* Take the brutal approach to cancelling text selection */
        return false;
      });
    }
    /**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
    function _fnCallbackReg(oSettings, sStore, fn, sName) {
      if (fn) {
        oSettings[sStore].push({
          'fn': fn,
          'sName': sName
        });
      }
    }
    /**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
    function _fnCallbackFire(settings, callbackArr, eventName, args) {
      var ret = [];
      if (callbackArr) {
        ret = $.map(settings[callbackArr].slice().reverse(), function (val, i) {
          return val.fn.apply(settings.oInstance, args);
        });
      }
      if (eventName !== null) {
        var e = $.Event(eventName + '.dt');
        $(settings.nTable).trigger(e, args);
        ret.push(e.result);
      }
      return ret;
    }
    function _fnLengthOverflow(settings) {
      var start = settings._iDisplayStart, end = settings.fnDisplayEnd(), len = settings._iDisplayLength;
      /* If we have space to show extra rows (backing up from the end point - then do so */
      if (start >= end) {
        start = end - len;
      }
      // Keep the start record on the current page
      start -= start % len;
      if (len === -1 || start < 0) {
        start = 0;
      }
      settings._iDisplayStart = start;
    }
    function _fnRenderer(settings, type) {
      var renderer = settings.renderer;
      var host = DataTable.ext.renderer[type];
      if ($.isPlainObject(renderer) && renderer[type]) {
        // Specific renderer for this type. If available use it, otherwise use
        // the default.
        return host[renderer[type]] || host._;
      } else if (typeof renderer === 'string') {
        // Common renderer - if there is one available for this type use it,
        // otherwise use the default
        return host[renderer] || host._;
      }
      // Use the default
      return host._;
    }
    /**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
    function _fnDataSource(settings) {
      if (settings.oFeatures.bServerSide) {
        return 'ssp';
      } else if (settings.ajax || settings.sAjaxSource) {
        return 'ajax';
      }
      return 'dom';
    }
    DataTable = function (options) {
      /**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
      this.$ = function (sSelector, oOpts) {
        return this.api(true).$(sSelector, oOpts);
      };
      /**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
      this._ = function (sSelector, oOpts) {
        return this.api(true).rows(sSelector, oOpts).data();
      };
      /**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
      this.api = function (traditional) {
        return traditional ? new _Api(_fnSettingsFromNode(this[_ext.iApiIndex])) : new _Api(this);
      };
      /**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
      this.fnAddData = function (data, redraw) {
        var api = this.api(true);
        /* Check if we want to add multiple rows or not */
        var rows = $.isArray(data) && ($.isArray(data[0]) || $.isPlainObject(data[0])) ? api.rows.add(data) : api.row.add(data);
        if (redraw === undefined || redraw) {
          api.draw();
        }
        return rows.flatten().toArray();
      };
      /**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).bind('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
      this.fnAdjustColumnSizing = function (bRedraw) {
        var api = this.api(true).columns.adjust();
        var settings = api.settings()[0];
        var scroll = settings.oScroll;
        if (bRedraw === undefined || bRedraw) {
          api.draw(false);
        } else if (scroll.sX !== '' || scroll.sY !== '') {
          /* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
          _fnScrollDraw(settings);
        }
      };
      /**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
      this.fnClearTable = function (bRedraw) {
        var api = this.api(true).clear();
        if (bRedraw === undefined || bRedraw) {
          api.draw();
        }
      };
      /**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
      this.fnClose = function (nTr) {
        this.api(true).row(nTr).child.hide();
      };
      /**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
      this.fnDeleteRow = function (target, callback, redraw) {
        var api = this.api(true);
        var rows = api.rows(target);
        var settings = rows.settings()[0];
        var data = settings.aoData[rows[0][0]];
        rows.remove();
        if (callback) {
          callback.call(this, settings, data);
        }
        if (redraw === undefined || redraw) {
          api.draw();
        }
        return data;
      };
      /**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
      this.fnDestroy = function (remove) {
        this.api(true).destroy(remove);
      };
      /**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
      this.fnDraw = function (complete) {
        // Note that this isn't an exact match to the old call to _fnDraw - it takes
        // into account the new data, but can hold position.
        this.api(true).draw(complete);
      };
      /**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
      this.fnFilter = function (sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive) {
        var api = this.api(true);
        if (iColumn === null || iColumn === undefined) {
          api.search(sInput, bRegex, bSmart, bCaseInsensitive);
        } else {
          api.column(iColumn).search(sInput, bRegex, bSmart, bCaseInsensitive);
        }
        api.draw();
      };
      /**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
      this.fnGetData = function (src, col) {
        var api = this.api(true);
        if (src !== undefined) {
          var type = src.nodeName ? src.nodeName.toLowerCase() : '';
          return col !== undefined || type == 'td' || type == 'th' ? api.cell(src, col).data() : api.row(src).data() || null;
        }
        return api.data().toArray();
      };
      /**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
      this.fnGetNodes = function (iRow) {
        var api = this.api(true);
        return iRow !== undefined ? api.row(iRow).node() : api.rows().nodes().flatten().toArray();
      };
      /**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
      this.fnGetPosition = function (node) {
        var api = this.api(true);
        var nodeName = node.nodeName.toUpperCase();
        if (nodeName == 'TR') {
          return api.row(node).index();
        } else if (nodeName == 'TD' || nodeName == 'TH') {
          var cell = api.cell(node).index();
          return [
            cell.row,
            cell.columnVisible,
            cell.column
          ];
        }
        return null;
      };
      /**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
      this.fnIsOpen = function (nTr) {
        return this.api(true).row(nTr).child.isShown();
      };
      /**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
      this.fnOpen = function (nTr, mHtml, sClass) {
        return this.api(true).row(nTr).child(mHtml, sClass).show().child()[0];
      };
      /**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
      this.fnPageChange = function (mAction, bRedraw) {
        var api = this.api(true).page(mAction);
        if (bRedraw === undefined || bRedraw) {
          api.draw(false);
        }
      };
      /**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
      this.fnSetColumnVis = function (iCol, bShow, bRedraw) {
        var api = this.api(true).column(iCol).visible(bShow);
        if (bRedraw === undefined || bRedraw) {
          api.columns.adjust().draw();
        }
      };
      /**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
      this.fnSettings = function () {
        return _fnSettingsFromNode(this[_ext.iApiIndex]);
      };
      /**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
      this.fnSort = function (aaSort) {
        this.api(true).order(aaSort).draw();
      };
      /**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
      this.fnSortListener = function (nNode, iColumn, fnCallback) {
        this.api(true).order.listener(nNode, iColumn, fnCallback);
      };
      /**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
      this.fnUpdate = function (mData, mRow, iColumn, bRedraw, bAction) {
        var api = this.api(true);
        if (iColumn === undefined || iColumn === null) {
          api.row(mRow).data(mData);
        } else {
          api.cell(mRow, iColumn).data(mData);
        }
        if (bAction === undefined || bAction) {
          api.columns.adjust();
        }
        if (bRedraw === undefined || bRedraw) {
          api.draw();
        }
        return 0;
      };
      /**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
      this.fnVersionCheck = _ext.fnVersionCheck;
      var _that = this;
      var emptyInit = options === undefined;
      var len = this.length;
      if (emptyInit) {
        options = {};
      }
      this.oApi = this.internal = _ext.internal;
      // Extend with old style plug-in API methods
      for (var fn in DataTable.ext.internal) {
        if (fn) {
          this[fn] = _fnExternApiFunc(fn);
        }
      }
      this.each(function () {
        // For each initialisation we want to give it a clean initialisation
        // object that can be bashed around
        var o = {};
        var oInit = len > 1 ? _fnExtend(o, options, true) : options;
        /*global oInit,_that,emptyInit*/
        var i = 0, iLen, j, jLen, k, kLen;
        var sId = this.getAttribute('id');
        var bInitHandedOff = false;
        var defaults = DataTable.defaults;
        var $this = $(this);
        /* Sanity check */
        if (this.nodeName.toLowerCase() != 'table') {
          _fnLog(null, 0, 'Non-table node initialisation (' + this.nodeName + ')', 2);
          return;
        }
        /* Backwards compatibility for the defaults */
        _fnCompatOpts(defaults);
        _fnCompatCols(defaults.column);
        /* Convert the camel-case defaults to Hungarian */
        _fnCamelToHungarian(defaults, defaults, true);
        _fnCamelToHungarian(defaults.column, defaults.column, true);
        /* Setting up the initialisation object */
        _fnCamelToHungarian(defaults, $.extend(oInit, $this.data()));
        /* Check to see if we are re-initialising a table */
        var allSettings = DataTable.settings;
        for (i = 0, iLen = allSettings.length; i < iLen; i++) {
          var s = allSettings[i];
          /* Base check on table node */
          if (s.nTable == this || s.nTHead.parentNode == this || s.nTFoot && s.nTFoot.parentNode == this) {
            var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
            var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;
            if (emptyInit || bRetrieve) {
              return s.oInstance;
            } else if (bDestroy) {
              s.oInstance.fnDestroy();
              break;
            } else {
              _fnLog(s, 0, 'Cannot reinitialise DataTable', 3);
              return;
            }
          }
          /* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
          if (s.sTableId == this.id) {
            allSettings.splice(i, 1);
            break;
          }
        }
        /* Ensure the table has an ID - required for accessibility */
        if (sId === null || sId === '') {
          sId = 'DataTables_Table_' + DataTable.ext._unique++;
          this.id = sId;
        }
        /* Create the settings object for this table and set some of the default parameters */
        var oSettings = $.extend(true, {}, DataTable.models.oSettings, {
            'sDestroyWidth': $this[0].style.width,
            'sInstance': sId,
            'sTableId': sId
          });
        oSettings.nTable = this;
        oSettings.oApi = _that.internal;
        oSettings.oInit = oInit;
        allSettings.push(oSettings);
        // Need to add the instance after the instance after the settings object has been added
        // to the settings array, so we can self reference the table instance if more than one
        oSettings.oInstance = _that.length === 1 ? _that : $this.dataTable();
        // Backwards compatibility, before we apply all the defaults
        _fnCompatOpts(oInit);
        if (oInit.oLanguage) {
          _fnLanguageCompat(oInit.oLanguage);
        }
        // If the length menu is given, but the init display length is not, use the length menu
        if (oInit.aLengthMenu && !oInit.iDisplayLength) {
          oInit.iDisplayLength = $.isArray(oInit.aLengthMenu[0]) ? oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
        }
        // Apply the defaults and init options to make a single init object will all
        // options defined from defaults and instance options.
        oInit = _fnExtend($.extend(true, {}, defaults), oInit);
        // Map the initialisation options onto the settings object
        _fnMap(oSettings.oFeatures, oInit, [
          'bPaginate',
          'bLengthChange',
          'bFilter',
          'bSort',
          'bSortMulti',
          'bInfo',
          'bProcessing',
          'bAutoWidth',
          'bSortClasses',
          'bServerSide',
          'bDeferRender'
        ]);
        _fnMap(oSettings, oInit, [
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
        _fnMap(oSettings.oScroll, oInit, [
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
        _fnMap(oSettings.oLanguage, oInit, 'fnInfoCallback');
        /* Callback functions which are array driven */
        _fnCallbackReg(oSettings, 'aoDrawCallback', oInit.fnDrawCallback, 'user');
        _fnCallbackReg(oSettings, 'aoServerParams', oInit.fnServerParams, 'user');
        _fnCallbackReg(oSettings, 'aoStateSaveParams', oInit.fnStateSaveParams, 'user');
        _fnCallbackReg(oSettings, 'aoStateLoadParams', oInit.fnStateLoadParams, 'user');
        _fnCallbackReg(oSettings, 'aoStateLoaded', oInit.fnStateLoaded, 'user');
        _fnCallbackReg(oSettings, 'aoRowCallback', oInit.fnRowCallback, 'user');
        _fnCallbackReg(oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow, 'user');
        _fnCallbackReg(oSettings, 'aoHeaderCallback', oInit.fnHeaderCallback, 'user');
        _fnCallbackReg(oSettings, 'aoFooterCallback', oInit.fnFooterCallback, 'user');
        _fnCallbackReg(oSettings, 'aoInitComplete', oInit.fnInitComplete, 'user');
        _fnCallbackReg(oSettings, 'aoPreDrawCallback', oInit.fnPreDrawCallback, 'user');
        var oClasses = oSettings.oClasses;
        // @todo Remove in 1.11
        if (oInit.bJQueryUI) {
          /* Use the JUI classes object for display. You could clone the oStdClasses object if
				 * you want to have multiple tables with multiple independent classes
				 */
          $.extend(oClasses, DataTable.ext.oJUIClasses, oInit.oClasses);
          if (oInit.sDom === defaults.sDom && defaults.sDom === 'lfrtip') {
            /* Set the DOM to use a layout suitable for jQuery UI's theming */
            oSettings.sDom = '<"H"lfr>t<"F"ip>';
          }
          if (!oSettings.renderer) {
            oSettings.renderer = 'jqueryui';
          } else if ($.isPlainObject(oSettings.renderer) && !oSettings.renderer.header) {
            oSettings.renderer.header = 'jqueryui';
          }
        } else {
          $.extend(oClasses, DataTable.ext.classes, oInit.oClasses);
        }
        $this.addClass(oClasses.sTable);
        /* Calculate the scroll bar width and cache it for use later on */
        if (oSettings.oScroll.sX !== '' || oSettings.oScroll.sY !== '') {
          oSettings.oScroll.iBarWidth = _fnScrollBarWidth();
        }
        if (oSettings.oScroll.sX === true) {
          // Easy initialisation of x-scrolling
          oSettings.oScroll.sX = '100%';
        }
        if (oSettings.iInitDisplayStart === undefined) {
          /* Display start point, taking into account the save saving */
          oSettings.iInitDisplayStart = oInit.iDisplayStart;
          oSettings._iDisplayStart = oInit.iDisplayStart;
        }
        if (oInit.iDeferLoading !== null) {
          oSettings.bDeferLoading = true;
          var tmp = $.isArray(oInit.iDeferLoading);
          oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
          oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
        }
        /* Language definitions */
        var oLanguage = oSettings.oLanguage;
        $.extend(true, oLanguage, oInit.oLanguage);
        if (oLanguage.sUrl !== '') {
          /* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
          $.ajax({
            dataType: 'json',
            url: oLanguage.sUrl,
            success: function (json) {
              _fnLanguageCompat(json);
              _fnCamelToHungarian(defaults.oLanguage, json);
              $.extend(true, oLanguage, json);
              _fnInitialise(oSettings);
            },
            error: function () {
              // Error occurred loading language file, continue on as best we can
              _fnInitialise(oSettings);
            }
          });
          bInitHandedOff = true;
        }
        /*
			 * Stripes
			 */
        if (oInit.asStripeClasses === null) {
          oSettings.asStripeClasses = [
            oClasses.sStripeOdd,
            oClasses.sStripeEven
          ];
        }
        /* Remove row stripe classes if they are already on the table row */
        var stripeClasses = oSettings.asStripeClasses;
        var rowOne = $this.children('tbody').find('tr').eq(0);
        if ($.inArray(true, $.map(stripeClasses, function (el, i) {
            return rowOne.hasClass(el);
          })) !== -1) {
          $('tbody tr', this).removeClass(stripeClasses.join(' '));
          oSettings.asDestroyStripes = stripeClasses.slice();
        }
        /*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
        var anThs = [];
        var aoColumnsInit;
        var nThead = this.getElementsByTagName('thead');
        if (nThead.length !== 0) {
          _fnDetectHeader(oSettings.aoHeader, nThead[0]);
          anThs = _fnGetUniqueThs(oSettings);
        }
        /* If not given a column array, generate one with nulls */
        if (oInit.aoColumns === null) {
          aoColumnsInit = [];
          for (i = 0, iLen = anThs.length; i < iLen; i++) {
            aoColumnsInit.push(null);
          }
        } else {
          aoColumnsInit = oInit.aoColumns;
        }
        /* Add the columns */
        for (i = 0, iLen = aoColumnsInit.length; i < iLen; i++) {
          _fnAddColumn(oSettings, anThs ? anThs[i] : null);
        }
        /* Apply the column definitions */
        _fnApplyColumnDefs(oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
          _fnColumnOptions(oSettings, iCol, oDef);
        });
        /* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
        if (rowOne.length) {
          var a = function (cell, name) {
            return cell.getAttribute('data-' + name) !== null ? name : null;
          };
          $.each(_fnGetRowElements(oSettings, rowOne[0]).cells, function (i, cell) {
            var col = oSettings.aoColumns[i];
            if (col.mData === i) {
              var sort = a(cell, 'sort') || a(cell, 'order');
              var filter = a(cell, 'filter') || a(cell, 'search');
              if (sort !== null || filter !== null) {
                col.mData = {
                  _: i + '.display',
                  sort: sort !== null ? i + '.@data-' + sort : undefined,
                  type: sort !== null ? i + '.@data-' + sort : undefined,
                  filter: filter !== null ? i + '.@data-' + filter : undefined
                };
                _fnColumnOptions(oSettings, i);
              }
            }
          });
        }
        var features = oSettings.oFeatures;
        /* Must be done after everything which can be overridden by the state saving! */
        if (oInit.bStateSave) {
          features.bStateSave = true;
          _fnLoadState(oSettings, oInit);
          _fnCallbackReg(oSettings, 'aoDrawCallback', _fnSaveState, 'state_save');
        }
        /*
			 * Sorting
			 * @todo For modularisation (1.11) this needs to do into a sort start up handler
			 */
        // If aaSorting is not defined, then we use the first indicator in asSorting
        // in case that has been altered, so the default sort reflects that option
        if (oInit.aaSorting === undefined) {
          var sorting = oSettings.aaSorting;
          for (i = 0, iLen = sorting.length; i < iLen; i++) {
            sorting[i][1] = oSettings.aoColumns[i].asSorting[0];
          }
        }
        /* Do a first pass on the sorting classes (allows any size changes to be taken into
			 * account, and also will apply sorting disabled classes if disabled
			 */
        _fnSortingClasses(oSettings);
        if (features.bSort) {
          _fnCallbackReg(oSettings, 'aoDrawCallback', function () {
            if (oSettings.bSorted) {
              var aSort = _fnSortFlatten(oSettings);
              var sortedColumns = {};
              $.each(aSort, function (i, val) {
                sortedColumns[val.src] = val.dir;
              });
              _fnCallbackFire(oSettings, null, 'order', [
                oSettings,
                aSort,
                sortedColumns
              ]);
              _fnSortAria(oSettings);
            }
          });
        }
        _fnCallbackReg(oSettings, 'aoDrawCallback', function () {
          if (oSettings.bSorted || _fnDataSource(oSettings) === 'ssp' || features.bDeferRender) {
            _fnSortingClasses(oSettings);
          }
        }, 'sc');
        /*
			 * Final init
			 * Cache the header, body and footer as required, creating them if needed
			 */
        /* Browser support detection */
        _fnBrowserDetect(oSettings);
        // Work around for Webkit bug 83867 - store the caption-side before removing from doc
        var captions = $this.children('caption').each(function () {
            this._captionSide = $this.css('caption-side');
          });
        var thead = $this.children('thead');
        if (thead.length === 0) {
          thead = $('<thead/>').appendTo(this);
        }
        oSettings.nTHead = thead[0];
        var tbody = $this.children('tbody');
        if (tbody.length === 0) {
          tbody = $('<tbody/>').appendTo(this);
        }
        oSettings.nTBody = tbody[0];
        var tfoot = $this.children('tfoot');
        if (tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== '' || oSettings.oScroll.sY !== '')) {
          // If we are a scrolling table, and no footer has been given, then we need to create
          // a tfoot element for the caption element to be appended to
          tfoot = $('<tfoot/>').appendTo(this);
        }
        if (tfoot.length === 0 || tfoot.children().length === 0) {
          $this.addClass(oClasses.sNoFooter);
        } else if (tfoot.length > 0) {
          oSettings.nTFoot = tfoot[0];
          _fnDetectHeader(oSettings.aoFooter, oSettings.nTFoot);
        }
        /* Check if there is data passing into the constructor */
        if (oInit.aaData) {
          for (i = 0; i < oInit.aaData.length; i++) {
            _fnAddData(oSettings, oInit.aaData[i]);
          }
        } else if (oSettings.bDeferLoading || _fnDataSource(oSettings) == 'dom') {
          /* Grab the data from the page - only do this when deferred loading or no Ajax
				 * source since there is no point in reading the DOM data if we are then going
				 * to replace it with Ajax data
				 */
          _fnAddTr(oSettings, $(oSettings.nTBody).children('tr'));
        }
        /* Copy the data index array */
        oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();
        /* Initialisation complete - table can be drawn */
        oSettings.bInitialised = true;
        /* Check if we need to initialise the table (it might not have been handed off to the
			 * language processor)
			 */
        if (bInitHandedOff === false) {
          _fnInitialise(oSettings);
        }
      });
      _that = null;
      return this;
    };
    /**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
    var __apiStruct = [];
    /**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
    var __arrayProto = Array.prototype;
    /**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
    var _toSettings = function (mixed) {
      var idx, jq;
      var settings = DataTable.settings;
      var tables = $.map(settings, function (el, i) {
          return el.nTable;
        });
      if (!mixed) {
        return [];
      } else if (mixed.nTable && mixed.oApi) {
        // DataTables settings object
        return [mixed];
      } else if (mixed.nodeName && mixed.nodeName.toLowerCase() === 'table') {
        // Table node
        idx = $.inArray(mixed, tables);
        return idx !== -1 ? [settings[idx]] : null;
      } else if (mixed && typeof mixed.settings === 'function') {
        return mixed.settings().toArray();
      } else if (typeof mixed === 'string') {
        // jQuery selector
        jq = $(mixed);
      } else if (mixed instanceof $) {
        // jQuery object (also DataTables instance)
        jq = mixed;
      }
      if (jq) {
        return jq.map(function (i) {
          idx = $.inArray(this, tables);
          return idx !== -1 ? settings[idx] : null;
        }).toArray();
      }
    };
    /**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
    _Api = function (context, data) {
      if (!(this instanceof _Api)) {
        return new _Api(context, data);
      }
      var settings = [];
      var ctxSettings = function (o) {
        var a = _toSettings(o);
        if (a) {
          settings.push.apply(settings, a);
        }
      };
      if ($.isArray(context)) {
        for (var i = 0, ien = context.length; i < ien; i++) {
          ctxSettings(context[i]);
        }
      } else {
        ctxSettings(context);
      }
      // Remove duplicates
      this.context = _unique(settings);
      // Initial data
      if (data) {
        this.push.apply(this, data.toArray ? data.toArray() : data);
      }
      // selector
      this.selector = {
        rows: null,
        cols: null,
        opts: null
      };
      _Api.extend(this, this, __apiStruct);
    };
    DataTable.Api = _Api;
    _Api.prototype = {
      any: function () {
        return this.flatten().length !== 0;
      },
      concat: __arrayProto.concat,
      context: [],
      each: function (fn) {
        for (var i = 0, ien = this.length; i < ien; i++) {
          fn.call(this, this[i], i, this);
        }
        return this;
      },
      eq: function (idx) {
        var ctx = this.context;
        return ctx.length > idx ? new _Api(ctx[idx], this[idx]) : null;
      },
      filter: function (fn) {
        var a = [];
        if (__arrayProto.filter) {
          a = __arrayProto.filter.call(this, fn, this);
        } else {
          // Compatibility for browsers without EMCA-252-5 (JS 1.6)
          for (var i = 0, ien = this.length; i < ien; i++) {
            if (fn.call(this, this[i], i, this)) {
              a.push(this[i]);
            }
          }
        }
        return new _Api(this.context, a);
      },
      flatten: function () {
        var a = [];
        return new _Api(this.context, a.concat.apply(a, this.toArray()));
      },
      join: __arrayProto.join,
      indexOf: __arrayProto.indexOf || function (obj, start) {
        for (var i = start || 0, ien = this.length; i < ien; i++) {
          if (this[i] === obj) {
            return i;
          }
        }
        return -1;
      },
      iterator: function (flatten, type, fn, alwaysNew) {
        var a = [], ret, i, ien, j, jen, context = this.context, rows, items, item, selector = this.selector;
        // Argument shifting
        if (typeof flatten === 'string') {
          alwaysNew = fn;
          fn = type;
          type = flatten;
          flatten = false;
        }
        for (i = 0, ien = context.length; i < ien; i++) {
          var apiInst = new _Api(context[i]);
          if (type === 'table') {
            ret = fn.call(apiInst, context[i], i);
            if (ret !== undefined) {
              a.push(ret);
            }
          } else if (type === 'columns' || type === 'rows') {
            // this has same length as context - one entry for each table
            ret = fn.call(apiInst, context[i], this[i], i);
            if (ret !== undefined) {
              a.push(ret);
            }
          } else if (type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell') {
            // columns and rows share the same structure.
            // 'this' is an array of column indexes for each context
            items = this[i];
            if (type === 'column-rows') {
              rows = _selector_row_indexes(context[i], selector.opts);
            }
            for (j = 0, jen = items.length; j < jen; j++) {
              item = items[j];
              if (type === 'cell') {
                ret = fn.call(apiInst, context[i], item.row, item.column, i, j);
              } else {
                ret = fn.call(apiInst, context[i], item, i, j, rows);
              }
              if (ret !== undefined) {
                a.push(ret);
              }
            }
          }
        }
        if (a.length || alwaysNew) {
          var api = new _Api(context, flatten ? a.concat.apply([], a) : a);
          var apiSelector = api.selector;
          apiSelector.rows = selector.rows;
          apiSelector.cols = selector.cols;
          apiSelector.opts = selector.opts;
          return api;
        }
        return this;
      },
      lastIndexOf: __arrayProto.lastIndexOf || function (obj, start) {
        // Bit cheeky...
        return this.indexOf.apply(this.toArray.reverse(), arguments);
      },
      length: 0,
      map: function (fn) {
        var a = [];
        if (__arrayProto.map) {
          a = __arrayProto.map.call(this, fn, this);
        } else {
          // Compatibility for browsers without EMCA-252-5 (JS 1.6)
          for (var i = 0, ien = this.length; i < ien; i++) {
            a.push(fn.call(this, this[i], i));
          }
        }
        return new _Api(this.context, a);
      },
      pluck: function (prop) {
        return this.map(function (el) {
          return el[prop];
        });
      },
      pop: __arrayProto.pop,
      push: __arrayProto.push,
      reduce: __arrayProto.reduce || function (fn, init) {
        return _fnReduce(this, fn, init, 0, this.length, 1);
      },
      reduceRight: __arrayProto.reduceRight || function (fn, init) {
        return _fnReduce(this, fn, init, this.length - 1, -1, -1);
      },
      reverse: __arrayProto.reverse,
      selector: null,
      shift: __arrayProto.shift,
      sort: __arrayProto.sort,
      splice: __arrayProto.splice,
      toArray: function () {
        return __arrayProto.slice.call(this);
      },
      to$: function () {
        return $(this);
      },
      toJQuery: function () {
        return $(this);
      },
      unique: function () {
        return new _Api(this.context, _unique(this));
      },
      unshift: __arrayProto.unshift
    };
    _Api.extend = function (scope, obj, ext) {
      // Only extend API instances and static properties of the API
      if (!ext.length || !obj || !(obj instanceof _Api) && !obj.__dt_wrapper) {
        return;
      }
      var i, ien, j, jen, struct, inner, methodScoping = function (scope, fn, struc) {
          return function () {
            var ret = fn.apply(scope, arguments);
            // Method extension
            _Api.extend(ret, ret, struc.methodExt);
            return ret;
          };
        };
      for (i = 0, ien = ext.length; i < ien; i++) {
        struct = ext[i];
        // Value
        obj[struct.name] = typeof struct.val === 'function' ? methodScoping(scope, struct.val, struct) : $.isPlainObject(struct.val) ? {} : struct.val;
        obj[struct.name].__dt_wrapper = true;
        // Property extension
        _Api.extend(scope, obj[struct.name], struct.propExt);
      }
    };
    // @todo - Is there need for an augment function?
    // _Api.augment = function ( inst, name )
    // {
    // 	// Find src object in the structure from the name
    // 	var parts = name.split('.');
    // 	_Api.extend( inst, obj );
    // };
    //     [
    //       {
    //         name:      'data'                -- string   - Property name
    //         val:       function () {},       -- function - Api method (or undefined if just an object
    //         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
    //         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
    //       },
    //       {
    //         name:     'row'
    //         val:       {},
    //         methodExt: [ ... ],
    //         propExt:   [
    //           {
    //             name:      'data'
    //             val:       function () {},
    //             methodExt: [ ... ],
    //             propExt:   [ ... ]
    //           },
    //           ...
    //         ]
    //       }
    //     ]
    _Api.register = _api_register = function (name, val) {
      if ($.isArray(name)) {
        for (var j = 0, jen = name.length; j < jen; j++) {
          _Api.register(name[j], val);
        }
        return;
      }
      var i, ien, heir = name.split('.'), struct = __apiStruct, key, method;
      var find = function (src, name) {
        for (var i = 0, ien = src.length; i < ien; i++) {
          if (src[i].name === name) {
            return src[i];
          }
        }
        return null;
      };
      for (i = 0, ien = heir.length; i < ien; i++) {
        method = heir[i].indexOf('()') !== -1;
        key = method ? heir[i].replace('()', '') : heir[i];
        var src = find(struct, key);
        if (!src) {
          src = {
            name: key,
            val: {},
            methodExt: [],
            propExt: []
          };
          struct.push(src);
        }
        if (i === ien - 1) {
          src.val = val;
        } else {
          struct = method ? src.methodExt : src.propExt;
        }
      }
    };
    _Api.registerPlural = _api_registerPlural = function (pluralName, singularName, val) {
      _Api.register(pluralName, val);
      _Api.register(singularName, function () {
        var ret = val.apply(this, arguments);
        if (ret === this) {
          // Returned item is the API instance that was passed in, return it
          return this;
        } else if (ret instanceof _Api) {
          // New API instance returned, want the value from the first item
          // in the returned array for the singular result.
          return ret.length ? $.isArray(ret[0]) ? new _Api(ret.context, ret[0]) : ret[0] : undefined;
        }
        // Non-API return - just fire it back
        return ret;
      });
    };
    /**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
    var __table_selector = function (selector, a) {
      // Integer is used to pick out a table by index
      if (typeof selector === 'number') {
        return [a[selector]];
      }
      // Perform a jQuery selector on the table nodes
      var nodes = $.map(a, function (el, i) {
          return el.nTable;
        });
      return $(nodes).filter(selector).map(function (i) {
        // Need to translate back from the table node to the settings
        var idx = $.inArray(this, nodes);
        return a[idx];
      }).toArray();
    };
    /**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
    _api_register('tables()', function (selector) {
      // A new instance is created if there was a selector specified
      return selector ? new _Api(__table_selector(selector, this.context)) : this;
    });
    _api_register('table()', function (selector) {
      var tables = this.tables(selector);
      var ctx = tables.context;
      // Truncate to the first matched table
      return ctx.length ? new _Api(ctx[0]) : tables;
    });
    _api_registerPlural('tables().nodes()', 'table().node()', function () {
      return this.iterator('table', function (ctx) {
        return ctx.nTable;
      }, 1);
    });
    _api_registerPlural('tables().body()', 'table().body()', function () {
      return this.iterator('table', function (ctx) {
        return ctx.nTBody;
      }, 1);
    });
    _api_registerPlural('tables().header()', 'table().header()', function () {
      return this.iterator('table', function (ctx) {
        return ctx.nTHead;
      }, 1);
    });
    _api_registerPlural('tables().footer()', 'table().footer()', function () {
      return this.iterator('table', function (ctx) {
        return ctx.nTFoot;
      }, 1);
    });
    _api_registerPlural('tables().containers()', 'table().container()', function () {
      return this.iterator('table', function (ctx) {
        return ctx.nTableWrapper;
      }, 1);
    });
    /**
	 * Redraw the tables in the current context.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
    _api_register('draw()', function (resetPaging) {
      return this.iterator('table', function (settings) {
        _fnReDraw(settings, resetPaging === false);
      });
    });
    /**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 */
    /**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
    _api_register('page()', function (action) {
      if (action === undefined) {
        return this.page.info().page;  // not an expensive call
      }
      // else, have an action to take on all tables
      return this.iterator('table', function (settings) {
        _fnPageChange(settings, action);
      });
    });
    /**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
    _api_register('page.info()', function (action) {
      if (this.context.length === 0) {
        return undefined;
      }
      var settings = this.context[0], start = settings._iDisplayStart, len = settings._iDisplayLength, visRecords = settings.fnRecordsDisplay(), all = len === -1;
      return {
        'page': all ? 0 : Math.floor(start / len),
        'pages': all ? 1 : Math.ceil(visRecords / len),
        'start': start,
        'end': settings.fnDisplayEnd(),
        'length': len,
        'recordsTotal': settings.fnRecordsTotal(),
        'recordsDisplay': visRecords
      };
    });
    /**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 */
    /**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
    _api_register('page.len()', function (len) {
      // Note that we can't call this function 'length()' because `length`
      // is a Javascript property of functions which defines how many arguments
      // the function expects.
      if (len === undefined) {
        return this.context.length !== 0 ? this.context[0]._iDisplayLength : undefined;
      }
      // else, set the page length
      return this.iterator('table', function (settings) {
        _fnLengthChange(settings, len);
      });
    });
    var __reload = function (settings, holdPosition, callback) {
      // Use the draw event to trigger a callback
      if (callback) {
        var api = new _Api(settings);
        api.one('draw', function () {
          callback(api.ajax.json());
        });
      }
      if (_fnDataSource(settings) == 'ssp') {
        _fnReDraw(settings, holdPosition);
      } else {
        // Trigger xhr
        _fnProcessingDisplay(settings, true);
        _fnBuildAjax(settings, [], function (json) {
          _fnClearTable(settings);
          var data = _fnAjaxDataSrc(settings, json);
          for (var i = 0, ien = data.length; i < ien; i++) {
            _fnAddData(settings, data[i]);
          }
          _fnReDraw(settings, holdPosition);
          _fnProcessingDisplay(settings, false);
        });
      }
    };
    /**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
    _api_register('ajax.json()', function () {
      var ctx = this.context;
      if (ctx.length > 0) {
        return ctx[0].json;
      }  // else return undefined;
    });
    /**
	 * Get the data submitted in the last Ajax request
	 */
    _api_register('ajax.params()', function () {
      var ctx = this.context;
      if (ctx.length > 0) {
        return ctx[0].oAjaxData;
      }  // else return undefined;
    });
    /**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
    _api_register('ajax.reload()', function (callback, resetPaging) {
      return this.iterator('table', function (settings) {
        __reload(settings, resetPaging === false, callback);
      });
    });
    /**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 */
    /**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
    _api_register('ajax.url()', function (url) {
      var ctx = this.context;
      if (url === undefined) {
        // get
        if (ctx.length === 0) {
          return undefined;
        }
        ctx = ctx[0];
        return ctx.ajax ? $.isPlainObject(ctx.ajax) ? ctx.ajax.url : ctx.ajax : ctx.sAjaxSource;
      }
      // set
      return this.iterator('table', function (settings) {
        if ($.isPlainObject(settings.ajax)) {
          settings.ajax.url = url;
        } else {
          settings.ajax = url;
        }  // No need to consider sAjaxSource here since DataTables gives priority
           // to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
           // value of `sAjaxSource` redundant.
      });
    });
    /**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
    _api_register('ajax.url().load()', function (callback, resetPaging) {
      // Same as a reload, but makes sense to present it for easy access after a
      // url change
      return this.iterator('table', function (ctx) {
        __reload(ctx, resetPaging === false, callback);
      });
    });
    var _selector_run = function (type, selector, selectFn, settings, opts) {
      var out = [], res, a, i, ien, j, jen, selectorType = typeof selector;
      // Can't just check for isArray here, as an API or jQuery instance might be
      // given with their array like look
      if (!selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined) {
        selector = [selector];
      }
      for (i = 0, ien = selector.length; i < ien; i++) {
        a = selector[i] && selector[i].split ? selector[i].split(',') : [selector[i]];
        for (j = 0, jen = a.length; j < jen; j++) {
          res = selectFn(typeof a[j] === 'string' ? $.trim(a[j]) : a[j]);
          if (res && res.length) {
            out.push.apply(out, res);
          }
        }
      }
      // selector extensions
      var ext = _ext.selector[type];
      if (ext.length) {
        for (i = 0, ien = ext.length; i < ien; i++) {
          out = ext[i](settings, opts, out);
        }
      }
      return out;
    };
    var _selector_opts = function (opts) {
      if (!opts) {
        opts = {};
      }
      // Backwards compatibility for 1.9- which used the terminology filter rather
      // than search
      if (opts.filter && opts.search === undefined) {
        opts.search = opts.filter;
      }
      return $.extend({
        search: 'none',
        order: 'current',
        page: 'all'
      }, opts);
    };
    var _selector_first = function (inst) {
      // Reduce the API instance to the first item found
      for (var i = 0, ien = inst.length; i < ien; i++) {
        if (inst[i].length > 0) {
          // Assign the first element to the first item in the instance
          // and truncate the instance and context
          inst[0] = inst[i];
          inst[0].length = 1;
          inst.length = 1;
          inst.context = [inst.context[i]];
          return inst;
        }
      }
      // Not found - return an empty instance
      inst.length = 0;
      return inst;
    };
    var _selector_row_indexes = function (settings, opts) {
      var i, ien, tmp, a = [], displayFiltered = settings.aiDisplay, displayMaster = settings.aiDisplayMaster;
      var search = opts.search,
        // none, applied, removed
        order = opts.order,
        // applied, current, index (original - compatibility with 1.9)
        page = opts.page;
      // all, current
      if (_fnDataSource(settings) == 'ssp') {
        // In server-side processing mode, most options are irrelevant since
        // rows not shown don't exist and the index order is the applied order
        // Removed is a special case - for consistency just return an empty
        // array
        return search === 'removed' ? [] : _range(0, displayMaster.length);
      } else if (page == 'current') {
        // Current page implies that order=current and fitler=applied, since it is
        // fairly senseless otherwise, regardless of what order and search actually
        // are
        for (i = settings._iDisplayStart, ien = settings.fnDisplayEnd(); i < ien; i++) {
          a.push(displayFiltered[i]);
        }
      } else if (order == 'current' || order == 'applied') {
        a = search == 'none' ? displayMaster.slice() : search == 'applied' ? displayFiltered.slice() : $.map(displayMaster, function (el, i) {
          // removed search
          return $.inArray(el, displayFiltered) === -1 ? el : null;
        });
      } else if (order == 'index' || order == 'original') {
        for (i = 0, ien = settings.aoData.length; i < ien; i++) {
          if (search == 'none') {
            a.push(i);
          } else {
            // applied | removed
            tmp = $.inArray(i, displayFiltered);
            if (tmp === -1 && search == 'removed' || tmp >= 0 && search == 'applied') {
              a.push(i);
            }
          }
        }
      }
      return a;
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
    var __row_selector = function (settings, selector, opts) {
      var run = function (sel) {
        var selInt = _intVal(sel);
        var i, ien;
        // Short cut - selector is a number and no options provided (default is
        // all records, so no need to check if the index is in there, since it
        // must be - dev error if the index doesn't exist).
        if (selInt !== null && !opts) {
          return [selInt];
        }
        var rows = _selector_row_indexes(settings, opts);
        if (selInt !== null && $.inArray(selInt, rows) !== -1) {
          // Selector - integer
          return [selInt];
        } else if (!sel) {
          // Selector - none
          return rows;
        }
        // Selector - function
        if (typeof sel === 'function') {
          return $.map(rows, function (idx) {
            var row = settings.aoData[idx];
            return sel(idx, row._aData, row.nTr) ? idx : null;
          });
        }
        // Get nodes in the order from the `rows` array with null values removed
        var nodes = _removeEmpty(_pluck_order(settings.aoData, rows, 'nTr'));
        // Selector - node
        if (sel.nodeName) {
          if ($.inArray(sel, nodes) !== -1) {
            return [sel._DT_RowIndex];  // sel is a TR node that is in the table
                                        // and DataTables adds a prop for fast lookup
          }
        }
        // Selector - jQuery selector string, array of nodes or jQuery object/
        // As jQuery's .filter() allows jQuery objects to be passed in filter,
        // it also allows arrays, so this will cope with all three options
        return $(nodes).filter(sel).map(function () {
          return this._DT_RowIndex;
        }).toArray();
      };
      return _selector_run('row', selector, run, settings, opts);
    };
    _api_register('rows()', function (selector, opts) {
      // argument shifting
      if (selector === undefined) {
        selector = '';
      } else if ($.isPlainObject(selector)) {
        opts = selector;
        selector = '';
      }
      opts = _selector_opts(opts);
      var inst = this.iterator('table', function (settings) {
          return __row_selector(settings, selector, opts);
        }, 1);
      // Want argument shifting here and in __row_selector?
      inst.selector.rows = selector;
      inst.selector.opts = opts;
      return inst;
    });
    _api_register('rows().nodes()', function () {
      return this.iterator('row', function (settings, row) {
        return settings.aoData[row].nTr || undefined;
      }, 1);
    });
    _api_register('rows().data()', function () {
      return this.iterator(true, 'rows', function (settings, rows) {
        return _pluck_order(settings.aoData, rows, '_aData');
      }, 1);
    });
    _api_registerPlural('rows().cache()', 'row().cache()', function (type) {
      return this.iterator('row', function (settings, row) {
        var r = settings.aoData[row];
        return type === 'search' ? r._aFilterData : r._aSortData;
      }, 1);
    });
    _api_registerPlural('rows().invalidate()', 'row().invalidate()', function (src) {
      return this.iterator('row', function (settings, row) {
        _fnInvalidate(settings, row, src);
      });
    });
    _api_registerPlural('rows().indexes()', 'row().index()', function () {
      return this.iterator('row', function (settings, row) {
        return row;
      }, 1);
    });
    _api_registerPlural('rows().remove()', 'row().remove()', function () {
      var that = this;
      return this.iterator('row', function (settings, row, thatIdx) {
        var data = settings.aoData;
        data.splice(row, 1);
        // Update the _DT_RowIndex parameter on all rows in the table
        for (var i = 0, ien = data.length; i < ien; i++) {
          if (data[i].nTr !== null) {
            data[i].nTr._DT_RowIndex = i;
          }
        }
        // Remove the target row from the search array
        var displayIndex = $.inArray(row, settings.aiDisplay);
        // Delete from the display arrays
        _fnDeleteIndex(settings.aiDisplayMaster, row);
        _fnDeleteIndex(settings.aiDisplay, row);
        _fnDeleteIndex(that[thatIdx], row, false);
        // maintain local indexes
        // Check for an 'overflow' they case for displaying the table
        _fnLengthOverflow(settings);
      });
    });
    _api_register('rows.add()', function (rows) {
      var newRows = this.iterator('table', function (settings) {
          var row, i, ien;
          var out = [];
          for (i = 0, ien = rows.length; i < ien; i++) {
            row = rows[i];
            if (row.nodeName && row.nodeName.toUpperCase() === 'TR') {
              out.push(_fnAddTr(settings, row)[0]);
            } else {
              out.push(_fnAddData(settings, row));
            }
          }
          return out;
        }, 1);
      // Return an Api.rows() extended instance, so rows().nodes() etc can be used
      var modRows = this.rows(-1);
      modRows.pop();
      modRows.push.apply(modRows, newRows.toArray());
      return modRows;
    });
    /**
	 *
	 */
    _api_register('row()', function (selector, opts) {
      return _selector_first(this.rows(selector, opts));
    });
    _api_register('row().data()', function (data) {
      var ctx = this.context;
      if (data === undefined) {
        // Get
        return ctx.length && this.length ? ctx[0].aoData[this[0]]._aData : undefined;
      }
      // Set
      ctx[0].aoData[this[0]]._aData = data;
      // Automatically invalidate
      _fnInvalidate(ctx[0], this[0], 'data');
      return this;
    });
    _api_register('row().node()', function () {
      var ctx = this.context;
      return ctx.length && this.length ? ctx[0].aoData[this[0]].nTr || null : null;
    });
    _api_register('row.add()', function (row) {
      // Allow a jQuery object to be passed in - only a single row is added from
      // it though - the first element in the set
      if (row instanceof $ && row.length) {
        row = row[0];
      }
      var rows = this.iterator('table', function (settings) {
          if (row.nodeName && row.nodeName.toUpperCase() === 'TR') {
            return _fnAddTr(settings, row)[0];
          }
          return _fnAddData(settings, row);
        });
      // Return an Api.rows() extended instance, with the newly added row selected
      return this.row(rows[0]);
    });
    var __details_add = function (ctx, row, data, klass) {
      // Convert to array of TR elements
      var rows = [];
      var addRow = function (r, k) {
        // Recursion to allow for arrays of jQuery objects
        if ($.isArray(r) || r instanceof $) {
          for (var i = 0, ien = r.length; i < ien; i++) {
            addRow(r[i], k);
          }
          return;
        }
        // If we get a TR element, then just add it directly - up to the dev
        // to add the correct number of columns etc
        if (r.nodeName && r.nodeName.toLowerCase() === 'tr') {
          rows.push(r);
        } else {
          // Otherwise create a row with a wrapper
          var created = $('<tr><td/></tr>').addClass(k);
          $('td', created).addClass(k).html(r)[0].colSpan = _fnVisbleColumns(ctx);
          rows.push(created[0]);
        }
      };
      addRow(data, klass);
      if (row._details) {
        row._details.remove();
      }
      row._details = $(rows);
      // If the children were already shown, that state should be retained
      if (row._detailsShow) {
        row._details.insertAfter(row.nTr);
      }
    };
    var __details_remove = function (api, idx) {
      var ctx = api.context;
      if (ctx.length) {
        var row = ctx[0].aoData[idx !== undefined ? idx : api[0]];
        if (row._details) {
          row._details.remove();
          row._detailsShow = undefined;
          row._details = undefined;
        }
      }
    };
    var __details_display = function (api, show) {
      var ctx = api.context;
      if (ctx.length && api.length) {
        var row = ctx[0].aoData[api[0]];
        if (row._details) {
          row._detailsShow = show;
          if (show) {
            row._details.insertAfter(row.nTr);
          } else {
            row._details.detach();
          }
          __details_events(ctx[0]);
        }
      }
    };
    var __details_events = function (settings) {
      var api = new _Api(settings);
      var namespace = '.dt.DT_details';
      var drawEvent = 'draw' + namespace;
      var colvisEvent = 'column-visibility' + namespace;
      var destroyEvent = 'destroy' + namespace;
      var data = settings.aoData;
      api.off(drawEvent + ' ' + colvisEvent + ' ' + destroyEvent);
      if (_pluck(data, '_details').length > 0) {
        // On each draw, insert the required elements into the document
        api.on(drawEvent, function (e, ctx) {
          if (settings !== ctx) {
            return;
          }
          api.rows({ page: 'current' }).eq(0).each(function (idx) {
            // Internal data grab
            var row = data[idx];
            if (row._detailsShow) {
              row._details.insertAfter(row.nTr);
            }
          });
        });
        // Column visibility change - update the colspan
        api.on(colvisEvent, function (e, ctx, idx, vis) {
          if (settings !== ctx) {
            return;
          }
          // Update the colspan for the details rows (note, only if it already has
          // a colspan)
          var row, visible = _fnVisbleColumns(ctx);
          for (var i = 0, ien = data.length; i < ien; i++) {
            row = data[i];
            if (row._details) {
              row._details.children('td[colspan]').attr('colspan', visible);
            }
          }
        });
        // Table destroyed - nuke any child rows
        api.on(destroyEvent, function (e, ctx) {
          if (settings !== ctx) {
            return;
          }
          for (var i = 0, ien = data.length; i < ien; i++) {
            if (data[i]._details) {
              __details_remove(api, i);
            }
          }
        });
      }
    };
    // Strings for the method names to help minification
    var _emp = '';
    var _child_obj = _emp + 'row().child';
    var _child_mth = _child_obj + '()';
    // data can be:
    //  tr
    //  string
    //  jQuery or array of any of the above
    _api_register(_child_mth, function (data, klass) {
      var ctx = this.context;
      if (data === undefined) {
        // get
        return ctx.length && this.length ? ctx[0].aoData[this[0]]._details : undefined;
      } else if (data === true) {
        // show
        this.child.show();
      } else if (data === false) {
        // remove
        __details_remove(this);
      } else if (ctx.length && this.length) {
        // set
        __details_add(ctx[0], ctx[0].aoData[this[0]], data, klass);
      }
      return this;
    });
    _api_register([
      _child_obj + '.show()',
      _child_mth + '.show()'
    ], function (show) {
      // it returns an object and this method is not executed)
      __details_display(this, true);
      return this;
    });
    _api_register([
      _child_obj + '.hide()',
      _child_mth + '.hide()'
    ], function () {
      // it returns an object and this method is not executed)
      __details_display(this, false);
      return this;
    });
    _api_register([
      _child_obj + '.remove()',
      _child_mth + '.remove()'
    ], function () {
      // it returns an object and this method is not executed)
      __details_remove(this);
      return this;
    });
    _api_register(_child_obj + '.isShown()', function () {
      var ctx = this.context;
      if (ctx.length && this.length) {
        // _detailsShown as false or undefined will fall through to return false
        return ctx[0].aoData[this[0]]._detailsShow || false;
      }
      return false;
    });
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */
    // can be an array of these items, comma separated list, or an array of comma
    // separated lists
    var __re_column_selector = /^(.+):(name|visIdx|visible)$/;
    // r1 and r2 are redundant - but it means that the parameters match for the
    // iterator callback in columns().data()
    var __columnData = function (settings, column, r1, r2, rows) {
      var a = [];
      for (var row = 0, ien = rows.length; row < ien; row++) {
        a.push(_fnGetCellData(settings, rows[row], column));
      }
      return a;
    };
    var __column_selector = function (settings, selector, opts) {
      var columns = settings.aoColumns, names = _pluck(columns, 'sName'), nodes = _pluck(columns, 'nTh');
      var run = function (s) {
        var selInt = _intVal(s);
        // Selector - all
        if (s === '') {
          return _range(columns.length);
        }
        // Selector - index
        if (selInt !== null) {
          return [selInt >= 0 ? selInt : columns.length + selInt];
        }
        // Selector = function
        if (typeof s === 'function') {
          var rows = _selector_row_indexes(settings, opts);
          return $.map(columns, function (col, idx) {
            return s(idx, __columnData(settings, idx, 0, 0, rows), nodes[idx]) ? idx : null;
          });
        }
        // jQuery or string selector
        var match = typeof s === 'string' ? s.match(__re_column_selector) : '';
        if (match) {
          switch (match[2]) {
          case 'visIdx':
          case 'visible':
            var idx = parseInt(match[1], 10);
            // Visible index given, convert to column index
            if (idx < 0) {
              // Counting from the right
              var visColumns = $.map(columns, function (col, i) {
                  return col.bVisible ? i : null;
                });
              return [visColumns[visColumns.length + idx]];
            }
            // Counting from the left
            return [_fnVisibleToColumnIndex(settings, idx)];
          case 'name':
            // match by name. `names` is column index complete and in order
            return $.map(names, function (name, i) {
              return name === match[1] ? i : null;
            });
          }
        } else {
          // jQuery selector on the TH elements for the columns
          return $(nodes).filter(s).map(function () {
            return $.inArray(this, nodes);  // `nodes` is column index complete and in order
          }).toArray();
        }
      };
      return _selector_run('column', selector, run, settings, opts);
    };
    var __setColumnVis = function (settings, column, vis, recalc) {
      var cols = settings.aoColumns, col = cols[column], data = settings.aoData, row, cells, i, ien, tr;
      // Get
      if (vis === undefined) {
        return col.bVisible;
      }
      // Set
      // No change
      if (col.bVisible === vis) {
        return;
      }
      if (vis) {
        // Insert column
        // Need to decide if we should use appendChild or insertBefore
        var insertBefore = $.inArray(true, _pluck(cols, 'bVisible'), column + 1);
        for (i = 0, ien = data.length; i < ien; i++) {
          tr = data[i].nTr;
          cells = data[i].anCells;
          if (tr) {
            // insertBefore can act like appendChild if 2nd arg is null
            tr.insertBefore(cells[column], cells[insertBefore] || null);
          }
        }
      } else {
        // Remove column
        $(_pluck(settings.aoData, 'anCells', column)).detach();
      }
      // Common actions
      col.bVisible = vis;
      _fnDrawHead(settings, settings.aoHeader);
      _fnDrawHead(settings, settings.aoFooter);
      if (recalc === undefined || recalc) {
        // Automatically adjust column sizing
        _fnAdjustColumnSizing(settings);
        // Realign columns for scrolling
        if (settings.oScroll.sX || settings.oScroll.sY) {
          _fnScrollDraw(settings);
        }
      }
      _fnCallbackFire(settings, null, 'column-visibility', [
        settings,
        column,
        vis
      ]);
      _fnSaveState(settings);
    };
    _api_register('columns()', function (selector, opts) {
      // argument shifting
      if (selector === undefined) {
        selector = '';
      } else if ($.isPlainObject(selector)) {
        opts = selector;
        selector = '';
      }
      opts = _selector_opts(opts);
      var inst = this.iterator('table', function (settings) {
          return __column_selector(settings, selector, opts);
        }, 1);
      // Want argument shifting here and in _row_selector?
      inst.selector.cols = selector;
      inst.selector.opts = opts;
      return inst;
    });
    _api_registerPlural('columns().header()', 'column().header()', function (selector, opts) {
      return this.iterator('column', function (settings, column) {
        return settings.aoColumns[column].nTh;
      }, 1);
    });
    _api_registerPlural('columns().footer()', 'column().footer()', function (selector, opts) {
      return this.iterator('column', function (settings, column) {
        return settings.aoColumns[column].nTf;
      }, 1);
    });
    _api_registerPlural('columns().data()', 'column().data()', function () {
      return this.iterator('column-rows', __columnData, 1);
    });
    _api_registerPlural('columns().dataSrc()', 'column().dataSrc()', function () {
      return this.iterator('column', function (settings, column) {
        return settings.aoColumns[column].mData;
      }, 1);
    });
    _api_registerPlural('columns().cache()', 'column().cache()', function (type) {
      return this.iterator('column-rows', function (settings, column, i, j, rows) {
        return _pluck_order(settings.aoData, rows, type === 'search' ? '_aFilterData' : '_aSortData', column);
      }, 1);
    });
    _api_registerPlural('columns().nodes()', 'column().nodes()', function () {
      return this.iterator('column-rows', function (settings, column, i, j, rows) {
        return _pluck_order(settings.aoData, rows, 'anCells', column);
      }, 1);
    });
    _api_registerPlural('columns().visible()', 'column().visible()', function (vis, calc) {
      return this.iterator('column', function (settings, column) {
        if (vis === undefined) {
          return settings.aoColumns[column].bVisible;
        }
        // else
        __setColumnVis(settings, column, vis, calc);
      });
    });
    _api_registerPlural('columns().indexes()', 'column().index()', function (type) {
      return this.iterator('column', function (settings, column) {
        return type === 'visible' ? _fnColumnIndexToVisible(settings, column) : column;
      }, 1);
    });
    _api_register('columns.adjust()', function () {
      return this.iterator('table', function (settings) {
        _fnAdjustColumnSizing(settings);
      }, 1);
    });
    _api_register('column.index()', function (type, idx) {
      if (this.context.length !== 0) {
        var ctx = this.context[0];
        if (type === 'fromVisible' || type === 'toData') {
          return _fnVisibleToColumnIndex(ctx, idx);
        } else if (type === 'fromData' || type === 'toVisible') {
          return _fnColumnIndexToVisible(ctx, idx);
        }
      }
    });
    _api_register('column()', function (selector, opts) {
      return _selector_first(this.columns(selector, opts));
    });
    var __cell_selector = function (settings, selector, opts) {
      var data = settings.aoData;
      var rows = _selector_row_indexes(settings, opts);
      var cells = _removeEmpty(_pluck_order(data, rows, 'anCells'));
      var allCells = $([].concat.apply([], cells));
      var row;
      var columns = settings.aoColumns.length;
      var a, i, ien, j, o, host;
      var run = function (s) {
        var fnSelector = typeof s === 'function';
        if (s === null || s === undefined || fnSelector) {
          // All cells and function selectors
          a = [];
          for (i = 0, ien = rows.length; i < ien; i++) {
            row = rows[i];
            for (j = 0; j < columns; j++) {
              o = {
                row: row,
                column: j
              };
              if (fnSelector) {
                // Selector - function
                host = settings.aoData[row];
                if (s(o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null)) {
                  a.push(o);
                }
              } else {
                // Selector - all
                a.push(o);
              }
            }
          }
          return a;
        }
        // Selector - index
        if ($.isPlainObject(s)) {
          return [s];
        }
        // Selector - jQuery filtered cells
        return allCells.filter(s).map(function (i, el) {
          row = el.parentNode._DT_RowIndex;
          return {
            row: row,
            column: $.inArray(el, data[row].anCells)
          };
        }).toArray();
      };
      return _selector_run('cell', selector, run, settings, opts);
    };
    _api_register('cells()', function (rowSelector, columnSelector, opts) {
      // Argument shifting
      if ($.isPlainObject(rowSelector)) {
        // Indexes
        if (rowSelector.row === undefined) {
          // Selector options in first parameter
          opts = rowSelector;
          rowSelector = null;
        } else {
          // Cell index objects in first parameter
          opts = columnSelector;
          columnSelector = null;
        }
      }
      if ($.isPlainObject(columnSelector)) {
        opts = columnSelector;
        columnSelector = null;
      }
      // Cell selector
      if (columnSelector === null || columnSelector === undefined) {
        return this.iterator('table', function (settings) {
          return __cell_selector(settings, rowSelector, _selector_opts(opts));
        });
      }
      // Row + column selector
      var columns = this.columns(columnSelector, opts);
      var rows = this.rows(rowSelector, opts);
      var a, i, ien, j, jen;
      var cells = this.iterator('table', function (settings, idx) {
          a = [];
          for (i = 0, ien = rows[idx].length; i < ien; i++) {
            for (j = 0, jen = columns[idx].length; j < jen; j++) {
              a.push({
                row: rows[idx][i],
                column: columns[idx][j]
              });
            }
          }
          return a;
        }, 1);
      $.extend(cells.selector, {
        cols: columnSelector,
        rows: rowSelector,
        opts: opts
      });
      return cells;
    });
    _api_registerPlural('cells().nodes()', 'cell().node()', function () {
      return this.iterator('cell', function (settings, row, column) {
        var cells = settings.aoData[row].anCells;
        return cells ? cells[column] : undefined;
      }, 1);
    });
    _api_register('cells().data()', function () {
      return this.iterator('cell', function (settings, row, column) {
        return _fnGetCellData(settings, row, column);
      }, 1);
    });
    _api_registerPlural('cells().cache()', 'cell().cache()', function (type) {
      type = type === 'search' ? '_aFilterData' : '_aSortData';
      return this.iterator('cell', function (settings, row, column) {
        return settings.aoData[row][type][column];
      }, 1);
    });
    _api_registerPlural('cells().render()', 'cell().render()', function (type) {
      return this.iterator('cell', function (settings, row, column) {
        return _fnGetCellData(settings, row, column, type);
      }, 1);
    });
    _api_registerPlural('cells().indexes()', 'cell().index()', function () {
      return this.iterator('cell', function (settings, row, column) {
        return {
          row: row,
          column: column,
          columnVisible: _fnColumnIndexToVisible(settings, column)
        };
      }, 1);
    });
    _api_registerPlural('cells().invalidate()', 'cell().invalidate()', function (src) {
      return this.iterator('cell', function (settings, row, column) {
        _fnInvalidate(settings, row, src, column);
      });
    });
    _api_register('cell()', function (rowSelector, columnSelector, opts) {
      return _selector_first(this.cells(rowSelector, columnSelector, opts));
    });
    _api_register('cell().data()', function (data) {
      var ctx = this.context;
      var cell = this[0];
      if (data === undefined) {
        // Get
        return ctx.length && cell.length ? _fnGetCellData(ctx[0], cell[0].row, cell[0].column) : undefined;
      }
      // Set
      _fnSetCellData(ctx[0], cell[0].row, cell[0].column, data);
      _fnInvalidate(ctx[0], cell[0].row, 'data', cell[0].column);
      return this;
    });
    /**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 */
    /**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 */
    /**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 */
    /**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
    _api_register('order()', function (order, dir) {
      var ctx = this.context;
      if (order === undefined) {
        // get
        return ctx.length !== 0 ? ctx[0].aaSorting : undefined;
      }
      // set
      if (typeof order === 'number') {
        // Simple column / direction passed in
        order = [[
            order,
            dir
          ]];
      } else if (!$.isArray(order[0])) {
        // Arguments passed in (list of 1D arrays)
        order = Array.prototype.slice.call(arguments);
      }
      // otherwise a 2D array was passed in
      return this.iterator('table', function (settings) {
        settings.aaSorting = order.slice();
      });
    });
    /**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
    _api_register('order.listener()', function (node, column, callback) {
      return this.iterator('table', function (settings) {
        _fnSortAttachListener(settings, node, column, callback);
      });
    });
    // Order by the selected column(s)
    _api_register([
      'columns().order()',
      'column().order()'
    ], function (dir) {
      var that = this;
      return this.iterator('table', function (settings, i) {
        var sort = [];
        $.each(that[i], function (j, col) {
          sort.push([
            col,
            dir
          ]);
        });
        settings.aaSorting = sort;
      });
    });
    _api_register('search()', function (input, regex, smart, caseInsen) {
      var ctx = this.context;
      if (input === undefined) {
        // get
        return ctx.length !== 0 ? ctx[0].oPreviousSearch.sSearch : undefined;
      }
      // set
      return this.iterator('table', function (settings) {
        if (!settings.oFeatures.bFilter) {
          return;
        }
        _fnFilterComplete(settings, $.extend({}, settings.oPreviousSearch, {
          'sSearch': input + '',
          'bRegex': regex === null ? false : regex,
          'bSmart': smart === null ? true : smart,
          'bCaseInsensitive': caseInsen === null ? true : caseInsen
        }), 1);
      });
    });
    _api_registerPlural('columns().search()', 'column().search()', function (input, regex, smart, caseInsen) {
      return this.iterator('column', function (settings, column) {
        var preSearch = settings.aoPreSearchCols;
        if (input === undefined) {
          // get
          return preSearch[column].sSearch;
        }
        // set
        if (!settings.oFeatures.bFilter) {
          return;
        }
        $.extend(preSearch[column], {
          'sSearch': input + '',
          'bRegex': regex === null ? false : regex,
          'bSmart': smart === null ? true : smart,
          'bCaseInsensitive': caseInsen === null ? true : caseInsen
        });
        _fnFilterComplete(settings, settings.oPreviousSearch, 1);
      });
    });
    /*
	 * State API methods
	 */
    _api_register('state()', function () {
      return this.context.length ? this.context[0].oSavedState : null;
    });
    _api_register('state.clear()', function () {
      return this.iterator('table', function (settings) {
        // Save an empty object
        settings.fnStateSaveCallback.call(settings.oInstance, settings, {});
      });
    });
    _api_register('state.loaded()', function () {
      return this.context.length ? this.context[0].oLoadedState : null;
    });
    _api_register('state.save()', function () {
      return this.iterator('table', function (settings) {
        _fnSaveState(settings);
      });
    });
    /**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
    DataTable.versionCheck = DataTable.fnVersionCheck = function (version) {
      var aThis = DataTable.version.split('.');
      var aThat = version.split('.');
      var iThis, iThat;
      for (var i = 0, iLen = aThat.length; i < iLen; i++) {
        iThis = parseInt(aThis[i], 10) || 0;
        iThat = parseInt(aThat[i], 10) || 0;
        // Parts are the same, keep comparing
        if (iThis === iThat) {
          continue;
        }
        // Parts are different, return immediately
        return iThis > iThat;
      }
      return true;
    };
    /**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
    DataTable.isDataTable = DataTable.fnIsDataTable = function (table) {
      var t = $(table).get(0);
      var is = false;
      $.each(DataTable.settings, function (i, o) {
        var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
        var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;
        if (o.nTable === t || head === t || foot === t) {
          is = true;
        }
      });
      return is;
    };
    /**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
    DataTable.tables = DataTable.fnTables = function (visible) {
      return $.map(DataTable.settings, function (o) {
        if (!visible || visible && $(o.nTable).is(':visible')) {
          return o.nTable;
        }
      });
    };
    /**
	 * DataTables utility methods
	 *
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
    DataTable.util = {
      throttle: _fnThrottle,
      escapeRegex: _fnEscapeRegex
    };
    /**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
    DataTable.camelToHungarian = _fnCamelToHungarian;
    /**
	 *
	 */
    _api_register('$()', function (selector, opts) {
      var rows = this.rows(opts).nodes(),
        // Get all rows
        jqRows = $(rows);
      return $([].concat(jqRows.filter(selector).toArray(), jqRows.find(selector).toArray()));
    });
    // jQuery functions to operate on the tables
    $.each([
      'on',
      'one',
      'off'
    ], function (i, key) {
      _api_register(key + '()', function () {
        var args = Array.prototype.slice.call(arguments);
        // Add the `dt` namespace automatically if it isn't already present
        if (!args[0].match(/\.dt\b/)) {
          args[0] += '.dt';
        }
        var inst = $(this.tables().nodes());
        inst[key].apply(inst, args);
        return this;
      });
    });
    _api_register('clear()', function () {
      return this.iterator('table', function (settings) {
        _fnClearTable(settings);
      });
    });
    _api_register('settings()', function () {
      return new _Api(this.context, this.context);
    });
    _api_register('init()', function () {
      var ctx = this.context;
      return ctx.length ? ctx[0].oInit : null;
    });
    _api_register('data()', function () {
      return this.iterator('table', function (settings) {
        return _pluck(settings.aoData, '_aData');
      }).flatten();
    });
    _api_register('destroy()', function (remove) {
      remove = remove || false;
      return this.iterator('table', function (settings) {
        var orig = settings.nTableWrapper.parentNode;
        var classes = settings.oClasses;
        var table = settings.nTable;
        var tbody = settings.nTBody;
        var thead = settings.nTHead;
        var tfoot = settings.nTFoot;
        var jqTable = $(table);
        var jqTbody = $(tbody);
        var jqWrapper = $(settings.nTableWrapper);
        var rows = $.map(settings.aoData, function (r) {
            return r.nTr;
          });
        var i, ien;
        // Flag to note that the table is currently being destroyed - no action
        // should be taken
        settings.bDestroying = true;
        // Fire off the destroy callbacks for plug-ins etc
        _fnCallbackFire(settings, 'aoDestroyCallback', 'destroy', [settings]);
        // If not being removed from the document, make all columns visible
        if (!remove) {
          new _Api(settings).columns().visible(true);
        }
        // Blitz all `DT` namespaced events (these are internal events, the
        // lowercase, `dt` events are user subscribed and they are responsible
        // for removing them
        jqWrapper.unbind('.DT').find(':not(tbody *)').unbind('.DT');
        $(window).unbind('.DT-' + settings.sInstance);
        // When scrolling we had to break the table up - restore it
        if (table != thead.parentNode) {
          jqTable.children('thead').detach();
          jqTable.append(thead);
        }
        if (tfoot && table != tfoot.parentNode) {
          jqTable.children('tfoot').detach();
          jqTable.append(tfoot);
        }
        // Remove the DataTables generated nodes, events and classes
        jqTable.detach();
        jqWrapper.detach();
        settings.aaSorting = [];
        settings.aaSortingFixed = [];
        _fnSortingClasses(settings);
        $(rows).removeClass(settings.asStripeClasses.join(' '));
        $('th, td', thead).removeClass(classes.sSortable + ' ' + classes.sSortableAsc + ' ' + classes.sSortableDesc + ' ' + classes.sSortableNone);
        if (settings.bJUI) {
          $('th span.' + classes.sSortIcon + ', td span.' + classes.sSortIcon, thead).detach();
          $('th, td', thead).each(function () {
            var wrapper = $('div.' + classes.sSortJUIWrapper, this);
            $(this).append(wrapper.contents());
            wrapper.detach();
          });
        }
        if (!remove && orig) {
          // insertBefore acts like appendChild if !arg[1]
          orig.insertBefore(table, settings.nTableReinsertBefore);
        }
        // Add the TR elements back into the table in their original order
        jqTbody.children().detach();
        jqTbody.append(rows);
        // Restore the width of the original table - was read from the style property,
        // so we can restore directly to that
        jqTable.css('width', settings.sDestroyWidth).removeClass(classes.sTable);
        // If the were originally stripe classes - then we add them back here.
        // Note this is not fool proof (for example if not all rows had stripe
        // classes - but it's a good effort without getting carried away
        ien = settings.asDestroyStripes.length;
        if (ien) {
          jqTbody.children().each(function (i) {
            $(this).addClass(settings.asDestroyStripes[i % ien]);
          });
        }
        /* Remove the settings object from the settings array */
        var idx = $.inArray(settings, DataTable.settings);
        if (idx !== -1) {
          DataTable.settings.splice(idx, 1);
        }
      });
    });
    // Add the `every()` method for rows, columns and cells in a compact form
    $.each([
      'column',
      'row',
      'cell'
    ], function (i, type) {
      _api_register(type + 's().every()', function (fn) {
        return this.iterator(type, function (settings, idx, idx2) {
          // idx2 is undefined for rows and columns.
          fn.call(new _Api(settings)[type](idx, idx2));
        });
      });
    });
    // i18n method for extensions to be able to use the language object from the
    // DataTable
    _api_register('i18n()', function (token, def, plural) {
      var ctx = this.context[0];
      var resolved = _fnGetObjectDataFn(token)(ctx.oLanguage);
      if (resolved === undefined) {
        resolved = def;
      }
      if (plural !== undefined && $.isPlainObject(resolved)) {
        resolved = resolved[plural] !== undefined ? resolved[plural] : resolved._;
      }
      return resolved.replace('%d', plural);  // nb: plural might be undefined,
    });
    /**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
    DataTable.version = '1.10.7';
    /**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
    DataTable.settings = [];
    /**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
    DataTable.models = {};
    /**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
    DataTable.models.oSearch = {
      'bCaseInsensitive': true,
      'sSearch': '',
      'bRegex': false,
      'bSmart': true
    };
    /**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
    DataTable.models.oRow = {
      'nTr': null,
      'anCells': null,
      '_aData': [],
      '_aSortData': null,
      '_aFilterData': null,
      '_sFilterRow': null,
      '_sRowStripe': '',
      'src': null
    };
    /**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
    DataTable.models.oColumn = {
      'idx': null,
      'aDataSort': null,
      'asSorting': null,
      'bSearchable': null,
      'bSortable': null,
      'bVisible': null,
      '_sManualType': null,
      '_bAttrSrc': false,
      'fnCreatedCell': null,
      'fnGetData': null,
      'fnSetData': null,
      'mData': null,
      'mRender': null,
      'nTh': null,
      'nTf': null,
      'sClass': null,
      'sContentPadding': null,
      'sDefaultContent': null,
      'sName': null,
      'sSortDataType': 'std',
      'sSortingClass': null,
      'sSortingClassJUI': null,
      'sTitle': null,
      'sType': null,
      'sWidth': null,
      'sWidthOrig': null
    };
    /*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */
    /**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
    DataTable.defaults = {
      'aaData': null,
      'aaSorting': [[
          0,
          'asc'
        ]],
      'aaSortingFixed': [],
      'ajax': null,
      'aLengthMenu': [
        10,
        25,
        50,
        100
      ],
      'aoColumns': null,
      'aoColumnDefs': null,
      'aoSearchCols': [],
      'asStripeClasses': null,
      'bAutoWidth': true,
      'bDeferRender': false,
      'bDestroy': false,
      'bFilter': true,
      'bInfo': true,
      'bJQueryUI': false,
      'bLengthChange': true,
      'bPaginate': true,
      'bProcessing': false,
      'bRetrieve': false,
      'bScrollCollapse': false,
      'bServerSide': false,
      'bSort': true,
      'bSortMulti': true,
      'bSortCellsTop': false,
      'bSortClasses': true,
      'bStateSave': false,
      'fnCreatedRow': null,
      'fnDrawCallback': null,
      'fnFooterCallback': null,
      'fnFormatNumber': function (toFormat) {
        return toFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, this.oLanguage.sThousands);
      },
      'fnHeaderCallback': null,
      'fnInfoCallback': null,
      'fnInitComplete': null,
      'fnPreDrawCallback': null,
      'fnRowCallback': null,
      'fnServerData': null,
      'fnServerParams': null,
      'fnStateLoadCallback': function (settings) {
        try {
          return JSON.parse((settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem('DataTables_' + settings.sInstance + '_' + location.pathname));
        } catch (e) {
        }
      },
      'fnStateLoadParams': null,
      'fnStateLoaded': null,
      'fnStateSaveCallback': function (settings, data) {
        try {
          (settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem('DataTables_' + settings.sInstance + '_' + location.pathname, JSON.stringify(data));
        } catch (e) {
        }
      },
      'fnStateSaveParams': null,
      'iStateDuration': 7200,
      'iDeferLoading': null,
      'iDisplayLength': 10,
      'iDisplayStart': 0,
      'iTabIndex': 0,
      'oClasses': {},
      'oLanguage': {
        'oAria': {
          'sSortAscending': ': activate to sort column ascending',
          'sSortDescending': ': activate to sort column descending'
        },
        'oPaginate': {
          'sFirst': 'First',
          'sLast': 'Last',
          'sNext': 'Next',
          'sPrevious': 'Previous'
        },
        'sEmptyTable': 'No data available in table',
        'sInfo': 'Showing _START_ to _END_ of _TOTAL_ entries',
        'sInfoEmpty': 'Showing 0 to 0 of 0 entries',
        'sInfoFiltered': '(filtered from _MAX_ total entries)',
        'sInfoPostFix': '',
        'sDecimal': '',
        'sThousands': ',',
        'sLengthMenu': 'Show _MENU_ entries',
        'sLoadingRecords': 'Loading...',
        'sProcessing': 'Processing...',
        'sSearch': 'Search:',
        'sSearchPlaceholder': '',
        'sUrl': '',
        'sZeroRecords': 'No matching records found'
      },
      'oSearch': $.extend({}, DataTable.models.oSearch),
      'sAjaxDataProp': 'data',
      'sAjaxSource': null,
      'sDom': 'lfrtip',
      'searchDelay': null,
      'sPaginationType': 'simple_numbers',
      'sScrollX': '',
      'sScrollXInner': '',
      'sScrollY': '',
      'sServerMethod': 'GET',
      'renderer': null
    };
    _fnHungarianMap(DataTable.defaults);
    /*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */
    /**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
    DataTable.defaults.column = {
      'aDataSort': null,
      'iDataSort': -1,
      'asSorting': [
        'asc',
        'desc'
      ],
      'bSearchable': true,
      'bSortable': true,
      'bVisible': true,
      'fnCreatedCell': null,
      'mData': null,
      'mRender': null,
      'sCellType': 'td',
      'sClass': '',
      'sContentPadding': '',
      'sDefaultContent': null,
      'sName': '',
      'sSortDataType': 'std',
      'sTitle': null,
      'sType': null,
      'sWidth': null
    };
    _fnHungarianMap(DataTable.defaults.column);
    /**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
    DataTable.models.oSettings = {
      'oFeatures': {
        'bAutoWidth': null,
        'bDeferRender': null,
        'bFilter': null,
        'bInfo': null,
        'bLengthChange': null,
        'bPaginate': null,
        'bProcessing': null,
        'bServerSide': null,
        'bSort': null,
        'bSortMulti': null,
        'bSortClasses': null,
        'bStateSave': null
      },
      'oScroll': {
        'bCollapse': null,
        'iBarWidth': 0,
        'sX': null,
        'sXInner': null,
        'sY': null
      },
      'oLanguage': { 'fnInfoCallback': null },
      'oBrowser': {
        'bScrollOversize': false,
        'bScrollbarLeft': false
      },
      'ajax': null,
      'aanFeatures': [],
      'aoData': [],
      'aiDisplay': [],
      'aiDisplayMaster': [],
      'aoColumns': [],
      'aoHeader': [],
      'aoFooter': [],
      'oPreviousSearch': {},
      'aoPreSearchCols': [],
      'aaSorting': null,
      'aaSortingFixed': [],
      'asStripeClasses': null,
      'asDestroyStripes': [],
      'sDestroyWidth': 0,
      'aoRowCallback': [],
      'aoHeaderCallback': [],
      'aoFooterCallback': [],
      'aoDrawCallback': [],
      'aoRowCreatedCallback': [],
      'aoPreDrawCallback': [],
      'aoInitComplete': [],
      'aoStateSaveParams': [],
      'aoStateLoadParams': [],
      'aoStateLoaded': [],
      'sTableId': '',
      'nTable': null,
      'nTHead': null,
      'nTFoot': null,
      'nTBody': null,
      'nTableWrapper': null,
      'bDeferLoading': false,
      'bInitialised': false,
      'aoOpenRows': [],
      'sDom': null,
      'searchDelay': null,
      'sPaginationType': 'two_button',
      'iStateDuration': 0,
      'aoStateSave': [],
      'aoStateLoad': [],
      'oSavedState': null,
      'oLoadedState': null,
      'sAjaxSource': null,
      'sAjaxDataProp': null,
      'bAjaxDataGet': true,
      'jqXHR': null,
      'json': undefined,
      'oAjaxData': undefined,
      'fnServerData': null,
      'aoServerParams': [],
      'sServerMethod': null,
      'fnFormatNumber': null,
      'aLengthMenu': null,
      'iDraw': 0,
      'bDrawing': false,
      'iDrawError': -1,
      '_iDisplayLength': 10,
      '_iDisplayStart': 0,
      '_iRecordsTotal': 0,
      '_iRecordsDisplay': 0,
      'bJUI': null,
      'oClasses': {},
      'bFiltered': false,
      'bSorted': false,
      'bSortCellsTop': null,
      'oInit': null,
      'aoDestroyCallback': [],
      'fnRecordsTotal': function () {
        return _fnDataSource(this) == 'ssp' ? this._iRecordsTotal * 1 : this.aiDisplayMaster.length;
      },
      'fnRecordsDisplay': function () {
        return _fnDataSource(this) == 'ssp' ? this._iRecordsDisplay * 1 : this.aiDisplay.length;
      },
      'fnDisplayEnd': function () {
        var len = this._iDisplayLength, start = this._iDisplayStart, calc = start + len, records = this.aiDisplay.length, features = this.oFeatures, paginate = features.bPaginate;
        if (features.bServerSide) {
          return paginate === false || len === -1 ? start + records : Math.min(start + len, this._iRecordsDisplay);
        } else {
          return !paginate || calc > records || len === -1 ? records : calc;
        }
      },
      'oInstance': null,
      'sInstance': null,
      'iTabIndex': 0,
      'nScrollHead': null,
      'nScrollFoot': null,
      'aLastSort': [],
      'oPlugins': {}
    };
    /**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */
    /**
	 * DataTables extensions
	 *
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
    DataTable.ext = _ext = {
      buttons: {},
      classes: {},
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
      fnVersionCheck: DataTable.fnVersionCheck,
      iApiIndex: 0,
      oJUIClasses: {},
      sVersion: DataTable.version
    };
    //
    // Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
    //
    $.extend(_ext, {
      afnFiltering: _ext.search,
      aTypes: _ext.type.detect,
      ofnSearch: _ext.type.search,
      oSort: _ext.type.order,
      afnSortData: _ext.order,
      aoFeatures: _ext.feature,
      oApi: _ext.internal,
      oStdClasses: _ext.classes,
      oPagination: _ext.pager
    });
    $.extend(DataTable.ext.classes, {
      'sTable': 'dataTable',
      'sNoFooter': 'no-footer',
      'sPageButton': 'btn btn-default',
      'sPageButtonActive': 'current',
      'sPageButtonDisabled': 'disabled',
      'sStripeOdd': 'odd',
      'sStripeEven': 'even',
      'sRowEmpty': 'dataTables_empty',
      'sWrapper': 'dataTables_wrapper',
      'sFilter': 'dataTables_filter',
      'sInfo': 'dataTables_info',
      'sPaging': 'dataTables_paginate paging_',
      'sLength': 'dataTables_length',
      'sProcessing': 'dataTables_processing',
      'sSortAsc': 'sorting_asc',
      'sSortDesc': 'sorting_desc',
      'sSortable': 'sorting',
      'sSortableAsc': 'sorting_asc_disabled',
      'sSortableDesc': 'sorting_desc_disabled',
      'sSortableNone': 'sorting_disabled',
      'sSortColumn': 'sorting_',
      'sFilterInput': '',
      'sLengthSelect': '',
      'sScrollWrapper': 'dataTables_scroll',
      'sScrollHead': 'dataTables_scrollHead',
      'sScrollHeadInner': 'dataTables_scrollHeadInner',
      'sScrollBody': 'dataTables_scrollBody',
      'sScrollFoot': 'dataTables_scrollFoot',
      'sScrollFootInner': 'dataTables_scrollFootInner',
      'sHeaderTH': '',
      'sFooterTH': '',
      'sSortJUIAsc': '',
      'sSortJUIDesc': '',
      'sSortJUI': '',
      'sSortJUIAscAllowed': '',
      'sSortJUIDescAllowed': '',
      'sSortJUIWrapper': '',
      'sSortIcon': '',
      'sJUIHeader': '',
      'sJUIFooter': ''
    });
    (function () {
      // Reused strings for better compression. Closure compiler appears to have a
      // weird edge case where it is trying to expand strings rather than use the
      // variable version. This results in about 200 bytes being added, for very
      // little preference benefit since it this run on script load only.
      var _empty = '';
      _empty = '';
      var _stateDefault = _empty + 'ui-state-default';
      var _sortIcon = _empty + 'css_right ui-icon ui-icon-';
      var _headerFooter = _empty + 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix';
      $.extend(DataTable.ext.oJUIClasses, DataTable.ext.classes, {
        'sPageButton': 'fg-button ui-button ' + _stateDefault,
        'sPageButtonActive': 'ui-state-disabled',
        'sPageButtonDisabled': 'ui-state-disabled',
        'sPaging': 'dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ' + 'ui-buttonset-multi paging_',
        'sSortAsc': _stateDefault + ' sorting_asc',
        'sSortDesc': _stateDefault + ' sorting_desc',
        'sSortable': _stateDefault + ' sorting',
        'sSortableAsc': _stateDefault + ' sorting_asc_disabled',
        'sSortableDesc': _stateDefault + ' sorting_desc_disabled',
        'sSortableNone': _stateDefault + ' sorting_disabled',
        'sSortJUIAsc': _sortIcon + 'triangle-1-n',
        'sSortJUIDesc': _sortIcon + 'triangle-1-s',
        'sSortJUI': _sortIcon + 'carat-2-n-s',
        'sSortJUIAscAllowed': _sortIcon + 'carat-1-n',
        'sSortJUIDescAllowed': _sortIcon + 'carat-1-s',
        'sSortJUIWrapper': 'DataTables_sort_wrapper',
        'sSortIcon': 'DataTables_sort_icon',
        'sScrollHead': 'dataTables_scrollHead ' + _stateDefault,
        'sScrollFoot': 'dataTables_scrollFoot ' + _stateDefault,
        'sHeaderTH': _stateDefault,
        'sFooterTH': _stateDefault,
        'sJUIHeader': _headerFooter + ' ui-corner-tl ui-corner-tr',
        'sJUIFooter': _headerFooter + ' ui-corner-bl ui-corner-br'
      });
    }());
    var extPagination = DataTable.ext.pager;
    function _numbers(page, pages) {
      var numbers = [], buttons = extPagination.numbers_length, half = Math.floor(buttons / 2), i = 1;
      if (pages <= buttons) {
        numbers = _range(0, pages);
      } else if (page <= half) {
        numbers = _range(0, buttons - 2);
        numbers.push('ellipsis');
        numbers.push(pages - 1);
      } else if (page >= pages - 1 - half) {
        numbers = _range(pages - (buttons - 2), pages);
        numbers.splice(0, 0, 'ellipsis');
        // no unshift in ie6
        numbers.splice(0, 0, 0);
      } else {
        numbers = _range(page - half + 2, page + half - 1);
        numbers.push('ellipsis');
        numbers.push(pages - 1);
        numbers.splice(0, 0, 'ellipsis');
        numbers.splice(0, 0, 0);
      }
      numbers.DT_el = 'span';
      return numbers;
    }
    $.extend(extPagination, {
      simple: function (page, pages) {
        return [
          'previous',
          'next'
        ];
      },
      full: function (page, pages) {
        return [
          'first',
          'previous',
          'next',
          'last'
        ];
      },
      simple_numbers: function (page, pages) {
        return [
          'previous',
          _numbers(page, pages),
          'next'
        ];
      },
      full_numbers: function (page, pages) {
        return [
          'first',
          'previous',
          _numbers(page, pages),
          'next',
          'last'
        ];
      },
      _numbers: _numbers,
      numbers_length: 7
    });
    $.extend(true, DataTable.ext.renderer, {
      pageButton: {
        _: function (settings, host, idx, buttons, page, pages) {
          var classes = settings.oClasses;
          var lang = settings.oLanguage.oPaginate;
          var btnDisplay, btnClass, counter = 0;
          var attach = function (container, buttons) {
            var i, ien, node, button;
            var clickHandler = function (e) {
              _fnPageChange(settings, e.data.action, true);
            };
            for (i = 0, ien = buttons.length; i < ien; i++) {
              button = buttons[i];
              if ($.isArray(button)) {
                var inner = $('<' + (button.DT_el || 'div') + '/>').appendTo(container);
                attach(inner, button);
              } else {
                btnDisplay = '';
                btnClass = '';
                switch (button) {
                case 'ellipsis':
                  container.append('<span class="ellipsis">&#x2026;</span>');
                  break;
                case 'first':
                  btnDisplay = lang.sFirst;
                  btnClass = button + (page > 0 ? '' : ' ' + classes.sPageButtonDisabled);
                  break;
                case 'previous':
                  btnDisplay = lang.sPrevious;
                  btnClass = button + (page > 0 ? '' : ' ' + classes.sPageButtonDisabled);
                  break;
                case 'next':
                  btnDisplay = lang.sNext;
                  btnClass = button + (page < pages - 1 ? '' : ' ' + classes.sPageButtonDisabled);
                  break;
                case 'last':
                  btnDisplay = lang.sLast;
                  btnClass = button + (page < pages - 1 ? '' : ' ' + classes.sPageButtonDisabled);
                  break;
                default:
                  btnDisplay = button + 1;
                  btnClass = page === button ? classes.sPageButtonActive : '';
                  break;
                }
                if (btnDisplay) {
                  node = $('<a>', {
                    'class': classes.sPageButton + ' ' + btnClass,
                    'aria-controls': settings.sTableId,
                    'data-dt-idx': counter,
                    'tabindex': settings.iTabIndex,
                    'id': idx === 0 && typeof button === 'string' ? settings.sTableId + '_' + button : null
                  }).html(btnDisplay).appendTo(container);
                  _fnBindAction(node, { action: button }, clickHandler);
                  counter++;
                }
              }
            }
          };
          // IE9 throws an 'unknown error' if document.activeElement is used
          // inside an iframe or frame. Try / catch the error. Not good for
          // accessibility, but neither are frames.
          var activeEl;
          try {
            // Because this approach is destroying and recreating the paging
            // elements, focus is lost on the select button which is bad for
            // accessibility. So we want to restore focus once the draw has
            // completed
            activeEl = $(document.activeElement).data('dt-idx');
          } catch (e) {
          }
          attach($(host).empty(), buttons);
          if (activeEl) {
            $(host).find('[data-dt-idx=' + activeEl + ']').focus();
          }
        }
      }
    });
    // Built in type detection. See model.ext.aTypes for information about
    // what is required from this methods.
    $.extend(DataTable.ext.type.detect, [
      function (d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _isNumber(d, decimal) ? 'num' + decimal : null;
      },
      function (d, settings) {
        // V8 will remove any unknown characters at the start and end of the
        // expression, leading to false matches such as `$245.12` or `10%` being
        // a valid date. See forum thread 18941 for detail.
        if (d && !(d instanceof Date) && (!_re_date_start.test(d) || !_re_date_end.test(d))) {
          return null;
        }
        var parsed = Date.parse(d);
        return parsed !== null && !isNaN(parsed) || _empty(d) ? 'date' : null;
      },
      function (d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _isNumber(d, decimal, true) ? 'num-fmt' + decimal : null;
      },
      function (d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _htmlNumeric(d, decimal) ? 'html-num' + decimal : null;
      },
      function (d, settings) {
        var decimal = settings.oLanguage.sDecimal;
        return _htmlNumeric(d, decimal, true) ? 'html-num-fmt' + decimal : null;
      },
      function (d, settings) {
        return _empty(d) || typeof d === 'string' && d.indexOf('<') !== -1 ? 'html' : null;
      }
    ]);
    // Filter formatting functions. See model.ext.ofnSearch for information about
    // what is required from these methods.
    //
    // Note that additional search methods are added for the html numbers and
    // html formatted numbers by `_addNumericSort()` when we know what the decimal
    // place is
    $.extend(DataTable.ext.type.search, {
      html: function (data) {
        return _empty(data) ? data : typeof data === 'string' ? data.replace(_re_new_lines, ' ').replace(_re_html, '') : '';
      },
      string: function (data) {
        return _empty(data) ? data : typeof data === 'string' ? data.replace(_re_new_lines, ' ') : data;
      }
    });
    var __numericReplace = function (d, decimalPlace, re1, re2) {
      if (d !== 0 && (!d || d === '-')) {
        return -Infinity;
      }
      // If a decimal place other than `.` is used, it needs to be given to the
      // function so we can detect it and replace with a `.` which is the only
      // decimal place Javascript recognises - it is not locale aware.
      if (decimalPlace) {
        d = _numToDecimal(d, decimalPlace);
      }
      if (d.replace) {
        if (re1) {
          d = d.replace(re1, '');
        }
        if (re2) {
          d = d.replace(re2, '');
        }
      }
      return d * 1;
    };
    // Add the numeric 'deformatting' functions for sorting and search. This is done
    // in a function to provide an easy ability for the language options to add
    // additional methods if a non-period decimal place is used.
    function _addNumericSort(decimalPlace) {
      $.each({
        'num': function (d) {
          return __numericReplace(d, decimalPlace);
        },
        'num-fmt': function (d) {
          return __numericReplace(d, decimalPlace, _re_formatted_numeric);
        },
        'html-num': function (d) {
          return __numericReplace(d, decimalPlace, _re_html);
        },
        'html-num-fmt': function (d) {
          return __numericReplace(d, decimalPlace, _re_html, _re_formatted_numeric);
        }
      }, function (key, fn) {
        // Add the ordering method
        _ext.type.order[key + decimalPlace + '-pre'] = fn;
        // For HTML types add a search formatter that will strip the HTML
        if (key.match(/^html\-/)) {
          _ext.type.search[key + decimalPlace] = _ext.type.search.html;
        }
      });
    }
    // Default sort methods
    $.extend(_ext.type.order, {
      'date-pre': function (d) {
        return Date.parse(d) || 0;
      },
      'html-pre': function (a) {
        return _empty(a) ? '' : a.replace ? a.replace(/<.*?>/g, '').toLowerCase() : a + '';
      },
      'string-pre': function (a) {
        // This is a little complex, but faster than always calling toString,
        // http://jsperf.com/tostring-v-check
        return _empty(a) ? '' : typeof a === 'string' ? a.toLowerCase() : !a.toString ? '' : a.toString();
      },
      'string-asc': function (x, y) {
        return x < y ? -1 : x > y ? 1 : 0;
      },
      'string-desc': function (x, y) {
        return x < y ? 1 : x > y ? -1 : 0;
      }
    });
    // Numeric sorting types - order doesn't matter here
    _addNumericSort('');
    $.extend(true, DataTable.ext.renderer, {
      header: {
        _: function (settings, cell, column, classes) {
          // No additional mark-up required
          // Attach a sort listener to update on sort - note that using the
          // `DT` namespace will allow the event to be removed automatically
          // on destroy, while the `dt` namespaced event is the one we are
          // listening for
          $(settings.nTable).on('order.dt.DT', function (e, ctx, sorting, columns) {
            if (settings !== ctx) {
              // need to check this this is the host
              return;  // table, not a nested one
            }
            var colIdx = column.idx;
            cell.removeClass(column.sSortingClass + ' ' + classes.sSortAsc + ' ' + classes.sSortDesc).addClass(columns[colIdx] == 'asc' ? classes.sSortAsc : columns[colIdx] == 'desc' ? classes.sSortDesc : column.sSortingClass);
          });
        },
        jqueryui: function (settings, cell, column, classes) {
          $('<div/>').addClass(classes.sSortJUIWrapper).append(cell.contents()).append($('<span/>').addClass(classes.sSortIcon + ' ' + column.sSortingClassJUI)).appendTo(cell);
          // Attach a sort listener to update on sort
          $(settings.nTable).on('order.dt.DT', function (e, ctx, sorting, columns) {
            if (settings !== ctx) {
              return;
            }
            var colIdx = column.idx;
            cell.removeClass(classes.sSortAsc + ' ' + classes.sSortDesc).addClass(columns[colIdx] == 'asc' ? classes.sSortAsc : columns[colIdx] == 'desc' ? classes.sSortDesc : column.sSortingClass);
            cell.find('span.' + classes.sSortIcon).removeClass(classes.sSortJUIAsc + ' ' + classes.sSortJUIDesc + ' ' + classes.sSortJUI + ' ' + classes.sSortJUIAscAllowed + ' ' + classes.sSortJUIDescAllowed).addClass(columns[colIdx] == 'asc' ? classes.sSortJUIAsc : columns[colIdx] == 'desc' ? classes.sSortJUIDesc : column.sSortingClassJUI);
          });
        }
      }
    });
    /*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */
    /**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 4 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
    DataTable.render = {
      number: function (thousands, decimal, precision, prefix) {
        return {
          display: function (d) {
            if (typeof d !== 'number' && typeof d !== 'string') {
              return d;
            }
            var negative = d < 0 ? '-' : '';
            d = Math.abs(parseFloat(d));
            var intPart = parseInt(d, 10);
            var floatPart = precision ? decimal + (d - intPart).toFixed(precision).substring(2) : '';
            return negative + (prefix || '') + intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + floatPart;
          }
        };
      }
    };
    /*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */
    /**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
    function _fnExternApiFunc(fn) {
      return function () {
        var args = [_fnSettingsFromNode(this[DataTable.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
        return DataTable.ext.internal[fn].apply(this, args);
      };
    }
    /**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
    $.extend(DataTable.ext.internal, {
      _fnExternApiFunc: _fnExternApiFunc,
      _fnBuildAjax: _fnBuildAjax,
      _fnAjaxUpdate: _fnAjaxUpdate,
      _fnAjaxParameters: _fnAjaxParameters,
      _fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
      _fnAjaxDataSrc: _fnAjaxDataSrc,
      _fnAddColumn: _fnAddColumn,
      _fnColumnOptions: _fnColumnOptions,
      _fnAdjustColumnSizing: _fnAdjustColumnSizing,
      _fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
      _fnColumnIndexToVisible: _fnColumnIndexToVisible,
      _fnVisbleColumns: _fnVisbleColumns,
      _fnGetColumns: _fnGetColumns,
      _fnColumnTypes: _fnColumnTypes,
      _fnApplyColumnDefs: _fnApplyColumnDefs,
      _fnHungarianMap: _fnHungarianMap,
      _fnCamelToHungarian: _fnCamelToHungarian,
      _fnLanguageCompat: _fnLanguageCompat,
      _fnBrowserDetect: _fnBrowserDetect,
      _fnAddData: _fnAddData,
      _fnAddTr: _fnAddTr,
      _fnNodeToDataIndex: _fnNodeToDataIndex,
      _fnNodeToColumnIndex: _fnNodeToColumnIndex,
      _fnGetCellData: _fnGetCellData,
      _fnSetCellData: _fnSetCellData,
      _fnSplitObjNotation: _fnSplitObjNotation,
      _fnGetObjectDataFn: _fnGetObjectDataFn,
      _fnSetObjectDataFn: _fnSetObjectDataFn,
      _fnGetDataMaster: _fnGetDataMaster,
      _fnClearTable: _fnClearTable,
      _fnDeleteIndex: _fnDeleteIndex,
      _fnInvalidate: _fnInvalidate,
      _fnGetRowElements: _fnGetRowElements,
      _fnCreateTr: _fnCreateTr,
      _fnBuildHead: _fnBuildHead,
      _fnDrawHead: _fnDrawHead,
      _fnDraw: _fnDraw,
      _fnReDraw: _fnReDraw,
      _fnAddOptionsHtml: _fnAddOptionsHtml,
      _fnDetectHeader: _fnDetectHeader,
      _fnGetUniqueThs: _fnGetUniqueThs,
      _fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
      _fnFilterComplete: _fnFilterComplete,
      _fnFilterCustom: _fnFilterCustom,
      _fnFilterColumn: _fnFilterColumn,
      _fnFilter: _fnFilter,
      _fnFilterCreateSearch: _fnFilterCreateSearch,
      _fnEscapeRegex: _fnEscapeRegex,
      _fnFilterData: _fnFilterData,
      _fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
      _fnUpdateInfo: _fnUpdateInfo,
      _fnInfoMacros: _fnInfoMacros,
      _fnInitialise: _fnInitialise,
      _fnInitComplete: _fnInitComplete,
      _fnLengthChange: _fnLengthChange,
      _fnFeatureHtmlLength: _fnFeatureHtmlLength,
      _fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
      _fnPageChange: _fnPageChange,
      _fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
      _fnProcessingDisplay: _fnProcessingDisplay,
      _fnFeatureHtmlTable: _fnFeatureHtmlTable,
      _fnScrollDraw: _fnScrollDraw,
      _fnApplyToChildren: _fnApplyToChildren,
      _fnCalculateColumnWidths: _fnCalculateColumnWidths,
      _fnThrottle: _fnThrottle,
      _fnConvertToWidth: _fnConvertToWidth,
      _fnScrollingWidthAdjust: _fnScrollingWidthAdjust,
      _fnGetWidestNode: _fnGetWidestNode,
      _fnGetMaxLenString: _fnGetMaxLenString,
      _fnStringToCss: _fnStringToCss,
      _fnScrollBarWidth: _fnScrollBarWidth,
      _fnSortFlatten: _fnSortFlatten,
      _fnSort: _fnSort,
      _fnSortAria: _fnSortAria,
      _fnSortListener: _fnSortListener,
      _fnSortAttachListener: _fnSortAttachListener,
      _fnSortingClasses: _fnSortingClasses,
      _fnSortData: _fnSortData,
      _fnSaveState: _fnSaveState,
      _fnLoadState: _fnLoadState,
      _fnSettingsFromNode: _fnSettingsFromNode,
      _fnLog: _fnLog,
      _fnMap: _fnMap,
      _fnBindAction: _fnBindAction,
      _fnCallbackReg: _fnCallbackReg,
      _fnCallbackFire: _fnCallbackFire,
      _fnLengthOverflow: _fnLengthOverflow,
      _fnRenderer: _fnRenderer,
      _fnDataSource: _fnDataSource,
      _fnRowAttributes: _fnRowAttributes,
      _fnCalculateEnd: function () {
      }  // Used by a lot of plug-ins, but redundant
         // in 1.10, so this dead-end function is
         // added to prevent errors
    });
    // jQuery access
    $.fn.dataTable = DataTable;
    // Legacy aliases
    $.fn.dataTableSettings = DataTable.settings;
    $.fn.dataTableExt = DataTable.ext;
    // With a capital `D` we return a DataTables API instance rather than a
    // jQuery object
    $.fn.DataTable = function (opts) {
      return $(this).dataTable(opts).api();
    };
    // All properties that are available to $.fn.dataTable should also be
    // available on $.fn.DataTable
    $.each(DataTable, function (prop, val) {
      $.fn.DataTable[prop] = val;
    });
    // Information about events fired by DataTables - for documentation.
    /**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */
    /**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */
    /**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */
    /**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */
    /**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */
    /**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */
    /**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */
    /**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */
    /**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, searcg or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */
    /**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */
    /**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */
    /**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */
    /**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */
    /**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */
    return $.fn.dataTable;
  }));
}(window, document));
/**
 * DataTables integration for Bootstrap 3. This requires Bootstrap 3 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function (window, document, undefined) {
  var factory = function ($, DataTable) {
    'use strict';
    /* Set the defaults for DataTables initialisation */
    $.extend(true, DataTable.defaults, {
      dom: '<\'row\'<\'col-sm-6\'l><\'col-sm-6\'f>>' + '<\'row\'<\'col-sm-12\'tr>>' + '<\'row\'<\'col-sm-5\'i><\'col-sm-7\'p>>',
      renderer: 'bootstrap'
    });
    /* Default class modification */
    $.extend(DataTable.ext.classes, {
      sWrapper: 'dataTables_wrapper form-inline dt-bootstrap',
      sFilterInput: 'form-control input-sm',
      sLengthSelect: 'form-control input-sm'
    });
    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.bootstrap = function (settings, host, idx, buttons, page, pages) {
      var api = new DataTable.Api(settings);
      var classes = settings.oClasses;
      var lang = settings.oLanguage.oPaginate;
      var btnDisplay, btnClass, counter = 0;
      var attach = function (container, buttons) {
        var i, ien, node, button;
        var clickHandler = function (e) {
          e.preventDefault();
          if (!$(e.currentTarget).hasClass('disabled')) {
            api.page(e.data.action).draw(false);
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
              btnDisplay = '&hellip;';
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
                'data-dt-idx': counter,
                'tabindex': settings.iTabIndex
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
        activeEl = $(document.activeElement).data('dt-idx');
      } catch (e) {
      }
      attach($(host).empty().html('<ul class="pagination"/>').children('ul'), buttons);
      if (activeEl) {
        $(host).find('[data-dt-idx=' + activeEl + ']').focus();
      }
    };
    /*
         * TableTools Bootstrap compatibility
         * Required TableTools 2.1+
         */
    if (DataTable.TableTools) {
      // Set the classes that TableTools uses to something suitable for Bootstrap
      $.extend(true, DataTable.TableTools.classes, {
        'container': 'DTTT btn-group',
        'buttons': {
          'normal': 'btn btn-default',
          'disabled': 'disabled'
        },
        'collection': {
          'container': 'DTTT_dropdown dropdown-menu',
          'buttons': {
            'normal': '',
            'disabled': 'disabled'
          }
        },
        'print': { 'info': 'DTTT_print_info' },
        'select': { 'row': 'active' }
      });
      // Have the collection use a bootstrap compatible drop down
      $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
        'collection': {
          'container': 'ul',
          'button': 'li',
          'liner': 'a'
        }
      });
    }
  };
  // /factory
  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define([
      'jquery',
      'datatables'
    ], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }
}(window, document));
/*! FixedHeader 2.1.2
 * ©2010-2014 SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              Scrolling
 * @version     2.1.2
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
/* Global scope for FixedColumns for backwards compatibility - will be removed
 * in future. Not documented in 1.1.x.
 */
/* Global scope for FixedColumns */
var FixedHeader;
(function (window, document, undefined) {
  var factory = function ($, DataTable) {
    'use strict';
    /*
 * Function: FixedHeader
 * Purpose:  Provide 'fixed' header, footer and columns for a DataTable
 * Returns:  object:FixedHeader - must be called with 'new'
 * Inputs:   mixed:mTable - target table
 *  @param {object} dt DataTables instance or HTML table node. With DataTables
 *    1.10 this can also be a jQuery collection (with just a single table in its
 *    result set), a jQuery selector, DataTables API instance or settings
 *    object.
 *  @param {object} [oInit] initialisation settings, with the following
 *    properties (each optional)
 *    * bool:top -    fix the header (default true)
 *    * bool:bottom - fix the footer (default false)
 *    * int:left -    fix the left column(s) (default 0)
 *    * int:right -   fix the right column(s) (default 0)
 *    * int:zTop -    fixed header zIndex
 *    * int:zBottom - fixed footer zIndex
 *    * int:zLeft -   fixed left zIndex
 *    * int:zRight -  fixed right zIndex
 */
    FixedHeader = function (mTable, oInit) {
      /* Sanity check - you just know it will happen */
      if (!this instanceof FixedHeader) {
        alert('FixedHeader warning: FixedHeader must be initialised with the \'new\' keyword.');
        return;
      }
      var that = this;
      var oSettings = {
          'aoCache': [],
          'oSides': {
            'top': true,
            'bottom': false,
            'left': 0,
            'right': 0
          },
          'oZIndexes': {
            'top': 104,
            'bottom': 103,
            'left': 102,
            'right': 101
          },
          'oCloneOnDraw': {
            'top': false,
            'bottom': false,
            'left': true,
            'right': true
          },
          'oMes': {
            'iTableWidth': 0,
            'iTableHeight': 0,
            'iTableLeft': 0,
            'iTableRight': 0,
            'iTableTop': 0,
            'iTableBottom': 0
          },
          'oOffset': { 'top': 0 },
          'nTable': null,
          'bFooter': false,
          'bInitComplete': false
        };
      /*
	 * Function: fnGetSettings
	 * Purpose:  Get the settings for this object
	 * Returns:  object: - settings object
	 * Inputs:   -
	 */
      this.fnGetSettings = function () {
        return oSettings;
      };
      /*
	 * Function: fnUpdate
	 * Purpose:  Update the positioning and copies of the fixed elements
	 * Returns:  -
	 * Inputs:   -
	 */
      this.fnUpdate = function () {
        this._fnUpdateClones();
        this._fnUpdatePositions();
      };
      /*
	 * Function: fnPosition
	 * Purpose:  Update the positioning of the fixed elements
	 * Returns:  -
	 * Inputs:   -
	 */
      this.fnPosition = function () {
        this._fnUpdatePositions();
      };
      var dt = $.fn.dataTable.Api ? new $.fn.dataTable.Api(mTable).settings()[0] : mTable.fnSettings();
      dt._oPluginFixedHeader = this;
      /* Let's do it */
      this.fnInit(dt, oInit);
    };
    /*
 * Variable: FixedHeader
 * Purpose:  Prototype for FixedHeader
 * Scope:    global
 */
    FixedHeader.prototype = {
      fnInit: function (oDtSettings, oInit) {
        var s = this.fnGetSettings();
        var that = this;
        /* Record the user definable settings */
        this.fnInitSettings(s, oInit);
        if (oDtSettings.oScroll.sX !== '' || oDtSettings.oScroll.sY !== '') {
          alert('FixedHeader 2 is not supported with DataTables\' scrolling mode at this time');
          return;
        }
        s.nTable = oDtSettings.nTable;
        oDtSettings.aoDrawCallback.unshift({
          'fn': function () {
            FixedHeader.fnMeasure();
            that._fnUpdateClones.call(that);
            that._fnUpdatePositions.call(that);
          },
          'sName': 'FixedHeader'
        });
        s.bFooter = $('>tfoot', s.nTable).length > 0 ? true : false;
        /* Add the 'sides' that are fixed */
        if (s.oSides.top) {
          s.aoCache.push(that._fnCloneTable('fixedHeader', 'FixedHeader_Header', that._fnCloneThead));
        }
        if (s.oSides.bottom) {
          s.aoCache.push(that._fnCloneTable('fixedFooter', 'FixedHeader_Footer', that._fnCloneTfoot));
        }
        if (s.oSides.left) {
          s.aoCache.push(that._fnCloneTable('fixedLeft', 'FixedHeader_Left', that._fnCloneTLeft, s.oSides.left));
        }
        if (s.oSides.right) {
          s.aoCache.push(that._fnCloneTable('fixedRight', 'FixedHeader_Right', that._fnCloneTRight, s.oSides.right));
        }
        /* Event listeners for window movement */
        FixedHeader.afnScroll.push(function () {
          that._fnUpdatePositions.call(that);
        });
        $(window).resize(function () {
          FixedHeader.fnMeasure();
          that._fnUpdateClones.call(that);
          that._fnUpdatePositions.call(that);
        });
        $(s.nTable).on('column-reorder.dt', function () {
          FixedHeader.fnMeasure();
          that._fnUpdateClones(true);
          that._fnUpdatePositions();
        }).on('column-visibility.dt', function () {
          FixedHeader.fnMeasure();
          that._fnUpdateClones(true);
          that._fnUpdatePositions();
        });
        /* Get things right to start with */
        FixedHeader.fnMeasure();
        that._fnUpdateClones();
        that._fnUpdatePositions();
        s.bInitComplete = true;
      },
      fnInitSettings: function (s, oInit) {
        if (oInit !== undefined) {
          if (oInit.top !== undefined) {
            s.oSides.top = oInit.top;
          }
          if (oInit.bottom !== undefined) {
            s.oSides.bottom = oInit.bottom;
          }
          if (typeof oInit.left == 'boolean') {
            s.oSides.left = oInit.left ? 1 : 0;
          } else if (oInit.left !== undefined) {
            s.oSides.left = oInit.left;
          }
          if (typeof oInit.right == 'boolean') {
            s.oSides.right = oInit.right ? 1 : 0;
          } else if (oInit.right !== undefined) {
            s.oSides.right = oInit.right;
          }
          if (oInit.zTop !== undefined) {
            s.oZIndexes.top = oInit.zTop;
          }
          if (oInit.zBottom !== undefined) {
            s.oZIndexes.bottom = oInit.zBottom;
          }
          if (oInit.zLeft !== undefined) {
            s.oZIndexes.left = oInit.zLeft;
          }
          if (oInit.zRight !== undefined) {
            s.oZIndexes.right = oInit.zRight;
          }
          if (oInit.offsetTop !== undefined) {
            s.oOffset.top = oInit.offsetTop;
          }
          if (oInit.alwaysCloneTop !== undefined) {
            s.oCloneOnDraw.top = oInit.alwaysCloneTop;
          }
          if (oInit.alwaysCloneBottom !== undefined) {
            s.oCloneOnDraw.bottom = oInit.alwaysCloneBottom;
          }
          if (oInit.alwaysCloneLeft !== undefined) {
            s.oCloneOnDraw.left = oInit.alwaysCloneLeft;
          }
          if (oInit.alwaysCloneRight !== undefined) {
            s.oCloneOnDraw.right = oInit.alwaysCloneRight;
          }
        }
      },
      _fnCloneTable: function (sType, sClass, fnClone, iCells) {
        var s = this.fnGetSettings();
        var nCTable;
        /* We know that the table _MUST_ has a DIV wrapped around it, because this is simply how
		 * DataTables works. Therefore, we can set this to be relatively position (if it is not
		 * alreadu absolute, and use this as the base point for the cloned header
		 */
        if ($(s.nTable.parentNode).css('position') != 'absolute') {
          s.nTable.parentNode.style.position = 'relative';
        }
        /* Just a shallow clone will do - we only want the table node */
        nCTable = s.nTable.cloneNode(false);
        nCTable.removeAttribute('id');
        var nDiv = document.createElement('div');
        nDiv.style.position = 'absolute';
        nDiv.style.top = '0px';
        nDiv.style.left = '0px';
        nDiv.className += ' FixedHeader_Cloned ' + sType + ' ' + sClass;
        /* Set the zIndexes */
        if (sType == 'fixedHeader') {
          nDiv.style.zIndex = s.oZIndexes.top;
        }
        if (sType == 'fixedFooter') {
          nDiv.style.zIndex = s.oZIndexes.bottom;
        }
        if (sType == 'fixedLeft') {
          nDiv.style.zIndex = s.oZIndexes.left;
        } else if (sType == 'fixedRight') {
          nDiv.style.zIndex = s.oZIndexes.right;
        }
        /* remove margins since we are going to position it absolutely */
        nCTable.style.margin = '0';
        /* Insert the newly cloned table into the DOM, on top of the "real" header */
        nDiv.appendChild(nCTable);
        document.body.appendChild(nDiv);
        return {
          'nNode': nCTable,
          'nWrapper': nDiv,
          'sType': sType,
          'sPosition': '',
          'sTop': '',
          'sLeft': '',
          'fnClone': fnClone,
          'iCells': iCells
        };
      },
      _fnMeasure: function () {
        var s = this.fnGetSettings(), m = s.oMes, jqTable = $(s.nTable), oOffset = jqTable.offset(), iParentScrollTop = this._fnSumScroll(s.nTable.parentNode, 'scrollTop'), iParentScrollLeft = this._fnSumScroll(s.nTable.parentNode, 'scrollLeft');
        m.iTableWidth = jqTable.outerWidth();
        m.iTableHeight = jqTable.outerHeight();
        m.iTableLeft = oOffset.left + s.nTable.parentNode.scrollLeft;
        m.iTableTop = oOffset.top + iParentScrollTop;
        m.iTableRight = m.iTableLeft + m.iTableWidth;
        m.iTableRight = FixedHeader.oDoc.iWidth - m.iTableLeft - m.iTableWidth;
        m.iTableBottom = FixedHeader.oDoc.iHeight - m.iTableTop - m.iTableHeight;
      },
      _fnSumScroll: function (n, side) {
        var i = n[side];
        while (n = n.parentNode) {
          if (n.nodeName == 'HTML' || n.nodeName == 'BODY') {
            break;
          }
          i = n[side];
        }
        return i;
      },
      _fnUpdatePositions: function () {
        var s = this.fnGetSettings();
        this._fnMeasure();
        for (var i = 0, iLen = s.aoCache.length; i < iLen; i++) {
          if (s.aoCache[i].sType == 'fixedHeader') {
            this._fnScrollFixedHeader(s.aoCache[i]);
          } else if (s.aoCache[i].sType == 'fixedFooter') {
            this._fnScrollFixedFooter(s.aoCache[i]);
          } else if (s.aoCache[i].sType == 'fixedLeft') {
            this._fnScrollHorizontalLeft(s.aoCache[i]);
          } else {
            this._fnScrollHorizontalRight(s.aoCache[i]);
          }
        }
      },
      _fnUpdateClones: function (full) {
        var s = this.fnGetSettings();
        if (full) {
          // This is a little bit of a hack to force a full clone draw. When
          // `full` is set to true, we want to reclone the source elements,
          // regardless of the clone-on-draw settings
          s.bInitComplete = false;
        }
        for (var i = 0, iLen = s.aoCache.length; i < iLen; i++) {
          s.aoCache[i].fnClone.call(this, s.aoCache[i]);
        }
        if (full) {
          s.bInitComplete = true;
        }
      },
      _fnScrollHorizontalRight: function (oCache) {
        var s = this.fnGetSettings(), oMes = s.oMes, oWin = FixedHeader.oWin, oDoc = FixedHeader.oDoc, nTable = oCache.nWrapper, iFixedWidth = $(nTable).outerWidth();
        if (oWin.iScrollRight < oMes.iTableRight) {
          /* Fully right aligned */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + oMes.iTableWidth - iFixedWidth + 'px', 'left', nTable.style);
        } else if (oMes.iTableLeft < oDoc.iWidth - oWin.iScrollRight - iFixedWidth) {
          /* Middle */
          this._fnUpdateCache(oCache, 'sPosition', 'fixed', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop - oWin.iScrollTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oWin.iWidth - iFixedWidth + 'px', 'left', nTable.style);
        } else {
          /* Fully left aligned */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + 'px', 'left', nTable.style);
        }
      },
      _fnScrollHorizontalLeft: function (oCache) {
        var s = this.fnGetSettings(), oMes = s.oMes, oWin = FixedHeader.oWin, oDoc = FixedHeader.oDoc, nTable = oCache.nWrapper, iCellWidth = $(nTable).outerWidth();
        if (oWin.iScrollLeft < oMes.iTableLeft) {
          /* Fully left align */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + 'px', 'left', nTable.style);
        } else if (oWin.iScrollLeft < oMes.iTableLeft + oMes.iTableWidth - iCellWidth) {
          this._fnUpdateCache(oCache, 'sPosition', 'fixed', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop - oWin.iScrollTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', '0px', 'left', nTable.style);
        } else {
          /* Fully right align */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + oMes.iTableWidth - iCellWidth + 'px', 'left', nTable.style);
        }
      },
      _fnScrollFixedFooter: function (oCache) {
        var s = this.fnGetSettings(), oMes = s.oMes, oWin = FixedHeader.oWin, oDoc = FixedHeader.oDoc, nTable = oCache.nWrapper, iTheadHeight = $('thead', s.nTable).outerHeight(), iCellHeight = $(nTable).outerHeight();
        if (oWin.iScrollBottom < oMes.iTableBottom) {
          /* Below */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + oMes.iTableHeight - iCellHeight + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + 'px', 'left', nTable.style);
        } else if (oWin.iScrollBottom < oMes.iTableBottom + oMes.iTableHeight - iCellHeight - iTheadHeight) {
          this._fnUpdateCache(oCache, 'sPosition', 'fixed', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oWin.iHeight - iCellHeight + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft - oWin.iScrollLeft + 'px', 'left', nTable.style);
        } else {
          /* Above */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + iCellHeight + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + 'px', 'left', nTable.style);
        }
      },
      _fnScrollFixedHeader: function (oCache) {
        var s = this.fnGetSettings(), oMes = s.oMes, oWin = FixedHeader.oWin, oDoc = FixedHeader.oDoc, nTable = oCache.nWrapper, iTbodyHeight = 0, anTbodies = s.nTable.getElementsByTagName('tbody');
        for (var i = 0; i < anTbodies.length; ++i) {
          iTbodyHeight += anTbodies[i].offsetHeight;
        }
        if (oMes.iTableTop > oWin.iScrollTop + s.oOffset.top) {
          /* Above the table */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + 'px', 'left', nTable.style);
        } else if (oWin.iScrollTop + s.oOffset.top > oMes.iTableTop + iTbodyHeight) {
          /* At the bottom of the table */
          this._fnUpdateCache(oCache, 'sPosition', 'absolute', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', oMes.iTableTop + iTbodyHeight + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft + 'px', 'left', nTable.style);
        } else {
          /* In the middle of the table */
          this._fnUpdateCache(oCache, 'sPosition', 'fixed', 'position', nTable.style);
          this._fnUpdateCache(oCache, 'sTop', s.oOffset.top + 'px', 'top', nTable.style);
          this._fnUpdateCache(oCache, 'sLeft', oMes.iTableLeft - oWin.iScrollLeft + 'px', 'left', nTable.style);
        }
      },
      _fnUpdateCache: function (oCache, sCache, sSet, sProperty, oObj) {
        if (oCache[sCache] != sSet) {
          oObj[sProperty] = sSet;
          oCache[sCache] = sSet;
        }
      },
      _fnClassUpdate: function (source, dest) {
        var that = this;
        if (source.nodeName.toUpperCase() === 'TR' || source.nodeName.toUpperCase() === 'TH' || source.nodeName.toUpperCase() === 'TD' || source.nodeName.toUpperCase() === 'SPAN') {
          dest.className = source.className;
        }
        $(source).children().each(function (i) {
          that._fnClassUpdate($(source).children()[i], $(dest).children()[i]);
        });
      },
      _fnCloneThead: function (oCache) {
        var s = this.fnGetSettings();
        var nTable = oCache.nNode;
        if (s.bInitComplete && !s.oCloneOnDraw.top) {
          this._fnClassUpdate($('thead', s.nTable)[0], $('thead', nTable)[0]);
          return;
        }
        /* Set the wrapper width to match that of the cloned table */
        var iDtWidth = $(s.nTable).outerWidth();
        oCache.nWrapper.style.width = iDtWidth + 'px';
        nTable.style.width = iDtWidth + 'px';
        /* Remove any children the cloned table has */
        while (nTable.childNodes.length > 0) {
          $('thead th', nTable).unbind('click');
          nTable.removeChild(nTable.childNodes[0]);
        }
        /* Clone the DataTables header */
        var nThead = $('thead', s.nTable).clone(true)[0];
        nTable.appendChild(nThead);
        /* Copy the widths across - apparently a clone isn't good enough for this */
        var a = [];
        var b = [];
        $('thead>tr th', s.nTable).each(function (i) {
          a.push($(this).width());
        });
        $('thead>tr td', s.nTable).each(function (i) {
          b.push($(this).width());
        });
        $('thead>tr th', s.nTable).each(function (i) {
          $('thead>tr th:eq(' + i + ')', nTable).width(a[i]);
          $(this).width(a[i]);
        });
        $('thead>tr td', s.nTable).each(function (i) {
          $('thead>tr td:eq(' + i + ')', nTable).width(b[i]);
          $(this).width(b[i]);
        });
        // Stop DataTables 1.9 from putting a focus ring on the headers when
        // clicked to sort
        $('th.sorting, th.sorting_desc, th.sorting_asc', nTable).bind('click', function () {
          this.blur();
        });
      },
      _fnCloneTfoot: function (oCache) {
        var s = this.fnGetSettings();
        var nTable = oCache.nNode;
        /* Set the wrapper width to match that of the cloned table */
        oCache.nWrapper.style.width = $(s.nTable).outerWidth() + 'px';
        /* Remove any children the cloned table has */
        while (nTable.childNodes.length > 0) {
          nTable.removeChild(nTable.childNodes[0]);
        }
        /* Clone the DataTables footer */
        var nTfoot = $('tfoot', s.nTable).clone(true)[0];
        nTable.appendChild(nTfoot);
        /* Copy the widths across - apparently a clone isn't good enough for this */
        $('tfoot:eq(0)>tr th', s.nTable).each(function (i) {
          $('tfoot:eq(0)>tr th:eq(' + i + ')', nTable).width($(this).width());
        });
        $('tfoot:eq(0)>tr td', s.nTable).each(function (i) {
          $('tfoot:eq(0)>tr td:eq(' + i + ')', nTable).width($(this).width());
        });
      },
      _fnCloneTLeft: function (oCache) {
        var s = this.fnGetSettings();
        var nTable = oCache.nNode;
        var nBody = $('tbody', s.nTable)[0];
        /* Remove any children the cloned table has */
        while (nTable.childNodes.length > 0) {
          nTable.removeChild(nTable.childNodes[0]);
        }
        /* Is this the most efficient way to do this - it looks horrible... */
        nTable.appendChild($('thead', s.nTable).clone(true)[0]);
        nTable.appendChild($('tbody', s.nTable).clone(true)[0]);
        if (s.bFooter) {
          nTable.appendChild($('tfoot', s.nTable).clone(true)[0]);
        }
        /* Remove unneeded cells */
        var sSelector = 'gt(' + (oCache.iCells - 1) + ')';
        $('thead tr', nTable).each(function (k) {
          $('th:' + sSelector, this).remove();
        });
        $('tfoot tr', nTable).each(function (k) {
          $('th:' + sSelector, this).remove();
        });
        $('tbody tr', nTable).each(function (k) {
          $('td:' + sSelector, this).remove();
        });
        this.fnEqualiseHeights('thead', nBody.parentNode, nTable);
        this.fnEqualiseHeights('tbody', nBody.parentNode, nTable);
        this.fnEqualiseHeights('tfoot', nBody.parentNode, nTable);
        var iWidth = 0;
        for (var i = 0; i < oCache.iCells; i++) {
          iWidth += $('thead tr th:eq(' + i + ')', s.nTable).outerWidth();
        }
        nTable.style.width = iWidth + 'px';
        oCache.nWrapper.style.width = iWidth + 'px';
      },
      _fnCloneTRight: function (oCache) {
        var s = this.fnGetSettings();
        var nBody = $('tbody', s.nTable)[0];
        var nTable = oCache.nNode;
        var iCols = $('tbody tr:eq(0) td', s.nTable).length;
        /* Remove any children the cloned table has */
        while (nTable.childNodes.length > 0) {
          nTable.removeChild(nTable.childNodes[0]);
        }
        /* Is this the most efficient way to do this - it looks horrible... */
        nTable.appendChild($('thead', s.nTable).clone(true)[0]);
        nTable.appendChild($('tbody', s.nTable).clone(true)[0]);
        if (s.bFooter) {
          nTable.appendChild($('tfoot', s.nTable).clone(true)[0]);
        }
        $('thead tr th:lt(' + (iCols - oCache.iCells) + ')', nTable).remove();
        $('tfoot tr th:lt(' + (iCols - oCache.iCells) + ')', nTable).remove();
        /* Remove unneeded cells */
        $('tbody tr', nTable).each(function (k) {
          $('td:lt(' + (iCols - oCache.iCells) + ')', this).remove();
        });
        this.fnEqualiseHeights('thead', nBody.parentNode, nTable);
        this.fnEqualiseHeights('tbody', nBody.parentNode, nTable);
        this.fnEqualiseHeights('tfoot', nBody.parentNode, nTable);
        var iWidth = 0;
        for (var i = 0; i < oCache.iCells; i++) {
          iWidth += $('thead tr th:eq(' + (iCols - 1 - i) + ')', s.nTable).outerWidth();
        }
        nTable.style.width = iWidth + 'px';
        oCache.nWrapper.style.width = iWidth + 'px';
      },
      'fnEqualiseHeights': function (parent, original, clone) {
        var that = this;
        var originals = $(parent + ' tr', original);
        var height;
        $(parent + ' tr', clone).each(function (k) {
          height = originals.eq(k).css('height');
          // This is nasty :-(. IE has a sub-pixel error even when setting
          // the height below (the Firefox fix) which causes the fixed column
          // to go out of alignment. Need to add a pixel before the assignment
          // Can this be feature detected? Not sure how...
          if (navigator.appName == 'Microsoft Internet Explorer') {
            height = parseInt(height, 10) + 1;
          }
          $(this).css('height', height);
          // For Firefox to work, we need to also set the height of the
          // original row, to the value that we read from it! Otherwise there
          // is a sub-pixel rounding error
          originals.eq(k).css('height', height);
        });
      }
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Static properties and methods
 *   We use these for speed! This information is common to all instances of FixedHeader, so no
 * point if having them calculated and stored for each different instance.
 */
    /*
 * Variable: oWin
 * Purpose:  Store information about the window positioning
 * Scope:    FixedHeader
 */
    FixedHeader.oWin = {
      'iScrollTop': 0,
      'iScrollRight': 0,
      'iScrollBottom': 0,
      'iScrollLeft': 0,
      'iHeight': 0,
      'iWidth': 0
    };
    /*
 * Variable: oDoc
 * Purpose:  Store information about the document size
 * Scope:    FixedHeader
 */
    FixedHeader.oDoc = {
      'iHeight': 0,
      'iWidth': 0
    };
    /*
 * Variable: afnScroll
 * Purpose:  Array of functions that are to be used for the scrolling components
 * Scope:    FixedHeader
 */
    FixedHeader.afnScroll = [];
    /*
 * Function: fnMeasure
 * Purpose:  Update the measurements for the window and document
 * Returns:  -
 * Inputs:   -
 */
    FixedHeader.fnMeasure = function () {
      var jqWin = $(window), jqDoc = $(document), oWin = FixedHeader.oWin, oDoc = FixedHeader.oDoc;
      oDoc.iHeight = jqDoc.height();
      oDoc.iWidth = jqDoc.width();
      oWin.iHeight = jqWin.height();
      oWin.iWidth = jqWin.width();
      oWin.iScrollTop = jqWin.scrollTop();
      oWin.iScrollLeft = jqWin.scrollLeft();
      oWin.iScrollRight = oDoc.iWidth - oWin.iScrollLeft - oWin.iWidth;
      oWin.iScrollBottom = oDoc.iHeight - oWin.iScrollTop - oWin.iHeight;
    };
    FixedHeader.version = '2.1.2';
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Global processing
 */
    /*
 * Just one 'scroll' event handler in FixedHeader, which calls the required components. This is
 * done as an optimisation, to reduce calculation and proagation time
 */
    $(window).scroll(function () {
      FixedHeader.fnMeasure();
      for (var i = 0, iLen = FixedHeader.afnScroll.length; i < iLen; i++) {
        FixedHeader.afnScroll[i]();
      }
    });
    $.fn.dataTable.FixedHeader = FixedHeader;
    $.fn.DataTable.FixedHeader = FixedHeader;
    return FixedHeader;
  };
  // /factory
  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define([
      'jquery',
      'datatables'
    ], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery && !jQuery.fn.dataTable.FixedHeader) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }
}(window, document));
/*! FixedColumns 3.0.4
 * ©2010-2014 SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     FixedColumns
 * @description Freeze columns in place on a scrolling DataTable
 * @version     3.0.4
 * @file        dataTables.fixedColumns.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2010-2014 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function (window, document, undefined) {
  var factory = function ($, DataTable) {
    'use strict';
    /**
 * When making use of DataTables' x-axis scrolling feature, you may wish to
 * fix the left most column in place. This plug-in for DataTables provides
 * exactly this option (note for non-scrolling tables, please use the
 * FixedHeader plug-in, which can fix headers, footers and columns). Key
 * features include:
 *
 * * Freezes the left or right most columns to the side of the table
 * * Option to freeze two or more columns
 * * Full integration with DataTables' scrolling options
 * * Speed - FixedColumns is fast in its operation
 *
 *  @class
 *  @constructor
 *  @global
 *  @param {object} dt DataTables instance. With DataTables 1.10 this can also
 *    be a jQuery collection, a jQuery selector, DataTables API instance or
 *    settings object.
 *  @param {object} [init={}] Configuration object for FixedColumns. Options are
 *    defined by {@link FixedColumns.defaults}
 *
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.8.0+
 *
 *  @example
 *      var table = $('#example').dataTable( {
 *        "scrollX": "100%"
 *      } );
 *      new $.fn.dataTable.fixedColumns( table );
 */
    var FixedColumns = function (dt, init) {
      var that = this;
      /* Sanity check - you just know it will happen */
      if (!(this instanceof FixedColumns)) {
        alert('FixedColumns warning: FixedColumns must be initialised with the \'new\' keyword.');
        return;
      }
      if (typeof init == 'undefined') {
        init = {};
      }
      // Use the DataTables Hungarian notation mapping method, if it exists to
      // provide forwards compatibility for camel case variables
      var camelToHungarian = $.fn.dataTable.camelToHungarian;
      if (camelToHungarian) {
        camelToHungarian(FixedColumns.defaults, FixedColumns.defaults, true);
        camelToHungarian(FixedColumns.defaults, init);
      }
      // v1.10 allows the settings object to be got form a number of sources
      var dtSettings = $.fn.dataTable.Api ? new $.fn.dataTable.Api(dt).settings()[0] : dt.fnSettings();
      /**
	 * Settings object which contains customisable information for FixedColumns instance
	 * @namespace
	 * @extends FixedColumns.defaults
	 * @private
	 */
      this.s = {
        'dt': dtSettings,
        'iTableColumns': dtSettings.aoColumns.length,
        'aiOuterWidths': [],
        'aiInnerWidths': []
      };
      /**
	 * DOM elements used by the class instance
	 * @namespace
	 * @private
	 *
	 */
      this.dom = {
        'scroller': null,
        'header': null,
        'body': null,
        'footer': null,
        'grid': {
          'wrapper': null,
          'dt': null,
          'left': {
            'wrapper': null,
            'head': null,
            'body': null,
            'foot': null
          },
          'right': {
            'wrapper': null,
            'head': null,
            'body': null,
            'foot': null
          }
        },
        'clone': {
          'left': {
            'header': null,
            'body': null,
            'footer': null
          },
          'right': {
            'header': null,
            'body': null,
            'footer': null
          }
        }
      };
      /* Attach the instance to the DataTables instance so it can be accessed easily */
      dtSettings._oFixedColumns = this;
      /* Let's do it */
      if (!dtSettings._bInitComplete) {
        dtSettings.oApi._fnCallbackReg(dtSettings, 'aoInitComplete', function () {
          that._fnConstruct(init);
        }, 'FixedColumns');
      } else {
        this._fnConstruct(init);
      }
    };
    FixedColumns.prototype = {
      'fnUpdate': function () {
        this._fnDraw(true);
      },
      'fnRedrawLayout': function () {
        this._fnColCalc();
        this._fnGridLayout();
        this.fnUpdate();
      },
      'fnRecalculateHeight': function (nTr) {
        delete nTr._DTTC_iHeight;
        nTr.style.height = 'auto';
      },
      'fnSetRowHeight': function (nTarget, iHeight) {
        nTarget.style.height = iHeight + 'px';
      },
      'fnGetPosition': function (node) {
        var idx;
        var inst = this.s.dt.oInstance;
        if (!$(node).parents('.DTFC_Cloned').length) {
          // Not in a cloned table
          return inst.fnGetPosition(node);
        } else {
          // Its in the cloned table, so need to look up position
          if (node.nodeName.toLowerCase() === 'tr') {
            idx = $(node).index();
            return inst.fnGetPosition($('tr', this.s.dt.nTBody)[idx]);
          } else {
            var colIdx = $(node).index();
            idx = $(node.parentNode).index();
            var row = inst.fnGetPosition($('tr', this.s.dt.nTBody)[idx]);
            return [
              row,
              colIdx,
              inst.oApi._fnVisibleToColumnIndex(this.s.dt, colIdx)
            ];
          }
        }
      },
      '_fnConstruct': function (oInit) {
        var i, iLen, iWidth, that = this;
        /* Sanity checking */
        if (typeof this.s.dt.oInstance.fnVersionCheck != 'function' || this.s.dt.oInstance.fnVersionCheck('1.8.0') !== true) {
          alert('FixedColumns ' + FixedColumns.VERSION + ' required DataTables 1.8.0 or later. ' + 'Please upgrade your DataTables installation');
          return;
        }
        if (this.s.dt.oScroll.sX === '') {
          this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, 'FixedColumns is not needed (no ' + 'x-scrolling in DataTables enabled), so no action will be taken. Use \'FixedHeader\' for ' + 'column fixing when scrolling is not enabled');
          return;
        }
        /* Apply the settings from the user / defaults */
        this.s = $.extend(true, this.s, FixedColumns.defaults, oInit);
        /* Set up the DOM as we need it and cache nodes */
        var classes = this.s.dt.oClasses;
        this.dom.grid.dt = $(this.s.dt.nTable).parents('div.' + classes.sScrollWrapper)[0];
        this.dom.scroller = $('div.' + classes.sScrollBody, this.dom.grid.dt)[0];
        /* Set up the DOM that we want for the fixed column layout grid */
        this._fnColCalc();
        this._fnGridSetup();
        /* Event handlers */
        var mouseController;
        // When the body is scrolled - scroll the left and right columns
        $(this.dom.scroller).on('mouseover.DTFC touchstart.DTFC', function () {
          mouseController = 'main';
        }).on('scroll.DTFC', function () {
          if (mouseController === 'main') {
            if (that.s.iLeftColumns > 0) {
              that.dom.grid.left.liner.scrollTop = that.dom.scroller.scrollTop;
            }
            if (that.s.iRightColumns > 0) {
              that.dom.grid.right.liner.scrollTop = that.dom.scroller.scrollTop;
            }
          }
        });
        var wheelType = 'onwheel' in document.createElement('div') ? 'wheel.DTFC' : 'mousewheel.DTFC';
        if (that.s.iLeftColumns > 0) {
          // When scrolling the left column, scroll the body and right column
          $(that.dom.grid.left.liner).on('mouseover.DTFC touchstart.DTFC', function () {
            mouseController = 'left';
          }).on('scroll.DTFC', function () {
            if (mouseController === 'left') {
              that.dom.scroller.scrollTop = that.dom.grid.left.liner.scrollTop;
              if (that.s.iRightColumns > 0) {
                that.dom.grid.right.liner.scrollTop = that.dom.grid.left.liner.scrollTop;
              }
            }
          }).on(wheelType, function (e) {
            // xxx update the destroy as well
            // Pass horizontal scrolling through
            var xDelta = e.type === 'wheel' ? -e.originalEvent.deltaX : e.originalEvent.wheelDeltaX;
            that.dom.scroller.scrollLeft -= xDelta;
          });
        }
        if (that.s.iRightColumns > 0) {
          // When scrolling the right column, scroll the body and the left column
          $(that.dom.grid.right.liner).on('mouseover.DTFC touchstart.DTFC', function () {
            mouseController = 'right';
          }).on('scroll.DTFC', function () {
            if (mouseController === 'right') {
              that.dom.scroller.scrollTop = that.dom.grid.right.liner.scrollTop;
              if (that.s.iLeftColumns > 0) {
                that.dom.grid.left.liner.scrollTop = that.dom.grid.right.liner.scrollTop;
              }
            }
          }).on(wheelType, function (e) {
            // Pass horizontal scrolling through
            var xDelta = e.type === 'wheel' ? -e.originalEvent.deltaX : e.originalEvent.wheelDeltaX;
            that.dom.scroller.scrollLeft -= xDelta;
          });
        }
        $(window).on('resize.DTFC', function () {
          that._fnGridLayout.call(that);
        });
        var bFirstDraw = true;
        var jqTable = $(this.s.dt.nTable);
        jqTable.on('draw.dt.DTFC', function () {
          that._fnDraw.call(that, bFirstDraw);
          bFirstDraw = false;
        }).on('column-sizing.dt.DTFC', function () {
          that._fnColCalc();
          that._fnGridLayout(that);
        }).on('column-visibility.dt.DTFC', function () {
          that._fnColCalc();
          that._fnGridLayout(that);
          that._fnDraw(true);
        }).on('destroy.dt.DTFC', function () {
          jqTable.off('column-sizing.dt.DTFC destroy.dt.DTFC draw.dt.DTFC');
          $(that.dom.scroller).off('scroll.DTFC mouseover.DTFC');
          $(window).off('resize.DTFC');
          $(that.dom.grid.left.liner).off('scroll.DTFC mouseover.DTFC ' + wheelType);
          $(that.dom.grid.left.wrapper).remove();
          $(that.dom.grid.right.liner).off('scroll.DTFC mouseover.DTFC ' + wheelType);
          $(that.dom.grid.right.wrapper).remove();
        });
        /* Get things right to start with - note that due to adjusting the columns, there must be
		 * another redraw of the main table. It doesn't need to be a full redraw however.
		 */
        this._fnGridLayout();
        this.s.dt.oInstance.fnDraw(false);
      },
      '_fnColCalc': function () {
        var that = this;
        var iLeftWidth = 0;
        var iRightWidth = 0;
        this.s.aiInnerWidths = [];
        this.s.aiOuterWidths = [];
        $.each(this.s.dt.aoColumns, function (i, col) {
          var th = $(col.nTh);
          var border;
          if (!th.filter(':visible').length) {
            that.s.aiInnerWidths.push(0);
            that.s.aiOuterWidths.push(0);
          } else {
            // Inner width is used to assign widths to cells
            // Outer width is used to calculate the container
            var iWidth = th.outerWidth();
            // When working with the left most-cell, need to add on the
            // table's border to the outerWidth, since we need to take
            // account of it, but it isn't in any cell
            if (that.s.aiOuterWidths.length === 0) {
              border = $(that.s.dt.nTable).css('border-left-width');
              iWidth += typeof border === 'string' ? 1 : parseInt(border, 10);
            }
            // Likewise with the final column on the right
            if (that.s.aiOuterWidths.length === that.s.dt.aoColumns.length - 1) {
              border = $(that.s.dt.nTable).css('border-right-width');
              iWidth += typeof border === 'string' ? 1 : parseInt(border, 10);
            }
            that.s.aiOuterWidths.push(iWidth);
            that.s.aiInnerWidths.push(th.width());
            if (i < that.s.iLeftColumns) {
              iLeftWidth += iWidth;
            }
            if (that.s.iTableColumns - that.s.iRightColumns <= i) {
              iRightWidth += iWidth;
            }
          }
        });
        this.s.iLeftWidth = iLeftWidth;
        this.s.iRightWidth = iRightWidth;
      },
      '_fnGridSetup': function () {
        var that = this;
        var oOverflow = this._fnDTOverflow();
        var block;
        this.dom.body = this.s.dt.nTable;
        this.dom.header = this.s.dt.nTHead.parentNode;
        this.dom.header.parentNode.parentNode.style.position = 'relative';
        var nSWrapper = $('<div class="DTFC_ScrollWrapper" style="position:relative; clear:both;">' + '<div class="DTFC_LeftWrapper" style="position:absolute; top:0; left:0;">' + '<div class="DTFC_LeftHeadWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div>' + '<div class="DTFC_LeftBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;">' + '<div class="DTFC_LeftBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div>' + '</div>' + '<div class="DTFC_LeftFootWrapper" style="position:relative; top:0; left:0; overflow:hidden;"></div>' + '</div>' + '<div class="DTFC_RightWrapper" style="position:absolute; top:0; left:0;">' + '<div class="DTFC_RightHeadWrapper" style="position:relative; top:0; left:0;">' + '<div class="DTFC_RightHeadBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div>' + '</div>' + '<div class="DTFC_RightBodyWrapper" style="position:relative; top:0; left:0; overflow:hidden;">' + '<div class="DTFC_RightBodyLiner" style="position:relative; top:0; left:0; overflow-y:scroll;"></div>' + '</div>' + '<div class="DTFC_RightFootWrapper" style="position:relative; top:0; left:0;">' + '<div class="DTFC_RightFootBlocker DTFC_Blocker" style="position:absolute; top:0; bottom:0;"></div>' + '</div>' + '</div>' + '</div>')[0];
        var nLeft = nSWrapper.childNodes[0];
        var nRight = nSWrapper.childNodes[1];
        this.dom.grid.dt.parentNode.insertBefore(nSWrapper, this.dom.grid.dt);
        nSWrapper.appendChild(this.dom.grid.dt);
        this.dom.grid.wrapper = nSWrapper;
        if (this.s.iLeftColumns > 0) {
          this.dom.grid.left.wrapper = nLeft;
          this.dom.grid.left.head = nLeft.childNodes[0];
          this.dom.grid.left.body = nLeft.childNodes[1];
          this.dom.grid.left.liner = $('div.DTFC_LeftBodyLiner', nSWrapper)[0];
          nSWrapper.appendChild(nLeft);
        }
        if (this.s.iRightColumns > 0) {
          this.dom.grid.right.wrapper = nRight;
          this.dom.grid.right.head = nRight.childNodes[0];
          this.dom.grid.right.body = nRight.childNodes[1];
          this.dom.grid.right.liner = $('div.DTFC_RightBodyLiner', nSWrapper)[0];
          block = $('div.DTFC_RightHeadBlocker', nSWrapper)[0];
          block.style.width = oOverflow.bar + 'px';
          block.style.right = -oOverflow.bar + 'px';
          this.dom.grid.right.headBlock = block;
          block = $('div.DTFC_RightFootBlocker', nSWrapper)[0];
          block.style.width = oOverflow.bar + 'px';
          block.style.right = -oOverflow.bar + 'px';
          this.dom.grid.right.footBlock = block;
          nSWrapper.appendChild(nRight);
        }
        if (this.s.dt.nTFoot) {
          this.dom.footer = this.s.dt.nTFoot.parentNode;
          if (this.s.iLeftColumns > 0) {
            this.dom.grid.left.foot = nLeft.childNodes[2];
          }
          if (this.s.iRightColumns > 0) {
            this.dom.grid.right.foot = nRight.childNodes[2];
          }
        }
      },
      '_fnGridLayout': function () {
        var oGrid = this.dom.grid;
        var iWidth = $(oGrid.wrapper).width();
        var iBodyHeight = $(this.s.dt.nTable.parentNode).outerHeight();
        var iFullHeight = $(this.s.dt.nTable.parentNode.parentNode).outerHeight();
        var oOverflow = this._fnDTOverflow();
        var iLeftWidth = this.s.iLeftWidth, iRightWidth = this.s.iRightWidth, iRight;
        var scrollbarAdjust = function (node, width) {
          if (!oOverflow.bar) {
            // If there is no scrollbar (Macs) we need to hide the auto scrollbar
            node.style.width = width + 20 + 'px';
            node.style.paddingRight = '20px';
            node.style.boxSizing = 'border-box';
          } else {
            // Otherwise just overflow by the scrollbar
            node.style.width = width + oOverflow.bar + 'px';
          }
        };
        // When x scrolling - don't paint the fixed columns over the x scrollbar
        if (oOverflow.x) {
          iBodyHeight -= oOverflow.bar;
        }
        oGrid.wrapper.style.height = iFullHeight + 'px';
        if (this.s.iLeftColumns > 0) {
          oGrid.left.wrapper.style.width = iLeftWidth + 'px';
          oGrid.left.wrapper.style.height = '1px';
          oGrid.left.body.style.height = iBodyHeight + 'px';
          if (oGrid.left.foot) {
            oGrid.left.foot.style.top = (oOverflow.x ? oOverflow.bar : 0) + 'px';  // shift footer for scrollbar
          }
          scrollbarAdjust(oGrid.left.liner, iLeftWidth);
          oGrid.left.liner.style.height = iBodyHeight + 'px';
        }
        if (this.s.iRightColumns > 0) {
          iRight = iWidth - iRightWidth;
          if (oOverflow.y) {
            iRight -= oOverflow.bar;
          }
          oGrid.right.wrapper.style.width = iRightWidth + 'px';
          oGrid.right.wrapper.style.left = iRight + 'px';
          oGrid.right.wrapper.style.height = '1px';
          oGrid.right.body.style.height = iBodyHeight + 'px';
          if (oGrid.right.foot) {
            oGrid.right.foot.style.top = (oOverflow.x ? oOverflow.bar : 0) + 'px';
          }
          scrollbarAdjust(oGrid.right.liner, iRightWidth);
          oGrid.right.liner.style.height = iBodyHeight + 'px';
          oGrid.right.headBlock.style.display = oOverflow.y ? 'block' : 'none';
          oGrid.right.footBlock.style.display = oOverflow.y ? 'block' : 'none';
        }
      },
      '_fnDTOverflow': function () {
        var nTable = this.s.dt.nTable;
        var nTableScrollBody = nTable.parentNode;
        var out = {
            'x': false,
            'y': false,
            'bar': this.s.dt.oScroll.iBarWidth
          };
        if (nTable.offsetWidth > nTableScrollBody.clientWidth) {
          out.x = true;
        }
        if (nTable.offsetHeight > nTableScrollBody.clientHeight) {
          out.y = true;
        }
        return out;
      },
      '_fnDraw': function (bAll) {
        this._fnGridLayout();
        this._fnCloneLeft(bAll);
        this._fnCloneRight(bAll);
        /* Draw callback function */
        if (this.s.fnDrawCallback !== null) {
          this.s.fnDrawCallback.call(this, this.dom.clone.left, this.dom.clone.right);
        }
        /* Event triggering */
        $(this).trigger('draw.dtfc', {
          'leftClone': this.dom.clone.left,
          'rightClone': this.dom.clone.right
        });
      },
      '_fnCloneRight': function (bAll) {
        if (this.s.iRightColumns <= 0) {
          return;
        }
        var that = this, i, jq, aiColumns = [];
        for (i = this.s.iTableColumns - this.s.iRightColumns; i < this.s.iTableColumns; i++) {
          if (this.s.dt.aoColumns[i].bVisible) {
            aiColumns.push(i);
          }
        }
        this._fnClone(this.dom.clone.right, this.dom.grid.right, aiColumns, bAll);
      },
      '_fnCloneLeft': function (bAll) {
        if (this.s.iLeftColumns <= 0) {
          return;
        }
        var that = this, i, jq, aiColumns = [];
        for (i = 0; i < this.s.iLeftColumns; i++) {
          if (this.s.dt.aoColumns[i].bVisible) {
            aiColumns.push(i);
          }
        }
        this._fnClone(this.dom.clone.left, this.dom.grid.left, aiColumns, bAll);
      },
      '_fnCopyLayout': function (aoOriginal, aiColumns) {
        var aReturn = [];
        var aClones = [];
        var aCloned = [];
        for (var i = 0, iLen = aoOriginal.length; i < iLen; i++) {
          var aRow = [];
          aRow.nTr = $(aoOriginal[i].nTr).clone(true, true)[0];
          for (var j = 0, jLen = this.s.iTableColumns; j < jLen; j++) {
            if ($.inArray(j, aiColumns) === -1) {
              continue;
            }
            var iCloned = $.inArray(aoOriginal[i][j].cell, aCloned);
            if (iCloned === -1) {
              var nClone = $(aoOriginal[i][j].cell).clone(true, true)[0];
              aClones.push(nClone);
              aCloned.push(aoOriginal[i][j].cell);
              aRow.push({
                'cell': nClone,
                'unique': aoOriginal[i][j].unique
              });
            } else {
              aRow.push({
                'cell': aClones[iCloned],
                'unique': aoOriginal[i][j].unique
              });
            }
          }
          aReturn.push(aRow);
        }
        return aReturn;
      },
      '_fnClone': function (oClone, oGrid, aiColumns, bAll) {
        var that = this, i, iLen, j, jLen, jq, nTarget, iColumn, nClone, iIndex, aoCloneLayout, jqCloneThead, aoFixedHeader, dt = this.s.dt;
        /*
		 * Header
		 */
        if (bAll) {
          if (oClone.header !== null) {
            oClone.header.parentNode.removeChild(oClone.header);
          }
          oClone.header = $(this.dom.header).clone(true, true)[0];
          oClone.header.className += ' DTFC_Cloned';
          oClone.header.style.width = '100%';
          oGrid.head.appendChild(oClone.header);
          /* Copy the DataTables layout cache for the header for our floating column */
          aoCloneLayout = this._fnCopyLayout(dt.aoHeader, aiColumns);
          jqCloneThead = $('>thead', oClone.header);
          jqCloneThead.empty();
          /* Add the created cloned TR elements to the table */
          for (i = 0, iLen = aoCloneLayout.length; i < iLen; i++) {
            jqCloneThead[0].appendChild(aoCloneLayout[i].nTr);
          }
          /* Use the handy _fnDrawHead function in DataTables to do the rowspan/colspan
			 * calculations for us
			 */
          dt.oApi._fnDrawHead(dt, aoCloneLayout, true);
        } else {
          /* To ensure that we copy cell classes exactly, regardless of colspan, multiple rows
			 * etc, we make a copy of the header from the DataTable again, but don't insert the
			 * cloned cells, just copy the classes across. To get the matching layout for the
			 * fixed component, we use the DataTables _fnDetectHeader method, allowing 1:1 mapping
			 */
          aoCloneLayout = this._fnCopyLayout(dt.aoHeader, aiColumns);
          aoFixedHeader = [];
          dt.oApi._fnDetectHeader(aoFixedHeader, $('>thead', oClone.header)[0]);
          for (i = 0, iLen = aoCloneLayout.length; i < iLen; i++) {
            for (j = 0, jLen = aoCloneLayout[i].length; j < jLen; j++) {
              aoFixedHeader[i][j].cell.className = aoCloneLayout[i][j].cell.className;
              // If jQuery UI theming is used we need to copy those elements as well
              $('span.DataTables_sort_icon', aoFixedHeader[i][j].cell).each(function () {
                this.className = $('span.DataTables_sort_icon', aoCloneLayout[i][j].cell)[0].className;
              });
            }
          }
        }
        this._fnEqualiseHeights('thead', this.dom.header, oClone.header);
        /*
		 * Body
		 */
        if (this.s.sHeightMatch == 'auto') {
          /* Remove any heights which have been applied already and let the browser figure it out */
          $('>tbody>tr', that.dom.body).css('height', 'auto');
        }
        if (oClone.body !== null) {
          oClone.body.parentNode.removeChild(oClone.body);
          oClone.body = null;
        }
        oClone.body = $(this.dom.body).clone(true)[0];
        oClone.body.className += ' DTFC_Cloned';
        oClone.body.style.paddingBottom = dt.oScroll.iBarWidth + 'px';
        oClone.body.style.marginBottom = dt.oScroll.iBarWidth * 2 + 'px';
        /* For IE */
        if (oClone.body.getAttribute('id') !== null) {
          oClone.body.removeAttribute('id');
        }
        $('>thead>tr', oClone.body).empty();
        $('>tfoot', oClone.body).remove();
        var nBody = $('tbody', oClone.body)[0];
        $(nBody).empty();
        if (dt.aiDisplay.length > 0) {
          /* Copy the DataTables' header elements to force the column width in exactly the
			 * same way that DataTables does it - have the header element, apply the width and
			 * colapse it down
			 */
          var nInnerThead = $('>thead>tr', oClone.body)[0];
          for (iIndex = 0; iIndex < aiColumns.length; iIndex++) {
            iColumn = aiColumns[iIndex];
            nClone = $(dt.aoColumns[iColumn].nTh).clone(true)[0];
            nClone.innerHTML = '';
            var oStyle = nClone.style;
            oStyle.paddingTop = '0';
            oStyle.paddingBottom = '0';
            oStyle.borderTopWidth = '0';
            oStyle.borderBottomWidth = '0';
            oStyle.height = 0;
            oStyle.width = that.s.aiInnerWidths[iColumn] + 'px';
            nInnerThead.appendChild(nClone);
          }
          /* Add in the tbody elements, cloning form the master table */
          $('>tbody>tr', that.dom.body).each(function (z) {
            var n = this.cloneNode(false);
            n.removeAttribute('id');
            var i = that.s.dt.oFeatures.bServerSide === false ? that.s.dt.aiDisplay[that.s.dt._iDisplayStart + z] : z;
            var aTds = that.s.dt.aoData[i].anCells || $(this).children('td, th');
            for (iIndex = 0; iIndex < aiColumns.length; iIndex++) {
              iColumn = aiColumns[iIndex];
              if (aTds.length > 0) {
                nClone = $(aTds[iColumn]).clone(true, true)[0];
                n.appendChild(nClone);
              }
            }
            nBody.appendChild(n);
          });
        } else {
          $('>tbody>tr', that.dom.body).each(function (z) {
            nClone = this.cloneNode(true);
            nClone.className += ' DTFC_NoData';
            $('td', nClone).html('');
            nBody.appendChild(nClone);
          });
        }
        oClone.body.style.width = '100%';
        oClone.body.style.margin = '0';
        oClone.body.style.padding = '0';
        // Interop with Scroller - need to use a height forcing element in the
        // scrolling area in the same way that Scroller does in the body scroll.
        if (dt.oScroller !== undefined) {
          var scrollerForcer = dt.oScroller.dom.force;
          if (!oGrid.forcer) {
            oGrid.forcer = scrollerForcer.cloneNode(true);
            oGrid.liner.appendChild(oGrid.forcer);
          } else {
            oGrid.forcer.style.height = scrollerForcer.style.height;
          }
        }
        oGrid.liner.appendChild(oClone.body);
        this._fnEqualiseHeights('tbody', that.dom.body, oClone.body);
        /*
		 * Footer
		 */
        if (dt.nTFoot !== null) {
          if (bAll) {
            if (oClone.footer !== null) {
              oClone.footer.parentNode.removeChild(oClone.footer);
            }
            oClone.footer = $(this.dom.footer).clone(true, true)[0];
            oClone.footer.className += ' DTFC_Cloned';
            oClone.footer.style.width = '100%';
            oGrid.foot.appendChild(oClone.footer);
            /* Copy the footer just like we do for the header */
            aoCloneLayout = this._fnCopyLayout(dt.aoFooter, aiColumns);
            var jqCloneTfoot = $('>tfoot', oClone.footer);
            jqCloneTfoot.empty();
            for (i = 0, iLen = aoCloneLayout.length; i < iLen; i++) {
              jqCloneTfoot[0].appendChild(aoCloneLayout[i].nTr);
            }
            dt.oApi._fnDrawHead(dt, aoCloneLayout, true);
          } else {
            aoCloneLayout = this._fnCopyLayout(dt.aoFooter, aiColumns);
            var aoCurrFooter = [];
            dt.oApi._fnDetectHeader(aoCurrFooter, $('>tfoot', oClone.footer)[0]);
            for (i = 0, iLen = aoCloneLayout.length; i < iLen; i++) {
              for (j = 0, jLen = aoCloneLayout[i].length; j < jLen; j++) {
                aoCurrFooter[i][j].cell.className = aoCloneLayout[i][j].cell.className;
              }
            }
          }
          this._fnEqualiseHeights('tfoot', this.dom.footer, oClone.footer);
        }
        /* Equalise the column widths between the header footer and body - body get's priority */
        var anUnique = dt.oApi._fnGetUniqueThs(dt, $('>thead', oClone.header)[0]);
        $(anUnique).each(function (i) {
          iColumn = aiColumns[i];
          this.style.width = that.s.aiInnerWidths[iColumn] + 'px';
        });
        if (that.s.dt.nTFoot !== null) {
          anUnique = dt.oApi._fnGetUniqueThs(dt, $('>tfoot', oClone.footer)[0]);
          $(anUnique).each(function (i) {
            iColumn = aiColumns[i];
            this.style.width = that.s.aiInnerWidths[iColumn] + 'px';
          });
        }
      },
      '_fnGetTrNodes': function (nIn) {
        var aOut = [];
        for (var i = 0, iLen = nIn.childNodes.length; i < iLen; i++) {
          if (nIn.childNodes[i].nodeName.toUpperCase() == 'TR') {
            aOut.push(nIn.childNodes[i]);
          }
        }
        return aOut;
      },
      '_fnEqualiseHeights': function (nodeName, original, clone) {
        if (this.s.sHeightMatch == 'none' && nodeName !== 'thead' && nodeName !== 'tfoot') {
          return;
        }
        var that = this, i, iLen, iHeight, iHeight2, iHeightOriginal, iHeightClone, rootOriginal = original.getElementsByTagName(nodeName)[0], rootClone = clone.getElementsByTagName(nodeName)[0], jqBoxHack = $('>' + nodeName + '>tr:eq(0)', original).children(':first'), iBoxHack = jqBoxHack.outerHeight() - jqBoxHack.height(), anOriginal = this._fnGetTrNodes(rootOriginal), anClone = this._fnGetTrNodes(rootClone), heights = [];
        for (i = 0, iLen = anClone.length; i < iLen; i++) {
          iHeightOriginal = anOriginal[i].offsetHeight;
          iHeightClone = anClone[i].offsetHeight;
          iHeight = iHeightClone > iHeightOriginal ? iHeightClone : iHeightOriginal;
          if (this.s.sHeightMatch == 'semiauto') {
            anOriginal[i]._DTTC_iHeight = iHeight;
          }
          heights.push(iHeight);
        }
        for (i = 0, iLen = anClone.length; i < iLen; i++) {
          anClone[i].style.height = heights[i] + 'px';
          anOriginal[i].style.height = heights[i] + 'px';
        }
      }
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Statics
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
 * FixedColumns default settings for initialisation
 *  @name FixedColumns.defaults
 *  @namespace
 *  @static
 */
    FixedColumns.defaults = {
      'iLeftColumns': 1,
      'iRightColumns': 0,
      'fnDrawCallback': null,
      'sHeightMatch': 'semiauto'
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Constants
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
 * FixedColumns version
 *  @name      FixedColumns.version
 *  @type      String
 *  @default   See code
 *  @static
 */
    FixedColumns.version = '3.0.4';
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Fired events (for documentation)
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
 * Event fired whenever FixedColumns redraws the fixed columns (i.e. clones the table elements from the main DataTable). This will occur whenever the DataTable that the FixedColumns instance is attached does its own draw.
 * @name FixedColumns#draw.dtfc
 * @event
 * @param {event} e jQuery event object
 * @param {object} o Event parameters from FixedColumns
 * @param {object} o.leftClone Instance's object dom.clone.left for easy reference. This object contains references to the left fixed clumn column's nodes
 * @param {object} o.rightClone Instance's object dom.clone.right for easy reference. This object contains references to the right fixed clumn column's nodes
 */
    // Make FixedColumns accessible from the DataTables instance
    $.fn.dataTable.FixedColumns = FixedColumns;
    $.fn.DataTable.FixedColumns = FixedColumns;
    return FixedColumns;
  };
  // /factory
  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define([
      'jquery',
      'datatables'
    ], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery && !jQuery.fn.dataTable.FixedColumns) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }
}(window, document));
/*! Responsive 1.0.6
 * 2014-2015 SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     Responsive
 * @description Responsive tables plug-in for DataTables
 * @version     1.0.6
 * @file        dataTables.responsive.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2014-2015 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function (window, document, undefined) {
  var factory = function ($, DataTable) {
    'use strict';
    /**
 * Responsive is a plug-in for the DataTables library that makes use of
 * DataTables' ability to change the visibility of columns, changing the
 * visibility of columns so the displayed columns fit into the table container.
 * The end result is that complex tables will be dynamically adjusted to fit
 * into the viewport, be it on a desktop, tablet or mobile browser.
 *
 * Responsive for DataTables has two modes of operation, which can used
 * individually or combined:
 *
 * * Class name based control - columns assigned class names that match the
 *   breakpoint logic can be shown / hidden as required for each breakpoint.
 * * Automatic control - columns are automatically hidden when there is no
 *   room left to display them. Columns removed from the right.
 *
 * In additional to column visibility control, Responsive also has built into
 * options to use DataTables' child row display to show / hide the information
 * from the table that has been hidden. There are also two modes of operation
 * for this child row display:
 *
 * * Inline - when the control element that the user can use to show / hide
 *   child rows is displayed inside the first column of the table.
 * * Column - where a whole column is dedicated to be the show / hide control.
 *
 * Initialisation of Responsive is performed by:
 *
 * * Adding the class `responsive` or `dt-responsive` to the table. In this case
 *   Responsive will automatically be initialised with the default configuration
 *   options when the DataTable is created.
 * * Using the `responsive` option in the DataTables configuration options. This
 *   can also be used to specify the configuration options, or simply set to
 *   `true` to use the defaults.
 *
 *  @class
 *  @param {object} settings DataTables settings object for the host table
 *  @param {object} [opts] Configuration options
 *  @requires jQuery 1.7+
 *  @requires DataTables 1.10.1+
 *
 *  @example
 *      $('#example').DataTable( {
 *        responsive: true
 *      } );
 *    } );
 */
    var Responsive = function (settings, opts) {
      // Sanity check that we are using DataTables 1.10 or newer
      if (!DataTable.versionCheck || !DataTable.versionCheck('1.10.1')) {
        throw 'DataTables Responsive requires DataTables 1.10.1 or newer';
      }
      this.s = {
        dt: new DataTable.Api(settings),
        columns: []
      };
      // Check if responsive has already been initialised on this table
      if (this.s.dt.settings()[0].responsive) {
        return;
      }
      // details is an object, but for simplicity the user can give it as a string
      if (opts && typeof opts.details === 'string') {
        opts.details = { type: opts.details };
      }
      this.c = $.extend(true, {}, Responsive.defaults, DataTable.defaults.responsive, opts);
      settings.responsive = this;
      this._constructor();
    };
    Responsive.prototype = {
      _constructor: function () {
        var that = this;
        var dt = this.s.dt;
        dt.settings()[0]._responsive = this;
        // Use DataTables' private throttle function to avoid processor thrashing
        $(window).on('resize.dtr orientationchange.dtr', dt.settings()[0].oApi._fnThrottle(function () {
          that._resize();
        }));
        // Destroy event handler
        dt.on('destroy.dtr', function () {
          $(window).off('resize.dtr orientationchange.dtr draw.dtr');
        });
        // Reorder the breakpoints array here in case they have been added out
        // of order
        this.c.breakpoints.sort(function (a, b) {
          return a.width < b.width ? 1 : a.width > b.width ? -1 : 0;
        });
        // Determine which columns are already hidden, and should therefore
        // remain hidden. todo - should this be done? See thread 22677
        //
        // this.s.alwaysHidden = dt.columns(':hidden').indexes();
        this._classLogic();
        this._resizeAuto();
        // Details handler
        var details = this.c.details;
        if (details.type) {
          that._detailsInit();
          this._detailsVis();
          dt.on('column-visibility.dtr', function () {
            that._detailsVis();
          });
          // Redraw the details box on each draw. This is used until
          // DataTables implements a native `updated` event for rows
          dt.on('draw.dtr', function () {
            dt.rows({ page: 'current' }).iterator('row', function (settings, idx) {
              var row = dt.row(idx);
              if (row.child.isShown()) {
                var info = that.c.details.renderer(dt, idx);
                row.child(info, 'child').show();
              }
            });
          });
          $(dt.table().node()).addClass('dtr-' + details.type);
        }
        // First pass - draw the table for the current viewport size
        this._resize();
      },
      _columnsVisiblity: function (breakpoint) {
        var dt = this.s.dt;
        var columns = this.s.columns;
        var i, ien;
        // Class logic - determine which columns are in this breakpoint based
        // on the classes. If no class control (i.e. `auto`) then `-` is used
        // to indicate this to the rest of the function
        var display = $.map(columns, function (col) {
            return col.auto && col.minWidth === null ? false : col.auto === true ? '-' : $.inArray(breakpoint, col.includeIn) !== -1;
          });
        // Auto column control - first pass: how much width is taken by the
        // ones that must be included from the non-auto columns
        var requiredWidth = 0;
        for (i = 0, ien = display.length; i < ien; i++) {
          if (display[i] === true) {
            requiredWidth += columns[i].minWidth;
          }
        }
        // Second pass, use up any remaining width for other columns. For
        // scrolling tables we need to subtract the width of the scrollbar. It
        // may not be requires which makes this sub-optimal, but it would
        // require another full redraw to make complete use of those extra few
        // pixels
        var scrolling = dt.settings()[0].oScroll;
        var bar = scrolling.sY || scrolling.sX ? scrolling.iBarWidth : 0;
        var widthAvailable = dt.table().container().offsetWidth - bar;
        var usedWidth = widthAvailable - requiredWidth;
        // Control column needs to always be included. This makes it sub-
        // optimal in terms of using the available with, but to stop layout
        // thrashing or overflow. Also we need to account for the control column
        // width first so we know how much width is available for the other
        // columns, since the control column might not be the first one shown
        for (i = 0, ien = display.length; i < ien; i++) {
          if (columns[i].control) {
            usedWidth -= columns[i].minWidth;
          }
        }
        // Allow columns to be shown (counting from the left) until we run out
        // of room
        var empty = false;
        for (i = 0, ien = display.length; i < ien; i++) {
          if (display[i] === '-' && !columns[i].control) {
            // Once we've found a column that won't fit we don't let any
            // others display either, or columns might disappear in the
            // middle of the table
            if (empty || usedWidth - columns[i].minWidth < 0) {
              empty = true;
              display[i] = false;
            } else {
              display[i] = true;
            }
            usedWidth -= columns[i].minWidth;
          }
        }
        // Determine if the 'control' column should be shown (if there is one).
        // This is the case when there is a hidden column (that is not the
        // control column). The two loops look inefficient here, but they are
        // trivial and will fly through. We need to know the outcome from the
        // first , before the action in the second can be taken
        var showControl = false;
        for (i = 0, ien = columns.length; i < ien; i++) {
          if (!columns[i].control && !columns[i].never && !display[i]) {
            showControl = true;
            break;
          }
        }
        for (i = 0, ien = columns.length; i < ien; i++) {
          if (columns[i].control) {
            display[i] = showControl;
          }
        }
        // Finally we need to make sure that there is at least one column that
        // is visible
        if ($.inArray(true, display) === -1) {
          display[0] = true;
        }
        return display;
      },
      _classLogic: function () {
        var that = this;
        var calc = {};
        var breakpoints = this.c.breakpoints;
        var columns = this.s.dt.columns().eq(0).map(function (i) {
            var className = this.column(i).header().className;
            return {
              className: className,
              includeIn: [],
              auto: false,
              control: false,
              never: className.match(/\bnever\b/) ? true : false
            };
          });
        // Simply add a breakpoint to `includeIn` array, ensuring that there are
        // no duplicates
        var add = function (colIdx, name) {
          var includeIn = columns[colIdx].includeIn;
          if ($.inArray(name, includeIn) === -1) {
            includeIn.push(name);
          }
        };
        var column = function (colIdx, name, operator, matched) {
          var size, i, ien;
          if (!operator) {
            columns[colIdx].includeIn.push(name);
          } else if (operator === 'max-') {
            // Add this breakpoint and all smaller
            size = that._find(name).width;
            for (i = 0, ien = breakpoints.length; i < ien; i++) {
              if (breakpoints[i].width <= size) {
                add(colIdx, breakpoints[i].name);
              }
            }
          } else if (operator === 'min-') {
            // Add this breakpoint and all larger
            size = that._find(name).width;
            for (i = 0, ien = breakpoints.length; i < ien; i++) {
              if (breakpoints[i].width >= size) {
                add(colIdx, breakpoints[i].name);
              }
            }
          } else if (operator === 'not-') {
            // Add all but this breakpoint (xxx need extra information)
            for (i = 0, ien = breakpoints.length; i < ien; i++) {
              if (breakpoints[i].name.indexOf(matched) === -1) {
                add(colIdx, breakpoints[i].name);
              }
            }
          }
        };
        // Loop over each column and determine if it has a responsive control
        // class
        columns.each(function (col, i) {
          var classNames = col.className.split(' ');
          var hasClass = false;
          // Split the class name up so multiple rules can be applied if needed
          for (var k = 0, ken = classNames.length; k < ken; k++) {
            var className = $.trim(classNames[k]);
            if (className === 'all') {
              // Include in all
              hasClass = true;
              col.includeIn = $.map(breakpoints, function (a) {
                return a.name;
              });
              return;
            } else if (className === 'none' || className === 'never') {
              // Include in none (default) and no auto
              hasClass = true;
              return;
            } else if (className === 'control') {
              // Special column that is only visible, when one of the other
              // columns is hidden. This is used for the details control
              hasClass = true;
              col.control = true;
              return;
            }
            $.each(breakpoints, function (j, breakpoint) {
              // Does this column have a class that matches this breakpoint?
              var brokenPoint = breakpoint.name.split('-');
              var re = new RegExp('(min\\-|max\\-|not\\-)?(' + brokenPoint[0] + ')(\\-[_a-zA-Z0-9])?');
              var match = className.match(re);
              if (match) {
                hasClass = true;
                if (match[2] === brokenPoint[0] && match[3] === '-' + brokenPoint[1]) {
                  // Class name matches breakpoint name fully
                  column(i, breakpoint.name, match[1], match[2] + match[3]);
                } else if (match[2] === brokenPoint[0] && !match[3]) {
                  // Class name matched primary breakpoint name with no qualifier
                  column(i, breakpoint.name, match[1], match[2]);
                }
              }
            });
          }
          // If there was no control class, then automatic sizing is used
          if (!hasClass) {
            col.auto = true;
          }
        });
        this.s.columns = columns;
      },
      _detailsInit: function () {
        var that = this;
        var dt = this.s.dt;
        var details = this.c.details;
        // The inline type always uses the first child as the target
        if (details.type === 'inline') {
          details.target = 'td:first-child';
        }
        // type.target can be a string jQuery selector or a column index
        var target = details.target;
        var selector = typeof target === 'string' ? target : 'td';
        // Click handler to show / hide the details rows when they are available
        $(dt.table().body()).on('click', selector, function (e) {
          // If the table is not collapsed (i.e. there is no hidden columns)
          // then take no action
          if (!$(dt.table().node()).hasClass('collapsed')) {
            return;
          }
          // Check that the row is actually a DataTable's controlled node
          if (!dt.row($(this).closest('tr')).length) {
            return;
          }
          // For column index, we determine if we should act or not in the
          // handler - otherwise it is already okay
          if (typeof target === 'number') {
            var targetIdx = target < 0 ? dt.columns().eq(0).length + target : target;
            if (dt.cell(this).index().column !== targetIdx) {
              return;
            }
          }
          // $().closest() includes itself in its check
          var row = dt.row($(this).closest('tr'));
          if (row.child.isShown()) {
            row.child(false);
            $(row.node()).removeClass('parent');
          } else {
            var info = that.c.details.renderer(dt, row[0]);
            row.child(info, 'child').show();
            $(row.node()).addClass('parent');
          }
        });
      },
      _detailsVis: function () {
        var that = this;
        var dt = this.s.dt;
        // Find how many columns are hidden
        var hiddenColumns = dt.columns().indexes().filter(function (idx) {
            var col = dt.column(idx);
            if (col.visible()) {
              return null;
            }
            // Only counts as hidden if it doesn't have the `never` class
            return $(col.header()).hasClass('never') ? null : idx;
          });
        var haveHidden = true;
        if (hiddenColumns.length === 0 || hiddenColumns.length === 1 && this.s.columns[hiddenColumns[0]].control) {
          haveHidden = false;
        }
        if (haveHidden) {
          // Show all existing child rows
          dt.rows({ page: 'current' }).eq(0).each(function (idx) {
            var row = dt.row(idx);
            if (row.child()) {
              var info = that.c.details.renderer(dt, row[0]);
              // The renderer can return false to have no child row
              if (info === false) {
                row.child.hide();
              } else {
                row.child(info, 'child').show();
              }
            }
          });
        } else {
          // Hide all existing child rows
          dt.rows({ page: 'current' }).eq(0).each(function (idx) {
            dt.row(idx).child.hide();
          });
        }
      },
      _find: function (name) {
        var breakpoints = this.c.breakpoints;
        for (var i = 0, ien = breakpoints.length; i < ien; i++) {
          if (breakpoints[i].name === name) {
            return breakpoints[i];
          }
        }
      },
      _resize: function () {
        var dt = this.s.dt;
        var width = $(window).width();
        var breakpoints = this.c.breakpoints;
        var breakpoint = breakpoints[0].name;
        var columns = this.s.columns;
        var i, ien;
        // Determine what breakpoint we are currently at
        for (i = breakpoints.length - 1; i >= 0; i--) {
          if (width <= breakpoints[i].width) {
            breakpoint = breakpoints[i].name;
            break;
          }
        }
        // Show the columns for that break point
        var columnsVis = this._columnsVisiblity(breakpoint);
        // Set the class before the column visibility is changed so event
        // listeners know what the state is. Need to determine if there are
        // any columns that are not visible but can be shown
        var collapsedClass = false;
        for (i = 0, ien = columns.length; i < ien; i++) {
          if (columnsVis[i] === false && !columns[i].never) {
            collapsedClass = true;
            break;
          }
        }
        $(dt.table().node()).toggleClass('collapsed', collapsedClass);
        dt.columns().eq(0).each(function (colIdx, i) {
          dt.column(colIdx).visible(columnsVis[i]);
        });
      },
      _resizeAuto: function () {
        var dt = this.s.dt;
        var columns = this.s.columns;
        // Are we allowed to do auto sizing?
        if (!this.c.auto) {
          return;
        }
        // Are there any columns that actually need auto-sizing, or do they all
        // have classes defined
        if ($.inArray(true, $.map(columns, function (c) {
            return c.auto;
          })) === -1) {
          return;
        }
        // Clone the table with the current data in it
        var tableWidth = dt.table().node().offsetWidth;
        var columnWidths = dt.columns;
        var clonedTable = dt.table().node().cloneNode(false);
        var clonedHeader = $(dt.table().header().cloneNode(false)).appendTo(clonedTable);
        var clonedBody = $(dt.table().body().cloneNode(false)).appendTo(clonedTable);
        $(dt.table().footer()).clone(false).appendTo(clonedTable);
        // This is a bit slow, but we need to get a clone of each row that
        // includes all columns. As such, try to do this as little as possible.
        dt.rows({ page: 'current' }).indexes().flatten().each(function (idx) {
          var clone = dt.row(idx).node().cloneNode(true);
          if (dt.columns(':hidden').flatten().length) {
            $(clone).append(dt.cells(idx, ':hidden').nodes().to$().clone());
          }
          $(clone).appendTo(clonedBody);
        });
        var cells = dt.columns().header().to$().clone(false);
        $('<tr/>').append(cells).appendTo(clonedHeader);
        // In the inline case extra padding is applied to the first column to
        // give space for the show / hide icon. We need to use this in the
        // calculation
        if (this.c.details.type === 'inline') {
          $(clonedTable).addClass('dtr-inline collapsed');
        }
        var inserted = $('<div/>').css({
            width: 1,
            height: 1,
            overflow: 'hidden'
          }).append(clonedTable);
        // Remove columns which are not to be included
        inserted.find('th.never, td.never').remove();
        inserted.insertBefore(dt.table().node());
        // The cloned header now contains the smallest that each column can be
        dt.columns().eq(0).each(function (idx) {
          columns[idx].minWidth = cells[idx].offsetWidth || 0;
        });
        inserted.remove();
      }
    };
    /**
 * List of default breakpoints. Each item in the array is an object with two
 * properties:
 *
 * * `name` - the breakpoint name.
 * * `width` - the breakpoint width
 *
 * @name Responsive.breakpoints
 * @static
 */
    Responsive.breakpoints = [
      {
        name: 'desktop',
        width: Infinity
      },
      {
        name: 'tablet-l',
        width: 1024
      },
      {
        name: 'tablet-p',
        width: 768
      },
      {
        name: 'mobile-l',
        width: 480
      },
      {
        name: 'mobile-p',
        width: 320
      }
    ];
    /**
 * Responsive default settings for initialisation
 *
 * @namespace
 * @name Responsive.defaults
 * @static
 */
    Responsive.defaults = {
      breakpoints: Responsive.breakpoints,
      auto: true,
      details: {
        renderer: function (api, rowIdx) {
          var data = api.cells(rowIdx, ':hidden').eq(0).map(function (cell) {
              var header = $(api.column(cell.column).header());
              var idx = api.cell(cell).index();
              if (header.hasClass('control') || header.hasClass('never')) {
                return '';
              }
              // Use a non-public DT API method to render the data for display
              // This needs to be updated when DT adds a suitable method for
              // this type of data retrieval
              var dtPrivate = api.settings()[0];
              var cellData = dtPrivate.oApi._fnGetCellData(dtPrivate, idx.row, idx.column, 'display');
              var title = header.text();
              if (title) {
                title = title + ':';
              }
              return '<li data-dtr-index="' + idx.column + '">' + '<span class="dtr-title">' + title + '</span> ' + '<span class="dtr-data">' + cellData + '</span>' + '</li>';
            }).toArray().join('');
          return data ? $('<ul data-dtr-index="' + rowIdx + '"/>').append(data) : false;
        },
        target: 0,
        type: 'inline'
      }
    };
    /*
 * API
 */
    var Api = $.fn.dataTable.Api;
    // Doesn't do anything - work around for a bug in DT... Not documented
    Api.register('responsive()', function () {
      return this;
    });
    Api.register('responsive.index()', function (li) {
      li = $(li);
      return {
        column: li.data('dtr-index'),
        row: li.parent().data('dtr-index')
      };
    });
    Api.register('responsive.rebuild()', function () {
      return this.iterator('table', function (ctx) {
        if (ctx._responsive) {
          ctx._responsive._classLogic();
        }
      });
    });
    Api.register('responsive.recalc()', function () {
      return this.iterator('table', function (ctx) {
        if (ctx._responsive) {
          ctx._responsive._resizeAuto();
          ctx._responsive._resize();
        }
      });
    });
    /**
 * Version information
 *
 * @name Responsive.version
 * @static
 */
    Responsive.version = '1.0.6';
    $.fn.dataTable.Responsive = Responsive;
    $.fn.DataTable.Responsive = Responsive;
    // Attach a listener to the document which listens for DataTables initialisation
    // events so we can automatically initialise
    $(document).on('init.dt.dtr', function (e, settings, json) {
      if (e.namespace !== 'dt') {
        return;
      }
      if ($(settings.nTable).hasClass('responsive') || $(settings.nTable).hasClass('dt-responsive') || settings.oInit.responsive || DataTable.defaults.responsive) {
        var init = settings.oInit.responsive;
        if (init !== false) {
          new Responsive(settings, $.isPlainObject(init) ? init : {});
        }
      }
    });
    return Responsive;
  };
  // /factory
  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define([
      'jquery',
      'datatables'
    ], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery && !jQuery.fn.dataTable.Responsive) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }
}(window, document));
/*!
 Buttons for DataTables 1.0.3
 ©2015 SpryMedia Ltd - datatables.net/license
*/
(function (r, n, m) {
  var p = function (e, j) {
    var p = 0, s = 0, k = j.ext.buttons, l = function (a, b) {
        !0 === b && (b = {});
        e.isArray(b) && (b = { buttons: b });
        this.c = e.extend(!0, {}, l.defaults, b);
        b.buttons && (this.c.buttons = b.buttons);
        this.s = {
          dt: new j.Api(a),
          buttons: [],
          subButtons: [],
          listenKeys: '',
          namespace: 'dtb' + p++
        };
        this.dom = { container: e('<' + this.c.dom.container.tag + '/>').addClass(this.c.dom.container.className) };
        this._constructor();
      };
    e.extend(l.prototype, {
      action: function (a, b) {
        var c = this._indexToButton(a).conf;
        if (b === m)
          return c.action;
        c.action = b;
        return this;
      },
      active: function (a, b) {
        this._indexToButton(a).node.toggleClass(this.c.dom.button.active, b === m ? !0 : b);
        return this;
      },
      add: function (a, b) {
        if ('string' === typeof a && -1 !== a.indexOf('-')) {
          var c = a.split('-');
          this.c.buttons[1 * c[0]].buttons.splice(1 * c[1], 0, b);
        } else
          this.c.buttons.splice(1 * a, 0, b);
        this.dom.container.empty();
        this._buildButtons(this.c.buttons);
        return this;
      },
      container: function () {
        return this.dom.container;
      },
      disable: function (a) {
        this._indexToButton(a).node.addClass(this.c.dom.button.disabled);
        return this;
      },
      destroy: function () {
        e('body').off('keyup.' + this.s.namespace);
        var a = this.s.buttons, b = this.s.subButtons, c, d, f;
        c = 0;
        for (a = a.length; c < a; c++) {
          this.removePrep(c);
          d = 0;
          for (f = b[c].length; d < f; d++)
            this.removePrep(c + '-' + d);
        }
        this.removeCommit();
        this.dom.container.remove();
        b = this.s.dt.settings()[0];
        c = 0;
        for (a = b.length; c < a; c++)
          if (b.inst === this) {
            b.splice(c, 1);
            break;
          }
        return this;
      },
      enable: function (a, b) {
        if (!1 === b)
          return this.disable(a);
        this._indexToButton(a).node.removeClass(this.c.dom.button.disabled);
        return this;
      },
      name: function () {
        return this.c.name;
      },
      node: function (a) {
        return this._indexToButton(a).node;
      },
      removeCommit: function () {
        var a = this.s.buttons, b = this.s.subButtons, c, d;
        for (c = a.length - 1; 0 <= c; c--)
          null === a[c] && (a.splice(c, 1), b.splice(c, 1), this.c.buttons.splice(c, 1));
        c = 0;
        for (a = b.length; c < a; c++)
          for (d = b[c].length - 1; 0 <= d; d--)
            null === b[c][d] && (b[c].splice(d, 1), this.c.buttons[c].buttons.splice(d, 1));
        return this;
      },
      removePrep: function (a) {
        var b, c = this.s.dt;
        if ('number' === typeof a || -1 === a.indexOf('-'))
          b = this.s.buttons[1 * a], b.conf.destroy && b.conf.destroy.call(c.button(a), c, b, b.conf), b.node.remove(), this._removeKey(b.conf), this.s.buttons[1 * a] = null;
        else {
          var d = a.split('-');
          b = this.s.subButtons[1 * d[0]][1 * d[1]];
          b.conf.destroy && b.conf.destroy.call(c.button(a), c, b, b.conf);
          b.node.remove();
          this._removeKey(b.conf);
          this.s.subButtons[1 * d[0]][1 * d[1]] = null;
        }
        return this;
      },
      text: function (a, b) {
        var c = this._indexToButton(a), d = this.c.dom.buttonLiner.tag, e = this.s.dt, g = function (a) {
            return 'function' === typeof a ? a(e, c.node, c.conf) : a;
          };
        if (b === m)
          return g(c.conf.text);
        c.conf.text = b;
        d ? c.node.children(d).html(g(b)) : c.node.html(g(b));
        return this;
      },
      toIndex: function (a) {
        var b, c, d, e;
        d = this.s.buttons;
        var g = this.s.subButtons;
        b = 0;
        for (c = d.length; b < c; b++)
          if (d[b].node[0] === a)
            return b + '';
        b = 0;
        for (c = g.length; b < c; b++) {
          d = 0;
          for (e = g[b].length; d < e; d++)
            if (g[b][d].node[0] === a)
              return b + '-' + d;
        }
      },
      _constructor: function () {
        var a = this, b = this.s.dt, c = b.settings()[0];
        c._buttons || (c._buttons = []);
        c._buttons.push({
          inst: this,
          name: this.c.name
        });
        this._buildButtons(this.c.buttons);
        b.on('destroy', function () {
          a.destroy();
        });
        e('body').on('keyup.' + this.s.namespace, function (b) {
          if (!n.activeElement || n.activeElement === n.body) {
            var c = String.fromCharCode(b.keyCode).toLowerCase();
            a.s.listenKeys.toLowerCase().indexOf(c) !== -1 && a._keypress(c, b);
          }
        });
      },
      _addKey: function (a) {
        a.key && (this.s.listenKeys += e.isPlainObject(a.key) ? a.key.key : a.key);
      },
      _buildButtons: function (a, b, c) {
        var d = this.s.dt;
        b || (b = this.dom.container, this.s.buttons = [], this.s.subButtons = []);
        for (var f = 0, g = a.length; f < g; f++) {
          var h = this._resolveExtends(a[f]);
          if (h)
            if (e.isArray(h))
              this._buildButtons(h, b, c);
            else {
              var i = this._buildButton(h, c !== m ? !0 : !1);
              if (i) {
                var q = i.node;
                b.append(i.inserter);
                c === m ? (this.s.buttons.push({
                  node: q,
                  conf: h,
                  inserter: i.inserter
                }), this.s.subButtons.push([])) : this.s.subButtons[c].push({
                  node: q,
                  conf: h,
                  inserter: i.inserter
                });
                h.buttons && (i = this.c.dom.collection, h._collection = e('<' + i.tag + '/>').addClass(i.className), this._buildButtons(h.buttons, h._collection, f));
                h.init && h.init.call(d.button(q), d, q, h);
              }
            }
        }
      },
      _buildButton: function (a, b) {
        var c = this.c.dom.button, d = this.c.dom.buttonLiner, f = this.c.dom.collection, g = this.s.dt, h = function (b) {
            return 'function' === typeof b ? b(g, i, a) : b;
          };
        b && f.button && (c = f.button);
        b && f.buttonLiner && (d = f.buttonLiner);
        if (a.available && !a.available(g, a))
          return !1;
        var i = e('<' + c.tag + '/>').addClass(c.className).attr('tabindex', this.s.dt.settings()[0].iTabIndex).attr('aria-controls', this.s.dt.table().node().id).on('click.dtb', function (b) {
            b.preventDefault();
            !i.hasClass(c.disabled) && a.action && a.action.call(g.button(i), b, g, i, a);
            i.blur();
          }).on('keyup.dtb', function (b) {
            b.keyCode === 13 && !i.hasClass(c.disabled) && a.action && a.action.call(g.button(i), b, g, i, a);
          });
        d.tag ? i.append(e('<' + d.tag + '/>').html(h(a.text)).addClass(d.className)) : i.html(h(a.text));
        !1 === a.enabled && i.addClass(c.disabled);
        a.className && i.addClass(a.className);
        a.namespace || (a.namespace = '.dt-button-' + s++);
        d = (d = this.c.dom.buttonContainer) ? e('<' + d.tag + '/>').addClass(d.className).append(i) : i;
        this._addKey(a);
        return {
          node: i,
          inserter: d
        };
      },
      _indexToButton: function (a) {
        if ('number' === typeof a || -1 === a.indexOf('-'))
          return this.s.buttons[1 * a];
        a = a.split('-');
        return this.s.subButtons[1 * a[0]][1 * a[1]];
      },
      _keypress: function (a, b) {
        var c, d, f, g;
        f = this.s.buttons;
        var h = this.s.subButtons, i = function (c, d) {
            if (c.key)
              if (c.key === a)
                d.click();
              else if (e.isPlainObject(c.key) && c.key.key === a && (!c.key.shiftKey || b.shiftKey))
                if (!c.key.altKey || b.altKey)
                  if (!c.key.ctrlKey || b.ctrlKey)
                    (!c.key.metaKey || b.metaKey) && d.click();
          };
        c = 0;
        for (d = f.length; c < d; c++)
          i(f[c].conf, f[c].node);
        c = 0;
        for (d = h.length; c < d; c++) {
          f = 0;
          for (g = h[c].length; f < g; f++)
            i(h[c][f].conf, h[c][f].node);
        }
      },
      _removeKey: function (a) {
        if (a.key) {
          var b = e.isPlainObject(a.key) ? a.key.key : a.key, a = this.s.listenKeys.split(''), b = e.inArray(b, a);
          a.splice(b, 1);
          this.s.listenKeys = a.join('');
        }
      },
      _resolveExtends: function (a) {
        for (var b = this.s.dt, c, d, f = function (c) {
              for (var d = 0; !e.isPlainObject(c) && !e.isArray(c);) {
                if ('function' === typeof c) {
                  if (c = c(b, a), !c)
                    return !1;
                } else if ('string' === typeof c) {
                  if (!k[c])
                    throw 'Unknown button type: ' + c;
                  c = k[c];
                }
                d++;
                if (30 < d)
                  throw 'Buttons: Too many iterations';
              }
              return e.isArray(c) ? c : e.extend({}, c);
            }, a = f(a); a && a.extend;) {
          var g = f(k[a.extend]);
          if (e.isArray(g))
            return g;
          c = g.className;
          a = e.extend({}, g, a);
          c && a.className !== c && (a.className = c + ' ' + a.className);
          var h = a.postfixButtons;
          if (h) {
            a.buttons || (a.buttons = []);
            c = 0;
            for (d = h.length; c < d; c++)
              a.buttons.push(h[c]);
            a.postfixButtons = null;
          }
          if (h = a.prefixButtons) {
            a.buttons || (a.buttons = []);
            c = 0;
            for (d = h.length; c < d; c++)
              a.buttons.splice(c, 0, h[c]);
            a.prefixButtons = null;
          }
          a.extend = g.extend;
        }
        return a;
      }
    });
    l.background = function (a, b, c) {
      c === m && (c = 400);
      a ? e('<div/>').addClass(b).css('display', 'none').appendTo('body').fadeIn(c) : e('body > div.' + b).fadeOut(c, function () {
        e(this).remove();
      });
    };
    l.instanceSelector = function (a, b) {
      if (!a)
        return e.map(b, function (a) {
          return a.inst;
        });
      var c = [], d = e.map(b, function (a) {
          return a.name;
        }), f = function (a) {
          if (e.isArray(a))
            for (var h = 0, i = a.length; h < i; h++)
              f(a[h]);
          else
            'string' === typeof a ? -1 !== a.indexOf(',') ? f(a.split(',')) : (a = e.inArray(e.trim(a), d), -1 !== a && c.push(b[a].inst)) : 'number' === typeof a && c.push(b[a].inst);
        };
      f(a);
      return c;
    };
    l.buttonSelector = function (a, b) {
      for (var c = [], d = function (a, b) {
            var f, g, j = [];
            e.each(b.s.buttons, function (a, b) {
              null !== b && j.push({
                node: b.node[0],
                name: b.name
              });
            });
            e.each(b.s.subButtons, function (a, b) {
              e.each(b, function (a, b) {
                null !== b && j.push({
                  node: b.node[0],
                  name: b.name
                });
              });
            });
            f = e.map(j, function (a) {
              return a.node;
            });
            if (e.isArray(a) || a instanceof e) {
              f = 0;
              for (g = a.length; f < g; f++)
                d(a[f], b);
            } else if (null === a || a === m || '*' === a) {
              f = 0;
              for (g = j.length; f < g; f++)
                c.push({
                  inst: b,
                  idx: b.toIndex(j[f].node)
                });
            } else if ('number' === typeof a)
              c.push({
                inst: b,
                idx: a
              });
            else if ('string' === typeof a)
              if (-1 !== a.indexOf(',')) {
                var k = a.split(',');
                f = 0;
                for (g = k.length; f < g; f++)
                  d(e.trim(k[f]), b);
              } else if (a.match(/^\d+(\-\d+)?$/))
                c.push({
                  inst: b,
                  idx: a
                });
              else if (-1 !== a.indexOf(':name')) {
                k = a.replace(':name', '');
                f = 0;
                for (g = j.length; f < g; f++)
                  j[f].name === k && c.push({
                    inst: b,
                    idx: b.toIndex(j[f].node)
                  });
              } else
                e(f).filter(a).each(function () {
                  c.push({
                    inst: b,
                    idx: b.toIndex(this)
                  });
                });
            else
              'object' === typeof a && a.nodeName && (g = e.inArray(a, f), -1 !== g && c.push({
                inst: b,
                idx: b.toIndex(f[g])
              }));
          }, f = 0, g = a.length; f < g; f++)
        d(b, a[f]);
      return c;
    };
    l.defaults = {
      buttons: [
        'copy',
        'excel',
        'csv',
        'pdf',
        'print'
      ],
      name: 'main',
      tabIndex: 0,
      dom: {
        container: {
          tag: 'div',
          className: 'dt-buttons'
        },
        collection: {
          tag: 'div',
          className: 'dt-button-collection'
        },
        button: {
          tag: 'a',
          className: 'dt-button',
          active: 'active',
          disabled: 'disabled'
        },
        buttonLiner: {
          tag: 'span',
          className: ''
        }
      }
    };
    l.version = '1.0.3';
    e.extend(k, {
      collection: {
        text: function (a) {
          return a.i18n('buttons.collection', 'Collection');
        },
        className: 'buttons-collection',
        action: function (a, b, c, d) {
          a = c.offset();
          b = e(b.table().container());
          d._collection.addClass(d.collectionLayout).css('display', 'none').appendTo('body').fadeIn(d.fade);
          'absolute' === d._collection.css('position') ? (d._collection.css({
            top: a.top + c.outerHeight(),
            left: a.left
          }), c = a.left + d._collection.outerWidth(), b = b.offset().left + b.width(), c > b && d._collection.css('left', a.left - (c - b))) : (a = d._collection.height() / 2, a > e(r).height() / 2 && (a = e(r).height() / 2), d._collection.css('marginTop', -1 * a));
          d.background && l.background(!0, d.backgroundClassName, d.fade);
          setTimeout(function () {
            e(n).on('click.dtb-collection', function (a) {
              if (!e(a.target).parents().andSelf().filter(d._collection).length) {
                d._collection.fadeOut(d.fade, function () {
                  d._collection.detach();
                });
                l.background(false, d.backgroundClassName, d.fade);
                e(n).off('click.dtb-collection');
              }
            });
          }, 10);
        },
        background: !0,
        collectionLayout: '',
        backgroundClassName: 'dt-button-background',
        fade: 400
      },
      copy: function (a, b) {
        if (b.preferHtml && k.copyHtml5)
          return 'copyHtml5';
        if (k.copyFlash && k.copyFlash.available(a, b))
          return 'copyFlash';
        if (k.copyHtml5)
          return 'copyHtml5';
      },
      csv: function (a, b) {
        if (k.csvHtml5 && k.csvHtml5.available(a, b))
          return 'csvHtml5';
        if (k.csvFlash && k.csvFlash.available(a, b))
          return 'csvFlash';
      },
      excel: function (a, b) {
        if (k.excelHtml5 && k.excelHtml5.available(a, b))
          return 'excelHtml5';
        if (k.excelFlash && k.excelFlash.available(a, b))
          return 'excelFlash';
      },
      pdf: function (a, b) {
        if (k.pdfHtml5 && k.pdfHtml5.available(a, b))
          return 'pdfHtml5';
        if (k.pdfFlash && k.pdfFlash.available(a, b))
          return 'pdfFlash';
      }
    });
    j.Api.register('buttons()', function (a, b) {
      b === m && (b = a, a = m);
      return this.iterator(!0, 'table', function (c) {
        if (c._buttons)
          return l.buttonSelector(l.instanceSelector(a, c._buttons), b);
      }, !0);
    });
    j.Api.register('button()', function (a, b) {
      var c = this.buttons(a, b);
      1 < c.length && c.splice(1, c.length);
      return c;
    });
    j.Api.register([
      'buttons().active()',
      'button().active()'
    ], function (a) {
      return this.each(function (b) {
        b.inst.active(b.idx, a);
      });
    });
    j.Api.registerPlural('buttons().action()', 'button().action()', function (a) {
      return a === m ? this.map(function (a) {
        return a.inst.action(a.idx);
      }) : this.each(function (b) {
        b.inst.action(b.idx, a);
      });
    });
    j.Api.register([
      'buttons().enable()',
      'button().enable()'
    ], function (a) {
      return this.each(function (b) {
        b.inst.enable(b.idx, a);
      });
    });
    j.Api.register([
      'buttons().disable()',
      'button().disable()'
    ], function () {
      return this.each(function (a) {
        a.inst.disable(a.idx);
      });
    });
    j.Api.registerPlural('buttons().nodes()', 'button().node()', function () {
      var a = e();
      e(this.each(function (b) {
        a = a.add(b.inst.node(b.idx));
      }));
      return a;
    });
    j.Api.registerPlural('buttons().text()', 'button().text()', function (a) {
      return a === m ? this.map(function (a) {
        return a.inst.text(a.idx);
      }) : this.each(function (b) {
        b.inst.text(b.idx, a);
      });
    });
    j.Api.registerPlural('buttons().trigger()', 'button().trigger()', function () {
      return this.each(function (a) {
        a.inst.node(a.idx).trigger('click');
      });
    });
    j.Api.registerPlural('buttons().containers()', 'buttons().container()', function () {
      var a = e();
      e(this.each(function (b) {
        a = a.add(b.inst.container());
      }));
      return a;
    });
    j.Api.register('button().add()', function (a, b) {
      1 === this.length && this[0].inst.add(a, b);
      return this.button(a);
    });
    j.Api.register('buttons().destroy()', function () {
      this.pluck('inst').unique().each(function (a) {
        a.destroy();
      });
      return this;
    });
    j.Api.registerPlural('buttons().remove()', 'buttons().remove()', function () {
      this.each(function (a) {
        a.inst.removePrep(a.idx);
      });
      this.pluck('inst').unique().each(function (a) {
        a.removeCommit();
      });
      return this;
    });
    var o;
    j.Api.register('buttons.info()', function (a, b, c) {
      var d = this;
      if (!1 === a)
        return e('#datatables_buttons_info').fadeOut(function () {
          e(this).remove();
        }), clearTimeout(o), o = null, this;
      o && clearTimeout(o);
      e('#datatables_buttons_info').length && e('#datatables_buttons_info').remove();
      e('<div id="datatables_buttons_info" class="dt-button-info"/>').html(a ? '<h2>' + a + '</h2>' : '').append(e('<div/>')['string' === typeof b ? 'html' : 'append'](b)).css('display', 'none').appendTo('body').fadeIn();
      c !== m && 0 !== c && (o = setTimeout(function () {
        d.buttons.info(!1);
      }, c));
      return this;
    });
    j.Api.register('buttons.exportData()', function (a) {
      if (this.context.length) {
        for (var b = new j.Api(this.context[0]), c = e.extend(!0, {}, {
              rows: null,
              columns: '',
              modifier: {
                search: 'applied',
                order: 'applied'
              },
              orthogonal: 'display',
              stripHtml: !0,
              stripNewlines: !0,
              trim: !0
            }, a), d = function (a) {
              if ('string' !== typeof a)
                return a;
              c.stripHtml && (a = a.replace(/<.*?>/g, ''));
              c.trim && (a = a.replace(/^\s+|\s+$/g, ''));
              c.stripNewlines && (a = a.replace(/\n/g, ' '));
              return a;
            }, a = b.columns(c.columns).indexes().map(function (a) {
              return d(b.column(a).header().innerHTML);
            }).toArray(), f = b.table().footer() ? b.columns(c.columns).indexes().map(function (a) {
              return (a = b.column(a).footer()) ? d(a.innerHTML) : '';
            }).toArray() : null, g = b.cells(c.rows, c.columns, c.modifier).render(c.orthogonal).toArray(), h = a.length, i = g.length / h, k = Array(i), l = 0, m = 0; m < i; m++) {
          for (var n = Array(h), o = 0; o < h; o++)
            n[o] = d(g[l]), l++;
          k[m] = n;
        }
        return {
          header: a,
          footer: f,
          body: k
        };
      }
    });
    e.fn.dataTable.Buttons = l;
    e.fn.DataTable.Buttons = l;
    e(n).on('init.dt.dtb', function (a, b) {
      if ('dt' === a.namespace) {
        var c = b.oInit.buttons || j.defaults.buttons;
        c && !b._buttons && new l(b, c).container();
      }
    });
    j.ext.feature.push({
      fnInit: function (a) {
        var a = new j.Api(a), b = a.init().buttons;
        return new l(a, b).container();
      },
      cFeature: 'B'
    });
    return l;
  };
  'function' === typeof define && define.amd ? define([
    '../../../../jquery/jquery',
    'datatables'
  ], p) : 'object' === typeof exports ? p(require('jquery'), require('datatables')) : jQuery && !jQuery.fn.dataTable.Buttons && p(jQuery, jQuery.fn.dataTable);
}(window, document));
/*! ColVis 1.1.2
 * ©2010-2015 SpryMedia Ltd - datatables.net/license
 */
/**
 * @summary     ColVis
 * @description Controls for column visibility in DataTables
 * @version     1.1.2
 * @file        dataTables.colReorder.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2010-2015 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */
(function (window, document, undefined) {
  var factory = function ($, DataTable) {
    'use strict';
    /**
 * ColVis provides column visibility control for DataTables
 *
 * @class ColVis
 * @constructor
 * @param {object} DataTables settings object. With DataTables 1.10 this can
 *   also be and API instance, table node, jQuery collection or jQuery selector.
 * @param {object} ColVis configuration options
 */
    var ColVis = function (oDTSettings, oInit) {
      /* Santiy check that we are a new instance */
      if (!this.CLASS || this.CLASS != 'ColVis') {
        alert('Warning: ColVis must be initialised with the keyword \'new\'');
      }
      if (typeof oInit == 'undefined') {
        oInit = {};
      }
      var camelToHungarian = $.fn.dataTable.camelToHungarian;
      if (camelToHungarian) {
        camelToHungarian(ColVis.defaults, ColVis.defaults, true);
        camelToHungarian(ColVis.defaults, oInit);
      }
      /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Public class variables
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
      /**
	 * @namespace Settings object which contains customisable information for
	 *     ColVis instance. Augmented by ColVis.defaults
	 */
      this.s = {
        'dt': null,
        'oInit': oInit,
        'hidden': true,
        'abOriginal': []
      };
      /**
	 * @namespace Common and useful DOM elements for the class instance
	 */
      this.dom = {
        'wrapper': null,
        'button': null,
        'collection': null,
        'background': null,
        'catcher': null,
        'buttons': [],
        'groupButtons': [],
        'restore': null
      };
      /* Store global reference */
      ColVis.aInstances.push(this);
      /* Constructor logic */
      this.s.dt = $.fn.dataTable.Api ? new $.fn.dataTable.Api(oDTSettings).settings()[0] : oDTSettings;
      this._fnConstruct(oInit);
      return this;
    };
    ColVis.prototype = {
      button: function () {
        return this.dom.wrapper;
      },
      'fnRebuild': function () {
        this.rebuild();
      },
      rebuild: function () {
        /* Remove the old buttons */
        for (var i = this.dom.buttons.length - 1; i >= 0; i--) {
          this.dom.collection.removeChild(this.dom.buttons[i]);
        }
        this.dom.buttons.splice(0, this.dom.buttons.length);
        this.dom.groupButtons.splice(0, this.dom.groupButtons.length);
        if (this.dom.restore) {
          this.dom.restore.parentNode(this.dom.restore);
        }
        /* Re-add them (this is not the optimal way of doing this, it is fast and effective) */
        this._fnAddGroups();
        this._fnAddButtons();
        /* Update the checkboxes */
        this._fnDrawCallback();
      },
      '_fnConstruct': function (init) {
        this._fnApplyCustomisation(init);
        var that = this;
        var i, iLen;
        this.dom.wrapper = document.createElement('div');
        this.dom.wrapper.className = 'ColVis';
        this.dom.button = $('<button />', { 'class': !this.s.dt.bJUI ? 'ColVis_Button ColVis_MasterButton' : 'ColVis_Button ColVis_MasterButton ui-button ui-state-default' }).append('<span>' + this.s.buttonText + '</span>').bind(this.s.activate == 'mouseover' ? 'mouseover' : 'click', function (e) {
          e.preventDefault();
          that._fnCollectionShow();
        }).appendTo(this.dom.wrapper)[0];
        this.dom.catcher = this._fnDomCatcher();
        this.dom.collection = this._fnDomCollection();
        this.dom.background = this._fnDomBackground();
        this._fnAddGroups();
        this._fnAddButtons();
        /* Store the original visibility information */
        for (i = 0, iLen = this.s.dt.aoColumns.length; i < iLen; i++) {
          this.s.abOriginal.push(this.s.dt.aoColumns[i].bVisible);
        }
        /* Update on each draw */
        this.s.dt.aoDrawCallback.push({
          'fn': function () {
            that._fnDrawCallback.call(that);
          },
          'sName': 'ColVis'
        });
        /* If columns are reordered, then we need to update our exclude list and
		 * rebuild the displayed list
		 */
        $(this.s.dt.oInstance).bind('column-reorder.dt', function (e, oSettings, oReorder) {
          for (i = 0, iLen = that.s.aiExclude.length; i < iLen; i++) {
            that.s.aiExclude[i] = oReorder.aiInvertMapping[that.s.aiExclude[i]];
          }
          var mStore = that.s.abOriginal.splice(oReorder.iFrom, 1)[0];
          that.s.abOriginal.splice(oReorder.iTo, 0, mStore);
          that.fnRebuild();
        });
        $(this.s.dt.oInstance).bind('destroy.dt', function () {
          $(that.dom.wrapper).remove();
        });
        // Set the initial state
        this._fnDrawCallback();
      },
      '_fnApplyCustomisation': function (init) {
        $.extend(true, this.s, ColVis.defaults, init);
        // Slightly messy overlap for the camelCase notation
        if (!this.s.showAll && this.s.bShowAll) {
          this.s.showAll = this.s.sShowAll;
        }
        if (!this.s.restore && this.s.bRestore) {
          this.s.restore = this.s.sRestore;
        }
        // CamelCase to Hungarian for the column groups
        var groups = this.s.groups;
        var hungarianGroups = this.s.aoGroups;
        if (groups) {
          for (var i = 0, ien = groups.length; i < ien; i++) {
            if (groups[i].title) {
              hungarianGroups[i].sTitle = groups[i].title;
            }
            if (groups[i].columns) {
              hungarianGroups[i].aiColumns = groups[i].columns;
            }
          }
        }
      },
      '_fnDrawCallback': function () {
        var columns = this.s.dt.aoColumns;
        var buttons = this.dom.buttons;
        var groups = this.s.aoGroups;
        var button;
        for (var i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i];
          if (button.__columnIdx !== undefined) {
            $('input', button).prop('checked', columns[button.__columnIdx].bVisible);
          }
        }
        var allVisible = function (columnIndeces) {
          for (var k = 0, kLen = columnIndeces.length; k < kLen; k++) {
            if (columns[columnIndeces[k]].bVisible === false) {
              return false;
            }
          }
          return true;
        };
        var allHidden = function (columnIndeces) {
          for (var m = 0, mLen = columnIndeces.length; m < mLen; m++) {
            if (columns[columnIndeces[m]].bVisible === true) {
              return false;
            }
          }
          return true;
        };
        for (var j = 0, jLen = groups.length; j < jLen; j++) {
          if (allVisible(groups[j].aiColumns)) {
            $('input', this.dom.groupButtons[j]).prop('checked', true);
            $('input', this.dom.groupButtons[j]).prop('indeterminate', false);
          } else if (allHidden(groups[j].aiColumns)) {
            $('input', this.dom.groupButtons[j]).prop('checked', false);
            $('input', this.dom.groupButtons[j]).prop('indeterminate', false);
          } else {
            $('input', this.dom.groupButtons[j]).prop('indeterminate', true);
          }
        }
      },
      '_fnAddGroups': function () {
        var nButton;
        if (typeof this.s.aoGroups != 'undefined') {
          for (var i = 0, iLen = this.s.aoGroups.length; i < iLen; i++) {
            nButton = this._fnDomGroupButton(i);
            this.dom.groupButtons.push(nButton);
            this.dom.buttons.push(nButton);
            this.dom.collection.appendChild(nButton);
          }
        }
      },
      '_fnAddButtons': function () {
        var nButton, columns = this.s.dt.aoColumns;
        if ($.inArray('all', this.s.aiExclude) === -1) {
          for (var i = 0, iLen = columns.length; i < iLen; i++) {
            if ($.inArray(i, this.s.aiExclude) === -1) {
              nButton = this._fnDomColumnButton(i);
              nButton.__columnIdx = i;
              this.dom.buttons.push(nButton);
            }
          }
        }
        if (this.s.order === 'alpha') {
          this.dom.buttons.sort(function (a, b) {
            var titleA = columns[a.__columnIdx].sTitle;
            var titleB = columns[b.__columnIdx].sTitle;
            return titleA === titleB ? 0 : titleA < titleB ? -1 : 1;
          });
        }
        if (this.s.restore) {
          nButton = this._fnDomRestoreButton();
          nButton.className += ' ColVis_Restore';
          this.dom.buttons.push(nButton);
        }
        if (this.s.showAll) {
          nButton = this._fnDomShowXButton(this.s.showAll, true);
          nButton.className += ' ColVis_ShowAll';
          this.dom.buttons.push(nButton);
        }
        if (this.s.showNone) {
          nButton = this._fnDomShowXButton(this.s.showNone, false);
          nButton.className += ' ColVis_ShowNone';
          this.dom.buttons.push(nButton);
        }
        $(this.dom.collection).append(this.dom.buttons);
      },
      '_fnDomRestoreButton': function () {
        var that = this, dt = this.s.dt;
        return $('<li class="ColVis_Special ' + (dt.bJUI ? 'ui-button ui-state-default' : '') + '">' + this.s.restore + '</li>').click(function (e) {
          for (var i = 0, iLen = that.s.abOriginal.length; i < iLen; i++) {
            that.s.dt.oInstance.fnSetColumnVis(i, that.s.abOriginal[i], false);
          }
          that._fnAdjustOpenRows();
          that.s.dt.oInstance.fnAdjustColumnSizing(false);
          that.s.dt.oInstance.fnDraw(false);
        })[0];
      },
      '_fnDomShowXButton': function (str, action) {
        var that = this, dt = this.s.dt;
        return $('<li class="ColVis_Special ' + (dt.bJUI ? 'ui-button ui-state-default' : '') + '">' + str + '</li>').click(function (e) {
          for (var i = 0, iLen = that.s.abOriginal.length; i < iLen; i++) {
            if (that.s.aiExclude.indexOf(i) === -1) {
              that.s.dt.oInstance.fnSetColumnVis(i, action, false);
            }
          }
          that._fnAdjustOpenRows();
          that.s.dt.oInstance.fnAdjustColumnSizing(false);
          that.s.dt.oInstance.fnDraw(false);
        })[0];
      },
      '_fnDomGroupButton': function (i) {
        var that = this, dt = this.s.dt, oGroup = this.s.aoGroups[i];
        return $('<li class="ColVis_Special ' + (dt.bJUI ? 'ui-button ui-state-default' : '') + '">' + '<label>' + '<input type="checkbox" />' + '<span>' + oGroup.sTitle + '</span>' + '</label>' + '</li>').click(function (e) {
          var showHide = !$('input', this).is(':checked');
          if (e.target.nodeName.toLowerCase() !== 'li') {
            showHide = !showHide;
          }
          for (var j = 0; j < oGroup.aiColumns.length; j++) {
            that.s.dt.oInstance.fnSetColumnVis(oGroup.aiColumns[j], showHide);
          }
        })[0];
      },
      '_fnDomColumnButton': function (i) {
        var that = this, column = this.s.dt.aoColumns[i], dt = this.s.dt;
        var title = this.s.fnLabel === null ? column.sTitle : this.s.fnLabel(i, column.sTitle, column.nTh);
        return $('<li ' + (dt.bJUI ? 'class="ui-button ui-state-default"' : '') + '>' + '<label>' + '<input type="checkbox" />' + '<span>' + title + '</span>' + '</label>' + '</li>').click(function (e) {
          var showHide = !$('input', this).is(':checked');
          if (e.target.nodeName.toLowerCase() !== 'li') {
            if (e.target.nodeName.toLowerCase() == 'input' || that.s.fnStateChange === null) {
              showHide = !showHide;
            }
          }
          /* Need to consider the case where the initialiser created more than one table - change the
				 * API index that DataTables is using
				 */
          var oldIndex = $.fn.dataTableExt.iApiIndex;
          $.fn.dataTableExt.iApiIndex = that._fnDataTablesApiIndex.call(that);
          // Optimisation for server-side processing when scrolling - don't do a full redraw
          if (dt.oFeatures.bServerSide) {
            that.s.dt.oInstance.fnSetColumnVis(i, showHide, false);
            that.s.dt.oInstance.fnAdjustColumnSizing(false);
            if (dt.oScroll.sX !== '' || dt.oScroll.sY !== '') {
              that.s.dt.oInstance.oApi._fnScrollDraw(that.s.dt);
            }
            that._fnDrawCallback();
          } else {
            that.s.dt.oInstance.fnSetColumnVis(i, showHide);
          }
          $.fn.dataTableExt.iApiIndex = oldIndex;
          /* Restore */
          if (that.s.fnStateChange !== null) {
            if (e.target.nodeName.toLowerCase() == 'span') {
              e.preventDefault();
            }
            that.s.fnStateChange.call(that, i, showHide);
          }
        })[0];
      },
      '_fnDataTablesApiIndex': function () {
        for (var i = 0, iLen = this.s.dt.oInstance.length; i < iLen; i++) {
          if (this.s.dt.oInstance[i] == this.s.dt.nTable) {
            return i;
          }
        }
        return 0;
      },
      '_fnDomCollection': function () {
        return $('<ul />', { 'class': !this.s.dt.bJUI ? 'ColVis_collection' : 'ColVis_collection ui-buttonset ui-buttonset-multi' }).css({
          'display': 'none',
          'opacity': 0,
          'position': !this.s.bCssPosition ? 'absolute' : ''
        })[0];
      },
      '_fnDomCatcher': function () {
        var that = this, nCatcher = document.createElement('div');
        nCatcher.className = 'ColVis_catcher';
        $(nCatcher).click(function () {
          that._fnCollectionHide.call(that, null, null);
        });
        return nCatcher;
      },
      '_fnDomBackground': function () {
        var that = this;
        var background = $('<div></div>').addClass('ColVis_collectionBackground').css('opacity', 0).click(function () {
            that._fnCollectionHide.call(that, null, null);
          });
        /* When considering a mouse over action for the activation, we also consider a mouse out
		 * which is the same as a mouse over the background - without all the messing around of
		 * bubbling events. Use the catcher element to avoid messing around with bubbling
		 */
        if (this.s.activate == 'mouseover') {
          background.mouseover(function () {
            that.s.overcollection = false;
            that._fnCollectionHide.call(that, null, null);
          });
        }
        return background[0];
      },
      '_fnCollectionShow': function () {
        var that = this, i, iLen, iLeft;
        var oPos = $(this.dom.button).offset();
        var nHidden = this.dom.collection;
        var nBackground = this.dom.background;
        var iDivX = parseInt(oPos.left, 10);
        var iDivY = parseInt(oPos.top + $(this.dom.button).outerHeight(), 10);
        if (!this.s.bCssPosition) {
          nHidden.style.top = iDivY + 'px';
          nHidden.style.left = iDivX + 'px';
        }
        $(nHidden).css({
          'display': 'block',
          'opacity': 0
        });
        nBackground.style.bottom = '0px';
        nBackground.style.right = '0px';
        var oStyle = this.dom.catcher.style;
        oStyle.height = $(this.dom.button).outerHeight() + 'px';
        oStyle.width = $(this.dom.button).outerWidth() + 'px';
        oStyle.top = oPos.top + 'px';
        oStyle.left = iDivX + 'px';
        document.body.appendChild(nBackground);
        document.body.appendChild(nHidden);
        document.body.appendChild(this.dom.catcher);
        /* This results in a very small delay for the end user but it allows the animation to be
		 * much smoother. If you don't want the animation, then the setTimeout can be removed
		 */
        $(nHidden).animate({ 'opacity': 1 }, that.s.iOverlayFade);
        $(nBackground).animate({ 'opacity': 0.1 }, that.s.iOverlayFade, 'linear', function () {
          /* In IE6 if you set the checked attribute of a hidden checkbox, then this is not visually
			 * reflected. As such, we need to do it here, once it is visible. Unbelievable.
			 */
          if ($.browser && $.browser.msie && $.browser.version == '6.0') {
            that._fnDrawCallback();
          }
        });
        /* Visual corrections to try and keep the collection visible */
        if (!this.s.bCssPosition) {
          iLeft = this.s.sAlign == 'left' ? iDivX : iDivX - $(nHidden).outerWidth() + $(this.dom.button).outerWidth();
          nHidden.style.left = iLeft + 'px';
          var iDivWidth = $(nHidden).outerWidth();
          var iDivHeight = $(nHidden).outerHeight();
          var iDocWidth = $(document).width();
          if (iLeft + iDivWidth > iDocWidth) {
            nHidden.style.left = iDocWidth - iDivWidth + 'px';
          }
        }
        this.s.hidden = false;
      },
      '_fnCollectionHide': function () {
        var that = this;
        if (!this.s.hidden && this.dom.collection !== null) {
          this.s.hidden = true;
          $(this.dom.collection).animate({ 'opacity': 0 }, that.s.iOverlayFade, function (e) {
            this.style.display = 'none';
          });
          $(this.dom.background).animate({ 'opacity': 0 }, that.s.iOverlayFade, function (e) {
            document.body.removeChild(that.dom.background);
            document.body.removeChild(that.dom.catcher);
          });
        }
      },
      '_fnAdjustOpenRows': function () {
        var aoOpen = this.s.dt.aoOpenRows;
        var iVisible = this.s.dt.oApi._fnVisbleColumns(this.s.dt);
        for (var i = 0, iLen = aoOpen.length; i < iLen; i++) {
          aoOpen[i].nTr.getElementsByTagName('td')[0].colSpan = iVisible;
        }
      }
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Static object methods
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
 * Rebuild the collection for a given table, or all tables if no parameter given
 *  @method  ColVis.fnRebuild
 *  @static
 *  @param   object oTable DataTable instance to consider - optional
 *  @returns void
 */
    ColVis.fnRebuild = function (oTable) {
      var nTable = null;
      if (typeof oTable != 'undefined') {
        nTable = $.fn.dataTable.Api ? new $.fn.dataTable.Api(oTable).table().node() : oTable.fnSettings().nTable;
      }
      for (var i = 0, iLen = ColVis.aInstances.length; i < iLen; i++) {
        if (typeof oTable == 'undefined' || nTable == ColVis.aInstances[i].s.dt.nTable) {
          ColVis.aInstances[i].fnRebuild();
        }
      }
    };
    ColVis.defaults = {
      active: 'click',
      buttonText: '<i class="glyphicon glyphicon-option-horizontal text-blue"></i>',
      aiExclude: [],
      bRestore: false,
      sRestore: 'Restore original',
      bShowAll: false,
      sShowAll: 'Show All',
      sAlign: 'right',
      fnStateChange: null,
      iOverlayFade: 500,
      fnLabel: null,
      bCssPosition: false,
      aoGroups: [],
      order: 'column'
    };
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Static object properties
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
 * Collection of all ColVis instances
 *  @property ColVis.aInstances
 *  @static
 *  @type     Array
 *  @default  []
 */
    ColVis.aInstances = [];
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Constants
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /**
 * Name of this class
 *  @constant CLASS
 *  @type     String
 *  @default  ColVis
 */
    ColVis.prototype.CLASS = 'ColVis';
    /**
 * ColVis version
 *  @constant  VERSION
 *  @type      String
 *  @default   See code
 */
    ColVis.VERSION = '1.1.2';
    ColVis.prototype.VERSION = ColVis.VERSION;
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Initialisation
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
    /*
 * Register a new feature with DataTables
 */
    if (typeof $.fn.dataTable == 'function' && typeof $.fn.dataTableExt.fnVersionCheck == 'function' && $.fn.dataTableExt.fnVersionCheck('1.7.0')) {
      $.fn.dataTableExt.aoFeatures.push({
        'fnInit': function (oDTSettings) {
          var init = oDTSettings.oInit;
          var colvis = new ColVis(oDTSettings, init.colVis || init.oColVis || {});
          return colvis.button();
        },
        'cFeature': 'C',
        'sFeature': 'ColVis'
      });
    } else {
      alert('Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download');
    }
    // Make ColVis accessible from the DataTables instance
    $.fn.dataTable.ColVis = ColVis;
    $.fn.DataTable.ColVis = ColVis;
    return ColVis;
  };
  // /factory
  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define([
      'jquery',
      'datatables'
    ], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery && !jQuery.fn.dataTable.ColVis) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }
}(window, document));
/*!
 Select for DataTables 1.0.1
 2015 SpryMedia Ltd - datatables.net/license/mit
*/
(function (j, u, i) {
  j = function (e, h) {
    function j(a) {
      var c = a.settings()[0]._select.selector;
      e(a.table().body()).off('mousedown.dtSelect', c).off('mouseup.dtSelect', c).off('click.dtSelect', c);
      e('body').off('click.dtSelect');
    }
    function s(a) {
      var c = e(a.table().body()), b = a.settings()[0], d = b._select.selector;
      c.on('mousedown.dtSelect', d, function (b) {
        if (b.shiftKey)
          c.css('-moz-user-select', 'none').one('selectstart.dtSelect', d, function () {
            return !1;
          });
      }).on('mouseup.dtSelect', d, function () {
        c.css('-moz-user-select', '');
      }).on('click.dtSelect', d, function (b) {
        var d = a.select.items(), f = a.cell(this).index(), k = a.settings()[0];
        e(b.target).closest('tbody')[0] == c[0] && a.cell(b.target).any() && ('row' === d ? (d = f.row, r(b, a, k, 'row', d)) : 'column' === d ? (d = a.cell(b.target).index().column, r(b, a, k, 'column', d)) : 'cell' === d && (d = a.cell(b.target).index(), r(b, a, k, 'cell', d)), k._select_lastCell = f);
      });
      e('body').on('click.dtSelect', function (c) {
        b._select.blurable && !e(c.target).parents().filter(a.table().container()).length && (e(c.target).parents('div.DTE').length || o(b, !0));
      });
    }
    function l(a, c, b, d) {
      if (!d || a.flatten().length)
        b.unshift(a), e(a.table().node()).triggerHandler(c + '.dt', b);
    }
    function t(a) {
      var c = a.settings()[0];
      if (c._select.info && c.aanFeatures.i) {
        var b = e('<span class="select-info"/>'), d = function (c, d) {
            b.append(e('<span class="select-item"/>').append(a.i18n('select.' + c + 's', {
              _: '%d ' + c + 's selected',
              '0': '',
              1: '1 ' + c + ' selected'
            }, d)));
          };
        d('row', a.rows({ selected: !0 }).flatten().length);
        d('column', a.columns({ selected: !0 }).flatten().length);
        d('cell', a.cells({ selected: !0 }).flatten().length);
        e.each(c.aanFeatures.i, function (c, a) {
          var a = e(a), d = a.children('span.select-info');
          d.length && d.remove();
          '' !== b.text() && a.append(b);
        });
      }
    }
    function o(a, c) {
      if (c || 'single' === a._select.style) {
        var b = new h.Api(a);
        b.rows({ selected: !0 }).deselect();
        b.columns({ selected: !0 }).deselect();
        b.cells({ selected: !0 }).deselect();
      }
    }
    function r(a, c, b, d, g) {
      var q = c.select.style(), f = c[d](g, { selected: !0 }).any();
      'os' === q ? a.ctrlKey || a.metaKey ? c[d](g).select(!f) : a.shiftKey ? 'cell' === d ? (d = b._select_lastCell || null, f = function (b, a) {
        if (b > a)
          var d = a, a = b, b = d;
        var f = !1;
        return c.columns(':visible').indexes().filter(function (c) {
          c === b && (f = !0);
          return c === a ? (f = !1, !0) : f;
        });
      }, a = function (b, a) {
        var d = c.rows({ search: 'applied' }).indexes();
        if (d.indexOf(b) > d.indexOf(a))
          var f = a, a = b, b = f;
        var g = !1;
        return d.filter(function (c) {
          c === b && (g = !0);
          return c === a ? (g = !1, !0) : g;
        });
      }, !c.cells({ selected: !0 }).any() && !d ? (f = f(0, g.column), d = a(0, g.row)) : (f = f(d.column, g.column), d = a(d.row, g.row)), d = c.cells(d, f).flatten(), c.cells(g, { selected: !0 }).any() ? c.cells(d).deselect() : c.cells(d).select()) : (a = b._select_lastCell ? b._select_lastCell[d] : null, f = c[d + 's']({ search: 'applied' }).indexes(), a = e.inArray(a, f), b = e.inArray(g, f), !c[d + 's']({ selected: !0 }).any() && -1 === a ? f.splice(e.inArray(g, f) + 1, f.length) : (a > b && (q = b, b = a, a = q), f.splice(b + 1, f.length), f.splice(0, a)), c[d](g, { selected: !0 }).any()) ? (f.splice(e.inArray(g, f), 1), c[d + 's'](f).deselect()) : c[d + 's'](f).select() : (a = c[d + 's']({ selected: !0 }), f && 1 === a.flatten().length ? c[d](g).deselect() : (a.deselect(), c[d](g).select())) : c[d](g).select(!f);
    }
    function p(a, c) {
      return function (b) {
        return b.i18n('buttons.' + a, c);
      };
    }
    h.select = {};
    h.select.version = '1.0.1';
    e.each([
      {
        type: 'row',
        prop: 'aoData'
      },
      {
        type: 'column',
        prop: 'aoColumns'
      }
    ], function (a, c) {
      h.ext.selector[c.type].push(function (b, a, g) {
        var a = a.selected, e, f = [];
        if (a === i)
          return g;
        for (var k = 0, h = g.length; k < h; k++)
          e = b[c.prop][g[k]], (!0 === a && !0 === e._select_selected || !1 === a && !e._select_selected) && f.push(g[k]);
        return f;
      });
    });
    h.ext.selector.cell.push(function (a, c, b) {
      var c = c.selected, d, g = [];
      if (c === i)
        return b;
      for (var e = 0, f = b.length; e < f; e++)
        d = a.aoData[b[e].row], (!0 === c && d._selected_cells && !0 === d._selected_cells[b[e].column] || !1 === c && (!d._selected_cells || !d._selected_cells[b[e].column])) && g.push(b[e]);
      return g;
    });
    var m = h.Api.register, n = h.Api.registerPlural;
    m('select()', function () {
    });
    m('select.blurable()', function (a) {
      return a === i ? this.context[0]._select.blurable : this.iterator('table', function (c) {
        c._select.blurable = a;
      });
    });
    m('select.info()', function (a) {
      return t === i ? this.context[0]._select.info : this.iterator('table', function (c) {
        c._select.info = a;
      });
    });
    m('select.items()', function (a) {
      return a === i ? this.context[0]._select.items : this.iterator('table', function (c) {
        c._select.items = a;
        l(new h.Api(c), 'selectItems', [a]);
      });
    });
    m('select.style()', function (a) {
      return a === i ? this.context[0]._select.style : this.iterator('table', function (c) {
        c._select.style = a;
        if (!c._select_init) {
          var b = new h.Api(c);
          c.aoRowCreatedCallback.push({
            fn: function (b, a, d) {
              a = c.aoData[d];
              a._select_selected && e(b).addClass('selected');
              b = 0;
              for (d = c.aoColumns.length; b < d; b++)
                (c.aoColumns[b]._select_selected || a._selected_cells && a._selected_cells[b]) && e(a.anCells[b]).addClass('selected');
            },
            sName: 'select-deferRender'
          });
          b.on('preXhr.dt.dtSelect', function () {
            var a = b.rows({ selected: !0 }).ids(!0).filter(function (b) {
                return b !== i;
              }), c = b.cells({ selected: !0 }).eq(0).map(function (c) {
                var a = b.row(c.row).id(!0);
                return a ? {
                  row: a,
                  column: c.column
                } : i;
              }).filter(function (b) {
                return b !== i;
              });
            b.one('draw.dt.dtSelect', function () {
              b.rows(a).select();
              c.any() && c.each(function (c) {
                b.cells(c.row, c.column).select();
              });
            });
          });
          b.on('draw.dtSelect.dt select.dtSelect.dt deselect.dtSelect.dt', function () {
            t(b);
          });
          b.on('destroy.dtSelect', function () {
            j(b);
            b.off('.dtSelect');
          });
        }
        var d = new h.Api(c);
        j(d);
        'api' !== a && s(d);
        l(new h.Api(c), 'selectStyle', [a]);
      });
    });
    m('select.selector()', function (a) {
      return a === i ? this.context[0]._select.selector : this.iterator('table', function (c) {
        j(new h.Api(c));
        c._select.selector = a;
        'api' !== c._select.style && s(new h.Api(c));
      });
    });
    n('rows().select()', 'row().select()', function (a) {
      var c = this;
      if (!1 === a)
        return this.deselect();
      this.iterator('row', function (b, c) {
        o(b);
        b.aoData[c]._select_selected = !0;
        e(b.aoData[c].nTr).addClass('selected');
      });
      this.iterator('table', function (b, a) {
        l(c, 'select', [
          'row',
          c[a]
        ], !0);
      });
      return this;
    });
    n('columns().select()', 'column().select()', function (a) {
      var c = this;
      if (!1 === a)
        return this.deselect();
      this.iterator('column', function (b, c) {
        o(b);
        b.aoColumns[c]._select_selected = !0;
        var a = new h.Api(b).column(c);
        e(a.header()).addClass('selected');
        e(a.footer()).addClass('selected');
        a.nodes().to$().addClass('selected');
      });
      this.iterator('table', function (b, a) {
        l(c, 'select', [
          'column',
          c[a]
        ], !0);
      });
      return this;
    });
    n('cells().select()', 'cell().select()', function (a) {
      var c = this;
      if (!1 === a)
        return this.deselect();
      this.iterator('cell', function (b, c, a) {
        o(b);
        b = b.aoData[c];
        b._selected_cells === i && (b._selected_cells = []);
        b._selected_cells[a] = !0;
        b.anCells && e(b.anCells[a]).addClass('selected');
      });
      this.iterator('table', function (b, a) {
        l(c, 'select', [
          'cell',
          c[a]
        ], !0);
      });
      return this;
    });
    n('rows().deselect()', 'row().deselect()', function () {
      var a = this;
      this.iterator('row', function (a, b) {
        a.aoData[b]._select_selected = !1;
        e(a.aoData[b].nTr).removeClass('selected');
      });
      this.iterator('table', function (c, b) {
        l(a, 'deselect', [
          'row',
          a[b]
        ], !0);
      });
      return this;
    });
    n('columns().deselect()', 'column().deselect()', function () {
      var a = this;
      this.iterator('column', function (a, b) {
        a.aoColumns[b]._select_selected = !1;
        var d = new h.Api(a), g = d.column(b);
        e(g.header()).removeClass('selected');
        e(g.footer()).removeClass('selected');
        d.cells(null, b).indexes().each(function (b) {
          var d = a.aoData[b.row], g = d._selected_cells;
          d.anCells && (!g || !g[b.column]) && e(d.anCells[b.column]).removeClass('selected');
        });
      });
      this.iterator('table', function (c, b) {
        l(a, 'deselect', [
          'column',
          a[b]
        ], !0);
      });
      return this;
    });
    n('cells().deselect()', 'cell().deselect()', function () {
      var a = this;
      this.iterator('cell', function (a, b, d) {
        b = a.aoData[b];
        b._selected_cells[d] = !1;
        b.anCells && !a.aoColumns[d]._select_selected && e(b.anCells[d]).removeClass('selected');
      });
      this.iterator('table', function (c, b) {
        l(a, 'deselect', [
          'cell',
          a[b]
        ], !0);
      });
      return this;
    });
    e.extend(h.ext.buttons, {
      selected: {
        text: p('selected', 'Selected'),
        className: 'buttons-selected',
        init: function (a) {
          var c = this;
          a.on('draw.dt.DT select.dt.DT deselect.dt.DT', function () {
            var a = c.rows({ selected: !0 }).any() || c.columns({ selected: !0 }).any() || c.cells({ selected: !0 }).any();
            c.enable(a);
          });
          this.disable();
        }
      },
      selectedSingle: {
        text: p('selectedSingle', 'Selected single'),
        className: 'buttons-selected-single',
        init: function (a) {
          var c = this;
          a.on('draw.dt.DT select.dt.DT deselect.dt.DT', function () {
            var b = a.rows({ selected: !0 }).flatten().length + a.columns({ selected: !0 }).flatten().length + a.cells({ selected: !0 }).flatten().length;
            c.enable(1 === b);
          });
          this.disable();
        }
      },
      selectAll: {
        text: p('selectAll', 'Select all'),
        className: 'buttons-select-all',
        action: function () {
          this[this.select.items() + 's']().select();
        }
      },
      selectNone: {
        text: p('selectNone', 'Deselect all'),
        className: 'buttons-select-none',
        action: function () {
          o(this.settings()[0], !0);
        }
      }
    });
    e.each([
      'Row',
      'Column',
      'Cell'
    ], function (a, c) {
      var b = c.toLowerCase();
      h.ext.buttons['select' + c + 's'] = {
        text: p('select' + c + 's', 'Select ' + b + 's'),
        className: 'buttons-select-' + b + 's',
        action: function () {
          this.select.items(b);
        },
        init: function (a) {
          var c = this;
          a.on('selectItems.dt.DT', function (a, d, e) {
            c.active(e === b);
          });
        }
      };
    });
    e(u).on('init.dt.dtSelect', function (a, c) {
      if ('dt' === a.namespace) {
        var b = c.oInit.select || h.defaults.select, d = new h.Api(c), g = 'row', j = 'api', f = !1, k = !0, l = 'td, th';
        c._select = {};
        if (!0 === b)
          j = 'os';
        else if ('string' === typeof b)
          j = b;
        else if (e.isPlainObject(b) && (b.blurable !== i && (f = b.blurable), b.info !== i && (k = b.info), b.items !== i && (g = b.items), b.style !== i && (j = b.style), b.selector !== i))
          l = b.selector;
        d.select.selector(l);
        d.select.items(g);
        d.select.style(j);
        d.select.blurable(f);
        d.select.info(k);
        e(d.table().node()).hasClass('selectable') && d.select.style('os');
      }
    });
  };
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables'
  ], j) : 'object' === typeof exports ? j(require('jquery'), require('datatables')) : jQuery && !jQuery.fn.dataTable.select && j(jQuery, jQuery.fn.dataTable);
}(window, document));
/*!
 KeyTable 1.2.1
 ©2010-2014 SpryMedia Ltd - datatables.net/license
*/
var KeyTable;
(function (F, n, K) {
  var A = function (d) {
    KeyTable = function (j) {
      function A(a) {
        return function (e, c, p) {
          (null === e || 'number' == typeof e) && (null === c || 'number' == typeof c) && 'function' == typeof p ? k[a].push({
            x: e,
            y: c,
            fn: p
          }) : 'object' == typeof e && 'function' == typeof c ? (e = E(e), k[a].push({
            x: e[0],
            y: e[1],
            fn: c
          })) : alert('Unhandable event type was added: x' + e + '  y:' + c + '  z:' + p);
        };
      }
      function L(a) {
        return function (e, c, p) {
          (null === e || 'number' == typeof e) && (null === c || 'number' == typeof c) ? 'function' == typeof p ? B(a, e, c, p) : B(a, e, c) : 'object' == typeof e ? (e = E(e), 'function' == typeof c ? B(a, e[0], e[1], c) : B(a, e[0], e[1])) : alert('Unhandable event type was removed: x' + e + '  y:' + c + '  z:' + p);
        };
      }
      function B(a, e, c, p) {
        for (var h = 0, b = 0, d = k[a].length; b < d - h; b++)
          if ('undefined' != typeof p)
            k[a][b - h].x == e && (k[a][b - h].y == c && k[a][b - h].fn == p) && (k[a].splice(b - h, 1), h++);
          else if (k[a][b - h].x == e && k[a][b - h].y == c)
            return k[a].splice(b, 1), 1;
        return h;
      }
      function C(a, e, c) {
        for (var p = 0, a = k[a], b = 0; b < a.length; b++)
          if (a[b].x == e && a[b].y == c || null === a[b].x && a[b].y == c || a[b].x == e && null === a[b].y || null === a[b].x && null === a[b].y)
            a[b].fn(w(e, c), e, c), p++;
        return p;
      }
      function q(a, e) {
        if (t != a) {
          'undefined' == typeof e && (e = !0);
          null !== t && G(t);
          d(a).addClass(x);
          d(a).parent().addClass(x);
          var c;
          if (i) {
            c = i;
            for (var b = H(a)[1], h = o; b >= c.fnDisplayEnd();)
              0 <= c._iDisplayLength ? c._iDisplayStart + c._iDisplayLength < c.fnRecordsDisplay() && (c._iDisplayStart += c._iDisplayLength) : c._iDisplayStart = 0, i.oApi._fnCalculateEnd(c);
            for (; b < c._iDisplayStart;)
              c._iDisplayStart = 0 <= c._iDisplayLength ? c._iDisplayStart - c._iDisplayLength : 0, 0 > c._iDisplayStart && (c._iDisplayStart = 0), i.oApi._fnCalculateEnd(c);
            i.oApi._fnDraw(c);
            o = h;
          }
          b = E(a);
          t = a;
          l = b[0];
          g = b[1];
          var r, j, k, m, f;
          if (e) {
            r = d(F).height();
            b = d(F).width();
            j = d(n).scrollTop();
            h = d(n).scrollLeft();
            k = a.offsetHeight;
            m = a.offsetWidth;
            f = a;
            var q = 0, s = 0;
            if (f.offsetParent) {
              q = f.offsetLeft;
              s = f.offsetTop;
              for (f = f.offsetParent; f;)
                q += f.offsetLeft, s += f.offsetTop, f = f.offsetParent;
            }
            f = [
              q,
              s
            ];
            if (i && 'undefined' != typeof c.oScroll && ('' !== c.oScroll.sX || '' !== c.oScroll.sY))
              f[1] -= d(c.nTable.parentNode).scrollTop(), f[0] -= d(c.nTable.parentNode).scrollLeft();
            f[1] + k > j + r ? (r = f[1] + k - r, n.documentElement.scrollTop = r, n.body.scrollTop = r) : f[1] < j && (r = f[1], n.documentElement.scrollTop = r, n.body.scrollTop = r);
            f[0] + m > h + b ? (b = f[0] + m - b, n.documentElement.scrollLeft = b, n.body.scrollLeft = b) : f[0] < h && (b = f[0], n.documentElement.scrollLeft = b, n.body.scrollLeft = b);
          }
          if (i && 'undefined' != typeof c.oScroll && ('' !== c.oScroll.sX || '' !== c.oScroll.sY))
            (c = c.nTable.parentNode, r = c.clientHeight, b = c.clientWidth, j = c.scrollTop, h = c.scrollLeft, k = a.offsetHeight, m = a.offsetWidth, a.offsetTop + k > r + j ? c.scrollTop = a.offsetTop + k - r : a.offsetTop < j && (c.scrollTop = a.offsetTop), a.offsetLeft + m > b + h) ? c.scrollLeft = a.offsetLeft + m - b : a.offsetLeft < h && (c.scrollLeft = a.offsetLeft);
          o || (o = !0);
          C('focus', l, g);
        }
      }
      function y() {
        G(t);
        t = g = l = null;
        o = !1;
      }
      function G(a) {
        d(a).removeClass(x);
        d(a).parent().removeClass(x);
        C('blur', l, g);
      }
      function I() {
        for (var a = this; 'TD' != a.nodeName;)
          a = a.parentNode;
        q(a);
        o || (o = !0);
      }
      function w(a, b) {
        return i ? 'undefined' != typeof i.aoData[i.aiDisplay[b]] ? i.aoData[i.aiDisplay[b]].nTr.getElementsByTagName('td')[a] : null : d('tr:eq(' + b + ')>td:eq(' + a + ')', z)[0];
      }
      function E(a) {
        return i ? [
          d('td', a.parentNode).index(a),
          d('tr', a.parentNode.parentNode).index(a.parentNode) + i._iDisplayStart
        ] : [
          d('td', a.parentNode).index(a),
          d('tr', a.parentNode.parentNode).index(a.parentNode)
        ];
      }
      function H(a) {
        for (var b = 0, c = i.aiDisplay.length; b < c; b++)
          for (var d = i.aoData[i.aiDisplay[b]].nTr.getElementsByTagName('td'), h = 0, g = d.length; h < g; h++)
            if (d[h] == a)
              return [
                h,
                b
              ];
        return null;
      }
      this.block = !1;
      this.event = { remove: {} };
      this.fnGetCurrentPosition = function () {
        return [
          l,
          g
        ];
      };
      this.fnGetCurrentData = function () {
        return t.innerHTML;
      };
      this.fnGetCurrentTD = function () {
        return t;
      };
      this.fnSetPosition = function (a, b) {
        'object' == typeof a && a.nodeName ? q(a) : q(w(a, b));
      };
      this.fnBlur = function () {
        y();
      };
      var z = null, t = null, l = null, g = null, J = null, x = 'focus', o = !1, k = {
          action: [],
          esc: [],
          focus: [],
          blur: []
        }, i = null, D, s, u = !1, m;
      for (m in k)
        m && (this.event[m] = A(m), this.event.remove[m] = L(m));
      var v;
      j === K ? (m = d('table.KeyTable')[0], v = null) : d.isPlainObject(j) ? (m = j.table, v = j.datatable) : (v = new d.fn.dataTable.Api(j).settings()[0], m = v.nTable);
      var b = j, J = this;
      'undefined' == typeof b && (b = {});
      'undefined' == typeof b.focus && (b.focus = [
        0,
        0
      ]);
      b.table = m;
      d(b.table).addClass('KeyTable');
      'undefined' != typeof b.focusClass && (x = b.focusClass);
      'undefined' != typeof v && (i = v);
      'undefined' == typeof b.initScroll && (b.initScroll = !0);
      'undefined' == typeof b.form && (b.form = !1);
      D = b.form;
      z = b.table.getElementsByTagName('tbody')[0];
      D ? (j = n.createElement('div'), s = n.createElement('input'), j.style.height = '1px', j.style.width = '0px', j.style.overflow = 'hidden', 'undefined' != typeof b.tabIndex && (s.tabIndex = b.tabIndex), j.appendChild(s), b.table.parentNode.insertBefore(j, b.table.nextSibling), d(s).focus(function () {
        if (!u) {
          o = true;
          u = false;
          typeof b.focus.nodeName != 'undefined' ? q(b.focus, b.initScroll) : q(w(b.focus[0], b.focus[1]), b.initScroll);
          setTimeout(function () {
            s.blur();
          }, 0);
        }
      }), o = !1) : ('undefined' != typeof b.focus.nodeName ? q(b.focus, b.initScroll) : q(w(b.focus[0], b.focus[1]), b.initScroll), o || (o = !0));
      d(n).bind('keydown', function (a) {
        if (J.block || !o || a.metaKey || a.altKey || a.ctrlKey)
          return true;
        var b;
        b = z.getElementsByTagName('tr')[0].getElementsByTagName('td').length;
        var c;
        if (i) {
          c = i.aiDisplay.length;
          var d = H(t);
          if (d === null)
            return;
          l = d[0];
          g = d[1];
        } else
          c = z.getElementsByTagName('tr').length;
        d = a.keyCode == 9 && a.shiftKey ? -1 : a.keyCode;
        switch (d) {
        case 13:
          a.preventDefault();
          a.stopPropagation();
          C('action', l, g);
          return true;
        case 27:
          if (!C('esc', l, g)) {
            y();
            return;
          }
          a = l;
          b = g;
          break;
        case -1:
        case 37:
          if (l > 0) {
            a = l - 1;
            b = g;
          } else if (g > 0) {
            a = b - 1;
            b = g - 1;
          } else {
            if (d == -1 && D) {
              u = true;
              s.focus();
              setTimeout(function () {
                u = false;
              }, 0);
              o = false;
              y();
              return true;
            }
            return false;
          }
          break;
        case 38:
          if (g > 0) {
            a = l;
            b = g - 1;
          } else
            return false;
          break;
        case 36:
          a = l;
          b = 0;
          break;
        case 33:
          a = l;
          b = g - 10;
          b < 0 && (b = 0);
          break;
        case 9:
        case 39:
          if (l < b - 1) {
            a = l + 1;
            b = g;
          } else if (g < c - 1) {
            a = 0;
            b = g + 1;
          } else {
            if (d == 9 && D) {
              u = true;
              s.focus();
              setTimeout(function () {
                u = false;
              }, 0);
              o = false;
              y();
              return true;
            }
            return false;
          }
          break;
        case 40:
          if (g < c - 1) {
            a = l;
            b = g + 1;
          } else
            return false;
          break;
        case 35:
          a = l;
          b = c - 1;
          break;
        case 34:
          a = l;
          b = g + 10;
          b > c - 1 && (b = c - 1);
          break;
        default:
          return true;
        }
        q(w(a, b));
        return false;
      });
      if (i)
        d(i.nTable).on('click', 'td', I);
      else
        d(z).on('click', 'td', I);
      d(n).click(function (a) {
        for (var a = a.target, d = false; a;) {
          if (a == b.table) {
            d = true;
            break;
          }
          a = a.parentNode;
        }
        d || y();
      });
    };
    KeyTable.version = '1.2.1';
    d.fn.dataTable.KeyTable = KeyTable;
    return d.fn.DataTable.KeyTable = KeyTable;
  };
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables'
  ], A) : 'object' === typeof exports ? A(require('jquery'), require('datatables')) : jQuery && !jQuery.fn.dataTable.KeyTable && A(jQuery, jQuery.fn.dataTable);
}(window, document));
/*!
 ColReorder 1.1.3
 ©2010-2014 SpryMedia Ltd - datatables.net/license
*/
(function (o, r, s) {
  function p(d) {
    for (var f = [], a = 0, b = d.length; a < b; a++)
      f[d[a]] = a;
    return f;
  }
  function l(d, f, a) {
    f = d.splice(f, 1)[0];
    d.splice(a, 0, f);
  }
  function q(d, f, a) {
    for (var b = [], e = 0, h = d.childNodes.length; e < h; e++)
      1 == d.childNodes[e].nodeType && b.push(d.childNodes[e]);
    f = b[f];
    null !== a ? d.insertBefore(f, b[a]) : d.appendChild(f);
  }
  o = function (d) {
    d.fn.dataTableExt.oApi.fnColReorder = function (a, b, e) {
      var h = d.fn.dataTable.Api ? !0 : !1, c, g, f, m, n = a.aoColumns.length, i, j;
      i = function (a, b, c) {
        if (a[b]) {
          var e = a[b].split('.'), d = e.shift();
          isNaN(1 * d) || (a[b] = c[1 * d] + '.' + e.join('.'));
        }
      };
      if (b != e)
        if (0 > b || b >= n)
          this.oApi._fnLog(a, 1, 'ColReorder \'from\' index is out of bounds: ' + b);
        else if (0 > e || e >= n)
          this.oApi._fnLog(a, 1, 'ColReorder \'to\' index is out of bounds: ' + e);
        else {
          f = [];
          c = 0;
          for (g = n; c < g; c++)
            f[c] = c;
          l(f, b, e);
          var k = p(f);
          c = 0;
          for (g = a.aaSorting.length; c < g; c++)
            a.aaSorting[c][0] = k[a.aaSorting[c][0]];
          if (null !== a.aaSortingFixed) {
            c = 0;
            for (g = a.aaSortingFixed.length; c < g; c++)
              a.aaSortingFixed[c][0] = k[a.aaSortingFixed[c][0]];
          }
          c = 0;
          for (g = n; c < g; c++) {
            j = a.aoColumns[c];
            f = 0;
            for (m = j.aDataSort.length; f < m; f++)
              j.aDataSort[f] = k[j.aDataSort[f]];
            h && (j.idx = k[j.idx]);
          }
          h && d.each(a.aLastSort, function (b, c) {
            a.aLastSort[b].src = k[c.src];
          });
          c = 0;
          for (g = n; c < g; c++)
            j = a.aoColumns[c], 'number' == typeof j.mData ? (j.mData = k[j.mData], a.oApi._fnColumnOptions(a, c, {})) : d.isPlainObject(j.mData) && (i(j.mData, '_', k), i(j.mData, 'filter', k), i(j.mData, 'sort', k), i(j.mData, 'type', k), a.oApi._fnColumnOptions(a, c, {}));
          if (a.aoColumns[b].bVisible) {
            f = this.oApi._fnColumnIndexToVisible(a, b);
            m = null;
            for (c = e < b ? e : e + 1; null === m && c < n;)
              m = this.oApi._fnColumnIndexToVisible(a, c), c++;
            i = a.nTHead.getElementsByTagName('tr');
            c = 0;
            for (g = i.length; c < g; c++)
              q(i[c], f, m);
            if (null !== a.nTFoot) {
              i = a.nTFoot.getElementsByTagName('tr');
              c = 0;
              for (g = i.length; c < g; c++)
                q(i[c], f, m);
            }
            c = 0;
            for (g = a.aoData.length; c < g; c++)
              null !== a.aoData[c].nTr && q(a.aoData[c].nTr, f, m);
          }
          l(a.aoColumns, b, e);
          l(a.aoPreSearchCols, b, e);
          c = 0;
          for (g = a.aoData.length; c < g; c++)
            i = a.aoData[c], h ? (i.anCells && l(i.anCells, b, e), 'dom' !== i.src && d.isArray(i._aData) && l(i._aData, b, e)) : (d.isArray(i._aData) && l(i._aData, b, e), l(i._anHidden, b, e));
          c = 0;
          for (g = a.aoHeader.length; c < g; c++)
            l(a.aoHeader[c], b, e);
          if (null !== a.aoFooter) {
            c = 0;
            for (g = a.aoFooter.length; c < g; c++)
              l(a.aoFooter[c], b, e);
          }
          h && new d.fn.dataTable.Api(a).rows().invalidate();
          c = 0;
          for (g = n; c < g; c++)
            d(a.aoColumns[c].nTh).off('click.DT'), this.oApi._fnSortAttachListener(a, a.aoColumns[c].nTh, c);
          d(a.oInstance).trigger('column-reorder', [
            a,
            {
              iFrom: b,
              iTo: e,
              aiInvertMapping: k
            }
          ]);
        }
    };
    var f = function (a, b) {
      var e;
      d.fn.dataTable.Api ? e = new d.fn.dataTable.Api(a).settings()[0] : a.fnSettings ? e = a.fnSettings() : 'string' === typeof a ? d.fn.dataTable.fnIsDataTable(d(a)[0]) && (e = d(a).eq(0).dataTable().fnSettings()) : a.nodeName && 'table' === a.nodeName.toLowerCase() ? d.fn.dataTable.fnIsDataTable(a.nodeName) && (e = d(a.nodeName).dataTable().fnSettings()) : a instanceof jQuery ? d.fn.dataTable.fnIsDataTable(a[0]) && (e = a.eq(0).dataTable().fnSettings()) : e = a;
      if (e._colReorder)
        throw 'ColReorder already initialised on table #' + e.nTable.id;
      var h = d.fn.dataTable.camelToHungarian;
      h && (h(f.defaults, f.defaults, !0), h(f.defaults, b || {}));
      this.s = {
        dt: null,
        init: d.extend(!0, {}, f.defaults, b),
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
      this.s.dt = e;
      this.s.dt._colReorder = this;
      this._fnConstruct();
      e.oApi._fnCallbackReg(e, 'aoDestroyCallback', d.proxy(this._fnDestroy, this), 'ColReorder');
      return this;
    };
    f.prototype = {
      fnReset: function () {
        for (var a = [], b = 0, e = this.s.dt.aoColumns.length; b < e; b++)
          a.push(this.s.dt.aoColumns[b]._ColReorder_iOrigCol);
        this._fnOrderColumns(a);
        return this;
      },
      fnGetCurrentOrder: function () {
        return this.fnOrder();
      },
      fnOrder: function (a) {
        if (a === s) {
          for (var a = [], b = 0, e = this.s.dt.aoColumns.length; b < e; b++)
            a.push(this.s.dt.aoColumns[b]._ColReorder_iOrigCol);
          return a;
        }
        this._fnOrderColumns(p(a));
        return this;
      },
      _fnConstruct: function () {
        var a = this, b = this.s.dt.aoColumns.length, e;
        this.s.init.iFixedColumns && (this.s.fixed = this.s.init.iFixedColumns);
        this.s.fixedRight = this.s.init.iFixedColumnsRight ? this.s.init.iFixedColumnsRight : 0;
        this.s.init.fnReorderCallback && (this.s.reorderCallback = this.s.init.fnReorderCallback);
        for (e = 0; e < b; e++)
          e > this.s.fixed - 1 && e < b - this.s.fixedRight && this._fnMouseListener(e, this.s.dt.aoColumns[e].nTh), this.s.dt.aoColumns[e]._ColReorder_iOrigCol = e;
        this.s.dt.oApi._fnCallbackReg(this.s.dt, 'aoStateSaveParams', function (b, c) {
          a._fnStateSave.call(a, c);
        }, 'ColReorder_State');
        var d = null;
        this.s.init.aiOrder && (d = this.s.init.aiOrder.slice());
        this.s.dt.oLoadedState && ('undefined' != typeof this.s.dt.oLoadedState.ColReorder && this.s.dt.oLoadedState.ColReorder.length == this.s.dt.aoColumns.length) && (d = this.s.dt.oLoadedState.ColReorder);
        if (d)
          if (a.s.dt._bInitComplete)
            b = p(d), a._fnOrderColumns.call(a, b);
          else {
            var c = !1;
            this.s.dt.aoDrawCallback.push({
              fn: function () {
                if (!a.s.dt._bInitComplete && !c) {
                  c = true;
                  var b = p(d);
                  a._fnOrderColumns.call(a, b);
                }
              },
              sName: 'ColReorder_Pre'
            });
          }
        else
          this._fnSetColumnIndexes();
      },
      _fnOrderColumns: function (a) {
        if (a.length != this.s.dt.aoColumns.length)
          this.s.dt.oInstance.oApi._fnLog(this.s.dt, 1, 'ColReorder - array reorder does not match known number of columns. Skipping.');
        else {
          for (var b = 0, e = a.length; b < e; b++) {
            var h = d.inArray(b, a);
            b != h && (l(a, h, b), this.s.dt.oInstance.fnColReorder(h, b));
          }
          ('' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY) && this.s.dt.oInstance.fnAdjustColumnSizing(!1);
          this.s.dt.oInstance.oApi._fnSaveState(this.s.dt);
          this._fnSetColumnIndexes();
          null !== this.s.reorderCallback && this.s.reorderCallback.call(this);
        }
      },
      _fnStateSave: function (a) {
        var b, e, h, c = this.s.dt.aoColumns;
        a.ColReorder = [];
        if (a.aaSorting) {
          for (b = 0; b < a.aaSorting.length; b++)
            a.aaSorting[b][0] = c[a.aaSorting[b][0]]._ColReorder_iOrigCol;
          var f = d.extend(!0, [], a.aoSearchCols);
          b = 0;
          for (e = c.length; b < e; b++)
            h = c[b]._ColReorder_iOrigCol, a.aoSearchCols[h] = f[b], a.abVisCols[h] = c[b].bVisible, a.ColReorder.push(h);
        } else if (a.order) {
          for (b = 0; b < a.order.length; b++)
            a.order[b][0] = c[a.order[b][0]]._ColReorder_iOrigCol;
          f = d.extend(!0, [], a.columns);
          b = 0;
          for (e = c.length; b < e; b++)
            h = c[b]._ColReorder_iOrigCol, a.columns[h] = f[b], a.ColReorder.push(h);
        }
      },
      _fnMouseListener: function (a, b) {
        var e = this;
        d(b).on('mousedown.ColReorder', function (a) {
          a.preventDefault();
          e._fnMouseDown.call(e, a, b);
        });
      },
      _fnMouseDown: function (a, b) {
        var e = this, f = d(a.target).closest('th, td').offset(), c = parseInt(d(b).attr('data-column-index'), 10);
        c !== s && (this.s.mouse.startX = a.pageX, this.s.mouse.startY = a.pageY, this.s.mouse.offsetX = a.pageX - f.left, this.s.mouse.offsetY = a.pageY - f.top, this.s.mouse.target = this.s.dt.aoColumns[c].nTh, this.s.mouse.targetIndex = c, this.s.mouse.fromIndex = c, this._fnRegions(), d(r).on('mousemove.ColReorder', function (a) {
          e._fnMouseMove.call(e, a);
        }).on('mouseup.ColReorder', function (a) {
          e._fnMouseUp.call(e, a);
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
        for (var b = !1, e = this.s.mouse.toIndex, d = 1, c = this.s.aoTargets.length; d < c; d++)
          if (a.pageX < this.s.aoTargets[d - 1].x + (this.s.aoTargets[d].x - this.s.aoTargets[d - 1].x) / 2) {
            this.dom.pointer.css('left', this.s.aoTargets[d - 1].x);
            this.s.mouse.toIndex = this.s.aoTargets[d - 1].to;
            b = !0;
            break;
          }
        b || (this.dom.pointer.css('left', this.s.aoTargets[this.s.aoTargets.length - 1].x), this.s.mouse.toIndex = this.s.aoTargets[this.s.aoTargets.length - 1].to);
        this.s.init.bRealtime && e !== this.s.mouse.toIndex && (this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex), this.s.mouse.fromIndex = this.s.mouse.toIndex, this._fnRegions());
      },
      _fnMouseUp: function () {
        d(r).off('mousemove.ColReorder mouseup.ColReorder');
        null !== this.dom.drag && (this.dom.drag.remove(), this.dom.pointer.remove(), this.dom.drag = null, this.dom.pointer = null, this.s.dt.oInstance.fnColReorder(this.s.mouse.fromIndex, this.s.mouse.toIndex), this._fnSetColumnIndexes(), ('' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY) && this.s.dt.oInstance.fnAdjustColumnSizing(!1), this.s.dt.oInstance.oApi._fnSaveState(this.s.dt), null !== this.s.reorderCallback && this.s.reorderCallback.call(this));
      },
      _fnRegions: function () {
        var a = this.s.dt.aoColumns;
        this.s.aoTargets.splice(0, this.s.aoTargets.length);
        this.s.aoTargets.push({
          x: d(this.s.dt.nTable).offset().left,
          to: 0
        });
        for (var b = 0, e = 0, f = a.length; e < f; e++)
          e != this.s.mouse.fromIndex && b++, a[e].bVisible && this.s.aoTargets.push({
            x: d(a[e].nTh).offset().left + d(a[e].nTh).outerWidth(),
            to: b
          });
        0 !== this.s.fixedRight && this.s.aoTargets.splice(this.s.aoTargets.length - this.s.fixedRight);
        0 !== this.s.fixed && this.s.aoTargets.splice(0, this.s.fixed);
      },
      _fnCreateDragNode: function () {
        var a = '' !== this.s.dt.oScroll.sX || '' !== this.s.dt.oScroll.sY, b = this.s.dt.aoColumns[this.s.mouse.targetIndex].nTh, e = b.parentNode, f = e.parentNode, c = f.parentNode, g = d(b).clone();
        this.dom.drag = d(c.cloneNode(!1)).addClass('DTCR_clonedTable').append(d(f.cloneNode(!1)).append(d(e.cloneNode(!1)).append(g[0]))).css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: d(b).outerWidth(),
          height: d(b).outerHeight()
        }).appendTo('body');
        this.dom.pointer = d('<div></div>').addClass('DTCR_pointer').css({
          position: 'absolute',
          top: a ? d('div.dataTables_scroll', this.s.dt.nTableWrapper).offset().top : d(this.s.dt.nTable).offset().top,
          height: a ? d('div.dataTables_scroll', this.s.dt.nTableWrapper).height() : d(this.s.dt.nTable).height()
        }).appendTo('body');
      },
      _fnDestroy: function () {
        var a, b;
        a = 0;
        for (b = this.s.dt.aoDrawCallback.length; a < b; a++)
          if ('ColReorder_Pre' === this.s.dt.aoDrawCallback[a].sName) {
            this.s.dt.aoDrawCallback.splice(a, 1);
            break;
          }
        d(this.s.dt.nTHead).find('*').off('.ColReorder');
        d.each(this.s.dt.aoColumns, function (a, b) {
          d(b.nTh).removeAttr('data-column-index');
        });
        this.s = this.s.dt._colReorder = null;
      },
      _fnSetColumnIndexes: function () {
        d.each(this.s.dt.aoColumns, function (a, b) {
          d(b.nTh).attr('data-column-index', a);
        });
      }
    };
    f.defaults = {
      aiOrder: null,
      bRealtime: !1,
      iFixedColumns: 0,
      iFixedColumnsRight: 0,
      fnReorderCallback: null
    };
    f.version = '1.1.3';
    d.fn.dataTable.ColReorder = f;
    d.fn.DataTable.ColReorder = f;
    'function' == typeof d.fn.dataTable && 'function' == typeof d.fn.dataTableExt.fnVersionCheck && d.fn.dataTableExt.fnVersionCheck('1.9.3') ? d.fn.dataTableExt.aoFeatures.push({
      fnInit: function (a) {
        var b = a.oInstance;
        a._colReorder ? b.oApi._fnLog(a, 1, 'ColReorder attempted to initialise twice. Ignoring second') : (b = a.oInit, new f(a, b.colReorder || b.oColReorder || {}));
        return null;
      },
      cFeature: 'R',
      sFeature: 'ColReorder'
    }) : alert('Warning: ColReorder requires DataTables 1.9.3 or greater - www.datatables.net/download');
    d.fn.dataTable.Api && (d.fn.dataTable.Api.register('colReorder.reset()', function () {
      return this.iterator('table', function (a) {
        a._colReorder.fnReset();
      });
    }), d.fn.dataTable.Api.register('colReorder.order()', function (a) {
      return a ? this.iterator('table', function (b) {
        b._colReorder.fnOrder(a);
      }) : this.context.length ? this.context[0]._colReorder.fnOrder() : null;
    }));
    return f;
  };
  'function' === typeof define && define.amd ? define([
    'jquery',
    'datatables'
  ], o) : 'object' === typeof exports ? o(require('jquery'), require('datatables')) : jQuery && !jQuery.fn.dataTable.ColReorder && o(jQuery, jQuery.fn.dataTable);
}(window, document));
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
            element.css('left', leftPosition + 'px');
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
angular.module('dellUiComponents').directive('toggle', [
  '$rootScope',
  function ($rootScope) {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs, controller) {
        switch ($attrs.toggle) {
        case 'popover':
          var destroy = function () {
            $('[data-toggle="popover"]').popover('destroy');
          };
          if ($attrs.trigger === 'hover') {
            $element.mouseover(function (event) {
              event.preventDefault();
              destroy();
              $(this).popover('show');
            });
          } else {
            $element.popover({ trigger: 'manual' });
            $element.click(function (event) {
              event.preventDefault();
              if ($(this).attr('aria-describedby')) {
                destroy();
              } else {
                destroy();
                $(this).popover('show');
              }
              $('[data-dismiss="popover"]').bind('click', function (event) {
                event.preventDefault();
                destroy();
              });
            });
          }
          break;
        case 'tooltip':
          $element.tooltip();
          $element.on('click', function () {
            console.log("hello",$rootScope.bp);
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
          calendarWidget = $element.find('.bootstrap-datetimepicker-widget');
          //have to repeat this because it is destroyed everytime focus is gone
          //check to see if the right side is big enough for the widget
          if (inputFieldOffset.left + inputFieldWidth + 215 > viewPortWidth) {
            calendarWidget.removeClass('pull-right');
          } else {
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
        });  /*
            inputField.on("blur",function (e) {
                e.preventDefault();
                e.stopPropagation();
                inputField.data("DateTimePicker").show();
            });
*/
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
/**
 * Created by Clint_Batte on 8/6/2015.
 */
angular.module('dellUiComponents').directive('contentGallery', [
  '$timeout',
  '$rootScope',
  function ($timeout, $rootScope) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
        $element.find('.content-gallery-show-more').on('click', function (e) {
          e.preventDefault();
          var parentLi = $(e.currentTarget).parents('li')[0], allListItems = $element.find('li'), rowWidth = 0, rowMaxWidth = Math.abs($element.parent().innerWidth() - $element.parent().css('padding-left').replace(/px/, '') - $element.parent().css('padding-right').replace(/px/, '')), targetFound, done, content;
          //bodyMinusContainer = $('body' - $element.innerWidth());
          if ($(parentLi).hasClass('open')) {
            $element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function () {
              $(this).remove();
            });
            $element.find('.open').removeClass('open');
          } else {
            $element.find('li.details-container').attr('display', 'none').slideUp(250).delay(200).queue(function () {
              $(this).remove();
            });
            $element.find('.open').removeClass('open');
            $timeout(function () {
              $(parentLi).addClass('open');
              _.each(allListItems, function (i, index) {
                if (!done) {
                  var itemWidth = Math.abs($(i).css('width').replace(/px/, ''));
                  if (!targetFound) {
                    targetFound = $(i).hasClass('open');
                    content = $(i).find('.content-gallery-details').html();
                  }
                  rowWidth = rowWidth + itemWidth;
                  if (rowWidth >= rowMaxWidth || index === allListItems.length - 1) {
                    if (targetFound) {
                      //console.log("Found target and inserting!!!");
                      $(i).after('<li class="col-xs-12 details-container"><div class="gallery"><span class="close"><button type="button" class="close">\xd7</button></span>' + content + '</div></li>');
                      $('.details-container').attr('display', 'block').slideDown(450);
                      $('body, li.details-container .close').on('click', function (e) {
                        e.preventDefault();
                        $element.find('li.details-container').attr('display', 'none').slideUp(450).delay(500).queue(function () {
                          $(this).remove();
                        });
                        $element.find('.open').removeClass('open');
                      });
                      $('.details-container').on('click', function (e) {
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
        });  //---------------------------------------------
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
          }), waypointObjs = $element.find('> li > a[href^=#]'), waypoints = [], triggerClicked = false;
        //console.log(waypointObjs);
        function clearActiveTab() {
          $element.find('> li').removeClass('active');
        }
        if (waypointObjs) {
          $(waypointObjs).on('click', function (e) {
            //Setting up a click listener on each tab
            e.preventDefault();
            var target = $($(e.currentTarget).attr('href'));
            $('html, body').stop().animate({ 'scrollTop': target.offset().top - 60 }, 900, 'swing');
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
        $(document).ready(function () {
          var table = $('.table-column').DataTable({
              scrollY: '300px',
              scrollX: true,
              scrollCollapse: true,
              paging: false
            });
          new $.fn.dataTable.FixedColumns(table);
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
        $(document).ready(function () {
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
              scrollX: true
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
angular.module('dellUiComponents').directive('tableResponsiveColumns', [
  '$timeout',
  function ($timeout) {
    // Runs during compile
    return {
      restrict: 'C',
      link: function ($scope, $element, iAttrs, controller) {
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
        var table = $('#table-uber').DataTable({
            'ajax': 'components/tables-uber/dataColumn.json',
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
                'data': 'Reference_number',
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
            'responsive': true
          });
        // Handle click on checkbox
        $('#table-uber tbody').on('click', 'input[type="checkbox"]', function (e) {
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
        $('#table-uber thead input[name="select_all"]').on('click', function (e) {
          if (this.checked) {
            $('#table-uber tbody input[type="checkbox"]:not(:checked)').trigger('click');
          } else {
            $('#table-uber tbody input[type="checkbox"]:checked').trigger('click');
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
      }
    };
  }
]);