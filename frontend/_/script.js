async function handleSubmit({ url, method, form, onSuccess, onFailure }) {
    // setting the variables
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    const [data, inputs] = [{}, form.querySelectorAll("input")];

    // setting token if present
    if (token) headers['Authorization'] = "Bearer " + token;

    // extracting the form inputs data and setting it to data object 
    inputs.forEach((input) => (data[input.name] = input.value));

    try {
        let res = await fetch(url, { method, headers, body: JSON.stringify(data), });
        res = await res.json();

        console.log(res);
        if (res.message) alert(res.message);

        if (res.ok)
            onSuccess?.(res);
        else
            onFailure?.(res);
    } catch (error) {
        console.error("Fetch error", JSON.stringify(error));
        onFailure?.(error);
    }
}

async function handleAPI({ url, method = 'GET', onSuccess, onFailure }) {
    // Retrieve token if present
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };

    // Set authorization header if token is available
    if (token) headers['Authorization'] = "Bearer " + token;

    try {
        // Fetch data from API
        let res = await fetch(url, { method, headers });
        const data = await res.json();

        // Check if the response is successful
        if (res.ok) {
            onSuccess?.(data);
        } else {
            // Pass the response error message to onFailure
            console.warn("API Error:", data.message || "An error occurred");
            onFailure?.(data);
        }
    } catch (error) {
        console.error("Fetch error", error);
        onFailure?.(error);
    }
}

function createTaskItem(task) {
    const taskItem = document.createElement("div");
    taskItem.className = "task-item";

    taskItem.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description || "No description provided"}</p>
      </div>
      <!-- <button data-id="${task.id}">Delete</button> -->
    `;

    return taskItem;
}
