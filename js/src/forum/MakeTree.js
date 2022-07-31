import {extend, override} from 'flarum/forum/extend';
import Post from 'flarum/forum/components/Post';
import Button from 'flarum/forum/components/Button';
import icon from 'flarum/forum/helpers/icon';
//import CommentPost from 'flarum/components/CommentPost';
//import CommentPostCopy from './component/CommentPostCopyOriginal';
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
      const count = this.attrs.post.data.attributes.replyCount;

      vdom.children.push(
        <div className='CommentTree topreply' id={id}>
          <h4 className="postcommentstitle">{icon('fas fa-comments')} {app.translator.trans('kilicselcuk-postcomments.forum.post.show_' + (count > 1 ? 'replies' : 'reply'), {count})}</h4>
          {app.cache.trees[id].filter((thing, index, self) => self.findIndex(t => t.id() === thing.id()) === index)
            .sort((a, b) => {
              return a.createdAt() - b.createdAt();
            }).map(post => {
              //console.dir(post);
              return CommentPostCopy.component({post});
            })}
        </div>
      )
    }


    if (this.attrs.post.data.attributes.replyCount > app.cache.trees[id].length - app.cache.pushTree[id] ||
      (app.cache.trees[id].length === 0 && this.attrs.post.data.attributes.replyCount))
    {


      app.store.find('trees', id)
        .then(response => {
          delete response.payload;
          [].push.apply(app.cache.trees[id], response);
          m.redraw();
        })

    }
  })
}

