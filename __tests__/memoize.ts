import { memoize } from '../impl/memoize';

describe('memoize', () => {
	it('should not throw', () => {
		memoize(() => {});
	});

	it('should return correct values', () => {
		const testFn = (v: number) => v * 2;
		const memoizedFn = memoize(testFn);
		expect(memoizedFn(42)).toBe(testFn(42));
	});

	it('should be able to memoize several fns', () => {
		const testFn1 = (v: number) => v * 2;
		const testFn2 = (v: number) => v + 2;

		const memoizedFn1 = memoize(testFn1);
		const memoizedFn2 = memoize(testFn2);

		expect(memoizedFn1(42)).toBe(testFn1(42));
		expect(memoizedFn2(42)).toBe(testFn2(42));
	});

	it('should cache values correctly', () => {
		const underlyingFn = jest.fn((v: number) => v + 42);

		const memoizedFn = memoize(underlyingFn);

		// Never have been called so far
		expect(underlyingFn).toHaveBeenCalledTimes(0);

		void memoizedFn(1);
		// Called once for arg = 1
		expect(underlyingFn).toHaveBeenCalledTimes(1);

		void memoizedFn(1);
		// Should not be called again for arg = 1
		expect(underlyingFn).toHaveBeenCalledTimes(1);
	});

	it('should cache each value, not only the last one', () => {
		const underlyingFn = jest.fn((v: number) => v + 42);

		const memoizedFn = memoize(underlyingFn);
		void memoizedFn(1);
		void memoizedFn(2);
		void memoizedFn(3);

		void memoizedFn(1);
		void memoizedFn(2);
		void memoizedFn(3);

		expect(underlyingFn).toHaveBeenCalledTimes(3);
	});

	it('should not have "special" values', () => {
		const memoizedFn = memoize((v) => v);

		expect(memoizedFn('__proto__')).toBe('__proto__');
		expect(memoizedFn('hasOwnProperty')).toBe('hasOwnProperty');
	})
});