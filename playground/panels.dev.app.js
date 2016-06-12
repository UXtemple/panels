import { Teleport, Panel } from 'panels-ui';
import Expand from './expand';
import React, { Component, PropTypes } from 'react';

const Content = (props, context) => (
  <div style={{marginTop: 25}}>
    "Captain Ahab," said Tashtego, "that white whale must be the same that some call Moby Dick." "Moby Dick?" shouted Ahab. "Do ye know the white whale then, Tash?" "Does he fan-tail a little curious, sir, before he goes down?" said the Gay-Header deliberately. "And has he a curious spout, too," said Daggoo, "very bushy, even for a parmacetty, and mighty quick, Captain Ahab?" "And he have one, two, three&mdash;oh! good many iron in him hide, too, Captain," cried Queequeg disjointedly, "all twiske-tee be-twisk, like him&mdash;him&mdash;" faltering hard for a word, and screwing his hand round and round as though uncorking a bottle&mdash;"like him&mdash;him&mdash;" "Corkscrew!" cried Ahab, "aye, Queequeg, the harpoons lie all twisted and wrenched in him; aye, Daggoo, his spout is a big one, like a whole shock of wheat, and white as a pile of our Nantucket wool after the great annual sheep-shearing; aye, Tashtego, and he fan-tails like a split jib in a squall. Death and devils! men, it is Moby Dick ye have seen&mdash;Moby Dick&mdash;Moby Dick!" "Captain Ahab," said Starbuck, who, with Stubb and Flask, had thus far been eyeing his superior with increasing surprise, but at last seemed struck with a thought which somewhat explained all the wonder. "Captain Ahab, I have heard of Moby Dick&mdash;but it was not Moby Dick that took off thy leg?" "Who told thee that?" cried Ahab; then pausing, "Aye, Starbuck; aye, my hearties all round; it was Moby Dick that dismasted me; Moby Dick that brought me to this dead stump I stand on now. Aye, aye," he shouted with a terrific, loud, animal sob, like that of a heart-stricken moose; "Aye, aye! it was that accursed white whale that razeed me; made a poor pegging lubber of me for ever and a day!" Then tossing both arms, with measureless imprecations he shouted out: "Aye, aye! and I'll chase him round Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before I give him up. And this is what ye have shipped for, men! to chase that white whale on both sides of land, and over all sides of earth, till he spouts black blood and rolls fin out. What say ye, men, will ye splice hands on it, now? I think ye do look brave." "Aye, aye!" shouted the harpooneers and seamen, running closer to the excited old man: "A sharp eye for the white whale; a sharp lance for Moby Dick!" "God bless ye," he seemed to half sob and half shout. "God bless ye, men. Steward! go draw the great measure of grog. But what's this long face about, Mr. Starbuck; wilt thou not chase the white whale? art not game for Moby Dick?" "I am game for his crooked jaw, and for the jaws of Death too, Captain Ahab, if it fairly comes in the way of the business we follow; but I came here to hunt whales, not my commander's vengeance. How many barrels will thy vengeance yield thee even if thou gettest it, Captain Ahab? it will not fetch thee much in our Nantucket market." "Nantucket market! Hoot! But come closer, Starbuck; thou requirest a little lower layer. If money's to be the measurer, man, and the accountants have computed their great counting-house the globe, by girdling it with guineas, one to every three parts of an inch; then, let me tell thee, that my vengeance will fetch a great premium HERE!" "He smites his chest," whispered Stubb, "what's that for? methinks it rings most vast, but hollow." "Vengeance on a dumb brute!" cried Starbuck, "that simply smote thee from blindest instinct! Madness! To be enraged with a dumb thing, Captain Ahab, seems blasphemous." "Hark ye yet again&mdash;the little lower layer. All visible objects, man, are but as pasteboard masks. But in each event&mdash;in the living act, the undoubted deed&mdash;there, some unknown but still reasoning thing puts forth the mouldings of its features from behind the unreasoning mask. If man will strike, strike through the mask! How can the prisoner reach outside except by thrusting through the wall? To me, the white whale is that wall, shoved near to me. Sometimes I think there's naught beyond. But 'tis enough. He tasks me; he heaps me; I see in him outrageous strength, with an inscrutable malice sinewing it. That inscrutable thing is chiefly what I hate; and be the white whale agent, or be the white whale principal, I will wreak that hate upon him."Captain Ahab," said Tashtego, "that white whale must be the same that some call Moby Dick." "Moby Dick?" shouted Ahab. "Do ye know the white whale then, Tash?" "Does he fan-tail a little curious, sir, before he goes down?" said the Gay-Header deliberately. "And has he a curious spout, too," said Daggoo, "very bushy, even for a parmacetty, and mighty quick, Captain Ahab?" "And he have one, two, three&mdash;oh! good many iron in him hide, too, Captain," cried Queequeg disjointedly, "all twiske-tee be-twisk, like him&mdash;him&mdash;" faltering hard for a word, and screwing his hand round and round as though uncorking a bottle&mdash;"like him&mdash;him&mdash;" "Corkscrew!" cried Ahab, "aye, Queequeg, the harpoons lie all twisted and wrenched in him; aye, Daggoo, his spout is a big one, like a whole shock of wheat, and white as a pile of our Nantucket wool after the great annual sheep-shearing; aye, Tashtego, and he fan-tails like a split jib in a squall. Death and devils! men, it is Moby Dick ye have seen&mdash;Moby Dick&mdash;Moby Dick!" "Captain Ahab," said Starbuck, who, with Stubb and Flask, had thus far been eyeing his superior with increasing surprise, but at last seemed struck with a thought which somewhat explained all the wonder. "Captain Ahab, I have heard of Moby Dick&mdash;but it was not Moby Dick that took off thy leg?" "Who told thee that?" cried Ahab; then pausing, "Aye, Starbuck; aye, my hearties all round; it was Moby Dick that dismasted me; Moby Dick that brought me to this dead stump I stand on now. Aye, aye," he shouted with a terrific, loud, animal sob, like that of a heart-stricken moose; "Aye, aye! it was that accursed white whale that razeed me; made a poor pegging lubber of me for ever and a day!" Then tossing both arms, with measureless imprecations he shouted out: "Aye, aye! and I'll chase him round Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before I give him up. And this is what ye have shipped for, men! to chase that white whale on both sides of land, and over all sides of earth, till he spouts black blood and rolls fin out. What say ye, men, will ye splice hands on it, now? I think ye do look brave." "Aye, aye!" shouted the harpooneers and seamen, running closer to the excited old man: "A sharp eye for the white whale; a sharp lance for Moby Dick!" "God bless ye," he seemed to half sob and half shout. "God bless ye, men. Steward! go draw the great measure of grog. But what's this long face about, Mr. Starbuck; wilt thou not chase the white whale? art not game for Moby Dick?" "I am game for his crooked jaw, and for the jaws of Death too, Captain Ahab, if it fairly comes in the way of the business we follow; but I came here to hunt whales, not my commander's vengeance. How many barrels will thy vengeance yield thee even if thou gettest it, Captain Ahab? it will not fetch thee much in our Nantucket market." "Nantucket market! Hoot! But come closer, Starbuck; thou requirest a little lower layer. If money's to be the measurer, man, and the accountants have computed their great counting-house the globe, by girdling it with guineas, one to every three parts of an inch; then, let me tell thee, that my vengeance will fetch a great premium HERE!" "He smites his chest," whispered Stubb, "what's that for? methinks it rings most vast, but hollow." "Vengeance on a dumb brute!" cried Starbuck, "that simply smote thee from blindest instinct! Madness! To be enraged with a dumb thing, Captain Ahab, seems blasphemous." "Hark ye yet again&mdash;the little lower layer. All visible objects, man, are but as pasteboard masks. But in each event&mdash;in the living act, the undoubted deed&mdash;there, some unknown but still reasoning thing puts forth the mouldings of its features from behind the unreasoning mask. If man will strike, strike through the mask! How can the prisoner reach outside except by thrusting through the wall? To me, the white whale is that wall, shoved near to me. Sometimes I think there's naught beyond. But 'tis enough. He tasks me; he heaps me; I see in him outrageous strength, with an inscrutable malice sinewing it. That inscrutable thing is chiefly what I hate; and be the white whale agent, or be the white whale principal, I will wreak that hate upon him."Captain Ahab," said Tashtego, "that white whale must be the same that some call Moby Dick." "Moby Dick?" shouted Ahab. "Do ye know the white whale then, Tash?" "Does he fan-tail a little curious, sir, before he goes down?" said the Gay-Header deliberately. "And has he a curious spout, too," said Daggoo, "very bushy, even for a parmacetty, and mighty quick, Captain Ahab?" "And he have one, two, three&mdash;oh! good many iron in him hide, too, Captain," cried Queequeg disjointedly, "all twiske-tee be-twisk, like him&mdash;him&mdash;" faltering hard for a word, and screwing his hand round and round as though uncorking a bottle&mdash;"like him&mdash;him&mdash;" "Corkscrew!" cried Ahab, "aye, Queequeg, the harpoons lie all twisted and wrenched in him; aye, Daggoo, his spout is a big one, like a whole shock of wheat, and white as a pile of our Nantucket wool after the great annual sheep-shearing; aye, Tashtego, and he fan-tails like a split jib in a squall. Death and devils! men, it is Moby Dick ye have seen&mdash;Moby Dick&mdash;Moby Dick!" "Captain Ahab," said Starbuck, who, with Stubb and Flask, had thus far been eyeing his superior with increasing surprise, but at last seemed struck with a thought which somewhat explained all the wonder. "Captain Ahab, I have heard of Moby Dick&mdash;but it was not Moby Dick that took off thy leg?" "Who told thee that?" cried Ahab; then pausing, "Aye, Starbuck; aye, my hearties all round; it was Moby Dick that dismasted me; Moby Dick that brought me to this dead stump I stand on now. Aye, aye," he shouted with a terrific, loud, animal sob, like that of a heart-stricken moose; "Aye, aye! it was that accursed white whale that razeed me; made a poor pegging lubber of me for ever and a day!" Then tossing both arms, with measureless imprecations he shouted out: "Aye, aye! and I'll chase him round Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before I give him up. And this is what ye have shipped for, men! to chase that white whale on both sides of land, and over all sides of earth, till he spouts black blood and rolls fin out. What say ye, men, will ye splice hands on it, now? I think ye do look brave." "Aye, aye!" shouted the harpooneers and seamen, running closer to the excited old man: "A sharp eye for the white whale; a sharp lance for Moby Dick!" "God bless ye," he seemed to half sob and half shout. "God bless ye, men. Steward! go draw the great measure of grog. But what's this long face about, Mr. Starbuck; wilt thou not chase the white whale? art not game for Moby Dick?" "I am game for his crooked jaw, and for the jaws of Death too, Captain Ahab, if it fairly comes in the way of the business we follow; but I came here to hunt whales, not my commander's vengeance. How many barrels will thy vengeance yield thee even if thou gettest it, Captain Ahab? it will not fetch thee much in our Nantucket market." "Nantucket market! Hoot! But come closer, Starbuck; thou requirest a little lower layer. If money's to be the measurer, man, and the accountants have computed their great counting-house the globe, by girdling it with guineas, one to every three parts of an inch; then, let me tell thee, that my vengeance will fetch a great premium HERE!" "He smites his chest," whispered Stubb, "what's that for? methinks it rings most vast, but hollow." "Vengeance on a dumb brute!" cried Starbuck, "that simply smote thee from blindest instinct! Madness! To be enraged with a dumb thing, Captain Ahab, seems blasphemous." "Hark ye yet again&mdash;the little lower layer. All visible objects, man, are but as pasteboard masks. But in each event&mdash;in the living act, the undoubted deed&mdash;there, some unknown but still reasoning thing puts forth the mouldings of its features from behind the unreasoning mask. If man will strike, strike through the mask! How can the prisoner reach outside except by thrusting through the wall? To me, the white whale is that wall, shoved near to me. Sometimes I think there's naught beyond. But 'tis enough. He tasks me; he heaps me; I see in him outrageous strength, with an inscrutable malice sinewing it. That inscrutable thing is chiefly what I hate; and be the white whale agent, or be the white whale principal, I will wreak that hate upon him.
    "Captain Ahab," said Tashtego, "that white whale must be the same that some call Moby Dick." "Moby Dick?" shouted Ahab. "Do ye know the white whale then, Tash?" "Does he fan-tail a little curious, sir, before he goes down?" said the Gay-Header deliberately. "And has he a curious spout, too," said Daggoo, "very bushy, even for a parmacetty, and mighty quick, Captain Ahab?" "And he have one, two, three&mdash;oh! good many iron in him hide, too, Captain," cried Queequeg disjointedly, "all twiske-tee be-twisk, like him&mdash;him&mdash;" faltering hard for a word, and screwing his hand round and round as though uncorking a bottle&mdash;"like him&mdash;him&mdash;" "Corkscrew!" cried Ahab, "aye, Queequeg, the harpoons lie all twisted and wrenched in him; aye, Daggoo, his spout is a big one, like a whole shock of wheat, and white as a pile of our Nantucket wool after the great annual sheep-shearing; aye, Tashtego, and he fan-tails like a split jib in a squall. Death and devils! men, it is Moby Dick ye have seen&mdash;Moby Dick&mdash;Moby Dick!" "Captain Ahab," said Starbuck, who, with Stubb and Flask, had thus far been eyeing his superior with increasing surprise, but at last seemed struck with a thought which somewhat explained all the wonder. "Captain Ahab, I have heard of Moby Dick&mdash;but it was not Moby Dick that took off thy leg?" "Who told thee that?" cried Ahab; then pausing, "Aye, Starbuck; aye, my hearties all round; it was Moby Dick that dismasted me; Moby Dick that brought me to this dead stump I stand on now. Aye, aye," he shouted with a terrific, loud, animal sob, like that of a heart-stricken moose; "Aye, aye! it was that accursed white whale that razeed me; made a poor pegging lubber of me for ever and a day!" Then tossing both arms, with measureless imprecations he shouted out: "Aye, aye! and I'll chase him round Good Hope, and round the Horn, and round the Norway Maelstrom, and round perdition's flames before I give him up. And this is what ye have shipped for, men! to chase that white whale on both sides of land, and over all sides of earth, till he spouts black blood and rolls fin out. What say ye, men, will ye splice hands on it, now? I think ye do look brave." "Aye, aye!" shouted the harpooneers and seamen, running closer to the excited old man: "A sharp eye for the white whale; a sharp lance for Moby Dick!" "God bless ye," he seemed to half sob and half shout. "God bless ye, men. Steward! go draw the great measure of grog. But what's this long face about, Mr. Starbuck; wilt thou not chase the white whale? art not game for Moby Dick?" "I am game for his crooked jaw, and for the jaws of Death too, Captain Ahab, if it fairly comes in the way of the business we follow; but I came here to hunt whales, not my commander's vengeance. How many barrels will thy vengeance yield thee even if thou gettest it, Captain Ahab? it will not fetch thee much in our Nantucket market." "Nantucket market! Hoot! But come closer, Starbuck; thou requirest a little lower layer. If money's to be the measurer, man, and the accountants have computed their great counting-house the globe, by girdling it with guineas, one to every three parts of an inch; then, let me tell thee, that my vengeance will fetch a great premium HERE!" "He smites his chest," whispered Stubb, "what's that for? methinks it rings most vast, but hollow." "Vengeance on a dumb brute!" cried Starbuck, "that simply smote thee from blindest instinct! Madness! To be enraged with a dumb thing, Captain Ahab, seems blasphemous." "Hark ye yet again&mdash;the little lower layer. All visible objects, man, are but as pasteboard masks. But in each event&mdash;in the living act, the undoubted deed&mdash;there, some unknown but still reasoning thing puts forth the mouldings of its features from behind the unreasoning mask. If man will strike, strike through the mask! How can the prisoner reach outside except by thrusting through the wall? To me, the white whale is that wall, shoved near to me. Sometimes I think there's naught beyond. But 'tis enough. He tasks me; he heaps me; I see in him outrageous strength, with an inscrutable malice sinewing it. That inscrutable thing is chiefly what I hate; and be the white whale agent, or be the white whale principal, I will wreak that hate upon him.
    { context.scrollTo ? <button onClick={() => context.scrollTo(300)}>scroll to 300</button> : null }
  </div>
);
Content.contextTypes = {
  scrollTo: PropTypes.func
}

