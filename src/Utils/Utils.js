class Utils {

    static getLabelIndexFromArray(label, tab) {
        const findCategorie = (obj) => obj.label === label;
        return tab.findIndex(findCategorie);
    }

    static getValueIndexFromArray(value, tab) {
        const findCategorie = (obj) => obj.value === value;
        return tab.findIndex(findCategorie);
    }

}

export default Utils;