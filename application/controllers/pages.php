<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class pages extends CI_Controller
{
    public function index()
    {
        echo 'access deny';
    }

    public function single()
    {
        $data = array(
            'css' => array(),
            'js' => array(),
            'page' => (object) array(
                    'title' => 'adf',
                    'content' => '从诞生那天起，穷游就是属于全体穷游er的。
刚开始，这个小小的网站只有方便面一个兼职员工，但它却吸引了众多热心的旅欧学生在这个平台上分享自己的旅行。分享和互助，从那时起就成为了穷游的基因。通过口口相传，大家帮助大家，很快穷游就在欧洲有了几万用户。2008年，穷游的国内用户已经超过海外用户，穷游也顺理成章地回到了国内。今天，已经有几千万中国旅行者在穷游的陪伴下踏上旅途。

10年间，有数不清的穷游er为了她的成长做出了巨大的贡献，比如我们早期的版主和热心网友（ kukugerman，vaquita，uglyqueen，蝎之传说），其中有些人还变成了现在的穷游员工；也有很多人在穷游这个平台上让自己为大家所知，比如大勇和小花，小欣，谢谢和菜菜，千里和左手，花甲背包客，陈嘉和婷婷等等等等；当然，还有那些我们永远不会忘记的名字：小刀MM，休伯利安_杨、玲子，晶晶……

10年后的今天，穷游有了很多很多改变：获得了投资，有了新办公室，建立起了团队，有了更多的产品，更好看的界面以及更多的用户；
而更令我们欣喜的是，它依然能够幸运地坚守着那些不变：这里依然是千万穷游er的家，我们的目标依然是希望通过这个平台让中国人的出境旅行更简单，让更多的穷游er获得更美好的旅行体验，我们，依然是你们，也因此，我们将域名改为了www.qyer.com。

因为，穷游er，就是穷游的一切。'
                )
        );

        $this->load->view('header', $data);
        $this->load->view('pages/single', $data);
        $this->load->view('copy_right', $data);
        $this->load->view('footer', $data);
    }
}

/* End of file */