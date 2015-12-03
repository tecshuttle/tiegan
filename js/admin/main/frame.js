Ext.BLANK_IMAGE_URL = "./js/ext/resources/images/default/s.gif";
/****************************
Ext Tip初始化
****************************/
Ext.QuickTips.init();
Ext.form.Field.prototype.msgTarget = 'qtip';

/****************************
Ext复制grid里某一列的值到粘贴板
****************************/
if (!Ext.grid.GridView.prototype.templates) {
	Ext.grid.GridView.prototype.templates = {};
}

Ext.grid.GridView.prototype.templates.cell = new Ext.Template(
	"<td class=\"x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}\" style=\"{style}\" tabIndex=\"0\" {cellAttr}>" ,
	"<div class=\"x-grid3-cell-inner x-grid3-col-{id}\" {attr}>{value}</div>" ,
	"</td>"
);

function cleanInfos(){
	Ext.getDom("msgDiv").innerHTML = "";
}

var Frame = function() {

	var baseCls = {
		user: "user",
		header: "header"
	};
	
	var menu_data = [];
	var sub_menu_data = [];
	
	var curUser;
	// 用户信息
	var user = new Ext.Panel({
		baseCls: baseCls.user
	});
	
	// 主菜单store
	var menuStore = new Ext.data.SimpleStore({   
		fields:["name", {
			name: "choose", type: "boolean"
		}],
		listeners: {
			"load": function(store, recs) {
				for (var i = 0; i < recs.length; i++) {
					if (recs[i].get("choose")) {
						menu.select(i);
						menu.fireEvent("click", menu, i);
					}
				}
			}
		}		
	})
	
	// 主菜单view
	var menu = new Ext.DataView({
		store: menuStore,
		scope: this,
		// item选择器   
		itemSelector: "li",   
		// 单选   
		singleSelect: true,   
		multiSelect: false,   
		// 选中样式   
		selectedClass: "x-tab-strip-active",   
		// 鼠标悬浮样式   
		overClass: "x-tab-strip-over",
		// 模板   
		tpl: new Ext.XTemplate(
			"<div class=\"x-tab-panel-header x-unselectable x-tab-panel-header-plain\" style=\"-moz-user-select: none; width:100%;\">",   
				"<div class=\"x-tab-strip-wrap\">",   
					"<ul class=\"x-tab-strip x-tab-strip-top\">",   
						"<tpl for=\".\">",   
						"<li class=\"\">",   
							"<a onclick=\"return false;\" class=\"x-tab-strip-close\"/>",   
							"<a onclick=\"return false;\" href=\"#\" class=\"x-tab-right\">",   
								"<em class=\"x-tab-left\">",   
									"<span class=\"x-tab-strip-inner\">",   
										"<span class=\"x-tab-strip-text \">{values.name}</span>",   
									"</span>",
								"</em>",
							"</a>",   
						"</li>",   
						"</tpl>",
						"<li class=\"x-tab-edge\"/><div class=\"x-clear\"/>",
					"</ul>",   
				"</div>",
				"<div class=\"x-tab-strip-spacer\"/>",   
			"</div>"  
		),
		listeners: {
			"click": function(dataview, index, node, e) {
				var node = new Ext.tree.AsyncTreeNode(sub_menu_data[index]);
				submenu.setRootNode(node);
			}
		}   
	});
	
	// 顶部视图层
	var header = new Ext.Panel({
		region: "north",
		baseCls: baseCls.header,
		border: true,
		width: "100%", 
		items: [{
			baseCls: "welcome",
			items: user
		}, menu]
		
	});
	
	var nodeIconCls = ".x-tree-node-collapsed .x-tree-node-icon, .x-tree-node-expanded .x-tree-node-icon, .x-tree-node-leaf .x-tree-node-icon";
	nodeIconCls += "{";
	nodeIconCls += "border: 0 none;";
	nodeIconCls += "height: 0px; /*空白部分高*/";
	nodeIconCls += "width: 0px;/*空白部分宽*/";	
	nodeIconCls += "margin: 0;";
	nodeIconCls += "padding: 0;";
	nodeIconCls += "vertical-align: top;";
	nodeIconCls += "background-position: center;";
	nodeIconCls += "background-repeat: no-repeat;";
	nodeIconCls += "}";
	Ext.util.CSS.createStyleSheet(nodeIconCls); 
	
	var submenu = new Ext.tree.TreePanel({
		shadow: true,
		region: "west",
		width: 110,
		minSize: 25,
		maxSize: 200,
		margins: "0 0 1 0",
		header: false,
		split: true,
		collapsed: false,
		collapsible: false,
		collapseFirst: false,
		animCollapse: false,
		animate: false,
		collapseMode: "mini",
		closable: true,
		
		rootVisible: false,
		lines: true,
		autoScroll: true,
		
		loader: new Ext.tree.TreeLoader({
   			preloadChildren: true,
   			clearOnLoad: false
   		}),
   		root: new Ext.tree.AsyncTreeNode(),
		listeners: {
			"click": function(node, e){
				if(node.isLeaf()){
					e.stopEvent();
					content.createNewTab(node.attributes.href, node.id, node.attributes.text);
				}
			}
		}
	});
	
	var content = new Ext.TabPanel({
		region: "center",
		minTabWidth: 135,
		maxTabWidth: 270,
		enableTabScroll: true,
		activeTab: 0,
		createNewTab: function(href, id, title){
			var id = "docs-" + id;
			var tab = this.getComponent(id);
			if (tab) {
				this.setActiveTab(tab);

			} else {
				var p = this.add(
					new Ext.Panel({
						id: id,
						title: title,
						closable: true,
						border: false,
						html: "<iframe id=\"iframe-" + id + "\"  name=\"iframe-" + id + "\" src=\"" + href + "\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"true\"></iframe>",
			            listeners : {
			                'beforedestroy' : function(o) {
//			                    var _id = o.id.substring(o.id.indexOf('-') + 1);
//			                    var el = document.getElementById("iframe-" + _id);
//			                    if(el){
//			                        el.src = 'about:blank';
//			                        try{
//			                            var iframe = el.contentWindow;
//			                            iframe.document.readyState="complete";
//			                            iframe.document.write('');
//			                            iframe.close();
//			                        }catch(e){};
//			                        el.parentNode.removeChild(el);
//			                    }
//			                    o.html=null;
//			                    mainTabs.remove(o);
			                }
			            }
					})
				);
				this.setActiveTab(p);
			}
		}
	});
	
	var footer = new Ext.Panel({
		region: "south",
		margins: "1 1 0 1",
		border: true,
		header: false,
		split: true,
		collapsed: false,
		collapsible: false,
		collapseFirst: false,
		enableTabScroll: true,
		animCollapse: false,
		animate: false,
		collapseMode: "mini",
		closable: true,
		height: 61,
		layout : 'border',
		items:[{
			height: 40,
			region: "center",
			xtype : 'panel',
			autoScroll : true,
			html: "<div id='msgDiv' style='float:left'></div><div style='float:right'><input type='button' style='width:80px' onclick='cleanInfos()' value='清空'/></div>"
		},{
			
			region: "south",
			xtype : 'panel',
			height : 20,
			items :[{
				id : 'help',
				xtype : 'panel',				
				listeners : {
					afterrender : function(p){
						p.getEl().dom.innerHTML = '';
					    var store = new Ext.data.JsonStore({
					        root: '',
					        autoLoad : true,
					        fields: [
								{name : 'title' , mapping : 'Post.title'},
								{name : 'url' , mapping : 'Post.url'},
								{name : 'category', mapping : 'Post.category'}
					        ],
					        proxy: new Ext.data.ScriptTagProxy({
					            url: 'http://km.oa.com/api/group/16028/articles'
					        }),
					        listeners : {
					        	load : function(ds,records,opts){
					        		if(records.length!==0){
										new marquee().run(records,50);
					        		}else{
					        			p.setVisible(false);			        			
					        		}
					        	}
					        }
					    });
	
					    var marquee = function(){
							var dh = Ext.DomHelper;
							var ul = dh.append('help', {tag: 'ul'});
							var tpl = dh.createTemplate({
								tag: 'li',
								html: '<a href="{href}" onclick="{click}">{text}</a>'
							});
							var id = '';			//计时器ID
							var el = null;			//ul标记
							var left = 0;			//列表的left
							var aniLeft = left;		//记录当前运动时的left
							var width = 0;			//列表的宽度
							
	
							 //初始化跑马灯数据
							var init = function(list){
								
								for(var i = 0,len=list.length; i < len; i++){
									var topic = list[i].data;
									if(topic.category==='ijobs使用说明' && /^【iJobs】/.test(topic.title)){
									    tpl.append(ul, {
									    	href :'javascript:void(0)',
									    	click : 'window.open(\''+ topic.url +'\')',
									    	text : topic.title
									    });
									}
								}
								el = Ext.select('ul',false,p.getEl().dom).first();
								left =el.getLeft();			//列表的left
								aniLeft = left;				//记录当前运动时的left
								width = p.getWidth();		//列表的宽度
	
							};
							//鼠标悬停
							var hover = function(id,speed) {
								el.on('mouseover',function(){
									clearInterval(id);
								});
								el.on('mouseleave',function(){
									id =setInterval(marquee, speed);
								});	
							};
							//跑马灯效果
							var marquee = function(){
								var li = Ext.select('li',false,p.getEl().dom);
								var fw = li.first().getWidth();
								aniLeft--;
								if(aniLeft === -fw){
									if(li.elements.length!==1){	
										var first = li.first();
										first = Ext.apply({},{
											tag : 'li',
											id : first.id,
											html : first.dom.innerHTML
										});
										li.first().remove();
										dh.insertAfter(li.last(), first);
										aniLeft = 0;
									}else{
										aniLeft = width;
									}
									
								}
								el.setLeft(aniLeft);
							}; 
							return {
								run : function(list,speed){
									init(list);
									id = setInterval(marquee, speed);
									hover(id,speed);
								}
							}
					    };
				
					}
				}
			}]}],
		
		insertMsg: function(msg,type){
			var myDate = new Date();     //获取当前时间
			if (2 == type) {
				msg = "<span style='color:#ff0000;'>" + msg + "</span>";
			}
			Ext.getDom("msgDiv").innerHTML = "[" + myDate.toLocaleString() + "]:" + msg + "</br>" + Ext.getDom("msgDiv").innerHTML ;
		}
	});
	
	var info = new Ext.Panel({
		region: "east",
		border: true,
		width: 140,
		header: false,
		split: true,
		collapsed: true,
		collapsible: false,
		collapseFirst: false,
		animCollapse: false,
		animate: false,
		collapseMode: "mini",
		margins: "1 1 0 1",
		closable: true,
		html: "<iframe src=\"./common/building.jsp\" width=\"100%\" height=\"100%\" frameborder=\"0\" scrolling=\"true\"></iframe>"
	});	
	
	var main = new Ext.Panel({
		region: "center",
		layout: "border",
		border: false,
		margins: "0 0 1 0",
		items: [content, footer, info]
	
	})
	
	
	
	return {
		
		setUser: function(html) {
			user.getEl().dom.innerHTML = html;
		},
		
		setCurUser: function(user) {
			curUser = user;
		},
		
		getCurUser: function() {
			return curUser;
		},
		
		setIndexPage: function(href, id, title) {
			content.createNewTab(href, id, title);
		},		
		
		setMenu: function(data, subdata) {
			menu_data = data;
			sub_menu_data = subdata;
			menu.getStore().loadData(menu_data);
		},
		
		insertMsg: function(msg,type){
			footer.insertMsg(msg,type);
		},
		
		createNewTab: function(href, id, title) {
			content.createNewTab(href, id, title);
		},
		
		getActiveTab: function() {
			return content.getActiveTab().getId();
		},
		
		closeTab: function(id) {
			content.remove(id);
		},
		
		setTabTitle: function(id, title) {
			content.getItem(id).setTitle(title);
		},
		
		getTabTitle: function(id) {
			return content.getItem(id).title;
		},
		
		getHeader: function() {
			return header;
		},
		
		getSubMenu: function() {
			return submenu;
		},
		
		getMain: function() {
			return main;
		}
	}
}();
