let normalFlavors = [];
let weirdFlavors = [];
let deletedNormalFlavors = [];
let deletedWeirdFlavors = [];

let undoStackNormal = []; // Stack to store the previous actions for normal tab
let undoStackWeird = []; // Stack to store the previous actions for weird tab

// Switch tabs for Normal and Weird Flavors
function switchTab(tab) {
  if (tab === "normal") {
    document.getElementById("normalTab").classList.add("active");
    document.getElementById("weirdTab").classList.remove("active");
    document.querySelector(".tab-button.active").classList.remove("active");
    document.querySelector(".tab-button:nth-child(1)").classList.add("active");
  } else {
    document.getElementById("weirdTab").classList.add("active");
    document.getElementById("normalTab").classList.remove("active");
    document.querySelector(".tab-button.active").classList.remove("active");
    document.querySelector(".tab-button:nth-child(2)").classList.add("active");
  }
}

// Generate Normal Flavor with Duplicate Check
document
  .getElementById("generateNormalButton")
  .addEventListener("click", function () {
    const baseFlavors = [
      "Vanilla",
      "Chocolate",
      "Strawberry",
      "Mint",
      "Coffee",
      "Cookie Dough",
      "Pistachio",
      "Caramel",
      "Cookies and Cream",
      "Neapolitan",
      "Raspberry",
      "Lemon",
      "Mango",
      "Butterscotch",
      "Rocky Road",
      "Blackberry",
      "Peach",
      "Maple Pecan",
      "Cotton Candy",
      "Tiramisu",
      "Salted Caramel",
      "Almond Joy",
      "Toffee Crunch",
      "Banana Split",
      "S'mores",
      "Cherry Garcia",
      "Pumpkin Spice",
      "Butter Pecan",
      "Blueberry Cheesecake",
      "Apple Cinnamon",
      "Lemon Meringue",
      "Orange Sorbet",
      "Matcha",
      "Butter Pecan",
      "Brown Sugar Cinnamon",
      "Cinnamon Roll",
      "Raisin",
      "Coconut Crunch",
      "Pineapple, Papaya",
      "Caramel Pecan",
      "Tropical Fruit",
      "Peach Cobbler",
      "Cinnamon Apple",
      "Basil Honey",
      "Honey Lavender",
      "Chocolate Chip Cookie",
      "Coconut Cream Pie",
      "Toasted Almond",
      "Maple Walnut",
      "Chocolate Mint",
      "Peach Melba",
      "Chocolate Fudge Swirl",
      "Apple Pie",
      "Carrot Cake",
      "Chocolate Brownie",
      "Cookie Butter",
      "Maple Bacon",
      "White Chocolate Raspberry",
      "S'mores Swirl",
      "Lemon Sorbet",
      "Peach Sorbet",
      "Cranberry Orange",
      "Red Velvet",
      "Blackberry Cheesecake",
      "Churros",
      "Lemon Curd",
      "Kiwi Lime",
      "Orange Blossom",
      "Cinnamon Toast Crunch",
      "Apple Cider Donut",
      "Mango Tango",
      "Pineapple Coconut",
      "Lemon Zest",
      "Tiramisu Coffee",
      "Mocha Almond Fudge",
      "Hazelnut",
      "Chocolate Truffle",
      "Smoked Salt Caramel",
      "Bubblegum",
      "Pistachio Honey",
      "Watermelon Sorbet",
      "Blackberry Lavender",
      "French Vanilla",
      "Cherry Almond",
      "Marshmallow Swirl",
      "Strawberry Rhubarb",
      "Brownie Batter",
      "Fig and Honey",
      "Choco-Matcha Crunch",
      "Macadamia Nut",
      "Earl Grey Vanilla",
      "Chocolate Caramel Swirl",
      "Pomegranate",
      "Lemon Basil",
      "Hazelnut Crunch",
      "Oatmeal Cookie",
      "Fudge Brownie",
      "Cranberry Pistachio",
      "Apple Cinnamon Streusel",
      "Tangerine Sorbet",
      "Apricot Brandy",
      "Sweet Potato",
      "Chocolate Chip Mint",
      "Banana Fudge",
      "Sweet Cinnamon",
      "Green Tea Matcha",
      "Chocolate Coconut",
      "Raspberry Truffle",
      "Cherry Cheesecake",
      "Caramel Apple",
      "Chocolate Cherry Swirl",
      "Praline Pecan",
      "Wildberry",
      "Honey Almond",
      "Dark Chocolate Raspberry",
      "Salted Honeycomb",
      "Coconut Pineapple",
      "Choco Coconut Almond",
      "Papaya Sorbet",
      "Blueberry Lemonade",
      "Brown Sugar Pecan",
      "Pear and Ginger",
      "Choco-Banana Chip",
      "Chocolate Hazelnut Truffle",
      "Raspberry Lychee",
      "Milk Chocolate Peanut Butter",
      "Coconut Fudge Brownie",
      "Tropical Dream",
      "Lemon Vanilla Bean",
      "Maple Pecan Praline",
      "Coffee Caramel Swirl",
      "Red Currant",
      "Butter Toffee Crunch",
      "Coconut Lime Sorbet",
      "Choco-Nut Brownie",
      "Wild Peach",
      "Strawberry Banana",
      "Peach Melba",
      "Orange Creamsicle",
      "Cinnamon Peach",
      "Blueberry Maple",
      "Pecan Pie",
      "Bourbon Pecan",
      "Apple and Brie",
      "Coconut Pumpkin Spice",
      "Cinnamon Maple",
      "S'mores Delight",
      "Mocha Pecan",
      "Salted Pretzel",
      "Almond Croissant",
      "Maple Cinnamon Roll",
      "Buttermilk Pancake",
      "Cinnamon Toast",
      "Honeycomb Caramel",
      "Pumpkin Cheesecake",
      "Spicy Churros",
      "Raspberry Cream Cheese",
      "Gingerbread Latte",
      "Caramel Popcorn",
      "Cherry Limeade",
      "Ginger Caramel",
      "Blueberry Yogurt",
      "Apple Fritter",
      "Raisin Swirl",
      "White Chocolate Matcha",
      "Sage Honey",
      "Cranberry Lime",
      "Banana Nut Crunch",
      "Coconut Rice Pudding",
      "Raspberry Sorbet",
      "Peach Bellini",
      "Cinnamon Almond",
      "Choco Chip Cookie Dough",
      "Avocado Lime",
      "Saffron Honey",
      "Smoked Maple Bacon",
      "Caramelized Pear",
      "Spiced Apple Cider",
      "Coconut Cream",
      "Taro Milk Tea",
      "Toffee Nut",
      "Chocolate Hazelnut Spread",
      "Peach Vanilla Bean",
      "Coconut Chocolate Chip",
      "Coconut Caramel",
      "Tiramisu Crunch",
      "Matcha Red Bean",
      "Strawberry Lemonade",
      "Caramel Apple Pie",
      "Passionfruit Sorbet",
      "Peach Nectar",
      "Coconut Lush",
      "Cinnamon Custard",
      "Carrot Cake Cream Cheese",
      "Almond Pistachio",
      "Peach Grapefruit",
      "Lemon Basil Sorbet",
      "Pumpkin Maple Swirl",
      "Oatmeal Cream Pie",
      "Maple Sugar",
      "Pineapple Passionfruit",
      "Mango Orange Sorbet",
      "Spiced Caramel Pecan",
      "Ginger Lemon",
      "Chai Latte",
      "Choco-Cinnamon Swirl",
      "Maple French Toast",
      "Coffee Toffee Crunch",
      "Raisin Nut",
      "Lemon Ricotta",
      "Salted Honey Lemon",
      "Ginger Pear",
      "Blueberry Lavender",
      "Brown Sugar Vanilla",
      "Mango Chutney",
      "Bourbon Caramel Pecan",
      "Mocha Marshmallow",
      "Maple Lemonade",
      "Spiced Chocolate",
      "Pistachio Date",
      "Cinnamon Fig",
      "Orange Cardamom",
      "Coconut Banana",
      "Chocolate Raspberry Swirl",
      "Toasted Pecan",
      "Strawberry Coffee",
      "Lime Gingerade",
      "Pineapple Chili",
      "Maple Cinnamon Sugar",
      "Matcha Macadamia",
      "Plum Sorbet",
      "Coconut Pistachio",
      "Fennel Orange",
      "Gingerbread Truffle",
      "Raspberry Champagne",
      "Chili Chocolate",
      "Fruity Cereal",
      "Lime Cilantro",
      "Honey Ginger",
      "Spicy Pineapple",
      "Banana Macadamia",
      "Choco Orange",
      "Coconut Lemon",
      "Honey Fennel",
      "Roasted Cherry",
      "Toasted Coconut Banana",
      "Mango Pineapple",
      "Chili Mango",
      "Cinnamon Blackberry",
      "Raspberry Truffle",
      "Peach Melba Swirl",
      "Raspberry Honeycomb",
      "Coconut Caramel Swirl",
      "Pistachio Vanilla Bean",
      "Tart Cherry",
      "Brown Butter",
      "Cinnamon Cardamom",
      "Pumpkin Ginger",
      "Coconut Mango Swirl",
      "Passionfruit Honey",
      "Blackberry Lime",
      "Peach Raspberry Sorbet",
      "Balsamic Strawberry",
      "Tropical Sorbet",
      "Maple Brown Sugar",
      "Pineapple Coconut Cream",
      "Saffron Pistachio",
      "Avocado Coconut",
      "Lemon Coconut",
      "Strawberry Rhubarb Pie",
      "Lemon Poppy Seed",
      "Hibiscus",
      "Chili Pepper",
      "Smoked Bacon",
      "Raspberry Vinegar",
      "Peach Orange",
      "Pineapple Jasmine",
      "Choco Hazelnut Fudge",
      "Rosemary Honey",
      "Ginger Lemon Sorbet",
      "Chili Coconut",
      "Carrot Cake Spice",
      "Butterfinger",
      "Key Lime",
      "Sriracha Peach",
      "Coconut Choco Truffle",
      "Mango Ginger Sorbet",
      "Blackberry Honeycomb",
      "Raspberry Mocha",
      "Vanilla Almond Butter",
      "Mango Key Lime",
      "Lemon Blackberry",
      "Lemon Chia",
      "Apple Orange Blossom",
      "Saffron Vanilla Bean",
      "Ginger Cinnamon",
      "Apple Cranberry",
      "Lemonade Pistachio",
      "Maple Bourbon",
      "Coconut Butter",
      "Almond Maple Crunch",
      "Lemon Poppyseed",
      "Rose Sorbet",
      "Choco Coconut Lush",
      "Mango Avocado"
    ];

    const addIns = [
      "Chocolate Chips",
      "Peanut Butter Swirl",
      "Oreos",
      "Brownie Chunks",
      "Fruit Swirl",
      "Marshmallows",
      "Nuts",
      "Coconut Flakes",
      "Fudge Sauce",
      "Candy Pieces",
      "Crushed Graham Crackers",
      "Caramel Swirl",
      "White Chocolate Chips",
      "Rainbow Sprinkles",
      "Chopped Almonds",
      "Biscotti Pieces",
      "Toffee Crunch"
    ];

    const randomBase =
      baseFlavors[Math.floor(Math.random() * baseFlavors.length)];
    const randomAddIn = addIns[Math.floor(Math.random() * addIns.length)];

    const generatedFlavor = `${randomBase} with ${randomAddIn}`;

    // Check if flavor already exists before adding it
    if (!normalFlavors.includes(generatedFlavor)) {
      normalFlavors.unshift(generatedFlavor); // Add the new flavor at the top
      updateNormalFlavorList();
    }
  });

