# `cucumber-socket`

In a Cucumber/Gherkin test, `cucumber-socket` gives you the ability to wait for Socket.io events to be received before moving on to the next step.

## Installation

[![NPM](https://nodei.co/npm/cucumber-socket.png?compact=true)](https://nodei.co/npm/cucumber-socket/)

`cucumber-socket` is published at [npmjs.com](https://www.npmjs.com/), and can be installed using [`npm`](https://docs.npmjs.com/cli/npm) or [`yarn`](https://yarnpkg.com/lang/en/).

```bash
$ npm install cucumber-socket  # npm
$ yarn add cucumber-socket     # yarn
```

```js
import CucumberSocket from 'cucumber-socket';       // ES6+
const CucumberSocket = require('cucumber-socket');  // ES5
```


## Usage

`cucumber-socket` provides a `CucumberSocket` class, which, when instantiated, returns a _manager_. The manager will keep track of all the sockets, events to listen to, and the callbacks to execute in response of these events.

Before Cucumber runs the tests, should should call the `register` method from the manager.

```js
Before(function () {
  this.manager = new CucumberSocket();
  this.socket = io('http://hostname/', { ...options });
  return this.manager.register(this.socket);
});
```

This will modify the `onevent` method of the socket to notify the manager whenever it receives a new event.

Then, inside your step definitions, use the `waitFor` method to halt execution of the next step until the specified event is received.

```js
When('description', function (callback) {
  this.socket.emit('login');
  this.manager.waitFor(this.socket, 'success', callback);
});
```

In the example above, the step after `description` would only run after the `success` event is received on the Socket.io client.
