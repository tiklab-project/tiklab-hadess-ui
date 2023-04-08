
module.exports ={
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "> 1%",
                        "last 5 versions",
                        "ie >= 8"
                    ]
                }
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": [
        "@babel/plugin-transform-react-jsx",
        ["@babel/plugin-transform-arrow-functions"],
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "css"
        }],
        ["import", {
            "libraryName": "tiklab-plugin-manager-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-plugin-manager-ui/es/${fullName}`;
            }
        }, "tiklab-plugin-manager-ui"],
        ["import", {
            "libraryName": "tiklab-eam-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-eam-ui/es/${fullName}`;
            }
        },"tiklab-eam-ui"],

        ["import", {
            "libraryName": "tiklab-integration-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-integration-ui/es/${fullName}`;
            }
        }, "tiklab-integration-ui"],

        ["import", {
            "libraryName": "tiklab-message-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-message-ui/es/${fullName}`;
            }
        }, "tiklab-message-ui"],

        ["import", {
            "libraryName": "tiklab-todotask-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-todotask-ui/es/${fullName}`;
            }
        }, "tiklab-todotask-ui"],

        ["import", {
            "libraryName": "tiklab-security-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-security-ui/es/${fullName}`;
            }
        }, "tiklab-security-ui"],

        ["import", {
            "libraryName": "tiklab-widget-ui",
            "libraryDirectory": "es",
            "style": true,
        }, "tiklab-widget-ui"],

        ["import", {
            "libraryName": "tiklab-licence-ui",
            "libraryDirectory": "es",
            "style": true,
            "customName": (name) => {
                let split = name.split('-');
                const fullName = split.reduce((total, currentValue, currentIndex, arr) => {
                    if(currentIndex=== 0) {
                        return total += currentValue;
                    }
                    const UpBit = currentValue.slice(0,1).toUpperCase();
                    const lowBit = currentValue.slice(1,currentValue.length);
                    const name = UpBit + lowBit
                    return total += name;
                },'');
                return `tiklab-licence-ui/es/${fullName}`;
            }
        }, "tiklab-licence-ui"],
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose" : false }],
        ["dynamic-import-webpack"],
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-transform-runtime",
            {
                "regenerator": true
            }
        ],
        "@babel/plugin-transform-regenerator",
        "react-hot-loader/babel"
    ]
}
