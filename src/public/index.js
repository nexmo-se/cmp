document.addEventListener('readystatechange', (event) => {
  if (event.target.readyState === 'interactive') {
    console.log('interactive');
  }

  if (event.target.readyState === 'complete') {
    console.log('complete loading');
  }
});
