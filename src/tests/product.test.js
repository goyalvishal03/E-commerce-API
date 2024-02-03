const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
const Product = require('../models/productModel');


beforeEach(async () => {
  await Product.deleteMany();
});

test('should create a new product', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({
      name: 'Test Product',
      description: 'Test Description',
      price: 19.99,
    });

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('_id');
});

test('should get all products', async () => {
    // Create a sample product to retrieve later
    await request(app)
      .post('/api/products')
      .send({
        name: 'Sample Product',
        description: 'Sample Description',
        price: 29.99,
      });
  
    const response = await request(app)
      .get('/api/products');
  
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
  
  test('should get a specific product by ID', async () => {
    // Create a sample product to retrieve later
    const createResponse = await request(app)
      .post('/api/products')
      .send({
        name: 'Sample Product',
        description: 'Sample Description',
        price: 29.99,
      });
  
    const productId = createResponse.body._id;
  
    const response = await request(app)
      .get(`/api/products/${productId}`);
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', productId);
  });
  
  test('should update a product by ID', async () => {
    // Create a sample product to update later
    const createResponse = await request(app)
      .post('/api/products')
      .send({
        name: 'Sample Product',
        description: 'Sample Description',
        price: 29.99,
      });
  
    const productId = createResponse.body._id;
  
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        name: 'Updated Product',
        description: 'Updated Description',
        price: 39.99,
      });
  
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', productId);
    expect(response.body.name).toBe('Updated Product');
  });
  
  test('should delete a product by ID', async () => {
    // Create a sample product to delete later
    const createResponse = await request(app)
      .post('/api/products')
      .send({
        name: 'Sample Product',
        description: 'Sample Description',
        price: 29.99,
      });
  
    const productId = createResponse.body._id;
  
    const deleteResponse = await request(app)
      .delete(`/api/products/${productId}`);
  
    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.message).toBe('Product deleted successfully');
  });
