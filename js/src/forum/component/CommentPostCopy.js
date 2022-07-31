import app from 'flarum/forum/app';
import Post from 'flarum/components/Post';
import classList from 'flarum/common/utils/classList';
import PostUser from 'flarum/components/PostUser';
import PostMeta from 'flarum/components/PostMeta';
import PostEdited from 'flarum/components/PostEdited';
import EditPostComposer from 'flarum/components/EditPostComposer';
import ItemList from 'flarum/common/utils/ItemList';
import listItems from 'flarum/common/helpers/listItems';
import Button from 'flarum/common/components/Button';
import ComposerPostPreview from 'flarum/components/ComposerPostPreview';
import humanTime from 'flarum/common/helpers/humanTime';
import username from 'flarum/common/helpers/username';
import avatar from 'flarum/common/helpers/avatar';
import icon from 'flarum/forum/helpers/icon';

import Link from 'flarum/common/components/Link';
/**
 * The `CommentPost` component displays a standard `comment`-typed post. This
 * includes a number of item lists (controls, header, and footer) surrounding
 * the post's HTML content.
 *
 * ### Attrs
 *
 * - `post`
 */

export default class CommentPostCopy extends Post {

  oninit(vnode) {
    super.oninit(vnode);

    /**
     * If the post has been hidden, then this flag determines whether or not its
     * content has been expanded.
     *
     * @type {Boolean}
     */
    this.revealContent = false;

    /**
     * Whether or not the user hover card inside of PostUser is visible.
     * The property must be managed in CommentPost to be able to use it in the subtree check
     *
     * @type {Boolean}
     */
    this.cardVisible = false;

    this.subtree.check(
      () => this.cardVisible,
      () => this.isEditing(),
      () => this.revealContent
    );
  }

  content() {
    const user = this.attrs.post.user();
    //console.dir(humanTime(this.attrs.post.createdAt()));

    const posthtmlclear = this.attrs.post.contentHtml().replace(/(<p>|<\/p>|<br>)/gi, "");

    return super.content().concat([
      <div className="postcommentsDIV">
        {this.isEditing() ? <ComposerPostPreview className="Post-preview" composer={app.composer} /> :
          m.trust(posthtmlclear)} -
        <Link className="postcommentslink" href={app.route.user(user)}>
          {avatar(user || null, {className:"postcommentsavatar"})} {username(user)}
        </Link> {humanTime(this.attrs.post.createdAt())}
      </div>,
    ]);
  }

  refreshContent() {
    const contentHtml = this.isEditing() ? '' : this.attrs.post.contentHtml();

    // If the post content has changed since the last render, we'll run through
    // all of the <script> tags in the content and evaluate them. This is
    // necessary because TextFormatter outputs them for e.g. syntax highlighting.
    if (this.contentHtml !== contentHtml) {
      this.$('.Post-body script').each(function () {
        const script = document.createElement('script');
        script.textContent = this.textContent;
        Array.from(this.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
        this.parentNode.replaceChild(script, this);
      });
    }

    this.contentHtml = contentHtml;
  }

  oncreate(vnode) {
    super.oncreate(vnode);

    this.refreshContent();
  }

  onupdate(vnode) {
    super.onupdate(vnode);

    this.refreshContent();
  }

  isEditing() {
    return app.composer.bodyMatches(EditPostComposer, { post: this.attrs.post });
  }

  elementAttrs() {
    const post = this.attrs.post;
    const attrs = super.elementAttrs();

    attrs.className =
      (attrs.className || '') +
      ' ' +
      classList({
        CommentPostReply: true,
        topreply:true,
        'Post--renderFailed': post.renderFailed(),
        'Post--hidden': post.isHidden(),
        'Post--edited': post.isEdited(),
        revealContent: this.revealContent,
        editing: this.isEditing(),
      });

    if (this.isEditing()) attrs['aria-busy'] = 'true';
//console.log(attrs);
    return attrs;
  }

  /**
   * Toggle the visibility of a hidden post's content.
   */
  toggleContent() {
    this.revealContent = !this.revealContent;
  }

}
