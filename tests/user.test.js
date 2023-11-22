const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('../src/routes/user.js');
const app = express();

// Conectar a la base de datos de prueba
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Desconectar después de las pruebas
afterAll(async () => {
  await mongoose.disconnect();
});

app.use(express.json());
app.use('/api', userRoutes);

describe('User Routes', () => {
  // Prueba para la creación de usuario
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', age: 25, email: 'john@example.com' });

    expect(response.statusCode).toEqual(200);
    // Puedes agregar más expectativas según el comportamiento esperado
  });

  // Prueba para obtener todos los usuarios
  it('should get all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.statusCode).toEqual(200);
    // Puedes agregar más expectativas según el comportamiento esperado
  });

  // Agregar más pruebas según las rutas y funcionalidades que necesites probar
});
