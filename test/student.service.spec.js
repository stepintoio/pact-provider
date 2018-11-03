const chai = require('chai');
chai.should();
chai.use(require('sinon-chai'));
const sinon = require('sinon');
const sandbox = sinon.createSandbox();
const Repository = require('../respository');
const StudentService = require('../student.service');

describe('student service', () => {
  let repository;
  let service;
  let student;

  beforeEach(() => {
    repository = sandbox.stub(new Repository());
    service = new StudentService(repository);
    student = { id: '1234', lastName: 'Beauregard', firstName: 'Snuffy' };
  });

  describe('setHeaders', () => {
    it('should set headers on the response', () => {
      const res = { setHeader: sinon.spy() };
      const next = sinon.spy();
      service.setHeaders(null, res, next);
      res.setHeader.should.have.been.calledTwice;
      next.should.have.been.called;
    });
  });

  describe('addStudent', () => {
    it('should add a student to the repository', () => {
      const req = { body: student };
      const res = { end: sinon.spy() };
      service.addStudent(req, res);
      repository.addStudent.should.have.been.calledWith(student);
      res.end.should.have.been.called;
    });
  });

  describe('getStudents', () => {
    it('should respond with a list of all students', () => {
      const students = [ student ];
      repository.students = students;
      const res = { json: sinon.spy() };
      service.getStudents(null, res);
      res.json.should.have.been.calledWith(students);
    });
  });

  describe('getStudent', () => {
    let req;
    let res;

    beforeEach(() => {
      req = { params: { id: '1234' } }
      res = { json: sinon.spy(), status: sinon.spy(), end: sinon.spy() };
    });

    it('should respond with the requested student', () => {
      repository.students = [ student ];
      service.getStudent(req, res);
      res.json.should.have.been.calledWith(student);
    });

    it('should respond with an error if the student cannot be found', () => {
      service.getStudent(req, res);
      res.status.should.have.been.calledWith(404);
      res.end.should.have.been.calledWith('not found');
    });
  });
});