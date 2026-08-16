const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

document.querySelector('#pac-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const monthly = Number(document.querySelector('#pac-monthly').value);
  const years = Number(document.querySelector('#pac-years').value);
  const annualRate = Number(document.querySelector('#pac-rate').value) / 100;
  const months = years * 12;
  const monthlyRate = annualRate / 12;
  const capital = monthlyRate === 0
    ? monthly * months
    : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  const paid = monthly * months;
  document.querySelector('#pac-result strong').textContent = euro.format(capital);
  document.querySelector('#pac-result span').textContent = `Versamenti complessivi: ${euro.format(paid)} · Crescita ipotetica: ${euro.format(capital - paid)}`;
});

document.querySelector('#pension-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const desired = Number(document.querySelector('#desired-income').value);
  const expected = Number(document.querySelector('#expected-pension').value);
  const years = Number(document.querySelector('#income-years').value);
  const monthlyGap = Math.max(desired - expected, 0);
  const capital = monthlyGap * 12 * years;
  document.querySelector('#pension-result strong').textContent = euro.format(capital);
  document.querySelector('#pension-result span').textContent = `Divario mensile stimato: ${euro.format(monthlyGap)} per ${years} anni, senza considerare rendimento, inflazione e fiscalità.`;
});