const style = {
  innerWrapper: {
    height: '100%',
    overflow: 'auto',
    padding: 20
  }
}

class Lightgreen extends Component {
  update() {
    this.context.updateSettings({
      maxWidth: 400,
      width: 200
    })
  }

  scrollTo = (y) => {
    this.$scroller.scrollTop = y;
  }

  getChildContext() {
    return {
      scrollTo: this.scrollTo
    };
  }

  render() {
    const { props } = this;

    return (
      <Panel style={{backgroundColor: 'lightgreen', height: '100%', width: props.width}}>
        <div style={style.innerWrapper} ref={ $e => this.$scroller = $e }>
          <button onClick={() => this.update()}>update</button>
          <Teleport to='a/'
            style={{paddingBottom: 10, paddingTop: 10, textDecoration: 'none'}}
            styleActive={{backgroundColor: 'white', color: 'lightgreen'}}
            styleHover={{backgroundColor: 'lightgreen', color: 'white'}}>{'/a'}</Teleport>
          <Teleport to='..'>..</Teleport>

          <Teleport context={0} to='how'>how!</Teleport>

          <Content />
          <div onClick={() => this.scrollTo(100) }>scroll</div>
          <Teleport to='a/'
            style={{paddingBottom: 10, paddingTop: 10, textDecoration: 'none'}}
            styleActive={{backgroundColor: 'white', color: 'lightgreen'}}
            styleHover={{backgroundColor: 'lightgreen', color: 'white'}}>{'/a'}</Teleport>
          <Teleport to='..'>..</Teleport>
        </div>
        <Expand {...props.panel.panel} />
      </Panel>
    );
  }
}
Lightgreen.contextTypes = {
  updateSettings: PropTypes.func
}
Lightgreen.childContextTypes = {
  scrollTo: PropTypes.func
}

