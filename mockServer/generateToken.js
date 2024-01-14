let tokens = [];

function getToken() {
  const token = Math.random().toString(36).slice(2);
  tokens.push(token);
  setTimeout(() => {
    tokens = [];
  }, 10000);
  return token;
}

function verifyToken(token) {
  if (tokens.indexOf(token) !== -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getToken,
  verifyToken,
};
