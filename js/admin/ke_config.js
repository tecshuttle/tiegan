 ke_config = {
    value: '',
    resizable: {
        content: true
    },
    encoded: false,
    tools: [
        "bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter", "justifyRight",
        "justifyFull", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink",
        "unlink", "insertImage", "subscript", "superscript", "createTable", "addRowAbove", "addRowBelow",
        "addColumnLeft", "addColumnRight", "deleteRow", "deleteColumn", "viewHtml", "formatting",
        "cleanFormatting", "fontSize", "foreColor", "backColor", "print",
        {
            name: "fontName",
            items: [
                {text: "Times New Roman", value: "Times New Roman"},
                {text: "Arial", value: "Arial"},
                {text: "Arial Bold Italic", value: "Arial Bold Italic"},
                {text: "Arial Black", value: "Arial Black"},
                {text: "Arial Narrow", value: "Arial Narrow"},
                {text: "宋体", value: "SimSun"},
                {text: "黑体", value: "SimHei"},
                {text: "微软雅黑", value: "Microsoft YaHei"},
                {text: "微软正黑体", value: "Microsoft JhengHei"},
                {text: "新宋体", value: "NSimSun"},
                {text: "新细明体", value: "PMingLiU"},
                {text: "细明体", value: "MingLiU"},
                {text: "标楷体", value: "DFKai-SB"},
                {text: "仿宋", value: "FangSong"},
                {text: "楷体", value: "KaiTi"},
                {text: "仿宋_GB2312", value: "FangSong_GB2312"},
                {text: "楷体_GB2312", value: "KaiTi_GB2312"}

            ]
        }
    ],
    imageBrowser: {
        messages: {
            dropFilesHere: "Drop files here"
        },
        transport: {
            read: "/editor.php?type=1",
            destroy: {
                url: "/editor.php?type=2",
                type: "POST"
            },
            create: {
                url: "/editor.php?type=3",
                type: "POST"
            },
            thumbnailUrl: "/ImageBrowser/Thumbnail",
            uploadUrl: "editor.php?type=4",
            imageUrl: "/ImageBrowser/Image/{0}"
        }
    }
}

//end file
