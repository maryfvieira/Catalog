db = db.getSiblingDB('curso_git');

db.createUser({
  user: 'user',
  pwd: '123456',
  roles: [{ role: 'readWrite', db: 'curso_git' }]
});
