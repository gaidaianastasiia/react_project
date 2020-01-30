export default class ValidationService {
  validateEmail(email) {
    let emailData = {
      isValid: true,
      errMessage: ""
    };

    if (this._isEmpty(email)) {
      emailData.isValid = false;
      emailData.errMessage = "This field is required.";
    }

    if (this._isRegexNotMatch(email)) {
      emailData.isValid = false;
      emailData.errMessage = "Enter correct email.";
    }

    return emailData;
  }

  validatePassword(password) {
    let passwordData = {
      isValid: true,
      errMessage: ""
    };

    if (this._isEmpty(password)) {
      passwordData.isValid = false;
      passwordData.errMessage = "This field is required.";
    }

    if (this._isMinLengthIncorrect(password)) {
      passwordData.isValid = false;
      passwordData.errMessage = "Password must be 6 or more characters.";
    }

    return passwordData;
  }

  validatePasswordsMatch(password_1, password_2) {
    let passwordsData = {
      isValid: true,
      errMessage: ""
    };

    if (this._isPasswordsNotMatch(password_1, password_2)) {
      passwordsData.isValid = false;
      passwordsData.errMessage = "Passwords do not match.";
    }

    return passwordsData;
  }

  validateEventsInput(event) {
    let eventsData = {
      isValid: true,
      errMessage: ""
    };
    for (let key in event) {
     if(this._isEmpty(event[key].toString())){
         eventsData.isValid = false;
         eventsData.errMessage = "This field is required";
     }
    }
    console.log(eventsData);
    return eventsData;
  }

  _isEmpty(value) {
    return !value.trim();
  }

  _isRegexNotMatch(value) {
    const regExp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return !regExp.test(value);
  }

  _isMinLengthIncorrect(value) {
    return value.length < 6;
  }

  _isPasswordsNotMatch(password_1, password_2) {
    return password_1 !== password_2;
  }
}
