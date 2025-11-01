// v1/frontend/__test__/setup/testSetup.js

// Polyfill for react-router-dom (TextEncoder / TextDecoder)
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Extend Jest matchers (for DOM assertions)
import "@testing-library/jest-dom";


// beforeAll(() => {
//   console.log("Frontend test suite starting...");
// });
// afterAll(() => {
//   console.log("Frontend test suite finished.");
// });

