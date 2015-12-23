<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>产品详情</title>
<base href="/">
<!-- style base -->
<link rel="stylesheet" href="css/base.css">
<!-- style font awesome -->
<link rel="stylesheet" href="css/font-awesome.min.css">
<link href="css/floatmenu.css" type="text/css" rel="stylesheet">
<!-- style layout -->
<link rel="stylesheet" type="text/css" href="css/layout.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
<style>
body {
    font-size: 12px;
    font-family: "微软雅黑", Arial, Helvetica, sans-serif;
}

.big {
    float: left;
    margin-bottom: 40px;
    width: 100%;
}

.width_1210 {
    margin: 0 auto;
    width: 1160px;
}

.mb_menu {
    float: left;
    width: 1210px;
    padding: 10px 0;
}

.mb_menu a {
    color: #464646;
    text-decoration: none;
}

.mb_menu a:hover {
    color: #f60;
}

.wen_con .bs_data {
    padding-top: 0;
}

.wen_con .bs_data li,
.wen_con .bs_data li span {
    font-size: 13px;
    color: #555;
}

.wen_con .bs_data li strong {
    color: #f00;
}

.wen_con p {
    float: left;
    margin-top: 20px;
    font-size: 13px;
    color: #555;
}

.wen_con .ticket_sm dt,
.wen_con .ticket_sm dd {
    font-size: 13px;
}

.nr_list .list_con {
    padding: 0 0 0 20px;
    width: 825px;
}

.table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #000;
}

.table td {
    padding: 10px 0;
    text-align: center;
    border: 1px solid #000;
    font-size: 16px;
    font-weight: bold;
}

.wen_con {
    width: 510px;
}

.wen_con .bs_data {
    width: 510px;
}

.pic_con {
    width: 608px;
}

.proSlide {
    float: right;
    width: 620px;
    padding: 8px;
    border: 1px solid #ccc;
}

.proSlide img {
    vertical-align: top;
}

.gy-thumb-list {
    margin-top: -9px;
}

.gy-thumb-list li {
    margin-top: 9px;
}

.nr_list .list_con p {
    font-size: 13px;
    color: #444;
}

.nr_list .list_con p strong {
    font-size: 15px;
    color: #000;
}

.nr_nav span {
    padding: 0 10px;
}

.nr_list .list_tit {
    padding: 6px 0 6px 35px;
}

.nr_list .list_con dl {
    margin-top: 10px;
}

.nr_list .list_con dt {
    font-size: 15px;
    color: #000;
}

.nr_list .list_con > img {
    display: block;
    margin: 10px auto 0;
}

.nr_list .list_con a {
    color: #f00;
    cursor: pointer;
}

.accommodation dl:first-child {
    margin-top: 0;
}

.accommodation dd {
    margin-top: 10px;
    margin-left: -10px;
}

.accommodation dd img {
    float: left;
    margin-left: 10px;
    vertical-align: top;
}

.nr_nav {
    background: #f60;
}

.nr_nav span.on {
    color: #f60;
}

.nr_list .list_tit {
    padding-left: 0;
    color: #f60;
    background: none;
}

.nr_list i {
    display: inline-block;
    vertical-align: 0;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    color: #f60;
}

.zw-footer {
    clear: both;
}

.ticket_show_head {
    background: #fff;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
}

.nr_con,
.xg_sidle_box .con, .xg_sidle_box .txt_con,
.hezuo_box {
    background: #fff;
}
</style>
<script type="text/javascript" src="js/jquery-1.9.1.js"></script>
<script type="text/javascript" src="js/product_detail.js"></script>
</head>

<body>
<!-- inner header start -->
<div class="q-layer-header">
    <?php $this->load->view('mini_header') ?>
</div>
<!-- inner header end -->

<div class="big">
<div class="width_1210">
<!-- breadcrumb -->
<div class="mb_menu">
    当前位置：<a href="#">首页</a> &gt; <a href="/equipments">朝圣</a> &gt; <?= $match->name ?>
