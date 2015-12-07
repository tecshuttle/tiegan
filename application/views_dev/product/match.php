<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12" style="margin-top: 1em;">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li class="active"><?= $match->name ?></li>
            </ol>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 " style="padding: 0em 1em;">
            <div class="img-thumbnail" style="width: 100%;padding: 2em;">
                <?= $match->content ?>
            </div>
        </div>
    </div>
</div>


<div class="container-fluid" style="margin: 1em auto;">
    <div class="row">
        <div class="col-xs-9">
            <div class="img-thumbnail" style="width: 100%;padding:2em;">
                <?php for ($i = 0; $i < 7; $i++): ?>
                    <?= $match->content ?>
                <?php endfor; ?>
            </div>
        </div>

        <div class="col-xs-3" style="padding-left: 0em;">
            <div class="img-thumbnail" style="width: 100%;text-align: center;padding: 6em 2em;">
                列表
            </div>
        </div>
    </div>
</div>