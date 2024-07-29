import "./chunk-V4OQ3NZ2.js";

// node_modules/ts-cookies/src/index.js
function cookie() {
  function extend() {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[i];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }
  function decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  function init(converter) {
    function api() {
    }
    function set(key, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = extend({
        path: "/"
      }, api.defaults, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(/* @__PURE__ */ new Date() * 1 + attributes.expires * 864e5);
      }
      attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
      try {
        var result = JSON.stringify(value);
        if (/^[\{\[]/.test(result)) {
          value = result;
        }
      } catch (e) {
      }
      value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
      key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = key + "=" + value + stringifiedAttributes;
    }
    function get(key, json) {
      if (typeof document === "undefined") {
        return;
      }
      var jar = {};
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var i = 0;
      for (; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var cookie2 = parts.slice(1).join("=");
        if (!json && cookie2.charAt(0) === '"') {
          cookie2 = cookie2.slice(1, -1);
        }
        try {
          var name = decode(parts[0]);
          cookie2 = (converter.read || converter)(cookie2, name) || decode(cookie2);
          if (json) {
            try {
              cookie2 = JSON.parse(cookie2);
            } catch (e) {
            }
          }
          jar[name] = cookie2;
          if (key === name) {
            break;
          }
        } catch (e) {
        }
      }
      return key ? jar[key] : jar;
    }
    api.set = set;
    api.get = function(key) {
      return get(
        key,
        false
        /* read as raw */
      );
    };
    api.getJSON = function(key) {
      return get(
        key,
        true
        /* read as json */
      );
    };
    api.remove = function(key, attributes) {
      set(key, "", extend(attributes, {
        expires: -1
      }));
    };
    api.defaults = {};
    api.withConverter = init;
    return api;
  }
  return init(function() {
  });
}
var src_default = cookie();
export {
  src_default as default
};
//# sourceMappingURL=ts-cookies.js.map
