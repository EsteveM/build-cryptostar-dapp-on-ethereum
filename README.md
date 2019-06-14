# Build CryptoStar Dapp on Ethereum

This project is intended to add further functionality to an already existing Dapp on Ethereum. It builds on the Dapp whose code can be downloaded from [here](https://s3.amazonaws.com/video.udacity-data.com/topher/2019/January/5c51c4c0_project-5-starter-code/project-5-starter-code.zip). The Dapp implements a star notary smart contract, where the information about people's favourite stars in the sky can be managed by means of the blockchain. Using the preexisting functionality, a star can be created, put up for sale, and bought.

## Table of Contents

* [Some key data](#some-key-data)
* [Description of the Project](#description-of-the-project)
* [Getting Started](#getting-started)
* [Contributing](#contributing)

## Some key data

In this section, some important data is specified:

* Truffle version used in this project: Truffle v5.0.20 (core: 5.0.20).
* OpenZeppelin version used in this project: openzeppelin-solidity@2.3.0.
* ERC-721 token name: "Star Token".
* ERC-721 token symbol: "STR".
* “Token Address” on the Rinkeby Network: 0xcE0597B9E65698f76Fbcd72cEd4136dBD15Ce9b7 (contract address).

## Description of the Project

As has already been mentioned, this project adds further functionality to a Dapp which implements a star notary smart contract. The work that has been done is best described by explaining its main areas:

### Addition of smart contract functions

A number of functions have been added to the smart contract:

* A name and a symbol are added to the starNotary tokens.

* A function lookUptokenIdToStarInfo is added, that looks up a stars using its corresponding token ID. It then returns the name of the star.

* A function exchangeStars is added, which makes it possible for two users to exchange their star tokens. 

* A function to transfer a star is added, which transfers a star, given its token ID, from the address of the sender to the destination address.

### Addition of supporting unit tests

A number of unit tests have been added:

* It is checked that the token name and token symbol are added properly.

* It is checked that indeed two users can exchange their stars.

* It is checked that star tokens can be transferred from the address of the sender to the destination address.

* It is checked that the information of a star is correctly obtained.

### Deployment of the smart contract to the Rinkeby public test network

The file *truffle-config.js* is configured so that the contract can be deployed to Rinkeby.

### Modification of the front end of the Dapp

A new front end function is written so that when the button "Look Up a Star" is clicked, the information of the star is shown.

### README update

This step creates the README file that you are viewing right now.

## Getting Started

The procedure to obtain functional a copy of the project on your local machine so that you can further develop and/or test it is explained in this section:

* Firstly, you have to download/clone the project files from this repository onto your local machine.
* Secondly, type `npm init` on a terminal shell window. You can accept all defaults. Then, type `npm install --save truffle-hdwallet-provider` to install *truffle-hdwallet-provider* and `npm install --save openzeppelin-solidity` to install *openzeppelin-solidity*. 
* Thirdly, to run the supporting unit tests, you have to:
    * Type `truffle develop` on the terminal shell window. This will start *Truffle Develop* on *http://127.0.0.1:9545/*. 
    * Import at least two accounts from the list shown by *Truffle Develop* into your [Metamask](https://metamask.io/). Note that the *http://127.0.0.1:9545/* address must also be set in Metamask so that the private network can be accessed.
    * Back on the terminal shell window (note the prompt is now *truffle(develop)*)), type `compile`. This compiles the smart contract. After that, type `migrate --reset`. This deploys the smart contract on the private network.
    * Now you can run the unit tests by simply typing `test` on the terminal shell window.
* In the fourth place, to run the front end of the Dapp, you have to:
    * Open a new terminal shell window, and cd into the *app* folder, by typing `cd app/`. After that, type `npm install` (only for the first time), and then `npm run dev`. This last command starts the *webpack-dev-server* on *http://localhost:8080/*.
    * Open that address in your browser to access the front end of the Dapp.
* Finally, if you want to deploy the smart contract to Rinkeby by yourself, you have to:
    * Configure the *truffle-config.js* file to support the deployment of the contract to Rinkeby. To do that, you must firstly type your *[Infura](https://infura.io/) Project ID* in `const infuraKey = "<Infura PROJECT ID>";`. After that, type your *Metamask mnemonic* in `const mnemonic = "<METAMASK SEED>";`. Then, your *Infura key* for Rinkeby in `https://rinkeby.infura.io/v3/${infuraKey}`.
    * Back on the terminal shell window, the command to deploy the smart contract to Rinkeby is `truffle migrate --reset --network rinkeby`.

## Contributing

This repository contains all the work that makes up the project. Individuals and I myself are encouraged to further improve this project. As a result, I will be more than happy to consider any pull requests.


