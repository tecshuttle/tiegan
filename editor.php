<?php
/**
 * Created by PhpStorm.
 * User: davidjin
 * Date: 2015/12/16
 * Time: 23:03
 */
$type = $_GET['type'];
switch($type)
{
    case 1:
        read();
        break;
    case 3:
        createDirectory();
        break;
    case 4:
        upload();
        break;
    default:
        break;
}

function read()
{
    $image = array("name"=>"sprite.png","type"=>"f","size"=>13600);
    $images[] = $image;
    $dir = array("name"=>"1111","type"=>"d","size"=>13600);
    $images[] = $dir;
    $dir = array("name"=>"wwwww","type"=>"d","size"=>13600);
    $images[] = $dir;
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($images);
}

function createDirectory()
{
    $paras = $_POST;
    $dir = $_SERVER['DOCUMENT_ROOT']."ImageBrowser/Image/". $paras['path']. $paras['name'];
    if (!file_exists($dir)) {
        mkdir($dir);

        //此处需要加上数据库记录目录信息，以方便下次获取时在也没中展示
    }

    //缩略图目录
    $dir2 = $_SERVER['DOCUMENT_ROOT']."ImageBrowser/Thumbnail/". $paras['path']. $paras['name'];
    if (!file_exists($dir2)) {
        mkdir($dir2);
    }

}

function upload()
{
    $paras = $_POST;
    $dir = $_SERVER['DOCUMENT_ROOT']."ImageBrowser/Image/". $paras['path'];
    if (!file_exists($dir)) {
        mkdir($dir);
        //此处需要加上数据库记录目录信息，以方便下次获取时在也没中展示
    }
    //缩略图目录
    $dir2 = $_SERVER['DOCUMENT_ROOT']."ImageBrowser/Thumbnail/". $paras['path'];
    if (!file_exists($dir2)) {
        mkdir($dir2);
    }

    //保存文件
    $file = $dir."/".$_FILES['file']['name'];
    if (move_uploaded_file($_FILES['file']['tmp_name'],$file)){

        //此处需要加上数据库记录目录信息，以方便下次获取时在也没中展示

        
        echo "1";
    }
}
