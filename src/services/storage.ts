/**
 * Set the user's firstname in localStorage for faster login in the future
 * @param fname
 */
export function setUserFirstname (fname : string) {
  return new Promise((resolve) => {
    localStorage.setItem('user.firstname', fname);
    resolve();
  })
}

/**
 * Set the user's lastname in localStorage for faster login in the future
 * @param lname
 */
export function setUserLastname (lname : string) {
  return new Promise((resolve) => {
    localStorage.setItem('user.lastname', lname);
    resolve();
  })
}

/**
 * Returns a promise that resolves with the user's firstname
 */
export function getUserFirstname (): Promise<string> {
  return new Promise((resolve) => {
    resolve(localStorage.getItem('user.firstname'));
  })
}

/**
 * Returns a promise that resolves with the user's lastname
 */
export function getUserLastname (): Promise<string> {
  return new Promise((resolve) => {
    resolve(localStorage.getItem('user.lastname'));
  })
}