</div>
<!-- product detail head -->
<div class="ticket_show_head">
    <div class="show_bt">
        <h1><a href="/match/<?= $match->id ?>"><?= $match->name ?></a></h1>
    </div>
    <div class="tw_box">
        <div class="wen_con">
            <ul class="bs_data">
                <li><span>服务天数：</span><?= $match->travel_long ?></li>
                <?php if (!empty($match->tag_id)) : ?>
                    <li><span>服务主题：</span><?= $match->tag_name ?></li>
                <?php endif; ?>
                <li><span>价格：</span><strong><?= $match->price ?>元起</strong></li>
            </ul>
            <p>*铁杆体育根据不同球迷的需求将赛事按照影响力程度进行划分并提供不同服务等级的选择,价格因此随之改变。</p>
            <dl class="ticket_sm">
                <dt>铁杆服务的特点：</dt>
                <dd>
                    1、极致贴心的专业球迷体验服务，支持到全程的足球体验
                </dd>
                <dd>
                    2、超高性价比球迷观赛产品服务，支持全网比价划算到底
                </dd>
            </dl>
        </div>
        <div class="proSlide clearfix">
            <div class="gy-image fl">
                <img src="<?= $match->cover1 ?>" width="484" height="272" alt="">
            </div>
            <div class="gy-nav fr">
                <div class="gy-thumbs">
                    <ul class="gy-thumb-list">
                        <input type="hidden" id="p_length" value="3">
                        <li>
                            <a href="javascript:void(0);" id="p_1">
                                <img src="<?= $match->cover1 ?>" width="128" height="84"
                                     data-num="0">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="p_2">
                                <img src="<?= $match->cover2 ?>" width="128" height="84"
                                     data-num="1">
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" id="p_3">
                                <img src="<?= $match->cover3 ?>" width="128" height="84"
                                     data-num="2">
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- product detail content -->
<div class="ticket_show_con">
<!-- left content -->
<div class="column_left_con">
<!--门票类型-->
<div class="ticket_nr_js">
<div class="nr_nav" id="detail-tab" style="position:static; z-index:999;">
    <span rel="fwlb" class="on">服务列表</span>
    <span rel="sct">赛程图</span>
    <span rel="qpwzjs">球票位置介绍</span>
    <span rel="zsjs">住宿介绍</span>
    <span rel="tjxc">推荐行程</span>
    <span rel="zffs">支付方式</span>
    <span rel="yytk">预约条款</span>
    <span rel="qxtk">取消条款</span>
    <span rel="ydxz">预定须知</span>
    <span rel="spfs">送票方式</span>
</div>
<div class="nr_con" id="tab_content">
<div class="nr_list" tabrel="fwlb" id="fwlb">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>服务列表</div>
    <div class="list_con">
        <?= $match->service_list ?>

        <table class="table" style="margin-top:10px;">
            <tbody>
            <tr>
                <td rowspan="2"></td>
                <td colspan="2">土豪</td>
                <td colspan="2">小资</td>
                <td colspan="2">屌丝</td>
            </tr>
            <tr>
                <td>双人出游</td>
                <td>单房差</td>
                <td>双人出游</td>
                <td>单房差</td>
                <td>双人出游</td>
                <td>单房差</td>
            </tr>
            <tr>
                <td>S级赛事</td>
                <td><?= $match->prices1 ?>元/人</td>
                <td><?= $match->prices2 ?>元/人</td>
                <td><?= $match->prices3 ?>元/人</td>
                <td><?= $match->prices4 ?>元/人</td>
                <td><?= $match->prices5 ?>元/人</td>
                <td><?= $match->prices6 ?>元/人</td>
            </tr>
            <tr>
                <td>A级赛事</td>
                <td><?= $match->pricea1 ?>元/人</td>
                <td><?= $match->pricea2 ?>元/人</td>
                <td><?= $match->pricea3 ?>元/人</td>
                <td><?= $match->pricea4 ?>元/人</td>
                <td><?= $match->pricea5 ?>元/人</td>
                <td><?= $match->pricea6 ?>元/人</td>
            </tr>
            <tr>
                <td>B级赛事</td>
                <td><?= $match->priceb1 ?>元/人</td>
                <td><?= $match->priceb2 ?>元/人</td>
                <td><?= $match->priceb3 ?>元/人</td>
                <td><?= $match->priceb4 ?>元/人</td>
                <td><?= $match->priceb5 ?>元/人</td>
                <td><?= $match->priceb6 ?>元/人</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
