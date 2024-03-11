const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYzA5ODRjNTllYzAwMTk5MGQ4NzgiLCJpYXQiOjE3MDkyOTM3MjAsImV4cCI6MTcxMDUwMzMyMH0.n7llZcSbLKkHGBmBrr5pRt7dwq8HfGQsDfX2uSO6d6Y";

// Funzione per recuperare i dettagli di tutti i prodotti
function fetchAllProducts() {
  fetch(URL, {
    headers: {
      authorization: APIkey,
    },
  })
    .then((response) => response.json())
    .then((products) => {
      // Calcoliamo il numero totale di prodotti e il numero di prodotti pubblicati
      const totalProducts = products.length;
      const publishedProducts = products.filter((product) => product.brand !== "deleted").length;

      // Aggiorniamo i valori nei card dei numeri
      document.getElementById("totalProductsNumber").textContent = totalProducts;
      document.getElementById("publishedProductsNumber").textContent = publishedProducts;

      // Inseriamo i prodotti nella tabella
      products.forEach((product) =>
        document.getElementById("productSummary").insertAdjacentHTML(
          "afterend",
          `
            <tr class="product-row">  
              <td> <img width="80" src="${
                product.imageUrl !== "N/A" ? product.imageUrl : "https://via.placeholder.com/300x450"
              }"  alt="${product.name}"> </td>  
              <td> ${product.name} </td>  
              <td class="description"> ${product.description} </td>  
              <td class="category"> ${product.brand} </td> 
              <td> ${product.price} </td> 
              <!-- Aggiunta delle colonne per le azioni -->
              <td>
                <div class="edit-delete-buttons">
                  <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">
                    <i class="bi bi-trash"></i>
                  </button>
                  <button class="btn btn-primary mt-4" onclick="editProduct('${product._id}')">
                    <i class="bi bi-pencil"></i>
                  </button>
                </div>
              </td>
            </tr>   
          `
        )
      );
    })
    .catch((error) => console.error("Errore durante il recupero dei prodotti", error));
}

// Funzione per gestire l'eliminazione di un prodotto
const deleteProduct = (productId) => {
  // Mostra il modale di avviso prima di procedere con l'eliminazione
  const deleteConfirmationModal = new bootstrap.Modal(document.getElementById("deleteConfirmationModal"));
  deleteConfirmationModal.show();

  // Ascolta il click sul pulsante di conferma eliminazione
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  confirmDeleteButton.addEventListener("click", () => {
    fetch(`${URL}/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: APIkey,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Rimuovi la riga della tabella corrispondente al prodotto eliminato
          const deletedRow = document.querySelector(`tr[data-id="${productId}"]`);
          if (deletedRow) {
            deletedRow.remove();
          }
          console.log("Prodotto eliminato con successo");

          // Mostra il modal di eliminazione riuscita
          const deleteSuccessModal = new bootstrap.Modal(document.getElementById("deleteSuccessModal"));
          deleteSuccessModal.show();

          // Ricarica la pagina dopo 1 secondo
          setTimeout(() => {
            location.reload();
          }, 1500);
        } else {
          throw new Error("Errore durante l'eliminazione del prodotto");
        }
      })
      .catch((error) => console.error(error));
  });
};

// Funzione per gestire la modifica di un prodotto
const editProduct = (productId) => {
  // Reindirizza l'utente alla pagina di modifica del prodotto con l'ID del prodotto
  window.location.href = `./edit-product.html?productId=${productId}`;
};

// Funzione per gestire il toggle della modalità di modifica
const toggleEditMode = () => {
  const productRows = document.querySelectorAll(".product-row");
  // Itera su tutte le righe dei prodotti e toggle la classe "editing-mode"
  productRows.forEach((row) => {
    row.classList.toggle("editing-mode");
  });

  // Mostra/nascondi i bottoni "Delete" e "Edit" in base alla modalità di modifica
  const deleteBtns = document.querySelectorAll(".btn-danger");
  const editBtns = document.querySelectorAll(".btn-primary");
  deleteBtns.forEach((btn) => {
    btn.style.display = document.querySelector(".product-row").classList.contains("editing-mode") ? "block" : "none";
  });
  editBtns.forEach((btn) => {
    btn.style.display = document.querySelector(".product-row").classList.contains("editing-mode") ? "block" : "none";
  });
};

// Aggiungi un listener per il click sul pulsante "Edit"
document.getElementById("editModeButton").addEventListener("click", toggleEditMode);

// Chiamata alla funzione per recuperare i dettagli di tutti i prodotti quando la pagina si carica
window.onload = fetchAllProducts;
