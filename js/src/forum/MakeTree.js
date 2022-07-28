import {extend, override} from 'flarum/forum/extend';
import Post from 'flarum/forum/components/Post';
import Button from 'flarum/forum/components/Button';
import icon from 'flarum/forum/helpers/icon';
import CommentPostCopy from './component/CommentPostCopy';

export default function MakeTree() {

  extend(Post.prototype, 'view', function (vdom) {
    const id = this.attrs.post.id();
    if (!app.cache.trees) {
      app.cache.trees = {};
      app.cache.pushTree = {};
    }
    if (!app.cache.trees[id]) {
      app.cache.trees[id] = [];
      app.cache.pushTree[id] = 0;
    }

    // cevap a yapilan yorumlarin ust katmanini yukler container
    if (app.cache.trees[id].length > 0) {
      vdom.children.push(
        <div className='CommentTree topreply' id={id}>

          {app.cache.trees[id].filter((thing, index, self) => self.findIndex(t => t.id() === thing.id()) === index)
            .sort((a, b) => {
              return a.createdAt() - b.createdAt();
            }).map(post => {
              console.dir(post);
              return CommentPostCopy.component({post});
            })}
        </div>
      )
    }

    //console.log(this.attrs.post.data.attributes.replyCount);

    if (this.attrs.post.data.attributes.replyCount > app.cache.trees[id].length - app.cache.pushTree[id] || (app.cache.trees[id].length === 0 && this.attrs.post.data.attributes.replyCount)) {
      const count = this.attrs.post.data.attributes.replyCount - app.cache.trees[id].length + app.cache.pushTree[id];
      let include = 'discussion,user,user.groups,hiddenUser,editedUser,';
      if (app.initializers.has('fof-gamification')) {
        include += 'user.ranks,upvotes,';
      }
      if (app.initializers.has('fof/reactions')) {
        include += 'reactions';
      }
        app.store.find('trees', id, {include: include.replace(/,\s*$/, "")})
        .then(response => {
          delete response.payload;
          [].push.apply(app.cache.trees[id], response);
          m.redraw();
        })
    }
  })
}

