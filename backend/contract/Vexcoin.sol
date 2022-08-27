// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract Vexcoin {
    /* Vexcoin */
    int vexcoin_amount = 100000000;
    address owner;

    constructor() {
        owner = msg.sender;
        User memory newUser = User("0", 0, 0, 0);
        users.push(newUser);
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    /* User */
    struct User {
        string private_key;
        int public_key;
        int balance;
        uint index;
    }
    
    User[] users;
    mapping(string => uint) private pv_users_map;
    mapping(int => uint) private pb_users_map;

    /* Item */
    struct Item {
      string id;
      string owner_private_key;  
    }

    mapping(string => Item) private items;

    /* Functions from here */

    function checkUserExists(string memory private_key) private view returns (bool){
        if (pv_users_map[private_key] != 0)
            return true;
        else return false;
    }

    function userByPrivateKey(string memory private_key) private view returns (User memory) {
        return users[pv_users_map[private_key]];
    }

    function userByPublicKey(int public_key) private view returns (User memory) {
        return users[pb_users_map[public_key]];
    }

    // Get user by private key
    function getUser(string memory private_key) public view returns (User memory) {
        User memory user = userByPrivateKey(private_key);

        // user must exist
        if (checkUserExists(private_key))
            return user;
        else revert ("User does not exist.");
    }

    // Add new user
    function addNewUser(string memory private_key, int public_key) public {
        // if user does not exist yet
        if (!checkUserExists(private_key)) {
            // get index for element that will be added
            uint index = users.length;

            // create instance of new user
            User memory newUser = User(private_key, public_key, 0, index);

            // add user to maps in order to find it after private or public keys
            pv_users_map[private_key] = index;
            pb_users_map[public_key] = index;

            // push new user to array
            users.push(newUser);
        } 
        // already there
        else revert ("User already exists.");
    }

    // Get Vexcoin data
    function getVexcoinData() public view returns (int, uint) {
        return (vexcoin_amount, users.length - 1);
    }

    // Transfer coins to user balance
    function sendVexcoins(int to_public_key, int amount) onlyOwner public {
        User memory user = userByPublicKey(to_public_key);

        // user must exist and number of coins to be bought must be available
        if (checkUserExists(user.private_key) && amount <= vexcoin_amount) {
            users[user.index].balance += amount;
            vexcoin_amount -= amount;
        } else revert ("User does not exist or no more coins available.");
    }

    // Get balance of user by public key, owner only
    function getBalance(int public_key) onlyOwner public view returns (int) {
        User memory user = userByPublicKey(public_key);

        // user must exist
        if (checkUserExists(user.private_key))
            return user.balance;
        else revert ("User does not exist.");
    }

    // Transfer coins between users
    function transferCoins(string memory from_private_key, int to_public_key, int amount) public {
        User memory user_from = userByPrivateKey(from_private_key);
        User memory user_to = userByPublicKey(to_public_key);

        // both users must exist
        if (checkUserExists(user_from.private_key) && checkUserExists(user_to.private_key)) {
            // from user must have available balance
            if (users[user_from.index].balance >= amount) {
                users[user_from.index].balance -= amount;
                users[user_to.index].balance += amount;
            } else revert ("Not enough money.");
        } else revert ("Users do not exist.");
    }

    // Get item by id
    function getItem(string memory itemId) public view returns (Item memory) {
        if (bytes(items[itemId].id).length != 0 ) {
            return items[itemId];
        } else revert ("Item does not exist.");
    }

    // Add and create new item
    function addNewItem(string memory itemId, string memory owner_private_key) public {
        User memory user = userByPrivateKey(owner_private_key);

        // user must exist
        if (checkUserExists(user.private_key)) {
            // item must not exist
            if (bytes(items[itemId].id).length == 0 ) {
                Item memory newItem = Item(itemId, owner_private_key);
                items[itemId] = newItem;
            } 
            // already there
            else revert ("Item already exists.");
        } else revert ("User does not exist.");
    }

    // Transfer items between users
    function transferItem(string memory itemId, string memory from_private_key, int to_public_key, int cost) public {
        User memory user_from = userByPrivateKey(from_private_key);
        User memory user_to = userByPublicKey(to_public_key);

        // both users must exist
        if (checkUserExists(user_from.private_key) && checkUserExists(user_to.private_key)) {
            // 'from' user must be different than 'to' user
            if (user_from.index != user_to.index) {
                // item owner must be 'from' user
                if (keccak256(bytes(items[itemId].owner_private_key)) == keccak256(bytes(user_from.private_key))) {
                    // user receving the item must have available balance to pay
                    if (users[user_to.index].balance >= cost) {
                        users[user_from.index].balance += cost;
                        users[user_to.index].balance -= cost;
                        items[itemId].owner_private_key = user_to.private_key;
                    } else revert ("Not enough balance.");
                } else revert ("User does not own this item.");
            } else revert ("Can't transfer to same user.");
        } else revert ("Users do not exist.");
    }
}
