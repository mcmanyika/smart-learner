import { describe, it, expect } from 'vitest';
import { isValidEmail, isValidPhone, isValidPassword } from '../validation';

describe('Validation Utils', () => {
  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    it('invalidates incorrect email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('validates correct phone numbers', () => {
      expect(isValidPhone('1234567890')).toBe(true);
      expect(isValidPhone('+1-234-567-8900')).toBe(true);
      expect(isValidPhone('123 456 7890')).toBe(true);
    });

    it('invalidates incorrect phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abcdefghij')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('validates correct passwords', () => {
      expect(isValidPassword('password123')).toBe(true);
      expect(isValidPassword('strongP@ssw0rd')).toBe(true);
    });

    it('invalidates incorrect passwords', () => {
      expect(isValidPassword('pass')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });
});