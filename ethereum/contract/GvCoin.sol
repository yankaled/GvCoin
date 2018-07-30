pragma solidity ^0.4.17;

contract GvCoin {
    struct Request {
        string description;
        uint value;
        address recipient_society;
        string recipient_name;
        bool accepted;
    }
    
    struct Society {
        uint wealth;
        uint revenue_total;
        uint finance_total;
        string name;
        address society_address;
        uint[] revenue_series;
        uint[] finance_series;
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
            revenue_series: new uint[](0),
            finance_total: 0,
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
        societies[recipient_index].finance_total += amount;
        societies[recipient_index].finance_series.push(amount);
    }
    
    function transferGvCoins(uint amount, uint sender_index, uint recipient_index) public {
        require(societies[sender_index].wealth >= amount);
        societies[sender_index].wealth -= amount;
        societies[recipient_index].wealth += amount;
        societies[recipient_index].revenue_total += amount;
        societies[recipient_index].revenue_series.push(amount);
    }
    
    function createRequest(string description, uint value, address recipient) public {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient_society: recipient,
            recipient_name: societies[getSocietyByAddress(recipient)].name,
            accepted: false
        });

        requests.push(newRequest);
    }
    
    function approveRequest(uint request_index, string society_name, uint amount) 
    public restricted {
        Request storage request = requests[request_index];
        request.accepted = true;
        issueGvCoins(amount, getSocietyByName(society_name));
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
    
    function getFin(string society_name) public view returns(uint[]) {
        Society memory society = societies[getSocietyByName(society_name)];
        return society.finance_series;
    }
    
    function getRev(string society_name) public view returns(uint[]){
        Society memory society = societies[getSocietyByName(society_name)];
        return society.revenue_series;
    }
}