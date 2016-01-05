Ext.onReady(function () {
    var fields = ['id', 'name', 'desc', 'value'];
    var columns = [
        {
            header: "ID", dataIndex: 'id', hidden: true
        },
        {
            header: "参数名称", dataIndex: 'name'
        },
        {
            header: "参数说明", dataIndex: 'desc'
        },
        {
            header: "参数值", dataIndex: 'value',
            renderer: function (v) {
                if (v.length > 40) {
                    return '内容过多，不显示。';
                } else {
                    return v;
                }
            }
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