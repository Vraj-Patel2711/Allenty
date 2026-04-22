'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/api/products/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load inventory. Are you logged in?');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateStock = async (id, currentQty, action) => {
    const newQty = action === 'add' ? currentQty + 1 : currentQty - 1;
    if (newQty < 0) return; 

    setProducts(prevProducts => prevProducts.map(p => 
      p.id === id ? { ...p, quantity: newQty } : p
    ));

    try {
      const token = localStorage.getItem('accessToken');
      await axios.patch(`http://localhost:8000/api/products/${id}/`, 
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update stock on the server.");
      setProducts(prevProducts => prevProducts.map(p => 
        p.id === id ? { ...p, quantity: currentQty } : p
      ));
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/api/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete product from the server.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 mt-1">View and adjust your current stock levels.</p>
        </div>
        <button 
          className="bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
          onClick={() => window.location.href = '/inventory/create'}
        >
          + Add New Item
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-12">
          <p className="text-gray-500 font-medium">Loading items...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Stock Level</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-medium">
                      No products found. Database is empty.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* 1. Name */}
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{product.name}</td>
                      
                      {/* 2. SKU */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">{product.sku}</td>
                      
                      {/* 3. Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">
                          {product.category || 'Uncategorized'}
                        </span>
                      </td>

                      {/* 4. Stock Level */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <button 
                            onClick={() => updateStock(product.id, product.quantity, 'remove')}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 flex items-center justify-center font-bold text-lg transition-colors"
                          >
                            -
                          </button>
                          
                          <span className={`min-w-[3rem] text-center px-3 py-1 inline-flex justify-center text-sm font-bold rounded-full border ${
                            product.quantity <= (product.min_stock_level || 5) 
                              ? 'bg-red-50 text-red-700 border-red-100' 
                              : 'bg-green-50 text-green-700 border-green-100'
                          }`}>
                            {product.quantity}
                          </span>
                          
                          <button 
                            onClick={() => updateStock(product.id, product.quantity, 'add')}
                            className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 border border-green-100 flex items-center justify-center font-bold text-lg transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      
                      {/* 5. Location */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                        {product.location || "Main"}
                      </td>
                      
                      {/* 6. Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors inline-flex items-center"
                          title="Delete Product"
                        >
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}