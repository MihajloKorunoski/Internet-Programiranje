    document.addEventListener('DOMContentLoaded', function () {
        const addAdButton = document.getElementById('addAd');
        const usedItemsTable = document.getElementById('usedItemsTable').querySelector('tbody');
        const neverUsedItemsTable = document.getElementById('neverUsedItemsTable').querySelector('tbody');
        const activeAdsCount = document.getElementById('activeAdsCount');
        let ads = [];

        addAdButton.addEventListener('click', function () {
            const name = document.getElementById('name').value.trim();
            const checkedItems = Array.from(document.querySelectorAll('input[name="item"]:checked')).map(checkbox => checkbox.value)
            const itemCode = document.getElementById('itemCode').value.trim()
            const description = document.getElementById('description').value.trim()
            let price = parseFloat(document.getElementById('price').value);
            const condition = document.querySelector('input[name="condition"]:checked')?.value

            if (!name || checkedItems.length === 0 || !itemCode || !description || isNaN(price) || price <= 0 || !condition) {
                alert('Сите полиња мора да бидат пополнати, цената не смее да биде помала или еднаква на нула и барем еден предмет мора да биде избран.');
                return;
            }
            if (ads.some(ad => ad.itemCode === itemCode)) {
                alert('Предмет со тој код веќе постои');
                return;
            }

            price *= 1.1;

            const newAd = {name, checkedItems, itemCode, description, price, condition}
            ads.push(newAd);
            addAdToTable(newAd);
            updateActiveAdsCount();

            function addAdToTable(ad){
                const table = ad.condition === 'used' ? usedItemsTable : neverUsedItemsTable;
                const row = table.insertRow();
                row.innerHTML = `
                <td>${ad.name}</td>
                <td>${ad.checkedItems}</td>
                <td>${ad.price.toFixed(2)}</td>
                <td>${ad.itemCode}</td>
                <td>${extractCatalogNumber(ad.itemCode)}</td>
                <td><button class="soldBtn">Sold</button></td>
                `
                const soldBtn = row.querySelector('.soldBtn');
                soldBtn.addEventListener('click', function (){
                    row.style.background = 'yellow';
                    soldBtn.remove()
                    updateActiveAdsCount();
                })
            }
            function extractCatalogNumber(code){
                return code.replace(/[0-9!]/g, '')
            }

            function updateActiveAdsCount() {
                const count = document.querySelectorAll('.table-wrapper tbody tr:not([style])').length;
                activeAdsCount.textContent = count.toString();
            }
        })
    })
