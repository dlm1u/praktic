import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceUsd, setPriceUsd] = useState(0);
  const [priceRub, setPriceRub] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  
  const token = localStorage.getItem('token');

  const refresh = () => {
    axios.get('http://localhost:3000/api/products').then(res => setProducts(res.data));
  };

  useEffect(() => { refresh(); }, []);

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/api/products', { 
      name, description, price_usd: priceUsd, price_rub: priceRub, image_url: imageUrl 
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setName(''); setDescription(''); setPriceUsd(0); setPriceRub(0); setImageUrl('');
    refresh();
  };

  const deleteProduct = async (id: number) => {
    await axios.delete(`http://localhost:3000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    refresh();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px' }}>
        <h2>Добавить сумку для выкупа</h2>
        <form onSubmit={createProduct} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <input type="text" placeholder="Название бренда и модели" value={name} onChange={e => setName(e.target.value)} required style={{ padding: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }} />
          <textarea placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} required style={{ padding: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }} />
          <input type="number" placeholder="Оригинальная цена ($)" value={priceUsd || ''} onChange={e => setPriceUsd(Number(e.target.value))} required style={{ padding: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }} />
          <input type="number" placeholder="Итоговая цена с доставкой (₽)" value={priceRub || ''} onChange={e => setPriceRub(Number(e.target.value))} required style={{ padding: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }} />
          <input type="url" placeholder="Прямая ссылка на картинку (URL)" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required style={{ padding: '8px', backgroundColor: '#222', color: '#fff', border: '1px solid #444' }} />
          <button type="submit" style={{ padding: '10px', backgroundColor: '#2ecc71', color: '#fff', border: 'none', cursor: 'pointer' }}>Добавить в каталог</button>
        </form>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px' }}>
        <h2>Каталог сумок ({products.length})</h2>
        <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {products.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#222', borderRadius: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src={p.image_url} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                <span>{p.name} ({p.price_rub} ₽)</span>
              </div>
              <button onClick={() => deleteProduct(p.id)} style={{ backgroundColor: '#e74c3c', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}