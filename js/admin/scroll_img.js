Ext.onReady(function () {
    var fields = ['id', 'name', 'order', 'desc', 'type_id', 'mtime', 'desc'];
    var columns = [
        {
            header: "显示顺序", dataIndex: 'order'
        },
        {
            header: "名称", dataIndex: 'name'
        },
        {
            header: "模块", dataIndex: 'type_id'
        },
        {
            header: "图片", dataIndex: 'img'
        },
        {
            header: "跳转URL", dataIndex: 'url'
        },
        {
            header: "文字说明", dataIndex: 'desc'
        },
        {
            header: "最后修改时间", dataIndex: 'mtime',
            renderer: function (v) {
                var date = new Date(v * 1000);
                return moment(date).format('YYYY-MM-DD');
            }
        }
    ];

    new Tomtalk.Idc({
        module: 'scroll_img',
        fields: fields,
        columns: columns,
        renderTo: Ext.getBody()
    });
});

//end file