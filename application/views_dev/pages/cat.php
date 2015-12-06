<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12" style="margin-top: 1em;">
            <ol class="breadcrumb">
                <li><a href="/">首页</a></li>
                <li class="active">abc</li>
            </ol>
        </div>

        <div class="col-xs-12" style="margin-bottom: 2em;padding: 0em 2em;">
            <?php foreach ($articles as $article): ?>
                <p><a href="/pages/<?= $article->id ?>"><?= $article->name ?></a></p>
            <?php endforeach; ?>
        </div>
    </div>
</div>