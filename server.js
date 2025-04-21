const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ProductModel = require('./Product');

const app = express();
const PORT = 8000;

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // ⬅️ required to read JSON from body

// ✅ MongoDB Connection
mongoose.connect('mongodb+srv://shalosharjan:8055@grocery.scyy9ic.mongodb.net/groceryDB?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


  app.post('/addProduct', async (req,res)=>{
    try {
    await ProductModel.create(req.body)
    res.json({message:'Product Added Successfully'})
    }
    catch(error){
    res.json(error)
    }
  })
    //Read All - Rest API
    app.get('/viewProducts', async (req,res)=>{
    try {
    const records = await ProductModel.find()
    res.json(records)
    }
    catch(error){
    res.json(error)
    }
  })

  //Read By ID Rest API - to display before updation (EditProduct)
app.get('/findProduct/:id', async (req,res)=>{
  try {
  const record = await ProductModel.findById(req.params.id)
  res.json(record)
  }
  catch(error){
  res.json(error)
  }
  })

  //Update - REST API
app.put('/editProduct/:id', async (reg,res)=> {
  try {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
  req.params.id, reg.body, {new:true})
  if (!updatedProduct) {
  return res.send('Item not found');
  }
  res.json({message:'Product Updated Successfully'});
  } catch (err) {
  res.json(err);
  }
  })
  
  // Delete - REST API
app.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const deletedItem = await ProductModel.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
