const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

//when the input of the password is updated tests will be run that will determine the strength of
// given password
passwordInput.addEventListener("input", () => {
  const weaknesses = calculateStrength(passwordInput.value);
  console.log(weaknesses);
});

//return the result of tests such as length, etc..
function calculateStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  return weaknesses;
}

//testing password length
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
