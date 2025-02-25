<!-- src/routes/products/+layout.svelte -->
<script>
  // You can add any layout-specific logic or state here if needed
</script>

<style>
  /* Global styles for products page layout */
  :global(body) {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #0a0101;
  }

  .product-detail {
    padding: 30px;
    text-align: center;
    background-color: rgba(219, 6, 6, 0.986);
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto;
    width: 90%;
    max-width: 600px;
    transition: transform 0.3s ease-in-out;
  }

  .product-detail:hover {
    transform: scale(1.05);
  }

  .product-image {
    width: 100%;
    height: auto;
    max-width: 400px;
    border-radius: 8px;
    margin-bottom: 20px;
    transition: opacity 0.3s ease;
  }

  .product-image:hover {
    opacity: 0.8;
  }

  h1 {
    font-size: 2.5rem;
    color: #03045e;
    margin-bottom: 15px;
  }

  p {
    font-size: 1rem;
    color: #333;
    line-height: 1.6;
  }

  .price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #0077b6;
    margin: 20px 0;
  }

  button {
    background-color: #2000d8;
    color: rgb(209, 28, 200);
    border: none;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #FF77b6;
  }

  .error {
    color: red;
    font-weight: bold;
  }

  /* Responsive Design */
  @media (max-width: 600px) {
    .product-detail {
      padding: 20px;
    }

    h1 {
      font-size: 2rem;
    }

    .price {
      font-size: 1rem;
    }

    button {
      padding: 10px 20px;
    }
  }
</style>

<!-- Slot for child pages to render their content -->
<slot></slot> <!-- This will inject content from child pages -->
