/*--------------------------------------------------------------*/
/* IMPORTANT SECTION:
  PRESS CTRL+F AND TYPE FOLLOWING  NAMES TO NAVIGATE TO THESE SECTIONS
  --------------------------------------------------------------
  A] FETCH CLASSES AND IDS
  --------------------------------------------------------------
  B] SET TIME IN DIGITAL CLOCK AFTER EVERY SECOND
  --------------------------------------------------------------
  C] DISPLAY ALARM ON SCREEN WHEN USER CLICKS ON SET ALARM BUTTON
  --------------------------------------------------------------
  D] DISPLAY RULES
  --------------------------------------------------------------
  E] DELETE ALARM
  --------------------------------------------------------------
  F] SET MESSAGE WHEN NO ALARM
  --------------------------------------------------------------
*/
/*--------------------------------------------------------------*/

/*----------------------------------------------------------
// FETCH CLASSES AND IDS
-------------------------------------------------------------*/

var displayClock = document.querySelector(".display-clock");
var setAlarmButton = document.querySelector(".btn-set-alarm");
var displayAlarm = document.querySelector(".display-alarm");
var alarmList = document.querySelector(".alarm-list");
var alarmForm = document.querySelector(".alarm-form");
var formRules = document.querySelector(".form-rules");

/*----------------------------------------------------------
// SET TIME IN DIGITAL CLOCK AFTER EVERY SECOND
-------------------------------------------------------------*/
var timeChange = setInterval(function () {
  var currentTime = new Date();
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentSeconds = currentTime.getSeconds();

  let displayHours = document.querySelector(".display-hours");
  if (currentHours != 0 && currentHours < 10) {
    displayHours.innerHTML = "0" + `${currentHours}`;
  } else {
    if (currentHours % 12 == 0) {
      currentHours = 12;
      displayHours.innerHTML = "12";
    } else if (currentHours % 12 != 0) {
      currentHours = currentHours % 12;
      displayHours.innerHTML = `${currentHours % 12}`;
    }
  }

  let displayMinute = document.querySelector(".display-minutes");
  if (currentMinutes < 10) {
    displayMinute.innerHTML = "0" + `${currentMinutes}`;
  } else {
    displayMinute.innerHTML = `${currentMinutes}`;
  }

  let displaySeconds = document.querySelector(".display-seconds");
  if (currentSeconds < 10) {
    displaySeconds.innerHTML = "0" + `${currentSeconds}`;
  } else {
    displaySeconds.innerHTML = `${currentSeconds}`;
  }

  let displayTimezone = document.querySelector(".display-timezone");
  let getTimezone = "";
  if (currentTime.getHours() >= 12) {
    getTimezone = "PM";
  } else {
    getTimezone = "AM";
  }
  displayTimezone.innerHTML = getTimezone;

  document.querySelectorAll(".display-alarm").forEach((alarm) => {
    let alarmInfo = alarm.childNodes[0];
    let thisHours = Number(alarmInfo.childNodes[0].textContent);
    let thisMinutes = Number(alarmInfo.childNodes[2].textContent);
    let thisSeconds = Number(alarmInfo.childNodes[4].textContent);
    let thisTimezone = alarmInfo.childNodes[6].textContent;

    if (
      getTimezone == thisTimezone &&
      thisHours == currentHours &&
      thisMinutes == currentMinutes &&
      thisSeconds == currentSeconds
    ) {
      alert(`It's ${thisHours}:${thisMinutes}:${thisSeconds} ${thisTimezone}`);
    }
  });
}, 1000);

/*-------------------------------------------------------------------------
//  DISPLAY ALARM ON SCREEN WHEN USER CLICKS ON SET ALARM BUTTON
----------------------------------------------------------------------------*/

setAlarmButton.addEventListener("click", function (e) {
  e.preventDefault();
  let inputHours = Number(document.querySelector("#input-hours").value);
  let inputMinutes = Number(document.querySelector("#input-minutes").value);
  let inputSeconds = Number(document.querySelector("#input-seconds").value);
  let inputTimezone = document.querySelector("#input-timezone").value;
  if (inputHours) {
    if (
      inputHours > 0 &&
      inputHours <= 12 &&
      inputMinutes >= 0 &&
      inputMinutes <= 59 &&
      inputSeconds >= 0 &&
      inputSeconds <= 59
    ) {
      let createAlarm = document.createElement("div");
      createAlarm.className = "display-alarm";

      if (inputHours < 10) {
        inputHours = "0" + inputHours;
      }
      if (inputMinutes < 10) {
        inputMinutes = "0" + inputMinutes;
      }
      if (inputSeconds < 10) {
        inputSeconds = "0" + inputSeconds;
      }
      createAlarm.innerHTML = `<div class="alarm-info-style"><span class="display-hours">${inputHours}</span> :
      <span class="display-minutes">${inputMinutes}</span> :
      <span class="display-seconds">${inputSeconds}</span>
      <span class="display-timezone">${inputTimezone}</span></div>
      <button type="submit" class="delete-alarm">Delete</button>`;
      let setAlarm = alarmList.childNodes[3];
      setAlarm.appendChild(createAlarm);

      lengthOFAlarmInfo();

      let deleteAlarm = createAlarm.lastElementChild;
      deleteAlarm.addEventListener("click", function (e) {
        e.preventDefault();
        createAlarm.remove();
        lengthOFAlarmInfo();
      });

      document.querySelector("#input-hours").value = "";
      document.querySelector("#input-minutes").value = "";
      document.querySelector("#input-seconds").value = "";
    } else {
      displayRules();
    }
  } else {
    displayRules();
  }
});

/*-------------------------------------------------------------------------
//  DISPLAY RULES
----------------------------------------------------------------------------*/

function displayRules() {
  setTimeout(function () {
    formRules.innerHTML = "";
  }, 7000);
  formRules.innerHTML =
    "<h4>Please Follow the below rules</h4>*Use 12 Hour format.<br>*Minutes and seconds should range from 0-59<br><br>";
}

/*-------------------------------------------------------------------------
//  DELETE ALARM
----------------------------------------------------------------------------*/

function deleteAlarmfun(
  alarm,
  thisHours,
  thisMinutes,
  thisSeconds,
  thisTimezone
) {
  alert(`It's ${thisHours}:${thisMinutes}:${thisSeconds} ${thisTimezone}`);
  alarm.remove();
  lengthOFAlarmInfo();
}

/*----------------------------------------------------------
// SET MESSAGE WHEN NO ALARM
-------------------------------------------------------------*/
function lengthOFAlarmInfo() {
  let alarmInfoClass = document.querySelector(".alarm-info");

  if (alarmInfoClass.children.length > 1) {
    let noAlarmClass = document.querySelector(".no-alarm");
    noAlarmClass.style.display = "none";
  } else {
    let noAlarmClass = document.querySelector(".no-alarm");
    noAlarmClass.style.display = "flex";
  }
}
