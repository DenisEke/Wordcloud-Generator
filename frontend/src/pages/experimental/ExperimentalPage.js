import Paper from "@material-ui/core/Paper";
import React, {useContext, useEffect, useState} from "react";
import {WordsContext} from "../../providers/WordsProvider"
import {Box, Circle, Point, QuadTree} from "js-quadtree";

const TextToSVG = require('text-to-svg');

var newIntersect = require('path-intersection');

const WORDS = 50;
const HEIGHT = 1080;
const WIDTH = 1080;
// Create the bounding area of the quadtree (x, y, width, height)
const boundingArea = new Box(0, 0, WIDTH, HEIGHT);

// Instantiate  the new quadtree
const quadtree = new QuadTree(boundingArea, {capacity: 10});

export default function Experimental(props) {

    const wordsContext = useContext(WordsContext);
    const [words, setWords] = useState([]);

    useEffect(() => {
        generateWords();
    }, []);


    async function generateWords() {
        TextToSVG.load('https://cdn.rawgit.com/google/fonts/278aaad9/ofl/kanit/Kanit-Bold.ttf', function (err, textToSVG) {

            if (err) {
                alert(err);
                return;
            }

            const toPlace = [];

            for (let w = 0; w < WORDS; w++) {
                toPlace.push(wordsContext.words[Math.floor(Math.random() * wordsContext.words.length)].word);
            }

            const temp = [];

            for (let i = 0; i < toPlace.length; i++) {
                const word = toPlace[i];

                let x = Math.floor(Math.random() * WIDTH / 8 + WIDTH / 4);
                let y = Math.floor(Math.random() * HEIGHT / 8 + HEIGHT / 4);

                let fontSize = Math.floor(Math.random() * 72 + 10);

                let options = {x: x, y: y, fontSize: fontSize, anchor: 'top left'};

                let path = textToSVG.getD(word, options);
                let metrics = textToSVG.getMetrics(word, options);

                let iteration = 0;
                while (intersects(path, metrics, temp)) {


                    console.log("i: " + i + "iteration: " + iteration);
                    const p = getPoint(iteration);
                    x += p.x;
                    y += p.y;

                    fontSize--;

                    if (fontSize < 25) {
                        fontSize = 25;
                    }
                    options = {x: x, y: y, fontSize: fontSize, anchor: 'top left'};

                    path = textToSVG.getD(word, options);
                    metrics = textToSVG.getMetrics(word, options);

                    iteration += 100;

                }
                const {height, width} = metrics;
                const mx = metrics.x;
                const my = metrics.y;
                const bounds = [new Point(mx, my, {index: i}),
                    new Point(mx + width, my, {index: i}),
                    new Point(mx, my + height, {index: i}),
                    new Point(mx + width, my + height, {index: i})];

                const commands = path.split(/(?=[LMC])/);

                /*const pointArrays = commands.map(function(d){
                    const pointsArray = d.slice(1, d.length).split(',');
                    const pairsArray = [];
                    for(let i = 0; i < pointsArray.length; i += 2){
                        pairsArray.push([+pointsArray[i], +pointsArray[i+1]]);
                    }
                    return pairsArray;
                });*/
                commands.forEach((command) => {
                    command = command.replace("L", "");
                    command = command.replace("M", "");
                    command = command.replace("C", "");

                    const points = command.split(" ");

                    quadtree.insert(new Point(parseInt(points[0], parseInt(points[1], {index: i}))));
                });
                quadtree.insert(bounds);
                temp.push({path: path, metric: metrics});
            }

            setWords([...temp])
        });
    }

    return (
        <Paper>
            <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
                {
                    words.map((word) => <path fill={"#000000"} stroke={"#FFFFFF"} d={word.path}/>)
                }
                {
                    //words.map((word)=> <rect x={word.metric.x} y={word.metric.y} width={word.metric.width} height={word.metric.height} stroke={"black"} fill={"transparent"}/>)
                }
                {
                    //quadtree.getAllPoints().map((point)=><circle cx={point.x} cy={point.y} r={3} fill={"red"}/>)
                }
            </svg>
        </Paper>)

}

let last = null;

function intersects(path, metrics, temp) {
    if (last) {
        const intersection = newIntersect(last, path);
        if (intersection.length > 0) {
            return true;
        }
    }

    const {x, y, height, width} = metrics;


    //const points = quadtree.query(new Box(x, y, width, height));
    const points = quadtree.query(new Circle(x + width / 2, y + height / 2, width));

    for (let p = 0; p < points.length; p++) {
        const point = points[p];

        const intersection = newIntersect(temp[point.data.index].path, path);
        if (intersection.length > 0) {
            last = temp[point.data.index].path;
            return true;
        }
    }
    /*
        for (let j = 0; j < temp.length; j++) {

            const intersection = newIntersect(temp[j].path, path);
            if (intersection.length > 0) {
                last=temp[j].path;
                return true;
            }
        }*/
}

function getPoint(angle) {

    const a = 1;
    const b = 0.25;
    const x = (a + b * angle) * Math.cos(angle);
    const y = (a + b * angle) * Math.sin(angle);

    return {x: x, y: y}
}
