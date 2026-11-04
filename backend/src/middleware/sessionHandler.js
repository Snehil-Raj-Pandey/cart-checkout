import crypto from 'node:crypto';

export function sessionHandler(req, res, next) {
  // Check header, query, or generate/default
  let sessionId = req.headers['x-session-id'] || req.query.sessionId;

  if (!sessionId || typeof sessionId !== 'string' || sessionId.trim() === '') {
    // Default to 'default-session' for transparent guest browsing, or unique per client if desired
    sessionId = 'default-session';
  } else {
    sessionId = sessionId.trim().slice(0, 64);
  }

  req.sessionId = sessionId;
  res.setHeader('x-session-id', sessionId);
  next();
}
