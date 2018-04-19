const rp = require("request-promise");
const cheerio = require("cheerio");
const TelegramBot = require("node-telegram-bot-api");
const token = "465730749:AAH0TKK3GQ9iUa1ruyhpYLbeCong8L7vCmg";
const bot = new TelegramBot(token, { polling: true });

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
const optionsdrinks = {
  uri: `https://www.netto-online.de/14971.ohtm/8463/Getraenke`,
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionswurst = {
  uri: `https://www.netto-online.de/14965.ohtm/8463/Fleisch-Wurst`,
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionsdrogerie = {
  uri: `https://www.netto-online.de/14973.ohtm/8463/Drogerie`,
  transform: function(body) {
    return cheerio.load(body);
  }
};
const optionsobst = {
  uri: `https://www.netto-online.de/14964.ohtm/8463/Obst-Gemuese`,
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

async function scrape(options) {
  const $ = await rp(options);
  if (!$) return;

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

  final.push("\n" + "-====-" + headline + "-===-" + "\n");
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

  final.push(date + "\n");

  //console.log($);

  return final.toString(); // drauf warten bis es fertig ist?
}
async function onBotMessage() {
  const scrapedshit = await scrape(optionsknüller);
  if (scrapedshit) {
    let r = "get";
    if (
      msg.text
        .toString()
        .toLowerCase()
        .indexOf(r) === 0
    ) {
      //console.log(message);
      bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
    }
  } else {
    let r = "get";
    if (
      msg.text
        .toString()
        .toLowerCase()
        .indexOf(r) === 0
    ) {
      //console.log(message);
      bot.sendMessage(msg.chat.id, "<b>Fehler beim scrapen</b>", {
        parse_mode: "HTML"
      });
    }
  }
}

//console.log(scrape(optionsbio));
bot.onText(/\/start/, (msg) => {
    
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["nhot", "nbio","ndrinks"],   ["nkalt","nsweet","nsuper"], ["nwurst","ndrog","ngmüs"]]
      }
  });
      
  });

bot.on("message",onBotMessage)
async function onBotMessage(msg) {
  
  let r = "nhot";
  if (
    msg.text
    .toString()
    .toLowerCase()
    .indexOf(r) === 0
  ) {
    
      const scrapedshit = await scrape(optionsknüller);
      bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
    }
    r = "nbio";
    if (
      msg.text
      .toString()
      .toLowerCase()
      .indexOf(r) === 0
    ) {
      
        const scrapedshit = await scrape(optionsbio);
        bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
      }
      r = "nkalt";
      if (
        msg.text
        .toString()
        .toLowerCase()
        .indexOf(r) === 0
      ) {
        
          const scrapedshit = await scrape(optionscold);
          bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
        }
        r = "nsuper";
        if (
          msg.text
          .toString()
          .toLowerCase()
          .indexOf(r) === 0
        ) {
          
            const scrapedshit = await scrape(optionssuper);
            bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
          }
          r = "nsweet";
          if (
            msg.text
            .toString()
            .toLowerCase()
            .indexOf(r) === 0
          ) {
            
              const scrapedshit = await scrape(optionssweet);
              bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
            }
            r = "ndrinks";
            if (
              msg.text
              .toString()
              .toLowerCase()
              .indexOf(r) === 0
            ) {
              
                const scrapedshit = await scrape(optionsdrinks);
                bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
              }
              r = "nwurst";
              if (
                msg.text
                .toString()
                .toLowerCase()
                .indexOf(r) === 0
              ) {
                
                  const scrapedshit = await scrape(optionswurst);
                  bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
                }
                r = "ndrog";
                if (
                  msg.text
                  .toString()
                  .toLowerCase()
                  .indexOf(r) === 0
                ) {
                  
                    const scrapedshit = await scrape(optionsdrogerie);
                    bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
                  }
                  r = "ngmüs";
                  if (
                    msg.text
                    .toString()
                    .toLowerCase()
                    .indexOf(r) === 0
                  ) {
                    
                      const scrapedshit = await scrape(optionsobst);
                      bot.sendMessage(msg.chat.id, scrapedshit, { parse_mode: "HTML" });
                    }

   
  }


//anything
