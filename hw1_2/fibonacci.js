const findFibonacci = (num) => {
    let sign = num < 0 ? -1 : 1;
    return sign * fib(Math.abs(num));
}

const fib = (num) => {
    if (num <= 2) return 1;
    return fib(num - 2) + fib(num - 1);
}

console.log(`Fibonacci of 33: ${findFibonacci(33)}`);
console.log(`Fibonacci of -30: ${findFibonacci(-30)}`);
