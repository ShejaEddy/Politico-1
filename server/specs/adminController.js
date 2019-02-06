import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import seed from '../models/seed';


chai.should();
chai.use(chaiHttp);
seed();


describe('POST /parties', () => {
  it('it should post a new political party', ((done) => {
    const newParty = {
      name: 'Lion Action People (LAP)',
      hqAddress: '10, Allison Street, Jos',
      logoUrl: 'https://politico.com/lap_logo'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return status code of 400 and an error message', ((done) => {
    const newParty = {
      party_id: 4,
      name: 'Faithful People (FP)'
    };
    chai.request(app)
      .post('/api/v1/parties')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('GET /parties', () => {
  it('it should get all political parties', ((done) => {
    chai.request(app)
      .get('/api/v1/parties')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});

describe('GET /parties/<party-id>', () => {
  it('it should get a specific political party', ((done) => {
    chai.request(app)
      .get('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});

describe('PATCH /parties/<party-id>/name', () => {
  it('it should edit a specific political party', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)',
      hqAddress: '10, Anthony Street, Delta',
      logoUrl: 'http://www.politico.com/nap'
    };
    chai.request(app)
      .patch('/api/v1/parties/1/name')
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    const editParty = {
      name: 'National Action People (NAP)'
    };
    chai.request(app)
      .patch('/api/v1/parties/100/name')
      .send(editParty)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('DELETE /parties/<party-id>', () => {
  it('it should delete a specific political party', ((done) => {
    chai.request(app)
      .delete('/api/v1/parties/1')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        done(err);
      });
  }));
});

describe('POST /offices', () => {
  it('it should post a new political office', ((done) => {
    const newOffice = {
      type: 'Federal',
      name: 'President',
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
  it('it should return status code of 400 and an error message', ((done) => {
    const newOffice = {
      office_id: 4,
      name: 'Faithful People (FP)'
    };
    chai.request(app)
      .post('/api/v1/offices')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(400);
        done(err);
      });
  }));
});

describe('GET /offices', () => {
  it('it should get all political offices', ((done) => {
    chai.request(app)
      .get('/api/v1/offices')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));
});

describe('GET /offices/<office-id>', () => {
  it('it should get a specific political office', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/1')
      .end((err, res) => {
        res.should.have.status(403);
        done(err);
      });
  }));

  it('it should return error 404', ((done) => {
    chai.request(app)
      .get('/api/v1/offices/100')
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('error');
        done(err);
      });
  }));
});
