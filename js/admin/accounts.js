Ext.onReady(function () {
    var fields = ['id', 'name', 'password'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "登入名", dataIndex: 'name'
        },
        {
            header: "密码", dataIndex: 'password'
        }
    ];

    new Tomtalk.Idc({
        module: 'admins',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file