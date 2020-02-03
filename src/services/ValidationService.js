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

  validateTextField(textField) {
    let textFieldData = {
      isValid: true,
      errMessage: ""
    };

    if (this._isEmpty(textField)) {
      textFieldData.isValid = false;
      textFieldData.errMessage = "This field is required.";
    }

    return textFieldData;
  }

  validationDate(date) {
    let dateFieldData = {
      isValid: true,
      errMessage: ""
    };

    const selectedDate = new Date(date).setHours(0, 0, 0, 0);
    const dateNow = new Date().setHours(0, 0, 0, 0);

    if (isNaN(selectedDate) || selectedDate < dateNow) {
      dateFieldData.isValid = false;
      dateFieldData.errMessage = "Date cannot be less then now";
    }

    if (this._isEmpty(date)) {
      dateFieldData.isValid = false;
      dateFieldData.errMessage = "This field is required.";
    }

    return dateFieldData;
  }

  validateTime(startTime, endTime, fullDay) {
    let timeFieldData = {
      errMessage: "",
      isValid: true
    };

    if (this._isEmpty(startTime) || this._isEmpty(endTime)) {
      timeFieldData.isValid = false;
      timeFieldData.errMessage = "Select correct time or check the checkbox";
    }

    if (startTime > endTime) {
      timeFieldData.isValid = false;
      timeFieldData.errMessage =
        "End time of event cannot be earlier than start time";
    }

    if (fullDay) {
      timeFieldData.isValid = true;
      timeFieldData.errMessage = "";
    }

    return timeFieldData;
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
