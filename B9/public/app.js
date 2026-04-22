function loadStudents() {
  fetch("/students")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("studentList");
      tbody.innerHTML = "";
      data.forEach(s => {
        tbody.innerHTML += `
          <tr>
            <td>${s.id}</td>
            <td>${s.name}<br>${s.email}</td>
            <td>${s.status}</td>
            <td class="action">
              <button onclick="editStudent(${s.id})">✏️</button>
              <button onclick="deleteStudent(${s.id})">🗑️</button>
            </td>
          </tr>
        `;
      });
    });
}

function saveStudent() {
  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  if (id) {
    fetch("/students/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }).then(loadStudents);
  } else {
    fetch("/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    }).then(loadStudents);
  }

  document.getElementById("studentId").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function editStudent(id) {
  fetch("/students/" + id)
    .then(res => res.json())
    .then(s => {
      document.getElementById("studentId").value = s.id;
      document.getElementById("name").value = s.name;
      document.getElementById("email").value = s.email;
    });
}

function deleteStudent(id) {
  if (!confirm("Bạn có chắc muốn xóa?")) return;
  fetch("/students/" + id, { method: "DELETE" })
    .then(loadStudents);
}

loadStudents();