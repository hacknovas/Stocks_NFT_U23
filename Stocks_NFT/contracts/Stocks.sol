// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ShareToken is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct Share {
        string companyName;
        uint256 totalShares;
        uint256 availableShares;
        uint256 sharePrice;
    }

    Share[] public shares; //display all compay share
    mapping(uint256 => address) public shareOwners; //owner of that tokenID
    mapping(address => uint256) public dividends;

    mapping(address => uint256[]) public SharesOwnedByUser;

    constructor() ERC721("Share Token", "STK") {}

    // user

    function createShare(
        string memory _companyName,
        uint256 _totalShares,
        uint256 _sharePrice
    ) public onlyOwner {
        shares.push(
            Share({
                companyName: _companyName,
                totalShares: _totalShares,
                availableShares: _totalShares,
                sharePrice: _sharePrice
            })
        );
    }

    function buyShare(uint256 _shareIndex) public payable {
        require(_shareIndex < shares.length, "Invalid share index");
        require(msg.value > 0, "Value must be greater than 0");
        Share storage share = shares[_shareIndex];
        require(share.availableShares > 0, "No shares available");

        uint256 sharePrice = share.sharePrice;
        uint256 numSharesToBuy = msg.value / sharePrice;

        require(
            numSharesToBuy > 0 && numSharesToBuy <= share.availableShares,
            "Invalid share amount"
        );

        uint256 cost = numSharesToBuy * sharePrice;
        uint256 change = msg.value - cost;

        for (uint256 i = 0; i < numSharesToBuy; i++) {
            uint256 tokenId = _tokenIdCounter.current();
            _mint(msg.sender, tokenId);
            shareOwners[tokenId] = msg.sender;
            _tokenIdCounter.increment();
        }

        if (change > 0) {
            payable(msg.sender).transfer(change); // Refund excess payment
        }

        share.availableShares -= numSharesToBuy;

        // Distribute dividends to the previous shareholder
        uint256 dividend = cost / share.totalShares;
        address previousShareholder = shareOwners[
            _tokenIdCounter.current() - numSharesToBuy - 1
        ];
        if (previousShareholder != address(0)) {
            dividends[previousShareholder] += dividend;
        }
    }

    function transferShare(uint256 _tokenId, address _to) public {
        require(ownerOf(_tokenId) == msg.sender, "You do not own this share");
        require(_to != address(0), "Invalid address");
        require(
            shareOwners[_tokenId] != _to,
            "Share already owned by the recipient"
        );

        safeTransferFrom(msg.sender, _to, _tokenId);
        shareOwners[_tokenId] = _to;
    }

    function withdrawDividends() public {
        uint256 dividendAmount = dividends[msg.sender];
        require(dividendAmount > 0, "No dividends to withdraw");

        dividends[msg.sender] = 0;
        payable(msg.sender).transfer(dividendAmount);
    }

    function getAllSharesOwnedByUser(
        address user
    ) public view returns (uint256[] memory) {
        return SharesOwnedByUser[user];
    }

    // to get details of share of company
    function getShareInfo(
        uint256 _shareIndex
    ) public view returns (string memory, uint256, uint256, uint256) {
        require(_shareIndex < shares.length, "Invalid share index");
        Share storage share = shares[_shareIndex];
        return (
            share.companyName,
            share.totalShares,
            share.availableShares,
            share.sharePrice
        );
    }

    function getAllCompanyShares() public view returns (Share[] memory) {
        return shares;
    }
}
