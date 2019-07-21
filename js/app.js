"use strict";

function Creature(animal) {
  this.keyword = animal.keyword;
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.horns = animal.horns;
}
Creature.allCreatures = [];

Creature.prototype.render = function() {
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
    return templateRender(this);
 
};


Creature.readJson = (filepage) => {
  $.get(filepage, 'json')
    .then(data => {
      data.forEach(item => {
        Creature.allCreatures.push(new Creature(item));
      });
    })
    .then(Creature.loadCreatures);
};

Creature.loadCreatures = () => {
  Creature.allCreatures.forEach(item => $('#photos').append(item.render()));
  Creature.makeOption();
};

$(() => Creature.readJson('../data/page-1.json'));
// Below is JS for creating list options
Creature.SelectOptions = [];

Creature.makeOption = function() {
  let SelectOptionsClone = this.SelectOptions;
  Creature.allCreatures.forEach(function(critter) {
    if ($.inArray(critter.keyword, SelectOptionsClone) === -1) {
      SelectOptionsClone.push(critter.keyword);
    }
  });
  // Below is updating the list on site
  for (var i = 0; i < SelectOptionsClone.length; i++) {
    $("select").append(
      "<option value=" + SelectOptionsClone[i] + ">" + SelectOptionsClone[i] + "</option>"
    );
  }
};

// event listener for drop down menu
$('select').on('change', function() { 
  let $selection = $(this).val();
   $('.creatureDiv').hide();
   $('.' + $selection).show();  
  })

// add event listener to nav to only populate images from selected button
$('#pageOneButton').on("click", function() {
  $('.creatureDiv').remove();
  $('option').remove();
  Creature.SelectOptions = [];
  Creature.allCreatures = [];
  $(() => Creature.readJson('../data/page-1.json'));
})
$('#pageTwoButton').on("click", function() {
  $('.creatureDiv').remove();
  $('option').remove();
  Creature.SelectOptions = [];
  Creature.allCreatures = [];
  $(() => Creature.readJson('../data/page-2.json'));
})