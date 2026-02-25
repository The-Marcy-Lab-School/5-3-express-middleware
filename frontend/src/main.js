// Elements
const helloForm = document.querySelector('#hello-form')
const helloResponseEl = document.querySelector('#hello-response');
const fetchDatabutton = document.querySelector('#fetch-data-btn');
const gifsList = document.querySelector('#gifs-list');

/////////////////////////////////////////////////
// Form Submission --> GET /api/hello --> Render
/////////////////////////////////////////////////

helloForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nameInput = helloForm.elements.name.value;
  helloResponseEl.innerHTML = "Loading...";

  try {
    // A relative path fetches from the same host (we don't need http://localhost)
    const response = await fetch(`/api/hello?name=${nameInput}`);
    if (!response.ok) {
      throw Error(`Fetch hello response failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // Render the message
    helloResponseEl.textContent = data.message;
  }
  catch (error) {
    console.error(error);
    helloResponseEl.textContent = error.message;
  }

  helloForm.reset();
})

/////////////////////////////////////////////
// Button Click --> GET /api/data --> Render
/////////////////////////////////////////////

fetchDatabutton.addEventListener('click', async () => {
  try {
    gifsList.innerHTML = 'Loading...';

    // A relative path fetches from the same host (we don't need http://localhost)
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw Error(`Fetching gif data failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // Render the gifs in a list
    gifsList.innerHTML = '';
    data.data.forEach((gif) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = gif.images.original.url;
      li.append(img);
      gifsList.append(li);
    });
  }
  catch (error) {
    console.error(error);
    gifsList.innerHTML = error.message;
  }
})