class How extends Component {
  state = {
    presenter: {
      isPlaying: true
    }
  };

  componentDidMount() {
    if (this.props.panel.isFocus) {
      this.context.present(this.renderPresenter());
    }
  }

  componentDidUpdate(prevProps) {
    const { context, props } = this;
    if (props.panel.isFocus !== prevProps.panel.isFocus) {
      if (props.panel.isFocus) {
        context.present();
      } else {
        context.present(this.renderPresenter());
      }
    }
  }

  componentWillUnmount() {
    this.context.present();
  }

  renderPresenter() {
    return (
      <video
        autoPlay
        loop
        ref={ $e => this.$presenter = $e }
        style={{ backgroundColor: 'black', position: 'fixed', left: 0, top: 0, height: '100%', width: '100%' }}
        src='http://ak2.picdn.net/shutterstock/videos/2909092/preview/stock-footage-beautiful-sunrise-over-the-earth-cities-at-night-hd.mp4'
      />
    );
  }

  render() {
    const { width } = this.props;

    return (
      <Panel style={{ backgroundColor: '#fafafa', width }}>
        <div onClick={this.pausePresenter}>pause</div>
      </Panel>
    );
  }

  pausePresenter = () => {
    if (this.$presenter.paused) {
      this.$presenter.play();
    } else {
      this.$presenter.pause();
    }
    // this.setState({
    //   presenter: {
    //     isPlaying: true
    //   }
    // });
  }
}
How.contextTypes = {
  present: PropTypes.func.isRequired
};

