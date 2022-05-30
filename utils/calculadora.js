const calculadora = (num1, num2, operador) => {
  if (operador === '-') return num1 - num2;
  if (operador === '+') return num1 + num2;

  return 'operador invalido';
};

module.exports = calculadora;