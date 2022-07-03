<?php

namespace KilicSelcuk\PostCommments;

use Flarum\Extension\ExtensionManager;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class HidePostCommentReplyScope
{
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke(User $actor, Builder $query, $ability)
    {

        //var_dump($query);
        $query->where(function (Builder $query) use ($actor) {

            $query->Where('reply_to', '=', 0);

            /**
             * @var $manager ExtensionManager
             */
            /*$manager = resolve(ExtensionManager::class);


            if ($manager->isEnabled('flarum-tags')) {
                $query->whereHas('discussion', function (Builder $query) use ($actor) {
                    // The following will be handled by Tag's scopeAll which will check our `discussion.seePastFirstPost` tag-scoped permission
                    // If Tags is disabled, this will have no impact on the query and all discussions will match
                    $query->whereVisibleTo($actor, 'discussion.seePastFirstPost');

                    // Workaround for the tag scope not returning discussions with no tags
                    // @see https://github.com/flarum/core/issues/2554
                    if ($actor->hasPermission('discussion.seePastFirstPost')) {
                        $query->orWhereDoesntHave('tags');
                    }
                });
            } else {
                // Behaviour when the Tags extension is disabled
                // There's no need to do a sub-query for discussions since the permission is global
                if ($actor->hasPermission('discussion.seePastFirstPost')) {
                    // We technically don't need to do anything here to return all discussions
                    // But we need a truthy statement otherwise it messes up with the OR condition below
                    $query->whereRaw('TRUE');
                } else {
                    // If the user doesn't have permission, force-hide everything
                    $query->whereRaw('FALSE');
                }
            }

            // Always give access to first post. Unless the corresponding setting is used
            if (!$this->settings->get('clarkwinkelmann-see-past-first-post.hideFirstPost')) {
                $query->orWhere('posts.number', '=', 1);
            }*/
        });
    }
}
