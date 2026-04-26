// src/lib/wordCategories.ts
// IMPORTANT: This file is hard-coded with a fixed set of categories and words. Not all words in the Quick Draw dataset are included, and some may be missing. This is intentional to ensure a manageable set of categories for the game.
const categories: Record<string, string[]> = {
    animals: [
        "ant", "bat", "bear", "bee", "bird", "butterfly", "camel", "cat",
        "cow", "crab", "crocodile", "deer", "dog", "dolphin", "dragon",
        "duck", "elephant", "fish", "flamingo", "frog", "giraffe", "gorilla",
        "hedgehog", "hippo", "horse", "kangaroo", "lion", "lobster", "monkey",
        "mosquito", "mouse", "octopus", "owl", "panda", "parrot", "penguin",
        "pig", "rabbit", "rhinoceros", "scorpion", "shark", "sheep", "snail",
        "snake", "spider", "squirrel", "swan", "tiger", "whale", "zebra",
    ],
    food: [
        "apple", "banana", "birthday cake", "bread", "broccoli", "cake",
        "carrot", "cookie", "donut", "grapes", "hamburger", "hot dog",
        "ice cream", "lollipop", "mushroom", "onion", "peanut", "pear",
        "pineapple", "pizza", "potato", "sandwich", "steak", "strawberry",
        "sushi", "watermelon",
    ],
    vehicles: [
        "airplane", "ambulance", "bicycle", "boat", "bus", "car", "cruise ship",
        "firetruck", "helicopter", "motorbike", "pickup truck", "police car",
        "sailboat", "school bus", "speedboat", "submarine", "tractor",
        "train", "truck", "van",
    ],
    nature: [
        "beach", "cloud", "fire", "flower", "leaf", "lightning", "moon",
        "mountain", "ocean", "rainbow", "river", "snowflake", "star",
        "sun", "tornado", "tree", "volcano", "waterfall",
    ],
    household: [
        "alarm clock", "axe", "backpack", "bathtub", "bed", "bench", "book",
        "broom", "bucket", "camera", "candle", "chair", "clock", "couch",
        "cup", "door", "dresser", "drill", "flashlight", "fork", "hammer",
        "key", "knife", "ladder", "lamp", "lantern", "microwave", "mirror",
        "mug", "paintbrush", "pencil", "pillow", "rake", "saw", "scissors",
        "shovel", "sink", "skateboard", "sock", "spoon", "table", "telephone",
        "television", "toilet", "toothbrush", "umbrella", "vase", "window",
    ],
    sports: [
        "baseball", "baseball bat", "basketball", "boomerang", "bowling",
        "diving board", "hockey stick", "golf club", "roller coaster",
        "skateboard", "soccer ball", "tennis racquet", "yoga",
    ],
    body: [
        "arm", "brain", "ear", "elbow", "eye", "face", "finger", "foot",
        "hand", "head", "knee", "leg", "lips", "mouth", "nose", "shoulder",
        "skull", "tooth", "tongue",
    ],
    clothing: [
        "baseball cap", "belt", "boots", "bracelet", "crown", "dress",
        "earring", "flip flops", "glasses", "gloves", "hat", "helmet",
        "jacket", "jeans", "necklace", "pants", "purse", "ring", "shorts",
        "sneaker", "sock", "suit", "sweater", "t-shirt", "tie",
    ],
    places: [
        "barn", "bridge", "castle", "church", "eiffel tower", "fence",
        "garden", "hospital", "house", "igloo", "jail", "lighthouse",
        "mailbox", "pool", "pyramid", "skyscraper", "tent", "windmill",
    ],
    music: [
        "cello", "drums", "guitar", "harp", "microphone", "piano",
        "saxophone", "trombone", "trumpet", "violin",
    ],
};

const categoryLabels: Record<string, { en: string; no: string }> = {
    animals:   { en: "Animal",    no: "Dyr" },
    food:      { en: "Food",      no: "Mat" },
    vehicles:  { en: "Vehicle",   no: "Kjøretøy" },
    nature:    { en: "Nature",    no: "Natur" },
    household: { en: "Object",    no: "Gjenstand" },
    sports:    { en: "Sports",    no: "Sport" },
    body:      { en: "Body",      no: "Kropp" },
    clothing:  { en: "Clothing",  no: "Klær" },
    places:    { en: "Place",     no: "Sted" },
    music:     { en: "Music",     no: "Musikk" },
};

export function getCategory(word: string, lang: string = "en"): string | null {
    const normalized = word.toLowerCase().trim();
    for (const [key, words] of Object.entries(categories)) {
        if (words.includes(normalized)) {
            const label = categoryLabels[key];
            return lang === "no" ? label.no : label.en;
        }
    }
    return null;
}