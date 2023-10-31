document.getElementById('loan-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    var vehicleType = document.getElementById('vehicle-type').value;
    var energyType = document.getElementById('energy-type').value;
    var mileage = parseFloat(document.getElementById('mileage').value);
    var year = parseFloat(document.getElementById('year').value);
    var passengers = parseFloat(document.getElementById('passengers').value);

    // Attribuer une Note Eco à chaque variable
    var vehicleTypeScore = { 'citadine': 8, 'cabriolet': 6, 'Berline': 6.5, 'SUV /4*4': 4 }[vehicleType] || 0;
    var energyTypeScore = { 'essance': 5, 'electrique': 9, 'gaz': 6, 'Diesel': 4, 'Hybride': 7 }[energyType] || 0;
    var mileageScore = mileage >= 25000 ? 1 : mileage >= 20000 ? 3 : mileage >= 15000 ? 5 : mileage >= 10000 ? 7 : 9;
    var yearScore = year >= 2010 ? 7 : year >= 2000 ? 5 : year >= 1990 ? 5 : year >= 1980 ? 4 : year >= 1970 ? 2 : 1;

    // Calculer le score du véhicule
    var vehicleScore = vehicleTypeScore + energyTypeScore + mileageScore + yearScore;

    // Calculer le taux d'emprunt
    var loanRate;
    if (vehicleScore >= 0 && vehicleScore < 11) {
        loanRate = 3.00;
    } else if (vehicleScore >= 11 && vehicleScore < 16) {
        loanRate = 2.74;
    } else if (vehicleScore >= 16 && vehicleScore < 26) {
        loanRate = 2.52;
    } else if (vehicleScore >= 26 && vehicleScore < 34) {
        loanRate = 2.10;
    } else if (vehicleScore >= 34 && vehicleScore <= 40) {
        loanRate = 1.85;
    }

    // Appliquer le bonus ou le malus en fonction du nombre de passagers
    loanRate += passengers == 1 ? 0.11 : passengers == 2 ? -0.17 : passengers == 3 ? -0.29 : passengers >= 4 ? -0.53 : 0;

    // Afficher le résultat
    document.getElementById('results').textContent = 'L’Emprunteur devra donc payer ' + loanRate.toFixed(2) + '% de frais pour cet emprunt car le véhicule va rouler ' + mileage + ' km / an pour ' + passengers + ' personne(s).';
});
