interface Function {
	myBind(context: any, ...args: any[]): (...args: any[]) => any;
}