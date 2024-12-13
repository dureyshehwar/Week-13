import 'bootstrap/dist/css/bootstrap.css'

document.addEventListener('DOMContentLoaded', async () => {
const productsContainer = document.querySelector('.row') as HTMLDivElement;
const form = document.querySelector('#productForm') as HTMLFormElement;

if (!productsContainer || !form) {
    console.error('Required DOM elements not found');
    return;
  }

  // Interface for product
  interface Product {
    id?: number;
    name: string;
    description: string;
    price: number;
    image: string;
  }


  // Function to fetch and display products
  async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        const products : Product[]= await response.json();
        console.log(products)
        productsContainer.innerHTML = products.map(product => `
            <div class="col-md-4" data-id="${product.id}">
                <div class="card">
                    <img src=${product.image} class="card-img-top" alt="${product.name}" />
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                        <button class="btn btn-danger delete-btn">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
  
  // Function to handle form submission and add new product
  form.addEventListener('submit', async (event: SubmitEvent) => {
      event.preventDefault();
      
      const formData = new FormData(form);
      const newProduct: Product = {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          price: parseFloat(formData.get('price') as string),
          image: formData.get('image') as string
      };

      try {
          await fetch('http://localhost:3000/products', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newProduct)
          });
          form.reset();
          fetchProducts(); // Refresh the product list
      } catch (error) {
          console.error('Error adding product:', error);
      }
  });

  // Function to handle product deletion
  productsContainer.addEventListener('click', async (event: Event) => {
     const target = event.target as HTMLElement;
    
     if (target.classList.contains('delete-btn')) {
          const productElement = target.closest('.col-md-4') as HTMLElement;
          const productId = productElement?.getAttribute('data-id');
          if (!productId) {
            console.error('Product ID not found');
            return;
          }
          try {
              await fetch(`http://localhost:3000/products/${productId}`, {
                  method: 'DELETE'
              });
              fetchProducts(); // Refresh the product list
          } catch (error) {
              console.error('Error deleting product:', error);
          }
      }
  });

  // Initial fetch of products
  fetchProducts();
});

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
 <section id="Digital Products" class="menu-section container">
    
    <form id="productForm" class="mb-4">
      <div class="mb-3">
          <label for="name" class="form-label">Product Name</label>
          <input type="text" class="form-control" id="name" name="name" required>
      </div>
      <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea class="form-control" id="description" name="description" required></textarea>
      </div>
      <div class="mb-3">
          <label for="price" class="form-label">Price</label>
          <input type="number" class="form-control" id="price" name="price" step="0.01" required>
      </div>
      
      <button type="submit" class="btn btn-primary">Add Product</button>
  </form>
  
    <h2 class="mb-4"></h2>
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <img src="./assets/laptop.jpg" class="card-img-top" alt="Laptop" />
          <div class="card-body">
            <h5 class="card-title">Laptop</h5>
            <p class="card-text">A basic need of programming language.</p>
            <p class="card-text"><strong>Price:</strong> $500.00</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        
        <div class="card">
          <img src="./assets/Phones.jpg" class="card-img-top" alt="Phones" />
          <div class="card-body">
            <h5 class="card-title">Phones</h5>
            <p class="card-text">The need of every human being of today era for communication.</p>
            <p class="card-text"><strong>Price:</strong> $150.00</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
       
        <div class="card">
          <img src="./assets/HeadPhones.jpg" class="card-img-top" alt="HeadPhones" />
          <div class="card-body">
            <h5 class="card-title">HeadPhones</h5>
            <p class="card-text">A conveneint way of listening music or even your lectures weather ypu  are in jam of bus or train.</p>
            <p class="card-text"><strong>Price:</strong> $50.99</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`
