<?php

/*
 * This file is part of kilicselcuk/flarum-ext-postcomments.
 *
 * Copyright (c) 2022 Selcuk Kilic.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace KilicSelcuk\PostCommments;

use Flarum\Api\Serializer\PostSerializer;
use Flarum\Extend;
use Flarum\Post\Event\Saving;
use Flarum\Post\Post;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;
use KilicSelcuk\PostCommments\Api\Controller\ListCommentPostController;
use KilicSelcuk\PostCommments\Listener;
use KilicSelcuk\PostCommments;
return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Routes('api'))
        ->get('/trees/{id}', 'postcomments.trees.get', ListCommentPostController::class),
    (new Extend\Event())->listen(Saving::class, Listener\SaveReplyTo::class),


    /**/(new Extend\ModelVisibility(Post::class))
        ->scopeAll(HidePostCommentReplyScope::class),

    (new Extend\ApiSerializer(PostSerializer::class))
        ->attributes(function (PostSerializer $serializer, Post $post, array $attributes) {
            $attributes['replyTo'] = (int) $post->reply_to;
            $attributes['replyCount'] = (int) $post->reply_count;

            return $attributes;
        }),
    /*
    //https://docs.flarum.org/extend/model-visibility/
    (new Extend\ModelVisibility(Post::class))
        ->scopeAll(function(User $actor, Builder $query, $ability) {
            $sql = $query->toSql();
            if (stripos($sql, 'from `posts') && !stripos($sql, 'update') && !stripos($sql, 'delete')  && strpos($sql, 'id')) {
                $query->where('reply_to', 0);
            }
        }),
    */
];
