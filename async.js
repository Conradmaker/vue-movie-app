// function a() {
//   console.log("a");
// }
// function b() {
//   console.log("b");
// }

// a();  a
// b();  b

// ------------------------

// function a() {
//   setTimeout(() => {
//     console.log("a");
//   }, 3000);
// }
// function b() {
//   console.log("b");
// }

// a();
// b();
//  b ->3초 -> a

//----------------------------

// function a(cb) {
//   setTimeout(() => {
//     console.log("a");
//     cb();
//   }, 3000);
// }
// function b() {
//   console.log("b");
// }
// a(function() {
//   b();
// });

// 3초-> a,b

//----------------------------

// function a(cb) {
//   setTimeout(() => {
//     console.log("a");
//     cb();
//   }, 3000);
// }
// function b(cb) {
//   setTimeout(() => {
//     console.log("b");
//     cb();
//   }, 3000);
// }
// function c(cb) {
//   setTimeout(() => {
//     console.log("c");
//     cb();
//   }, 3000);
// }
// function d(cb) {
//   setTimeout(() => {
//     console.log("d");
//     cb();
//   }, 3000);
// }
// a(function() {
//   b(function() {
//     c(function() {
//       d();
//     });
//   });
// });
// a,b,c,d 콜백지옥

//------Promise------

function a() {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("a");
      res();
    }, 1000);
  });
}
function b() {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("b");
      res();
    }, 1000);
  });
}
function c() {
  return new Promise((res) => {
    setTimeout(() => {
      console.log("c");
      res();
    }, 1000);
  });
}
a()
  .then(() => b())
  .then(() => c());

//================================
async function d() {
  await a();
  await b();
  await c();
}
d();

//=======reject=========
function a1() {
  return new Promise((resolve, reject) => {
    if (isError) {
      reject(Error);
    }
    setTimeout(() => {
      console.log(a);
      resolve("done");
    });
  });
}

a1()
  .then((res) => {
    console.log(res); //resolve()안에 들어온 매게변수
  })
  .catch((error) => {
    console.log(error);
    alert(error);
  })
  .finally(() => {
    console.log("위 로직이 완료되면 무조건적으로 이부분 실행");
  });

async function asyncFunc() {
  try {
    const res = await a();
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    console.log("done!");
  }
}
asyncFunc();
