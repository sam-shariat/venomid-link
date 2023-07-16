const NftContract = {
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
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "gameManager",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
                        "type": "address"
                    },
                    {
                        "name": "remainOnNft",
                        "type": "uint128"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "json",
                        "type": "string"
                    },
                    {
                        "name": "indexDeployValue",
                        "type": "uint128"
                    },
                    {
                        "name": "indexDestroyValue",
                        "type": "uint128"
                    },
                    {
                        "name": "codeIndex",
                        "type": "cell"
                    }
                ],
                "outputs": []
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
                "name": "setData",
                "inputs": [
                    {
                        "name": "data",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getData",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "data",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "getName",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "name",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "getLength",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "length",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "burn",
                "inputs": [
                    {
                        "name": "dest",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeGameManager",
                "inputs": [
                    {
                        "name": "newGameManager",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeMetadataAccess",
                "inputs": [
                    {
                        "name": "metadataAccess",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getGameManager",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "gameManager",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getMetadataAccess",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "metadataAccess",
                        "type": "bool"
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
                "name": "resolveIndex",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "collection",
                        "type": "address"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": [
                    {
                        "name": "index",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "transfer",
                "inputs": [
                    {
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "name": "value",
                                "type": "uint128"
                            },
                            {
                                "name": "payload",
                                "type": "cell"
                            }
                        ],
                        "name": "callbacks",
                        "type": "map(address,tuple)"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeOwner",
                "inputs": [
                    {
                        "name": "newOwner",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "name": "value",
                                "type": "uint128"
                            },
                            {
                                "name": "payload",
                                "type": "cell"
                            }
                        ],
                        "name": "callbacks",
                        "type": "map(address,tuple)"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeManager",
                "inputs": [
                    {
                        "name": "newManager",
                        "type": "address"
                    },
                    {
                        "name": "sendGasTo",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "name": "value",
                                "type": "uint128"
                            },
                            {
                                "name": "payload",
                                "type": "cell"
                            }
                        ],
                        "name": "callbacks",
                        "type": "map(address,tuple)"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getInfo",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
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
                    },
                    {
                        "name": "collection",
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
        "data": [
            {
                "key": 1,
                "name": "_id",
                "type": "uint256"
            }
        ],
        "events": [
            {
                "name": "ChangeGameManager",
                "inputs": [
                    {
                        "name": "oldGameManager",
                        "type": "address"
                    },
                    {
                        "name": "newGameManager",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "ChangeMetadataAccess",
                "inputs": [
                    {
                        "name": "metadataAccess",
                        "type": "bool"
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
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "name": "collection",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "OwnerChanged",
                "inputs": [
                    {
                        "name": "oldOwner",
                        "type": "address"
                    },
                    {
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "ManagerChanged",
                "inputs": [
                    {
                        "name": "oldManager",
                        "type": "address"
                    },
                    {
                        "name": "newManager",
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
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "manager",
                        "type": "address"
                    },
                    {
                        "name": "collection",
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
                "name": "_id",
                "type": "uint256"
            },
            {
                "name": "_collection",
                "type": "address"
            },
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_manager",
                "type": "address"
            },
            {
                "name": "_json",
                "type": "string"
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
                "name": "_codeIndex",
                "type": "cell"
            },
            {
                "name": "_metadataAccess",
                "type": "bool"
            },
            {
                "name": "_gameManager",
                "type": "address"
            },
            {
                "name": "_btcAddress",
                "type": "string"
            },
            {
                "name": "_ethAddress",
                "type": "string"
            },
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_data",
                "type": "string"
            },
            {
                "name": "_length",
                "type": "uint256"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "8374a8d062340e342af548bb3064f311158937e8fcc9744cb9d39c023bb138e6",
};
module.exports = { NftContract };