const form = document.querySelector('form[name="order"]');

form.addEventListener('submit', function(e) {
  // نمنع الإرسال الافتراضي مؤقتًا عشان نتحكم بالعملية
  e.preventDefault();

  // نجمع البيانات
  const data = new FormData(form);

  // نرسل البيانات لـ Netlify
  fetch("/", {
    method: "POST",
    body: data,
  })
  .then(() => {
    // بعد الإرسال نروح لصفحة الشكر أو نعرض رسالة
    window.location.href = "/thank-you.html"; // صممي صفحة شكراً باسم هذا الملف
  })
  .catch(err => alert("Error submitting form"));
});

