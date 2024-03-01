const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYzA5ODRjNTllYzAwMTk5MGQ4NzgiLCJpYXQiOjE3MDkyOTM3MjAsImV4cCI6MTcxMDUwMzMyMH0.n7llZcSbLKkHGBmBrr5pRt7dwq8HfGQsDfX2uSO6d6Y";

fetch(URL, {
  headers: {
    authorization: APIkey,
  },
})
  .then((response) => response.json())
  .then((products) => {
    // ho già acceduto all'array ora lo devo scorrere riassegnando al contempo delle variabili
    products.forEach((product) =>
      document.getElementById("products-container").insertAdjacentHTML(
        "afterbegin",
        `
                <!--card1-->
                <div class="card1 card col-lg-4 p-3 col-sm-6 mix women">
                  <div class="product-item">
                    <div class="product-item-pic set-bg product-container">
                      <img src="${
                        product.imageUrl !== "N/A" ? product.imageUrl : "https://via.placeholder.com/300x450"
                      }" class="card-img-top" alt="${product.name}">
                      <div class="label new">New</div>
                        <ul class="product-hover">
                          <li><a href="./product-details.html?productId=${
                            product._id
                          }" class="image-popup"><span class="expand"><i class="bi bi-arrows-angle-expand"></i></span></a></li>
                          <li><a href="#"><span class="icon-heart-alt"><i class="bi bi-heart-fill"></i></span></a></li>
                          <li><a href="#"><span class="icon-bag-alt"><i class="bi bi-bag-fill"></i></span></a></li>
                        </ul>
                    </div>
                    <div class="product-item-text">
                      <a href="./product-details.html?productId=${product._id}"><h6>${product.name}</h6></a>
                    </div>
                    <div class="rating-price">
                      <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                      </div>
                      <div class="product-price">${product.price} €</div>
                    </div>
                  </div>
                </div>
              `
      )
    );
  })
  .catch((error) => console.error("Errore durante il recupero dei prodotti", error));
