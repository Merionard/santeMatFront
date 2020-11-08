import React from "react";
import Container from "react-bootstrap/Container";
import {Button, Form} from "react-bootstrap";
import Recette from "./Recette";
import LigneRecette from "./LigneRecette";
import CompteurApportNutritionnel from "./CompteurApportNutritionnel";
import axios from "axios";
import { Redirect } from "react-router-dom";

const ingredientOptions = initOptions();

class Plat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomPlat: '',
            lignesRecette: [],
            apportNutritionnel: {potassium: 0, calcium: 0, magnesium: 0, sodium: 0, phosphore: 0},
            count: 0, dataLines: [],
            redirect:null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addLine = this.addLine.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.deleteLine = this.deleteLine.bind(this);
        this.handleQteChange = this.handleQteChange.bind(this);
        this.majApportNutritionnel = this.majApportNutritionnel.bind(this);

    }

    handleSubmit() {
        const result = {
            nom: this.state.nomPlat,
            recette: {lignes:formatRecette(this.state.dataLines)},
            apportNutritionnel: this.state.apportNutritionnel
        };


        axios.post('http://localhost:8080/plat/add', result)
            .then(response => {
                console.log(response)
            })
            .catch(error => alert('une erreur est survenue dsl...' + error));

        this.setState({redirect:'/listPlats'})

    }

    handleChange(event) {
        console.log('event:' + event)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleQteChange(event, count) {
        // ajout de la quantité à la ligne correspondante
        const findLigne = (line) => line.count === count;
        let line = this.state.dataLines.find(findLigne);
        let deltaQuantite = isNaN(parseFloat(event.target.value)) ? 0 - line.quantite : parseFloat(event.target.value) - line.quantite;
        line.quantite = isNaN(parseFloat(event.target.value)) ? 0 : parseFloat(event.target.value);
        let dataLines = this.state.dataLines.slice();
        dataLines.splice(dataLines.findIndex(l => l.count === line.count), 1, line);
        this.setState({dataLines: dataLines});

        // maj apportNutriotionnel (seulement si un ingrédient est sélectionné)
        if (line.ingredient.nom !== undefined) {
            this.majApportNutritionnel(this.calculApportNutritionnel(line.ingredient, deltaQuantite));
        }
    }

    handleSelectChange(event, _, count) {
        // ajout de l'ingrédient à la line correspondante
        const findLigne = (line) => line.count === count;
        let line = this.state.dataLines.find(findLigne);
        // dans le cas où on changerait d'ingrédient avec une quantité déjà saisie il faut annuler l'apport du précédent ingrédient
        if(line.ingredient.nom !== undefined && line.ingredient !== event.value){
            this.majApportNutritionnel(this.calculApportNutritionnel(line.ingredient, line.quantite * -1));
        }
        line.ingredient = event.value;

        // maj apportNutritionnel
        this.majApportNutritionnel(this.calculApportNutritionnel(line.ingredient, line.quantite));


    }

    calculApportNutritionnel(ingredient, deltaQuantite) {

        let apport = {
            potassium: ingredient.apportNutritionnel.potassium * deltaQuantite,
            calcium: ingredient.apportNutritionnel.calcium * deltaQuantite,
            magnesium: ingredient.apportNutritionnel.magnesium * deltaQuantite,
            sodium: ingredient.apportNutritionnel.sodium * deltaQuantite,
            phosphore: ingredient.apportNutritionnel.sodium * deltaQuantite
        }
        if (ingredient.typeComptabilisation === 'POIDS') {
            apport.potassium = apport.potassium / 100
            apport.calcium = apport.calcium / 100
            apport.magnesium = apport.magnesium / 100
            apport.sodium = apport.sodium / 100
            apport.phosphore = apport.phosphore / 100
        }

        return apport;
    }

    majApportNutritionnel(apport) {

        let apportNutritionnel = this.state.apportNutritionnel;


        apportNutritionnel.potassium += apport.potassium
        apportNutritionnel.calcium += apport.calcium
        apportNutritionnel.magnesium += apport.magnesium
        apportNutritionnel.sodium += apport.sodium
        apportNutritionnel.phosphore += apport.phosphore

        apportNutritionnel.potassium = parseFloat(apportNutritionnel.potassium.toFixed(2));
        apportNutritionnel.calcium = parseFloat(apportNutritionnel.calcium.toFixed(2));
        apportNutritionnel.magnesium = parseFloat(apportNutritionnel.magnesium.toFixed(2));
        apportNutritionnel.sodium = parseFloat(apportNutritionnel.sodium.toFixed(2));
        apportNutritionnel.phosphore = parseFloat(apportNutritionnel.phosphore.toFixed(2));

        this.setState({apportNutritionnel: apportNutritionnel});
    }


    addLine() {
        let lignes = this.state.lignesRecette.slice();
        let dataLines = this.state.dataLines.slice();
        let count = this.state.count + 1;

        dataLines.push({count: count, ingredient: {}, quantite: 0});

        lignes.push(<LigneRecette
            key={this.state.lignesRecette.length}
            count={count}
            listIngredients={ingredientOptions}
            handleChange={this.handleSelectChange}
            handleQteChange={(event, count) => this.handleQteChange(event, count)}
            delete={(index) => this.deleteLine(index)}/>);

        this.setState({
            lignesRecette: lignes,
            count: count,
            dataLines: dataLines
        });

    }

    deleteLine(count) {
        //suppressions de la ligne
        let lignes = this.state.lignesRecette;
        const findLigne = (obj) => obj.props.count === count;
        lignes.splice(lignes.findIndex(findLigne), 1);
        this.setState({lignesRecette: lignes});

        //supression des data de la ligne + maj apportNutritionnel
        let dataLine = this.state.dataLines.find((line) => line.count === count);
        let dataLines = this.state.dataLines.slice();
        dataLines.splice(dataLines.findIndex(line => line.count === count), 1);

        if (dataLine.ingredient !== undefined && dataLine.ingredient.apportNutritionnel !== undefined) {
            this.majApportNutritionnel(this.calculApportNutritionnel(dataLine.ingredient, dataLine.quantite * -1))
        }

        this.setState({dataLines: dataLines});

    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return <Container>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Nom du plat</Form.Label>
                    <Form.Control
                        id="nomPlat"
                        name="nomPlat"
                        type="text"
                        value={this.state.nomPlat}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <CompteurApportNutritionnel apportNutritionnel={this.state.apportNutritionnel}/>
                <Recette handleClick={this.addLine} lignesRecette={this.state.lignesRecette}/>
                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        </Container>
    }

}

function initOptions() {
    let options = [];
    fetch('http://localhost:8080/ingredient/list')
        .then(result => result.json())
        .then(ingredients => ingredients.map(ingredient => options.push({value: ingredient, label: ingredient.nom})));
    return options;
}

function formatRecette(dataLines) {
    let lignes = [];
    dataLines.forEach(l=>lignes.push({ingredient:l.ingredient,quantite:l.quantite}));

    return lignes;
}


export default Plat
