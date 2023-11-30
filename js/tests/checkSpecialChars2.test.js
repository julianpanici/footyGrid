const checkSpecialChars = require('./checkSpecialChars');

test('returns false when given string without special chars', () =>{
    expect(checkSpecialChars('right')).toBe(false);
});