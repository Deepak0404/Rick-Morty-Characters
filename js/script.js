$(document).ready(function(){

// Cards result display
fetch('https://rickandmortyapi.com/api/character/')
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        var listing = data.results;
        var result = '';
        return listing.map(function(list){
            var years = list.created;
            result += `<div class="col-md-3 col-6 card-wrapper">
                            <i class="fa fa-address-card card-icon" aria-hidden="true"></i>
                            <div class="card text-white mb-4">
                                <img class="card-img-top" src="${list.image}" alt="${list.name}">
                                <div class="card-body">
                                    <h6 class="card-title">${list.name}</h6>
                                    <p class="card-text">
                                        <span data-id="${list.id}">ID: ${list.id}, </span>
                                        <span>Created: ${new Date(years).getFullYear()}</span>
                                    </p>
                                </div>
                                <ul class="list-group list-group-flush text-dark font-weight-bold">
                                    <li class="list-group-item">
                                        <i class="fa fa-heartbeat" aria-hidden="true"></i> Status: ${list.status}</li>
                                    <li class="list-group-item">
                                        <i class="fa fa-id-badge" aria-hidden="true"></i> Species: ${list.species}</li>
                                    <li class="list-group-item">
                                        <i class="fa fa-mars" aria-hidden="true"></i> Gender: ${list.gender}</li>
                                    <li class="list-group-item">
                                        <i class="fa fa-globe" aria-hidden="true"></i> Origin: ${list.origin.name}</li>
                                    <li class="list-group-item">
                                        <i class="fa fa-map-o" aria-hidden="true"></i> Last Location: ${list.location.name}</li>
                                </ul>
                            </div>
                        </div>`;
            $('#cardsListing').html(result);
        });
    })
    .catch(error => console.log(`Error: ${error}`));

    // Search
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#cardsListing .card-wrapper").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    // Sorting by ID
    $("#shortCards").click(function(){
        var sorted = $('.card-wrapper').sort(sort_card);
        $('#cardsListing').html(sorted);
    });

    function sort_card(a,b){
        return ($(a).data('id') < $(b).data('id')) ? 1 : -1;
    }

});