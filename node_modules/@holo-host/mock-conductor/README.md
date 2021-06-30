[![](https://img.shields.io/npm/v/@holo-host/mock-conductor/latest?style=flat-square)](http://npmjs.com/package/@holo-host/mock-conductor)
[![](https://img.shields.io/github/workflow/status/holo-host/mock-conductor/Node.js%20CI/master?style=flat-square&label=master)](https://github.com/holo-host/mock-conductor)

# Mock Holochain Conductor

Javascript library for mocking the [Holochain](https://github.com/holochain/holochain) conductor.

This works with [holochain-conductor-api version 0.0.1](https://github.com/holochain/holochain-conductor-api/releases/tag/v0.0.1)

[![](https://img.shields.io/github/issues-raw/holo-host/mock-conductor?style=flat-square)](https://github.com/holo-host/mock-conductor/issues)
[![](https://img.shields.io/github/issues-closed-raw/holo-host/mock-conductor?style=flat-square)](https://github.com/holo-host/mock-conductor/issues?q=is%3Aissue+is%3Aclosed)
[![](https://img.shields.io/github/issues-pr-raw/holo-host/mock-conductor?style=flat-square)](https://github.com/holo-host/mock-conductor/pulls)

## Overview
This module is primarily for testing code that calls the holochain conductor through the holochain conductor API. It operates by running a websocket server which can be controlled to provide properly (msgpack) encoded messages to requests from one of the `AppWebsocket` or `AdminWebsocket` classes from `@holochain/conductor-api`.

### Installation

`npm install @holo-host/mock-conductor --save-dev`

or

`yarn add @holo-host/mock-conductor --dev`

### Basic Usage
`.next` will add a response to the end of the generic response queue. While there are responses in the generic response queue, each call will return the next response in the queue.

```javascript
const MockConductor = require('@holo-host/mock-conductor')
const { AdminWebsocket } = require('@holochain/conductor-api')
const PORT = 8888

// inside a test framework
(async () => {
  const mockConductor = new MockConductor(PORT)
  const expectedResponse = {
    field1: 'value1',
    field2: 'value2'    
  }
  mockConductor.next(expectedResponse)
  
  const adminWebsocket = await AppWebsocket.connect(`ws://localhost:${PORT}`)
  const response = await adminWebsocket.installApp({})
  expect(response).toEqual(expectedResponse)
})()

```

### Creating responses for specific calls
`.once` adds a response to a specific queue, specified by the call type and call data. You will only get this response if you make a call with the same arguments **and** the generic queue (see above) is empty.

```javascript
const MockConductor = require('@holo-host/mock-conductor')
const { INSTALL_APP_TYPE } = MockConductor
const { AdminWebsocket } = require('@holochain/conductor-api')
const PORT = 8888

// inside a test framework
(async () => {
  const mockConductor = new MockConductor(PORT)
  const expectedResponse = {
    field1: 'value1',
    field2: 'value2'    
  }
  
  const installAppData = {
    agent_key: 'someagentkey',
    app_id: 'someappid'
  }
  
  mockConductor.once(INSTALL_APP_TYPE, installAppData, expectedResponse)
  
  const adminWebsocket = await AppWebsocket.connect(`ws://localhost:${PORT}`)
  const response = await adminWebsocket.installApp(installAppData)
  expect(response).toEqual(expectedResponse)
})()

```

### Creating a constant response for all calls
`.any` adds a response that will be returned by all future calls that are not otherwise matched.

```javascript
const MockConductor = require('@holo-host/mock-conductor')
const { INSTALL_APP_TYPE } = MockConductor
const { AdminWebsocket } = require('@holochain/conductor-api')
const PORT = 8888

// inside a test framework
(async () => {
  const mockConductor = new MockConductor(PORT)
  const expectedResponse = {
    field1: 'value1',
    field2: 'value2'    
  }
  
  const installAppData = {
    agent_key: 'someagentkey',
    app_id: 'someappid'
  }
  
  mockConductor.any(expectedResponse)
  
  const adminWebsocket = await AppWebsocket.connect(`ws://localhost:${PORT}`)
  const response = await adminWebsocket.installApp(installAppData)
  expect(response).toEqual(expectedResponse)
})()

```

### Calling a closure to dynamically generate a response
`.any`, `.next` and `.once` can all take a closure as their `response` param instead of a static value. This closure is passed the type and data from the request.

```javascript
const MockConductor = require('@holo-host/mock-conductor')
const { INSTALL_APP_TYPE } = MockConductor
const { AdminWebsocket } = require('@holochain/conductor-api')
const PORT = 8888

// inside a test framework
(async () => {
  const mockConductor = new MockConductor(PORT)

  const responseClosure = ({ type, data }) => ({ 
    app_id: data.app_id + '-modified',
    type
  })

  const installAppData = {
    agent_key: 'someagentkey',
    app_id: 'someappid'
  }


  const expectedResponse = {
    app_id: installAppData.app_id + '-modified'
    type: 'install_app'
  }
    
  mockConductor.once(INSTALL_APP_TYPE, installAppData, responseClosure)
  
  const adminWebsocket = await AppWebsocket.connect(`ws://localhost:${PORT}`)
  const response = await adminWebsocket.installApp(installAppData)
  expect(response).toEqual(expectedResponse)
})()

```

## API

### new MockConductor(adminPort, ...appPorts)
Returns a MockConductor instance listening on the provided ports. Pass null if you don't need the port.

### .once(type, data, response, opts)
Adds a response to the response queue corresponding with `type` and `data`. The front response in this queue is returned for any call with the same `type` and `data`. Note, for the purpose of matching, the `payload` and `provenance` fields are stripped out of `data`, so if you want to have different responses depending on those fields you will have to provide a custom closure (see below)

If `opts.returnError` is `true`, then it will return an error response instead of success.

### .next(response, opts)
Adds a response to the next queue. This front response in this queue will be returned the next time any call is made.

If `opts.returnError` is `true`, then it will return an error response instead of success.
### .any(response, opts)
Adds a catchall constant response. This response will be returned any time a call is made that does not already have a response in the response queue.

If `opts.returnError` is `true`, then it will return an error response instead of success.
### .clearResponses()
Clears all queues and the `all` response. 

### .close()
Closes all running websocket servers

### Custom closures: ({ type, data }) => {}
`.all`, `.next` and `.once` can all take a closure as their `response` param instead of a static value. This closure is passed the type and data from the request. Payload and provenance are not stripped out of the `data` field here.

### Type constants
The module also exports the following constants, which correspond to specific functions of AppWebsocket and AdminWebsocket.
```
const {
  APP_INFO_TYPE, ZOME_CALL_TYPE, ACTIVATE_APP_TYPE, ATTACH_APP_INTERFACE_TYPE, DEACTIVATE_APP_TYPE, DUMP_TYPE, 
  GENERATE_AGENT_PUB_KEY_TYPE, INSTALL_APP_TYPE, LIST_DNAS_TYPE, LIST_CELL_IDS_TYPE, LIST_ACTIVE_APPS_TYPE, LIST_APP_INTERFACES_TYPE,
  REQUEST_AGENT_INFO_TYPE, ADD_AGENT_INFO_TYPE, REGISTER_DNA_TYPE, INSTALL_APP_BUNDLE_TYPE, CREATE_CLONE_CELL_TYPE, NEXT_TYPE
} = require('@holo-host/mock-conductor')
```
