

const path = require('path');
const {merge} =require("webpack-merge")
const baseWebpackConfig = require("./webpack.base");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(baseWebpackConfig,{
    // 指定构建环境
    mode:"development",
    output:{
        path: path.resolve(__dirname, './dist'),
        filename: 'assets/js/[name].[hash].js',
        chunkFilename:'[name][chunkhash].js',
        publicPath: '/',
    },
    devtool: 'cheap-module-eval-source-map',
    // 插件
    plugins:[
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title:'Hadess',
            favicon:'./src/assets/images/img/hadess.png',
            template: path.resolve(__dirname, './public/index.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeAttributeQuotes: true
            }
        }),
    ],
    // 开发环境本地启动的服务配置
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        hot:true,
        compress:true,
        port:3030,
        host: '0.0.0.0',
        historyApiFallback: true,
        disableHostCheck: true,
        headers:{
           'Access-Control-Allow-Origin': "http://192.168.10.19:8083"
        }
    }
});
