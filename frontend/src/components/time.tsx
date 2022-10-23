import React from 'react';
import { useSelector } from 'react-redux';

export function Time() {
  const time = useSelector((state: { time: number }) => state.time);
  const gameStarted = useSelector((state: { game: boolean }) => state.game);
  const timeReference = useSelector((state: { timeReference: number }) => state.timeReference);
  const durationSeconds = 12; //120
  const timeRemaining = durationSeconds + timeReference - time;
  return (
    <div
      style={{
        position: 'absolute',
        left: 25,
        top: 100,
        fontWeight: 'bold',
        fontSize: '30px',
        textShadow: '0 0 5px #fff'
      }}>
      <span
        style={{
          color: 'red',
          textShadow: '0 0 5px #fff'
        }}>
        Time remaining
      </span>
      <br />={JSON.stringify(gameStarted)}=
      <div
        style={{
          textAlign: 'left'
        }}>
        {timeRemaining > 0 ? (
          <span style={{}}>
            {timeRemaining > durationSeconds ? durationSeconds : timeRemaining}{' '}
          </span>
        ) : (
          'Game over'
        )}
      </div>
    </div>
  );
}