export function emailChecker(email){
    return /\S+@\S+\.\S+/.test(email);
}

export function whiteSpaceChecker(data){
    if(!data){
        return false
    }
      return data.replace(/\s/g, '').length < 1 ? false: true
}

export function passwordChecker(password){
    return password.replace(/\s/g, '').length < 6 ? false: true
}