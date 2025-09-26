const API = "http://localhost:5000";

async function createEmp(e) {
    e.preventDefault();
    const form = document.getElementById("employeeForm");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;
    const joining_date = document.getElementById("joining_date").value;
    const salary = document.getElementById("salary").value;

    const res = await fetch(`${API}/employee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, department, joining_date, salary })
    });

    const data = await res.json();

    if (res.ok) {
        document.getElementById("addMessage").innerText =
            `✅ Employee added`;
        form.reset();
        fetchEmployees();
    } else {
        document.getElementById("addMessage").innerText = `❌ ${data.error}`;
    }
}

async function deleteEmp(e) {
    e.preventDefault();
    const form = document.getElementById("deleteForm");
    const id = document.getElementById("employeeId").value;

    const res = await fetch(`${API}/employee/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
        document.getElementById("deleteMessage").innerText =
            `✅ Employee ID ${id} deleted`;
        form.reset();
        fetchEmployees();
    } else {
        document.getElementById("deleteMessage").innerText = `❌ ${data.error}`;
    }
}

async function fetchEmployees() {
    try {
        const res = await fetch(`${API}/employees`);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);

        const employees = await res.json();
        console.log("Fetched employees:", employees);

        const tbody = document.querySelector("#employeeTable tbody");
        tbody.innerHTML = "";

        employees.forEach(emp => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${emp.ID}</td>
                <td>${emp.Name}</td>
                <td>${emp.Email || ""}</td>
                <td>${emp.Department || ""}</td>
                <td>${emp.Joining_date ? new Date(emp.Joining_date).toLocaleDateString() : ""}</td>
                <td>${emp.Salary || ""}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Error fetching employees:", err);
        document.querySelector("#employeeTable tbody").innerHTML =
            `<tr><td colspan="6">❌ Could not load employees</td></tr>`;
    }
}

window.onload = fetchEmployees;
document.getElementById("refreshBtn").addEventListener("click", fetchEmployees);