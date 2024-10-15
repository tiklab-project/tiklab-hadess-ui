
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
            "libraryName": "thoughtware-plugin-manager-ui",
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
                return `thoughtware-plugin-manager-ui/es/${fullName}`;
            }
        }, "thoughtware-plugin-manager-ui"],
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
            "libraryName": "thoughtware-widget-ui",
            "libraryDirectory": "es",
            "style": true,
        }, "thoughtware-widget-ui"],
        ["import", {
            "libraryName": "tiklab-privilege-ui",
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
                return `tiklab-privilege-ui/es/${fullName}`;
            }
        }, "tiklab-privilege-ui"],
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
        "react-hot-loader/babel",
        "equire"
    ]
}
