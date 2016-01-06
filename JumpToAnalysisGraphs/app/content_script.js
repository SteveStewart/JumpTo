var jumpy = function jumpToPresent() {
    var jump = document.getElementById("jump-to-now");
    jump.click();
    console.log("jump click");
 }


var interval = {
    //to keep a reference to all the intervals
    intervals: {},

    //create another interval
    make: function (fun, delay) {
        //see explanation after the code
        var newInterval = setInterval.apply(
            window,
            [fun, delay].concat([].slice.call(arguments, 2))
        );

        this.intervals[newInterval] = true;

        return newInterval;
    },

    //clear a single interval
    clear: function (id) {
        return clearInterval(this.intervals[id]);
    },

    //clear all intervals
    clearAll: function () {
        var all = Object.keys(this.intervals), len = all.length;

        while (len-- > 0) {
            clearInterval(all.shift());
        }
    }
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
      
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");

      if (request.greeting === "stop-jump-to") {
          console.log("stop-jump-to");
          interval.clearAll();
      }

      if (request.greeting === "start-jump-to") {
          var refreshIntervalId = interval.make(jumpy, request.interval * 1000);
          console.log("start-jump-to " + refreshIntervalId);
          
      }
  });