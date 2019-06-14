pragma solidity >=0.4.24;

//Importing openzeppelin-solidity ERC-721 implemented Standard
import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

// StarNotary Contract declaration inheritance the ERC721 openzeppelin implementation
contract StarNotary is ERC721 {

    // Star data
    struct Star {
        string name;
    }

    // The smart contract tokens have a name and a symbol
    // A name and a symbol to the starNotary tokens has been added
    // name: Is a short name to the token
    // symbol: Is a short representative string
    string public constant name = "Star Token";
    string public constant symbol = "STR";
    

    // mapping the Star with the Owner Address
    mapping(uint256 => Star) public tokenIdToStarInfo;
    // mapping the TokenId and price
    mapping(uint256 => uint256) public starsForSale;

    
    // Create Star using the Struct
    function createStar(string memory _name, uint256 _tokenId) public { // Passing the name and tokenId as a parameters
        Star memory newStar = Star(_name); // Star is an struct so we are creating a new Star
        tokenIdToStarInfo[_tokenId] = newStar; // Creating in memory the Star -> tokenId mapping
        _mint(msg.sender, _tokenId); // _mint assign the the star with _tokenId to the sender address (ownership)
    }

    // Putting an Star for sale (Adding the star tokenid into the mapping starsForSale, first verify that the sender is the owner)
    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Star you don't own");
        starsForSale[_tokenId] = _price;
    }

    // Function that allows you to convert an address into a payable address
    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }

    function buyStar(uint256 _tokenId) public  payable {
        require(starsForSale[_tokenId] > 0, "The Star should be up for sale");
        uint256 starCost = starsForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > starCost, "You need to have enough Ether");
        // We can't use _addTokenTo or_removeTokenFrom functions, now we have to use _transferFrom
        _transferFrom(ownerAddress, msg.sender, _tokenId);
        // We need to make this conversion to be able to use transfer() function to transfer ethers
        address payable ownerAddressPayable = _make_payable(ownerAddress);
        ownerAddressPayable.transfer(starCost);
        if(msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }
    }

    // A function lookUptokenIdToStarInfo has been added that looks up the stars using the Token ID,
    // and then returns the name of the star.
    function lookUptokenIdToStarInfo (uint _tokenId) public view returns (string memory) {
        // The Star saved in tokenIdToStarInfo mapping is returned
        return tokenIdToStarInfo[_tokenId].name;
    }

    // A function called exchangeStars has been added that allows two users to exchange their star tokens.
    function exchangeStars(uint256 _tokenId1, uint256 _tokenId2) public {
        // Check that the owner of _tokenId1 or _tokenId2 is the sender
        require(ownerOf(_tokenId1) == msg.sender || ownerOf(_tokenId2) == msg.sender,
         "StarNotary: You cannot exchange a Star that you don't own"
        );
        // The owner of both tokens is obtained (ownerOf(_tokenId1), ownerOf(_tokenId2))
        address ownerAddress1 = ownerOf(_tokenId1);
        address ownerAddress2 = ownerOf(_tokenId2);
        require(ownerAddress1 != ownerAddress2, "StarNotary: You cannot exchange a Star with yourself.");
        // The function _transferFrom is used to exchange the tokens
        _transferFrom(ownerAddress1, ownerAddress2, _tokenId1);
        _transferFrom(ownerAddress2, ownerAddress1, _tokenId2);
    }

    // A function to Transfer a Star is implemented that transfers a star from the address of the caller.
    // The function accepts two arguments, the address to transfer the star to, and the token ID of the star.
    function transferStar(address _to1, uint256 _tokenId) public {
        // Check that the sender is the ownerOf(_tokenId)
        require(ownerOf(_tokenId) == msg.sender, "StarNotary: You cannot transfer a Star that you don't own");
        // The function transferFrom(from, to, tokenId) is used to transfer the Star
        _transferFrom(msg.sender, _to1, _tokenId);
    }

}