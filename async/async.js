/** async/await example */
/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function */

function resolveAfter2Seconds() {
    console.log("starting slow promise")
    return new Promise(resolve => {
      setTimeout(function() {
        resolve("slow")
        console.log("slow promise is done")
      }, 2000)
    })
  }
  
  function resolveAfter1Second() {
    console.log("starting fast promise")
    return new Promise(resolve => {
      setTimeout(function() {
        resolve("fast")
        console.log("fast promise is done")
      }, 1000)
    })
  }
  
  async function sequentialStart() {
    console.log('==SEQUENTIAL START==')
  
    // 1. Execution gets here almost instantly
    const slow = await resolveAfter2Seconds()
    console.log(slow) // 2. this runs 2 seconds after 1.
  
    const fast = await resolveAfter1Second()
    console.log(fast) // 3. this runs 3 seconds after 1.
  }
  
  async function concurrentStart() {
    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds() // starts timer immediately
    const fast = resolveAfter1Second() // starts timer immediately
  
    // 1. Execution gets here almost instantly
    console.log(await slow) // 2. this runs 2 seconds after 1.
    console.log(await fast) // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
  }
  
  function concurrentPromise() {
    console.log('==CONCURRENT START with Promise.all==')
    return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then((messages) => {
      console.log(messages[0]) // slow
      console.log(messages[1]) // fast
    })
  }
  
  async function parallel() {
    console.log('==PARALLEL with await Promise.all==')
  
    // Start 2 "jobs" in parallel and wait for both of them to complete
    await Promise.all([
        (async()=>console.log(await resolveAfter2Seconds()))(),
        (async()=>console.log(await resolveAfter1Second()))()
    ])
  }
  
  sequentialStart() // after 2 seconds, logs "slow", then after 1 more second, "fast"
  
  // wait above to finish
  setTimeout(concurrentStart, 4000) // after 2 seconds, logs "slow" and then "fast"
  
  // wait again
  setTimeout(concurrentPromise, 7000) // same as concurrentStart
  
  // wait again
  setTimeout(parallel, 10000) // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"
  
/*
  await and parallelism
  ---------------------
In sequentialStart, execution suspends 2 seconds for the first await, and then another second for the second await. 
The second timer is not created until the first has already fired, so the code finishes after 3 seconds.

In concurrentStart, both timers are created and then awaited. 
The timers run concurrently, which means the code finishes in 2 rather than 3 seconds, i.e. the slowest timer. 
However, the await calls still run in series, which means the second await will wait for the first one to finish. 
In this case, the result of the fastest timer is processed after the slowest.

If you wish to safely perform two or more jobs in parallel, you must await a call to Promise.all, or Promise.allSettled.

Warning: The functions concurrentStart and concurrentPromise are not functionally equivalent.

In concurrentStart, if promise fast rejects before promise slow is fulfilled, 
then an unhandled promise rejection error will be raised, regardless of whether the caller has configured a catch clause.

In concurrentPromise, Promise.all wires up the promise chain in one go, 
meaning that the operation will fail-fast regardless of the order of rejection of the promises, 
and the error will always occur within the configured promise chain, enabling it to be caught in the normal way.
*/