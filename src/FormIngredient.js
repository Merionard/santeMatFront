import React from 'react';
import Container from "react-bootstrap/Container";
import {Button, Form} from "react-bootstrap";
import MySelect from "./MySelect";
import Col from "react-bootstrap/Col";
import axios from "axios";
import {withRouter } from 'react-router-dom';

class FormIngredient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nomIngredient: '',
            categorieIngredient: '',
            typeComptabilisation: '',
            potassium: 0,
            calcium: 0,
            magnesium: 0,
            sodium: 0,
            phosphore: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.initialiseForm = this.initialiseForm.bind(this);

    }

    handleChange(event) {
        console.log('event:' + event)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSelectChange(event, stateNameAttr) {
        this.setState({
            [stateNameAttr]: event.value
        })
    }

    componentDidMount() {
        console.log('init....');
        const param = this.props.match.params.pathParam;
        if (param !== 'undefined') {
            fetch('http://localhost:8080/ingredient/' + param)
                .then(result => result.json())
                .then(ingredient => {
                    console.log(ingredient);
                    return this.initialiseForm(ingredient)
                })
                .catch(error => console.log('for the url: http://localhost:8080/ingredient/' + param + ' error:' + error));
        }
    }

    initialiseForm(ingredient) {
        this.setState({
            nomIngredient: ingredient.nom,
            categorieIngredient: ingredient.categorie,
            typeComptabilisation: ingredient.typeComptabilisation,
            potassium: ingredient.apportNutritionnel.potassium,
            calcium: ingredient.apportNutritionnel.calcium,
            magnesium: ingredient.apportNutritionnel.magnesium,
            sodium: ingredient.apportNutritionnel.sodium,
            phosphore: ingredient.apportNutritionnel.phosphore
        })
    }

    handleSubmit() {
        const result = {
            nom: this.state.nomIngredient,
            typeComptabilisation: this.state.typeComptabilisation,
            categorie: this.state.categorieIngredient,
            apportNutritionnel: {
                potassium: this.state.potassium,
                sodium: this.state.sodium,
                calcium: this.state.calcium,
                magnesium: this.state.magnesium,
                phosphore: this.state.phosphore
            }
        };


        axios.post('http://localhost:8080/ingredient/add', result)
            .then(response => {
                console.log(response)
                alert("l'ingredient " + result.nom + " a bien été créé")
            })
            .catch(error => alert('une erreur est survenue dsl...' + error));

        this.props.history.push('/listIngredients');

    }

    render() {
        return (

            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Nom Ingredient</Form.Label>
                        <Form.Control
                            id="nomIngredient"
                            name="nomIngredient"
                            type="text"
                            value={this.state.nomIngredient}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <MySelect
                            name="categorieIngredient"
                            id="categorieIngredient"
                            label="CategorieIngredient"
                            options={categorieOptions}
                            handleChange={this.handleSelectChange}
                            defaultValue={defineIndexDefaultValue(this.state.categorieIngredient, categorieOptions)}>
                        </MySelect>

                    </Form.Group>
                    <Form.Group>
                        <MySelect
                            name="typeComptabilisation"
                            id="typeComptabilisation"
                            label="Type Comptabilisation"
                            options={typeComptaOptions}
                            handleChange={this.handleSelectChange}
                            defaultValue={defineIndexDefaultValue(this.state.typeComptabilisation, typeComptaOptions)}>
                        </MySelect>
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Potassium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="potassium en mg"
                                id="potassium"
                                name="potassium"
                                onChange={this.handleChange}
                                value={this.state.potassium}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Calcium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="calcium en mg"
                                id="calcium"
                                name="calcium"
                                onChange={this.handleChange}
                                value={this.state.calcium}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Magnesium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="magnesium en mg"
                                id="magnesium"
                                name="magnesium"
                                onChange={this.handleChange}
                                value={this.state.magnesium}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Sodium</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="Sodium en mg"
                                id="sodium"
                                name="sodium"
                                onChange={this.handleChange}
                                value={this.state.sodium}
                            />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phosphore</Form.Label>
                            <Form.Control
                                type="number"
                                step=".01"
                                placeholder="Phosphore en mg"
                                id="phosphore"
                                name="phosphore"
                                onChange={this.handleChange}
                                value={this.state.phosphore}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onS>
                        Valider
                    </Button>
                </Form>
            </Container>
        )
    }

}

function defineIndexDefaultValue(value, tab) {
    const findCategorie = (obj) => obj.value === value;
    return tab.findIndex(findCategorie);
}

{

}

const categorieOptions = [
    {value: 'LEGUME', label: 'Legume'},
    {value: 'FRUITS', label: 'Fruits'},
    {value: 'POISSON', label: 'Poisson'},
    {value: 'VIANDE', label: 'Viande'},
    {value: 'FECULENT', label: 'Feculent'},
    {value: 'HERBE', label: 'Herbe'},
];

const typeComptaOptions = [
    {value: 'UNITAIRE', label: 'Unitaire'},
    {value: 'POIDS', label: 'Poids'},
];

export default withRouter(FormIngredient);