import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { TargetableHero, BoardSideDropTarget, CustomDragLayer } from 'containers';
import { Hand, BoardSide } from 'components';

export class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    character: PropTypes.shape({
      health: PropTypes.number.isRequired,
      mana: PropTypes.number.isRequired,
    }),
    hand: PropTypes.instanceOf(List),
    deck: PropTypes.array,
    board: PropTypes.instanceOf(List),
    actions: PropTypes.shape({
      playCard: PropTypes.func.isRequired,
      drawCard: PropTypes.func.isRequired,
      hitFace: PropTypes.func.isRequired,
    }).isRequired,
  }

  constructor() {
    super();
    this.drawCard = this.drawCard.bind(this);
  }

  drawCard() {
    this.props.actions.drawCard({ target: 'PLAYER' });
  }

  render() {
    const { name, hand, board, actions } = this.props;
    const { mana, health } = this.props.character;
    const styles = require('./Player.scss');

    return (
      <div className={styles.Player}>
        <CustomDragLayer />
        <BoardSide>
          <BoardSideDropTarget board={board} playCard={actions.playCard} />
        </BoardSide>
        <h1 className={styles.PlayerName} onClick={this.drawCard}>
          { name || 'Unnamed' } - Mana: { mana } and Health: { health }
          <TargetableHero ownedBy="PLAYER" health={health} hitFace={actions.hitFace} />
        </h1>
        <div className={styles.PlayerHandWrapper}>
          <Hand cards={hand} />
        </div>
      </div>
    );
  }
}

export default Player;