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
  weaknesses.push(upperCaseWeakness(password));
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

//testing lowercase weakness with regex
function lowerCaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
}

function upperCaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
}

//since checking for lower and upper case characters was similar, this function covers both basis, which is awesome
function characterTypeWeakness(password, regex, type) {
  //check password for lowercase letters, this regex will search for all characters between a-z
  //g property makes it a global search so it will check the entire string and not just
  // the first lowercase found
  const matches = password.match(regex) || [];
  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20,
    };
  }

  if (matches.length <= 2) {
    return {
      message: `Your password could have more ${type}`,
      deduction: 5,
    };
  }
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /0-9/g, "numbers");
}
