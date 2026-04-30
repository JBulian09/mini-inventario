const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || 'mysql',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'inventario',
};

async function getConnection() {
  return mysql.createConnection(dbConfig);
}

// Health check — NO modificar, lo usa el pipeline de CI
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'mini-inventario-api' });
});

// GET /productos — Devuelve todos los productos
app.get('/productos', async (req, res) => {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM productos');
    await db.end();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /productos/:id — Devuelve un producto por ID
app.get('/productos/:id', async (req, res) => {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM productos WHERE id = ?', [req.params.id]);
    await db.end();
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /productos — Crea un nuevo producto
app.post('/productos', async (req, res) => {
  const { nombre, cantidad, precio } = req.body;
  if (!nombre || cantidad === undefined || precio === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const db = await getConnection();
    const [result] = await db.query(
      'INSERT INTO productos (nombre, cantidad, precio) VALUES (?, ?, ?)',
      [nombre, cantidad, precio]
    );
    await db.end();
    res.status(201).json({ id: result.insertId, nombre, cantidad, precio });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /productos/:id/stock — Actualiza solo la cantidad en stock
app.put('/productos/:id/stock', async (req, res) => {
  const { cantidad } = req.body;
  if (cantidad === undefined) {
    return res.status(400).json({ error: 'Falta el campo cantidad' });
  }
  try {
    const db = await getConnection();
    const [result] = await db.query('UPDATE productos SET cantidad = ? WHERE id = ?', [cantidad, req.params.id]);
    await db.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Stock actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /productos/:id — Elimina un producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const db = await getConnection();
    const [result] = await db.query('DELETE FROM productos WHERE id = ?', [req.params.id]);
    await db.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API de inventario corriendo en puerto ${PORT}`);
});