window.depend = function (module) {
  var res = {};
  window.require([module], (thing) => {
    res = new thing();
  });
  console.log(res)
  return res;
}