var newNumber = '';
var display = document.getElementById("screen");
var oldNumber = ''; 
var operator = '';
var current = '';
var operators = ["+", "-", "*", "/"];
var bValue = '';
var kValue = 0;
var equal1 = '';
var negativeNo = '';
var kValueObject = [];

function calculation(obj) {
    doOperation(obj.value);
}

document.addEventListener('keyup', function (parametre) {

    kValue = parametre.keyCode;
    var kValueObject = {
        96: '0',
        97: '1',
        98: '2',
        99: '3',
        100: '4',
        101: '5',
        102: '6',
        103: '7',
        104: '8',
        105: '9',
        106: '*',
        107: '+',
        109: '-',
        110: '.',
        111: '/',
        13: '=',

    };

    bValue = kValueObject[kValue];

    if ((kValue > 95 && kValue < 112 && kValue !== 110) || kValue === 13) { 
        doOperation(bValue);

    } else if (kValue === 110) {
        addDot(bValue);
    }
})

function doOperation(bValue) {

    if (bValue === '-' || bValue === '+' || bValue === '/' || bValue === '*') {

        equal1 = '';
        operator = bValue;
        if (operators.includes(current.charAt(current.length - 1)) === false && current !== '') {

            current = "(" + current + ")"; 
        } else {

            current = current.replace(/.$/, ''); 
         
        }
        current += bValue;

        if (oldNumber === '' && newNumber === '') { 

            current = '';
            display.innerHTML = operator;

        } else if (oldNumber === '' && newNumber !== '') { 
            oldNumber = newNumber;

            newNumber = '';
            display.innerHTML = operator;

        } 
        else if (oldNumber !== '' && newNumber !== '') { 

            display.innerHTML = eval(current.substring(0, current.length - 1)); 
        
            newNumber = '';

        } else { 
            display.innerHTML = operator;
        }


    } else if (bValue === '=') {
       
        if (operators.includes(current.charAt(current.length - 1))) {
            display.innerHTML = eval(current.substring(0, current.length - 1));

        } else {
            if (current.charAt(current.length - 1) !== ')' && current !== '') {
              
                current = "(" + current + ")";
            }

            display.innerHTML = eval(current);

            oldNumber = eval(current);
          
            newNumber = '';
        }
        equal1 = 'equality';

    } else {

        if (equal1 === 'equality') {


            clear1();
            equal1 = 'number';
        }
        newNumber += bValue;
        current += bValue;

        if (newNumber.charAt(0) === '0' && newNumber.length > 1 && newNumber.includes('.') === false) {

            if (current.charAt(current.length - 2) === '0') { 
                current = (current.substring(0, current.length - 2) + current.charAt(current.length - 1));
                newNumber = newNumber.substring(1, newNumber.length);
            }
            equal1 = 'number';
        } else if (equal1 === 'negative' || equal1 === 'positive' || equal1 === 'negative sayıdan') {
            current = (current.substring(0, current.length - 2) + bValue + ')');

            equal1 = 'negative sayıdan'
        }

        display.innerHTML = newNumber;
    }

    current = current.replace('=', '');

    if (display.innerHTML == 'undefined' || display.innerHTML == Infinity) {
        display.innerHTML = 'Başka bir değer giriniz';

    }
}

function backSpace(a) {

    if (display.innerHTML.length + 1 > 0 && operators.includes(current.charAt(current.length - 1)) === false) {
        newNumber = display.innerHTML.substring(0, display.innerHTML.length - 1);
        display.innerHTML = newNumber;
        if (equal1 === 'equality') {
            current = newNumber;
            equal1 = '';
        }
        if (equal1 === 'negative' || equal1 === 'positive') {
            current = (current.substring(0, current.length - 2) + current.charAt(current.length - 1)) 
          
        } else {
            current = current.substring(0, current.length - (newNumber.length + 1)) + newNumber;
        }
    } 
}

function clear1(a) {
    display.innerHTML = '0';
    newNumber = '';
    oldNumber = '';
    current = '';
    equal1 = '';
}

function addDecimal(obj) {
    addDot(obj.value);
}

function addDot(bValue) {
    if (display.innerHTML.indexOf('.') < 0) {
        if ((current.charAt(current.length - 1) == ')')) {
            newNumber = display.innerHTML;
            current = newNumber;
        
        } else if (operators.includes(display.innerHTML)) {
            newNumber = '0';
            current = '0';
        }
        if (operators.includes(current.charAt(current.length - 1))) {
            newNumber = display.innerHTML;
            current = newNumber;
        } else if (current == '') {
            current = '0';
            newNumber = '0';
        }

        current += bValue;
        newNumber += bValue;
        display.innerHTML = newNumber;
    }
    equal1 = '';
}

function makeNegative(obj) {

    if (newNumber.indexOf('-') !== 0) { 

        if (equal1 == 'equality') {
            newNumber = display.innerHTML;
            newNumber = '-' + newNumber;
            current = '(' + newNumber + ')';
            oldNumber = '';
            equal1 = '';

        } else if (operators.includes(current.charAt(current.length - 1))) {
            //if display charat(0) = '-' ise koşulunu incele.
            if (oldNumber !== '' && newNumber === '') //yani ikinci veya daha fazla basışı operatöre(evalden sonra da newNumber boş)

            {
                display.innerHTML = newNumber;
                newNumber = '-' + newNumber;
                current = current.substring(0, current.length - (newNumber.length - 1)) + '(' + newNumber + ')';
                equal1 = 'negative';
                // newNumberdaki karakterleri currenttan seçip başına - gelmeli. parantez koymalı - nin başına ve currentıin sonuna.
            }

        } else if (equal1 !== 'negative sayıdan' && equal1 !== 'positive') {
            
            newNumber = '-' + newNumber;
            current = current.substring(0, current.length - (newNumber.length - 1)) + '(' + newNumber + ')';
            equal1 = 'negative';

        } else if (equal1 === 'positive') {
            newNumber = '-' + newNumber;
            current = current.substring(0, current.length - (newNumber.length)) + newNumber + ')';
            equal1 = 'negative';
        }

    } else if (newNumber.indexOf('-') === 0) {
        newNumber = newNumber.substring(1);
        current = current.substring(0, (current.length - (newNumber.length + 2))) + newNumber + ')';
        equal1 = 'positive';
    }
    display.innerHTML = newNumber;
}
