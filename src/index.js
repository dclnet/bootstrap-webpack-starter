// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

import $ from 'jquery';
import './scss/index.scss';

import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/modal';

class MyTest {
  constructor() {
    console.log('MyTest class init.');
  }
}

new MyTest();

const test1 = () => {
  const name = 'bootstrap';
  console.log(`hi ${name}`);
}

test1();
