const db = require("../models/db");

const createTask = (task) => {
  return new Promise((resolve, reject) => {
    const { course_id, title, description, deadline, status, priority } = task;

    db.run(
      "INSERT INTO tasks (course_id, title, description, deadline, status, priority) VALUES (?, ?, ?, ?, ?, ?)",
      [course_id, title, description, deadline, status, priority],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, course_id, title, description, deadline, status, priority });
      }
    );
  });
};

const getTasks = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const updateTask = (id, task) => {
  return new Promise((resolve, reject) => {
    const { course_id, title, description, deadline, status, priority } = task;

    db.run(
      "UPDATE tasks SET course_id = ?, title = ?, description = ?, deadline = ?, status = ?, priority = ? WHERE id = ?",
      [course_id, title, description, deadline, status, priority, id],
      function (err) {
        if (err) reject(err);
        else resolve({ id, course_id, title, description, deadline, status, priority });
      }
    );
  });
};

const deleteTask = (id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
      if (err) reject(err);
      else resolve({ message: "Task deleted successfully" });
    });
  });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};