export interface BibleStory {
  id: number;
  title: string;
  reference: string;
  category: string;
  context: string;
}

export const bibleStories: BibleStory[] = [
  // IN THE BEGINNING
  { 
    id: 1, 
    title: "Creation", 
    reference: "Genesis 1:1–2:25", 
    category: "IN THE BEGINNING",
    context: "The foundation of all things. This story establishes God as the Creator of the universe, setting the stage for the relationship between God and humanity."
  },
  { 
    id: 2, 
    title: "The Fall", 
    reference: "Genesis 3:1–3:24", 
    category: "IN THE BEGINNING",
    context: "Humanity's initial disobedience and the resulting entrance of sin and death into the world. It explain the brokenness we see today and the need for redemption."
  },
  { 
    id: 3, 
    title: "The Flood", 
    reference: "Genesis 6:5–7:24", 
    category: "IN THE BEGINNING",
    context: "God's judgment on a world filled with violence and corruption, while showing mercy to Noah and his family. It prefigures both judgment and salvation."
  },
  { 
    id: 4, 
    title: "God's Covenant with Noah", 
    reference: "Genesis 8:1–9:17", 
    category: "IN THE BEGINNING",
    context: "After the flood, God establishes a covenant with all living creatures, promising never again to destroy the earth by water—a sign of His enduring patience."
  },
  { 
    id: 5, 
    title: "Tower of Babel", 
    reference: "Genesis 11:1–11:9", 
    category: "IN THE BEGINNING",
    context: "Shows humanity's prideful attempt to build a names for themselves independent of God, leading to the confusion of languages and the scattering of people."
  },
  
  // ABRAHAM, ISSAC AND JACOB
  { 
    id: 6, 
    title: "The Call of Abram", 
    reference: "Genesis 12:1–12:20", 
    category: "ABRAHAM, ISSAC AND JACOB",
    context: "The beginning of God's redemptive plan through one family. Abram is called to leave his home with a promise that all nations will be blessed through him."
  },
  { 
    id: 7, 
    title: "God's Covenant with Abram", 
    reference: "Genesis 15:1–15:21", 
    category: "ABRAHAM, ISSAC AND JACOB",
    context: "God formalizes His promise to Abram, counting his faith as righteousness and confirming the inheritance of the land for his descendants."
  },
  { 
    id: 8, 
    title: "Isaac's Birth and Sacrifice", 
    reference: "Genesis 21:1–22:19", 
    category: "ABRAHAM, ISSAC AND JACOB",
    context: "The ultimate test of Abraham's faith. Isaac, the promised son, is offered as a sacrifice, pointing to God's own sacrifice of His Son in the future."
  },
  { 
    id: 9, 
    title: "Jacob and Esau Compete", 
    reference: "Genesis 27:1–28:22", 
    category: "ABRAHAM, ISSAC AND JACOB",
    context: "A story of sibling rivalry and deception, yet it shows how God continues His lineage through the imperfect Jacob to fulfill His promises."
  },
  { 
    id: 10, 
    title: "Jacob and Esau Reconcile", 
    reference: "Genesis 32:1–33:20", 
    category: "ABRAHAM, ISSAC AND JACOB",
    context: "After years of fear and struggle, Jacob wrestles with God and is transformed. His reunion with Esau demonstrates the power of forgiveness and grace."
  },

  // THE STORY OF JOSEPH
  { 
    id: 11, 
    title: "Sold into Slavery", 
    reference: "Genesis 37:1–37:36", 
    category: "THE STORY OF JOSEPH",
    context: "Joseph, the favored son, is betrayed by his brothers. This starts a chain of events that will eventually lead to the preservation of Israel in Egypt."
  },
  { 
    id: 12, 
    title: "Prison and Promotion", 
    reference: "Genesis 39:1–41:57", 
    category: "THE STORY OF JOSEPH",
    context: "Despite false accusations and imprisonment, God's presence remains with Joseph. His ability to interpret dreams leads him to the second-highest position in Egypt."
  },
  { 
    id: 13, 
    title: "Ten Brothers Go to Egypt", 
    reference: "Genesis 42:1–42:38", 
    category: "THE STORY OF JOSEPH",
    context: "Famine forces Joseph's brothers to seek help in Egypt, unaware that the powerful ruler they encounter is the brother they once betrayed."
  },
  { 
    id: 14, 
    title: "The Brothers Return", 
    reference: "Genesis 43:1–44:34", 
    category: "THE STORY OF JOSEPH",
    context: "The brothers return with Benjamin, Joseph's only full brother. Joseph tests their hearts to see if they have changed since the day they sold him."
  },
  { 
    id: 15, 
    title: "Joseph Reveals His Identity", 
    reference: "Genesis 45:1–46:7", 
    category: "THE STORY OF JOSEPH",
    context: "A beautiful picture of reconciliation. Joseph forgives his brothers, recognizing that God orchestrated the events for their survival."
  },

  // MOSES AND THE EXODUS
  { 
    id: 16, 
    title: "Birth of Moses", 
    reference: "Exodus 1:1–2:25", 
    category: "MOSES AND THE EXODUS",
    context: "Moses is born during a time of systemic oppression when Pharaoh ordered the death of all Hebrew baby boys. His miraculous preservation in a basket on the Nile sets the stage for God's redemption of His people from slavery."
  },
  { 
    id: 17, 
    title: "The Burning Bush", 
    reference: "Exodus 3:1–4:17", 
    category: "MOSES AND THE EXODUS",
    context: "After 40 years in the desert, God encounters Moses in a bush that burns but is not consumed. God reveals His personal name, 'I AM WHO I AM,' and commissions a reluctant Moses to confront the most powerful ruler on earth."
  },
  { 
    id: 18, 
    title: "The Ten Plagues", 
    reference: "Exodus 6:28–11:10", 
    category: "MOSES AND THE EXODUS",
    context: "A series of supernatural judgments that systematically dismantle the authority of Egypt's gods. Each plague demonstrates the Lord's absolute sovereignty over nature, life, and the Egyptian state."
  },
  { 
    id: 19, 
    title: "Passover and Exodus", 
    reference: "Exodus 12:1–12:42", 
    category: "MOSES AND THE EXODUS",
    context: "The definitive moment of salvation for Israel. The blood of the lamb protects them from judgment, leading to their final liberation from four centuries of bondage—a pattern of redemption that echoes throughout the Bible."
  },
  { 
    id: 20, 
    title: "Crossing the Red Sea", 
    reference: "Exodus 13:17–14:31", 
    category: "MOSES AND THE EXODUS",
    context: "Trapped between Pharaoh's army and the sea, Israel witnesses the ultimate miracle. God parts the waters, allowing His people to walk through on dry ground while the pursuing army is defeated by the returning sea."
  },

  // THE LAW AND THE LAND
  { 
    id: 21, 
    title: "The Ten Commandments", 
    reference: "Exodus 19:1–20:21", 
    category: "THE LAW AND THE LAND", 
    context: "At Mount Sinai, God establishes the ethical and spiritual framework for His covenant people. These ten laws define the boundaries of love for God and love for neighbor." 
  },
  { 
    id: 22, 
    title: "The Golden Calf", 
    reference: "Exodus 32:1–34:35", 
    category: "THE LAW AND THE LAND", 
    context: "While Moses is on the mountain, the people fall into idolatry. This tragic event highlights the depth of human rebellion and the necessity of Moses' intercession to stay God's judgment." 
  },
  { 
    id: 23, 
    title: "Joshua Succeeds Moses", 
    reference: "Joshua 1:1–1:18", 
    category: "THE LAW AND THE LAND", 
    context: "Following the death of Moses, the mantle of leadership passes to Joshua. God promises to be with him just as He was with Moses, calling for courage and meditation on the Law." 
  },
  { 
    id: 24, 
    title: "Crossing the Jordan", 
    reference: "Joshua 3:1–4:24", 
    category: "THE LAW AND THE LAND", 
    context: "Mirroring the Red Sea crossing, the Jordan River stops its flow for the priests carrying the Ark. Israel finally sets foot in the Promised Land, marking the end of their wilderness wandering." 
  },
  { 
    id: 25, 
    title: "The Fall of Jericho", 
    reference: "Joshua 5:13–6:27", 
    category: "THE LAW AND THE LAND", 
    context: "A victory won not through traditional warfare but through ritual obedience and faith. The walls fall after seven days of circling the city, demonstrating that God fights for His people." 
  },

  // THE JUDGES
  { id: 26, title: "Israel's Disobedience", reference: "Judges 2:6–3:6", category: "THE JUDGES", context: "The beginning of a cycle where Israel forgets God, faces oppression, and calls out for deliverance." },
  { id: 27, title: "Deborah Leads Israel", reference: "Judges 4:1–5:31", category: "THE JUDGES", context: "A courageous woman who judges Israel and leads them to victory over Sisera." },
  { id: 28, title: "Gideon Defeats the Midianites", reference: "Judges 6:1–7:25", category: "THE JUDGES", context: "God uses a small army of 300 to show that the victory belongs to Him alone." },
  { id: 29, title: "Samson Defeats the Philistines", reference: "Judges 13:1–16:31", category: "THE JUDGES", context: "A man of great strength and great weakness whose life and death ultimately bring deliverance." },
  { id: 30, title: "The Story of Ruth", reference: "Ruth 1:1–4:22", category: "THE JUDGES", context: "A beautiful story of loyalty and redemption, showing that God's plan includes those outside the nation of Israel." },

  // THE RISE OF ISRAEL
  { id: 31, title: "Samuel Listens to God", reference: "1 Samuel 1:1–3:21", category: "THE RISE OF ISRAEL", context: "The call of the last judge and first great prophet, who would bridge the era to the monarchy." },
  { id: 32, title: "King Saul", reference: "1 Samuel 8:1–10:27", category: "THE RISE OF ISRAEL", context: "Israel's demand for a human king and the appointment of their first, tragic leader." },
  { id: 33, title: "David and Goliath", reference: "1 Samuel 16:1–18:16", category: "THE RISE OF ISRAEL", context: "A shepherd boy's faith overcomes a giant, launching David into the national spotlight." },
  { id: 34, title: "David and Saul", reference: "1 Samuel 23:7–24:22", category: "THE RISE OF ISRAEL", context: "David's time of testing as a fugitive and his refusal to harm God's anointed king despite persecution." },
  { id: 35, title: "King David", reference: "2 Samuel 5:1–7:29", category: "THE RISE OF ISRAEL", context: "David is crowned king, unifies Israel, and receives God's promise of an eternal kingdom." },

  // THE FALL OF ISRAEL
  { id: 36, title: "David and Bathsheba", reference: "2 Samuel 11:1–12:25", category: "THE FALL OF ISRAEL", context: "A sobering account of David's sin and God's judgment, but also His willingness to forgive." },
  { id: 37, title: "King Solomon", reference: "1 Kings 2:1–3:28", category: "THE FALL OF ISRAEL", context: "Solomon asks for wisdom to lead God's people, establishing a period of unprecedented prosperity." },
  { id: 38, title: "Solomon's Temple", reference: "1 Kings 8:1–9:9", category: "THE FALL OF ISRAEL", context: "The completion of the dwelling place for God's glory among His people." },
  { id: 39, title: "Elijah and the Prophets of Baal", reference: "1 Kings 16:29–19:18", category: "THE FALL OF ISRAEL", context: "A dramatic confrontation on Mount Carmel that reveals who is the true God of Israel." },
  { id: 40, title: "The Fall of Jerusalem", reference: "2 Kings 25:1–25:30", category: "THE FALL OF ISRAEL", context: "The tragic outcome of centuries of idolatry as the city is destroyed and the people are taken into exile." },

  // PSALMS AND PROVERBS
  { id: 41, title: "The Lord Is My Shepherd", reference: "Psalm 23:1–23:6", category: "PSALMS AND PROVERBS", context: "A timeless expression of trust and peace in God's protective and providing care." },
  { id: 42, title: "Have Mercy on Me", reference: "Psalm 51:1–51:19", category: "PSALMS AND PROVERBS", context: "David's heart-felt prayer of repentance, acknowledging the depth of sin and the need for a clean heart." },
  { id: 43, title: "Praise the Lord", reference: "Psalm 103:1–103:22", category: "PSALMS AND PROVERBS", context: "A call to worship that celebrates God's benefits, compassion, and everlasting love." },
  { id: 44, title: "Godly Wisdom", reference: "Proverbs 1:1–4:27", category: "PSALMS AND PROVERBS", context: "Instructions for living skillfully and righteously by fearing the Lord." },
  { id: 45, title: "Proverbs of Solomon", reference: "Proverbs 16:1–18:24", category: "PSALMS AND PROVERBS", context: "Practical insights on speech, pride, and the sovereignty of God in human plans." },

  // THE PROPHETS
  { id: 46, title: "The Suffering Servant", reference: "Isaiah 51:1–53:12", category: "THE PROPHETS", context: "A clear prophecy of the Messiah's suffering and atonement for the sins of humanity." },
  { id: 47, title: "Jeremiah's Call and Message", reference: "Jeremiah 1:1–3:5", category: "THE PROPHETS", context: "The 'weeping prophet' is called to warn a stubborn nation and promise a future New Covenant." },
  { id: 48, title: "Daniel in the Lion's Den", reference: "Daniel 6:1–6:28", category: "THE PROPHETS", context: "Faithfulness to God even in a foreign land and the miraculous preservation from death." },
  { id: 49, title: "The Story of Jonah", reference: "Jonah 1:1–4:11", category: "THE PROPHETS", context: "God's compassion for the nations and the prophet's reluctance to share His mercy." },
  { id: 50, title: "The Day of Judgment", reference: "Malachi 1:1–4:6", category: "THE PROPHETS", context: "The final words of the Old Testament, calling for return and promising the coming of the Sun of Righteousness." },

  // THE LIVING WORD
  { id: 51, title: "The Word Became Flesh", reference: "John 1:1–1:18", category: "THE LIVING WORD", context: "The cosmic reality of Jesus as the eternal Word who enters human history as light and life." },
  { id: 52, title: "Gabriel's Message", reference: "Luke 1:1–1:80", category: "THE LIVING WORD", context: "The announcements to Mary and Zechariah that set the stage for the miraculous births." },
  { id: 53, title: "The Birth of Jesus", reference: "Luke 2:1–2:40", category: "THE LIVING WORD", context: "The humble entrance of the King in Bethlehem and His recognition by shepherds and saints." },
  { id: 54, title: "John the Baptist", reference: "Luke 3:1–3:20", category: "THE LIVING WORD", context: "The voice in the wilderness preparing the way for Jesus through a message of repentance." },
  { id: 55, title: "Baptism and Temptation", reference: "Matthew 3:13–4:17", category: "THE LIVING WORD", context: "Jesus identifies with humanity in baptism and overruns the enemy's schemes in the wilderness." },

  // THE TEACHING OF JESUS
  { id: 56, title: "Sermon on the Mount – Part 1", reference: "Matthew 5:1–6:4", category: "THE TEACHING OF JESUS", context: "The Beatitudes and the radical ethics of the Kingdom of Heaven." },
  { id: 57, title: "Sermon on the Mount – Part 2", reference: "Matthew 6:5–7:29", category: "THE TEACHING OF JESUS", context: "Teaching on prayer, worry, and the importance of building on a firm foundation." },
  { id: 58, title: "The Kingdom of Heaven", reference: "Matthew 13:1–13:58", category: "THE TEACHING OF JESUS", context: "Parables that explain the mysterious growth and value of God's reign on earth." },
  { id: 59, title: "The Good Samaritan", reference: "Luke 10:25–10:37", category: "THE TEACHING OF JESUS", context: "A lesson on what it means to be a neighbor and the expansive nature of love." },
  { id: 60, title: "Lost and Found", reference: "Luke 15:1–15:32", category: "THE TEACHING OF JESUS", context: "The parables of the lost sheep, coin, and son, revealing the joy of God in finding the lost." },

  // THE MIRACLES OF JESUS
  { id: 61, title: "Feeding the Five Thousand", reference: "Luke 9:1–9:36", category: "THE MIRACLES OF JESUS", context: "Jesus provides abundantly for the crowds, revealing His identity as the Bread of Life." },
  { id: 62, title: "Walking on Water", reference: "Matthew 14:22–14:36", category: "THE MIRACLES OF JESUS", context: "A display of Jesus' authority over nature and a call to Peter (and us) to maintain focus on Him." },
  { id: 63, title: "Healing the Blind Man", reference: "John 9:1–9:41", category: "THE MIRACLES OF JESUS", context: "A miracle that gives physical sight and exposes the spiritual blindness of the religious leaders." },
  { id: 64, title: "Healing a Demon-possessed Man", reference: "Mark 5:1–5:20", category: "THE MIRACLES OF JESUS", context: "Jesus restores a man tortured by darkness, sending him home as a witness to God's mercy." },
  { id: 65, title: "Raising Lazarus from the Dead", reference: "John 11:1–11:57", category: "THE MIRACLES OF JESUS", context: "The ultimate sign revealing Jesus as 'the Resurrection and the Life' before His own Passion." },

  // THE CROSS OF CHRIST
  { id: 66, title: "The Last Supper", reference: "Luke 22:1–22:46", category: "THE CROSS OF CHRIST", context: "The final meal where Jesus explains His impending sacrifice and models servanthood." },
  { id: 67, title: "Arrest and Trial", reference: "John 18:1–18:40", category: "THE CROSS OF CHRIST", context: "The betrayal by Judas and the illegal trials that lead to Jesus' condemnation." },
  { id: 68, title: "The Crucifixion", reference: "John 19:1–19:42", category: "THE CROSS OF CHRIST", context: "The central act of redemption where Jesus dies for the sins of the world." },
  { id: 69, title: "The Resurrection", reference: "John 20:1–21:25", category: "THE CROSS OF CHRIST", context: "The empty tomb and appearances of Jesus that prove His victory over death." },
  { id: 70, title: "The Ascension", reference: "Acts 1:1–1:11", category: "THE CROSS OF CHRIST", context: "Jesus returns to the Father, promising the Holy Spirit and His future return." },

  // THE CHURCH IS BORN
  { id: 71, title: "The Day of Pentecost", reference: "Acts 2:1–2:47", category: "THE CHURCH IS BORN", context: "The outpouring of the Spirit and the birth of a community characterized by devotion and love." },
  { id: 72, title: "Growth and Persecution", reference: "Acts 3:1–4:37", category: "THE CHURCH IS BORN", context: "Miracles and trials that only serve to strengthen the resolve and reach of the early church." },
  { id: 73, title: "The First Martyr", reference: "Acts 6:8–8:8", category: "THE CHURCH IS BORN", context: "Stephen's courageous witness and death, which triggers the spread of the Gospel beyond Jerusalem." },
  { id: 74, title: "Sharing the Word", reference: "Acts 8:26–8:40", category: "THE CHURCH IS BORN", context: "The Spirit leads Philip to an Ethiopian official, demonstrating that the Good News is for everyone." },
  { id: 75, title: "Good News for All", reference: "Acts 10:1–11:18", category: "THE CHURCH IS BORN", context: "Peter's vision and visit to Cornelius, formally opening the doors of the church to the Gentiles." },

  // THE TRAVELS OF PAUL
  { id: 76, title: "The Road to Damascus", reference: "Acts 9:1–9:31", category: "THE TRAVELS OF PAUL", context: "The dramatic conversion of Saul, the persecutor, into Paul, the apostle." },
  { id: 77, title: "The First Missionary Journey", reference: "Acts 13:1–14:28", category: "THE TRAVELS OF PAUL", context: "Paul and Barnabas set out to plant churches throughout Asia Minor." },
  { id: 78, title: "The Council at Jerusalem", reference: "Acts 15:1–15:41", category: "THE TRAVELS OF PAUL", context: "A critical meeting that confirms salvation is by grace alone through faith, not by keeping the law." },
  { id: 79, title: "More Missionary Journeys", reference: "Acts 16:1–20:38", category: "THE TRAVELS OF PAUL", context: "Paul's extensive travels, establishing churches in Greece and strengthening others." },
  { id: 80, title: "The Trip to Rome", reference: "Acts 25:1–28:31", category: "THE TRAVELS OF PAUL", context: "Paul stands trial before rulers and finally reaches the heart of the Empire as a prisoner for Christ." },

  // PAUL TO THE CHURCHES
  { id: 81, title: "More than Conquerors", reference: "Romans 8:1–8:39", category: "PAUL TO THE CHURCHES", context: "The assurance of no condemnation and nothing being able to separate us from God's love." },
  { id: 82, title: "The Fruit of the Spirit", reference: "Galatians 5:16–6:10", category: "PAUL TO THE CHURCHES", context: "Contrast between the works of the flesh and the character produced by living in the Spirit." },
  { id: 83, title: "The Armour of God", reference: "Ephesians 6:10–6:20", category: "PAUL TO THE CHURCHES", context: "Preparing for spiritual battle by putting on God's provided protection." },
  { id: 84, title: "Rejoice in the Lord", reference: "Philippians 4:2–4:9", category: "PAUL TO THE CHURCHES", context: "Paul's exhortation to joy, gentleness, and peace through prayer and focused thinking." },
  { id: 85, title: "The Supremacy of Christ", reference: "Colossians 1:1–1:23", category: "PAUL TO THE CHURCHES", context: "A profound declaration of Jesus' role as Creator and Reconciler of all things." },

  // PAUL TO THE LEADERS
  { id: 86, title: "Elders and Deacons", reference: "1 Timothy 3:1–3:16", category: "PAUL TO THE LEADERS", context: "Qualifications for character-driven leadership within the local church." },
  { id: 87, title: "The Love of Money", reference: "1 Timothy 6:3–6:21", category: "PAUL TO THE LEADERS", context: "Warnings against greed and the encouragement to pursue godliness with contentment." },
  { id: 88, title: "Good Soldiers of Christ", reference: "2 Timothy 2:1–2:26", category: "PAUL TO THE LEADERS", context: "Instructions for remaining faithful and enduring hardship in the service of the Lord." },
  { id: 89, title: "All Scripture Is God-breathed", reference: "2 Timothy 3:10–4:8", category: "PAUL TO THE LEADERS", context: "The authority of the Bible and Paul's final charge to 'preach the word'." },
  { id: 90, title: "The Coming of the Lord", reference: "1 Thessalonians 4:13–5:11", category: "PAUL TO THE LEADERS", context: "Hope concerning those who have died and the call to live in readiness for Jesus' return." },

  // THE APOSTLES’ TEACHING
  { id: 91, title: "The Most Excellent Way", reference: "1 Corinthians 13:1–13:13", category: "THE APOSTLES’ TEACHING", context: "The nature of true Christian love—the indispensable quality of the believer." },
  { id: 92, title: "A New Creation in Christ", reference: "2 Corinthians 4:1–6:2", category: "THE APOSTLES’ TEACHING", context: "The transformation and ministry of reconciliation given to all who follow Jesus." },
  { id: 93, title: "A Living Hope", reference: "1 Peter 1:1–2:12", category: "THE APOSTLES’ TEACHING", context: "Encouragement for those facing suffering, anchored in the reality of the inheritance to come." },
  { id: 94, title: "Faith and Works", reference: "James 1:1–2:26", category: "THE APOSTLES’ TEACHING", context: "The necessity of an active faith that proves itself through trials and deeds." },
  { id: 95, title: "Love One Another", reference: "1 John 3:11–4:21", category: "THE APOSTLES’ TEACHING", context: "The test of true fellowship: walking in the light and loving like God loves." },

  // THE REVELATION
  { id: 96, title: "A Voice and a Vision", reference: "Revelation 1:1–1:20", category: "THE REVELATION", context: "John encounters the glorified Christ, who holds the keys of death and Hades." },
  { id: 97, title: "Messages to the Churches", reference: "Revelation 2:1–3:22", category: "THE REVELATION", context: "Specific commendations and warnings to the seven churches of Asia Minor." },
  { id: 98, title: "The Throne of Heaven", reference: "Revelation 4:1–7:17", category: "THE REVELATION", context: "A glimpse of the grand worship in heaven and the Lamb who is worthy to open the seals." },
  { id: 99, title: "Hallelujah!", reference: "Revelation 19:1–20:15", category: "THE REVELATION", context: "The final celebration of victory and the ultimate judgment of all evil." },
  { id: 100, title: "The New Jerusalem", reference: "Revelation 21:1–22:21", category: "THE REVELATION", context: "The glorious vision of the new heaven and new earth where God dwells with His people forever." },
];
