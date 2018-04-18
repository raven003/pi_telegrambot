const rp = require("request-promise");
const cheerio = require("cheerio");

const optionsbio = {
  uri: `https://www.netto-online.de/-1494.ohtm/8463/Bio-Sortiment`,
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionsknüller = {
  uri: `https://www.netto-online.de/14963.ohtm/8463/Wochen-Knueller`,
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionscold = {
  uri: `https://www.netto-online.de/14966.ohtm/8463/Kuehlregal`,
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionssweet = {
  uri: "https://www.netto-online.de/14969.ohtm/8463/Suesswaren",
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionssuper = {
  uri: `https://www.netto-online.de/14976.ohtm/8463/Super-Wochenende`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

let preise = [];

let namen = [];

let desc = [];
let message = "";
let tmp = [];
let final = [];
let date = "";
let help = 0;

function scrape(options){
  rp(options)
    .then($ => {
        
      help = namen.length;
      final = [];

      $(".box_article_title").each(function(i, elem) {
        //cities[i] = $(this).text();

        namen.push($(this).text());
        //console.log($(this).text());
      });

      $(".box_article_desc").each(function(i, elem) {
        //cities[i] = $(this).text();
        desc.push($(this).text());
      });
      $(".price-main").each(function(i, elem) {
        //cities[i] = $(this).text();
        preise.push($(this).text());
      });

      date = $(".title_sub_text").text();
      headline = $(".title_headline").text();

      for (var i = 0; (j = namen.length), i < j; i++) {
        tmp.push(desc[i].replace(/\s/g, ""));
        desc[i] = tmp[i];
      }

      final.push("\n"+"-====-" + headline + "-===-" + "\n");
      for (var i = help; (j = namen.length), i < j; i++) {
        message +=
          " " +
          "<b>" +
          namen[i].replace(/\s/g, "") +
          "</b> " +
          preise[i].replace(/\s/g, "") +
          "€" +
          "\n"; //'<i>'+desc[i].replace(/\s/g, "")+'</i>' +

        final.push(
          " " +
            "<b>" +
            namen[i].replace(/\s/g, "") +
            "</b> " +
            preise[i].replace(/\s/g, "") +
            "€" +
            "\n"
        );
      }

      final.push(date+ '\n');

      //console.log($);
      
    })

    .catch(err => {
      console.log(err);
    });
    return final.toString(); // drauf warten bis es fertig ist?
}



console.log(scrape(optionsbio));

const TelegramBot = require("node-telegram-bot-api");
const token = "465730749:AAH0TKK3GQ9iUa1ruyhpYLbeCong8L7vCmg";
const bot = new TelegramBot(token, { polling: true });

bot.on("message", msg => {
 let r = 'getbio';
  if (
    msg.text
      .toString()
      .toLowerCase()
      .indexOf(r) === 0
  ) {
    //console.log(message);
    bot.sendMessage(msg.chat.id, scrape(optionsbio), { parse_mode: "HTML" });
  }
  let y = 'getcold';
  if (
    msg.text
      .toString()
      .toLowerCase()
      .indexOf(y) === 0
  ) {
    //console.log(message);
    bot.sendMessage(msg.chat.id, scrape(optionscold), { parse_mode: "HTML" });
  }
});


//anything
