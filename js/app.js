var App;

!(function ($) {

  "use strict";

  App = window.APPLICATION = {};

  /**
   * Config
   */
  App.config = {

    environment : (window.location.href.match(/(localhost)/g) ? 'development' : 'production' ),
    debug: true
    
  };

  

  /**
   * Elements
   */
  App.$el = {

    wrap    : $('#wrap'),
    form    : {
      self      : $('#form'),
      buy_ppu   : $('#input-buy_ppu'),
      sell_ppu  : $('#input-sell_ppu')
    },
    output  : {
      self            : $('#output'),
      net_ppu         : $('#output-net_ppu'),
      net_percentage  : $('#output-net_percentage')
    }

  };


  /**
   * Init
   */
  App.init = function() {

    App.calculator();
    App.saveCalculation();
    App.displaySavedCalculations();

    App.$el.form.self.submit();

  };




  /**
   * Calculator
   */
  App.calculator = function() {

    // Listen on change, keypress, change events
    App.$el.form.self.on('change input submit keypress', function (event) {

      event.preventDefault();

      var buy_ppu   = App.$el.form.buy_ppu.val(),
          sell_ppu  = App.$el.form.sell_ppu.val(),
          modifier  = App.$el.form.self.find('input[name="input-modifier"]:checked').val(),
          ah_cut    = 0.9;        

      if ( buy_ppu != 0 && sell_ppu != 0 ) {

        var bought = buy_ppu;
        var sold   = (sell_ppu * modifier * ah_cut);

        // Net per unit
        var net_ppu_val         = ( sold - bought );
        var class__net_ppu_val  = ( net_ppu_val > 0 ) ? 'positive' : 'negative';

        App.$el.output.net_ppu.removeClass('positive negative').addClass(class__net_ppu_val);
        App.$el.output.net_ppu.find('#output-net_ppu_val').html(net_ppu_val.toPrecision(4));


        // Net percentage
        var A = Math.round(sold*10000)/10;
        var B = Math.round(bought*10000)/10;

        var net_percentage_val          = (( A - B ) / ( (B + A ) / 2 ) * 100).toPrecision(3);
        var class__net_percentage_val   = ( net_ppu_val > 0 ) ? 'positive' : 'negative';

        App.$el.output.net_percentage.removeClass('positive negative').addClass(class__net_percentage_val);
        App.$el.output.net_percentage.find('#output-net_percentage_val').html(net_percentage_val);
      } 


    });
     

  };

    
  App.saveCalculation = function() {




  };






  App.displaySavedCalculations = function() {
    
  }


  /**
   * DOM Ready
   */
  $(document).ready(function() {
    App.init();
  })


})(jQuery);