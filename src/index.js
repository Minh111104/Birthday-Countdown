const MY_BIRTHDAY_MONTH = 11;
const MY_BIRTHDAY_DAY = 11;

let now = new Date();
let thisYear = now.getFullYear();
let myBirthday = new Date(thisYear, MY_BIRTHDAY_MONTH - 1, MY_BIRTHDAY_DAY);

if (myBirthday.getTime() < now.getTime()) { // My birthday has already passed this year.
  myBirthday = new Date(thisYear + 1, MY_BIRTHDAY_MONTH - 1, MY_BIRTHDAY_DAY);
}

let countDown = setInterval(() => {
  let difference = myBirthday - new Date();
  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let remainderHours = difference % (1000 * 60 * 60 * 24);
  let hours = Math.floor(remainderHours / (1000 * 60 * 60));
  let remainderMinutes = difference % (1000 * 60 * 60);
  let minutes = Math.floor(remainderMinutes / (1000 * 60));
  let remainderSeconds = difference % (1000 * 60);
  let seconds = Math.floor(remainderSeconds / 1000);

  daysDisplay.innerHTML = days;
  hoursDisplay.innerHTML = hours;
  minutesDisplay.innerHTML = minutes;
  secondsDisplay.innerHTML = seconds;

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    clearInterval(countDown);
    headingDisplay.innerHTML = "Happy Birthday to Me!"
  }
}, 1000);