// Generate Weird Flavor with Duplicate Check
document
  .getElementById("generateWeirdButton")
  .addEventListener("click", function () {
    const weirdFlavorsList = [
      "Bacon",
      "Pickle",
      "Spaghetti",
      "Wasabi",
      "Sriracha",
      "Garlic",
      "Curry",
      "Bubblegum with Cheese",
      "Chocolate and Chili",
      "Mustard",
      "Cucumber",
      "Olive",
      "Eggplant",
      "Cauliflower",
      "Vinegar",
      "Mochi",
      "Coconut Curry",
      "Cheddar Cheese",
      "Hot Sauce",
      "Anchovy",
      "Ranch",
      "Cotton Candy and Popcorn",
      "Ketchup",
      "Maple Syrup",
      "Chili with Lime",
      "Potato Chips",
      "Salami",
      "Squid Ink",
      "Durian",
      "Caviar",
      "Cheese Pizza",
      "Maple Bacon",
      "Spaghetti Bolognese",
      "Avocado",
      "Miso Soup",
      "Hot Dog",
      "Black Licorice",
      "Truffle",
      "Pickled Beets",
      "Sweet Corn",
      "Celery",
      "Pickled Ginger",
      "Raw Meat",
      "Fish Sauce",
      "Bacon with Maple",
      "Sweet Pickles",
      "Olive Oil",
      "Radish",
      "Sriracha",
      "Pickled Cabbage",
      "Peanut Butter and Jelly",
      "Sauerkraut",
      "Chocolate Bacon",
      "Peanut Butter and Chili",
      "Sweet Pickled Beets",
      "Dill Pickle and Mustard",
      "Hot Pepper Jelly",
      "Spicy Mango",
      "Salmon with Lemon",
      "Cucumber with Salt",
      "Garlic Parmesan",
      "Sweet Potato",
      "Gorgonzola Cheese",
      "Curry Pineapple",
      "Tuna Fish",
      "Mashed Potato",
      "Blue Cheese and Berries",
      "Bacon-wrapped Dates",
      "Sweet Onion and Cabbage",
      "Beef Jerky",
      "Seaweed",
      "Cheese Curds",
      "Olive",
      "Hot Chilli",
      "Brussels Sprouts",
      "Chicken Teriyaki",
      "Clam Chowder",
      "Pork Belly",
      "Maple Syrup",
      "Gorgonzola and Pear",
      "Roasted Garlic",
      "Onion Jam",
      "Carrot Cake with Mustard",
      "Cauliflower",
      "Pickled Jalapenos",
      "Spicy Hot Dog",
      "Pizza with Mozzarella",
      "Coconut Curry",
      "Cheese Flavored Ice Cream",
      "Onion Soup",
      "Beef Taco",
      "Sweet and Sour Sauce",
      "Veggie Burger",
      "Pickled Watermelon",
      "Jalapeno Lime",
      "Grape Jelly with Bacon",
      "Lemon Miso",
      "Fish Tacos",
      "Grape Mustard",
      "Tuna",
      "Buffalo Wing",
      "Chocolate Chili",
      "Sweet Pickle with Cheese",
      "Beef Wellington",
      "Fennel",
      "Salmon with Cream Cheese",
      "Cranberry Sauce",
      "Cream Cheese and Garlic",
      "Pistachio with Garlic",
      "Roasted Tomatoes",
      "Lemonade with Basil",
      "Mustard with Dill",
      "Grilled Pineapple",
      "Grilled Veggie",
      "Strawberry with Cucumber",
      "Pickled Lime",
      "Ranch with Herbs",
      "Steak with Pepper",
      "Cheddar and Jalapeno",
      "Chili Cheese Dog",
      "Bacon and Blue Cheese",
      "Caviar Sorbet",
      "Peanut Butter Pickles",
      "Mustard Bacon",
      "Bubblegum Bacon",
      "Pineapple and Cheese",
      "Fried Chicken Ice Cream",
      "Spicy Jalapeno and Blueberry",
      "Chili Hot Dog",
      "Pickled Avocado",
      "Chili Chocolate Mint",
      "Clam Sorbet",
      "Oyster Cream",
      "Barbecue Onion",
      "Boiled Egg Sorbet",
      "Pickled Honey",
      "Fried Ice Cream",
      "Raspberry Jalapeno",
      "Pickled Cantaloupe",
      "Chocolate Soy Sauce",
      "Garlic Butter",
      "Wasabi Lime",
      "Sausage and Mustard",
      "Salty Caramel Bacon",
      "Pickled Mango",
      "Maple Spicy Chocolate",
      "Garlic and Bacon",
      "Durian Coconut",
      "Mashed Potato Sorbet",
      "Taco Bell Ice Cream",
      "Cheese Chili Mac",
      "Coconut Fried Chicken",
      "Blue Cheese Honey",
      "Hot Dog with Mustard",
      "Gravy Ice Cream",
      "Egg Custard Bacon",
      "Green Bean Casserole",
      "Olive Oil Sorbet",
      "Pumpkin Sriracha",
      "Radish Pickle",
      "Cucumber Garlic",
      "Mustard Sorbet",
      "Sriracha Mango",
      "Potato Chip Sorbet",
      "Olive and Dill",
      "Pickled Corn",
      "Bacon Hot Sauce",
      "Ranch Chive",
      "Squid Ink Sorbet",
      "Spicy Tofu",
      "Eggnog Wasabi",
      "Pineapple Mustard",
      "Maple Hot Chili",
      "Brussels Sprout Chocolate",
      "Cheddar Onion Soup",
      "Coconut Caviar",
      "Beef Jerky Sorbet",
      "Sweet Pickled Onion",
      "Mushroom Sriracha",
      "Coconut Bacon",
      "Cheddar Jalapeno Ice Cream",
      "Fried Pickles",
      "Garlic Herb Ice Cream",
      "Spicy Apple Pie",
      "Pickled Salmon",
      "Cheddar Beer",
      "Cheese Mustard Swirl",
      "Jalapeno Salted Caramel",
      "Sriracha Butter",
      "Miso and Honeycomb",
      "Tropical Durian",
      "Bacon Lime Sorbet",
      "Chili Watermelon",
      "Hot Mustard Onion",
      "Curry Chicken",
      "Buffalo Mozzarella",
      "Chocolate Basil",
      "Pumpkin Caramelized Onion",
      "Boiled Eggplant",
      "Ranch Garlic",
      "Steak and Potato",
      "Beef Chili Sorbet",
      "Mango Blue Cheese",
      "Chocolate Chutney",
      "Pumpkin Curry",
      "Cabbage and Bacon",
      "Garlic Cherry",
      "Grilled Fish Sauce",
      "Cucumber Cilantro",
      "Barbecue Corn",
      "Lemon Marmalade",
      "Pickled Pumpkin",
      "Eggplant Sorbet",
      "Spicy Shrimp",
      "Wasabi Ice Cream",
      "Pepperoni Sorbet",
      "Chocolate Soy",
      "Hot Pepper Pineapple",
      "Black Bean Ice Cream",
      "Jalapeno Cucumber",
      "Roast Garlic Orange",
      "Caramel Onion",
      "Pickled Pineapple",
      "Mustard Sorbet"
    ];

    const addIns = [
      "Chocolate Chips",
      "Peanut Butter Swirl",
      "Oreos",
      "Brownie Chunks",
      "Fruit Swirl",
      "Marshmallows",
      "Nuts",
      "Coconut Flakes",
      "Fudge Sauce",
      "Candy Pieces",
      "Crushed Graham Crackers",
      "Caramel Swirl",
      "White Chocolate Chips",
      "Rainbow Sprinkles",
      "Chopped Almonds",
      "Biscotti Pieces",
      "Toffee Crunch"
    ];

    const randomBase =
      weirdFlavorsList[Math.floor(Math.random() * weirdFlavorsList.length)];
    const randomAddIn = addIns[Math.floor(Math.random() * addIns.length)];

    const weirdFlavor = `${randomBase} with ${randomAddIn}`;

    // Check if flavor already exists before adding it
    if (!weirdFlavors.includes(weirdFlavor)) {
      weirdFlavors.unshift(weirdFlavor); // Add the new flavor at the top
      updateWeirdFlavorList();
    }
  });

