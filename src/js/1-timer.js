import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      document.querySelector('[data-start]').disabled = true;
    } else {
      userSelectedDate = selectedDate;
      document.querySelector('[data-start]').disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => String(value).padStart(2, '0');

document.querySelector('[data-start]').addEventListener('click', () => {
  let timeInterval = setInterval(() => {
    const timeDifference = userSelectedDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(timeInterval);
    }
    const timeLeft = convertMs(timeDifference);
    document.querySelector('[data-days]').textContent = addLeadingZero(
      timeLeft.days
    );
    document.querySelector('[data-hours]').textContent = addLeadingZero(
      timeLeft.hours
    );
    document.querySelector('[data-minutes]').textContent = addLeadingZero(
      timeLeft.minutes
    );
    document.querySelector('[data-seconds]').textContent = addLeadingZero(
      timeLeft.seconds
    );
  }, 1000);
});
