const strengthMeter = document.getElementById("strength-meter");
const passwordInput = document.getElementById("password-input");
const reasonsContainer = document.getElementById("reasons");

//when the input of the password is updated tests will be run that will determine the strength of
// given password
passwordInput.addEventListener("input", updateStrengthMeter);

function updateStrengthMeter() {
  const weaknesses = calculateStrength(passwordInput.value);
  console.log(weaknesses);
  let strength = 100;
  reasonsContainer.innerHTML = "";
  //for each weakness found subtract the deduction amount assigned to that weakness.
  weaknesses.forEach((w) => {
    if (w === null) return;
    strength -= w.deduction;
    const message = document.createElement("div");
    message.innerText = w.message;
    reasonsContainer.appendChild(message);
  });
  //style the meter accordingly to the amount of strength
  strengthMeter.style.setProperty("--strength", strength);
}

//return the result of tests such as length, etc..
function calculateStrength(password) {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
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
