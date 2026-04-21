// CÓDIGO ADICIONAL PARA SISTEMA DEC - QUANTIDADE + VALOR UNITÁRIO + TOTAL

// ===== SEÇÃO: ESTIMATE (BUDGET) =====
function enhanceEstimateSection() {
    const estimateContainer = document.querySelector('[data-section="estimate"]') || 
                             document.querySelector('.estimate-section') ||
                             document.getElementById('estimate');
    
    if (!estimateContainer) {
        console.log('Estimate container not found');
        return;
    }

    // HTML para Estimate melhorado
    const enhancedEstimateHTML = `
        <div class="cost-calculator estimate-calculator">
            <h3>📋 Estimate (Budget) - Detailed Calculation</h3>
            
            <div class="cost-items-container" id="estimateItems">
                <!-- Items will be dynamically added here -->
            </div>
            
            <button class="add-item-btn" onclick="addEstimateItem()">
                ➕ Add New Item
            </button>
            
            <div class="total-summary">
                <div class="summary-row">
                    <strong>📋 Total Estimated: $<span id="totalEstimated">0.00</span></strong>
                </div>
            </div>
        </div>

        <style>
            .cost-calculator {
                background: #f8f9fc;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .cost-item {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr auto;
                gap: 10px;
                align-items: center;
                background: white;
                padding: 15px;
                margin: 10px 0;
                border-radius: 8px;
                border: 1px solid #e1e5e9;
            }
            
            .cost-item input, .cost-item select {
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
            }
            
            .cost-item input[type="number"] {
                text-align: right;
            }
            
            .total-display {
                background: #f0f8f0;
                color: #2d5a3d;
                font-weight: bold;
                text-align: center;
                border-radius: 6px;
                padding: 8px 12px;
            }
            
            .remove-btn {
                background: #dc3545;
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .add-item-btn {
                background: #0b2545;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                margin: 15px 0;
                font-weight: 600;
            }
            
            .add-item-btn:hover {
                background: #1a3d6b;
            }
            
            .total-summary {
                background: linear-gradient(135deg, #0b2545, #1a3d6b);
                color: white;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
            }
            
            .item-labels {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr 1fr auto;
                gap: 10px;
                margin-bottom: 10px;
                font-weight: bold;
                color: #666;
                padding: 0 15px;
            }
        </style>
    `;
    
    // Substitui o conteúdo da seção estimate
    estimateContainer.innerHTML = enhancedEstimateHTML;
    
    // Adiciona labels dos campos
    const itemsContainer = document.getElementById('estimateItems');
    const labelsHTML = `
        <div class="item-labels">
            <span>📝 Description</span>
            <span>📦 Quantity</span>
            <span>💲 Unit Price</span>
            <span>💰 Total</span>
            <span></span>
        </div>
    `;
    itemsContainer.innerHTML = labelsHTML;
    
    // Adiciona primeiro item
    addEstimateItem();
}

// ===== SEÇÃO: ACTUAL COSTS =====
function enhanceActualCostsSection() {
    const actualContainer = document.querySelector('[data-section="actual"]') || 
                           document.querySelector('.actual-section') ||
                           document.getElementById('actual');
    
    if (!actualContainer) {
        console.log('Actual container not found');
        return;
    }

    const enhancedActualHTML = `
        <div class="cost-calculator actual-calculator">
            <h3>💰 Actual Costs - Detailed Tracking</h3>
            
            <div class="cost-items-container" id="actualItems">
                <!-- Items will be dynamically added here -->
            </div>
            
            <button class="add-item-btn" onclick="addActualItem()">
                ➕ Add New Item
            </button>
            
            <div class="total-summary">
                <div class="summary-row">
                    <strong>💰 Total Actual: $<span id="totalActual">0.00</span></strong>
                </div>
            </div>
        </div>
    `;
    
    actualContainer.innerHTML = enhancedActualHTML;
    
    // Adiciona labels
    const itemsContainer = document.getElementById('actualItems');
    const labelsHTML = `
        <div class="item-labels">
            <span>📝 Description</span>
            <span>📦 Quantity</span>
            <span>💲 Unit Price</span>
            <span>💰 Total</span>
            <span></span>
        </div>
    `;
    itemsContainer.innerHTML = labelsHTML;
    
    // Adiciona primeiro item
    addActualItem();
}

// ===== FUNÇÕES DE ADIÇÃO DE ITENS =====
function addEstimateItem() {
    const container = document.getElementById('estimateItems');
    const itemId = 'estimate-' + Date.now();
    
    const itemHTML = `
        <div class="cost-item" id="${itemId}">
            <input type="text" placeholder="Ex: Material, Labor, Equipment..." class="description-input">
            <input type="number" step="0.01" placeholder="1.00" class="quantity-input" 
                   oninput="calculateItemTotal('${itemId}')">
            <input type="number" step="0.01" placeholder="0.00" class="unit-price-input" 
                   oninput="calculateItemTotal('${itemId}')">
            <div class="total-display">$0.00</div>
            <button class="remove-btn" onclick="removeItem('${itemId}', 'estimate')" title="Remove item">×</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', itemHTML);
}

function addActualItem() {
    const container = document.getElementById('actualItems');
    const itemId = 'actual-' + Date.now();
    
    const itemHTML = `
        <div class="cost-item" id="${itemId}">
            <input type="text" placeholder="Ex: Material, Labor, Equipment..." class="description-input">
            <input type="number" step="0.01" placeholder="1.00" class="quantity-input" 
                   oninput="calculateItemTotal('${itemId}')">
            <input type="number" step="0.01" placeholder="0.00" class="unit-price-input" 
                   oninput="calculateItemTotal('${itemId}')">
            <div class="total-display">$0.00</div>
            <button class="remove-btn" onclick="removeItem('${itemId}', 'actual')" title="Remove item">×</button>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', itemHTML);
}

