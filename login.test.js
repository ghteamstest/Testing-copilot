const { login } = require('./login');

describe('Login Function Error Handling', () => {
  describe('Input Validation', () => {
    test('should throw error when username is null', async () => {
      await expect(login(null, 'password')).rejects.toThrow('Username is required');
    });

    test('should throw error when username is undefined', async () => {
      await expect(login(undefined, 'password')).rejects.toThrow('Username is required');
    });

    test('should throw error when password is null', async () => {
      await expect(login('user', null)).rejects.toThrow('Password is required');
    });

    test('should throw error when password is undefined', async () => {
      await expect(login('user', undefined)).rejects.toThrow('Password is required');
    });

    test('should throw error when username is empty string', async () => {
      await expect(login('', 'password')).rejects.toThrow('Username must be a non-empty string');
    });

    test('should throw error when username is only whitespace', async () => {
      await expect(login('   ', 'password')).rejects.toThrow('Username must be a non-empty string');
    });

    test('should throw error when password is empty string', async () => {
      await expect(login('user', '')).rejects.toThrow('Password must be a non-empty string');
    });

    test('should throw error when password is only whitespace', async () => {
      await expect(login('user', '   ')).rejects.toThrow('Password must be a non-empty string');
    });

    test('should throw error when username is not a string', async () => {
      await expect(login(12345, 'password')).rejects.toThrow('Username must be a non-empty string');
    });

    test('should throw error when password is not a string', async () => {
      await expect(login('user', 12345)).rejects.toThrow('Password must be a non-empty string');
    });
  });

  describe('Authentication Errors', () => {
    test('should throw error for invalid credentials', async () => {
      await expect(login('wronguser', 'wrongpass')).rejects.toThrow('Invalid credentials');
    });

    test('should successfully login with valid credentials', async () => {
      const result = await login('admin', 'password123');
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('username', 'admin');
      expect(result).toHaveProperty('email');
    });
  });

  describe('Timeout Handling', () => {
    test('should throw timeout error when login takes too long', async () => {
      // This test would require mocking the authenticateUser function to take longer
      // For now, we test with a very short timeout
      await expect(login('admin', 'password123', { timeout: 1 }))
        .rejects.toThrow('Login timeout exceeded');
    }, 10000);
  });

  describe('Edge Cases', () => {
    test('should handle username with special characters', async () => {
      await expect(login('user@domain.com', 'password')).rejects.toThrow('Invalid credentials');
    });

    test('should handle very long username', async () => {
      const longUsername = 'a'.repeat(1000);
      await expect(login(longUsername, 'password')).rejects.toThrow('Invalid credentials');
    });

    test('should handle very long password', async () => {
      const longPassword = 'a'.repeat(1000);
      await expect(login('admin', longPassword)).rejects.toThrow('Invalid credentials');
    });
  });
});
