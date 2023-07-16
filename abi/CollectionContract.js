const CollectionContract = {
    abi: {
        "ABI version": 2,
        "version": "2.2",
        "header": [
            "pubkey",
            "time",
            "expire"
        ],
        "functions": [
            {
                "name": "constructor",
                "inputs": [
                    {
                        "name": "codeNft",
                        "type": "cell"
                    },
                    {
                        "name": "codeIndex",
                        "type": "cell"
                    },
                    {
                        "name": "codeIndexBasis",
                        "type": "cell"
                    },
                    {
                        "name": "ownerPubkey",
                        "type": "uint256"
                    },
                    {
                        "name": "json",
                        "type": "string"
                    },
                    {
                        "name": "mintingFee",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "mintNft",
                "inputs": [
                    {
                        "name": "json",
                        "type": "string"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPrimaryName",
                "inputs": [
                    {
                        "name": "_owner",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "nftAddress",
                                "type": "address"
                            },
                            {
                                "name": "name",
                                "type": "string"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "nameExists",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getInfoByName",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "nftAddress",
                                "type": "address"
                            },
                            {
                                "name": "name",
                                "type": "string"
                            },
                            {
                                "name": "owner",
                                "type": "address"
                            }
                        ],
                        "name": "value0",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "isValidUsername",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "calculateMintingFee",
                "inputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "setPrimaryName",
                "inputs": [
                    {
                        "name": "_nftAddress",
                        "type": "address"
                    },
                    {
                        "name": "_name",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "withdraw",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    },
                    {
                        "name": "value",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onTokenBurned",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setRemainOnNft",
                "inputs": [
                    {
                        "name": "remainOnNft",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setMintingFee",
                "inputs": [
                    {
                        "name": "mintingFee",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "mintingFee",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "owner",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "pubkey",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "transferOwnership",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "indexBasisCode",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "indexBasisCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "hash",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "resolveIndexBasis",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "indexBasis",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "indexCode",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "indexCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "hash",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "getJson",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "json",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "totalSupply",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "count",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "nftCode",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "nftCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "codeHash",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "nftAddress",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "id",
                        "type": "uint256"
                    }
                ],
                "outputs": [
                    {
                        "name": "nft",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "supportsInterface",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "interfaceID",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "bool"
                    }
                ]
            }
        ],
        "data": [],
        "events": [
            {
                "name": "OwnershipTransferred",
                "inputs": [
                    {
                        "name": "oldOwner",
                        "type": "uint256"
                    },
                    {
                        "name": "newOwner",
                        "type": "uint256"
                    }
                ],
                "outputs": []
            },
            {
                "name": "NftCreated",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "name": "creator",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "NftBurned",
                "inputs": [
                    {
                        "name": "id",
                        "type": "uint256"
                    },
                    {
                        "name": "nft",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    }
                ],
                "outputs": []
            }
        ],
        "fields": [
            {
                "name": "_pubkey",
                "type": "uint256"
            },
            {
                "name": "_timestamp",
                "type": "uint64"
            },
            {
                "name": "_constructorFlag",
                "type": "bool"
            },
            {
                "name": "_supportedInterfaces",
                "type": "optional(cell)"
            },
            {
                "name": "_codeNft",
                "type": "cell"
            },
            {
                "name": "_totalSupply",
                "type": "uint128"
            },
            {
                "name": "_json",
                "type": "string"
            },
            {
                "name": "_codeIndex",
                "type": "cell"
            },
            {
                "name": "_codeIndexBasis",
                "type": "cell"
            },
            {
                "name": "_indexDeployValue",
                "type": "uint128"
            },
            {
                "name": "_indexDestroyValue",
                "type": "uint128"
            },
            {
                "name": "_deployIndexBasisValue",
                "type": "uint128"
            },
            {
                "name": "_owner",
                "type": "uint256"
            },
            {
                "name": "_remainOnNft",
                "type": "uint128"
            },
            {
                "name": "_lastTokenId",
                "type": "uint128"
            },
            {
                "name": "_mintingFee",
                "type": "uint128"
            },
            {
                "name": "names",
                "type": "optional(cell)"
            },
            {
                "components": [
                    {
                        "name": "nftAddress",
                        "type": "address"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "name": "primaries",
                "type": "map(address,tuple)"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "11da273755b99cfca4e9908f1625b432c2151889916ee5cfc8c8b798128612b6",
};
module.exports = { CollectionContract };