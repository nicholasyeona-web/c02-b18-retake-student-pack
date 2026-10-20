const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5123;

// ============================================================
// DATA
// ============================================================

// The whole street food menu in one list: hawker dishes ("Main"), desserts
// ("Dessert") and drinks ("Drink"). `state` is the state the item is best
// known for. `calories` is per serving; `price` is in Malaysian ringgit (RM).
const menu = [
  // ---- Main ----
  { id: 1,  name: "Char Kway Teow",           course: "Main",    state: "Penang",       mainIngredient: "Flat rice noodles and prawns",       calories: 740, price: 9.0 },
  { id: 2,  name: "Penang Asam Laksa",        course: "Main",    state: "Penang",       mainIngredient: "Rice noodles in tamarind fish broth", calories: 435, price: 8.5 },
  { id: 3,  name: "Nasi Kandar",              course: "Main",    state: "Penang",       mainIngredient: "Rice and mixed curries",             calories: 850, price: 12.0 },
  { id: 4,  name: "Nasi Lemak",               course: "Main",    state: "Kuala Lumpur", mainIngredient: "Coconut rice and sambal",            calories: 640, price: 6.0 },
  { id: 5,  name: "Mee Goreng Mamak",         course: "Main",    state: "Kuala Lumpur", mainIngredient: "Yellow noodles and potato",          calories: 660, price: 8.0 },
  { id: 6,  name: "Roti Canai",               course: "Main",    state: "Kuala Lumpur", mainIngredient: "Flatbread and dhal",                 calories: 300, price: 3.5 },
  { id: 7,  name: "Chicken Rice Balls",       course: "Main",    state: "Melaka",       mainIngredient: "Chicken and rice balls",             calories: 600, price: 10.0 },
  { id: 8,  name: "Nyonya Laksa",             course: "Main",    state: "Melaka",       mainIngredient: "Rice noodles in coconut curry",      calories: 590, price: 10.5 },
  { id: 9,  name: "Asam Pedas",               course: "Main",    state: "Melaka",       mainIngredient: "Fish in tamarind gravy",             calories: 380, price: 14.0 },
  { id: 10, name: "Ipoh Hor Fun",             course: "Main",    state: "Perak",        mainIngredient: "Flat rice noodles and chicken broth", calories: 410, price: 8.0 },
  { id: 11, name: "Ipoh Bean Sprout Chicken", course: "Main",    state: "Perak",        mainIngredient: "Poached chicken and bean sprouts",   calories: 520, price: 12.5 },
  { id: 12, name: "Rendang Tok",              course: "Main",    state: "Perak",        mainIngredient: "Beef and coconut milk",              calories: 560, price: 16.0 },
  { id: 13, name: "Nasi Kerabu",              course: "Main",    state: "Kelantan",     mainIngredient: "Blue rice and herbs",                calories: 530, price: 9.0 },
  { id: 14, name: "Ayam Percik",              course: "Main",    state: "Kelantan",     mainIngredient: "Chicken and spiced coconut sauce",   calories: 480, price: 11.5 },
  { id: 15, name: "Laksam",                   course: "Main",    state: "Kelantan",     mainIngredient: "Rice noodle rolls in fish gravy",    calories: 450, price: 7.0 },
  { id: 16, name: "Sarawak Laksa",            course: "Main",    state: "Sarawak",      mainIngredient: "Vermicelli noodles and prawns",      calories: 560, price: 11.0 },
  { id: 17, name: "Kolo Mee",                 course: "Main",    state: "Sarawak",      mainIngredient: "Egg noodles and barbecued chicken",  calories: 490, price: 6.5 },
  { id: 18, name: "Manok Pansoh",             course: "Main",    state: "Sarawak",      mainIngredient: "Chicken cooked in bamboo",           calories: 420, price: 18.0 },

  // ---- Dessert ----
  { id: 19, name: "Cendol",                   course: "Dessert", state: "Penang",       mainIngredient: "Pandan jelly and palm sugar",        calories: 290, price: 4.5 },
  { id: 20, name: "Ais Kacang",               course: "Dessert", state: "Penang",       mainIngredient: "Red beans and sweet corn",           calories: 320, price: 5.2 },
  { id: 21, name: "Apam Balik",               course: "Dessert", state: "Penang",       mainIngredient: "Crushed peanuts and sugar",          calories: 350, price: 3.8 },
  { id: 22, name: "Bubur Cha Cha",            course: "Dessert", state: "Penang",       mainIngredient: "Sweet potato and yam",               calories: 260, price: 3.5 },
  { id: 23, name: "Kuih Lapis",               course: "Dessert", state: "Kuala Lumpur", mainIngredient: "Rice flour and coconut milk",        calories: 180, price: 2.4 },
  { id: 24, name: "Pisang Goreng",            course: "Dessert", state: "Kuala Lumpur", mainIngredient: "Banana",                             calories: 300, price: 3.0 },
  { id: 25, name: "Kuih Seri Muka",           course: "Dessert", state: "Kuala Lumpur", mainIngredient: "Glutinous rice and pandan custard",  calories: 240, price: 2.6 },
  { id: 26, name: "Roti Tisu",                course: "Dessert", state: "Kuala Lumpur", mainIngredient: "Flatbread and condensed milk",       calories: 420, price: 5.5 },
  { id: 27, name: "Onde-Onde",                course: "Dessert", state: "Melaka",       mainIngredient: "Glutinous rice and palm sugar",      calories: 200, price: 2.5 },
  { id: 28, name: "Kuih Keria",               course: "Dessert", state: "Melaka",       mainIngredient: "Sweet potato",                       calories: 270, price: 2.8 },
  { id: 29, name: "Sago Gula Melaka",         course: "Dessert", state: "Melaka",       mainIngredient: "Sago pearls and palm sugar",         calories: 230, price: 4.0 },
  { id: 30, name: "Dodol",                    course: "Dessert", state: "Melaka",       mainIngredient: "Coconut milk and palm sugar",        calories: 210, price: 3.2 },
  { id: 31, name: "Tau Fu Fah",               course: "Dessert", state: "Perak",        mainIngredient: "Soy bean curd",                      calories: 150, price: 2.2 },
  { id: 32, name: "Egg Tart",                 course: "Dessert", state: "Perak",        mainIngredient: "Egg custard",                        calories: 360, price: 4.2 },
  { id: 33, name: "Heong Peng",               course: "Dessert", state: "Perak",        mainIngredient: "Maltose and fried shallots",         calories: 380, price: 6.0 },
  { id: 34, name: "Kaya Puff",                course: "Dessert", state: "Perak",        mainIngredient: "Coconut jam",                        calories: 330, price: 4.8 },
  { id: 35, name: "Akok",                     course: "Dessert", state: "Kelantan",     mainIngredient: "Egg and coconut milk",               calories: 250, price: 3.4 },
  { id: 36, name: "Puteri Mandi",             course: "Dessert", state: "Kelantan",     mainIngredient: "Glutinous rice and grated coconut",  calories: 190, price: 2.0 },
  { id: 37, name: "Jala Emas",                course: "Dessert", state: "Kelantan",     mainIngredient: "Egg yolk and sugar syrup",           calories: 280, price: 5.0 },
  { id: 38, name: "Nekbat",                   course: "Dessert", state: "Kelantan",     mainIngredient: "Egg and sugar syrup",                calories: 260, price: 3.6 },
  { id: 39, name: "Kek Lapis Sarawak",        course: "Dessert", state: "Sarawak",      mainIngredient: "Butter, eggs and spices",            calories: 310, price: 6.5 },
  { id: 40, name: "Kuih Penyaram",            course: "Dessert", state: "Sarawak",      mainIngredient: "Rice flour and palm sugar",          calories: 240, price: 1.8 },
  { id: 41, name: "Tebaloi",                  course: "Dessert", state: "Sarawak",      mainIngredient: "Sago flour and coconut",             calories: 220, price: 7.5 },
  { id: 42, name: "Kuih Chincin",             course: "Dessert", state: "Sarawak",      mainIngredient: "Rice flour and brown sugar",         calories: 230, price: 1.5 },

  // ---- Drink ----
  { id: 43, name: "Teh Tarik",                course: "Drink",   state: "Kuala Lumpur", mainIngredient: "Black tea and condensed milk",       calories: 180, price: 2.5 },
  { id: 44, name: "Teh Halia",                course: "Drink",   state: "Perak",        mainIngredient: "Milk tea and ginger",                calories: 150, price: 2.8 },
  { id: 45, name: "Teh O Ais Limau",          course: "Drink",   state: "Melaka",       mainIngredient: "Black tea and lime",                 calories: 90,  price: 2.6 },
  { id: 46, name: "Teh C Special",            course: "Drink",   state: "Sarawak",      mainIngredient: "Tea, palm sugar and evaporated milk", calories: 230, price: 4.5 },
  { id: 47, name: "Kopi O",                   course: "Drink",   state: "Penang",       mainIngredient: "Black coffee and sugar",             calories: 60,  price: 1.8 },
  { id: 48, name: "Ipoh White Coffee",        course: "Drink",   state: "Perak",        mainIngredient: "Coffee and condensed milk",          calories: 170, price: 3.2 },
  { id: 49, name: "Kopi Peng",                course: "Drink",   state: "Melaka",       mainIngredient: "Coffee, condensed milk and ice",     calories: 160, price: 2.7 },
  { id: 50, name: "Cham",                     course: "Drink",   state: "Kuala Lumpur", mainIngredient: "Coffee and milk tea",                calories: 170, price: 2.5 },
  { id: 51, name: "Milo Panas",               course: "Drink",   state: "Penang",       mainIngredient: "Chocolate malt and hot water",       calories: 200, price: 2.8 },
  { id: 52, name: "Milo Ais",                 course: "Drink",   state: "Kuala Lumpur", mainIngredient: "Chocolate malt and milk",            calories: 220, price: 3.0 },
  { id: 53, name: "Milo Dinosaur",            course: "Drink",   state: "Kuala Lumpur", mainIngredient: "Chocolate malt powder",              calories: 340, price: 5.0 },
  { id: 54, name: "Horlicks Ais",             course: "Drink",   state: "Sarawak",      mainIngredient: "Malted milk",                        calories: 210, price: 3.2 },
  { id: 55, name: "Air Limau",                course: "Drink",   state: "Melaka",       mainIngredient: "Calamansi lime",                     calories: 80,  price: 2.2 },
  { id: 56, name: "Limau Asam Boi",           course: "Drink",   state: "Penang",       mainIngredient: "Lime and salted plum",               calories: 100, price: 3.0 },
  { id: 57, name: "Air Tebu",                 course: "Drink",   state: "Perak",        mainIngredient: "Sugarcane",                          calories: 180, price: 3.5 },
  { id: 58, name: "Jus Buah Pala",            course: "Drink",   state: "Penang",       mainIngredient: "Nutmeg fruit",                       calories: 120, price: 4.0 },
  { id: 59, name: "Air Mata Kucing",          course: "Drink",   state: "Kuala Lumpur", mainIngredient: "Longan and monk fruit",              calories: 110, price: 2.5 },
  { id: 60, name: "Barley Ais",               course: "Drink",   state: "Sarawak",      mainIngredient: "Pearl barley and pandan",            calories: 120, price: 2.0 },
  { id: 61, name: "Teh Bunga Kekwa",          course: "Drink",   state: "Perak",        mainIngredient: "Chrysanthemum flowers",              calories: 50,  price: 2.2 },
  { id: 62, name: "Leong Cha",                course: "Drink",   state: "Sarawak",      mainIngredient: "Dried herbs",                        calories: 20,  price: 1.5 },
];

