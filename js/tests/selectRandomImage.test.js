const selectRandomImage = require('./selectRandomImage');

test ('Returns true when returned list is of length 6', () => {
    expect(selectRandomImage()).toHaveLength(6);
});