// Update Normal Flavor List
function updateNormalFlavorList() {
  const flavorList = document.getElementById("normalFlavorList");
  flavorList.innerHTML = "";
  normalFlavors.forEach((flavor) => {
    const listItem = document.createElement("li");
    listItem.textContent = flavor;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.style.backgroundColor = "red"; // Red for delete
    deleteButton.addEventListener("click", function () {
      deletedNormalFlavors.push(flavor);
      normalFlavors = normalFlavors.filter((item) => item !== flavor);
      updateNormalFlavorList();
      updateDeletedNormalFlavorsList();
    });

    listItem.appendChild(deleteButton);
    flavorList.appendChild(listItem);
  });
}

// Update Weird Flavor List
function updateWeirdFlavorList() {
  const weirdFlavorList = document.getElementById("weirdFlavorList");
  weirdFlavorList.innerHTML = "";
  weirdFlavors.forEach((flavor) => {
    const listItem = document.createElement("li");
    listItem.textContent = flavor;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    deleteButton.style.backgroundColor = "red"; // Red for delete
    deleteButton.addEventListener("click", function () {
      deletedWeirdFlavors.push(flavor);
      weirdFlavors = weirdFlavors.filter((item) => item !== flavor);
      updateWeirdFlavorList();
      updateDeletedWeirdFlavorsList();
    });

    listItem.appendChild(deleteButton);
    weirdFlavorList.appendChild(listItem);
  });
}

