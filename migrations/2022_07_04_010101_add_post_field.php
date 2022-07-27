<?php

//use Flarum\Database\Migration;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasColumn('posts', 'reply_to')) {
            $schema->table('posts', function (Blueprint $table) {
                $table->integer('reply_to')->default(0)->unsigned();
            });
        }
        if (!$schema->hasColumn('posts', 'reply_count')) {
            $schema->table('posts', function (Blueprint $table) {
                $table->integer('reply_count')->default(0)->unsigned();
            });
        }
    },
    'down' => function (Builder $schema) {
        // no.
    },
];
/*
return Migration::addColumns('posts', [
    'reply_to' => ['integer'],
    'reply_count' => ['integer']
]);*/
