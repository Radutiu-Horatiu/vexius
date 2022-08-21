// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Vexcoin {
    // Vexcoin
    int vexcoin_amount = 100000000;
    int total_users = 0;

    // Vexius user
    struct User {
        string id;
        int balance;
    }

    // Item
    struct Item {
      string id;
      string ownerId;  
    }

    // user map id to specific user
    mapping(string => User) private users;

    // item map id to specific item
    mapping(string => Item) private items;

    // get user by id
    function getUser(string memory id) public view returns (User memory) {
        if (bytes(users[id].id).length != 0 ) {
            return users[id];
        } else revert ("User does not exist.");
    }

    // add new user
    function addNewUser(string memory id) public {
        // create new user
        if (bytes(users[id].id).length == 0 ) {
            User memory newUser = User(id, 0);
            users[id] = newUser;
            total_users += 1;
        } 
        // already there
        else revert ("User already exists.");
    }

    // get Vexcoin data
    function getVexcoinData() public view returns (int, int) {
        return (vexcoin_amount, total_users);
    }

    // transfer coins to user balance
    function buyVexcoins(string memory id, int amount) public {
        // user must exist and number of coins to be bought must be available
        if (bytes(users[id].id).length != 0 && amount <= vexcoin_amount) {
            users[id].balance += amount;
            vexcoin_amount -= amount;
        } else revert ("User does not exist or no more coins available.");
    }

    // transfer coins between users
    function transferCoins(string memory from, string memory to, int amount) public {
        // both users must exist
        if (bytes(users[from].id).length != 0 && bytes(users[to].id).length != 0) {
            // from user must have available balance
            if (users[from].balance >= amount) {
                users[from].balance -= amount;
                users[to].balance += amount;
            } else revert ("Not enough money.");
        } else revert ("Users do not exist.");
    }

    // get item by id
    function getItem(string memory itemId) public view returns (Item memory) {
        if (bytes(items[itemId].id).length != 0 ) {
            return items[itemId];
        } else revert ("Item does not exist.");
    }

    // add and create new item
    function addNewItem(string memory itemId, string memory ownerId) public {
        // create new item
        if (bytes(items[itemId].id).length == 0 ) {
            Item memory newItem = Item(itemId, ownerId);
            items[itemId] = newItem;
        } 
        // already there
        else revert ("Item already exists.");
    }

    // transfer items between users
    function transferItem(string memory itemId, string memory from, string memory to, int cost) public {
        // both users must exist
        if (bytes(users[from].id).length != 0 && bytes(users[to].id).length != 0) {
            // 'from' user must be different than 'to' user
            if (keccak256(bytes(users[from].id)) != keccak256(bytes(users[to].id))) {
                // item owner must be 'from' user
                if (keccak256(bytes(items[itemId].ownerId)) == keccak256(bytes(users[from].id))) {
                    // 'to' user must have available balance
                    if (users[to].balance >= cost) {
                        users[from].balance += cost;
                        users[to].balance -= cost;
                        items[itemId].ownerId = users[to].id;
                    } else revert ("Not enough balance.");
                } else revert ("User does not own this item.");
            } else revert ("Cant transfer to same user.");
        } else revert ("Users do not exist.");
    }
}
