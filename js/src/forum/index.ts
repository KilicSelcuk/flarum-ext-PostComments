import app from 'flarum/forum/app';

import MakeTree from './MakeTree';

app.initializers.add('kilicselcuk/flarum-ext-postcomments', () => {

  MakeTree();


});
