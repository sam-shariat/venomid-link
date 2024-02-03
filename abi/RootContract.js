const RootContract = {
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
                        "name": "domainCode",
                        "type": "cell"
                    },
                    {
                        "name": "subdomainCode",
                        "type": "cell"
                    },
                    {
                        "name": "indexBasisCode",
                        "type": "cell"
                    },
                    {
                        "name": "indexCode",
                        "type": "cell"
                    },
                    {
                        "name": "json",
                        "type": "string"
                    },
                    {
                        "name": "platformCode",
                        "type": "cell"
                    },
                    {
                        "name": "dao",
                        "type": "address"
                    },
                    {
                        "name": "admin",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "name": "maxNameLength",
                                "type": "uint32"
                            },
                            {
                                "name": "maxPathLength",
                                "type": "uint32"
                            },
                            {
                                "name": "minDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "maxDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "graceFinePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "startZeroAuctionFee",
                                "type": "uint128"
                            }
                        ],
                        "name": "config",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "longPrice",
                                "type": "uint128"
                            },
                            {
                                "name": "shortPrices",
                                "type": "uint128[]"
                            },
                            {
                                "name": "onlyLettersFeePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "needZeroAuctionLength",
                                "type": "uint32"
                            }
                        ],
                        "name": "priceConfig",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "auctionRoot",
                                "type": "address"
                            },
                            {
                                "name": "tokenRoot",
                                "type": "address"
                            },
                            {
                                "name": "duration",
                                "type": "uint32"
                            }
                        ],
                        "name": "auctionConfig",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "startZeroAuction",
                                "type": "uint32"
                            },
                            {
                                "name": "expiring",
                                "type": "uint32"
                            },
                            {
                                "name": "grace",
                                "type": "uint32"
                            }
                        ],
                        "name": "durationConfig",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getPath",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "path",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "getDetails",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "tld",
                        "type": "string"
                    },
                    {
                        "name": "dao",
                        "type": "address"
                    },
                    {
                        "name": "active",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "getConfigs",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "maxNameLength",
                                "type": "uint32"
                            },
                            {
                                "name": "maxPathLength",
                                "type": "uint32"
                            },
                            {
                                "name": "minDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "maxDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "graceFinePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "startZeroAuctionFee",
                                "type": "uint128"
                            }
                        ],
                        "name": "config",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "longPrice",
                                "type": "uint128"
                            },
                            {
                                "name": "shortPrices",
                                "type": "uint128[]"
                            },
                            {
                                "name": "onlyLettersFeePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "needZeroAuctionLength",
                                "type": "uint32"
                            }
                        ],
                        "name": "priceConfig",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "auctionRoot",
                                "type": "address"
                            },
                            {
                                "name": "tokenRoot",
                                "type": "address"
                            },
                            {
                                "name": "duration",
                                "type": "uint32"
                            }
                        ],
                        "name": "auctionConfig",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "name": "startZeroAuction",
                                "type": "uint32"
                            },
                            {
                                "name": "expiring",
                                "type": "uint32"
                            },
                            {
                                "name": "grace",
                                "type": "uint32"
                            }
                        ],
                        "name": "durationConfig",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "checkName",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "correct",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "expectedPrice",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "price",
                        "type": "uint128"
                    },
                    {
                        "name": "needZeroAuction",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "expectedRegisterAmount",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "duration",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "resolve",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "path",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "certificate",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "expectedCertificateCodeHash",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "target",
                        "type": "address"
                    },
                    {
                        "name": "sid",
                        "type": "uint16"
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
                "name": "buildRegisterPayload",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "buildRenewPayload",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "buildStartZeroAuctionPayload",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    }
                ],
                "outputs": [
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "onAcceptTokensTransfer",
                "inputs": [
                    {
                        "name": "value0",
                        "type": "address"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "name": "value3",
                        "type": "address"
                    },
                    {
                        "name": "value4",
                        "type": "address"
                    },
                    {
                        "name": "payload",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "zeroAuctionInitialBid",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "auction",
                        "type": "address"
                    },
                    {
                        "name": "initialAmount",
                        "type": "uint128"
                    },
                    {
                        "name": "initialOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "returnTokensFromDomain",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "amount",
                        "type": "uint128"
                    },
                    {
                        "name": "recipient",
                        "type": "address"
                    },
                    {
                        "name": "reason",
                        "type": "uint8"
                    }
                ],
                "outputs": []
            },
            {
                "name": "deploySubdomain",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "name": "owner",
                                "type": "address"
                            },
                            {
                                "name": "creator",
                                "type": "address"
                            },
                            {
                                "name": "expireTime",
                                "type": "uint32"
                            },
                            {
                                "name": "parent",
                                "type": "address"
                            },
                            {
                                "name": "renewable",
                                "type": "bool"
                            }
                        ],
                        "name": "setup",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "confiscate",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "reason",
                        "type": "string"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "reserve",
                "inputs": [
                    {
                        "name": "paths",
                        "type": "string[]"
                    },
                    {
                        "name": "reason",
                        "type": "string"
                    },
                    {
                        "name": "owner",
                        "type": "optional(address)"
                    }
                ],
                "outputs": []
            },
            {
                "name": "betaReg",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "domainOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "migrate",
                "inputs": [
                    {
                        "name": "paths",
                        "type": "string[]"
                    },
                    {
                        "name": "domainOwner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "unreserve",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "reason",
                        "type": "string"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "name": "price",
                        "type": "uint128"
                    },
                    {
                        "name": "expireTime",
                        "type": "uint32"
                    },
                    {
                        "name": "needZeroAuction",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "activate",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "deactivate",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "burnBalance",
                "inputs": [
                    {
                        "name": "amount",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "syncBalance",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "changePriceConfig",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "longPrice",
                                "type": "uint128"
                            },
                            {
                                "name": "shortPrices",
                                "type": "uint128[]"
                            },
                            {
                                "name": "onlyLettersFeePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "needZeroAuctionLength",
                                "type": "uint32"
                            }
                        ],
                        "name": "priceConfig",
                        "type": "tuple"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeConfigs",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "maxNameLength",
                                "type": "uint32"
                            },
                            {
                                "name": "maxPathLength",
                                "type": "uint32"
                            },
                            {
                                "name": "minDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "maxDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "graceFinePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "startZeroAuctionFee",
                                "type": "uint128"
                            }
                        ],
                        "name": "config",
                        "type": "optional(tuple)"
                    },
                    {
                        "components": [
                            {
                                "name": "auctionRoot",
                                "type": "address"
                            },
                            {
                                "name": "tokenRoot",
                                "type": "address"
                            },
                            {
                                "name": "duration",
                                "type": "uint32"
                            }
                        ],
                        "name": "auctionConfig",
                        "type": "optional(tuple)"
                    },
                    {
                        "components": [
                            {
                                "name": "startZeroAuction",
                                "type": "uint32"
                            },
                            {
                                "name": "expiring",
                                "type": "uint32"
                            },
                            {
                                "name": "grace",
                                "type": "uint32"
                            }
                        ],
                        "name": "durationConfig",
                        "type": "optional(tuple)"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeAdmin",
                "inputs": [
                    {
                        "name": "admin",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "changeDao",
                "inputs": [
                    {
                        "name": "dao",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "upgradeToLatest",
                "inputs": [
                    {
                        "name": "sid",
                        "type": "uint16"
                    },
                    {
                        "name": "destination",
                        "type": "address"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "upgradeToSpecific",
                "inputs": [
                    {
                        "name": "sid",
                        "type": "uint16"
                    },
                    {
                        "name": "destination",
                        "type": "address"
                    },
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "version",
                        "type": "tuple"
                    },
                    {
                        "name": "code",
                        "type": "cell"
                    },
                    {
                        "name": "params",
                        "type": "cell"
                    },
                    {
                        "name": "remainingGasTo",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "setVersionActivation",
                "inputs": [
                    {
                        "name": "sid",
                        "type": "uint16"
                    },
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "version",
                        "type": "tuple"
                    },
                    {
                        "name": "active",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "createNewDomainVersion",
                "inputs": [
                    {
                        "name": "minor",
                        "type": "bool"
                    },
                    {
                        "name": "code",
                        "type": "cell"
                    },
                    {
                        "name": "params",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "createNewSubdomainVersion",
                "inputs": [
                    {
                        "name": "minor",
                        "type": "bool"
                    },
                    {
                        "name": "code",
                        "type": "cell"
                    },
                    {
                        "name": "params",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "upgrade",
                "inputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getSIDs",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "sids",
                        "type": "uint16[]"
                    }
                ]
            },
            {
                "name": "getSlaveData",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "sid",
                        "type": "uint16"
                    }
                ],
                "outputs": [
                    {
                        "name": "code",
                        "type": "cell"
                    },
                    {
                        "name": "params",
                        "type": "cell"
                    },
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "latest",
                        "type": "tuple"
                    },
                    {
                        "name": "versionsCount",
                        "type": "uint32"
                    }
                ]
            },
            {
                "name": "getSlaveVersions",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "sid",
                        "type": "uint16"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "versions",
                        "type": "tuple[]"
                    }
                ]
            },
            {
                "name": "getSlaveVersion",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    },
                    {
                        "name": "sid",
                        "type": "uint16"
                    },
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "version",
                        "type": "tuple"
                    }
                ],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "hash",
                                "type": "uint256"
                            },
                            {
                                "name": "active",
                                "type": "bool"
                            }
                        ],
                        "name": "data",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "onWalletDeployed",
                "inputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "getToken",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "token",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getWallet",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "wallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "getBalance",
                "inputs": [
                    {
                        "name": "answerId",
                        "type": "uint32"
                    }
                ],
                "outputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "onReceiveBalance",
                "inputs": [
                    {
                        "name": "balance",
                        "type": "uint128"
                    }
                ],
                "outputs": []
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
                        "name": "support",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "onMint",
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
                        "name": "creator",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "onBurn",
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
                "name": "calcAddress",
                "inputs": [
                    {
                        "name": "stateInit",
                        "type": "cell"
                    }
                ],
                "outputs": [
                    {
                        "name": "value0",
                        "type": "address"
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
                "name": "_totalSupply",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_totalSupply",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "_nftCode",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_nftCode",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "_indexBasisCode",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_indexBasisCode",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "_indexCode",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_indexCode",
                        "type": "cell"
                    }
                ]
            },
            {
                "name": "_json",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_json",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "_token",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_token",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "_wallet",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_wallet",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "_balance",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_balance",
                        "type": "uint128"
                    }
                ]
            },
            {
                "name": "_randomNonce",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_randomNonce",
                        "type": "uint256"
                    }
                ]
            },
            {
                "name": "_tld",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_tld",
                        "type": "string"
                    }
                ]
            },
            {
                "name": "_dao",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_dao",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "_admin",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_admin",
                        "type": "address"
                    }
                ]
            },
            {
                "name": "_active",
                "inputs": [],
                "outputs": [
                    {
                        "name": "_active",
                        "type": "bool"
                    }
                ]
            },
            {
                "name": "_config",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "maxNameLength",
                                "type": "uint32"
                            },
                            {
                                "name": "maxPathLength",
                                "type": "uint32"
                            },
                            {
                                "name": "minDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "maxDuration",
                                "type": "uint32"
                            },
                            {
                                "name": "graceFinePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "startZeroAuctionFee",
                                "type": "uint128"
                            }
                        ],
                        "name": "_config",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "_priceConfig",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "longPrice",
                                "type": "uint128"
                            },
                            {
                                "name": "shortPrices",
                                "type": "uint128[]"
                            },
                            {
                                "name": "onlyLettersFeePercent",
                                "type": "uint128"
                            },
                            {
                                "name": "needZeroAuctionLength",
                                "type": "uint32"
                            }
                        ],
                        "name": "_priceConfig",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "_auctionConfig",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "auctionRoot",
                                "type": "address"
                            },
                            {
                                "name": "tokenRoot",
                                "type": "address"
                            },
                            {
                                "name": "duration",
                                "type": "uint32"
                            }
                        ],
                        "name": "_auctionConfig",
                        "type": "tuple"
                    }
                ]
            },
            {
                "name": "_durationConfig",
                "inputs": [],
                "outputs": [
                    {
                        "components": [
                            {
                                "name": "startZeroAuction",
                                "type": "uint32"
                            },
                            {
                                "name": "expiring",
                                "type": "uint32"
                            },
                            {
                                "name": "grace",
                                "type": "uint32"
                            }
                        ],
                        "name": "_durationConfig",
                        "type": "tuple"
                    }
                ]
            }
        ],
        "data": [
            {
                "key": 1,
                "name": "_randomNonce",
                "type": "uint256"
            },
            {
                "key": 2,
                "name": "_tld",
                "type": "string"
            }
        ],
        "events": [
            {
                "name": "Renewed",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "ZeroAuctionStarted",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "auction",
                        "type": "address"
                    },
                    {
                        "name": "initialAmount",
                        "type": "uint128"
                    }
                ],
                "outputs": []
            },
            {
                "name": "Confiscated",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "reason",
                        "type": "string"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "Reserved",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "reason",
                        "type": "string"
                    }
                ],
                "outputs": []
            },
            {
                "name": "Registered",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "Unreserved",
                "inputs": [
                    {
                        "name": "path",
                        "type": "string"
                    },
                    {
                        "name": "reason",
                        "type": "string"
                    },
                    {
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "outputs": []
            },
            {
                "name": "DomainCodeUpgraded",
                "inputs": [
                    {
                        "name": "newVersion",
                        "type": "uint16"
                    }
                ],
                "outputs": []
            },
            {
                "name": "CodeUpgraded",
                "inputs": [],
                "outputs": []
            },
            {
                "name": "NewVersion",
                "inputs": [
                    {
                        "name": "sid",
                        "type": "uint16"
                    },
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "version",
                        "type": "tuple"
                    },
                    {
                        "name": "hash",
                        "type": "uint256"
                    },
                    {
                        "name": "initial",
                        "type": "bool"
                    }
                ],
                "outputs": []
            },
            {
                "name": "SetActivation",
                "inputs": [
                    {
                        "components": [
                            {
                                "name": "major",
                                "type": "uint32"
                            },
                            {
                                "name": "minor",
                                "type": "uint32"
                            }
                        ],
                        "name": "version",
                        "type": "tuple"
                    },
                    {
                        "name": "active",
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
                "name": "_totalSupply",
                "type": "uint128"
            },
            {
                "name": "_nftCode",
                "type": "cell"
            },
            {
                "name": "_indexBasisCode",
                "type": "cell"
            },
            {
                "name": "_indexCode",
                "type": "cell"
            },
            {
                "name": "_json",
                "type": "string"
            },
            {
                "name": "_token",
                "type": "address"
            },
            {
                "name": "_wallet",
                "type": "address"
            },
            {
                "name": "_balance",
                "type": "uint128"
            },
            {
                "name": "_slaves",
                "type": "optional(cell)"
            },
            {
                "name": "_randomNonce",
                "type": "uint256"
            },
            {
                "name": "_tld",
                "type": "string"
            },
            {
                "name": "_dao",
                "type": "address"
            },
            {
                "name": "_admin",
                "type": "address"
            },
            {
                "name": "_active",
                "type": "bool"
            },
            {
                "components": [
                    {
                        "name": "maxNameLength",
                        "type": "uint32"
                    },
                    {
                        "name": "maxPathLength",
                        "type": "uint32"
                    },
                    {
                        "name": "minDuration",
                        "type": "uint32"
                    },
                    {
                        "name": "maxDuration",
                        "type": "uint32"
                    },
                    {
                        "name": "graceFinePercent",
                        "type": "uint128"
                    },
                    {
                        "name": "startZeroAuctionFee",
                        "type": "uint128"
                    }
                ],
                "name": "_config",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "name": "longPrice",
                        "type": "uint128"
                    },
                    {
                        "name": "shortPrices",
                        "type": "uint128[]"
                    },
                    {
                        "name": "onlyLettersFeePercent",
                        "type": "uint128"
                    },
                    {
                        "name": "needZeroAuctionLength",
                        "type": "uint32"
                    }
                ],
                "name": "_priceConfig",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "name": "auctionRoot",
                        "type": "address"
                    },
                    {
                        "name": "tokenRoot",
                        "type": "address"
                    },
                    {
                        "name": "duration",
                        "type": "uint32"
                    }
                ],
                "name": "_auctionConfig",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "name": "startZeroAuction",
                        "type": "uint32"
                    },
                    {
                        "name": "expiring",
                        "type": "uint32"
                    },
                    {
                        "name": "grace",
                        "type": "uint32"
                    }
                ],
                "name": "_durationConfig",
                "type": "tuple"
            }
        ]
    },
    tvc: "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",
    code: "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",
    codeHash: "6354aad03f64eb7788649f5a6e42477a1151f9963644496d1929961128206fe8",
};
module.exports = { RootContract };