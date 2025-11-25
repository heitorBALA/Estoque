const API_URL = 'http://localhost:8080';

// DOM Elements
const productsTableBody = document.querySelector('#products-table tbody');
const createForm = document.getElementById('create-form');
const updateForm = document.getElementById('update-form');
const searchBtn = document.getElementById('btn-search');
const refreshBtn = document.getElementById('btn-refresh');
const searchResultDiv = document.getElementById('search-result');
const updateSection = document.getElementById('update-section');
const btnCancelUpdate = document.getElementById('btn-cancel-update');

// Event Listeners
document.addEventListener('DOMContentLoaded', loadProducts);
refreshBtn.addEventListener('click', loadProducts);
createForm.addEventListener('submit', createProduct);
searchBtn.addEventListener('click', searchProduct);
updateForm.addEventListener('submit', updateProduct);
btnCancelUpdate.addEventListener('click', hideUpdateForm);

// Functions

async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/listar`);
        if (!response.ok) throw new Error('Erro ao carregar produtos');
        const products = await response.json();
        renderTable(products);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function renderTable(products) {
    productsTableBody.innerHTML = '';
    if (products.length === 0) {
        productsTableBody.innerHTML = '<tr><td colspan="5" style="text-align:center">Nenhum produto cadastrado.</td></tr>';
        return;
    }

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nome}</td>
            <td>${product.modelo}</td>
            <td>R$ ${product.preco.toFixed(2)}</td>
            <td>
                <button class="btn-sm btn-edit" onclick="prepareUpdate(${product.id})">Editar</button>
                <button class="btn-sm btn-delete" onclick="deleteProduct(${product.id})">Excluir</button>
            </td>
        `;
        productsTableBody.appendChild(row);
    });
}

async function createProduct(e) {
    e.preventDefault();
    
    const product = {
        nome: document.getElementById('create-nome').value,
        modelo: document.getElementById('create-modelo').value,
        preco: parseFloat(document.getElementById('create-preco').value),
        descricao: document.getElementById('create-descricao').value
    };

    try {
        const response = await fetch(`${API_URL}/cadastrar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (!response.ok) throw new Error('Erro ao cadastrar produto');

        showToast('Produto cadastrado com sucesso!', 'success');
        createForm.reset();
        loadProducts();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function searchProduct() {
    const id = document.getElementById('search-id').value;
    if (!id) return;

    try {
        const response = await fetch(`${API_URL}/buscar/${id}`);
        if (response.status === 404) {
            searchResultDiv.innerHTML = '<p class="error-text">Produto não encontrado.</p>';
            searchResultDiv.classList.remove('hidden');
            return;
        }
        if (!response.ok) throw new Error('Erro ao buscar produto');

        const product = await response.json();
        searchResultDiv.innerHTML = `
            <div class="product-detail">
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Nome:</strong> ${product.nome}</p>
                <p><strong>Modelo:</strong> ${product.modelo}</p>
                <p><strong>Preço:</strong> R$ ${product.preco.toFixed(2)}</p>
                <p><strong>Descrição:</strong> ${product.descricao || '-'}</p>
            </div>
        `;
        searchResultDiv.classList.remove('hidden');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function deleteProduct(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
        const response = await fetch(`${API_URL}/remover/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao excluir produto');

        showToast('Produto excluído com sucesso!', 'success');
        loadProducts();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Global scope for onclick handlers
window.deleteProduct = deleteProduct;
window.prepareUpdate = prepareUpdate;

async function prepareUpdate(id) {
    try {
        const response = await fetch(`${API_URL}/buscar/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do produto');
        
        const product = await response.json();
        
        document.getElementById('update-id').value = product.id;
        document.getElementById('update-id-display').textContent = `#${product.id}`;
        document.getElementById('update-nome').value = product.nome;
        document.getElementById('update-modelo').value = product.modelo;
        document.getElementById('update-preco').value = product.preco;
        document.getElementById('update-descricao').value = product.descricao || '';
        
        updateSection.classList.remove('hidden');
        updateSection.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function updateProduct(e) {
    e.preventDefault();

    const id = document.getElementById('update-id').value;
    const product = {
        id: parseInt(id),
        nome: document.getElementById('update-nome').value,
        modelo: document.getElementById('update-modelo').value,
        preco: parseFloat(document.getElementById('update-preco').value),
        descricao: document.getElementById('update-descricao').value
    };

    try {
        const response = await fetch(`${API_URL}/alterar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });

        if (!response.ok) throw new Error('Erro ao atualizar produto');

        showToast('Produto atualizado com sucesso!', 'success');
        updateForm.reset();
        hideUpdateForm();
        loadProducts();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function hideUpdateForm() {
    updateSection.classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    
    // Trigger reflow
    void toast.offsetWidth;
    
    // Show
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
