export function IsMobileNumber(txtMobile) {
  var mob = /^[1-9]{1}[0-9]{9}$/;
  if (mob.test(txtMobile) === false) {
    // alert("Please enter valid mobile number.");
    return false;
  }
  return true;
}
function hasWhiteSpace(password) {
  if (typeof password == "string") {
    return password.indexOf(" ") >= 0;
  }
}

function scoreOfPassword(password) {
  var score = 0;
  if (!password) return score;
  if (hasWhiteSpace(password)) return score;

  // award every unique letter until 5 repetitions
  var letters = new Object();
  for (var i = 0; i < password.length; i++) {
    letters[password[i]] = (letters[password[i]] || 0) + 1;
    score += 5.0 / letters[password[i]];
  }

  // bonus points for mixing it up
  var variations = {
    digits: /\d/.test(password),
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    nonWords: /\W/.test(password),
  };

  let variationCount = 0;
  for (var check in variations) {
    variationCount += variations[check] == true ? 1 : 0;
  }
  score += (variationCount - 1) * 10;

  return parseInt(score);
}

export function checkPassWordStrength(password) {
  var score = scoreOfPassword(password);
  if (score >= 80) return "strong";
  if (score >= 60) return "good";
  if (score < 60) return "weak";

  // return score;
}
