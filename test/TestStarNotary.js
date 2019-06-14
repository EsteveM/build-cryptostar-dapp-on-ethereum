const StarNotary = artifacts.require("StarNotary");

var accounts;
var owner;

contract('StarNotary', (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('can Create a Star', async() => {
    let tokenId = 1;
    let instance = await StarNotary.deployed();
    await instance.createStar('Awesome Star!', tokenId, {from: accounts[0]})
    assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
});

it('lets user1 put up their star for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let starId = 2;
    let starPrice = web3.utils.toWei(".01", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    assert.equal(await instance.starsForSale.call(starId), starPrice);
});

it('lets user1 get the funds after the sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 3;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
    await instance.buyStar(starId, {from: user2, value: balance});
    let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
    let value1 = Number(balanceOfUser1BeforeTransaction) + Number(starPrice);
    let value2 = Number(balanceOfUser1AfterTransaction);
    assert.equal(value1, value2);
});

it('lets user2 buy a star, if it is put up for sale', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 4;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance});
    assert.equal(await instance.ownerOf.call(starId), user2);
});

it('lets user2 buy a star and decreases its balance in ether', async() => {
    let instance = await StarNotary.deployed();
    let user1 = accounts[1];
    let user2 = accounts[2];
    let starId = 5;
    let starPrice = web3.utils.toWei(".01", "ether");
    let balance = web3.utils.toWei(".05", "ether");
    await instance.createStar('awesome star', starId, {from: user1});
    await instance.putStarUpForSale(starId, starPrice, {from: user1});
    let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2);
    const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2);
    await instance.buyStar(starId, {from: user2, value: balance, gasPrice:0});
    const balanceAfterUser2BuysStar = await web3.eth.getBalance(user2);
    let value = Number(balanceOfUser2BeforeTransaction) - Number(balanceAfterUser2BuysStar);
    assert.equal(value, starPrice);
});

// The token name and token symbol are added properly
it('can add the star name and star symbol properly', async() => {
    // A Star with different tokenId is created
    let instance = await StarNotary.deployed();
    let tokenId = 6;
    await instance.createStar('Awesome Star for Token 6!', tokenId, {from: accounts[0]})
    // The name and symbol properties in the Smart Contract are called and compared to
    // the name and symbol provided
    assert.equal(await instance.name.call(), 'Star Token');
    assert.equal(await instance.symbol.call(), 'STR');
});

// Two users can exchange their stars
it('lets 2 users exchange stars', async() => {
    // Two Stars with different tokenId are created
    let instance = await StarNotary.deployed();
    let user1 = accounts[0];
    let user2 = accounts[1];
    let tokenId1 = 7;
    let tokenId2 = 8;
    await instance.createStar('Awesome Star for Token 7!', tokenId1, {from: user1});
    await instance.createStar('Awesome Star for Token 8!', tokenId2, {from: user2});
    // The exchangeStars function implemented in the Smart Contract is used
    await instance.exchangeStars(tokenId1, tokenId2, {from: user1});
    // It is verified that the owners change
    assert.equal(await instance.ownerOf(tokenId1), user2);
    assert.equal(await instance.ownerOf(tokenId2), user1);
});

// Star Tokens can be transferred from one address to another
it('lets a user transfer a star', async() => {
    // A Star with different tokenId is created
    let instance = await StarNotary.deployed();
    let user1 = accounts[0];
    let user2 = accounts[1];
    let tokenId = 9;
    await instance.createStar('Awesome Star for Token 9!', tokenId, {from: user1});
    // The transferStar function implemented in the Smart Contract is used
    await instance.transferStar(user2, tokenId, {from: user1});
    // It is verified that the star owner change.
    assert.equal(await instance.ownerOf(tokenId), user2);
});

// Information of a star is correctly obtained
it('lookUptokenIdToStarInfo test', async() => {
    // A Star with different tokenId is created
    let instance = await StarNotary.deployed();
    let user = accounts[0];
    let tokenId = 10;
    await instance.createStar('Awesome Star for Token 10!', tokenId, {from: user});
    // The method lookUptokenIdToStarInfo is called
    let starName = await instance.lookUptokenIdToStarInfo(tokenId, {from: user});
    // It is verified that the Star name is the same
    assert.equal(starName, 'Awesome Star for Token 10!');
});