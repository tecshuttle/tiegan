<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>文章列表</title>
    <base href="/">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <!-- style base -->
    <link rel="stylesheet" href="css/base.css">
    <!-- style font awesome -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" href="css/moule.css">
    <!-- style bxslider -->
    <link rel="stylesheet" type="text/css" href="css/jquery.bxslider.css">
    <!-- style layout -->
    <link rel="stylesheet" type="text/css" href="css/layout.css">
    <script type="text/javascript" src="js/jquery-1.9.1.js"></script>
    <!-- jquery bxslider js -->
    <script type="text/javascript" src="js/jquery.bxslider.min.js"></script>
    <script>
        $(function () {
            var slider = $('.bxslider');

            slider.bxSlider({
                auto: true,
                controls: false,
                pager: true,
                pagerCustom: '#bx-pager',
                onSlideAfter: function () {
                    slider.startAuto();
                }
            });

            // 关注我们
            var qrCodePos = $('.mc_banner').position().top;
            $('dd.wechat').click(function () {
                $('html,body').animate({scrollTop: qrCodePos}, 500);
                return false;
            })
        })
    </script>
    <!--[if IE 6]>
    <script src="js/DD_belatedPNG_0.0.8a-min.js"></script>
    <script>

        /* EXAMPLE */
        DD_belatedPNG.fix('.png_bg');

        /* 将 .png_bg 改成你应用了透明PNG的CSS选择器 */
    </script>
    <![endif]-->
</head>
<body style="background:#fff;">
<!-- inner header start -->
<div class="q-layer-header">
    <?php $this->load->view('mini_header', array('menu' => $menu)) ?>
</div>
<!-- inner header end -->
<!-- content start -->
<div class="content">
    <!--搜索-->
    <div class="m_seach">

        当前位置：<a href="/">首页</a> &gt; 文章列表

    </div>
    <!--搜索end-->

    <!--内容-->
    <div class="m_cont">

        <!--left-->
        <div class="mc_left">

            <!--轮播-->
            <div class="mcl_lb">
                <ul class="bxslider">
                    <li><img src="images/20151110170034.jpg" width="810" height="390" alt=""/></li>
                    <li><img src="images/20151110163919.jpg" width="810" height="390" alt=""/></li>
                    <li><img src="images/20151110164142.jpg" width="810" height="390" alt=""/></li>
                    <li><img src="images/20150914170950.jpg" width="810" height="390" alt=""/></li>
                </ul>
                <div id="bx-pager">
                    <ul>
                        <li><a data-slide-index="0" href="">1</a></li>
                        <li><a data-slide-index="1" href="">2</a></li>
                        <li><a data-slide-index="2" href="">3</a></li>
                        <li><a data-slide-index="3" href="">4</a></li>
                    </ul>
                </div>
            </div>
            <!--轮播end-->

            <!--分块-->
            <div class="mcl_bot">
                <?php foreach ($articles as $article): ?>
                    <div class="mclb_div">
                        <div class="mclb_done">
                            <span class="mcl_a2"><?= $cat->name ?></span>
                            <a href="/pages/<?= $article->id ?>" target="_blank"><?= $article->name ?></a>
                        </div>
                        <div class="mclb_dtwo">
                            <?= $article->digest ?>
                            <a href="/pages/<?= $article->id ?>" target="_blank">[ 查看详细 ]</a>
                        </div>
                        <div class="mclb_dthr">
                            <span><?= date('Y-m-d H:i:s', $article->mtime) ?> 更新</span>

                            <p> 浏览：<?= $article->pv ?> </p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
            <!--分块end-->
            <!-- page -->
            <?= $pager ?>
        </div>
        <!--leftend-->

        <!--right-->
        <div class="mc_right">
            <!--专题-->
            <div class="mcr_zt">
                <div class="mcr_ztop">热门专题</div>
                <div class="mcr_ztbot">
                    <dl>
                        <dt><img src="images/20151210132257.jpg" title="去澳大利亚看网球，为澳网加油！" alt="去澳大利亚看网球，为澳网加油！"
                                 width="76" height="66"/></dt>
                        <dd>
                            <strong><a href="#" target="_blank">去澳大利亚看网球，为澳网加油！</a></strong>
                            2015年11月21日20:00，中国广州，亚冠赛场，恒大1…
                            <a href="#" target="_blank" class="mcr_a1">[ 查看详细 ]</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt><img src="images/20151130142228.jpg" title="[亚洲] 顺着湄公河的行走——绝美原始老挝"
                                 alt="[亚洲] 顺着湄公河的行走——绝美原始老挝" width="76" height="66"/></dt>
                        <dd>
                            <strong><a href="#" target="_blank">[亚洲] 顺着湄公河的行走——绝美原始老挝</a></strong>
                            多年前在电视里看到那边的一些女人都不穿衣服，小时候以为那边热…
                            <a href="#" target="_blank" class="mcr_a1">[ 查看详细 ]</a>
                        </dd>
                    </dl>
                    <dl>
                        <dt><img src="images/20151130135530.jpg" title="[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行"
                                 alt="[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行" width="76" height="66"/></dt>
                        <dd>
                            <strong><a href="#" target="_blank">[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行</a></strong>本人，女，典型双鱼座90后，大学毕业后来英读书，今年刚好毕业…
                            <a href="#" target="_blank" class="mcr_a1">[ 查看详细 ]</a>
                        </dd>
                    </dl>
                </div>
            </div>
            <!--专题end-->

            <div class="mc_banner">
                <a href='' style="width:100%; margin-bottom:10px;" class="fl clearfix"><img src="images/qrcode_qyer.png"
                                                                                            alt="" width="200"
                                                                                            height="200"/></a>
            </div>

            <!--热文排行-->
            <!-- <div class="mcr_hot">
              <div class="mcr_ztop">热文排行</div>
              <div class="mcr_hotbot">
                <ul>
                  <li>去澳大利亚看网球，为澳网加油！<a class="mcr_a1" href="#" target="_blank">[ 查看详细 ]</a></li>
                  <li>[亚洲] 顺着湄公河的行走——绝美原始老挝<a class="mcr_a1" href="#" target="_blank">[ 查看详细 ]</a></li>
                  <li>[欧洲] 阿姆斯特丹的疯狂之旅------四个人的毕业旅行<a class="mcr_a1" href="#" target="_blank">[ 查看详细 ]</a></li>
                  <li>双十一，抢抢抢！【花生游体育旅行网】来给球迷朋友们送福利啦！<a class="mcr_a1" href="#" target="_blank">[ 查看详细 ]</a></li>
                  <li>【亚冠决赛】让我们一起奔赴迪拜为恒大加油！<a class="mcr_a1" href="#" target="_blank">[ 查看详细 ]</a></li>
                </ul>
              </div>
            </div> -->
            <!--热文排行end-->
        </div>
        <!--rightend-->

    </div>
    <!--内容end-->


</div>
<!-- content end -->
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
</body>
</html>