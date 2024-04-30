const xpr = require('express')
const app = xpr()
app.use(xpr.static('./public'))

app.get('/quote/:subject', (req, res) => res.send(quotes[Math.floor(Math.random()*quotes.length)]))
app.get('/tip/:subject', (req, res) => res.send(tips[Math.floor( Math.random()*tips.length)]))

app.listen(8787, () => console.log('ready'))


let tips = [
    "Store herbs like cut flowers — trim the stems and place in water.",
    "Keep potatoes in a cool, dark place to prevent sprouting.",
    "Freeze leftover sauces in ice cube trays for easy use later.",
    "Soak onions in water before chopping to reduce tears.",
    "Use a spoon to peel ginger to minimize waste.",
    "Marinate meat with acidic ingredients (like vinegar or lemon juice) to enhance tenderness.",
    "Keep bananas separate from other fruits to avoid speeding up their ripening.",
    "Preheat your pans before adding oil to reduce sticking.",
    "Add a pinch of salt to coffee grounds before brewing to enhance flavor.",
    "Roll citrus fruits on the counter before juicing to maximize juice extraction.",
    "Refresh wilted vegetables by soaking them in ice water.",
    "Use unsalted butter in baking to better control the saltiness of your dishes.",
    "Invest in a sharp chef's knife to make chopping more efficient and safer.",
    "Let cooked meat rest before cutting to retain its juices.",
    "Store spices in a cool, dark place to extend their shelf life.",
    "Use baking soda to help soften beans faster during cooking.",
    "Toast nuts and seeds to boost their flavor before adding to dishes.",
    "Check eggs for freshness by placing them in a bowl of water; fresh eggs will sink.",
    "Use a paper towel in salad bags to absorb moisture and keep leaves fresh longer.",
   "Freeze bread to extend its freshness; thaw slices as needed."
]

let quotes = [
    "Pets are humanizing. They remind us we have an obligation and responsibility to preserve and nurture and care for all life. - James Cromwell",
    "The better I get to know men, the more I find myself loving dogs. - Charles de Gaulle",
    "Dogs are not our whole life, but they make our lives whole. - Roger Caras",
    "Until one has loved an animal, a part of one's soul remains unawakened. - Anatole France",
    "Animals are such agreeable friends—they ask no questions; they pass no criticisms. - George Eliot",
    "A dog is the only thing on earth that loves you more than he loves himself. - Josh Billings",
    "What greater gift than the love of a cat. - Charles Dickens",
    "Time spent with cats is never wasted. - Sigmund Freud",
    "No matter how little money and how few possessions you own, having a dog makes you rich. - Louis Sabin",
    "The purity of a person's heart can be quickly measured by how they regard animals. - Anonymous",
    "Dogs do speak, but only to those who know how to listen. - Orhan Pamuk",
    "I think having an animal in your life makes you a better human. - Rachael Ray",
    "The smallest feline is a masterpiece. - Leonardo da Vinci",
    "Pets have more love and compassion in them than most humans. - Robert Wagner",
    "Dogs' lives are too short. Their only fault, really. - Agnes Sligh Turnbull",
    "The love of a pet is pure and unconditional, teaching us more about love than any book or sermon ever can. - Anonymous",
    "When I am feeling low all I have to do is watch my cats and my courage returns. - Charles Bukowski",
    "Cats choose us; we don’t own them. - Kristin Cast",
    "The ideal of calm exists in a sitting cat. - Jules Renard",
    "A house is not a home without a pet. - Anonymous"
]

