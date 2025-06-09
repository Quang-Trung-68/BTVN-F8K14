const baseUrl = "https://api-todolist-multiuser.onrender.com/Trung/todos";

const getAllMethod = async () => {
  try {
    const response = await fetch(`${baseUrl}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const postMethod = async (body) => {
  try {
    try {
      const response = await fetch(`${baseUrl}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (error) {
      console.log(error);
    }
  } catch (error) {}
};

const putMethod = async (id, body) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const deleteMethod = async (id) =>{
try {
    const response = await fetch(`${baseUrl}/${id}`,{
        method:"delete"
    })

    return await response.json();
} catch (error) {
    console.log(error);
}
}

export { getAllMethod, postMethod,putMethod, deleteMethod };
