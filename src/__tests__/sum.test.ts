function sum(n: number, m: number) {
	return n + m;
}

test('sum function', () => {
	expect(sum(2, 5)).toEqual(7);
});
