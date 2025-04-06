// ফর্ম সাবমিট হ্যান্ডলার
document.getElementById("login-form").addEventListener("submit", function(event) {
  event.preventDefault();

  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("remember-me").checked; // চেকবক্সের স্টেট

  // ডামি পাসওয়ার্ড (উদাহরণস্বরূপ)
  const correctPassword = "123456777";

  if (password === correctPassword) {
    // লগইন সফল হলে, যদি 'Remember Me' চেক করা থাকে
    if (rememberMe) {
      // localStorage-এ পাসওয়ার্ড সেভ করা
      localStorage.setItem("password", password);

      // Cookies-এ পাসওয়ার্ড সেভ করা
      document.cookie = "password=" + password + "; path=/; max-age=" + 60*60*24*30; // 30 দিন পর্যন্ত কার্যকর
    } else {
      // localStorage এবং Cookies থেকে পাসওয়ার্ড মুছে দেওয়া
      localStorage.removeItem("password");
      document.cookie = "password=; path=/; max-age=0"; // Cookies মুছে ফেলা
    }
    window.location.href = "dashboard.html"; // লগইন সফল হলে ড্যাশবোর্ড পেজে রিডাইরেক্ট
  } else {
    document.getElementById("error-message").textContent = "Incorrect password."; // ভুল হলে এরর মেসেজ
  }
});

// পেজ রিফ্রেশ হওয়ার পর, যদি ব্যবহারকারী আগে লগইন করে এবং 'Remember Me' সিলেক্ট করে রেখেছে, তা চেক করা
window.onload = function() {
  // localStorage থেকে পাসওয়ার্ড পরীক্ষা
  const savedPasswordFromLocalStorage = localStorage.getItem("password");

  // Cookies থেকে পাসওয়ার্ড পরীক্ষা
  const savedPasswordFromCookies = getCookie("password");

  const savedPassword = savedPasswordFromLocalStorage || savedPasswordFromCookies;

  if (savedPassword) {
    document.getElementById("password").value = savedPassword;
    document.getElementById("remember-me").checked = true; // 'Remember Me' চেকবক্সটি চেক করা থাকবে
  }
};

// Cookies থেকে ডেটা পাওয়ার ফাংশন
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}