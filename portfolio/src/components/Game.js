import React, { useEffect, useState } from 'react';
import Char from "../GameLogic/Char";

let mousePos = {x: 0, y: 0};

function Game() {

    const [canvas, setCanvas] = useState();
    const [size, setSize] = useState();

    let canvasRef = React.createRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
        console.log("Canvas:", canvas)
        resizeCanvas();//do an initial resize for when it first renders, this function will also be called every time the window is resized too
    }, [canvasRef])

    useEffect(() => {
        window.addEventListener('resize', resizeCanvas)
    })

    function resizeCanvas() {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    if (canvas) {

        let c = canvas.getContext("2d");

        c.fillRect(100, 100, 100, 100);

        let fontSize = 30

        c.font = fontSize + 'px ' + 'Arial';
        c.lineWidth = 2;
        c.textBaseline = 'middle';
        c.textAlign = 'center';
        c.fillStyle = "white";

        let originalText = "Helllllo world! ! !!! Spacing test";
        let totalOffset = 0;

        let characters = []

        //initialize by filling characters array with Chars for each character in text
        for (let i = 0; i < originalText.length; i++) {
            let position = { x: window.innerWidth / 2 - c.measureText(originalText).width / 2 + (totalOffset + c.measureText(originalText[i]).width / 2), y: window.innerHeight / 2 }
            let char = new Char(originalText[i], position, c.measureText(originalText[i]).width, i);
            characters.push(char);
            totalOffset += c.measureText(originalText[i]).width;
        }

        let lastTime;

        function frame(currentTime) {

            c.clearRect(0, 0, canvas.width, canvas.height);//clear previous frame

            if (!lastTime) lastTime = currentTime;
            let deltaTime = currentTime - lastTime;//time since last frame
            lastTime = currentTime;

            //draw chars
            characters.forEach((char) => {
                c.fillText(char.text, char.position.x, char.position.y)
            });

            //draw paddle
            console.log("mouse pos", mousePos);
            let paddleWidth = 100;
            c.fillRect(mousePos.x - paddleWidth/2, window.innerHeight - window.innerHeight/10, paddleWidth, 15);

            requestAnimationFrame(frame);
        }

        frame();//get the frame loop going

    }


    return (
        <canvas onMouseMove={(e) => {mousePos={x: e.pageX, y: e.pageY}}} ref={canvasRef} id="game"></canvas>
    );
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
