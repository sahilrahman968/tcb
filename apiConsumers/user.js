export async function searchUsers({ email, name, phone }, is_server) {
  let baseUrl = ""
  if (is_server) {
    baseUrl = `${process.env.BASE_URL}/api/user/getUser`;

  }
  else {
    baseUrl = `/api/user/getUser`;

  }

  try {
    let response = await fetch(`${baseUrl}?email=${email}`)
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return { error: error.message };
  }
}


export async function addUser({ email, name, image }) {
  try {
    let response = await fetch(`${process.env.BASE_URL}/api/user/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        image
      })
    })
    response = await response.json();
    return response
  }
  catch (err) {

  }
}
