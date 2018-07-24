pragma solidity ^0.4.17;

contract GvCoin {
    struct Request {
        string description;
        uint value;
        address recipient_society;
        bool accepted;
    }
    
    struct Society{
        uint wealth;
        string name;
        uint id;
        address society_address;
    }
    
    Request[] public requests;
    Society[] public societies;
    address public admin;
    uint public gvconomy;
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }
    
    function issueGvCoins(uint amount, uint recipient_index) public {
        gvconomy = gvconomy + amount;
        societies[recipient_index].wealth = societies[recipient_index].wealth + amount;
    }
    
    function transferGvCoins(uint amount, uint sender_index, uint recipient_index) public {
        require(societies[sender_index].wealth >= amount);
        societies[sender_index].wealth = societies[sender_index].wealth - amount;
        societies[recipient_index].wealth = societies[recipient_index].wealth + amount;
    }
    
    function createRequest(string description, uint value, address recipient) public {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient_society: recipient,
            accepted: false
        });

        requests.push(newRequest);
    }
    
    function approveRequest(uint request_index, uint society_index, uint amount) public restricted {
        Request storage request = requests[request_index];
        request.accepted = true;
        issueGvCoins(amount, society_index);
    }
}