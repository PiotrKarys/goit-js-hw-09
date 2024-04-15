import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function (ev) {
  ev.preventDefault();

  const delay = parseInt(this.elements.delay.value);
  const step = parseInt(this.elements.step.value);
  const amount = parseInt(this.elements.amount.value);

  let currentDelay = delay;
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, currentDelay)
      .then(result => {
        Notiflix.Notify.success(
          `Promise ${result.position} resolved after ${result.delay}ms`
        );
      })
      .catch(error => {
        Notiflix.Notify.failure(
          `Promise ${error.position} rejected after ${error.delay}ms`
        );
      });

    currentDelay += step;
  }
});
