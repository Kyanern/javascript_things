/** https://www.loginradius.com/blog/async/callback-vs-promises-vs-async-await/ */

const myFirstPromise = new Promise((resolve, reject) => { 
    const condition = true;   
    if(condition) {
         setTimeout(function(){
             resolve("Promise is resolved!"); // fulfilled
        }, 300);
    } else {    
        reject('Promise is rejected!');  
    }
});

// const demoPromise= function() {
//     myFirstPromise
//     .then((successMsg) => {
//         console.log("Success:" + successMsg);
//     })
//     .catch((errorMsg) => { 
//         console.log("Error:" + errorMsg);
//     })
//   }

// demoPromise();

const helloPromise  = function() {
return new Promise(function(resolve, reject) {
    const message = `Hi, How are you!`;

    resolve(message)
});
}

const demoPromise= function() {

    myFirstPromise
        .then(helloPromise)
        .then((successMsg) => {
            console.log("Success:" + successMsg);
        })
        .catch((errorMsg) => { 
            console.log("Error:" + errorMsg);
        })
    }

demoPromise();