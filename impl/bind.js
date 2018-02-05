/**
 * .myBind should behave exactly as .bind:
 * @example
 * const foo = function(){ return this.foo; }
 * const bound = foo.myBind({ foo: 42 });
 * bound(); // 42
 * @example
 * const foo = function(a, b){ return a + b; }
 * const plusFour = foo.myBind(undefined, 4);
 * plusFour(6); // 10
 * plusFour(4); // 8
 */
Function.prototype.myBind = function(context) {
	// *** Implement me! ***
}