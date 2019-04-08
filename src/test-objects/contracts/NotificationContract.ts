export const NotificationContract = {
    "_eth": {
        "_requestManager": {
            "provider": {
                "host": "http://localhost:8545",
                "timeout": 0
            },
            "polls": {},
            "timeout": null
        },
        "compile": {},
        "coinbase": "0x627306090abab3a6e1400e9345bc60c78a8bef57",
        "mining": true,
        "hashrate": 0,
        "syncing": false,
        "gasPrice": "20000000000",
        "accounts": [
            "0x627306090abab3a6e1400e9345bc60c78a8bef57",
            "0xf17f52151ebef6c7334fad080c5704d77216b732",
            "0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef",
            "0x821aea9a577a9b44299b9c15c88cf3087f3b5544",
            "0x0d1d4e623d10f9fba5db95830f7d3839406c6af2",
            "0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e",
            "0x2191ef87e392377ec08e7c08eb105ef5448eced5",
            "0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5",
            "0x6330a553fc93768f612722bb8c2ec78ac90b3bbc",
            "0x5aeda56215b167893e80b4fe645ba6d5bab767de"
        ],
        "blockNumber": 105,
        "protocolVersion": "63"
    },
    "transactionHash": null,
    "address": "0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4",
    "abi": [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_recipientId",
                    "type": "string"
                },
                {
                    "name": "_senderId",
                    "type": "string"
                },
                {
                    "name": "_text",
                    "type": "string"
                }
            ],
            "name": "sendMessage",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_recipientId",
                    "type": "string"
                },
                {
                    "name": "_senderId",
                    "type": "string"
                },
                {
                    "name": "_text",
                    "type": "string"
                }
            ],
            "name": "createMessage",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "myid",
                    "type": "bytes32"
                },
                {
                    "name": "result",
                    "type": "string"
                }
            ],
            "name": "__callback",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "myid",
                    "type": "bytes32"
                },
                {
                    "name": "result",
                    "type": "string"
                },
                {
                    "name": "proof",
                    "type": "bytes"
                }
            ],
            "name": "__callback",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getHour",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                },
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "getMessages",
            "outputs": [
                {
                    "name": "serialized",
                    "type": "bytes"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getWeekday",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                }
            ],
            "name": "createUser",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                },
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "markDeleted",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "year",
                    "type": "uint16"
                },
                {
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "name": "day",
                    "type": "uint8"
                },
                {
                    "name": "hour",
                    "type": "uint8"
                },
                {
                    "name": "minute",
                    "type": "uint8"
                }
            ],
            "name": "toTimestamp",
            "outputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                },
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "markRead",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getDay",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "date",
                    "type": "string"
                }
            ],
            "name": "getDateAsUnix",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "year",
                    "type": "uint16"
                },
                {
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "name": "day",
                    "type": "uint8"
                },
                {
                    "name": "hour",
                    "type": "uint8"
                }
            ],
            "name": "toTimestamp",
            "outputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                },
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "isRead",
            "outputs": [
                {
                    "name": "status",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getSecond",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "year",
                    "type": "uint16"
                },
                {
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "name": "day",
                    "type": "uint8"
                }
            ],
            "name": "toTimestamp",
            "outputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "year",
                    "type": "uint16"
                },
                {
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "name": "day",
                    "type": "uint8"
                },
                {
                    "name": "hour",
                    "type": "uint8"
                },
                {
                    "name": "minute",
                    "type": "uint8"
                },
                {
                    "name": "second",
                    "type": "uint8"
                }
            ],
            "name": "toTimestamp",
            "outputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                }
            ],
            "name": "getMessagesIds",
            "outputs": [
                {
                    "name": "serialized",
                    "type": "bytes"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getYear",
            "outputs": [
                {
                    "name": "",
                    "type": "uint16"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "registriesUsers",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_firebaseId",
                    "type": "string"
                },
                {
                    "name": "_id",
                    "type": "uint256"
                }
            ],
            "name": "isDeleted",
            "outputs": [
                {
                    "name": "status",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getMonth",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "year",
                    "type": "uint16"
                }
            ],
            "name": "isLeapYear",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "year",
                    "type": "uint256"
                }
            ],
            "name": "leapYearsBefore",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "month",
                    "type": "uint8"
                },
                {
                    "name": "year",
                    "type": "uint16"
                }
            ],
            "name": "getDaysInMonth",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "getMinute",
            "outputs": [
                {
                    "name": "",
                    "type": "uint8"
                }
            ],
            "payable": false,
            "stateMutability": "pure",
            "type": "function"
        }
    ]
}