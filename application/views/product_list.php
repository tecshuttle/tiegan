<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>朝圣(产品列表)</title>
    <base href="/">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <!-- style base -->
    <link rel="stylesheet" href="css/base.css">
    <!-- style font awesome -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/moule.css">
    <!-- style layout -->
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <!--[if IE 6]>
    <script src="js/DD_belatedPNG_0.0.8a-min.js"></script>
    <script>

        /* EXAMPLE */
        DD_belatedPNG.fix('.png_bg');

        /* 将 .png_bg 改成你应用了透明PNG的CSS选择器 */
    </script>
    <![endif]-->
</head>
<body>


<!-- inner header start -->
<div class="q-layer-header">
    <?php $this->load->view('mini_header') ?>
</div>
<!-- inner header end -->


<!-- content start -->
<div class="content">
    <!-- filter -->
    <div class="filter_options">
        <dl class="clearfix options_item" style="display:none;">
            <dt>相 关 主 题：</dt>
            <dd class="options">
                <a href="javascript:void(0)" class="option alls hover" value='all'>全部</a>
                <a href="javascript:void(0)" class="option" value=''><span>NBA</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>马拉松</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>体育冬夏令营</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>橄榄球</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>玩转足球一日游</span></a>
                <a href="javascript:void(0)" class="option" value=''><span>五大联赛</span></a>
            </dd>
        </dl>

        <dl class="clearfix options_location">
            <dt>相关主题：</dt>
            <dd class="options">
                <a href="/equipments" class="option alls <?= ($tag_id == 0 ? 'hover' : '') ?>" value='all'>全部</a>
                <?php foreach ($tags as $t): ?>
                    <a href="/equipments/<?= $t->id ?>" class="option alls <?= ($tag_id == $t->id ? 'hover' : '') ?>" value='all'><?= $t->name ?></a>
                <?php endforeach; ?>
            </dd>
            <!-- <dd class="more"><a href="javascript:void(0)">多选</a></dd> -->
            <div class="clearfix"></div>
        </dl>
    </div>
    <!-- select result -->
    <div class="selectResult">
        <div class="count" id="temp">选择结果：共<span><?= $matchs['total'] ?></span>条</div>
        <ul class="resultList" id="htmlcontent">

            <?php foreach ($matchs['data'] as $m): ?>
                <li class="clearfix">
                    <a href="/match/<?= $m->id ?>" class="l">
                        <img src="<?= $m->cover ?>">
                    </a>

                    <div class="details">
                        <h1><a href="/match/<?= $m->id ?>"><?= $m->name ?></a></h1>
                        行程天数：<?= $m->travel_long ?><br>
                        出发日期：<?= $m->travel_begin ?><br>
                        行程概览：<?= $m->brief ?><br>

                        <div class="firTitle clearfix"></div>
                    </div>
                    <div class="rs">
                        <span class="money"><span>¥<?= $m->price ?></span>起</span>
                        <a href="/match/<?= $m->id ?>" title="预订">预订</a>
                    </div>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
    <!-- page -->
    <?= $pager ?>
</div>
<!-- content end -->
<!-- footer start-->
<div class="zw-footer">
    <div class="zw-footer-wrap">
        <div class="zw-footer-line1 clearfix">
            <div class="zw-footer-intro">
                <p class="logo"><img src="images/foot-logo.png"></p>

                <p class="text">最世界·自由行——从一张机票、一家酒店的订购，到一次暖心的接机服务、一张轻松融入当地的交通卡，让我们带你探索这个世界</p>
            </div>
            <dl class="zw-footer-concerns">
                <dt>关注我们</dt>
                <dd class="iphone">
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
                </dd>
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
                <dd class="weibo">
                    <p class="icons"><span class="fa fa-weibo"></span></p>

                    <div class="layer">
                        <div class="box">
                            <div class="clearfixs">
                                <a href="#" target="_blank" class="follow">+ 关注</a>
                                <span class="text"><a href="#" target="_blank">@最世界自由行</a></span>
                            </div>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="zw-footer-line2">
            <div class="zw-footer-listlinks">2004-2015 © 穷游网™ qyer.com All rights reserved. Version v5.57 京ICP备12003524号 京公网安备11010502023470 京ICP证140673号</div>
        </div>
    </div>
</div>
<!-- footer end-->
</body>
</html>