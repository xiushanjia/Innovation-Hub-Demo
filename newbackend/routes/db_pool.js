const MongodbClient = require('mongodb').MongoClient;
const GenericPool = require('generic-pool');


const factory = {

    create: function() {//创建链接　　　　return MongodbClient.connect("mongodb://" + "localhost" + ":" + "27017", { useUnifiedTopology: true });　　　　//返回一个mongodb的client链接对象
    },
    destroy: function(client) {//销毁链接
        client.close();//关闭链接，这里需要注意，形参client就是上面我们创建的对象
    }
}
// 
const opts = {
    max: 10,//最大链接数
    min: 2//最小。。
}

const myPool = GenericPool.createPool(factory, opts);//就是在这里创建链接池

module.exports = myPool;//export给其他模块使用