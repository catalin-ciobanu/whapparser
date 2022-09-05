
const rate_words = ["credit", "rata", "rate", "unicredit"];
const gradinita_words = ["gradinita", "gradi"];
const cumparaturi_words = ["cargus", "fancurier", "folie", "ceai", "nasturi", "emag",
    "lime", "scutece", "plăcintă", "batoane", "", "periuta", "palibo", "cartofi", "popcorn",
    "șuncă", "cumpărături", "aroma", "mancare", "gratar", "la2pasi", "kaufland", "piața",
    "kosarom", "exira", "carrefour", "carfur", "lidl", "profi", "selgros",
    "mega", "2pasi", "carmangerie", "cumparaturi", "cump", "auchan", "aeroport",
    "moldovencei", "cuptorul", "cuptor", "trans", "gigel", "bringo", "piata",
    "legume", "shopping", "mcs", "meat", "narghilea", "bere"];
const eatingOut_words = ["cwrtofisserie", "mcdonald", "covrigi", "branzoice", "shaworma",
    "salad", "cartofiserie", "kfc", "fornetti",
    "mcdonald's", "matrioska", "plăcinte", "mado", "box", "prânz", "limonada",
    "restaurant", "fenis", "krud", "mec", "mcdonalds", "mc", "trumpets",
    "eatingout", "petru", "simigerie", "nico", "pranz", "glovo", "cafea",
    "legend", "foodcourt", "court"];
const electricitate_words = ["eon", "curent"];
const gaz_words = ["gaz"];
const digi_words = ["digi"];
const gunoi_words = ["gunoi"];
const apa_words = ["apa", "apavital"];
const telefoane_words = ["orange", "telefon", "tel"];
const masini_words = ["taxi", "tramvai", "bilet", "bolt", "uber", "itp", "asigurare",
    "rompetrol", "rovigneta", "toyota",
    "benzina", "ford", "plin", "omv", "motorina", "benzinarie", "mol"];
const oana_words = ["oana"];
const sanatate_words = ["cervical", "teste", "echo", "implant", "gineco", "ecografie",
    "bioclinica", "synevo", "ortho", "plafaria", "pastile", "pcr", "stomato", "strepsils",
    "cardiologie", "radiografie", "plafar", "dentist", "bebetei", "farmacie", "farmacia",
    "catena", "dona",
    "tratament", "analize", "analiza", "dentesse"];
const jucarii_words = ["jucarii", "puzzle"];
const sala_words = ["prosop", "pedalas", "decathlon", "sala", "yoga", "worldclass",
    "inot", "fotbal"];
const unghii_words = ["epilat", "unghii", "manichiura", "pedichiura"];
const masaj_words = ["masaj", "natasa"];
const tuns_words = ["tuns", "geta", "neleapca", "moler"];
const home_words = ["leduri", "mini-vermorel", "monteaza", "irigație", "fitosanitare",
    "pavele", "dedeman", "leroy", "praktiker", "brico"];
const haine_words = ["damat", "spălătorie", "chiloți", "chiloti", "haine", "hanorac",
    "sandale", "sinsay", "hm", "pepco", "tricou", "tricouri", "papuci", "pantofi", "blugi",
    "camasa", "fashion", "pantaloni", "sosete", "chiloti"];
const entertainment_words = ["joaca", "circ", "joacă", "trambulina", "spotify", "youtube"];
const misc_words = ["cadou"];
const education_words = ["carturesti", "carte", "carti", "curs", "training", "workshop"];
const economii_words = ["economii"];
const other_investments_words = ["ripple", "pamant"];
const stocks_words = ["stock", "stocks", "xtb"];
const vacations_words = ["motogp", "italia", "vacanta"];
const charity_words = ["donatie", "charity", "donatia"];

const category = [
    { categ_name: "Rate", bucket_name: "Total Cheltuieli", categ_words: rate_words },
    { categ_name: "Gradinita", bucket_name: "Total Cheltuieli", categ_words: gradinita_words },
    { categ_name: "Cumparaturi", bucket_name: "Total Cheltuieli", categ_words: cumparaturi_words },
    { categ_name: "Eating out", bucket_name: "Total Cheltuieli", categ_words: eatingOut_words },
    { categ_name: "Electricitate", bucket_name: "Total Cheltuieli", categ_words: electricitate_words },
    { categ_name: "Gaz", bucket_name: "Total Cheltuieli", categ_words: gaz_words },
    { categ_name: "Digi", bucket_name: "Total Cheltuieli", categ_words: digi_words },
    { categ_name: "Gunoi", bucket_name: "Total Cheltuieli", categ_words: gunoi_words },
    { categ_name: "Apa", bucket_name: "Total Cheltuieli", categ_words: apa_words },
    { categ_name: "Telefoane", bucket_name: "Total Cheltuieli", categ_words: telefoane_words },
    { categ_name: "Masini/Transport", bucket_name: "Total Cheltuieli", categ_words: masini_words },
    { categ_name: "Oana", bucket_name: "Total Cheltuieli", categ_words: oana_words },
    { categ_name: "Sanatate", bucket_name: "Total Cheltuieli", categ_words: sanatate_words },
    { categ_name: "Jucarii", bucket_name: "Total Cheltuieli", categ_words: jucarii_words },
    { categ_name: "Sala", bucket_name: "Total Cheltuieli", categ_words: sala_words },
    { categ_name: "Unghii/Epilat", bucket_name: "Total Cheltuieli", categ_words: unghii_words },
    { categ_name: "Masaj", bucket_name: "Total Cheltuieli", categ_words: masaj_words },
    { categ_name: "Tuns", bucket_name: "Total Cheltuieli", categ_words: tuns_words },
    { categ_name: "Home projects", bucket_name: "Total Cheltuieli", categ_words: home_words },
    { categ_name: "Haine", bucket_name: "Total Cheltuieli", categ_words: haine_words },
    { categ_name: "Entertainment", bucket_name: "Total Cheltuieli", categ_words: entertainment_words },
    { categ_name: "Misc", bucket_name: "Total Cheltuieli", categ_words: misc_words },
    { categ_name: "Education", bucket_name: "Total Education", categ_words: education_words },
    { categ_name: "Economii", bucket_name: "Total Economii", categ_words: economii_words },
    { categ_name: "Other investments", bucket_name: "Investitii", categ_words: other_investments_words },
    { categ_name: "Stocks", bucket_name: "Total Investitii", categ_words: stocks_words },
    { categ_name: "Vacations", bucket_name: "Total Vacation", categ_words: vacations_words },
    { categ_name: "Charity", bucket_name: "Total Charity", categ_words: charity_words }];

module.exports = { constMaps: category };