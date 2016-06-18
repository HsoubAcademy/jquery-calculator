$(document).ready(function() {
  var operator = null;
  var firstOperand = null;
  var secondOperand = null;
  var isPending = false;

  function calculate() {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '×') {
      return firstOperand * secondOperand;
    } else if (operator === '÷') {
      return firstOperand / secondOperand;
    }
  }

  function resetCalculator() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    isPending = false;
  }

  $('#calculate').click(function() {
    if (operator && firstOperand && secondOperand) {
      var result = calculate();
      $('input').val(result);
      resetCalculator();
      firstOperand = result;
      isPending = true;
    }
  });

  $('#reset').click(function() {
    resetCalculator();
    $('input').val('');
  });

  $('#numbers button:not(#calculate)').each(function() {
    var $btn = $(this);
    var value = $btn.text();
    $btn.click(function() {
      if (operator === null) {
        // في الطرف الأول من العملية
        if (isPending && firstOperand !== null) {
          // المستخدم يتابع إدخال الأرقام في الطّرف الأول
          firstOperand = firstOperand + value;
        } else {
          // هذه هي المرّة الأولى الّتي يبدأ فيها المُستخدم بكتابة رقم
          firstOperand = value;
          isPending = true;
        }
        // اجعل قيمة حقل الإدخال مساوية للعدد الجديد
        $('input').val(firstOperand);
      } else {
        // في الطرف الثاني من العملية
        if (secondOperand === null) {
          // هذه هي المرّة الأولى الّتي يبدأ فيها المستخدم بكتابة رقم في الطّرف الثّاني
          secondOperand = value;
        } else {
          // المستخدم يتابع إدخال الأرقام في الطّرف الثّاني
          secondOperand = secondOperand + value;
        }
        $('input').val(secondOperand);
      }
    });
  });

  $('#operators button').click(function() {
    operator = $(this).text();
    isPending = true;
  });
});