export const types = {
  'Lightgreen': Lightgreen,
  'Lightyellow': props => (
    <Panel style={{backgroundColor: 'lightyellow', padding: 20, height: '100%', width: props.width}}>
      <Teleport context={0} to='b/'>{'/a/b'}</Teleport>
      <Teleport to='http://panels.dev/'>{'teleport /'}</Teleport>
      <Teleport to='..'>..</Teleport>
      <Content />
    </Panel>
  ),
  'Lightblue': props => (
    <Panel style={{backgroundColor: 'lightblue', padding: 20, height: '100%', width: props.width}}>
      <Teleport to='c/'>{'/a/b/c'}</Teleport>
      <Teleport to='..'>..</Teleport>
      <Content />
    </Panel>
  ),
  'Lightpink': props => (
    <Panel style={{backgroundColor: 'lightpink', height: '100%', width: props.width}}>
      <div style={style.innerWrapper}>
        <Teleport to='d/'>{'/a/b/c/d'}</Teleport>
        <Teleport to='..'>..</Teleport>
        <Content />
      </div>
      <Expand {...props.panel.panel} />
    </Panel>
  ),
  'Fuchsia': props => (
    <Panel style={{backgroundColor: 'fuchsia', padding: 20, height: '100%', width: props.width}}>
      <Teleport to='e/'>{'/a/b/c/d/e'}</Teleport>
      <Teleport to='..'>..</Teleport>
      <Content />
    </Panel>
  ),
  'Red': props => (
    <Panel style={{backgroundColor: 'red', height: '100%', width: props.width}}>
      <Teleport to='f/'>{'/a/b/c/d/e/f'}</Teleport>
      <Teleport to='..'>..</Teleport>
      <Content />
    </Panel>
  ),
  'Blue': props => (
    <Panel style={{backgroundColor: 'blue', height: '100%', width: props.width}}>
      <Teleport to='..'>..</Teleport>
      <Content />
    </Panel>
  ),
  'Random': props => (
    <Panel style={{border: '1px solid black'}}>random { props.id }</Panel>
  ),
  How
};

export const panels = {
  '/': {type: 'Lightgreen', maxWidth: 720, styleBackground: {backgroundColor: '#f2f2f2'}, title: 'main'},
  '/a': {type: 'Lightyellow', width: '50%' },
  '/a/b': {type: 'Lightblue', width: 720},
  '/a/b/c': {type: 'Lightpink', maxWidth: 560},
  '/a/b/c/d': {type: 'Fuchsia'},
  '/a/b/c/d/e': {type: 'Red'},
  '/a/b/c/d/e/f': {type: 'Blue'},
  '/random:id': (state, props) => ({
    context: 0,
    title: props.id,
    props,
    type: 'Random',
    width: 360 * parseFloat(props.id, 10)
  }),
  '/how': { type: 'How' }
};

export const lookup = ['/random:id'];
