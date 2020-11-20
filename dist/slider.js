(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Slider = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var TouchMixin = function TouchMixin() {
    var _this = this;

    _classCallCheck(this, TouchMixin);

    _defineProperty(this, "touchStart", function (event) {
      _this.resetTouchStatus();

      _this.startX = event.touches[0].clientX;
      _this.startY = event.touches[0].clientY;
    });

    _defineProperty(this, "touchMove", function (event) {
      var touch = event.touches[0];
      _this.deltaX = touch.clientX - _this.startX;
      _this.deltaY = touch.clientY - _this.startY;
      _this.offsetX = Math.abs(_this.deltaX);
      _this.offsetY = Math.abs(_this.deltaY);
    });

    _defineProperty(this, "resetTouchStatus", function () {
      _this.deltaX = 0;
      _this.deltaY = 0;
      _this.offsetX = 0;
      _this.offsetY = 0;
    });

    this.deltaX = 0;
    this.deltaY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
  };

  function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
      event.preventDefault();
    }

    if (isStopPropagation) {
      event.stopPropagation();
    }
  }
  function isFn(fn) {
    return typeof fn === 'function';
  }
  function getDom(el) {
    if (typeof el === 'string') {
      el = document.querySelector(el);
    }

    var isDOM = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? function (el) {
      return el instanceof HTMLElement;
    } : function (el) {
      return el && _typeof(el) === 'object' && el.nodeType === 1 && typeof el.nodeName === 'string';
    };

    if (isDOM(el)) {
      return el;
    } else {
      throw TypeError('el is not define');
    }
  }

  var Slider = function Slider() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    _defineProperty(this, "initHtml", function () {
      var html = "\n      <div class=\"v-slider-bar\">\n        <div class=\"v-slider__button-wrapper\">\n          <div class=\"v-slider__button\"></div>\n        </div>\n      </div>\n    ";
      _this.el.style.background = _this.options.inactiveColor;
      _this.el.innerHTML = html;
      _this.el.querySelector('.v-slider__button').style.width = _this.options.buttonSize;
      _this.el.querySelector('.v-slider__button').style.height = _this.options.buttonSize;

      if (_this.options.barHeight) {
        _this.el.style.height = _this.options.barHeight;
        _this.el.querySelector('.v-slider-bar').style.height = _this.options.barHeight;
      }

      if (_this.disabled) {
        _this.el.classList.add('v-slider-disabled');
      }
    });

    _defineProperty(this, "updateValue", function (value, end) {
      value = _this.format(value);
      var input = _this.options.input;
      var change = _this.options.change;

      if (input) {
        if (isFn(input)) {
          input.call(_this, value);
        } else {
          console.warn("input is not a function");
        }
      }

      if (end && change) {
        if (isFn(change)) {
          change.call(_this, value);
        } else {
          console.warn('change is not a function');
        }
      }

      _this.value = value;

      _this.render();
    });

    _defineProperty(this, "format", function (value) {
      return Math.round(Math.max(_this.min, Math.min(value, _this.max)) / _this.step) * _this.step;
    });

    _defineProperty(this, "onClick", function (event) {
      if (_this.disabled) {
        return;
      }

      event.stopPropagation();

      var rect = _this.el.getBoundingClientRect();

      var delta = event.clientX - rect.left;
      var total = rect.width;
      var value = +_this.min + delta / total * _this.scope;
      _this.startValue = _this.value;

      _this.updateValue(value, true);
    });

    _defineProperty(this, "onTouchStart", function (event) {
      if (_this.disabled) {
        return;
      }

      _this.touchMixin.touchStart(event);

      _this.currentValue = _this.value;
      _this.startValue = _this.format(_this.value);
      _this.dragStatus = 'start';
    });

    _defineProperty(this, "onTouchMove", function (event) {
      if (_this.disabled) {
        return;
      }

      var dragStart = _this.options.dragStart;

      if (_this.dragStatus === 'start' && dragStart) {
        if (isFn(dragStart)) {
          dragStart();
        } else {
          console.warn('dragStart is not a function');
        }
      }

      _this.el.querySelector('.v-slider-bar').style.transition = 'none 0s ease 0s';
      preventDefault(event, true);

      _this.touchMixin.touchMove(event);

      _this.dragStatus = 'draging';

      var rect = _this.el.getBoundingClientRect();

      var delta = _this.touchMixin.deltaX;
      var total = rect.width;
      var diff = delta / total * _this.scope;
      _this.currentValue = _this.startValue + diff;

      _this.updateValue(_this.currentValue);
    });

    _defineProperty(this, "onTouchEnd", function () {
      if (_this.disabled) {
        return;
      }

      if (_this.dragStatus === 'draging') {
        _this.updateValue(_this.currentValue, true);

        var dragEnd = _this.options.dragEnd;

        if (dragEnd) {
          if (isFn(dragEnd)) {
            dragEnd();
          } else {
            console.warn('dragEnd is not a function');
          }
        }
      }

      _this.el.querySelector('.v-slider-bar').style.transition = null;
      _this.dragStatus = '';
    });

    _defineProperty(this, "bindTouchEvent", function (el) {
      var onTouchStart = _this.onTouchStart,
          onTouchMove = _this.onTouchMove,
          onTouchEnd = _this.onTouchEnd;
      el.addEventListener('touchstart', onTouchStart);
      el.addEventListener('touchmove', onTouchMove);

      if (onTouchEnd) {
        el.addEventListener('touchend', onTouchEnd);
        el.addEventListener('touchcancel', onTouchEnd);
      }
    });

    _defineProperty(this, "calcMainAxis", function () {
      var value = _this.value,
          min = _this.min,
          scope = _this.scope;
      return "".concat((value - min) * 100 / scope, "%");
    });

    _defineProperty(this, "calcOffset", function () {
      var value = _this.value,
          min = _this.min,
          scope = _this.scope;
      return null;
    });

    _defineProperty(this, "render", function () {
      var barStyle = {
        width: _this.calcMainAxis(),
        background: _this.options.activeColor
      };

      var el = _this.el.querySelector('.v-slider-bar');

      el.style.width = barStyle.width;
      el.style.background = barStyle.background;
    });

    this.options = _objectSpread2({
      min: 0,
      max: 100,
      step: 1,
      value: 0,
      disabled: false
    }, options);
    this.min = this.options.min;
    this.max = this.options.max;
    this.step = this.options.step;
    this.value = this.options.value;
    this.disabled = this.options.disabled;
    this.el = getDom(this.options.el);
    this.dragStatus = '';
    this.scope = this.max - this.min;
    this.initHtml();
    this.updateValue(this.value);

    var _el = this.el.querySelector('.v-slider__button-wrapper');

    this.bindTouchEvent(_el);
    this.touchMixin = new TouchMixin();
    this.el.addEventListener('click', this.onClick);
  };

  return Slider;

})));
//# sourceMappingURL=slider.js.map
