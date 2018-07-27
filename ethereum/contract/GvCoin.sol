pragma solidity ^0.4.17;

contract GvCoin {
    struct Request {
        string description;
        uint value;
        address recipient_society;
        bool accepted;
    }
    
    struct Society {
        uint wealth;
        string name;
        address society_address;
    }
    
    Request[] public requests;
    Society[] public societies;
    address public admin;
    uint public gvconomy;
    mapping(string => uint) index_society_name;
    mapping(address => uint) index_society_address;
    
    modifier restricted() {
        require(msg.sender == admin);
        _;
    }
    
    constructor () public {
        admin = msg.sender;
    }
    
    function createSociety (string name, address society_address) public {
        Society memory newSociety = Society({
            name: name,
            wealth: 0,
            society_address: society_address
        });

        societies.push(newSociety);
        index_society_name[name] = societies.length - 1;
        index_society_address[society_address] = societies.length - 1;
    }
    
    function issueGvCoins(uint amount, uint recipient_index) private restricted {
        gvconomy = gvconomy + amount;
        societies[recipient_index].wealth = societies[recipient_index].wealth + amount;
    }
    
    function transferGvCoins(uint amount, uint sender_index, uint recipient_index) public {
        require(societies[sender_index].wealth >= amount);
        societies[sender_index].wealth = societies[sender_index].wealth - amount;
        societies[recipient_index].wealth = societies[recipient_index].wealth + amount;
    }
    
    function createRequest(string description, uint value, address recipient) public {
        require(value > 0);
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
    
    function destroyGvCoins(uint society_index, uint amount ) public restricted {
        societies[society_index].wealth = societies[society_index].wealth - amount;
        gvconomy = gvconomy - amount;
    }
    
    function getSocietyByName(string name) public view returns(uint) {
        return index_society_name[name];
    }
    
    function getSocietyByAddress(address society_address) public view returns(uint) {
        return index_society_address[society_address];
    }
}