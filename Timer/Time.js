var timer = 3 + ":" + 20;
startTimer();

function startTimer() {
    var presentTime = timer;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){
        m=m-1
      }
    timer =  m + ":" + s;
    console.log(m)
    setTimeout(startTimer, 1000);
  }
function checkSecond(sec) {
     if(sec < 10 && sec >= 0) {
       sec = "0" + sec
     };
     if (sec < 0)
       {
         sec = "59"
       };
        return sec;
      }