<div class="nr_list" tabrel="sct" id="sct">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>赛程图</div>
    <div class="list_con">
        <?= $match->schedule ?>
    </div>
</div>
<div class="nr_list" tabrel="qpwzjs" id="qpwzjs">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>球票位置介绍</div>
    <div class="list_con">
        <table>
            <tbody>
            <tr>
                <td rowspan="6">
                    <table>
                        <tbody>
                        <tr>
                            <td><img alt="" src="<?= $match->seat0 ?>" width="340"/></td>
                        </tr>
                        <tr>
                            <td><?= $match->seat_desc ?></td>
                        </tr>
                        </tbody>
                    </table>
                </td>
                <td width="10"></td>
                <td>土豪级座位视野</td>
                <td width="10"></td>
                <td></td>
                <td width="10"></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><img alt="" src="<?= $match->seat1 ?>" width="150"/></td>
                <td></td>
                <td><img alt="" src="<?= $match->seat2 ?>" width="150"/></td>
                <td></td>
                <td><img alt="" src="<?= $match->seat3 ?>" width="150"/></td>
            </tr>
            <tr>
                <td></td>
                <td>小资级座位视野</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><img alt="" src="<?= $match->seat4 ?>" width="150"/></td>
                <td></td>
                <td><img alt="" src="<?= $match->seat5 ?>" width="150"/></td>
                <td></td>
                <td><img alt="" src="<?= $match->seat6 ?>" width="150"/></td>
            </tr>
            <tr>
                <td></td>
                <td>屌丝级座位视野</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td><img alt="" src="<?= $match->seat7 ?>" width="150"/></td>
                <td></td>
                <td><img alt="" src="<?= $match->seat8 ?>" width="150"/></td>
                <td></td>
                <td><img alt="" src="<?= $match->seat9 ?>" width="150"/></td>
            </tr>
            </tbody>
        </table>
        <?= $match->seat_position ?>
    </div>
</div>
<div class="nr_list accommodation" tabrel="zsjs" id="zsjs">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>住宿介绍</div>
    <div class="list_con">
        <dl>
            <dt>屌丝级住宿服务安排（经济型旅舍&华人球迷之家）</dt>
            <dd class="clearfix">
                <img src="<?= $match->hotel1 ?>" width="267" alt=""/>
                <img src="<?= $match->hotel2 ?>" width="267" alt=""/>
                <img src="<?= $match->hotel3 ?>" width="267" alt=""/>
            </dd>
        </dl>
        <dl>
            <dt>小资级住宿服务安排（三星级或国际连锁品牌酒店）</dt>
            <dd class="clearfix">
                <img src="<?= $match->hotel4 ?>" width="267" alt=""/>
                <img src="<?= $match->hotel5 ?>" width="267" alt=""/>
                <img src="<?= $match->hotel6 ?>" width="267" alt=""/>
            </dd>
        </dl>
        <dl>
            <dt>土豪级住宿服务安排（国际四星级或以上品牌酒店）</dt>
            <dd class="clearfix">
                <img src="<?= $match->hotel7 ?>" width="267" alt=""/>
                <img src="<?= $match->hotel8 ?>" width="267" alt=""/>
                <img src="<?= $match->hotel9 ?>" width="267" alt=""/>
            </dd>
        </dl>
        <p style="margin-top:6px;">*具体酒店名字不可指定</p>

        <?= $match->hotel_condition ?>
    </div>
</div>
<div class="nr_list" tabrel="tjxc" id="tjxc">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>推荐行程</div>
    <div class="list_con">
        <?= $match->trip_recommend ?>
    </div>
