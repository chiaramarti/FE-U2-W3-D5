const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYzA5ODRjNTllYzAwMTk5MGQ4NzgiLCJpYXQiOjE3MDkyOTM3MjAsImV4cCI6MTcxMDUwMzMyMH0.n7llZcSbLKkHGBmBrr5pRt7dwq8HfGQsDfX2uSO6d6Y";

const fillProductDetails = function (product) {
  document.getElementById("title_prodotto").textContent = product.name;
  document.getElementById("brand").textContent = product.brand;
  document.getElementById("description").textContent = product.description;
  document.getElementById("price").textContent = `${product.price} €`;

  const mainImage = document.getElementById("immagine");
  mainImage.src = product.imageUrl !== "N/A" ? product.imageUrl : "https://via.placeholder.com/300x450";
  mainImage.alt = product.name;
};

const fetchProductDetails = function () {
  let productId = new URLSearchParams(window.location.search).get("productId");
  fetch(URL + productId, {
    headers: {
      authorization: APIkey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error retrieving product details");
      }
    })
    .then((product) => {
      fillProductDetails(product);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

window.onload = function () {
  fetchProductDetails();
};
