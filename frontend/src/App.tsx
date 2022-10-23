import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import allActions from './actions';
import { Tile } from './components/tile';
import { currentEpochSeconds, randomNumber } from './utils';
import { Score } from './components/score';
import { Time } from './components/time';

const App = () => {
  const dispatch = useDispatch();
  const activeTile = useSelector((state: { tile: number }) => state.tile);
  const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((id: number) => (
    <Tile
      key={id}
      id={id}
      onClick={() => {
        if (activeTile === id) {
          dispatch(allActions.scoreActions.increaseScore());
          dispatch(allActions.tileActions.setActiveTile(0));
        }
      }}
    />
  ));

  // const game = useSelector((state: { tile: number }) => state.tile);

  /// START GAME ONCE
  useEffect(() => {
    dispatch(allActions.gameActions.startGame());
  }, [dispatch]);

  /// SET ONCE REFERENCE TIME
  useEffect(() => {
    dispatch(allActions.timeReferenceActions.setReferenceTime(currentEpochSeconds()));
  }, [dispatch]);

  /// COUNT TIME
  const countTime = () => {
    setTimeout(() => {
      dispatch(allActions.timeActions.setTime(currentEpochSeconds()));
      countTime();
    }, 100);
  };
  useEffect(() => {
    countTime();
  }, [dispatch]);

  /// MOVE MOLE
  const moveMole = () => {
    setTimeout(() => {
      dispatch(allActions.tileActions.setActiveTile(randomNumber(1, 12)));
      moveMole();
    }, 2000);
  };
  useEffect(() => {
    moveMole();
  }, [dispatch]);

  ///
  const image = process.env.PUBLIC_URL + '/' + 'WAM_bg.jpg';
  return (
    <div
      className="App"
      style={{
        height: '100%',
        minHeight: '500px',
        backgroundImage: 'url(' + image + ')',
        backgroundSize: 'cover', //contain will not stretch'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center'
      }}>
      <Score />
      <Time />
      <div
        style={{
          paddingTop: '50px',
          paddingBottom: '100px',
          maxWidth: '400px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
        <div style={{ marginBottom: '20px' }}>
          {/*{activeTile ? 'active Tile is of id #' + activeTile : 'no tile active'}*/}
          {/*<br />*/}
        </div>
        <div className="tilesContainer">{tiles}</div>
      </div>{' '}
    </div>
  );
};

export default App;
