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
    <link rel="stylesheet" type="text/css" href="/css/common.css"/>

    <?php foreach ($css as $cssFile): ?>
        <link rel="stylesheet" type="text/css" href="<?= $cssFile ?>?version=<?= $css_js_version ?>"/>
    <?php endforeach; ?>

</head>

<body>

<div class="container-fluid">
    <div class="row header" style="padding-top: 1em;border-bottom: 2px solid gray;">
        <div class="col-xs-2">
            <a href="/">
                <p class="img-thumbnail" style="width:200px; text-align: center;padding: 10px;">tiegan logo</p>
            </a>
        </div>

        <div class="col-xs-8" style="text-align: center;padding-top: 10px;">
            <?php foreach ($nav_menu as $menu): ?>
                <span class="header-menu"><a href="/cat/<?=$menu->id?>"><?= $menu->name ?></a></span>
            <?php endforeach; ?>
        </div>

        <div class="col-xs-2">
            <p style="text-align: center;padding: 10px;">
                <?php if ($this->user) : ?>
                    <a href="/user"><?= $this->user['name'] ?></a>
                    <span style="display: inline-block;width:1em;"></span>
                    <a href="/user/logout">退出</a>
                <?php else: ?>
                    <a href="/user/login">登入</a>
                    <span style="display: inline-block;width:1em;"></span>
                    <a href="/user/register">注册</a>
                <?php endif; ?>
            </p>
        </div>
    </div>
</div>

