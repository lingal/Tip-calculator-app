'use strict'

//buttons
const btns = document.querySelectorAll('input[data-tip]');
const resetBtn = document.querySelector('input[data-reset]');

// input elements
let billInput = document.querySelector('input[data-bill]');
let peopleInput = document.querySelector('input[data-people]');

//display tip and total
let dsplTip = document.querySelector('.show-tip');
let dsplTotal = document.querySelector('.show-total');


const notice = document.querySelector('.notice');


let billValue;
let pplValue;
let evnt;
let currentItem;
let splitterOn = false;
let resetBtnDisabled = true;



//initial resets

function initialReset() {
  resetBtnDisabled = true;
  splitterOn = false;
  billInput.value = '';
  peopleInput.value = '';
  dsplTip.innerHTML = '0.00';
  dsplTotal.innerHTML = '0.00';
  pplValue = '';
}

initialReset();


function disableResetBtn() {
  resetBtn.disabled = true;
  resetBtn.classList.remove('activated');
  resetBtn.classList.remove('hover');
  resetBtnDisabled = true;
}

disableResetBtn();


// Event listeners

billInput.addEventListener('input', getBillVal);
peopleInput.addEventListener('input', getPplNum);
resetBtn.addEventListener('click', resetSplitter);


// functionality
btns.forEach(btn => {

  if (btn.dataset.tip === 'custom') {
    btn.addEventListener('input', function (e) {
      currentItem = e.currentTarget;
      evnt = parseInt(e.currentTarget.value.split('%')[0]) / 100;
      removeActive()
      getTotals();
    })
  } else {
    btn.addEventListener('click', function (e) {
      currentItem = e.currentTarget;
      evnt = parseInt(e.currentTarget.value.split('%')[0]) / 100;
      btn.classList.add('button__active');
      removeActive()
      getTotals();
    })

  }

})


function removeActive() {
  btns.forEach(btn => {
    if (btn != currentItem) {
      btn.classList.remove('button__active');
    }
  })
}


function resetCustom() {
  btns.forEach(btn => {
    if (btn.dataset.tip === 'custom') {
      btn.value = '';
    } else {
      btn.classList.remove('button__active')
    }
  })
}

function getBillVal() {
  splitterOn = true;
  resetBtnDisabled = false;
  billValue = Number(billInput.value);
  getTotals();
}


function getPplNum() {
  pplValue = parseInt(peopleInput.value);
  if (pplValue <= 0) {
    notice.textContent = "Can't be zero";
    notice.style.color = '#880808';
    peopleInput.parentElement.classList.add('alert');
  } else {
    notice.textContent = '';
    peopleInput.parentElement.classList.remove('alert');
  }
  getTotals()
}

function getTotals() {
  if (splitterOn) {
    if (pplValue > 0 && evnt > 0) {
      let tip = billValue * evnt / pplValue;
      let total = ((billValue * evnt) + billValue) / pplValue;
      dsplTip.innerHTML = tip.toFixed(2);
      dsplTotal.innerHTML = total.toFixed(2);
      enableResetBtn();
    }
  }
}


function resetSplitter() {
  notice.textContent = '';
  peopleInput.parentElement.classList.remove('alert');
  resetCustom();
  disableResetBtn();
  initialReset()
}


function enableResetBtn() {
  resetBtn.disabled = false;
  resetBtn.classList.add('activated');

if(!resetBtnDisabled) {
  resetBtn.addEventListener('mouseover', function () {
    resetBtn.classList.add('hover')
  })
  resetBtn.addEventListener('mouseout', function () {
    resetBtn.classList.remove('hover');
  })
}
}



// old program

// let billValue;
// let ;
// const evnt;

// bill.addEventListener('input', function (e) {
//   billValue = Number(e.target.value);
//   if (billValue) {
//     btns.forEach(btn => {
//       btn.addEventListener('click', function (e) {
//         let event = Number(e.currentTarget.value.split('%')[0]) / 100;
//         let tip = billValue * event;
//         dsplTip.innerHTML = tip;
//         numOfPpl.addEventListener('input', function (e) {
//           let num = Number(e.target.value);
//           if(num>0) {
//             let perPerson = tip / num;
//             dsplTotal.innerHTML = perPerson;
//           }
//
//         })
//       })
//     })

//   } else {
//     console.log('enter valid bill sum');
//   }
// })



// resetBtn.addEventListener('click', function() {
//   bill.value = '';
//   numOfPpl.value = '';
//   dsplTip.innerHTML = '';
//   dsplTotal.innerHTML = '';
// })