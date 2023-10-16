
  const form = document.getElementById('upload-form');
  const result = document.getElementById('result');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (data.imageUrl) {
      result.innerHTML = `Image URL: <a href="${data.imageUrl}" target="_blank">${data.imageUrl}</a>`;
    } else {
      result.innerHTML = 'Image upload failed.';
    }
  });

