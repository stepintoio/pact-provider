const { Verifier } = require('@pact-foundation/pact');
const path = require('path');
const express = require('express');
const { serverClose, repository } = require('../provider');

const setupApp = express();
setupApp.use(require('body-parser').json());

const sampleStudent = {
  id: '1234',
  firstName: 'First',
  lastName: 'Last'
};

setupApp.post('/setup', (req, res) => {
  repository.clear();
  switch (req.body.state) {
    case 'is listening':
      // do nothing
      break;
    case 'has one or more students in the DB':
      // fallthrough
    case 'has a student with ID 1234':
      repository.addStudent(sampleStudent);
      break;
    case 'does not have student with ID 1234':
      console.log(JSON.stringify(repository.students));
    default:
      // do nothing
  }
  res.end();
});

describe('StudentService verification', () => {
  let setupServer;

  before(done => {
    setupServer = setupApp.listen(7003, done);
  });

  it('should return the expected response', () => {
    const opts = {
      provider: 'Student Service',
      providerBaseUrl: 'http://localhost:7002',
      providerStatesSetupUrl: 'http://localhost:7003/setup',
      pactUrls: [ path.resolve(process.cwd(), '..', 'pact-consumer', 'pacts', 'app-studentservice.json') ],
      providerVersion: '1.0.0'
    }

    return new Verifier().verifyProvider(opts)
      .then(output => {
        console.log('Pact Verification Complete!');
        console.log(output);
      })
  });

  after(() => {
    setupServer.close();
    serverClose();
  });
});