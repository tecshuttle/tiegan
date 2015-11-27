<!DOCTYPE html>
<html <?= (isset($appName) ? "ng-app='$appName'" : '') ?>>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title ng-bind="title"><?= isset($title) ? $title : '铁杆欢迎您！' ?></title>

    <?php
    //设置默认值
    $css_js_version = $this->config->config['css_js_version'];;
    $css = (isset($css) ? $css : array());
    ?>

    <link rel="stylesheet" type="text/css" href="/css/bootstrap-3.3.4/css/bootstrap.min.css"/>

    <?php foreach ($css as $cssFile): ?>
        <link rel="stylesheet" type="text/css" href="<?= $cssFile ?>?version=<?= $css_js_version ?>"/>
    <?php endforeach; ?>

</head>

<body>

<div class="container-fluid">
    <div class="row header" style="padding-top: 1em;border-bottom: 2px solid gray;">
        <div class="col-xs-2">
            <p class="img-thumbnail" style="width:200px; text-align: center;padding: 10px;">tiegan logo</p>
        </div>

        <div class="col-xs-10" style="text-align: center;padding-top: 10px;">
            <span class="header-menu">目的地</span>
            <span class="header-menu">锦囊</span>
            <span class="header-menu">行程助手</span>
            <span class="header-menu">社区</span>
            <span class="header-menu">最世界</span>
            <span class="header-menu">自由行</span>
            <span class="header-menu">酒店</span>
            <span class="header-menu">预订</span>
        </div>
    </div>
</div>