</div>
<div class="nr_list" tabrel="zffs" id="zffs">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>支付方式</div>
    <div class="list_con">
        <p>目前只接受银行、支付宝转账的方式。</p>
    </div>
</div>
<div class="nr_list" tabrel="yytk" id="yytk">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>预约条款</div>
    <div class="list_con">
        <p>提前32天预订按照正常价格，同时享受赠送服务。</p>

        <p>提前15-31天预订加收25%</p>

        <p>提前7-15天预订加收50%</p>

        <p>比赛开始前一周之内不接受预订</p>
    </div>
</div>
<div class="nr_list" tabrel="qxtk" id="qxtk">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>取消条款</div>
    <div class="list_con">
        <p>比赛日前32天取消，收取10%手续费，赠送物品不再退回</p>

        <p>比赛日前31日至15日取消，收取50%手续费</p>

        <p>比赛日前14日至当日取消，收取100%手续费</p>
    </div>
</div>
<div class="nr_list" tabrel="ydxz" id="ydxz">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>预订须知</div>
    <div class="list_con">
        <p>1、比赛日期及时间以联赛官方公布时间为准，一般比赛前3-6周公布具体赛程时间；</p>

        <p>2、如遇不可抗力，如天气、赛事调整、自然灾害等导致赛程变更，已购买产品球迷希望退团，根据取消条款退还相关费用；</p>

        <p>3、球票预订无法提供准确看台号及座位号，仅提供座位区域；</p>

        <p>4、球票保证两两相连，三人及三人以上出行，我们尽力安排连坐，但不能保证；</p>

        <p>5、球场检票入场时可能需提供您的护照信息，请随身携带并妥善保管；</p>

        <p>6、球票可能为纸质票（包括电子票）或会员卡。如收到球票为会员卡，观看比赛后请将会员卡归还至酒店前台；如收到球票为纸质票，则无需归还；</p>
    </div>
</div>
<div class="nr_list" tabrel="spfs" id="spfs">
    <div class="list_tit"><i class="fa fa-paper-plane"></i>送票方式</div>
    <div class="list_con">
        <p>送票方式可能为两种：酒店前台或电子票；</p>

        <p>1、如为电子票，会在出发前14日通过邮件形式发送至邮箱；</p>

        <p>2、如为酒店前台取票，球票将在比赛前1日送至客户入住的酒店，客户持护照领取。</p>
    </div>
</div>
</div>
</div>
</div>
<!-- side -->
<div class="show_sidle">
    <?php if (count($match->relative_product) > 0): ?>
        <div class="xg_sidle_box">
            <div class="xg_tit">
                <h3>热门赛事门票推荐</h3>
            </div>
            <div class="txt_con">
                <ul>
                    <?php foreach ($match->relative_product as $r): ?>
                        <li>
                            <p>
                                <a href="/match/<?= $r->id ?>" target="_blank"><?= $r->name ?></a>
                                <span>日期：2015年12月21日 20:00:00</span>
                                <span>地点：英格兰 | 伦敦 | 酋长球场</span>
                                <em><b>¥2420</b>起</em>
                            </p>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    <?php endif; ?>

    <div class="hezuo_box">
        <div class="hz_tit">商务合作</div>
        <div class="hz_con">
            <p>如果您是旅行社、品牌商、票务代理、媒体或其他...希望合作，请随时与我们联系。</p>
            <span class="ico1">info@huashengyoo.com</span>
            <span class="ico2">010-84388177</span>
        </div>
    </div>
</div>
</div>
</div>
</div>

<?php $this->load->view('mini_footer') ?>

<!-- call 咨询框 start -->
<div class="call" style="position:fixed; top:50%; right:10px; z-index:9999; margin-top:-40px;">
    <a href="#"><img src="images/call.png" width="156" height="80" alt=""/></a>

    <div class="btn-close"
         style="position:absolute; top:2px; right:2px; z-index:10000; width:11px; height:11px; background:url(images/close.gif) no-repeat; cursor:pointer;"></div>
</div>
<!-- call 咨询框 end -->
</body>
</html>