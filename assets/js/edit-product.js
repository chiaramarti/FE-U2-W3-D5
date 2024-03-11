const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYzA5ODRjNTllYzAwMTk5MGQ4NzgiLCJpYXQiOjE3MDkyOTM3MjAsImV4cCI6MTcxMDUwMzMyMH0.n7llZcSbLKkHGBmBrr5pRt7dwq8HfGQsDfX2uSO6d6Y";

// Funzione per ottenere i dettagli del prodotto dal server API
const getProductDetails = async (productId) => {
  try {
    const response = await fetch(`${URL}/${productId}`, {
      headers: {
        Authorization: APIkey,
      },
    });
    if (response.ok) {
      const product = await response.json();
      return product;
    } else {
      throw new Error("Failed to fetch product details");
    }
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Funzione per precompilare i campi del form con i dettagli del prodotto
const populateFormFields = (product) => {
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("productImage").value = product.imageUrl;
  document.getElementById("productBrand").value = product.brand;
};

// Funzione per controllare se ci sono state modifiche nei campi del form
const checkForChanges = (product) => {
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDescription = document.getElementById("productDescription").value;
  const productImage = document.getElementById("productImage").value;
  const productBrand = document.getElementById("productBrand").value;

  return (
    productName !== product.name ||
    productPrice !== product.price ||
    productDescription !== product.description ||
    productImage !== product.imageUrl ||
    productBrand !== product.brand
  );
};

// Funzione per gestire il submit del form di modifica del prodotto
editProductForm.addEventListener("submit", async (event) => {
  // Evita il comportamento predefinito del submit
  event.preventDefault();

  // Ottieni l'ID del prodotto dalla query string dell'URL
  const productId = new URLSearchParams(window.location.search).get("productId");

  // Ottieni i dettagli del prodotto dal server API
  try {
    const product = await getProductDetails(productId);

    // Controlla se ci sono state modifiche nel form
    const changesDetected = checkForChanges(product);

    if (!changesDetected) {
      // Nessuna modifica
      alert("No changes detected.");
    } else {
      // Modifiche trovate, chiedi conferma prima di inviare i nuovi dati al server
      const confirmation = confirm("Changes detected. Do you want to update the product?");
      if (confirmation) {
        const productName = document.getElementById("productName").value;
        const productPrice = document.getElementById("productPrice").value;
        const productDescription = document.getElementById("productDescription").value;
        const productImage = document.getElementById("productImage").value;
        const productBrand = document.getElementById("productBrand").value;

        const editedProduct = {
          name: productName,
          price: productPrice,
          description: productDescription,
          imageUrl: productImage,
          brand: productBrand,
        };

        // Funzione per aggiornare il prodotto sul server
        const updateProduct = async (editedProduct) => {
          try {
            const response = await fetch(`${URL}/${productId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: APIkey,
              },
              body: JSON.stringify(editedProduct),
            });
            if (response.ok) {
              alert("Product updated successfully!");
              window.location.href = "/admin_panel.html"; // Redirect to home page or any other page after successful update
            } else {
              throw new Error("Failed to update product.");
            }
          } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update product. Please try again.");
          }
        };

        updateProduct(editedProduct);
      }
    }
  } catch (error) {
    console.error("Error getting product details:", error);
    alert("Failed to load product details. Please try again.");
  }
});

// Funzione per ottenere e popolare i dettagli del prodotto nel form al caricamento della pagina
window.onload = async () => {
  // Ottieni l'ID del prodotto dalla query string dell'URL
  const productId = new URLSearchParams(window.location.search).get("productId");

  // Ottieni e popola i dettagli del prodotto nel form
  if (productId) {
    try {
      const product = await getProductDetails(productId);
      populateFormFields(product);
    } catch (error) {
      console.error("Error loading product details:", error);
      alert("Failed to load product details. Please try again.");
    }
  }
};
