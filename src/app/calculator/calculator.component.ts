import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  input: string = '';
  result: string = '';

  // Función encargada de detectar cuando presionamos un numero
  pressNum(num: string) {
    //Do Not Allow . more than once
    //Si presionamos el signo decimal
    if (num == '.') {
      if (this.input != '') {
        const lastNum = this.getLastOperand();
        // console.log(lastNum)
        console.log(lastNum.lastIndexOf('.'));
        if (lastNum.lastIndexOf('.') >= 0) return;
      }
    }

    //Do Not Allow 0 at beginning.
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num == '0') {
      if (this.input == '') {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/') {
        return;
      }
    }

    this.input = this.input + num;
    this.calcAnswer();
  }

  getLastOperand() {
    let pos: number;
    console.log(this.input);
    pos = this.input.toString().lastIndexOf('+');
    if (this.input.toString().lastIndexOf('-') > pos)
      pos = this.input.lastIndexOf('-');
    if (this.input.toString().lastIndexOf('*') > pos)
      pos = this.input.lastIndexOf('*');
    if (this.input.toString().lastIndexOf('/') > pos)
      pos = this.input.lastIndexOf('/');
    console.log('Last ' + this.input.substr(pos + 1));
    return this.input.substr(pos + 1);
  }

  pressOperator(op: string) {
    //No permite la pulsacion de dos operadores al mismo tiempo
    const lastKey = this.input[this.input.length - 1];
    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+'
    ) {
      return;
    }

    this.input = this.input + op;
    this.calcAnswer();
  }

  // Función que borra el ultimo digito/operador pulsado
  clear() {
    if (this.input != '') {
      this.input = this.input.substr(0, this.input.length - 1);
    }
  }

  // Función que borra todo el contenido de input
  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (
      lastKey === '/' ||
      lastKey === '*' ||
      lastKey === '-' ||
      lastKey === '+' ||
      lastKey === '.'
    ) {
      formula = formula.substr(0, formula.length - 1);
    }

    // console.log("Formula " +formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    // if (this.input == '0') this.input = '';
  }

  getSqrt(){
    if (this.input != '') {
        const num = Math.sqrt(Number(this.getLastOperand())).toString();
        this.input = this.input.substr(0, this.input.length - this.getLastOperand().length);
        this.input = this.input + num; 
    }
  }

  getExp(){
    if (this.input != '') {
        console.log("Last operamd:", this.getLastOperand())
        const num = Math.pow(Number(this.getLastOperand()), 2).toString();
        this.input = this.input.substr(0, this.input.length - this.getLastOperand().length);
        this.input = this.input + num; 
    }
  }
}
