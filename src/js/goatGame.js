    const carImg = "../images/car.png";
    const goatImg = "../images/goat.png";
    const doorImg = "../images/ClosedDoor.png";


    var Doors = [0, 0, 0];
    var carLocation = Math.floor(Math.random() * 3);
    Doors[carLocation] = 1;
    var gamesPlayed = 0;
    var gamesWon = 0;
    var gamesLost = 0;
    var keptDoor = 0;
    var switchDoors = 0;
    var switchDoorGames = 0;
    var keptDoorsGames = 0;
    var keptDoorLost = 0;
    var switchDoorLost = 0;
    var isKept = false;
    var choiceMade = 0;

    function testModal(stringToAlert) {
        $('#infoModal').modal('show');
        //window.alert("The string sent was: " + stringToAlert);
    }

    function test(st) {
        window.alert(st);
    }
    var string = "Door Zero: " + Doors[0] + "-- Door One: " + Doors[1] + "-- Door Two: " + Doors[2];

    function playAgain() {

        //$('#exampleModal').modal('show'); //reveals the modal without button being clicked
        Doors[0] = 0;
        Doors[1] = 0;
        Doors[2] = 0;

        carLocation = Math.floor(Math.random() * 3);
        Doors[carLocation] = 1;

        document.getElementById("door0").src = doorImg;
        document.getElementById("door1").src = doorImg;
        document.getElementById("door2").src = doorImg;
        document.getElementById("buttonDoor0").disabled = false;
        document.getElementById("buttonDoor1").disabled = false;
        document.getElementById("buttonDoor2").disabled = false;

        document.getElementById("door0").style.boxShadow = "none";
        document.getElementById("door1").style.boxShadow = "none";
        document.getElementById("door2").style.boxShadow = "none";
    } //end of play again


    function determineKeep(number) {
        if (number == 0)
            isKept = true;
        else
            isKept = false;

        choiceMade = 1;
    }

    function chooseDoor(x) {

        //while(choiceMade != 1){
        // $('#exampleModal').modal('show'); //will need seperate function for modal
        //}

        var revealGoat = x;
        //displays the other goat location
        while (revealGoat == x || revealGoat == carLocation) {
            revealGoat = Math.floor(Math.random() * 3);
        }

        var go = "door" + revealGoat;
        //document.getElementById(go).innerHTML = "jjj";
        document.getElementById(go).src = goatImg;
        // document.getElementById(go).onclick = test("Ttt");
        var stringToDisplay = "You selected door: " + (x + 1) + " There is a goat at door: " + (revealGoat + 1) + " Do you want to switch doors?";
        var isKept = window.confirm(stringToDisplay);

        var doorChoice = x;
        if (isKept) { //we switch
            var remainderDoor = 5;
            remainderDoor = remainderDoor - (x + 1);
            remainderDoor = remainderDoor - (revealGoat + 1);
            doorChoice = remainderDoor;
        }

        var userDoorChoice = "door" + doorChoice;

        document.getElementById(userDoorChoice).style.boxShadow = "0 0 100px greenyellow";

        if (Doors[0] == 0)
            document.getElementById("door0").src = goatImg;
        else
            document.getElementById("door0").src = carImg;

        if (Doors[1] == 0)
            document.getElementById("door1").src = goatImg;
        else
            document.getElementById("door1").src = carImg;

        if (Doors[2] == 0)
            document.getElementById("door2").src = goatImg;
        else
            document.getElementById("door2").src = carImg;

        updateStats(doorChoice, isKept);
        document.getElementById("buttonDoor0").disabled = true;
        document.getElementById("buttonDoor1").disabled = true;
        document.getElementById("buttonDoor2").disabled = true;
        window.alert("Door selected: " + (doorChoice + 1) + "Car was located at door: " + (carLocation + 1));
        printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoor, keptDoorLost);

    } //end of choose door

    function updateStats(x, isKept) {
        gamesPlayed++;
        if (isKept)
            switchDoorGames++;
        else
            keptDoorsGames++;

        if (x == carLocation) {
            gamesWon++;

            if (isKept)
                switchDoors++;
            else
                keptDoor++;
        } else {

            if (isKept)
                switchDoorLost++;
            else
                keptDoorLost++;

            gamesLost++;
        }

    } //end of update stats

    function simulateGame() {
        var switchDoor;
        var timesPlayed = document.getElementById("amountTimesToRun").value;

        switchDoor = window.confirm("Switch doors?");
        for (var i = 0; i < timesPlayed; i++) {
            playAgain();
            carLocation = Math.floor(Math.random() * 3);
            var userChoice = Math.floor(Math.random() * 3);
            var revealGoat = carLocation;

            while (revealGoat == carLocation || revealGoat == userChoice) {
                revealGoat = Math.floor(Math.random() * 3);
            }

            if (switchDoor) {
                var remainderDoor = 5;
                remainderDoor = remainderDoor - (userChoice + 1);
                remainderDoor = remainderDoor - (revealGoat + 1);
                userChoice = remainderDoor;
            }
            updateStats(userChoice, switchDoor);

            if (i == 0) {
                document.getElementById("buttonDoor0").disabled = false;
                document.getElementById("buttonDoor1").disabled = false;
                document.getElementById("buttonDoor2").disabled = false;
                document.getElementById("door0").src = doorImg;
                document.getElementById("door1").src = doorImg;
                document.getElementById("door2").src = doorImg;
            }

            if (i == timesPlayed - 1) {
                if (carLocation == 0)
                    document.getElementById("door0").src = carImg;
                else
                    document.getElementById("door0").src = goatImg;

                if (carLocation == 1)
                    document.getElementById("door1").src = carImg;
                else
                    document.getElementById("door1").src = goatImg;

                if (carLocation == 2)
                    document.getElementById("door2").src = carImg;
                else
                    document.getElementById("door2").src = goatImg;

                document.getElementById("buttonDoor0").disabled = true;
                document.getElementById("buttonDoor1").disabled = true;
                document.getElementById("buttonDoor2").disabled = true;
            }
        }//end of for loop

        printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoor, keptDoorLost);
    }//end of simulate game


    function resetStats() {
        gamesPlayed = 0;
        gamesWon = 0;
        gamesLost = 0;
        keptDoor = 0;
        switchDoors = 0;
        switchDoorGames = 0;
        keptDoorsGames = 0;
        keptDoorLost = 0;
        switchDoorLost = 0;

        document.getElementById("door0").src = doorImg;
        document.getElementById("door1").src = doorImg;
        document.getElementById("door2").src = doorImg;
        document.getElementById("buttonDoor0").disabled = false;
        document.getElementById("buttonDoor1").disabled = false;
        document.getElementById("buttonDoor2").disabled = false;

        playAgain();
        printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoor, keptDoorLost);

    }

    function printStatistics(gamesPlayed, gamesWon, gamesLost, switchDoorGames, switchDoors, switchDoorLost, keptDoorsGames, keptDoor, keptDoorLost) {

        document.getElementById("gamesPlayed").innerHTML = "Total Games Played: " + gamesPlayed;
        if (gamesWon != 0)
            document.getElementById("gamesWon").innerHTML = "Total Games Won: " + gamesWon + " (" + (((1.0 * gamesWon) / gamesPlayed) * 100).toFixed(2) + "%)";
        else
            document.getElementById("gamesWon").innerHTML = "Total Games Won: " + gamesWon + " (0%)";

        if (gamesLost != 0)
            document.getElementById("gamesLost").innerHTML = "Total Games Lost: " + gamesLost + " (" + (((1.0 * gamesLost) / gamesPlayed) * 100).toFixed(2) + "%)";
        else
            document.getElementById("gamesLost").innerHTML = "Total Games Lost: " + gamesLost + " (0%)";




        document.getElementById("switchDoorsGames").innerHTML = "Total games where switched door: " + switchDoorGames;

        if (switchDoors != 0)
            document.getElementById("switchDoorsWon").innerHTML = "Switched doors and won: " + switchDoors + " (" + (((1.0 * switchDoors) / switchDoorGames) * 100).toFixed(2) + "%)";
        else
            document.getElementById("switchDoorsWon").innerHTML = "Switched doors and won: " + switchDoors + " (0%)";

        if (switchDoorLost != 0)
            document.getElementById("switchDoorsLose").innerHTML = "Switched doors and lost: " + switchDoorLost + " (" + (((1.0 * switchDoorLost) / switchDoorGames) * 100).toFixed(2) + "%)";
        else
            document.getElementById("switchDoorsLose").innerHTML = "Switched doors and lost: " + switchDoorLost + " (0%)";




        document.getElementById("keptDoorsGames").innerHTML = "Total Games where kept door: " + keptDoorsGames;
        if (keptDoor != 0)
            document.getElementById("keptDoorsWon").innerHTML = "Kept doors and won: " + keptDoor + " (" + (((1.0 * keptDoor) / keptDoorsGames) * 100).toFixed(2) + "%)";
        else
            document.getElementById("keptDoorsWon").innerHTML = "Kept doors and won: " + keptDoor + " (0%)";

        if (keptDoorLost != 0)
            document.getElementById("keptDoorsLose").innerHTML = "Kept doors and lost: " + keptDoorLost + " (" + (((1.0 * keptDoorLost) / keptDoorsGames) * 100).toFixed(2) + "%)";
        else
            document.getElementById("keptDoorsLose").innerHTML = "Kept doors and lost: " + keptDoorLost + " (0%)";
    }//end print stats
