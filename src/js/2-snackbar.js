import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Обіцянка виконана за ${delay}мс`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Обіцянку відхилено за ${delay}мс`,
      });
    });
});
