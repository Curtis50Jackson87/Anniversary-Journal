function saveEntry() {
  const text = document.getElementById("entry").value;
  const editIndex = document.getElementById("entry").dataset.editIndex;

  if (!text.trim()) return;

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

  if (editIndex !== undefined && editIndex !== "") {
    entries[editIndex].text = text;
    entries[editIndex].date = new Date().toLocaleString();
    document.getElementById("entry").dataset.editIndex = "";
  } else {
    entries.push({ text: text, date: new Date().toLocaleString() });
  }

  localStorage.setItem("journalEntries", JSON.stringify(entries));
  document.getElementById("entry").value = "";
  displayEntries();
}

function displayEntries() {
  const sortOrder = document.getElementById("sortOrder")?.value || "newest";
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  const entriesList = document.getElementById("entries");
  entriesList.innerHTML = "";

  const sortedEntries = [...entries];
  if (sortOrder === "newest") {
    sortedEntries.reverse();
  }

  sortedEntries.forEach((entry, i) => {
    const actualIndex = sortOrder === "newest" ? entries.length - 1 - i : i;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${entry.date}</strong><br>${entry.text}
      <div class="buttons">
        <button onclick="editEntry(${actualIndex})">Edit</button>
        <button onclick="deleteEntry(${actualIndex})">Delete</button>
      </div>
    `;
    entriesList.appendChild(li);
  });
}


function deleteEntry(index) {
  const confirmDelete = confirm("Are you sure you want to delete this entry?");
  if (!confirmDelete) return;

  let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  entries.splice(index, 1);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  displayEntries();
}


function editEntry(index) {
  const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
  document.getElementById("entry").value = entries[index].text;
  document.getElementById("entry").dataset.editIndex = index;
}

window.onload = displayEntries;
s;
