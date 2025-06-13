import axios from "axios";

const apiURL = 'https://localhost:7125/api';

//Products
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${apiURL}/Product`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const insertProduct = async (product) => {
  try {
    const response = await axios.post(`${apiURL}/Product`, {
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        category_id: parseInt(product.category_id),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Error inserting product:', error);
    throw error;
  }
}

export const updateProduct = async (product) => {
     try {
    const response = await axios.put(`${apiURL}/Product/${product.id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  } 
}

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${apiURL}/Product/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

//Categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get(`${apiURL}/Category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const insertCategory = async (category) => {
  try {
    const response = await axios.post(`${apiURL}/Category`, {
        name: category.name,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Error inserting category:', error);
    throw error;
  }
};

export const updateCategory = async (category) => {
  try {
    const response = await axios.put(`${apiURL}/Category/${category.id}`, category);
    return response.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${apiURL}/Category/${id}`);
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

//Cart
export const getCart = async () => {
  try {
    const response = await axios.get(`${apiURL}/Cart`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const insertProductCart = async (product) => {
  try {
    const response = await axios.post(`${apiURL}/Cart`, {
        product_id: product.id,
        quantity: product.quantity,
        created_at: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const checkoutCart = async (cartItems) => {
  try {
    const response = await axios.post(`${apiURL}/Cart/Checkout`, cartItems);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

//Users
export const insertUser = async (user) => {
  try {
    const response = await axios.post(`${apiURL}/User`, {
        username: user.username,
        email: user.email,
        password: user.password,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });
    return response.data;
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};