// Update Deleted Normal Flavors List
function updateDeletedNormalFlavorsList() {
  const deletedNormalFlavorsList = document.getElementById(
    "deletedNormalFlavorsList"
  );
  deletedNormalFlavorsList.innerHTML = "";
  deletedNormalFlavors.forEach((flavor) => {
    const listItem = document.createElement("li");
    listItem.textContent = flavor;

    const restoreButton = document.createElement("button");
    restoreButton.textContent = "Restore";
    restoreButton.classList.add("restoreButton");
    restoreButton.style.backgroundColor = "green"; // Green for restore
    restoreButton.addEventListener("click", function () {
      deletedNormalFlavors = deletedNormalFlavors.filter(
        (item) => item !== flavor
      );
      normalFlavors.push(flavor);
      updateDeletedNormalFlavorsList();
      updateNormalFlavorList();
    });

    listItem.appendChild(restoreButton);
    deletedNormalFlavorsList.appendChild(listItem);
  });
}

// Update Deleted Weird Flavors List
function updateDeletedWeirdFlavorsList() {
  const deletedWeirdFlavorsList = document.getElementById(
    "deletedWeirdFlavorsList"
  );
  deletedWeirdFlavorsList.innerHTML = "";
  deletedWeirdFlavors.forEach((flavor) => {
    const listItem = document.createElement("li");
    listItem.textContent = flavor;

    const restoreButton = document.createElement("button");
    restoreButton.textContent = "Restore";
    restoreButton.classList.add("restoreButton");
    restoreButton.style.backgroundColor = "green"; // Green for restore
    restoreButton.addEventListener("click", function () {
      deletedWeirdFlavors = deletedWeirdFlavors.filter(
        (item) => item !== flavor
      );
      weirdFlavors.push(flavor);
      updateDeletedWeirdFlavorsList();
      updateWeirdFlavorList();
    });

    listItem.appendChild(restoreButton);
    deletedWeirdFlavorsList.appendChild(listItem);
  });
}

