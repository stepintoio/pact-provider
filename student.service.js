class StudentService {
  constructor (repository) {
    this.repository = repository
    this.setHeaders = this.setHeaders.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.getStudent = this.getStudent.bind(this);
  }

  setHeaders (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  }

  addStudent (req, res) {
    res.end('ok');
  }

  getStudents (req, res) {
    res.json(this.repository.students);
  }

  getStudent (req, res) {
    const student = this.repository.students.find(student => student.id === req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404);
      res.end('not found');
    }
  }
}

module.exports = StudentService