// ============================================================
// ENDPOINTS
// ============================================================

// GET /menu
// Query params (all optional, and all combinable in one request):
//   search : matches the name or the main ingredient - case-insensitive, partial
//   state  : filter by state (e.g. "Penang") - case-insensitive
//   course : filter by course ("Main", "Dessert" or "Drink") - case-insensitive
//   sort   : "name" (A to Z) or "price" (cheapest first; ties sorted by name)
//   page   : page number, default 1
//   limit  : items per page, default 10
// Search and filters are applied first, then sorting, then pagination, so
// `total` and `totalPages` count only the items that match.
app.get("/menu", (req, res) => {
  let results = [...menu];
  const { search, state, course, sort } = req.query;

  if (search) {
    const term = search.toLowerCase();
    results = results.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.mainIngredient.toLowerCase().includes(term)
    );
  }

  if (state) {
    results = results.filter(
      (item) => item.state.toLowerCase() === state.toLowerCase()
    );
  }

  if (course) {
    results = results.filter(
      (item) => item.course.toLowerCase() === course.toLowerCase()
    );
  }

  if (sort === "name") {
    results.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "price") {
    results.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  }

  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const start = (page - 1) * limit;

  res.json({
    page,
    limit,
    total: results.length,
    totalPages: Math.ceil(results.length / limit),
    data: results.slice(start, start + limit),
  });
});

// GET /states
// Returns the list of states used in the menu.
app.get("/states", (req, res) => {
  res.json([...new Set(menu.map((item) => item.state))].sort());
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Could not start the API on port ${PORT}: ${error.message}`);
    process.exit(1);
  }
  console.log(`Makan Trail API running on http://localhost:${PORT}`);
});
