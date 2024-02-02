function showItemDetails(itemId) {
    var modal = document.getElementById("itemDetailsModal");
    var itemImage = document.getElementById("itemImage");
    var itemName = document.getElementById("itemName");
    var itemPrice = document.getElementById("itemPrice");


    switch (itemId) {
        case 1:
            itemImage.src = "item1.jpg";
            itemName.textContent = "Item 1";
            itemPrice.textContent = "10.00";
            break;
        case 2:
            itemImage.src = "item2.jpg";
            itemName.textContent = "Item 2";
            itemPrice.textContent = "15.00";
            break;

    }

    modal.style.display = "block";
}


function closeItemDetailsModal() {
    var modal = document.getElementById("itemDetailsModal");
    modal.style.display = "none";
}

function purchaseItem() {
    alert("Purchase functionality not implemented.");
}

document.getElementById("searchInput").addEventListener("input", function() {
    var searchQuery = this.value.toLowerCase();
    var items = document.querySelectorAll(".item");

    items.forEach(function(item) {
        var itemName = item.dataset.name.toLowerCase();
        var itemPrice = item.dataset.price.toLowerCase();
        if (itemName.includes(searchQuery) || itemPrice.includes(searchQuery)) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});

document.getElementById("categorySelect").addEventListener("change", function() {
    var selectedCategory = this.value;
    var items = document.querySelectorAll(".item");

    items.forEach(function(item) {
        var itemCategory = item.dataset.category;
        if (selectedCategory === "all" || selectedCategory === itemCategory) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});
