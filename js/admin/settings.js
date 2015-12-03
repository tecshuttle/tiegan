Ext.onReady(function () {
    var fields = ['id', 'name', 'desc', 'value'];
    var columns = [
        {
            header: "ID", dataIndex: 'id'
        },
        {
            header: "参数名称", dataIndex: 'name'
        },
        {
            header: "参数说明", dataIndex: 'desc'
        },
        {
            header: "参数值", dataIndex: 'value'
        }
    ];

    new Tomtalk.Idc({
        module: 'site_settings',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file