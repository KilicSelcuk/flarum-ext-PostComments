<?php
namespace KilicSelcuk\PostCommments\Listener;

use Flarum\Post\Event\Saving;
use Flarum\Post\Post;
use Illuminate\Support\Arr;

class SaveReplyTo
{
    /**
     * @param Saving $event
     */
    public function handle(Saving $event)
    {


        $data = Arr::get($event->data, 'attributes.content');


        $pattern = '/@"([a-zA-Z0-9_-]+)"#p([0-9]+)/i';
        $eslesme = preg_match_all($pattern, $data,$eslesenler); // Outputs 4


        // tek bir cevapa cevap veriliyorsa islemleri yapariz, birden fazla cevapa mention yaparak cevap verilmek istenirse normal post olarak kalmasi icin ellemiyoruz (islem yapmiyoruz)
        if ($eslesme == 1) {

            // cevap verilen kullanici adi
            $username = $eslesenler[1][0];

            // cevap verilen post id si
            $reply_postID = $eslesenler[2][0];

            // cevap verilen post bilgilerini cekeriz
            $replyPost = Post::find($reply_postID);

           // die(var_dump($event->post));

            // cevap verilen post daha once zaten baska bir post a cevap olarak yazilmis ise, o postun ID sini alarak yeni cevabin replty_to suna ekleriz
            // boylece ayni cevabin altinda hepsi listelenir.
            if ($replyPost && $replyPost->reply_to) {
                //$event->post = yeni kaydedilen yorum (cevaba yapilan yorum)

                // yeni cevabin reply_to degerine, cevap verilen post'un ID sini kaydederiz.
                $event->post->reply_to = $replyPost->reply_to;

                //cevap verilen cevabin cevap count sayisini artirma
                $ogPost = Post::find($replyPost->reply_to);
                $ogPost->reply_count = $ogPost->reply_count +1;
                $ogPost->save();

                // cevap verilen post normal cevap ise yeni yorumun reply_to sunu post id si ile kaydedreriz
            } else {
                $event->post->reply_to = $replyPost->id;

                //$event->post->reply_to = $replyPost->reply_to;
                $replyPost->reply_count = $replyPost->reply_count +1;
                $replyPost->save();
            }
        }
    }
}
