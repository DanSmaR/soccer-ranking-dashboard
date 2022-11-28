const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'hash_string',
  isValidPassword : (password: string, hash: string) => Promise.resolve(true),
};

export const userWithNoPassword = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  isValidPassword : (password: string, hash: string) => Promise.resolve(true),
}

export default user;
