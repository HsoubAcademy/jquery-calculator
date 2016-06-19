$(document).ready(function() {
  var firstOperand = null; // الطّرف الأوّل من العمليّة
  var operator = null; // العامل الرّياضي بين الطّرفين: جمع أم طرح... إلخ.
  var secondOperand = null; // الطرف الثّاني من العملية
  var isPending = false; // هل العملية جارية؟ أم أننا بدأنا عملية حسابية جديدة؟

  function calculate() {
    // حول العبارات النّصيّة إلى أرقام
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

  // صفر الآلة الحاسبة بإعادة حالتها إلى ما كانت عليه في البداية
  function resetCalculator() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
    isPending = false;
  }

  $('#calculate').click(function() {
    // لا تقم بالحساب إلّا إذا كانت كلّ مكونات العمليّة قد أدخلت
    if (operator !== null && firstOperand !== null && secondOperand !== null) {
      var result = calculate(); 
      $('input').val(result); // اعرض نتيجة العملية في حقل الإدخال
      resetCalculator(); // صفر الآلة الحاسبة
      // اعتبر ناتج العمليّة الحالية هو الطّرف الأول للعمليّة القادمة
      firstOperand = result;
    }
  });

  $('#reset').click(function() {
    resetCalculator();
    $('input').val(''); // اجعل قيمة حقل الإدخال فارغة
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
          // الآن أصبحت العمليّة جارية
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
        // اجعل قيمة حقل الإدخال مساوية للطّرف الثّاني 
        $('input').val(secondOperand);
      }
    });
  });

  $('#operators button').click(function() {
    operator = $(this).text(); // +  -  × ÷
    isPending = true;
  });
});