<div class="container-fluid" style="margin-top: 1em;">
    <?php foreach ($matchs as $m): ?>
        <div class="row">

            <div class="col-xs-12 " style="padding: 0em 1em;margin-bottom: 1em;">
                <div class="img-thumbnail" style="width: 100%;padding: 1em;">
                    <div style="width: 30%;float:left;">
                        <img src="<?= $m->cover ?>">
                    </div>

                    <div style="width: 50%;float:left;padding-left: 1em;">
                        <h2 style="margin:10px 0px;"><?= $m->name ?></h2>

                        <p>行程天数:

                        <p>出发日期:

                        <p>行程概览:
                    </div>

                    <div style="width: 20%;float:left;text-align: center;">
                        <div style="margin: 1.5em 0em;">
                            <span style="color: orange;font-size: 24px;">￥1234</span>起
                        </div>

                        <span style="display:inline-block;padding: 5px; width: 90px;background-color: orange;">
                            <a href="/match/<?= $m->id ?>" style="color: white;text-underline: none;">预订</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    <?php endforeach; ?>
</div>