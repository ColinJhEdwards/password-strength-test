const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

passwordInput.addEventListener("input", () => {
  const weaknesses = calculateStrength(passwordInput.value);
  console.log(weaknesses);
});

function calculateStrength(password) {
  const weaknesses = [];
  weaknesses.push(leangthWeakness(password));
  return weaknesses;
}

function lengthWeakness(password) {
  const length = password.length;
  if (length <= 5) {
    return {
      message: "Your password is too short",
      deduction: 40,
    };
  }
  if (length <= 10) {
    return {
      message: "Your password could be longer",
      deduction: 15,
    };
  }
}
