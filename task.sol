pragma solidity ^0.8.0;

contract ECommerce {
    address public owner;
    uint256 public totalItems;
    mapping(uint256 => Item) public items;
    mapping(address => uint256) public balances;

    struct Item {
        string name;
        string description;
        uint256 price;
        bool available;
    }

    event ItemAdded(uint256 indexed itemId, string name, uint256 price);
    event ItemPurchased(uint256 indexed itemId, address buyer, uint256 amountPaid);
    event Withdraw(address indexed recipient, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addItem(string memory _name, string memory _description, uint256 _price) external onlyOwner {
        totalItems++;
        items[totalItems] = Item(_name, _description, _price, true);
        emit ItemAdded(totalItems, _name, _price);
    }

    function purchaseItem(uint256 _itemId) external payable {
        require(_itemId <= totalItems && _itemId > 0, "Invalid item id");
        require(items[_itemId].available, "Item not available");
        require(msg.value >= items[_itemId].price, "Insufficient funds");

        balances[owner] += msg.value;
        items[_itemId].available = false;
        emit ItemPurchased(_itemId, msg.sender, msg.value);
    }

    function withdraw(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient contract balance");
        payable(owner).transfer(_amount);
        emit Withdraw(owner, _amount);
    }

    receive() external payable {}
}
