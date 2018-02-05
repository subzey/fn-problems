import '../impl/bind'; // Side-effect import

describe('Custom bind function', () => {
	it('should return a function', () => {
		const myFn = function(){};
		const context = { woot: 'root' };
		const bound = myFn.myBind(context);
		expect(typeof bound).toBe('function');
	});

	it('should return a function with a bound context', () => {
		let lastThis = null;

		const underlyingFn = function(){
			// jest.fn instance cannot use custom prototypes
			// so we create our own spy
			lastThis = this;
		};

		const context = { woot: 'root' };
		const bound = underlyingFn.myBind(context);

		bound();
		expect(lastThis).toBe(context);
	});

	it('should accept undefined as a context', () => {
		let lastThis = null;

		const underlyingFn = function(){
			// jest.fn instance cannot use custom prototypes
			// so we create our own spy
			lastThis = this;
		};

		const context = undefined;
		const bound = underlyingFn.myBind(context);

		bound();
		expect(lastThis).toBe(context);
	});

	it('should return a function with bound arguments', () => {
		let lastArgs = null;

		const underlyingFn = function(...args: any[]){
			// jest.fn instance cannot use custom prototypes
			// so we create our own spy
			lastArgs = args;
		};

		const bound = underlyingFn.myBind(undefined, 1, 2);
		bound(3, 4);

		expect(lastArgs).toEqual([1, 2, 3, 4]);
	});

	it('should return a function that returns a value', () => {
		const underlyingFn = function(...args: string[]){
			// jest.fn instance cannot use custom prototypes
			// so we create our own spy
			return args.reduce((a: string, b: string) => a + b);
		};

		const bound = underlyingFn.myBind(undefined, 'One', 'Two');
		const rv = bound('Three', 'Four');

		expect(rv).toEqual('OneTwoThreeFour');
	});
});