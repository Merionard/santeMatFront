import ApportNutritionnel from "./ApportNutritionnel";

class ReleveInformations{

    constructor(apportNutritionnel=new ApportNutritionnel(),periode,tension,listPlats,isNew=true) {

        this.apportNutritionnel = apportNutritionnel;
        this.periode = periode;
        this.tension = tension;
        this.listPlats = listPlats;
        this.new = isNew;

    }
}

export default ReleveInformations;