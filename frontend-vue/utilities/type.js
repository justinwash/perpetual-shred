window.type = function (module, args) {
  var res = {};
  window.require([module], (thing) => {
    res = new thing(args);
  });
  return res;
}