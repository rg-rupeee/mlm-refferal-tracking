const creditAlert = document.querySelector(".alert-credit");
const userAlert = document.querySelector(".alert-user1");
const parent1Alert = document.querySelector(".alert-parent1");
const parent2Alert = document.querySelector(".alert-parent2");
const parent3Alert = document.querySelector(".alert-parent3");

creditAlert.style.display = "none";
userAlert.style.display = "none";
parent1Alert.style.display = "none";
parent2Alert.style.display = "none";
parent3Alert.style.display = "none";

const id = document.querySelector("#input-userId").value;
console.log(id);

// axios
//   .get("/api/wallet")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

document.querySelector(".btn-add-credits").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("add credit button clicked");
  const credit = parseInt(document.querySelector("#input-credit-amt").value);
  if (credit) {
    console.log(credit);
    axios
      .patch(`/api/wallet/credit/${id}`, { credit })
      .then((result) => {
        console.log(result);
        document.querySelector(".alert-user1-text").innerHTML =
          result.data.creditDetails[0];
        creditAlert.style.display = "block";
        userAlert.style.display = "block";

        if (result.data.creditDetails[1]) {
          document.querySelector(".alert-parent1-text").innerHTML =
            result.data.creditDetails[1];
          parent1Alert.style.display = "block";
          if (result.data.creditDetails[2]) {
            document.querySelector(".alert-parent2-text").innerHTML =
              result.data.creditDetails[2];
            parent2Alert.style.display = "block";
            if (result.data.creditDetails[3]) {
              document.querySelector(".alert-parent3-text").innerHTML =
                result.data.creditDetails[3];
              parent3Alert.style.display = "block";
            }
          }
        }
        document.querySelector("#input-credit-amt").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
