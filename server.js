const express = require( 'express' );
const jsonGraphqlExpress = require( 'json-graphql-server' ).default;

const PORT = 3000;
const app = express();
const data = {
  users: [
    {
      id: 'kent_dodds',
      name: 'Kent C. Dodds',
      avatarURL: 'https://pbs.twimg.com/profile_images/759557613445001216/6M2E1l4q_bigger.jpg',
      reviews: [8],
      checked_out: []
    },
    {
      id: 'ken_wheeler',
      name: 'Ken Wheeler',
      avatarURL: 'https://pbs.twimg.com/profile_images/985388996011405312/O6rB4xNM_bigger.jpg',
      reviews: [1],
      checked_out: ['the_art_of_war']
    },
    {
      id: 'ryan_florence',
      name: 'Ryan Florence',
      avatarURL: 'https://pbs.twimg.com/profile_images/937382461918478336/AxXNkFRG_bigger.jpg',
      reviews: [],
      checked_out: ['console_wars', 'american_kingpin']
    },
    {
      id: 'peggy_rayzis',
      name: 'Peggy Rayzis',
      avatarURL: 'https://pbs.twimg.com/profile_images/783341508820893696/JphRM0xk_400x400.jpg',
      reviews: [2, 12, 13],
      checked_out: []
    },
    {
      id: 'lin_clark',
      name: 'Link Clark',
      avatarURL: 'https://pbs.twimg.com/profile_images/497876628651782146/hrCHz_ym_400x400.jpeg',
      reviews: [3],
      checked_out: []
    }
  ],
  books: [
    {
      id: 'american_kingpin',
      title: 'American Kingpin: The Epic Hunt for the Criminal Mastermind Behind the Silk Road',
      author: 'Nick Bilton',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51thUQ3znCL._SX329_BO1,204,203,200_.jpg',
      checked_out: 'ryan_florence',
      reviews: [{
        id: 1,
        user: 'ken_wheeler',
        rating: 5,
        book: 'american_kingpin'
      }, {
        id: 2,
        user: 'peggy_rayzis',
        rating: 4,
        book: 'american_kingpin'
      }, {
        id: 3,
        user: 'lin_clark',
        rating: 5,
        book: 'american_kingpin'
      }],
      description: 'In 2011, a twenty-six-year-old libertarian programmer named Ross Ulbricht launched the ultimate free market: the Silk Road, a clandestine Web site hosted on the Dark Web where anyone could trade anything—drugs, hacking software, forged passports, counterfeit cash, poisons—free of the government’s watchful eye. It wasn’t long before the media got wind of the new Web site where anyone—not just teenagers and weed dealers but terrorists and black hat hackers—could buy and sell contraband detection-free. Spurred by a public outcry, the federal government launched an epic two-year manhunt for the site’s elusive proprietor, with no leads, no witnesses, and no clear jurisdiction. All the investigators knew was that whoever was running the site called himself the Dread Pirate Roberts. The Silk Road quickly ballooned into $1.2 billion enterprise, and Ross embraced his new role as kingpin. He enlisted a loyal crew of allies in high and low places, all as addicted to the danger and thrill of running an illegal marketplace as their customers were to the heroin they sold. Through his network he got wind of the target on his back and took drastic steps to protect himself—including ordering a hit on a former employee. As Ross made plans to disappear forever, the Feds raced against the clock to catch a man they weren’t sure even existed, searching for a needle in the haystack of the global Internet. Drawing on exclusive access to key players and two billion digital words and images Ross left behind, Vanity Fair correspondent and New York Times bestselling author Nick Bilton offers a tale filled with twists and turns, lucky breaks and unbelievable close calls. It’s a story of the boy next door’s ambition gone criminal, spurred on by the clash between the new world of libertarian-leaning, anonymous, decentralized Web advocates and the old world of government control, order, and the rule of law. Filled with unforgettable characters and capped by an astonishing climax, American Kingpin might be dismissed as too outrageous for fiction. But it’s all too real.'
    },
    {
      id: 'oliver_twist',
      title: 'Oliver Twist',
      author: 'Charles Dickens',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51xKmBrsE%2BL._SX331_BO1,204,203,200_.jpg',
      checked_out: null,
      reviews: [{
        id: 4,
        user: null,
        rating: 5,
        book: 'oliver_twist'
      }, {
        id: 13,
        user: 'peggy_rayzis',
        rating: 5,
        book: 'oliver_twist'
      }],
      description: "Oliver Twist, or The Parish Boy's Progress, is the second novel by Charles Dickens and one of his most popular works. The story is of the orphan Oliver Twist, who starts his life in a workhouse and is then apprenticed with an undertaker. He escapes from there and travels to London where he meets the Artful Dodger, a member of a gang of juvenile pickpockets, which is led by the elderly criminal Fagin. Oliver Twist is notable for Dickens's unromantic portrayal of criminals and their sordid lives, as well as exposing the cruel treatment of the many orphans in London in the mid–nineteenth century. An early example of the social novel, Dickens satirises the hypocrisies of his time, including child labour, the recruitment of children as criminals, and the presence of street children. The novel features a range of colourful and unforgettable characters. Oliver Twist has been the subject of numerous adaptations, for various media, including a highly successful musical play, Oliver!, and the multiple Academy Award-winning 1968 motion picture."
    },
    {
      id: 'console_wars',
      title: 'Console Wars: Sega, Nintendo, and the Battle that Defined a Generation',
      author: 'Harris J. Blake',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51zpf17Eh1L._SX330_BO1,204,203,200_.jpg',
      checked_out: 'ryan_florence',
      reviews: [{
        id: 5,
        user: null,
        rating: 4,
        book: 'console_wars'
      }, {
        id: 6,
        user: null,
        rating: 2,
        book: 'console_wars'
      }, {
        id: 7,
        user: null,
        rating: 4,
        book: 'console_wars'
      }, {
        id: 8,
        user: 'kent_dodds',
        rating: 5,
        book: 'console_wars'
      }],
      description: 'Following the success of The Accidental Billionaires and Moneyball comes Console Wars a mesmerizing, behind-the-scenes business thriller that chronicles how Sega, a small, scrappy gaming company led by an unlikely visionary and a team of rebels, took on the juggernaut Nintendo and revolutionized the video game industry. In 1990, Nintendo had a virtual monopoly on the video game industry. Sega, on the other hand, was just a faltering arcade company with big aspirations and even bigger personalities. But that would all change with the arrival of Tom Kalinske, a man who knew nothing about videogames and everything about fighting uphill battles. His unconventional tactics, combined with the blood, sweat and bold ideas of his renegade employees, transformed Sega and eventually led to a ruthless David-and-Goliath showdown with rival Nintendo. The battle was vicious, relentless, and highly profitable, eventually sparking a global corporate war that would be fought on several fronts: from living rooms and schoolyards to boardrooms and Congress. It was a once-in-a-lifetime, no-holds-barred conflict that pitted brother against brother, kid against adult, Sonic against Mario, and the US against Japan. Based on over two hundred interviews with former Sega and Nintendo employees, Console Wars is the underdog tale of how Kalinske miraculously turned an industry punchline into a market leader. Its the story of how a humble family man, with an extraordinary imagination and a gift for turning problems into competitive advantages, inspired a team of underdogs to slay a giant and, as a result, birth a $60 billion dollar industry.'
    },
    {
      id: 'the_art_of_war',
      title: 'The Art of War',
      author: 'Sun Tzu',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51HmF37IInL._SX311_BO1,204,203,200_.jpg',
      checked_out: 'ken_wheeler',
      reviews: [{
        id: 9,
        user: null,
        rating: 1,
        book: 'the_art_of_war'
      }, {
        id: 10,
        user: null,
        rating: 5,
        book: 'the_art_of_war'
      }, {
        id: 11,
        user: null,
        rating: 3,
        book: 'the_art_of_war'
      }, {
        id: 12,
        user: 'peggy_rayzis',
        rating: 5,
        book: 'the_art_of_war'
      }],
      description: 'The timeless original text; required listening for anyone interested in strategy. This is a work of subtlety and paradox that shows the way to a clean and aesthetic triumph. Sun Tzu insisted that a skilled warrior observes, calculates, outwits, and outmaneuvers an adversary, and in doing so averts the destruction of battle.'
    }
  ]
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
  if ( req.method === 'OPTIONS' ) {
    res.send();
  }

  next();
});

app.use('/graphql', jsonGraphqlExpress(data));
app.listen( PORT );