class Repository {
  constructor () {
    this.students = [];
  }

  addStudent (newStudent) {
    const index = this.students.findIndex(student => student.id === newStudent.id);
    if (index > -1) {
      this.students[index] = newStudent
    } else {
      this.students.push(newStudent);
    }
  }

  removeStudent (oldStudent) {
    const index = this.students.findIndex(student => student.id === oldStudent.id);
    if (index > -1) {
      this.students.splice(index, 1);
    }
  }

  clear () {
    this.students = [];
  }
}

module.exports = Repository;