const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const responseMessage = document.getElementById("responseMessage");

uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const file = fileInput.files[0];

  if (!file) {
    responseMessage.innerHTML = "<p>لطفاً فایلی را انتخاب کنید.</p>";
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      progressBar.style.width = percentComplete + "%";
      progressText.textContent = Math.round(percentComplete) + "%";
    }
  };

  xhr.onload = function () {
    const response = JSON.parse(xhr.responseText);
    if (xhr.status === 200) {
      responseMessage.innerHTML = `<p style="color: green;">${response.message}</p>`;
    } else {
      responseMessage.innerHTML = `<p style="color: red;">${response.message}</p>`;
    }
  };

  xhr.onerror = function () {
    responseMessage.innerHTML = `<p style="color: red;">خطایی پیش آمده است.</p>`;
  };

  xhr.send(formData);
});
