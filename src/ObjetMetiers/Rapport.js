import ReleveInformations from "./ReleveInformations";
import moment from "moment";
import ApportNutritionnel from "./ApportNutritionnel";

class Rapport {
    constructor(isNew = true, id, date, relevesInfos) {
        if (!isNew) {
            this.id = id;
            this.date = date;
            this.relevesInfos = [];

           if(relevesInfos !== undefined) {
               this.mapAndAddReleves(relevesInfos);
           }

        } else {
            this.date = moment().format('DD-MM-YYYY');
            this.relevesInfos = [];
        }
    }

    mapAndAddReleves(relesInfos) {

        relesInfos.forEach(releve => {

            this.relevesInfos.push(new ReleveInformations(ApportNutritionnel.of(releve.apportNutritionnel),
                releve.periode,
                releve.tension,
                releve.listPlats,
                false,
                releve.id
            ))
        })
    }

    addReleve(){
        this.relevesInfos.push(new ReleveInformations());
        return this;
    }

    deleteReleve(index){
        this.relevesInfos.splice(index, index + 1);
        return this;
    }
}

export default Rapport;