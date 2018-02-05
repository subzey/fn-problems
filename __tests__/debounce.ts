import { debounce } from '../impl/debounce';

jest.useFakeTimers();

afterEach(() => {
	jest.clearAllMocks();
	jest.clearAllTimers();
})

describe('debounce timers', () => {
	it('should not throw', () => {
		void debounce(() => {}, 10);
	});

	it('should not be called immediately', () => {
		const underlyingFn = jest.fn();
		void debounce(underlyingFn, 10);
		expect(underlyingFn).not.toBeCalled();
	});

	it('should not be called intil the timer fires', () => {
		const underlyingFn = jest.fn();
		const debounced = debounce(underlyingFn, 100);
		debounced();
		jest.advanceTimersByTime(50);
		expect(underlyingFn).not.toBeCalled();
	});

	it('should be called after the timer fires', () => {
		const underlyingFn = jest.fn();
		const debounced = debounce(underlyingFn, 100);
		debounced();
		jest.advanceTimersByTime(100);
		expect(underlyingFn).toBeCalled();
	});

	it('"early" calls should extend the timespan', () => {
		const underlyingFn = jest.fn();
		const debounced = debounce(underlyingFn, 100);
		debounced();

		jest.advanceTimersByTime(99);
		debounced();

		jest.advanceTimersByTime(99);
		debounced();

		jest.advanceTimersByTime(99);

		expect(underlyingFn).not.toBeCalled();

		jest.advanceTimersByTime(1);

		expect(underlyingFn).toBeCalled();
	});

	it('"late" calls should start a new timer', () => {
		const underlyingFn = jest.fn();
		const debounced = debounce(underlyingFn, 100);
		debounced();
		jest.advanceTimersByTime(100);
		debounced();
		jest.advanceTimersByTime(100);
		expect(underlyingFn).toHaveBeenCalledTimes(2);
	});
});


describe('debounce args', () => {
	it('should keep valid args for the calls', () => {
		const underlyingFn = jest.fn();
		const debounced = debounce(underlyingFn, 100);
		debounced(1, 2, 3);
		jest.advanceTimersByTime(100);
		expect(underlyingFn).toHaveBeenLastCalledWith(1, 2, 3);
	});

	it('should keep only the last args', () => {
		const underlyingFn = jest.fn();
		const debounced = debounce(underlyingFn, 100);
		debounced(1, 2, 3);
		jest.advanceTimersByTime(99);
		debounced(4, 5, 6);
		jest.advanceTimersByTime(100);

		expect(underlyingFn).toHaveBeenLastCalledWith(4, 5, 6);
	});

	it('should keep valid this for the calls', () => {
		const underlyingFn = jest.fn();
		const someContext = { woot: 'root' };
		const debounced = debounce(underlyingFn, 100);
		debounced.call(someContext);
		jest.advanceTimersByTime(100);
		expect(underlyingFn.mock.instances[0]).toBe(someContext);
	});

	it('should keep only the last this', () => {
		const underlyingFn = jest.fn();
		const someContext = { woot: 'root' };
		const someOtherContext = { foo: 'bar' };

		const debounced = debounce(underlyingFn, 100);
		debounced.call(someContext);
		jest.advanceTimersByTime(99);
		debounced.call(someOtherContext);
		jest.advanceTimersByTime(100);
		expect(underlyingFn.mock.instances[0]).toBe(someOtherContext);
	});

})