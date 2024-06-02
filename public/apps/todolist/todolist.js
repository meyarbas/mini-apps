const newTodoInput = document.getElementById("newTodo");
const addTodoButton = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

addTodoButton.addEventListener("click", () => {
	const newTodoText = newTodoInput.value.trim();
	if (newTodoText !== "") {
		addTodo(newTodoText);
		newTodoInput.value = "";
	}
});

function addTodo(text) {
	const li = document.createElement("li");
	li.classList.add("list-group-item");
	li.innerHTML = `
    <div class="todoText mb-2">${text}</div>
    <div>
    <button class="completeButton btn btn-success btn-sm">Complete</button>
    <button class="deleteButton btn btn-danger btn-sm">Delete</button>
    </div>
  `;
	todoList.appendChild(li);

	const completeButton = li.querySelector(".completeButton");
	completeButton.addEventListener("click", () => {
		li.classList.toggle("completed");
    li.classList.toggle("list-group-item-success");

		if (completeButton.classList.contains("btn-success")) {
			completeButton.classList.remove("btn-success");
			completeButton.classList.add("btn-secondary");
			completeButton.innerText = "Completed";
		} else {
			completeButton.classList.remove("btn-secondary");
			completeButton.classList.add("btn-success");
			completeButton.innerText = "Complete";
		}
	});

	const deleteButton = li.querySelector(".deleteButton");
	deleteButton.addEventListener("click", () => {
		todoList.removeChild(li);
	});
}