// ===== CÁLCULOS =====
function calculateItemTotal(itemId) {
    const item = document.getElementById(itemId);
    if (!item) return;
    
    const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
    const unitPrice = parseFloat(item.querySelector('.unit-price-input').value) || 0;
    const total = quantity * unitPrice;
    
    item.querySelector('.total-display').textContent = formatCurrency(total);
    
    // Atualiza total geral
    if (itemId.startsWith('estimate-')) {
        updateEstimateTotal();
    } else {
        updateActualTotal();
    }
}

function updateEstimateTotal() {
    const items = document.querySelectorAll('#estimateItems .cost-item');
    let total = 0;
    
    items.forEach(item => {
        if (item.classList.contains('item-labels')) return;
        
        const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
        const unitPrice = parseFloat(item.querySelector('.unit-price-input').value) || 0;
        total += quantity * unitPrice;
    });
    
    document.getElementById('totalEstimated').textContent = formatCurrency(total);
    
    // Atualiza total global se existir
    updateGlobalTotals();
}

function updateActualTotal() {
    const items = document.querySelectorAll('#actualItems .cost-item');
    let total = 0;
    
    items.forEach(item => {
        if (item.classList.contains('item-labels')) return;
        
        const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
        const unitPrice = parseFloat(item.querySelector('.unit-price-input').value) || 0;
        total += quantity * unitPrice;
    });
    
    document.getElementById('totalActual').textContent = formatCurrency(total);
    
    // Atualiza total global se existir
    updateGlobalTotals();
}

function updateGlobalTotals() {
    const estimatedTotal = parseFloat(document.getElementById('totalEstimated')?.textContent.replace(/[$,]/g, '')) || 0;
    const actualTotal = parseFloat(document.getElementById('totalActual')?.textContent.replace(/[$,]/g, '')) || 0;
    const variance = actualTotal - estimatedTotal;
    
    // Atualiza displays globais se existirem
    const globalEstimated = document.querySelector('[data-total="estimated"]') || 
                           document.querySelector('.total-estimated');
    const globalActual = document.querySelector('[data-total="actual"]') || 
                        document.querySelector('.total-actual');
    const globalVariance = document.querySelector('[data-total="variance"]') || 
                          document.querySelector('.total-variance');
    
    if (globalEstimated) globalEstimated.textContent = formatCurrency(estimatedTotal);
    if (globalActual) globalActual.textContent = formatCurrency(actualTotal);
    if (globalVariance) {
        globalVariance.textContent = formatCurrency(variance);
        globalVariance.style.color = variance > 0 ? '#dc3545' : '#28a745';
    }
}

// ===== FUNÇÕES AUXILIARES =====
function removeItem(itemId, type) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
        
        if (type === 'estimate') {
            updateEstimateTotal();
        } else {
            updateActualTotal();
        }
    }
}

function formatCurrency(amount) {
    return amount.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// ===== INICIALIZAÇÃO =====
function initializeEnhancedCostCalculator() {
    // Aguarda o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(() => {
                enhanceEstimateSection();
                enhanceActualCostsSection();
            }, 1000);
        });
    } else {
        setTimeout(() => {
            enhanceEstimateSection();
            enhanceActualCostsSection();
        }, 1000);
    }
}

// ===== EXPORT DE DADOS =====
function exportCostData() {
    const estimateData = [];
    const actualData = [];
    
    // Coleta dados estimate
    document.querySelectorAll('#estimateItems .cost-item:not(.item-labels)').forEach(item => {
        const description = item.querySelector('.description-input').value;
        const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
        const unitPrice = parseFloat(item.querySelector('.unit-price-input').value) || 0;
        const total = quantity * unitPrice;
        
        if (description || quantity || unitPrice) {
            estimateData.push({ description, quantity, unitPrice, total });
        }
    });
    
    // Coleta dados actual
    document.querySelectorAll('#actualItems .cost-item:not(.item-labels)').forEach(item => {
        const description = item.querySelector('.description-input').value;
        const quantity = parseFloat(item.querySelector('.quantity-input').value) || 0;
        const unitPrice = parseFloat(item.querySelector('.unit-price-input').value) || 0;
        const total = quantity * unitPrice;
        
        if (description || quantity || unitPrice) {
            actualData.push({ description, quantity, unitPrice, total });
        }
    });
    
    return {
        estimate: estimateData,
        actual: actualData,
        totals: {
            estimated: parseFloat(document.getElementById('totalEstimated')?.textContent.replace(/[$,]/g, '')) || 0,
            actual: parseFloat(document.getElementById('totalActual')?.textContent.replace(/[$,]/g, '')) || 0
        }
    };
}

// INICIALIZA AUTOMATICAMENTE
initializeEnhancedCostCalculator();

// Adiciona ao escopo global para debug
window.exportCostData = exportCostData;
window.addEstimateItem = addEstimateItem;
window.addActualItem = addActualItem;
window.calculateItemTotal = calculateItemTotal;
window.removeItem = removeItem;
