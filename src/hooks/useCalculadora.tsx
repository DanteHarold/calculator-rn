import {useRef, useState} from 'react';
enum Operadores {
  suma,
  resta,
  multiplicar,
  dividir,
}
export const useCalculadora = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('0');

  const ultimaOperacionRef = useRef<Operadores>();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto: string) => {
    //*No aceptar mas de un Punto

    if (numero.includes('.') && numeroTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //*Punto Decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        //* Evaluar si es otro cero y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        //*Evaluar si es diferente a cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        //*Evitar 00000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    let negativo = '';
    let numeroTemp = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.slice(0, -1);
    }
    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
    // if (
    //   numero.length === 1 ||
    //   (numero.startsWith('-') && numero.length === 2)
    // ) {
    //   setNumero('0');
    // } else {
    //   setNumero(numero.slice(0, - 1).toString());
    // }
  };

  const cambiarNumeroPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnDividir = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacionRef.current = Operadores.dividir;
  };
  const btnMultiplicar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacionRef.current = Operadores.multiplicar;
  };
  const btnRestar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacionRef.current = Operadores.resta;
  };
  const btnSumar = () => {
    cambiarNumeroPorAnterior();
    ultimaOperacionRef.current = Operadores.suma;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacionRef.current) {
      case Operadores.suma:
        setNumero(`${num1 + num2}`);
        break;
      case Operadores.resta:
        setNumero(`${num2 - num1}`);
        break;
      case Operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;
      case Operadores.dividir:
        setNumero(`${num2 / num1}`);
        break;
      default:
        break;
    }
    setNumeroAnterior(`0`);
  };

  return {
    numero,
    numeroAnterior,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnDividir,
    btnMultiplicar,
    btnSumar,
    btnRestar,
    calcular,
    armarNumero,
  };
};
