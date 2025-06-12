import {
    toJSDate,
    mergeTheme,
    mergeClasses,
    formatDate,
    isValidTimeFormat,
    sortTimeSlots
  } from '../utils';
  
  describe('Utils', () => {
    describe('toJSDate', () => {
      it('should return null for falsy values', () => {
        expect(toJSDate(null)).toBeNull();
        expect(toJSDate(undefined)).toBeNull();
        expect(toJSDate('')).toBeNull();
      });
  
      it('should return Date object as is', () => {
        const date = new Date('2025-01-15');
        expect(toJSDate(date)).toBe(date);
      });
  
      it('should convert string to Date', () => {
        const result = toJSDate('2025-01-15');
        expect(result).toBeInstanceOf(Date);
        expect(result.toISOString()).toContain('2025-01-15');
      });
  
      it('should handle dayjs objects', () => {
        const dayjs = require('dayjs');
        const dayjsDate = dayjs('2025-01-15');
        const result = toJSDate(dayjsDate);
        expect(result).toBeInstanceOf(Date);
      });
    });
  
    describe('mergeClasses', () => {
      it('should merge multiple class strings', () => {
        const result = mergeClasses('class1', 'class2', 'class3');
        expect(result).toBe('class1 class2 class3');
      });
  
      it('should filter out falsy values', () => {
        const result = mergeClasses('class1', null, undefined, '', 'class2');
        expect(result).toBe('class1 class2');
      });
    });
  
    describe('isValidTimeFormat', () => {
      it('should validate correct time formats', () => {
        expect(isValidTimeFormat('9:00 AM')).toBe(true);
        expect(isValidTimeFormat('12:30 PM')).toBe(true);
        expect(isValidTimeFormat('11:59 PM')).toBe(true);
      });
  
      it('should reject invalid time formats', () => {
        expect(isValidTimeFormat('25:00 AM')).toBe(false);
        expect(isValidTimeFormat('9:60 AM')).toBe(false);
        expect(isValidTimeFormat('9 AM')).toBe(false);
      });
    });
  
    describe('sortTimeSlots', () => {
      it('should sort time slots chronologically', () => {
        const slots = ['2:00 PM', '9:00 AM', '12:00 PM', '5:00 PM'];
        const sorted = sortTimeSlots(slots);
        expect(sorted).toEqual(['9:00 AM', '12:00 PM', '2:00 PM', '5:00 PM']);
      });
    });
  });