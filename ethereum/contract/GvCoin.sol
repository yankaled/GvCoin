pragma solidity ^0.4.17;
pragma experimental ABIEncoderV2;

contract GvCoin {
    struct Request {
        string description;
        uint value;
        address recipient_society;
        bool accepted;
    }
    
    struct Society {
        uint wealth;
        uint revenue_total;
        uint finance;
        uint[] revenue_series;
        uint[] finance_series;
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
            revenue_total: 0,
            finance: 0,
            revenue_series: new uint[](0),
            finance_series: new uint[](0),
            wealth: 0,
            society_address: society_address
        });

        societies.push(newSociety);
        index_society_name[name] = societies.length - 1;
        index_society_address[society_address] = societies.length - 1;
    }
    
    function issueGvCoins(uint amount, uint recipient_index) private restricted {
        gvconomy += amount;
        societies[recipient_index].wealth += amount;
        societies[recipient_index].finance_series.push(amount);
    }
    
    function transferGvCoins(uint amount, uint sender_index, uint recipient_index) public {
        require(societies[sender_index].wealth >= amount);
        societies[sender_index].wealth -= amount;
        societies[recipient_index].wealth += amount;
        societies[recipient_index].revenue_series.push(amount);
        societies[recipient_index].revenue_total += amount; 
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
    
    function getRequestsLength() public view returns(uint) {
        return requests.length;
    }
    
    function getSocietiesLength() public view returns(uint) {
        return societies.length;
    }
    
    function getSocieties() public view returns (uint[], uint[], string[], address[]) {
        uint l = societies.length;
        uint[] memory wealths = new uint[](l);
        uint[] memory revs = new uint[](l);
        string[] memory names = new string[](l);
        address[] memory addrs = new address[](l);
        
        
        for (uint i = 0; i < l; i++) {
            wealths[i] = societies[i].wealth;
            revs[i] = societies[i].revenue_total;
            names[i] = societies[i].name;
            addrs[i] = societies[i].society_address;
        }
        
        return (wealths, revs, names, addrs);
    }
    
    function getRequests() public view returns (string[], uint[], address[], bool[]) {
        uint l = societies.length;
        string[] memory descs = new string[](l);
        uint[] memory values = new uint[](l);
        address[] memory recs_socs = new address[](l);
        bool[] memory accs = new bool[](l);
        
        
        for (uint i = 0; i < l; i++) {
            descs[i] = requests[i].description;
            values[i] = requests[i].value;
            recs_socs[i] = requests[i].recipient_society;
            accs[i] = requests[i].accepted;
        }
        
        return (descs, values, recs_socs, accs);
    }
}