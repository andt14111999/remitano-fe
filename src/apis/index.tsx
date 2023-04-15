const BASE_URL = process.env.REACT_APP_BASE_URL;

const APIs = {
  register: BASE_URL + '/auth/register',
  login: BASE_URL + '/auth/login',
}

export default APIs;