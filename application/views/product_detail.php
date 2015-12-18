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
    padding: 0;
    width: 845px;
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
                <?= $match->desc ?>
            </div>
        </div>
        <!-- product detail content -->
        <div class="ticket_show_con">
            <!-- left content -->
            <div class="column_left_con">
                <?= $match->content ?>
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

<!-- footer start-->
<div class="zw-footer">
    <div class="zw-footer-wrap">
        <div class="zw-footer-line1 clearfix">
            <div class="zw-footer-intro">
                <p class="logo"><img src="images/foot-logo.png"></p>

                <p class="text">铁杆体育——从一张机票、一家酒店的订购，到一次暖心的接机服务、一张轻松融入当地的交通卡，让我们带你探索这个世界</p>
            </div>
            <dl class="zw-footer-concerns">
                <dt>关注我们</dt>
                <!-- <dd class="iphone">
                  <p class="icons"><span class="fa fa-mobile-phone"></span></p>
                  <div class="layer">
                    <div class="box">
                      <div class="clearfix">
                        <p class="pics"><img src="images/foot-qrcode-app.jpg"></p>
                        <div class="text">
                          <p class="txt1">扫一扫下载</p>
                          <p class="txt2">穷游最世界</p>
                          <p class="txt3">APP</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </dd> -->
                <dd class="wechat">
                    <p class="icons"><span class="fa fa-weixin"></span></p>

                    <div class="layer">
                        <div class="box">
                            <div class="clearfix">
                                <p class="pics"><img src="images/foot-qrcode-weixin.png"></p>

                                <div class="text">
                                    <p class="txt1">扫一扫关注</p>

                                    <p class="txt2">穷游最世界</p>

                                    <p class="txt3">微信</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </dd>
                <!-- <dd class="weibo">
                  <p class="icons"><span class="fa fa-weibo"></span></p>
                  <div class="layer">
                    <div class="box">
                      <div class="clearfixs">
                        <a href="#"target="_blank"class="follow">+ 关注</a>
                        <span class="text"><a href="#"target="_blank">@最世界自由行</a></span>
                      </div>
                    </div>
                  </div>
                </dd> -->
            </dl>
        </div>
        <div class="zw-footer-line2">
            <div class="zw-footer-listlinks">2004-2015 © 铁杆体育 All rights reserved. Version v5.57 京ICP备12003524号
                京公网安备11010502023470 京ICP证140673号
            </div>
        </div>
    </div>
</div>
<!-- footer end-->

<!-- call 咨询框 start -->
<div class="call" style="position:fixed; top:50%; right:10px; z-index:9999; margin-top:-40px;">
    <a href="#"><img src="images/call.png" width="156" height="80" alt=""/></a>

    <div class="btn-close"
         style="position:absolute; top:2px; right:2px; z-index:10000; width:11px; height:11px; background:url(images/close.gif) no-repeat; cursor:pointer;"></div>
</div>
<!-- call 咨询框 end -->
</body>
</html>