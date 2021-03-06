// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

const ethereumRpc = require('@parity/jsonrpc');

const { TEST_HTTP_URL, endpointTest } = require('./test/mockRpc');

const util = require('./util');
const Api = require('./api');

describe('api/Api', () => {
  describe('interface', () => {
    const api = new Api(new Api.Provider.Http(TEST_HTTP_URL, -1));
    const ignored = [
      'eth_subscribe', 'eth_unsubscribe',
      'parity_subscribe', 'parity_unsubscribe',
      'signer_subscribePending', 'signer_unsubscribePending'
    ];

    Object.keys(ethereumRpc).sort().forEach((endpoint) => {
      describe(endpoint, () => {
        Object.keys(ethereumRpc[endpoint]).sort()
          .filter(method => ignored.indexOf(method) !== -1)
          .forEach((method) => {
            endpointTest(api, endpoint, method);
          });
      });
    });
  });

  it('exposes util as static property', () => {
    expect(Api.util).to.equal(util);
  });
});
