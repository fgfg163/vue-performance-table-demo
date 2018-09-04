;
(function (global, my) {
  var INNER_GET_CONFIG = 'INNER_GET_CONFIG';
  var INNER_GET_CONFIG_CALL_BACK = 'INNER_GET_CONFIG_CALL_BACK';
  var INNER_REGIST_FUNC = 'INNER_REGIST_FUNC';
  var INNER_CLEAR_REGIST_FUNC = 'INNER_CLEAR_REGIST_FUNC';
  var INNER_CALL_FUNCTION = 'INNER_CALL_FUNCTION';
  var INNER_CALL_FUNCTION_CALL_BACK = 'INNER_CALL_FUNCTION_CALL_BACK';
  var OUTER_CALL_FUNCTION = 'OUTER_CALL_FUNCTION';
  var OUTER_CALL_FUNCTION_CALL_BACK = 'OUTER_CALL_FUNCTION_CALL_BACK';

  var callId = 0;
  var callbackMap = {};
  var registMap = {};
  global.myClone = {};

  // get my function list
  my.onMessage = function (msg) {
    var action = msg;
    if (typeof (action) === 'object' && typeof(action.type) === 'string') {
      if (action.type === INNER_GET_CONFIG_CALL_BACK) {
        var list = action.list || [];
        global.myClone = {};
        for (var key in list) {
          (function (field) {
            if (field.type === 'function') {
              global.myClone[field.name] = function () {
                var args = Array.prototype.slice.call(arguments, 0);
                var thisId = callId++;
                callbackMap[thisId] = args[0];
                my.postMessage({
                  type: INNER_CALL_FUNCTION,
                  id: thisId,
                  name: field.name,
                  params: args,
                });
              };
            } else {
              global.myClone[field.name] = field.value;
            }
          })(list[key]);
        }
      } else if (action.type === INNER_CALL_FUNCTION_CALL_BACK) {
        var cbObj = callbackMap[action.id];
        if (cbObj && typeof(cbObj) === 'object') {
          var params = action.params || [];
          if (action.status === 'success') {
            if (typeof (cbObj.success) === 'function') {
              try {
                cbObj.success.apply(undefined, params);
              } catch (err) {
                setTimeout(function () {
                  throw err;
                }, 0);
              }
            }
          } else if (action.status === 'fail') {
            if (typeof (cbObj.fail) === 'function') {
              try {
                cbObj.fail.apply(undefined, params);
              } catch (err) {
                setTimeout(function () {
                  throw err;
                }, 0);
              }
            }
          }
          try {
            cbObj.complete.apply(undefined, params);
          } catch (err) {
            setTimeout(function () {
              throw err;
            }, 0);
          }
        }
      } else if (action.type === OUTER_CALL_FUNCTION) {
        // if (Object.prototype.hasOwnPropty.call(registMap, action.name)) {
        //   var callResult;
        //   var callStatus = 'fail';
        //   if (typeof (registMap[action.name]) === 'function') {
        //     try {
        //       callResult = registMap[action.name].apply(undefined, action.params);
        //       callStatus = 'success';
        //     } catch (err) {
        //       setTimeout(function () {
        //         throw err;
        //       }, 0);
        //     }
        //   } else {
        //     callResult = registMap[action.name];
        //     callStatus = 'success';
        //   }
        //   my.postMessage({
        //     type: INNER_CALL_FUNCTION_CALL_BACK,
        //     id: action.id,
        //     params: [callResult],
        //     status: callStatus,
        //   });
        // }
      }
    }
  };

  my.postMessage({ type: INNER_GET_CONFIG });

  // // regist function to frame
  // myClone.registAppend = function (list) {
  //   var list = list || {};
  //   var registList = [];
  //   for (var key in list) {
  //     if (typeof (list[key]) === 'function') {
  //       registMap[key] = list[key];
  //       registList.push({
  //         name: key,
  //         type: typeof (list[key]),
  //       });
  //     } else if (typeof (list[key]) !== 'undefined') {
  //       registMap[key] = list[key];
  //       registList.push({
  //         name: key,
  //         type: typeof (list[key]),
  //         value: list[key],
  //       });
  //     }
  //   }
  //   my.postMessage({ type: INNER_REGIST_FUNC, list: registList });
  // };
  //
  // // clear regist function to frame
  // global.myClone.registClear = function (list) {
  //   registMap = {};
  //   my.postMessage({ type: INNER_CLEAR_REGIST_FUNC });
  // };
})(window || global, my);