// Clear Generated Flavors (Only for Active Tab)
document
  .getElementById("clearGeneratedButton")
  .addEventListener("click", function () {
    const confirmation = confirm(
      "Are you sure you want to clear all generated flavors for this tab?"
    );
    if (confirmation) {
      if (document.getElementById("normalTab").classList.contains("active")) {
        normalFlavors = [];
        updateNormalFlavorList();
      } else if (
        document.getElementById("weirdTab").classList.contains("active")
      ) {
        weirdFlavors = [];
        updateWeirdFlavorList();
      }
    }
  });

// Clear Deleted Flavors (Only for Active Tab)
document
  .getElementById("clearDeletedButton")
  .addEventListener("click", function () {
    const confirmation = confirm(
      "Are you sure you want to clear all deleted flavors for this tab?"
    );
    if (confirmation) {
      if (document.getElementById("normalTab").classList.contains("active")) {
        deletedNormalFlavors = [];
        updateDeletedNormalFlavorsList();
      } else if (
        document.getElementById("weirdTab").classList.contains("active")
      ) {
        deletedWeirdFlavors = [];
        updateDeletedWeirdFlavorsList();
      }
    }
  });

// Clear All Lists (Generated and Deleted Flavors) with Confirmation for Active Tab
document
  .getElementById("clearAllButton")
  .addEventListener("click", function () {
    const confirmation = confirm(
      "Are you sure you want to clear all lists for this tab?"
    );
    if (confirmation) {
      if (document.getElementById("normalTab").classList.contains("active")) {
        normalFlavors = [];
        deletedNormalFlavors = [];
        updateNormalFlavorList();
        updateDeletedNormalFlavorsList();
      } else if (
        document.getElementById("weirdTab").classList.contains("active")
      ) {
        weirdFlavors = [];
        deletedWeirdFlavors = [];
        updateWeirdFlavorList();
        updateDeletedWeirdFlavorsList();
      }
    }
  });

