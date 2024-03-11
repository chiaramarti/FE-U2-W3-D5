const URL = "https://striveschool-api.herokuapp.com/api/product/";
const APIkey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWUxYzA5ODRjNTllYzAwMTk5MGQ4NzgiLCJpYXQiOjE3MDkyOTM3MjAsImV4cCI6MTcxMDUwMzMyMH0.n7llZcSbLKkHGBmBrr5pRt7dwq8HfGQsDfX2uSO6d6Y";

// Seleziona il modulo di aggiunta prodotto
const addProductForm = document.getElementById("addProductForm");

// Gestisci la sottomissione del modulo
addProductForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Ottieni i valori dal modulo
  const productName = document.getElementById("productName").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDescription = document.getElementById("productDescription").value;
  const productImage = document.getElementById("productImage").value;
  const productBrand = document.getElementById("productBrand").value;

  // Crea il corpo della richiesta
  const requestBody = {
    name: productName,
    price: parseFloat(productPrice),
    description: productDescription,
    imageUrl: productImage,
    brand: productBrand,
  };

  try {
    // Verifica se il prodotto esiste già
    const existingProductResponse = await fetch(`${URL}?name=${productName}`, {
      method: "GET",
      headers: {
        Authorization: APIkey,
      },
    });

    if (existingProductResponse.ok) {
      const existingProduct = await existingProductResponse.json();
      if (existingProduct.length > 0) {
        // Se il prodotto esiste già, mostra un messaggio di avviso all'utente
        alert("Il prodotto esiste già. Si prega di inserire un nome diverso.");
        return; // Interrompi il flusso della funzione
      }
    } else {
      console.error("Errore durante il recupero del prodotto esistente:", existingProductResponse.statusText);
      alert("Si è verificato un errore durante la verifica del prodotto esistente. Si prega di riprovare.");
      return; // Interrompi il flusso della funzione
    }

    // Effettua la richiesta POST per aggiungere il nuovo prodotto
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: APIkey,
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      // Se il prodotto è stato aggiunto con successo, reindirizza alla pagina di riepilogo
      window.location.href = "./admin_panel.html";
    } else {
      // Se la richiesta ha avuto esito negativo, visualizza un messaggio di errore
      console.error("Errore durante l'aggiunta del prodotto:", response.statusText);
      alert("Si è verificato un errore durante l'aggiunta del prodotto. Si prega di riprovare.");
    }
  } catch (error) {
    console.error("Errore durante la richiesta di aggiunta del prodotto:", error);
    alert("Si è verificato un errore durante la richiesta di aggiunta del prodotto. Si prega di riprovare.");
  }
});
