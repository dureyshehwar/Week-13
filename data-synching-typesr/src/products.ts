import { Product } from './interfaces.ts';

// API URL for the products
const API_URL = 'http://localhost:3000/products';

// Function to fetch products
export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Function to display products in the DOM
export function displayProducts(products: Product[], container: HTMLDivElement): void {
    container.innerHTML = products.map(product => `
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
}

// Function to add a new product
export async function addProduct(newProduct: Product): Promise<void> {
    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
}

// Function to delete a product by ID
export async function deleteProduct(productId: string): Promise<void> {
    try {
        await fetch(`${API_URL}/${productId}`, { method: 'DELETE' });
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
}
