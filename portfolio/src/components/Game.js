import React, { useEffect, useState } from 'react';
import GameLoop from "../GameLogic/GameLoop"

import * as GameStates from "../GameLogic/GameStates"

let gameLoop;//need to declare outside of Game() cause otherwise we'll lose reference to it and it will keep looping forever, never being garbage collected

let caretPos = 1;
let node;

function Game() {

    document.onselectionchange = function () {
        var sel = window.getSelection();
        console.log("Selection pos:", sel.focusOffset, sel);
    };

    let originalText = "Hello, my name is Daniel. Welcome to my portfolio.\nCheck out ⪼my projects⪻. Or, view my resume ⪼here⪻.\n\nYou can also edit this text and press Play to destroy it.";
    //use ⪼ character to start a link
    //use ⪻ character to end a link
    const [gameText, setGameText] = useState(originalText);

    //add href values here. When links are parsed, it will map these to each pair of ⪼ ⪻ characters, based on index
    let hrefs = ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", "https://www.youtube.com/watch?v=dQw4w9WgXcQ"]

    const [canvas, setCanvas] = useState();
    const [gameState, setGameState] = useState(GameStates.GAME_NOT_STARTED);

    let canvasRef = React.createRef();

    document.addEventListener('input', function (event) {
        if (event.target.tagName.toLowerCase() !== 'div') return;
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

    useEffect(() => {
        console.log("gameText changed", gameText);
        // var sel = window.getSelection();
        // if(sel.){
        //     caretPos = sel.anchorOffset;
        // }
        try {
            var range = document.createRange();
            var sel = window.getSelection();
            range.setStart(sel.anchorNode, caretPos);
            // console.error(sel.anchorNode);
            console.log("setting caret to ", caretPos);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        } catch { }
    }, [gameText])

    console.log("Rerendering Game")

    function setGameStateCallback(newGameState) {
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
        if (newGameState === GameStates.GAME_NOT_STARTED) {
            gameLoop.stopLoop();
        }
    }

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    let splitGameText = []//gameText but split where links were found and link names deleted
    let gameTextLinks = []//array of a elements

    let readingLink = false;
    let currentLinkText = "";
    let lastLinkEndIndex = 0;
    for (let i = 0; i < gameText.length; i++) {

        if (gameText[i] === "⪻") {//end of link or end of text
            lastLinkEndIndex = i + 1;
            //if(currentLinkText === "my projects" || currentLinkText === "here") {
            gameTextLinks.push(currentLinkText);
            //}
            currentLinkText = "";
            readingLink = false;
        }
        if (readingLink) {
            currentLinkText += gameText[i];
        }
        if (gameText[i] === "⪼") {//start of link
            readingLink = true;
            //console.log("Parsing link, text before: ", gameText.substring(lastLinkEndIndex, gameText[i - 1]), "game text:", gameText, "substring start:", lastLinkEndIndex, "end:", i - 1)
            splitGameText.push(gameText.substring(lastLinkEndIndex, i));
        }
        if (i === gameText.length - 1) {//end of gameText
            splitGameText.push(gameText.substring(lastLinkEndIndex, i + 1));
        }


    }

    function onLinkClick(e) {
        console.log("link clicked");
        window.location.href = e.target.getAttribute("href");
    }

    function formatGameText() {



        let linkTextIndex = 0;
        let gameTextIndex = 0;

        let result = []

        //console.log("attemping to intertwingle text and links. Looping ", splitGameText.length + gameTextLinks.length, "times");
        for (let i = 0; i < splitGameText.length + gameTextLinks.length; i++) {
            if (i % 2 === 0) {
                let text = splitGameText[gameTextIndex];
                gameTextIndex++;
                result.push(text);
            }
            else {
                console.log("rendering link with text", gameTextLinks[linkTextIndex], "href is", hrefs[linkTextIndex])
                let link = <a onChange={() => { console.error("DONT TOUCH MY LINKS") }} style={{ height: "1px" }} className="gameTextLink hover-shadow hover-color" href={hrefs[linkTextIndex]} onClick={(e) => onLinkClick(e)}>{gameTextLinks[linkTextIndex]}</a>;
                linkTextIndex++;
                result.push(link);
            }
        }

        return result;
    }

    function deformatGameText(innerHTML) {

        let readingElement = false;
        let result = ""

        for (let i = 0; i < innerHTML.length; i++) {
            if (innerHTML[i] === "<" && innerHTML[i + 1] !== "/") {
                result += "⪼";
                readingElement = true;
            }
            if (innerHTML[i] === "<" && innerHTML[i + 1] === "/") {
                result += "⪻";
                readingElement = true;
            }
            else if (innerHTML[i] === ">") {
                readingElement = false;
            }
            else if (!readingElement) {
                result += innerHTML[i];
            }
        }
        console.log("InnerHTML, deformatted result:", innerHTML, result);
        return result;
    }

    //console.log("result:" + formatGameText())

    //chrome by default will do weird shit like adding more divs inside of the contenteditable div after pressing enter, lets prevent that.
    function customEnterBehaviour(e) {
        if (e.keyCode === 13) {
            document.execCommand('insertHTML', false, '\n');
            e.preventDefault();
        }
        // if (e.keyCode === 8) {
        //     e.preventDefault();
        // }
    }

    switch (gameState) {
        case GameStates.GAME_NOT_STARTED:
            return (
                <div id="preGame">
                    {/* <div><textarea cols="40" id="preGameText" onChange={(e) => { setGameText(e.target.value) }}>{gameText}<a > test</a></textarea></div> */}
                    <div><span id="preGameText" contenteditable="true" onKeyUp={(e) => {
                    }} onInput={(e) => {
                        //super hacky but it fixes a bug, so.....
                        var sel = window.getSelection();
                        caretPos = sel.focusOffset;
                        node = e.target;
                        console.error(e.target)
                        setGameText(e.target.textContent);//deformatGameText(e.target.innerHTML.replace(/<br>/g, "").replace(/<div>/g, "").replace(/<\/div>/g, ""))
                        //setGameText(deformatGameText(e.target.innerHTML.replace(/<br>/g, "").replace(/<div>/g, "").replace(/<\/div>/g, "")))
                    }} onKeyDown={(e) => { customEnterBehaviour(e) }}>
                        {
                            gameText.includes("⪻") || gameText.includes("⪼") ?
                                formatGameText().map((textOrLink) => {
                                    return textOrLink;
                                })
                                :
                                gameText
                        }
                    </span></div>
                    <div class="columnPadding"></div>
                    <div className="buttonContainer">
                        <div><button onClick={(e) => { setGameState(GameStates.GAME_IN_PROGRESS) }}>Play</button></div>
                        <div><button onClick={(e) => { setGameText(originalText) }}>Reset</button></div>
                    </div>
                </div>
            );
        case GameStates.GAME_IN_PROGRESS:
            if (canvas) {
                if (gameLoop) {
                    gameLoop.stopLoop();
                }
                gameLoop = new GameLoop(canvas, gameText.replace(/⪼/g, "").replace(/⪻/g, ""), setGameStateCallback);
                gameLoop.startLoop();
            }
            return (
                <canvas onMouseMove={(e) => { if (gameLoop) gameLoop.updateMousePosition({ x: e.pageX, y: e.pageY }) }} ref={canvasRef} id="game"></canvas>
            );
        case GameStates.GAME_END_LOSS:
            return (
                <div class="gameOver">
                    <h1>GAME OVER</h1>
                    <div class="columnPadding"></div>
                    <button class="continueButton" onClick={(e) => { e.preventDefault(); setGameState(GameStates.GAME_NOT_STARTED) }}>Continue</button>
                </div>
            );
        case GameStates.GAME_END_WIN:
            return (
                <div class="gameOver">
                    <h1>YOU WON</h1>
                    <div class="columnPadding"></div>
                    <button class="continueButton" onClick={(e) => { setGameState(GameStates.GAME_NOT_STARTED) }}>Continue</button>
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
