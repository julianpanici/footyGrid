const checkSpecialChars = require('./checkSpecialChars');

test('returns true when given string with special chars', () =>{
    expect(checkSpecialChars('wrong;')).toBe(true);
});