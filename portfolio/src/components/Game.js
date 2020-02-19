import React, { useEffect, useState } from 'react';
import GameLoop from "../GameLogic/GameLoop"

import * as GameStates from "../GameLogic/GameStates"

let gameLoop;//need to declare outside of Game() cause otherwise we'll lose reference to it and it will keep looping forever, never being garbage collected

function Game() {

    const [gameText, setGameText] = useState("Hello, my name is Daniel. Welcome to my portfolio.\nCheck out _my projects_. Or, view my resume _here_.\n\nYou can also type text in here and then press Play to destroy it.");
    const [canvas, setCanvas] = useState();
    const [gameState, setGameState] = useState(GameStates.GAME_NOT_STARTED);

    let canvasRef = React.createRef();

    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        autoExpand(event.target);
    }, false);

    var autoExpand = function (field) {

        // Reset field height
        field.style.height = 'inherit';

        // Get the computed styles for the element
        var computed = window.getComputedStyle(field);

        // Calculate the height
        var height = parseInt(computed.getPropertyValue('border-top-width'), 10)
            + parseInt(computed.getPropertyValue('padding-top'), 10)
            + field.scrollHeight
            + parseInt(computed.getPropertyValue('padding-bottom'), 10)
            + parseInt(computed.getPropertyValue('border-bottom-width'), 10);

        field.style.height = height + 'px';

    };

    useEffect(() => {
        setCanvas(canvasRef.current);
        console.log("Canvas:", canvas)
        resizeCanvas();//do an initial resize for when it first renders, this function will also be called every time the window is resized too
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)
    })

    function setGameStateCallback(newGameState) {
        var sCallerName;
        {
            let re = /([^(]+)@|at ([^(]+) \(/g;
            let aRegexResult = re.exec(new Error().stack);
            sCallerName = aRegexResult[1] || aRegexResult[2];
        }
        console.log(sCallerName);
        if (gameState === GameStates.GAME_IN_PROGRESS) {
            //console.log("SOMEONE SET IT TO IN PROGRESS. THAT FRICKIN FRICK")
        }
        if (newGameState === GameStates.GAME_END_LOSS || newGameState === GameStates.GAME_END_WIN) {//only allowed to transition to game end while GAMEINPROGRESS
            if (gameState === GameStates.GAME_IN_PROGRESS) {
                gameLoop.stopLoop();
                console.log("GAME OVER", newGameState, gameState);
                setGameState(newGameState);
                console.log("Game state after setting to END_LOSS:", gameState, newGameState);
            }
        } else {
            console.log("Setting game state to: ", newGameState);
            setGameState(newGameState);
        }
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    switch (gameState) {
        case GameStates.GAME_NOT_STARTED:
            return (
                <div id="preGame">
                    <div><textarea cols="40" id="preGameText" onChange={(e) => { setGameText(e.target.value) }}>{gameText}</textarea></div>
                    <div id="preGamePadding"></div>
                    <button onClick={(e) => { setGameState(GameStates.GAME_IN_PROGRESS) }}>Play</button>
                </div>
            );
        case GameStates.GAME_IN_PROGRESS:
            if (canvas) {
                if (gameLoop) {
                    gameLoop.stopLoop();
                }
                gameLoop = new GameLoop(canvas, gameText, setGameStateCallback);
                gameLoop.startLoop();
            }
            return (
                <canvas onMouseMove={(e) => { if (gameLoop) gameLoop.updateMousePosition({ x: e.pageX, y: e.pageY }) }} ref={canvasRef} id="game"></canvas>
            );
        case GameStates.GAME_END_LOSS:
            return (
                <div id="gameLost">
                    <h1>GAME OVER</h1>
                    <button onClick={(e) => { e.preventDefault(); setGameState(GameStates.GAME_NOT_STARTED) }}>Continue</button>
                </div>
            );
        case GameStates.GAME_END_WIN:
            return (
                <div id="gameWon">
                    <h1>YOU WON</h1>
                    <button onClick={(e) => { setGameState(GameStates.GAME_NOT_STARTED) }}>Continue</button>
                </div>
            );
    }
}

export default Game;

//  // to count each character 
//  var charIndex = 0;
//  // find the top ypos and then move down half a char space
//  var yPos = centerY - fontSize * line.length * 0.5 * textVertSpacing + fontSize * textVertSpacing / 2;

//  for (var i = 0; i < line.length; i++) {
//    // get the width of the whole line
//    var width = ctx.measureText(line[i]).width;
//    // use the width to find start
//    var textPosX = centerX - width / 2;
//    for (var j = 0; j < line[i].length; j++) {
//      // get char
//      var char = line[i][j];
//      // get its width
//      var cWidth = ctx.measureText(char).width;
//      // check if char needs to fade
//      if (fade.indexOf(charIndex) > -1) {
//        ctx.globalAlpha = 0.5;
//      } else {
//        ctx.globalAlpha = 1;
//      }
//      // draw the char offset by half its width (center)
//      ctx.fillText(char, textPosX + cWidth / 2, yPos);
//      // move too the next pos
//      textPosX += cWidth;
//      // count the char
//      charIndex += 1
//    }
//    // move down one line
//    yPos += fontSize * textVertSpacing;
//  }
// }
