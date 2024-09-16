document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculator-form');
    const resultsDiv = document.getElementById('results');
    const originalUsageP = document.getElementById('originalUsage');
    const savingsP = document.getElementById('savings');
    const newUsageP = document.getElementById('newUsage');
    const waterUsageInput = document.getElementById('waterUsage');
    const techniqueSelect = document.getElementById('technique');
    const waterUsageError = document.getElementById('waterUsageError');
    const techniqueError = document.getElementById('techniqueError');
    const chartContainer = document.getElementById('chart-container');

    // Define water-saving techniques
    const techniques = {
        'low-flow': 0.2, // 20% reduction
        'rainwater-harvesting': 0.3, // 30% reduction
        'drip-irrigation': 0.4 // 40% reduction
    };

    // Initialize Chart.js
    const ctx = document.getElementById('savingsChart').getContext('2d');
    let savingsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Original Usage', 'Savings', 'New Usage'],
            datasets: [{
                label: 'Water Usage (liters)',
                data: [],
                backgroundColor: ['#00796b', '#004d40', '#80deea'],
                borderColor: ['#004d40', '#00332b', '#0097a7'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Reset errors
        waterUsageError.style.display = 'none';
        techniqueError.style.display = 'none';

        const waterUsage = parseFloat(waterUsageInput.value);
        const technique = techniqueSelect.value;

        if (isNaN(waterUsage) || waterUsage <= 0) {
            waterUsageError.style.display = 'block';
            return;
        }

        if (!technique || !techniques[technique]) {
            techniqueError.style.display = 'block';
            return;
        }

        const reductionRate = techniques[technique];
        const savings = waterUsage * reductionRate;
        const newUsage = waterUsage - savings;

        // Update results
        originalUsageP.textContent = `Original Water Usage: ${waterUsage.toFixed(2)} liters`;
        savingsP.textContent = `Potential Savings: ${savings.toFixed(2)} liters`;
        newUsageP.textContent = `New Water Usage: ${newUsage.toFixed(2)} liters`;

        // Update chart
        savingsChart.data.datasets[0].data = [waterUsage, savings, newUsage];
        savingsChart.update();

        resultsDiv.classList.remove('hidden');
    });
});
