import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let selectedDate = null;
const startButton = document.querySelector('button[data-start');

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      startButton.disabled = true;
      alert('Wybierz późniejszą datę');
    } else {
      startButton.disabled = false;
    }
  },
});
startButton.addEventListener('click', function () {
  if (selectedDate) {
    startCountdown(selectedDate);
  }
});

function startCountdown(targetDate) {
  const timerFields = document.querySelectorAll('.timer .value');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(timerInterval);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(distance);

    timerFields[0].textContent = formatTime(days);
    timerFields[1].textContent = formatTime(hours);
    timerFields[2].textContent = formatTime(minutes);
    timerFields[3].textContent = formatTime(seconds);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
