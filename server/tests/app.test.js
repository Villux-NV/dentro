const request = require('supertest');
const app = require('./app');


test('should create a new user and return a new member', async () => {
  await request(app).post('/create/10')
    .send({
      firstName: 'John',
      lastName: 'Connor',
      birthday: '1986-02-28',
      familyNameId: null,
    })
    .expect(200)
    .then((res) => {
      const data = JSON.parse(res.text);
      expect({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        FamilyId: data.FamilyId,
      }).toStrictEqual({
        id: 1,
        firstName: 'John',
        lastName: 'Connor',
        birthday: '1986-02-28',
        FamilyId: 1,
      });
    });
});

test('should create a new parent for the member', async () => {
  await request(app).post('/create/parent/1/10')
    .send({
      firstName: 'Kyle',
      lastName: 'Reese',
      birthday: '2003-04-03',
      familyNameId: 1,
    })
    .expect(200)
    .then((res) => {
      const data = JSON.parse(res.text);
      expect({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        FamilyId: data.FamilyId,
      }).toStrictEqual({
        id: 2,
        firstName: 'Kyle',
        lastName: 'Reese',
        birthday: '2003-04-03',
        FamilyId: 1,
      });
    });
});

test('should create a new child for the member', async () => {
  await request(app).post('/create/child/1/10')
    .send({
      firstName: 'Arnie',
      lastName: 'Connor',
      birthday: '2021-09-25',
      familyNameId: 1,
    })
    .expect(200)
    .then((res) => {
      const data = JSON.parse(res.text);
      expect({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        birthday: data.birthday,
        FamilyId: data.FamilyId,
      }).toStrictEqual({
        id: 3,
        firstName: 'Arnie',
        lastName: 'Connor',
        birthday: '2021-09-25',
        FamilyId: 1,
      });
    });
});

test('should 400 error and false when no families exist for user', async () => {
  await request(app).get('/families/5')
    .expect(400)
    .then((res) => {
      const data = JSON.parse(res.text);
      expect(data).toBe(false);
    });
});

test('should retrieve family by userId', async () => {
  await request(app).get('/families/10')
    .expect(200)
    .then((res) => {
      const [data] = JSON.parse(res.text);
      console.log('family data: ', data);
      expect({
        id: data.id,
        familyName: data.familyName,
      }).toStrictEqual({
        id: 1,
        familyName: 'Connor',
      });
    });
});

test('should retrieve family member tree by familyId', async () => {
  await request(app).get('/membertree/1')
    .expect(200)
    .then((res) => {
      const data = JSON.parse(res.text);
      console.log(data)
      expect(data.id).toBe(2);
      expect(data.Children[0].firstName).toBe('John');
  });
});

test('should return member information by memberId', async () => {
  await request(app).get('/members/2')
    .expect(200)
    .then((res) => {
      const data = JSON.parse(res.text);
      console.log(data)
      expect(data.id).toBe(2);
      expect(data.Children[0].firstName).toBe('John');
  });
});

test('should edit member information', async () => {
  await request(app).put('/edit/3')
    .send({
      firstName: 'Alex',
      lastName: 'Rousseau',
      birthday: '1993-06-30',
    })
    .expect(200)
    .then((res) => {
      const data = JSON.parse(res.text);
      expect(data.firstName).toBe('Alex');
  });
});

test('should delete member information', async () => {
  await request(app).delete('/delete/3')
    .expect(200);

  await request(app).get('/members/3')
    .expect(200)
    .then((res) =>{
      const data = JSON.parse(res.text);
      expect(data.error).toBe('DB Connection: Get Member by Id')
    });
});