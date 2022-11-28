const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'hash_string',
  isValidPassword : (password: string, hash: string) => Promise.resolve(true),
};

export const userWithPasswordOmitted = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  isValidPassword : (password: string, hash: string) => Promise.resolve(true),
}

export const userWithInvalidPassword = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'hash_string',
  isValidPassword : (password: string, hash: string) => Promise.resolve(false),
}

export default user;
