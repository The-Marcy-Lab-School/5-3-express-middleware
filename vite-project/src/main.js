console.log('hello world!');

// Use a relative path to fetch from the server that served these files (the same origin)
const response = await fetch('/api/data');
const data = await response.json();
console.log(data);