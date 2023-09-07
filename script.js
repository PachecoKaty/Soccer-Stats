document.addEventListener("DOMContentLoaded", function () {
    // Get the form by ID
    let form = document.getElementById('myForm');

    // Add event listener for send form
    form.addEventListener('submit', function (event) {
        event.preventDefault(); //Avoid default form submission

        // Get value league for form
        let leagueValue = form.querySelector('select[name="league"]').value;

        // Create an instance of XMLHttpRequest
        let xhr = new XMLHttpRequest();

        // Set up the AJAX request with the POST method and the URL of the PHP file
        xhr.open('POST', 'api_data.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); // Set up header

        // Define a function that is executed when the request complete
        xhr.onload = function () {
            //check status
            if (xhr.status === 200) {
                // get response JSON
                let response = JSON.parse(xhr.responseText);

                //Check if the property "standings" exists in the response
                if (response.hasOwnProperty('standings')) {
                    let standings = response.standings;

                    // iterate the array of standings an table
                    let template = ``;
                    
                    standings.forEach(function (standing) {
                        //represents an individual element in the 'standing.table' array
                        standing.table.forEach(function (data) {
                            template += `
                                <table class="table table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th>Posicion</th>
                                            <th></th>
                                            <th>Equipo</th>
                                            <th>Partidos Jugados</th>
                                            <th>Ganados</th>
                                            <th>Empatados</th>
                                            <th>Perdidos</th>
                                            <th>Puntos</th>
                                        <tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${data.position}</td>
                                            <td> <img src="${data.team.crest}" style="width: 100px; height: 100px;" alt="Logo equipo ${data.team.name}"> </td>
                                            <td>${data.team.name}</td>
                                            <td>${data.playedGames}</td>
                                            <td>${data.won}</td>
                                            <td>${data.draw}</td>
                                            <td>${data.lost}</td>
                                            <td>${data.points}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            `;
                            return template;
                        });
                    });
                    //passed the response in a table to the html
                    document.getElementById('football-data').innerHTML = template;
                } else {
                    console.log("La propiedad 'standings' no existe en la respuesta JSON.");
                }
            } else {
                console.log("Existe un error de tipo: " + xhr.status);
            }
        };

        // Send the request with the form data
        xhr.send('league=' + encodeURIComponent(leagueValue));
    });
});
