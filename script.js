// ==========<<<Button generator took by id>>> ==========
var generateBtn = document.querySelector("#generate");

// ========<<< Password entry string >>>==========
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

// Adding event listener to generate button listener for button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
    var genPassword = "";
    var passLenText = "";
    var passLength = 0;
    // We ask about the password length of at least 8 and a maximum of 128 characters
    do {
        passLenText = prompt(
            "Please chose a length of at least 8 characters and no more than 128 characters."
        );
        passLength = parseInt(passLenText);
    } while (!validatePassLength(passLength));

    var charLowercase = false;
    var charUppercase = false;
    var numPass = false;
    var charSpecial = false;
    // we ask you what kind of password should be lowercase or capital letters to use numbers or not
    do {
        charLowercase = confirm("Whould you like to use lowercase characters?");
        charUppercase = confirm("Would you like to use uppercase characters?");
        numPass = confirm("Would you like to use numbers in your password?");
        charSpecial = confirm("Would you like to use special characters?");
    } while (
        !validateCharTypes(charLowercase, charUppercase, numPass, charSpecial)
    );

    // save the result
    var passwordArray = [];

    if (charLowercase) {
        passwordArray.push("charLower");
    }
    if (charUppercase) {
        passwordArray.push("charUpper");
    }
    if (numPass) {
        passwordArray.push("passwordNum");
    }
    if (charSpecial) {
        passwordArray.push("specialChar");
    }

    // copy the password requirements to be eliminated later
    var typeCheck = passwordArray.slice();

    for (var i = passLength; i >= 1; i--) {
        // random password selection
        var charType =
            passwordArray[Math.floor(Math.random() * passwordArray.length)];
        if (typeCheck.indexOf(charType) > -1) {
            // eliminate a password type of randomly chosen to ensure that they all get used
            typeCheck.splice(typeCheck.indexOf(charType), 1);
            genPassword += genRandomChar(charType);
        } else if (typeCheck.length === i) {
            // randomly choose a character based on the remaining password type
            genPassword += genRandomChar(typeCheck[i - 1]);
            typeCheck.pop();
        } else {
            genPassword += genRandomChar(charType);
        }

        // debugPassword(charType, genPassword, i);
    }

    return genPassword;
}

// validate the length of the password
function validatePassLength(passwordLen) {
    if (isNaN(passwordLen)) {
        alert("Your response must be numeric.");
        return false;
    } else if (passwordLen < 8 || passwordLen > 128) {
        alert(
            "Your response must be at least 8 characters and no more than 128 characters."
        );
        return false;
    }
    return true;
}

// validate type selection
function validateCharTypes(lower, upper, num, special) {
    if (!lower && !upper && !num && !special) {
        alert("You must make at least one selection.");
        return false;
    }
    return true;
}

// our random numbers to the password that we use
function genRandomChar(rtnChar) {
    var charTypeArray = {
        charLower: "abcdefghijklmnopqrstuvwxyz",
        charUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        passwordNum: "0123456789",
        specialChar: "!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~",
    };
    return charTypeArray[rtnChar].charAt(
        Math.floor(Math.random() * charTypeArray[rtnChar].length)
    );
}

function debugPassword(type, currentPass, len) {
    console.log(
        type + " Current Password: " + currentPass + " " + "current len: " + len
    );
}
