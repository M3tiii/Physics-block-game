V = {
    W: window.innerWidth * 2,
    H: window.innerHeight * 2,
    MenuHeight: window.innerHeight * 2 / 10,
    score: 0,
    Blocklist: [],
    Menulist: [],
    level: [],
    actualLevel: [],
    actual: 0,
    actualBox: {},
    menuPage: 0,
    volume: true,
    info: false,
    rand: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};
//LOAD IMAGE
retry = new Image();
retry.src = 'img/retry.png';
exit = new Image();
exit.src = 'img/exit.png';
okey = new Image();
okey.src = 'img/okey.png';
volumeoff = new Image();
volumeon = new Image();
volumeon.src = 'img/volumeon.png';
volumeoff = new Image();
volumeoff.src = 'img/volumeoff.png';
stars = new Image();
stars.src = 'img/stars.png';
// medival = new Image();
// medival.src = 'img/blacksmith.png';

window.onload = function() {
    setTimeout(function() {
        (stars.onload) = Game.init();
    }, 500);
};
//window.localStorage.clear();
Game = {
    init: function() {
        window.localStorage.setItem(0, true);
        window.localStorage.setItem(100, true);
        Engine = Matter.Engine, //
            World = Matter.World, //
            Bodies = Matter.Bodies, //
            Body = Matter.Body,
            Render = Matter.Render,
            Constraint = Matter.Constraint,
            Composite = Matter.Composite, //
            Composites = Matter.Composites,
            Sleeping = Matter.Sleeping, //
            MouseConstraint = Matter.MouseConstraint, //
            Events = Matter.Events;

        engine = Engine.create(document.body, {
            enableSleeping: true,
            render: {
                options: {
                    //background: './img/t20.png',
                    showSleeping: false,
                    wireframes: false,
                    width: V.W,
                    height: V.H,
                },

            }
        });
        //console.log(engine.render)

        engine.render.canvas.style.width = V.W / 2 + "px";
        engine.render.canvas.style.height = (V.H - 10) / 2 + "px";
        // engine.render.canvas.position = "absolute";
        // engine.render.canvas.style.top = "0px";
        Engine.run(engine);

        V.level.push(levelData1());
        V.level.push(levelData2());


        Game.layout();
    },

    layout: function() {
        canvasMenu = document.createElement('canvas');
        canvasMenu.width = V.W * 2;
        canvasMenu.height = V.H;
        canvasMenu.style.width = V.W + "px";
        canvasMenu.style.height = V.H / 2 + "px";
        canvasMenu.style.position = "absolute";
        canvasMenu.style.left = "0px";
        canvasMenu.style.top = "0px";
        //canvasMenu.style.zIndex = "3";
        ctxMenu = canvasMenu.getContext('2d');

        canvasMenu.addEventListener("touchend", Game.menuOnKey, false);
        canvasMenu.addEventListener("touchmove", function(e) {
            e.preventDefault()
        }, false);

        canvas = document.createElement('canvas');
        canvas.width = V.W;
        canvas.height = V.H - V.MenuHeight;
        canvas.style.width = V.W / 2 + "px";
        canvas.style.height = (V.H - V.MenuHeight) / 2 + "px";
        canvas.style.position = "absolute";
        canvas.style.left = "0px";
        canvas.style.top = V.MenuHeight / 2 + "px";
        ctx = canvas.getContext('2d');
        //console.log(canvas.style);

        canvasKey = document.createElement('canvas');
        canvasKey.width = V.W;
        canvasKey.height = V.H - V.MenuHeight;
        canvasKey.style.width = V.W / 2 + "px";
        canvasKey.style.height = (V.H - V.MenuHeight) / 2 + "px";
        canvasKey.style.position = "absolute";
        canvasKey.style.left = "0px";
        //canvas.style.zIndex = "2 ";
        canvasKey.style.top = V.MenuHeight / 2 + "px";
        ctxKey = canvasKey.getContext('2d');

        document.body.appendChild(canvasKey);
        document.body.appendChild(canvas);
        document.body.appendChild(canvasMenu);

        ctxKey.fillStyle = "grey";
        ctxKey.lineWidth = 2;

        theme = new Howl({
            urls: ['sound/sky.mp3'],
            loop: true,
            volume: 0.2,
        })

        //theme.play();

        Game.menu();
    },
    menu: function() {

        allowMove = true;
        canvasMenu.style.display = "block";
        fontSize = V.H / 15;
        packs = [{
                name: "Can you reach?",
                colorBack: "#00b9d2",
                colorFront: "#0099AD",
                levelComplete: 0,
                enable: true
            },
            {
                name: "Can you hold?",
                colorBack: "#E37676",
                colorFront: "#C26363",
                levelComplete: 0,
                enable: false
            },
            {
                name: "Construct bridge",
                colorBack: "#9C9595",
                colorFront: "#827C7C",
                levelComplete: 0,
                enable: false
            }
        ];
        actualPack = 0;

        levelPackMenu(actualPack);
        mainMenu();
        animTapMenu();
    },
    menuOnKey: function(ev) {

        var y = ev.changedTouches[0].pageY * 2;
        var x = ev.changedTouches[0].pageX * 2;

        manageMenu(x, y);

    },
    menuOnKeyMove: function(ev) {

        var y = ev.changedTouches[0].pageY * 2;
        var x = ev.changedTouches[0].pageX * 2;
        console.log(document.body.style.left);
        //manageMenu(x,y);

    },
    onKey: function(ev) {

        x = ev.changedTouches[0].pageX * 2;
        y = ev.changedTouches[0].pageY * 2;
        //Rerty && Exit
        if (ev.type == "touchend")
            if (y > V.H - exit.height && x < exit.width) {
                Game.clear(false);
                //console.log("WYJSCIE Z POZIOMU");

            } else if (y > V.H - retry.height && x > V.W - retry.width) {
            Game.clear(true);
        }

        y = y - ((V.H - y) / 3) - V.H / 10;
        selected = V.level[actualPack][V.actual].shape[V.actualBox.shapeId];
        if (selected && !mouse.body && blockCount[V.actualBox.shapeId] > 0)
            if (ev.type == "touchmove") {
                ctxKey.clearRect(0, 0, V.W, V.H);
                x = x;
                y = y;
                switch (selected.type) {
                    case "rect":
                        ctxKey.beginPath();
                        ctxKey.fillRect(x - selected.xs / 2, y - selected.ys / 2 - V.MenuHeight, selected.xs, selected.ys);
                        ctxKey.strokeRect(x - selected.xs / 2, y - selected.ys / 2 - V.MenuHeight, selected.xs, selected.ys);

                        break;
                    case "circle":
                        ctxKey.beginPath();
                        ctxKey.arc(x, y - V.MenuHeight, selected.rs, 0, 2 * Math.PI);
                        ctxKey.fill();
                        ctxKey.stroke();
                        break;
                    case "triangle":
                        var mx = x;
                        var my = y - V.MenuHeight;
                        ctxKey.beginPath();
                        ctxKey.moveTo(mx + (mx - mx) * Math.cos(selected.options.angle) - (my - selected.ys / 2 - my) * Math.sin(selected.options.angle), my + (mx - mx) * Math.sin(selected.options.angle) + (my - selected.ys / 2 - my) * Math.cos(selected.options.angle));
                        ctxKey.lineTo(mx + (mx + selected.xs / 2 - mx) * Math.cos(selected.options.angle) - (my + selected.ys / 2 - my) * Math.sin(selected.options.angle), my + (mx + selected.xs / 2 - mx) * Math.sin(selected.options.angle) + (my + selected.ys / 2 - my) * Math.cos(selected.options.angle));
                        ctxKey.lineTo(mx + (mx - selected.xs / 2 - mx) * Math.cos(selected.options.angle) - (my + selected.ys / 2 - my) * Math.sin(selected.options.angle), my + (mx - selected.xs / 2 - mx) * Math.sin(selected.options.angle) + (my + selected.ys / 2 - my) * Math.cos(selected.options.angle));
                        ctxKey.lineTo(mx + (mx - mx) * Math.cos(selected.options.angle) - (my - selected.ys / 2 - my) * Math.sin(selected.options.angle), my + (mx - mx) * Math.sin(selected.options.angle) + (my - selected.ys / 2 - my) * Math.cos(selected.options.angle));
                        ctxKey.fill();
                        ctxKey.stroke();
                        break;

                }
            } else if (ev.type == "touchend") {
            for (var i = 0; i < engine.world.bodies.length; i++) {
                Sleeping.set(engine.world.bodies[i], false);
            }
            //console.log(selected);
            ctxKey.clearRect(0, 0, V.W, V.H);
            if (y < V.MenuHeight * 2) {
                //console.log("menu");
            } else {
                if (selected.type == "rect") {
                    V.Blocklist[V.Blocklist.length] = Bodies.rectangle(x, y, selected.xs, selected.ys, selected.options);
                } else if (selected.type == "circle") {
                    V.Blocklist[V.Blocklist.length] = Bodies.circle(x, y, selected.rs, selected.options, [20]);
                } else if (selected.type == "triangle") {
                    V.Blocklist[V.Blocklist.length] = Bodies.trapezoid(x, y, selected.xs, selected.ys, selected.slope, selected.options);
                }
                blockCount[V.actualBox.shapeId]--;
                blockCount[blockCount.length - 1]--;
                V.actualBox.text = blockCount[V.actualBox.shapeId] + "";
                World.add(engine.world, [V.Blocklist[V.Blocklist.length - 1]]);
            }
        }
    },
    clear: function(retry) {
        if (!clearing) {
            clearing = true;
            for (var i = 0; i < engine.world.bodies.length; i++) {
                Body.setStatic(engine.world.bodies[i], false);
                Sleeping.set(engine.world.bodies[i], false);
                engine.world.bodies[i].mass = 10;
            }
            Events.off(engine, "tick");
            var timerClear = setInterval(function() {
                for (var i = 0; i < engine.world.bodies.length; i++)
                    if (engine.world.bodies[i].position.y > V.H * 2)
                        Composite.remove(engine.world, engine.world.bodies[i]);

                if (engine.world.bodies.length <= blockCount.length) {

                    console.log("clear")
                    World.clear(engine.world, false);
                    V.actualBox = {};
                    V.Blocklist = [];

                    ctxKey.clearRect(0, 0, V.W, V.H);
                    ctx.clearRect(0, 0, V.W, V.H);
                    document.removeEventListener("touchmove", Game.onKey, true);
                    document.removeEventListener("touchend", Game.onKey, true);
                    levelPackMenu(actualPack);

                    if (retry)
                        Game.play(V.actual);
                    else
                        canvasMenu.style.display = "block";

                    window.clearTimeout(timerClear);
                    return true;
                }
            }, 100);
        }
    },
    play: function(level) {
        document.addEventListener("touchmove", Game.onKey, true);
        document.addEventListener("touchend", Game.onKey, true);
        ctx.clearRect(0, 0, V.W, V.H);
        mouse = MouseConstraint.create(engine, {
            constraint: {
                stiffness: 1.2
            }
        });

        World.add(engine.world, [mouse]);

        V.actual = level;
        prepare(V.actual);
        //Chek height of boxes, Delete/Win
        win = false;
        clearing = false;
        V.level[actualPack][level].goal ? goal = V.level[actualPack][level].goal.y : 0;
        timer = 0;
        //starsCounter = 0;
        Events.on(engine, "collisionStart", function(e) {
            if (e.pairs[0].bodyA.spike) {
                Game.clear(true);
                //console.log("Przegrana");
            }

        })
        Events.on(engine, "tick", function(e) {
            //Menu block manage
            for (var i = 1; i < engine.world.constraints.length; i++) {
                //console.log(engine.world.constraints[i].bodyB.position.y)
                if (engine.world.constraints[i].bodyB.position.y >= V.H / 7) {

                    V.actualBox = engine.world.constraints[i].bodyB;
                    engine.world.constraints[i].pointA.y = 0;
                    for (var j = 1; j < i; j++)
                        engine.world.constraints[j].pointA.y = -V.MenuHeight / 1.5;
                    for (var j = i + 1; j < engine.world.constraints.length; j++)
                        engine.world.constraints[j].pointA.y = -V.MenuHeight / 1.5;
                    break;
                }
            }
            switch (actualPack) {
                case 0:
                    for (var i = 0; i < engine.world.bodies.length; i++) {

                        if (engine.world.bodies[i].position.y > V.H * 2) {
                            Composite.remove(engine.world, engine.world.bodies[i])
                        } else if (engine.world.bodies[i].bounds.min.y <= goal && engine.world.bodies[i].speed < 2 && !engine.world.bodies[i].menu) {
                            var tmpIn = true
                            timer += 0.5;
                            if (timer >= 200) {
                                Game.clear(false)
                                window.localStorage.setItem(actualPack * 100 + level, true);
                                console.log("WYGRALES");
                            }
                        }
                    }
                    stardraw(timer, goal);
                    if (!tmpIn) {
                        timer = 0;
                    }
                    break;
                    //@@@@@@@@@@@@@@@@
                case 1:
                    for (var i = 0; i < engine.world.bodies.length; i++) {
                        if (engine.world.bodies[i].position.y > V.H * 2) {
                            Composite.remove(engine.world, engine.world.bodies[i])
                            Game.clear(true);
                            console.log(engine.world.bodies[i]);
                        }
                    }
                    if (!blockCount[blockCount.length - 1]) {
                        timer++;
                        if (timer >= 200) {
                            Game.clear(false);
                            window.localStorage.setItem(actualPack * 100 + level, true);
                            console.log("WYGRALES");
                        }
                    }
                    break;
                    //@@@@@@@@@@@@@@@@
                case 2:
                    break;
            }

        });


    },
}
