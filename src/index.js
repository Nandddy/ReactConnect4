import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* class Square extends React.Component {
  //show stuff
    render() {
      return (
        <button 
          className="square" 
          onClick={() => this.props.onClick() }
          >
          {this.props.value}
        </button>
      );
    }
  } */

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-row">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-row">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-row">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-row">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-row">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    }
  }
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    let num = checkAbove(i,squares);
    squares[num] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <span className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </span>
      </div>
    );
  }
}

function checkAbove(i,squares) {
  let bottomValue = i;
  let nodeToChange = i;
  if (i < 35){
    while(bottomValue < 35){
      bottomValue += 7;
    }
    while (bottomValue > 0){
      if (squares[bottomValue] != null){
        bottomValue -= 7;
      } else {
        nodeToChange = bottomValue;
        break;
      }
    }
  }
  return nodeToChange;
}
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2, 3],
    [0, 7, 14, 21],
    [0, 8, 16, 24],
    [1, 8, 15, 22],
    [2, 9, 16, 23],
    [3, 10, 17, 24],
  ];
  for (let i = 0; i < lines.length; i++) {
    let [a, b, c, d] = lines[i];
    for (let j = 0; j < 42; j++){
      if (squares[a+j] && squares[a+j] === squares[b+j] && squares[a+j] === squares[c+j] && squares[a+j] === squares[d+j]) {
        return squares[a+j];
      }
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
