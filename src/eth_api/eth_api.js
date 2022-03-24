import { useState } from 'react';

var Eth = require('web3-eth');

// "Eth.providers.givenProvider" will be set if in an Ethereum supported browser.
var eth = new Eth(Eth.givenProvider || 'ws://some.local-or-remote.node:8546');

const ethApi = {
  getNftsCount: function () {
    console.log(useState.account)
  }
}

export default ethApi;