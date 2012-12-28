// Generated by CoffeeScript 1.4.0
(function() {

  _.mixin({
    keyStroke: function(requiredKeys, callback, options) {
      var activeKeys, checkKeystroke, executeCallback;
      if (options == null) {
        options = {};
      }
      options = _.defaults(options, {
        context: this,
        args: [],
        preventDefault: true,
        modKeys: []
      });
      activeKeys = [];
      document.addEventListener('keydown', function(event) {
        activeKeys = _.union(activeKeys, [event.keyCode]);
        if (checkKeystroke(event)) {
          return executeCallback(event);
        }
      });
      document.addEventListener('keyup', function(event) {
        return activeKeys = _.without(activeKeys, event.keyCode);
      });
      executeCallback = function(event) {
        if (options.preventDefault) {
          event.preventDefault();
        }
        return callback.apply(options.context, [event].concat(options.args));
      };
      return checkKeystroke = function(event) {
        var requiredKey;
        if (_.isArray(requiredKeys)) {
          return [] === _.difference(activeKeys, requiredKeys);
        } else {
          requiredKey = requiredKeys;
          if (1 + options.modKeys.length !== activeKeys.length) {
            return false;
          }
          if (!_.contains(activeKeys, requiredKey)) {
            return false;
          }
          return _.every(_.map(options.modKeys, function(key) {
            return event[key];
          }), _.identity);
        }
      };
    }
  });

}).call(this);
