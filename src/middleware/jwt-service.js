'use strict';
const jwtdecode = require('jwt-decode');
const AuthService = require('../auth/auth-service');

function getIdFromToken(token) {
  const { user_id } = jwtdecode(token);
  return user_id;
}

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';

  let bearerToken;
  if (!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'Missing bearer token' });
  } else {
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    const payload = AuthService.verifyJwt(bearerToken);

    AuthService.getUserWithUserName(req.app.get('db'), payload.sub)
      .then(user => {
        if (!user)
          return res.status(401).json({ error: 'Unauthorized request' });

        req.user = user;
        next();
        return user;
      })
      .catch(err => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized request' });
  }
}

module.exports = {
  requireAuth,
  getIdFromToken
};