// Sorting Alphabetically for Active Tab Only
document.getElementById("sortButton").addEventListener("click", function () {
  if (document.getElementById("normalTab").classList.contains("active")) {
    normalFlavors.sort();
    updateNormalFlavorList();
  } else if (document.getElementById("weirdTab").classList.contains("active")) {
    weirdFlavors.sort();
    updateWeirdFlavorList();
  }
});

// Download List with Custom File Name
document
  .getElementById("downloadButton")
  .addEventListener("click", function () {
    const fileName =
      document.getElementById("fileNameInput").value || "flavor_list";
    let listContent = "";

    if (document.getElementById("normalTab").classList.contains("active")) {
      listContent += "Normal Flavors:\n" + normalFlavors.join("\n") + "\n\n";
    } else if (
      document.getElementById("weirdTab").classList.contains("active")
    ) {
      listContent += "Weird Flavors:\n" + weirdFlavors.join("\n") + "\n\n";
    }

    const blob = new Blob([listContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.txt`;
    link.click();
  });

// Trigger Download when Enter Key is Pressed on "File Name" Input Field
document
  .getElementById("fileNameInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const fileName =
        document.getElementById("fileNameInput").value || "flavor_list";
      let listContent = "";

      if (document.getElementById("normalTab").classList.contains("active")) {
        listContent += "Normal Flavors:\n" + normalFlavors.join("\n") + "\n\n";
      } else if (
        document.getElementById("weirdTab").classList.contains("active")
      ) {
        listContent += "Weird Flavors:\n" + weirdFlavors.join("\n") + "\n\n";
      }

      const blob = new Blob([listContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.txt`;
      link.click();
    }
  });
