# Challenge - calc-server

**calc-server** implements an [RPN calculator](https://en.wikipedia.org/wiki/Reverse_Polish_notation) service over WebSockets. See [client.js](client.js) for a usage example.

## The problem

Memory usage seems to steadily increase over the lifetime of the process. Your task is to confirm the presence of a memory leak, identify the type of object that's leaking, and fix the problem.

Your tasks are:
 1. Confirm and find the memory leak without looking at the code
 2. Fix the leak

Suggested steps:

1. Generate some load on the server with [Artillery](https://artillery.io) and observe changes in memory usage. A sample Artillery test script is provided in [test.json](test.json). Feel
free to tweak it (e.g. extend the scenario with more operations).
  - `artillery run test.json`
2. Confirm that memory usage is growing under load, and that memory is not reclaimed by the GC.
  - Use `top` to monitor memory usage
    - `top -pid $(pgrep -lfa node | grep server.js | awk '{print $1}')`
  - Ensure that memory is not being reclaimed by forcing a collection
    - Run node with `--expose-gc` and `--trace-gc`
    - Add a `SIGUSR2` handler that will run `gc()`
    - Then force a collection with:

      `pgrep -laf node | grep server | awk '{ print $1}' | xargs kill -USR2`
3. Use `heapdump` to analyse memory growth.
  - Restart the process and take a snapshot
  - Run a load-test, take another snapshot
  - Load the snapshots into Chrome Dev Tools and compare them
4. Fix the problem. :wrench::smiley_cat:

## License

```
The MIT License (MIT)
Copyright (c) 2015 Hassy Veldstra <h@veldstra.org>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
