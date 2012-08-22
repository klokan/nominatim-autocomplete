
/**
 * @fileoverview The demo application for goog.ui.AutoComplete.Nominatim.
 *
 * @author petr.pridal@klokantech.com (Petr Pridal)
 *
 * Copyright 2011 Klokan Technologies Gmbh (www.klokantech.com)
 */

goog.provide('nominatim.main');

goog.require('goog.array');
goog.require('goog.debug.Console');
goog.require('goog.debug.DivConsole');

goog.require('goog.debug.ErrorHandler');

goog.require('goog.debug.LogManager');
goog.require('goog.debug.Logger');
goog.require('goog.dom');
goog.require('goog.events.EventType');
goog.require('goog.ui.AutoComplete.Nominatim');


/**
 * Demo application for goog.ui.AutoComplete.Nominatim. Main function.
 */
nominatim.main = function() {

  // Initialize logger
  var logger = goog.debug.Logger.getLogger('nominatim');
  var logconsole = new goog.debug.DivConsole(goog.dom.getElement('log'));
  // var logconsole = new goog.debug.Console();
  logconsole.setCapturing(true);

  var input = /** @type {!Element} */
      (goog.dom.getElement('txtInput'));
  var ac = new goog.ui.AutoComplete.Nominatim(input);

  // the action which should be done on the selected item
  var run_action = function(item) {
    logger.info('DISPLAY: ' + item['lat'] + ',' + item['lon'] + ' -- ' +
        item['boundingbox'].toString());
    // console.log(item);
  }

  ac.addEventListener(goog.ui.AutoComplete.EventType.UPDATE, function(e) {
    logger.info('SELECT: ' + e.row['display_name']);
    run_action(e.row);
  });

  goog.events.listen(goog.dom.getElement('form1'),
      goog.events.EventType.SUBMIT, function(e) {
        e.preventDefault();
        logger.info('DIRECT: ' + input.value);
        ac.search(input.value, 1, function(token, result) {
          if (result.length > 0) {
            logger.info(result[0]['display_name']);
            run_action(result[0]);
          }
        });
      });

};

goog.exportSymbol('main', nominatim.main);
