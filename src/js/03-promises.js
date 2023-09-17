document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const delayInput = form.querySelector('input[name="delay"]');
    const stepInput = form.querySelector('input[name="step"]');
    const amountInput = form.querySelector('input[name="amount"]');

    const delay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    if (isNaN(delay) || isNaN(step) || isNaN(amount) || delay < 0 || step < 0 || amount < 0) {
      alert('Будь ласка, введіть коректні числові значення для всіх полів і переконайтеся, що вони більше або рівні нулю.');
      return;
    }

    for (let i = 0; i < amount; i++) {
      createPromise(i + 1, delay + i * step)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}