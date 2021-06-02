// console.log("hello duniya");

const createdAlert = document.querySelector(".alert-created");
const requiredAlert = document.querySelector(".alert-required");
const backendAlert = document.querySelector(".alert-backend");

createdAlert.style.display = "none";
requiredAlert.style.display = "none";
backendAlert.style.display = "none";

document.querySelector(".create-user").addEventListener("click", (e) => {
  e.preventDefault();
  createdAlert.style.display = "none";
  requiredAlert.style.display = "none";
  backendAlert.style.display = "none";
  console.log("create user button clicked");
  // check if userId and userName Exists
  const userId = document.querySelector("#userId").value;
  const name = document.querySelector("#userName").value;
  const parentId = document.querySelector("#parentId").value;

  // console.log({ userId, name, parentId });

  if (!userId || !name) {
    console.log("adsfaf");
    requiredAlert.style.display = "block";
  } else {
    axios
      .post("/api/user", { userId, name, parentId })
      .then((result) => {
        // console.log(result);
        createdAlert.style.display = "block";
        document.querySelector("#userId").value = "";
        document.querySelector("#userName").value = "";
        document.querySelector("#parentId").value = "";
      })
      .catch((err) => {
        console.log(err.response.data.message);
        document.querySelector(".alert-backend-text").textContent =
          err.response.data.message;
        backendAlert.style.display = "block";
      });
  }
});
