function checkSpecialChars(search){
    let specialChars = `!@#$%^&*()_\+=\[\]{};:"\\|,.<>\/?~`;
    for( let i = 0; i < specialChars.length; i++){
      if (search.indexOf(specialChars.charAt(i)) >=0){
        return true;
      }
    }
    return false;
}

module.exports = checkSpecialChars;